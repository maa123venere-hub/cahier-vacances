import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

export const TYPE_DIFFICULTY = { vrai_faux: 1, qcm: 2, completer: 3 };

// Module-level cache: { uid: { dayKey: { level, lastPct, fetchedAt } } }
const cache = {};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function useAdaptiveDifficulty(dayKey) {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  // Cache/query scope: adaptive level is per day, per level AND per subject
  const scopedKey = dayKey ? `${levelId}_${matiereId}_${dayKey}` : null;
  const [level, setLevel] = useState('normal');
  const [lastPct, setLastPct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !dayKey) { setLoading(false); return; }

    // Check cache first
    const userCache = cache[user.uid] || {};
    const cached = userCache[scopedKey];
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setLevel(cached.level);
      setLastPct(cached.lastPct);
      setLoading(false);
      return;
    }

    // Keep only sessions of the same day, level and subject
    const sameScope = (d) => d.dayKey === dayKey && (d.niveau || '4eme') === levelId && (d.subject || 'francais') === matiereId;

    async function fetchLevel() {
      try {
        const ref = collection(db, 'users', user.uid, 'exerciseSessions');

        let sessions = [];
        try {
          // Requires composite index: dayKey ASC + completedAt DESC
          const q = query(ref, where('dayKey', '==', dayKey), orderBy('completedAt', 'desc'), limit(15));
          const snap = await getDocs(q);
          sessions = snap.docs.map((d) => d.data()).filter(sameScope).slice(0, 3);
        } catch {
          // Fallback if composite index doesn't exist yet: read recent and filter client-side
          const qFallback = query(ref, orderBy('completedAt', 'desc'), limit(50));
          const snap = await getDocs(qFallback);
          sessions = snap.docs.map((d) => d.data()).filter(sameScope).slice(0, 3);
        }

        let computedLevel = 'normal';
        let computedPct = null;

        if (sessions.length > 0) {
          const weights = [3, 2, 1];
          const weightedPct =
            sessions.reduce((sum, s, i) => sum + (s.pct || 0) * (weights[i] || 1), 0) /
            sessions.reduce((sum, _, i) => sum + (weights[i] || 1), 0);
          computedPct = Math.round(weightedPct);
          computedLevel = computedPct < 50 ? 'easy' : computedPct >= 80 ? 'hard' : 'normal';
        }

        // Store in cache
        cache[user.uid] = { ...userCache, [scopedKey]: { level: computedLevel, lastPct: computedPct, fetchedAt: Date.now() } };
        setLevel(computedLevel);
        setLastPct(computedPct);
      } catch {
        setLevel('normal');
      } finally {
        setLoading(false);
      }
    }
    fetchLevel();
  }, [user, scopedKey]);

  function adaptExercises(exercises) {
    if (level === 'easy') {
      return [...exercises].sort((a, b) => (TYPE_DIFFICULTY[a.type] || 2) - (TYPE_DIFFICULTY[b.type] || 2));
    }
    if (level === 'hard') {
      return [...exercises].sort((a, b) => (TYPE_DIFFICULTY[b.type] || 2) - (TYPE_DIFFICULTY[a.type] || 2));
    }
    return exercises;
  }

  // Invalidate cache for this day after a session completes
  function invalidateCache() {
    if (user && cache[user.uid]?.[scopedKey]) {
      delete cache[user.uid][scopedKey];
    }
  }

  return { level, lastPct, loading, adaptExercises, invalidateCache };
}
