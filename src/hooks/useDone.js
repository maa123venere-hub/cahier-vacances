import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

export function useDone() {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  // Namespace by level AND subject. Français keeps its legacy (subject-less) key so
  // existing progress isn't lost; Maths gets its own `${level}_${subject}` namespace.
  const scope = matiereId === 'francais' ? levelId : `${levelId}_${matiereId}`;
  const storageKey = `done2k26_${scope}`;

  const [done, setDoneState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });

  // Reset state when level or subject changes
  useEffect(() => {
    try {
      setDoneState(JSON.parse(localStorage.getItem(storageKey) || '{}'));
    } catch {
      setDoneState({});
    }
  }, [scope, storageKey]);

  // Live sync from Firestore, namespaced by level + subject
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'progress', scope);
    const unsubscribe = onSnapshot(ref, (snap) => {
      setDoneState(snap.exists() ? snap.data().done || {} : {});
    });
    return unsubscribe;
  }, [user, scope]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(done));
  }, [done, storageKey]);

  function toggleDone(key) {
    setDoneState((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (user) {
        const ref = doc(db, 'users', user.uid, 'progress', scope);
        setDoc(ref, { done: next, updatedAt: new Date().toISOString() }, { merge: true }).catch(() => {});
      }
      return next;
    });
  }

  return { done, toggleDone };
}
