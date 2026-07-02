import { useEffect, useState } from 'react';
import { collectionGroup, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';

function dayLabel(isoDate) {
  const d = new Date(isoDate);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export function useAdminAdvancedStats() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const q = query(
          collectionGroup(db, 'exerciseSessions'),
          orderBy('completedAt', 'desc'),
          limit(1000)
        );
        const snap = await getDocs(q);
        setSessions(snap.docs.map((d) => d.data()));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  // ── Derived stats ─────────────────────────────

  // 1. Daily activity — last 30 days
  const daily30 = (() => {
    const map = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      map[k] = { date: d, label: dayLabel(k), sessions: 0, avgPct: 0, pctSum: 0, timeSum: 0 };
    }
    for (const s of sessions) {
      const ts = s.completedAt?.toDate?.();
      if (!ts) continue;
      const k = ts.toISOString().slice(0, 10);
      if (map[k]) {
        map[k].sessions += 1;
        map[k].pctSum += s.pct || 0;
        map[k].timeSum += s.elapsedSeconds || 0;
      }
    }
    return Object.values(map).map((d) => ({
      ...d,
      avgPct: d.sessions ? Math.round(d.pctSum / d.sessions) : 0,
      avgTime: d.sessions ? Math.round(d.timeSum / d.sessions) : 0,
    }));
  })();

  // 2. Per-day stats (curriculum day key)
  const perDay = (() => {
    const map = {};
    for (const s of sessions) {
      if (!s.dayKey) continue;
      if (!map[s.dayKey]) map[s.dayKey] = { dayKey: s.dayKey, count: 0, pctSum: 0, timeSum: 0, perfectCount: 0 };
      map[s.dayKey].count += 1;
      map[s.dayKey].pctSum += s.pct || 0;
      map[s.dayKey].timeSum += s.elapsedSeconds || 0;
      if (s.perfect) map[s.dayKey].perfectCount += 1;
    }
    return Object.values(map)
      .filter((d) => d.count >= 1)
      .map((d) => ({
        ...d,
        avgPct: Math.round(d.pctSum / d.count),
        avgTime: Math.round(d.timeSum / d.count),
        perfectRate: Math.round((d.perfectCount / d.count) * 100),
      }))
      .sort((a, b) => a.dayKey.localeCompare(b.dayKey, undefined, { numeric: true }));
  })();

  const hardestDays  = [...perDay].sort((a, b) => a.avgPct - b.avgPct).slice(0, 5);
  const easiestDays  = [...perDay].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5);
  const mostPracticed = [...perDay].sort((a, b) => b.count - a.count).slice(0, 5);

  // 3. Score distribution (buckets 0-19, 20-39, 40-59, 60-79, 80-100)
  const scoreDist = [0, 20, 40, 60, 80].map((min, i, arr) => {
    const max = arr[i + 1] ?? 101;
    const count = sessions.filter((s) => (s.pct ?? 0) >= min && (s.pct ?? 0) < max).length;
    return { label: `${min}–${max === 101 ? 100 : max - 1}%`, count };
  });

  // 4. Time distribution (< 1min, 1-3min, 3-5min, 5-10min, >10min)
  const timeDist = [
    { label: '< 1 min',  min: 0,   max: 60 },
    { label: '1–3 min',  min: 60,  max: 180 },
    { label: '3–5 min',  min: 180, max: 300 },
    { label: '5–10 min', min: 300, max: 600 },
    { label: '> 10 min', min: 600, max: Infinity },
  ].map((b) => ({
    label: b.label,
    count: sessions.filter((s) => (s.elapsedSeconds || 0) >= b.min && (s.elapsedSeconds || 0) < b.max).length,
  }));

  // 5. Global KPIs
  const totalSessions   = sessions.length;
  const avgScore        = totalSessions ? Math.round(sessions.reduce((s, d) => s + (d.pct || 0), 0) / totalSessions) : 0;
  const avgTimeSec      = totalSessions ? Math.round(sessions.reduce((s, d) => s + (d.elapsedSeconds || 0), 0) / totalSessions) : 0;
  const perfectRate     = totalSessions ? Math.round((sessions.filter((s) => s.perfect).length / totalSessions) * 100) : 0;
  const totalTime       = sessions.reduce((s, d) => s + (d.elapsedSeconds || 0), 0);

  return {
    loading, error,
    daily30, perDay, hardestDays, easiestDays, mostPracticed,
    scoreDist, timeDist,
    totalSessions, avgScore, avgTimeSec, perfectRate, totalTime,
  };
}
