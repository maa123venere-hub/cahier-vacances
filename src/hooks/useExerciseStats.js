import { useEffect, useState, useCallback } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

const DEFAULT = {
  totalExercisesDone: 0,
  totalCorrect: 0,
  totalWrong: 0,
  totalTimeSeconds: 0,
  perfectSessions: 0,
  sessionsCount: 0,
  averagePct: 0,
  lastSessionAt: null,
  recentSessions: [],
};

// Cache keyed by uid+niveau+matière so switching level or subject shows fresh stats
const cache = {};

export function invalidateStatsCache(uid, niveau, matiere) {
  const key = `${uid}_${niveau || '4eme'}_${matiere || 'francais'}`;
  if (cache[key]) delete cache[key];
}

export function useExerciseStats() {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const cacheKey = user ? `${user.uid}_${levelId}_${matiereId}` : null;

  const [stats, setStats] = useState(() => (cacheKey && cache[cacheKey]) ? cache[cacheKey] : DEFAULT);
  const [loading, setLoading] = useState(!cacheKey || !cache[cacheKey]);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const ref = collection(db, 'users', user.uid, 'exerciseSessions');
      const q = query(ref, orderBy('completedAt', 'desc'), limit(200));
      const snap = await getDocs(q);
      // Filter by niveau AND subject — old sessions (no field) fall back to 4ème / français
      const allDocs = snap.docs.map((d) => d.data());
      const docs = allDocs.filter((d) => (d.niveau || '4eme') === levelId && (d.subject || 'francais') === matiereId);

      if (!docs.length) {
        setStats(DEFAULT);
        cache[cacheKey] = DEFAULT;
        return;
      }

      const totalExercisesDone = docs.reduce((s, d) => s + (d.total || 0), 0);
      const totalCorrect       = docs.reduce((s, d) => s + (d.score || 0), 0);
      const totalWrong         = totalExercisesDone - totalCorrect;
      const totalTimeSeconds   = docs.reduce((s, d) => s + (d.elapsedSeconds || 0), 0);
      const perfectSessions    = docs.filter((d) => d.perfect).length;
      const avgPct             = docs.reduce((s, d) => s + (d.pct || 0), 0) / docs.length;

      const result = {
        totalExercisesDone,
        totalCorrect,
        totalWrong,
        totalTimeSeconds,
        perfectSessions,
        sessionsCount: docs.length,
        averagePct: Math.round(avgPct),
        lastSessionAt: docs[0]?.completedAt?.toDate?.() ?? null,
        recentSessions: docs.slice(0, 10)
          .map((d) => ({ dayKey: d.dayKey, pct: d.pct, score: d.score, total: d.total }))
          .reverse(),
      };

      cache[cacheKey] = result;
      setStats(result);

      // Persist aggregate snapshot to Firestore for admin/future use (per level + subject)
      const snapRef = doc(db, 'users', user.uid, 'statsSnapshot', `${levelId}_${matiereId}`);
      setDoc(snapRef, { ...result, niveau: levelId, subject: matiereId, updatedAt: serverTimestamp() }, { merge: true }).catch(() => {});
    } catch {
      setStats(DEFAULT);
    } finally {
      setLoading(false);
    }
  }, [user, levelId, matiereId, cacheKey]);

  useEffect(() => {
    if (cacheKey && cache[cacheKey]) {
      setStats(cache[cacheKey]);
      setLoading(false);
      return;
    }
    fetchStats();
  }, [fetchStats, cacheKey]);

  return { ...stats, loading, refresh: fetchStats };
}
