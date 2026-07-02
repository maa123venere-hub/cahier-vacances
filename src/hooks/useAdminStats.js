import { useEffect, useState } from 'react';
import { collectionGroup, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAdminUsers } from './useAdminUsers.js';

const DAYS_WINDOW = 14;

function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildDailyMap(sessions) {
  const map = {};
  const now = new Date();
  for (let i = DAYS_WINDOW - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    map[dayKey(d)] = { date: d, sessions: 0, correctSum: 0, totalSum: 0 };
  }
  for (const s of sessions) {
    const ts = s.completedAt?.toDate?.();
    if (!ts) continue;
    const k = dayKey(ts);
    if (map[k]) {
      map[k].sessions += 1;
      map[k].correctSum += s.score || 0;
      map[k].totalSum += s.total || 0;
    }
  }
  return Object.values(map);
}

function buildTopDays(sessions) {
  const counts = {};
  for (const s of sessions) {
    if (!s.dayKey) continue;
    counts[s.dayKey] = (counts[s.dayKey] || 0) + 1;
  }
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([key, count]) => ({ key, count }));
}

export function useAdminStats() {
  const { users, loading: usersLoading } = useAdminUsers();
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSessions() {
      setSessionsLoading(true);
      try {
        const q = query(
          collectionGroup(db, 'exerciseSessions'),
          orderBy('completedAt', 'desc'),
          limit(500)
        );
        const snap = await getDocs(q);
        setSessions(snap.docs.map((d) => d.data()));
      } catch (e) {
        setError(e.message);
      } finally {
        setSessionsLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newUsersLast7d = users.filter((u) => {
    const d = u.createdAt?.toDate?.();
    return d && d >= sevenDaysAgo;
  }).length;

  const activeLast7d = new Set(
    sessions
      .filter((s) => {
        const d = s.completedAt?.toDate?.();
        return d && d >= sevenDaysAgo;
      })
      .map((s) => s.uid || null)
      .filter(Boolean)
  ).size;

  const avgScore = sessions.length
    ? Math.round(sessions.reduce((s, d) => s + (d.pct || 0), 0) / sessions.length)
    : 0;

  const totalExercisesDone = sessions.reduce((s, d) => s + (d.total || 0), 0);

  const sessionsLast7d = sessions.filter((s) => {
    const d = s.completedAt?.toDate?.();
    return d && d >= sevenDaysAgo;
  }).length;

  const daily = buildDailyMap(sessions);
  const topDays = buildTopDays(sessions);

  return {
    loading: usersLoading || sessionsLoading,
    error,
    totalUsers: users.length,
    newUsersLast7d,
    activeLast7d,
    totalSessions: sessions.length,
    sessionsLast7d,
    avgScore,
    totalExercisesDone,
    daily,
    topDays,
  };
}
