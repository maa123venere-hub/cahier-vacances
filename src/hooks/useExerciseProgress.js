import { useEffect, useRef, useState, useCallback } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

// Shape saved in Firestore: users/{uid}/exerciseProgress/{niveau}_{matiere}_{dayKey}
// {
//   idx: number,          — current question index
//   score: number,        — correct answers so far
//   wrongCounts: {},      — { questionId: number }
//   startedAt: string,    — ISO timestamp
//   updatedAt: string,
// }

const DEFAULT = { idx: 0, score: 0, wrongCounts: {}, startedAt: null };
const DEBOUNCE_MS = 600; // coalesce rapid save() calls into one write

export function useExerciseProgress(dayKey) {
  const { user, niveau, matiere } = useAuth();
  // Namespace by level + subject so resume state never mixes between cahiers
  const scopedKey = dayKey ? `${niveau || '4eme'}_${matiere || 'francais'}_${dayKey}` : null;
  const [saved, setSaved] = useState(null);
  const [ready, setReady] = useState(false);
  const pendingRef = useRef(null);   // debounce timer
  const latestPatch = useRef(null);  // latest data to write

  // One-time read on mount — no persistent listener (saves read quota)
  useEffect(() => {
    if (!user || !scopedKey) { setReady(true); return; }
    const ref = doc(db, 'users', user.uid, 'exerciseProgress', scopedKey);
    getDoc(ref)
      .then((snap) => {
        setSaved(snap.exists() ? { ...DEFAULT, ...snap.data() } : DEFAULT);
      })
      .catch(() => setSaved(DEFAULT))
      .finally(() => setReady(true));
  }, [user, scopedKey]);

  // Debounced save: multiple rapid calls within DEBOUNCE_MS fire only one write
  const save = useCallback((patch) => {
    if (!user || !scopedKey) return;
    latestPatch.current = patch;

    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = setTimeout(() => {
      const ref = doc(db, 'users', user.uid, 'exerciseProgress', scopedKey);
      setDoc(ref, {
        ...latestPatch.current,
        updatedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {});
      pendingRef.current = null;
    }, DEBOUNCE_MS);
  }, [user, scopedKey]);

  // Flush immediately (called at session end before component unmounts)
  const flush = useCallback(() => {
    if (!pendingRef.current || !user || !scopedKey || !latestPatch.current) return;
    clearTimeout(pendingRef.current);
    pendingRef.current = null;
    const ref = doc(db, 'users', user.uid, 'exerciseProgress', scopedKey);
    setDoc(ref, {
      ...latestPatch.current,
      updatedAt: new Date().toISOString(),
    }, { merge: true }).catch(() => {});
  }, [user, scopedKey]);

  const clear = useCallback(() => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = null;
    latestPatch.current = null;
    if (!user || !scopedKey) return;
    const ref = doc(db, 'users', user.uid, 'exerciseProgress', scopedKey);
    deleteDoc(ref).catch(() => {});
  }, [user, scopedKey]);

  // Flush any pending write on unmount
  useEffect(() => {
    return () => {
      if (pendingRef.current && user && scopedKey && latestPatch.current) {
        clearTimeout(pendingRef.current);
        const ref = doc(db, 'users', user.uid, 'exerciseProgress', scopedKey);
        setDoc(ref, {
          ...latestPatch.current,
          updatedAt: new Date().toISOString(),
        }, { merge: true }).catch(() => {});
      }
    };
  }, [user, scopedKey]);

  return { saved, ready, save, flush, clear };
}
