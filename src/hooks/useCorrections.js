import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

export function useCorrections(dayKey) {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const [corrections, setCorrections] = useState([]);

  useEffect(() => {
    if (!user) return;
    const ref = collection(db, 'users', user.uid, 'corrections');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Match day + level + subject (old corrections without fields default to 4ème / français)
      setCorrections(
        dayKey
          ? all.filter((c) => c.dayKey === dayKey && (c.niveau || '4eme') === levelId && (c.subject || 'francais') === matiereId)
          : all
      );
    });
    return unsubscribe;
  }, [user, dayKey, levelId, matiereId]);

  async function saveCorrection(entry) {
    if (!user) return;
    const ref = collection(db, 'users', user.uid, 'corrections');
    await addDoc(ref, { ...entry, niveau: levelId, subject: matiereId, createdAt: serverTimestamp() });
  }

  return { corrections, saveCorrection };
}
