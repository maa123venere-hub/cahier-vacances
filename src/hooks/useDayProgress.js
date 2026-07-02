import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

const DEFAULT_PROGRESS = { lessonRead: false, photoSent: false, correctionDone: false };

export function useDayProgress(dayKey) {
  const { user, niveau, matiere } = useAuth();
  // Namespace by niveau AND matière so dayKeys don't collide across levels/subjects
  // (0-0 exists in every level, and in both Français and Maths).
  // Français keeps its legacy `${level}_${dayKey}` key so existing progress isn't lost.
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const scopedKey = matiereId === 'francais'
    ? `${levelId}_${dayKey}`
    : `${levelId}_${matiereId}_${dayKey}`;

  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'dayProgress', scopedKey);
    const unsubscribe = onSnapshot(ref, (snap) => {
      setProgress(snap.exists() ? { ...DEFAULT_PROGRESS, ...snap.data() } : DEFAULT_PROGRESS);
    });
    return unsubscribe;
  }, [user, scopedKey]);

  function patchProgress(patch) {
    setProgress((prev) => {
      const next = { ...prev, ...patch };
      if (user) {
        const ref = doc(db, 'users', user.uid, 'dayProgress', scopedKey);
        setDoc(ref, { ...next, updatedAt: new Date().toISOString() }, { merge: true }).catch(() => {});
      }
      return next;
    });
  }

  return {
    progress,
    markLessonRead: () => patchProgress({ lessonRead: true }),
    markPhotoSent: () => patchProgress({ photoSent: true }),
    markCorrectionDone: () => patchProgress({ correctionDone: true }),
  };
}
