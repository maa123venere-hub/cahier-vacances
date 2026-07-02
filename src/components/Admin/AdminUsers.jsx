import { useMemo, useState } from 'react';
import { useAdminUsers } from '../../hooks/useAdminUsers.js';
import { useAdminUserDetail } from '../../hooks/useAdminUserDetail.js';
import { adminDeleteUser, adminResetProgress, adminSendMessage } from '../../services/adminActions.js';
import './AdminUsers.css';

function formatDate(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function downloadCsv(users) {
  const header = 'Nom,Email,UID,Inscrit le\n';
  const rows = users.map((u) =>
    [u.displayName || '', u.email || '', u.id, formatDate(u.createdAt)]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `utilisateurs-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── User detail panel ─────────────────────────
function UserDetail({ user, onClose }) {
  const { detail, loading } = useAdminUserDetail(user?.id);
  const [message, setMessage] = useState('');
  const [msgStatus, setMsgStatus] = useState('');
  const [busyAction, setBusyAction] = useState('');

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setBusyAction('msg');
    try {
      await adminSendMessage(user.id, message);
      setMsgStatus('Message envoyé ✓');
      setMessage('');
    } catch {
      setMsgStatus('Échec de l\'envoi');
    } finally {
      setBusyAction('');
    }
  }

  async function handleReset() {
    if (!window.confirm('Réinitialiser toute la progression ? Action irréversible.')) return;
    setBusyAction('reset');
    try {
      await adminResetProgress(user.id);
      setMsgStatus('Progression réinitialisée ✓');
    } catch {
      setMsgStatus('Échec de la réinitialisation');
    } finally {
      setBusyAction('');
    }
  }

  async function handleDelete() {
    if (!window.confirm('Supprimer définitivement ce compte et toutes ses données ?')) return;
    setBusyAction('delete');
    try {
      await adminDeleteUser(user.id);
      onClose();
    } catch {
      setMsgStatus('Échec de la suppression');
      setBusyAction('');
    }
  }

  return (
    <aside className="user-detail">
      <div className="user-detail__header">
        <div className="user-detail__avatar">
          {(user.displayName || user.email || '?')[0].toUpperCase()}
        </div>
        <div>
          <div className="user-detail__name">{user.displayName || '(sans nom)'}</div>
          <div className="user-detail__email">{user.email}</div>
          <div className="user-detail__meta">Inscrit le {formatDate(user.createdAt)}</div>
        </div>
        <button className="user-detail__close" onClick={onClose} aria-label="Fermer">✕</button>
      </div>

      {loading && <div className="user-detail__loading">Chargement…</div>}

      {!loading && detail && (
        <>
          <div className="user-detail__kpis">
            <div className="ud-kpi">
              <span className="ud-kpi__val">{detail.sessions.length}</span>
              <span className="ud-kpi__lbl">Sessions</span>
            </div>
            <div className="ud-kpi">
              <span className="ud-kpi__val">{detail.avgPct}%</span>
              <span className="ud-kpi__lbl">Score moyen</span>
            </div>
            <div className="ud-kpi">
              <span className="ud-kpi__val">{detail.perfectCount}</span>
              <span className="ud-kpi__lbl">Parfaites</span>
            </div>
            <div className="ud-kpi">
              <span className="ud-kpi__val">{detail.daysStarted}</span>
              <span className="ud-kpi__lbl">Jours commencés</span>
            </div>
          </div>

          {detail.gamification && (
            <div className="user-detail__section">
              <div className="user-detail__section-title">🎮 Gamification</div>
              <div className="ud-gamif">
                <span>⚡ {detail.gamification.xp ?? 0} XP</span>
                <span>🏆 Niveau {detail.gamification.level ?? 1}</span>
                <span>🔥 Série {detail.gamification.streak ?? 0}j</span>
              </div>
            </div>
          )}

          <div className="user-detail__section">
            <div className="user-detail__section-title">📋 Dernières sessions</div>
            {detail.sessions.length === 0 && <p className="ud-empty">Aucune session.</p>}
            <div className="ud-sessions">
              {detail.sessions.slice(0, 8).map((s, i) => (
                <div key={i} className="ud-session-row">
                  <span className="ud-session-day">{s.dayKey || '—'}</span>
                  <div className="ud-session-bar-wrap">
                    <div className="ud-session-bar" style={{ width: `${s.pct || 0}%`, background: s.pct >= 80 ? '#16a34a' : s.pct >= 50 ? '#d97706' : '#dc2626' }} />
                  </div>
                  <span className="ud-session-pct">{s.pct ?? '—'}%</span>
                  <span className="ud-session-date">{formatTime(s.completedAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="user-detail__section">
        <div className="user-detail__section-title">✉️ Message privé</div>
        <form onSubmit={handleSendMessage} className="ud-msg-form">
          <textarea
            className="ud-msg-textarea"
            rows={3}
            placeholder="Ton message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button className="ud-btn ud-btn--primary" type="submit" disabled={busyAction === 'msg'}>
            {busyAction === 'msg' ? 'Envoi…' : 'Envoyer'}
          </button>
        </form>
        {msgStatus && <p className="ud-status">{msgStatus}</p>}
      </div>

      <div className="user-detail__actions">
        <button className="ud-btn ud-btn--warn" onClick={handleReset} disabled={!!busyAction}>
          {busyAction === 'reset' ? '…' : '↺ Réinitialiser progression'}
        </button>
        <button className="ud-btn ud-btn--danger" onClick={handleDelete} disabled={!!busyAction}>
          {busyAction === 'delete' ? '…' : '🗑 Supprimer le compte'}
        </button>
      </div>

      <div className="user-detail__uid">UID : {user.id}</div>
    </aside>
  );
}

// ── Main component ────────────────────────────
export default function AdminUsers() {
  const { users, loading, error, refresh } = useAdminUsers();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [selectedUser, setSelectedUser] = useState(null);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return users.filter((u) => u.createdAt?.toDate && u.createdAt.toDate().toDateString() === today).length;
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users
      .filter((u) => !q || u.email?.toLowerCase().includes(q) || u.displayName?.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === 'email') return (a.email || '').localeCompare(b.email || '');
        if (sort === 'name') return (a.displayName || '').localeCompare(b.displayName || '');
        const ta = a.createdAt?.toDate?.() || new Date(0);
        const tb = b.createdAt?.toDate?.() || new Date(0);
        return tb - ta;
      });
  }, [users, search, sort]);

  return (
    <div className={`admin-users ${selectedUser ? 'admin-users--split' : ''}`}>
      <div className="admin-users__list-pane">
        {/* toolbar */}
        <div className="au-toolbar">
          <div className="au-counts">
            <span className="au-count-badge">{users.length} utilisateurs</span>
            {todayCount > 0 && <span className="au-count-badge au-count-badge--new">+{todayCount} aujourd'hui</span>}
          </div>
          <div className="au-toolbar-right">
            <button className="au-btn-outline" onClick={() => downloadCsv(filtered)}>📥 CSV</button>
            <button className="au-btn-outline" onClick={refresh}>↻ Actualiser</button>
          </div>
        </div>

        <div className="au-filters">
          <input
            className="au-search"
            placeholder="🔍 Rechercher par nom ou e-mail…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="au-sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Plus récents</option>
            <option value="email">Par e-mail</option>
            <option value="name">Par nom</option>
          </select>
        </div>

        {error && <div className="au-error">{error}</div>}
        {loading && <div className="au-loading">Chargement…</div>}

        {!loading && filtered.length === 0 && (
          <div className="au-empty">Aucun utilisateur trouvé.</div>
        )}

        <div className="au-table">
          {filtered.map((u) => (
            <button
              key={u.id}
              className={`au-row ${selectedUser?.id === u.id ? 'au-row--active' : ''}`}
              onClick={() => setSelectedUser(u)}
            >
              <span className="au-row__avatar">
                {(u.displayName || u.email || '?')[0].toUpperCase()}
              </span>
              <div className="au-row__info">
                <span className="au-row__name">{u.displayName || '(sans nom)'}</span>
                <span className="au-row__email">{u.email}</span>
              </div>
              <span className="au-row__date">{formatDate(u.createdAt)}</span>
              <span className="au-row__chevron">›</span>
            </button>
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
