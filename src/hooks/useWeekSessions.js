import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

// Returns aggregated exercise session data for a given week (by semaineIndex).
// Filters by niveau so data doesn't bleed between 3ème/4ème/5ème/6ème.
export function useWeekSessions(semaineIndex, jours = []) {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const [data, setData] = useState({ sessions: [], byMatiere: {}, loading: true });

  // Keep a stable ref so the effect closure always sees latest jours without re-running
  const joursRef = useRef(jours);
  joursRef.current = jours;

  useEffect(() => {
    if (!user || semaineIndex == null) return;
    let cancelled = false;

    (async () => {
      try {
        const ref = collection(db, 'users', user.uid, 'exerciseSessions');
        const q = query(ref, orderBy('completedAt', 'desc'), limit(200));
        const snap = await getDocs(q);
        const all = snap.docs.map((d) => d.data());

        const prefix = `${semaineIndex}-`;
        // Filter by week, niveau AND subject (old sessions without fields default to 4ème / français)
        const sessions = all.filter((d) =>
          d.dayKey?.startsWith(prefix) && (d.niveau || '4eme') === levelId && (d.subject || 'francais') === matiereId
        );

        const joursMap = {};
        joursRef.current.forEach((j) => {
          joursMap[`${j.semaineIndex}-${j.jourIndex}`] = j.matiere || j.lecon || 'Général';
        });

        const byMatiere = {};
        sessions.forEach((s) => {
          const matiere = joursMap[s.dayKey] || 'Général';
          if (!byMatiere[matiere]) byMatiere[matiere] = { correct: 0, total: 0, sessions: [] };
          byMatiere[matiere].correct += s.score || 0;
          byMatiere[matiere].total += s.total || 0;
          byMatiere[matiere].sessions.push(s);
        });

        if (!cancelled) setData({ sessions, byMatiere, loading: false });
      } catch {
        if (!cancelled) setData({ sessions: [], byMatiere: {}, loading: false });
      }
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, levelId, matiereId, semaineIndex]);

  return data;
}
