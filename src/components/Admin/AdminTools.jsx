import { useState } from 'react';
import { useAdminTools } from '../../hooks/useAdminTools.js';
import './AdminTools.css';

const BADGE_ICONS = ['⭐', '🏆', '🎯', '🔥', '💎', '🦋', '🚀', '📚', '✨', '🎓'];

const TOOL_TABS = [
  { id: 'announcements', icon: '📣', label: 'Annonces' },
  { id: 'messages',      icon: '✉️',  label: 'Messages' },
  { id: 'challenges',    icon: '🎯',  label: 'Défis' },
  { id: 'badges',        icon: '🏅',  label: 'Badges' },
];

// ── Announcements ─────────────────────────────
function AnnouncementsTab({ announcements, removeAnnouncement, publishAnnouncement }) {
  const [title, setTitle]   = useState('');
  const [text, setText]     = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      await publishAnnouncement(title, text);
      setTitle(''); setText('');
      setStatus('✓ Annonce publiée et envoyée à tous les utilisateurs.');
    } catch {
      setStatus('⚠️ Échec de la publication.');
    } finally {
      setBusy(false);
    }
  }

  function formatDate(ts) {
    if (!ts?.toDate) return '';
    return ts.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="tool-section">
      <div className="tool-section__title">Publier une annonce globale</div>
      <p className="tool-section__desc">Visible immédiatement par tous les utilisateurs connectés.</p>
      <form className="tool-form" onSubmit={handleSubmit}>
        <input className="tool-input" placeholder="Titre de l'annonce *" value={title}
          onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="tool-textarea" rows={3} placeholder="Texte de l'annonce *" value={text}
          onChange={(e) => setText(e.target.value)} required />
        <button className="tool-btn tool-btn--primary" type="submit" disabled={busy}>
          {busy ? 'Publication…' : '📣 Publier l\'annonce'}
        </button>
        {status && <p className="tool-status">{status}</p>}
      </form>

      {announcements.length > 0 && (
        <div className="tool-list">
          <div className="tool-list__title">Annonces actives ({announcements.length})</div>
          {announcements.map((a) => (
            <div key={a.id} className="tool-list-item">
              <div className="tool-list-item__body">
                <strong>{a.title}</strong>
                <span>{a.text}</span>
                <span className="tool-list-item__date">{formatDate(a.createdAt)}</span>
              </div>
              <button className="tool-list-item__del" onClick={() => removeAnnouncement(a.id)} title="Supprimer">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Private messages ──────────────────────────
function MessagesTab({ users, sendPrivateMessage }) {
  const [uid, setUid]       = useState('');
  const [text, setText]     = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      await sendPrivateMessage(uid, text);
      setText('');
      setStatus('✓ Message envoyé.');
    } catch {
      setStatus('⚠️ Échec de l\'envoi.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tool-section">
      <div className="tool-section__title">Message privé</div>
      <p className="tool-section__desc">Envoie un message directement visible par un utilisateur dans son espace.</p>
      <form className="tool-form" onSubmit={handleSubmit}>
        <select className="tool-select" value={uid} onChange={(e) => setUid(e.target.value)} required>
          <option value="">Choisir un utilisateur…</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.displayName || u.email}</option>
          ))}
        </select>
        <textarea className="tool-textarea" rows={4} placeholder="Ton message…" value={text}
          onChange={(e) => setText(e.target.value)} required />
        <button className="tool-btn tool-btn--primary" type="submit" disabled={busy || !uid}>
          {busy ? 'Envoi…' : '✉️ Envoyer le message'}
        </button>
        {status && <p className="tool-status">{status}</p>}
      </form>
    </div>
  );
}

// ── Challenges ────────────────────────────────
function ChallengesTab({ challenges, addChallenge, toggleChallenge, deleteChallenge }) {
  const [title, setTitle]       = useState('');
  const [desc, setDesc]         = useState('');
  const [xp, setXp]             = useState(50);
  const [endsAt, setEndsAt]     = useState('');
  const [status, setStatus]     = useState('');
  const [busy, setBusy]         = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      await addChallenge(title, desc, xp, endsAt);
      setTitle(''); setDesc(''); setXp(50); setEndsAt('');
      setStatus('✓ Défi créé.');
    } catch {
      setStatus('⚠️ Erreur lors de la création.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tool-section">
      <div className="tool-section__title">Créer un défi</div>
      <p className="tool-section__desc">Les défis s'affichent sur la page d'accueil et motivent les élèves à progresser.</p>
      <form className="tool-form" onSubmit={handleSubmit}>
        <input className="tool-input" placeholder="Titre du défi *" value={title}
          onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="tool-textarea" rows={2} placeholder="Description…" value={desc}
          onChange={(e) => setDesc(e.target.value)} />
        <div className="tool-form-row">
          <label className="tool-label">⚡ XP récompense</label>
          <input className="tool-input tool-input--sm" type="number" min={10} max={500} value={xp}
            onChange={(e) => setXp(e.target.value)} />
        </div>
        <div className="tool-form-row">
          <label className="tool-label">📅 Date de fin</label>
          <input className="tool-input tool-input--sm" type="date" value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)} />
        </div>
        <button className="tool-btn tool-btn--primary" type="submit" disabled={busy}>
          {busy ? 'Création…' : '🎯 Créer le défi'}
        </button>
        {status && <p className="tool-status">{status}</p>}
      </form>

      {challenges.length > 0 && (
        <div className="tool-list">
          <div className="tool-list__title">Défis ({challenges.length})</div>
          {challenges.map((c) => (
            <div key={c.id} className={`tool-list-item ${!c.active ? 'tool-list-item--inactive' : ''}`}>
              <div className="tool-list-item__body">
                <strong>{c.title}</strong>
                {c.description && <span>{c.description}</span>}
                <span className="tool-list-item__meta">⚡ {c.xpReward} XP{c.endsAt ? ` · fin le ${c.endsAt}` : ''}</span>
              </div>
              <div className="tool-list-item__actions">
                <button className={`tool-toggle ${c.active ? 'tool-toggle--on' : ''}`}
                  onClick={() => toggleChallenge(c.id, c.active)}>
                  {c.active ? 'Actif' : 'Inactif'}
                </button>
                <button className="tool-list-item__del" onClick={() => deleteChallenge(c.id)} title="Supprimer">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {challenges.length === 0 && (
        <p className="tool-empty">Aucun défi créé. Crée le premier ci-dessus.</p>
      )}
    </div>
  );
}

// ── Badges ────────────────────────────────────
function BadgesTab({ users, badges, awardBadge, deleteBadge }) {
  const [uid, setUid]       = useState('');
  const [icon, setIcon]     = useState('⭐');
  const [label, setLabel]   = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      await awardBadge(uid, label, icon);
      setLabel('');
      setStatus(`✓ Badge ${icon} "${label}" attribué.`);
    } catch {
      setStatus('⚠️ Erreur lors de l\'attribution.');
    } finally {
      setBusy(false);
    }
  }

  const userMap = Object.fromEntries(users.map((u) => [u.id, u.displayName || u.email]));

  return (
    <div className="tool-section">
      <div className="tool-section__title">Attribuer un badge</div>
      <p className="tool-section__desc">Les badges apparaissent sur le profil de l'élève et dans son historique.</p>
      <form className="tool-form" onSubmit={handleSubmit}>
        <select className="tool-select" value={uid} onChange={(e) => setUid(e.target.value)} required>
          <option value="">Choisir un utilisateur…</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.displayName || u.email}</option>)}
        </select>

        <div className="tool-form-row">
          <label className="tool-label">Icône</label>
          <div className="badge-icon-picker">
            {BADGE_ICONS.map((ic) => (
              <button key={ic} type="button"
                className={`badge-icon-btn ${icon === ic ? 'badge-icon-btn--active' : ''}`}
                onClick={() => setIcon(ic)}>{ic}</button>
            ))}
          </div>
        </div>

        <input className="tool-input" placeholder="Nom du badge *" value={label}
          onChange={(e) => setLabel(e.target.value)} required />

        <button className="tool-btn tool-btn--primary" type="submit" disabled={busy || !uid}>
          {busy ? 'Attribution…' : `${icon} Attribuer le badge`}
        </button>
        {status && <p className="tool-status">{status}</p>}
      </form>

      {badges.length > 0 && (
        <div className="tool-list">
          <div className="tool-list__title">Badges attribués récemment ({badges.length})</div>
          {badges.slice(0, 15).map((b) => (
            <div key={b.id} className="tool-list-item">
              <div className="tool-list-item__body">
                <strong>{b.icon} {b.label}</strong>
                <span>{userMap[b.uid] || b.uid}</span>
              </div>
              <button className="tool-list-item__del" onClick={() => deleteBadge(b.id)} title="Supprimer">✕</button>
            </div>
          ))}
        </div>
      )}

      {badges.length === 0 && (
        <p className="tool-empty">Aucun badge attribué pour l'instant.</p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────
export default function AdminTools() {
  const [activeTab, setActiveTab] = useState('announcements');
  const tools = useAdminTools();

  function renderTab() {
    if (activeTab === 'announcements') return (
      <AnnouncementsTab
        announcements={tools.announcements}
        removeAnnouncement={tools.removeAnnouncement}
        publishAnnouncement={tools.publishAnnouncement}
      />
    );
    if (activeTab === 'messages') return (
      <MessagesTab users={tools.users} sendPrivateMessage={tools.sendPrivateMessage} />
    );
    if (activeTab === 'challenges') return (
      <ChallengesTab
        challenges={tools.challenges}
        addChallenge={tools.addChallenge}
        toggleChallenge={tools.toggleChallenge}
        deleteChallenge={tools.deleteChallenge}
      />
    );
    if (activeTab === 'badges') return (
      <BadgesTab
        users={tools.users}
        badges={tools.badges}
        awardBadge={tools.awardBadge}
        deleteBadge={tools.deleteBadge}
      />
    );
  }

  return (
    <div className="admin-tools">
      <nav className="admin-tools__tabs">
        {TOOL_TABS.map((t) => (
          <button
            key={t.id}
            className={`admin-tools__tab ${activeTab === t.id ? 'admin-tools__tab--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>
      <div className="admin-tools__body">
        {renderTab()}
      </div>
    </div>
  );
}
