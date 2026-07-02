import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

export function useFavorites(kind = 'recipes') {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'favorites', kind);
    const unsubscribe = onSnapshot(ref, (snap) => {
      setFavorites(snap.exists() ? snap.data().ids || [] : []);
    });
    return unsubscribe;
  }, [user, kind]);

  function toggleFavorite(itemId) {
    setFavorites((prev) => {
      const next = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      if (user) {
        const ref = doc(db, 'users', user.uid, 'favorites', kind);
        setDoc(ref, { ids: next }, { merge: true }).catch(() => {});
      }
      return next;
    });
  }

  return { favorites, toggleFavorite };
}
