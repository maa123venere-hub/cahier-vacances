import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

const DEFAULT_SETTINGS = { notifications: false, language: 'fr' };

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'settings', 'preferences');
    const unsubscribe = onSnapshot(ref, (snap) => {
      setSettings(snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS);
    });
    return unsubscribe;
  }, [user]);

  function updateSettings(patch) {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      if (user) {
        const ref = doc(db, 'users', user.uid, 'settings', 'preferences');
        setDoc(ref, next, { merge: true }).catch(() => {});
      }
      return next;
    });
  }

  return { settings, updateSettings };
}
