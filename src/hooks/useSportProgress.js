import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function useSportProgress() {
  const { user } = useAuth();
  const dateKey = todayKey();
  const [done, setDone] = useState({});

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'sport', dateKey);
    const unsubscribe = onSnapshot(ref, (snap) => {
      setDone(snap.exists() ? snap.data().sections || {} : {});
    });
    return unsubscribe;
  }, [user, dateKey]);

  function toggleSection(key) {
    setDone((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (user) {
        const ref = doc(db, 'users', user.uid, 'sport', dateKey);
        setDoc(ref, { sections: next, date: dateKey }, { merge: true }).catch(() => {});
      }
      return next;
    });
  }

  return { done, toggleSection, dateKey };
}
