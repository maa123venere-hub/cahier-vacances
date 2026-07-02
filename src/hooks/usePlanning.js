import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';
import { buildDefaultPlanning } from '../data/planningTemplate.js';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function usePlanning() {
  const { user } = useAuth();
  const [planning, setPlanning] = useState(buildDefaultPlanning);
  const saveRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'planning', 'week');
    const unsubscribe = onSnapshot(ref, (snap) => {
      setPlanning(snap.exists() && snap.data().days ? snap.data().days : buildDefaultPlanning());
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    saveRef.current = debounce((next) => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'planning', 'week');
      setDoc(ref, { days: next, updatedAt: new Date().toISOString() }, { merge: false }).catch(() => {});
    }, 500);
  }, [user]);

  function updateSlot(day, slotKey, patch) {
    setPlanning((prev) => {
      const next = {
        ...prev,
        [day]: {
          ...prev[day],
          [slotKey]: { ...prev[day][slotKey], ...patch },
        },
      };
      saveRef.current?.(next);
      return next;
    });
  }

  // ── Planning personnalisé (généré) : liste d'items horodatés ──
  // Stocké sous la clé réservée `_items` du jour ; s'il existe, il
  // remplace l'affichage des créneaux classiques pour ce jour.
  function setDayItems(day, items) {
    setPlanning((prev) => {
      const next = {
        ...prev,
        [day]: {
          ...prev[day],
          _items: items.map((it) => ({ done: false, ...it })),
        },
      };
      saveRef.current?.(next);
      return next;
    });
  }

  function updateItem(day, index, patch) {
    setPlanning((prev) => {
      const items = [...(prev[day]?._items || [])];
      if (!items[index]) return prev;
      items[index] = { ...items[index], ...patch };
      const next = { ...prev, [day]: { ...prev[day], _items: items } };
      saveRef.current?.(next);
      return next;
    });
  }

  function resetDay(day) {
    setPlanning((prev) => {
      const dayData = { ...prev[day] };
      delete dayData._items;
      const next = { ...prev, [day]: dayData };
      saveRef.current?.(next);
      return next;
    });
  }

  return { planning, updateSlot, setDayItems, updateItem, resetDay };
}
