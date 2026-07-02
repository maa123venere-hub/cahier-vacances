import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';

export function useAdminUserDetail(uid) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) { setDetail(null); return; }

    async function fetch() {
      setLoading(true);
      try {
        // Sessions (last 20)
        const sessRef = collection(db, 'users', uid, 'exerciseSessions');
        const q = query(sessRef, orderBy('completedAt', 'desc'), limit(20));
        const sessSnap = await getDocs(q);
        const sessions = sessSnap.docs.map((d) => d.data());

        // Gamification stats
        const gamRef = doc(db, 'users', uid, 'gamification', 'stats');
        const gamSnap = await getDoc(gamRef);
        const gamification = gamSnap.exists() ? gamSnap.data() : null;

        // Exercise progress docs (to count days started)
        const progRef = collection(db, 'users', uid, 'exerciseProgress');
        const progSnap = await getDocs(progRef);
        const daysStarted = progSnap.size;

        const totalQuestions = sessions.reduce((s, d) => s + (d.total || 0), 0);
        const totalCorrect   = sessions.reduce((s, d) => s + (d.score || 0), 0);
        const avgPct = sessions.length
          ? Math.round(sessions.reduce((s, d) => s + (d.pct || 0), 0) / sessions.length)
          : 0;
        const perfectCount = sessions.filter((s) => s.perfect).length;

        setDetail({ sessions, gamification, daysStarted, totalQuestions, totalCorrect, avgPct, perfectCount });
      } catch {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [uid]);

  return { detail, loading };
}
