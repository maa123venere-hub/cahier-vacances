import { useMemo, useState } from 'react';
import { useAdminUsers } from '../../hooks/useAdminUsers.js';
import { useAnnouncements } from '../../hooks/useAnnouncements.js';
import { adminDeleteUser, adminResetProgress, adminSendMessage, adminBroadcastNotification } from '../../services/adminActions.js';
import './AdminDashboard.css';

const PROJECT_ID = 'cahier-de-vacance-ae45b';

function formatDate(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function downloadCsv(users) {
  const header = 'Nom,Email,UID,Inscrit le\n';
  const rows = users.map((u) => [
    u.displayName || '',
    u.email || '',
    u.id,
    formatDate(u.createdAt),
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `utilisateurs-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const { users, loading, error, refresh } = useAdminUsers();
  const { announcements, removeAnnouncement } = useAnnouncements();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [feedback, setFeedback] = useState({});
  const [busyUid, setBusyUid] = useState(null);
  const [messageUid, setMessageUid] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageBusy, setMessageBusy] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceText, setAnnounceText] = useState('');
  const [announceBusy, setAnnounceBusy] = useState(false);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return users.filter((u) => u.createdAt?.toDate && u.createdAt.toDate().toDateString() === today).length;
  }, [users]);

  const filtered = users
    .filter((u) => !search || u.email?.toLowerCase().includes(search.toLowerCase()) || u.displayName?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'email') return (a.email || '').localeCompare(b.email || '');
      const ta = a.createdAt?.toDate?.() || new Date(0);
      const tb = b.createdAt?.toDate?.() || new Date(0);
      return tb - ta;
    });

  function setUserFeedback(uid, message, isError = false) {
    setFeedback((prev) => ({ ...prev, [uid]: { message, isError } }));
  }

  async function handleReset(uid) {
    if (!window.confirm('Réinitialiser toute la progression de cet utilisateur ? Cette action est irréversible.')) return;
    setBusyUid(uid);
    try {
      await adminResetProgress(uid);
      setUserFeedback(uid, 'Progression réinitialisée.');
    } catch {
      setUserFeedback(uid, 'Échec de la réinitialisation.', true);
    } finally {
      setBusyUid(null);
    }
  }

  async function handleDelete(uid) {
    if (!window.confirm('Supprimer définitivement ce compte et toutes ses données ? Cette action est irréversible.')) return;
    setBusyUid(uid);
    try {
      await adminDeleteUser(uid);
      setUserFeedback(uid, 'Compte supprimé.');
      refresh();
    } catch {
      setUserFeedback(uid, 'Échec de la suppression.', true);
    } finally {
      setBusyUid(null);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!messageUid || !messageText.trim()) return;
    setMessageBusy(true);
    try {
      await adminSendMessage(messageUid, messageText);
      setUserFeedback(messageUid, 'Message envoyé.');
      setMessageText('');
    } catch {
      setUserFeedback(messageUid, "Échec de l'envoi du message.", true);
    } finally {
      setMessageBusy(false);
    }
  }

  async function handleBroadcast(e) {
    e.preventDefault();
    if (!announceTitle.trim() || !announceText.trim()) return;
    setAnnounceBusy(true);
    try {
      await adminBroadcastNotification(announceTitle, announceText);
      setAnnounceTitle('');
      setAnnounceText('');
    } catch {
      // silently fail visually via disabled state reset; not critical enough for a dedicated banner here
    } finally {
      setAnnounceBusy(false);
    }
  }

  return (
    <div className="admin-body">
      <div className="admin-cards">
        <div className="admin-card">
          <div className="admin-card-value">{loading ? '…' : users.length}</div>
          <div className="admin-card-label">Utilisateurs totaux</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-value">{loading ? '…' : todayCount}</div>
          <div className="admin-card-label">Inscrits aujourd'hui</div>
        </div>
      </div>

      <button className="admin-export-btn" onClick={() => downloadCsv(filtered)}>📥 Télécharger en CSV</button>

      <input className="admin-search" placeholder="🔍 Rechercher par e-mail ou nom…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="admin-sort">
        <button className={`admin-sort-btn ${sort === 'recent' ? 'active' : ''}`} onClick={() => setSort('recent')}>Plus récents</button>
        <button className={`admin-sort-btn ${sort === 'email' ? 'active' : ''}`} onClick={() => setSort('email')}>Par e-mail</button>
      </div>

      {error && <div className="admin-empty">{error}</div>}
      {!loading && filtered.length === 0 && <div className="admin-empty">Aucun utilisateur trouvé.</div>}

      <div className="admin-table-wrap">
        {filtered.map((u) => (
          <div key={u.id} className="admin-row">
            <span className="admin-row-email">{u.displayName || '(sans nom)'} — {u.email}</span>
            <span className="admin-row-meta">Inscrit le {formatDate(u.createdAt)} · UID {u.id.slice(0, 10)}…</span>
            <div className="admin-row-actions">
              <button className="admin-action-btn" disabled={busyUid === u.id} onClick={() => { setMessageUid(u.id); }}>✉️ Sélectionner pour message</button>
              <button className="admin-action-btn" disabled={busyUid === u.id} onClick={() => handleReset(u.id)}>↺ Réinitialiser progression</button>
              <button className="admin-action-btn danger" disabled={busyUid === u.id} onClick={() => handleDelete(u.id)}>🗑 Supprimer le compte</button>
            </div>
            {feedback[u.id] && (
              <div className={`admin-action-feedback ${feedback[u.id].isError ? 'error' : ''}`}>{feedback[u.id].message}</div>
            )}
          </div>
        ))}
      </div>

      <div className="admin-section-title">✉️ Envoyer un message privé</div>
      <form className="admin-form-card" onSubmit={handleSendMessage}>
        <select className="admin-form-select" value={messageUid} onChange={(e) => setMessageUid(e.target.value)} required>
          <option value="">Choisir un utilisateur…</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.displayName || u.email}</option>)}
        </select>
        <textarea className="admin-form-textarea" rows={3} placeholder="Ton message…" value={messageText} onChange={(e) => setMessageText(e.target.value)} required />
        <button className="admin-form-submit" type="submit" disabled={messageBusy}>{messageBusy ? 'Envoi…' : 'Envoyer le message'}</button>
      </form>

      <div className="admin-section-title">📣 Annonce visible par tous</div>
      <form className="admin-form-card" onSubmit={handleBroadcast}>
        <input className="admin-form-input" placeholder="Titre de l'annonce" value={announceTitle} onChange={(e) => setAnnounceTitle(e.target.value)} required />
        <textarea className="admin-form-textarea" rows={2} placeholder="Texte de l'annonce" value={announceText} onChange={(e) => setAnnounceText(e.target.value)} required />
        <button className="admin-form-submit" type="submit" disabled={announceBusy}>{announceBusy ? 'Publication…' : 'Publier l\'annonce'}</button>

        {announcements.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {announcements.map((a) => (
              <div className="announce-list-item" key={a.id}>
                <span><strong>{a.title}</strong> — {a.text}</span>
                <button type="button" className="announce-list-delete" onClick={() => removeAnnouncement(a.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="admin-section-title">🛠️ Infrastructure</div>
      <div className="admin-form-card infra-links">
        <a className="infra-link" href={`https://console.firebase.google.com/project/${PROJECT_ID}/firestore`} target="_blank" rel="noreferrer">📦 Firestore — données &amp; règles</a>
        <a className="infra-link" href={`https://console.firebase.google.com/project/${PROJECT_ID}/functions`} target="_blank" rel="noreferrer">⚡ Cloud Functions — logs &amp; statistiques</a>
        <a className="infra-link" href={`https://console.firebase.google.com/project/${PROJECT_ID}/authentication/users`} target="_blank" rel="noreferrer">👤 Authentication — comptes</a>
        <a className="infra-link" href={`https://console.firebase.google.com/project/${PROJECT_ID}/storage`} target="_blank" rel="noreferrer">🗄️ Storage — fichiers envoyés</a>
      </div>

      <div className="admin-notice">
        ℹ️ La publication de nouvelles leçons, exercices, recettes et défis n'est pas encore disponible ici : ce contenu est actuellement codé en dur dans l'application plutôt que stocké dans Firestore. C'est une évolution possible pour une prochaine phase.
      </div>
    </div>
  );
}
