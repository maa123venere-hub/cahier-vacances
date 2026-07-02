import { useEffect, useState, useCallback } from 'react';
import {
  collection, doc, getDocs, setDoc, deleteDoc, updateDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { CURRICULUM } from '../data/curriculum.js';

const COL = 'curriculum';

function newExerciseId(dayKey) {
  return `${dayKey}-${Date.now()}`;
}

export function useAdminContent() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(collection(db, COL));
      const firestoreDays = {};
      snap.docs.forEach((d) => { firestoreDays[d.id] = d.data(); });

      // Merge static curriculum with Firestore overrides
      const allKeys = new Set([...Object.keys(CURRICULUM), ...Object.keys(firestoreDays)]);
      const merged = Array.from(allKeys).map((key) => {
        const staticDay = CURRICULUM[key] || {};
        const fsDay = firestoreDays[key] || {};
        return {
          key,
          title: fsDay.title || staticDay.title || key,
          exercises: fsDay.exercises ?? staticDay.exercises ?? [],
          fromFirestore: !!firestoreDays[key],
        };
      }).sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));

      setDays(merged);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function saveExercise(dayKey, exercise) {
    const dayRef = doc(db, COL, dayKey);
    const current = days.find((d) => d.key === dayKey);
    const existing = current?.exercises ?? CURRICULUM[dayKey]?.exercises ?? [];

    const idx = existing.findIndex((e) => e.id === exercise.id);
    let updated;
    if (idx >= 0) {
      updated = existing.map((e, i) => (i === idx ? exercise : e));
    } else {
      const newEx = { ...exercise, id: exercise.id || newExerciseId(dayKey) };
      updated = [...existing, newEx];
    }

    await setDoc(dayRef, {
      title: current?.title || dayKey,
      exercises: updated,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    await load();
  }

  async function deleteExercise(dayKey, exerciseId) {
    const dayRef = doc(db, COL, dayKey);
    const current = days.find((d) => d.key === dayKey);
    const existing = current?.exercises ?? CURRICULUM[dayKey]?.exercises ?? [];
    const updated = existing.filter((e) => e.id !== exerciseId);

    await setDoc(dayRef, {
      title: current?.title || dayKey,
      exercises: updated,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    await load();
  }

  async function updateDayTitle(dayKey, title) {
    await setDoc(doc(db, COL, dayKey), { title, updatedAt: serverTimestamp() }, { merge: true });
    await load();
  }

  async function addDay(dayKey, title) {
    await setDoc(doc(db, COL, dayKey), {
      title,
      exercises: [],
      createdAt: serverTimestamp(),
    });
    await load();
  }

  async function deleteDay(dayKey) {
    await deleteDoc(doc(db, COL, dayKey));
    await load();
  }

  return { days, loading, error, load, saveExercise, deleteExercise, updateDayTitle, addDay, deleteDay };
}
