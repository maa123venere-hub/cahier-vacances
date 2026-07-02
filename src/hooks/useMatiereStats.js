import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

// Returns per-matière stats aggregated across ALL weeks for the current level.
export function useMatiereStats(jours = []) {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const [data, setData] = useState({ byMatiere: {}, loading: true });

  const joursRef = useRef(jours);
  joursRef.current = jours;

  useEffect(() => {
    if (!user) return;

    // If jours is empty, this level has no matière mapping — stop loading
    if (!joursRef.current.length) {
      setData({ byMatiere: {}, loading: false });
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const ref = collection(db, 'users', user.uid, 'exerciseSessions');
        const q = query(ref, orderBy('completedAt', 'desc'), limit(200));
        const snap = await getDocs(q);
        const allSessions = snap.docs.map((d) => d.data());

        // Filter by niveau AND subject (old sessions without fields default to 4ème / français)
        const sessions = allSessions.filter((d) => (d.niveau || '4eme') === levelId && (d.subject || 'francais') === matiereId);

        // Build dayKey → matière map
        const keyToMatiere = {};
        joursRef.current.forEach((j) => {
          const k = `${j.semaineIndex}-${j.jourIndex}`;
          keyToMatiere[k] = j.matiere || 'Général';
        });

        const byMatiere = {};
        sessions.forEach((s) => {
          const m = keyToMatiere[s.dayKey] || null;
          if (!m) return;
          if (!byMatiere[m]) byMatiere[m] = { correct: 0, total: 0, sessions: 0, perfectSessions: 0 };
          byMatiere[m].correct += s.score || 0;
          byMatiere[m].total += s.total || 0;
          byMatiere[m].sessions += 1;
          if (s.perfect) byMatiere[m].perfectSessions += 1;
        });

        if (!cancelled) setData({ byMatiere, loading: false });
      } catch {
        if (!cancelled) setData({ byMatiere: {}, loading: false });
      }
    })();

    return () => { cancelled = true; };
  // Re-run when user, level, subject, or jours availability changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, levelId, matiereId, jours.length > 0]);

  return data;
}
