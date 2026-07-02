import { useEffect, useState, useCallback } from 'react';
import {
  collection, collectionGroup, getDocs, query, orderBy, limit,
  addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

export const PROJECT_ID = 'cahier-de-vacance-ae45b';

// ── CSV helpers ───────────────────────────────
function toCSV(rows, columns) {
  const header = columns.map((c) => `"${c.label}"`).join(',');
  const body   = rows.map((r) => columns.map((c) => {
    const v = c.get(r);
    return `"${String(v ?? '').replace(/"/g, '""')}"`;
  }).join(',')).join('\n');
  return header + '\n' + body;
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function stamp() {
  return new Date().toISOString().slice(0, 10);
}

function fmtTs(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleString('fr-FR');
}

// ── Hook ──────────────────────────────────────
export function useAdminMaintenance() {
  const [logs, setLogs]         = useState([]);
  const [logsLoading, setLL]    = useState(true);
  const [backupBusy, setBB]     = useState(false);
  const [backupStatus, setBS]   = useState('');
  const [exportBusy, setEB]     = useState(false);

  // Load error logs (collection `errorLogs`, most recent 50)
  useEffect(() => {
    async function fetchLogs() {
      setLL(true);
      try {
        const q = query(collection(db, 'errorLogs'), orderBy('createdAt', 'desc'), limit(50));
        const snap = await getDocs(q);
        setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setLogs([]);
      } finally {
        setLL(false);
      }
    }
    fetchLogs();
  }, []);

  // Export users CSV
  async function exportUsersCSV() {
    setEB(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const csv = toCSV(users, [
        { label: 'UID',        get: (u) => u.id },
        { label: 'Nom',        get: (u) => u.displayName || '' },
        { label: 'Email',      get: (u) => u.email || '' },
        { label: 'Inscrit le', get: (u) => fmtTs(u.createdAt) },
      ]);
      downloadBlob(csv, `utilisateurs-${stamp()}.csv`, 'text/csv;charset=utf-8;');
    } finally {
      setEB(false);
    }
  }

  // Export sessions CSV
  async function exportSessionsCSV() {
    setEB(true);
    try {
      const q    = query(collectionGroup(db, 'exerciseSessions'), orderBy('completedAt', 'desc'), limit(2000));
      const snap = await getDocs(q);
      const rows = snap.docs.map((d) => d.data());
      const csv  = toCSV(rows, [
        { label: 'Jour',          get: (s) => s.dayKey || '' },
        { label: 'Score',         get: (s) => s.score ?? '' },
        { label: 'Total',         get: (s) => s.total ?? '' },
        { label: 'Pct',           get: (s) => s.pct ?? '' },
        { label: 'Parfait',       get: (s) => s.perfect ? 'oui' : 'non' },
        { label: 'XP',            get: (s) => s.xpEarned ?? '' },
        { label: 'Durée (s)',     get: (s) => s.elapsedSeconds ?? '' },
        { label: 'Complété le',   get: (s) => fmtTs(s.completedAt) },
      ]);
      downloadBlob(csv, `sessions-${stamp()}.csv`, 'text/csv;charset=utf-8;');
    } finally {
      setEB(false);
    }
  }

  // Full JSON backup
  async function runBackup() {
    setBB(true);
    setBS('');
    try {
      const [usersSnap, currSnap, announSnap, chalSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'curriculum')),
        getDocs(collection(db, 'announcements')),
        getDocs(collection(db, 'challenges')),
      ]);

      const backup = {
        exportedAt: new Date().toISOString(),
        projectId: PROJECT_ID,
        users: usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
        curriculum: currSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
        announcements: announSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
        challenges: chalSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      };

      const json = JSON.stringify(backup, (key, val) => {
        // Serialize Firestore Timestamps
        if (val && typeof val === 'object' && val.seconds !== undefined && val.nanoseconds !== undefined) {
          return new Date(val.seconds * 1000).toISOString();
        }
        return val;
      }, 2);

      downloadBlob(json, `backup-${stamp()}.json`, 'application/json');

      // Log the backup event
      await addDoc(collection(db, 'errorLogs'), {
        level: 'info',
        message: 'Backup manuel exporté',
        createdAt: serverTimestamp(),
      });

      setBS(`✓ Backup exporté — ${backup.users.length} utilisateurs, ${backup.curriculum.length} jours, ${backup.challenges.length} défis.`);
    } catch (e) {
      setBS(`⚠️ Erreur : ${e.message}`);
    } finally {
      setBB(false);
    }
  }

  return {
    logs, logsLoading,
    backupBusy, backupStatus, runBackup,
    exportBusy, exportUsersCSV, exportSessionsCSV,
  };
}
