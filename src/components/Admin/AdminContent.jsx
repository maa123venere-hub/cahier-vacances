import { useState } from 'react';
import { useAdminLevelContent } from '../../hooks/useAdminLevelContent.js';
import { LEVELS_REGISTRY, LEVEL_IDS } from '../../data/levels/index.js';
import { seedContenus } from '../../services/contenusService.js';
import './AdminContent.css';

const EXERCISE_TYPES = [
  { value: 'qcm',       label: 'QCM (choix multiple)' },
  { value: 'vrai_faux', label: 'Vrai / Faux' },
  { value: 'completer', label: 'Compléter (texte libre)' },
];

const DAY_TYPES = [
  { value: 'lecon',    label: 'Leçon' },
  { value: 'exo',      label: 'Exercices' },
  { value: 'dictee',   label: 'Dictée' },
  { value: 'lecture',  label: 'Lecture' },
  { value: 'redac',    label: 'Rédaction' },
  { value: 'controle', label: 'Contrôle' },
];

const MATIERES = [
  { value: 'grammaire',    label: 'Grammaire' },
  { value: 'conjugaison',  label: 'Conjugaison' },
  { value: 'orthographe',  label: 'Orthographe' },
  { value: 'vocabulaire',  label: 'Vocabulaire' },
  { value: 'lecture',      label: 'Lecture' },
  { value: 'redaction',    label: 'Rédaction' },
  { value: 'revision',     label: 'Révision' },
];

const EMPTY_EXERCICE = {
  id: '', type: 'qcm', question: '',
  options: ['', '', '', ''], answer: '',
  explanation: '', method: '', hint: '',
};

const EMPTY_JOUR = {
  label: '', type: 'lecon', matiere: 'grammaire',
  lecon: '', detail: '', tip: '', difficulte: 1,
  lessonPage: '', exercisesPage: '', pdfFile: '/cahier.pdf',
  images: [], videos: [],
};

// ── Exercise form ──────────────────────────────
function ExerciceForm({ initial, onSave, onCancel, saving }) {
  const [ex, setEx] = useState(() => ({
    ...EMPTY_EXERCICE,
    ...initial,
    options: initial?.options?.length ? [...initial.options] : ['', '', '', ''],
  }));

  function set(field, val) { setEx((e) => ({ ...e, [field]: val })); }
  function setOpt(i, val) {
    const opts = [...ex.options]; opts[i] = val;
    setEx((e) => ({ ...e, options: opts }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const payload = { ...ex };
    if (payload.type !== 'qcm') delete payload.options;
    else payload.options = payload.options.filter(Boolean);
    onSave(payload);
  }

  return (
    <form className="ex-form" onSubmit={handleSubmit}>
      <div className="ex-form__row">
        <label className="ex-form__label">Type</label>
        <select className="ex-form__select" value={ex.type} onChange={(e) => set('type', e.target.value)}>
          {EXERCISE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Question *</label>
        <textarea className="ex-form__textarea" rows={3} required value={ex.question}
          onChange={(e) => set('question', e.target.value)} placeholder="Énoncé de l'exercice…" />
      </div>

      {ex.type === 'qcm' && (
        <div className="ex-form__row">
          <label className="ex-form__label">Options (4 max)</label>
          {ex.options.map((opt, i) => (
            <input key={i} className="ex-form__input" value={opt}
              onChange={(e) => setOpt(i, e.target.value)}
              placeholder={`Option ${i + 1}${i === 0 ? ' *' : ''}`} required={i === 0} />
          ))}
        </div>
      )}

      {ex.type === 'vrai_faux' ? (
        <div className="ex-form__row">
          <label className="ex-form__label">Réponse *</label>
          <select className="ex-form__select" value={ex.answer}
            onChange={(e) => set('answer', e.target.value)} required>
            <option value="">Choisir…</option>
            <option value="vrai">Vrai</option>
            <option value="faux">Faux</option>
          </select>
        </div>
      ) : (
        <div className="ex-form__row">
          <label className="ex-form__label">Réponse *</label>
          <input className="ex-form__input" required value={ex.answer}
            onChange={(e) => set('answer', e.target.value)}
            placeholder={ex.type === 'qcm' ? 'Doit correspondre exactement à une option' : 'Réponse attendue'} />
        </div>
      )}

      <div className="ex-form__row">
        <label className="ex-form__label">Explication</label>
        <textarea className="ex-form__textarea" rows={2} value={ex.explanation}
          onChange={(e) => set('explanation', e.target.value)} placeholder="Pourquoi cette réponse est correcte…" />
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Méthode</label>
        <textarea className="ex-form__textarea" rows={2} value={ex.method}
          onChange={(e) => set('method', e.target.value)} placeholder="Astuce / méthode pour réussir…" />
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Indice</label>
        <input className="ex-form__input" value={ex.hint}
          onChange={(e) => set('hint', e.target.value)} placeholder="Indice affiché après 2 erreurs…" />
      </div>

      <div className="ex-form__actions">
        <button type="button" className="ex-form__btn ex-form__btn--cancel" onClick={onCancel}>Annuler</button>
        <button type="submit" className="ex-form__btn ex-form__btn--save" disabled={saving}>
          {saving ? 'Enregistrement…' : '💾 Enregistrer'}
        </button>
      </div>
    </form>
  );
}

// ── Day form ───────────────────────────────────
function JourForm({ initial, onSave, onCancel, saving, isNew }) {
  const [d, setD] = useState(() => ({ ...EMPTY_JOUR, ...initial }));
  const [jourId, setJourId] = useState(isNew ? '' : (initial?.id || ''));

  function set(field, val) { setD((prev) => ({ ...prev, [field]: val })); }

  function handleSubmit(evt) {
    evt.preventDefault();
    const id = isNew ? jourId.trim() : initial.id;
    onSave(id, {
      ...d,
      lessonPage: d.lessonPage ? Number(d.lessonPage) : null,
      exercisesPage: d.exercisesPage ? Number(d.exercisesPage) : null,
      difficulte: Number(d.difficulte) || 1,
    });
  }

  return (
    <form className="ex-form" onSubmit={handleSubmit}>
      {isNew && (
        <div className="ex-form__row">
          <label className="ex-form__label">ID du jour * (ex: 0-0, 1-3)</label>
          <input className="ex-form__input" required value={jourId}
            onChange={(e) => setJourId(e.target.value)}
            placeholder="semaineIndex-jourIndex (0-basé)" pattern="\d+-\d+" />
          <span style={{ fontSize: '0.72rem', color: '#888' }}>Format : semaine-jour, tous deux à partir de 0</span>
        </div>
      )}

      <div className="ex-form__row">
        <label className="ex-form__label">Label affiché *</label>
        <input className="ex-form__input" required value={d.label}
          onChange={(e) => set('label', e.target.value)} placeholder="ex: Lun 29 juin" />
      </div>

      <div className="ac-row-inline ex-form__row">
        <div className="ac-half">
          <label className="ex-form__label">Type de journée</label>
          <select className="ex-form__select" value={d.type} onChange={(e) => set('type', e.target.value)}>
            {DAY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="ac-half">
          <label className="ex-form__label">Matière</label>
          <select className="ex-form__select" value={d.matiere} onChange={(e) => set('matiere', e.target.value)}>
            {MATIERES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Titre de la leçon *</label>
        <input className="ex-form__input" required value={d.lecon}
          onChange={(e) => set('lecon', e.target.value)} placeholder="Grammaire 1 : Les classes grammaticales" />
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Détail / consignes</label>
        <textarea className="ex-form__textarea" rows={4} value={d.detail}
          onChange={(e) => set('detail', e.target.value)} placeholder="Lis p. X–Y : …" />
      </div>

      <div className="ex-form__row">
        <label className="ex-form__label">Conseil</label>
        <textarea className="ex-form__textarea" rows={2} value={d.tip}
          onChange={(e) => set('tip', e.target.value)} placeholder="Astuce pour cette journée…" />
      </div>

      <div className="ac-row-inline ex-form__row">
        <div className="ac-half">
          <label className="ex-form__label">Page leçon (PDF)</label>
          <input className="ex-form__input" type="number" min={1} value={d.lessonPage}
            onChange={(e) => set('lessonPage', e.target.value)} placeholder="ex: 10" />
        </div>
        <div className="ac-half">
          <label className="ex-form__label">Page exercices (PDF)</label>
          <input className="ex-form__input" type="number" min={1} value={d.exercisesPage}
            onChange={(e) => set('exercisesPage', e.target.value)} placeholder="ex: 24" />
        </div>
      </div>

      <div className="ac-row-inline ex-form__row">
        <div className="ac-half">
          <label className="ex-form__label">Difficulté (1–5)</label>
          <input className="ex-form__input" type="number" min={1} max={5} value={d.difficulte}
            onChange={(e) => set('difficulte', e.target.value)} />
        </div>
        <div className="ac-half">
          <label className="ex-form__label">Fichier PDF</label>
          <input className="ex-form__input" value={d.pdfFile}
            onChange={(e) => set('pdfFile', e.target.value)} placeholder="/cahier.pdf" />
        </div>
      </div>

      <div className="ex-form__actions">
        <button type="button" className="ex-form__btn ex-form__btn--cancel" onClick={onCancel}>Annuler</button>
        <button type="submit" className="ex-form__btn ex-form__btn--save" disabled={saving}>
          {saving ? 'Enregistrement…' : '💾 Enregistrer'}
        </button>
      </div>
    </form>
  );
}

// ── Day panel ──────────────────────────────────
function JourPanel({ jour, onSaveExercice, onDeleteExercice, onSaveJour, onDeleteJour }) {
  const [editingEx, setEditingEx] = useState(null);
  const [editingJour, setEditingJour] = useState(false);
  const [saving, setSaving] = useState(false);

  const typeLabel = { qcm: 'QCM', vrai_faux: 'V/F', completer: 'Texte' };
  const exercices = jour.exercices || [];

  async function handleSaveExercice(ex) {
    setSaving(true);
    try { await onSaveExercice(jour.id, ex); setEditingEx(null); }
    finally { setSaving(false); }
  }

  async function handleSaveJour(id, data) {
    setSaving(true);
    try { await onSaveJour(id, data); setEditingJour(false); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!window.confirm(`Supprimer « ${jour.label || jour.id} » ? Irréversible.`)) return;
    await onDeleteJour(jour.id);
  }

  async function handleDeleteExercice(exId) {
    if (!window.confirm('Supprimer cet exercice ?')) return;
    await onDeleteExercice(jour.id, exId);
  }

  return (
    <div className="day-panel">
      <div className="day-panel__header">
        {editingJour ? (
          <>
            <div className="day-panel__new-title">Modifier la journée</div>
            <JourForm initial={jour} onSave={handleSaveJour}
              onCancel={() => setEditingJour(false)} saving={saving} isNew={false} />
          </>
        ) : (
          <div className="day-panel__title-row">
            <span className="day-panel__title">{jour.label || jour.id}</span>
            <span className="day-panel__key">{jour.id}</span>
            {jour.fromFirestore && <span className="day-badge">Firestore</span>}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <button className="day-title-edit-btn" onClick={() => setEditingJour(true)}>✏️ Modifier</button>
              <button className="day-title-edit-btn" style={{ color: '#dc2626' }} onClick={handleDelete}>🗑 Supprimer</button>
            </div>
          </div>
        )}

        {!editingJour && (
          <div className="day-meta-row">
            {jour.lecon && <span className="day-meta-lecon">{jour.lecon}</span>}
            <div className="day-meta-pages">
              {jour.lessonPage && <span>📄 Leçon p.{jour.lessonPage}</span>}
              {jour.exercisesPage && <span>✏️ Exos p.{jour.exercisesPage}</span>}
              {jour.matiere && <span>{jour.matiere}</span>}
              {jour.difficulte && <span>⭐{jour.difficulte}</span>}
              {jour.type && <span className={`day-type-badge day-type-badge--${jour.type}`}>{jour.type}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="day-panel__section-title">Exercices interactifs ({exercices.length})</div>

      <div className="day-panel__exercises">
        {exercices.length === 0 && (
          <p className="day-panel__empty">Aucun exercice. Cliquez sur « + Ajouter » pour commencer.</p>
        )}
        {exercices.map((ex) => (
          <div key={ex.id} className={`ex-row ${editingEx === ex.id ? 'ex-row--editing' : ''}`}>
            <div className="ex-row__top">
              <span className={`ex-type-badge ex-type-badge--${ex.type}`}>{typeLabel[ex.type] || ex.type}</span>
              <p className="ex-row__question">{ex.question}</p>
              <div className="ex-row__btns">
                <button className="ex-row__btn" onClick={() => setEditingEx(editingEx === ex.id ? null : ex.id)}>
                  {editingEx === ex.id ? '✕' : '✏️'}
                </button>
                <button className="ex-row__btn ex-row__btn--danger" onClick={() => handleDeleteExercice(ex.id)}>🗑</button>
              </div>
            </div>
            {editingEx === ex.id && (
              <ExerciceForm key={ex.id} initial={ex}
                onSave={handleSaveExercice} onCancel={() => setEditingEx(null)} saving={saving} />
            )}
          </div>
        ))}
      </div>

      {editingEx === 'new' ? (
        <div className="day-panel__new-form">
          <div className="day-panel__new-title">Nouvel exercice</div>
          <ExerciceForm initial={EMPTY_EXERCICE}
            onSave={handleSaveExercice} onCancel={() => setEditingEx(null)} saving={saving} />
        </div>
      ) : (
        <button className="day-panel__add-btn" onClick={() => setEditingEx('new')}>
          + Ajouter un exercice
        </button>
      )}
    </div>
  );
}

// ── Seed banner ────────────────────────────────
function SeedBanner({ niveau, seeded, onSeeded }) {
  const [seeding, setSeeding] = useState(false);
  const [msg, setMsg] = useState(null);

  if (seeded || niveau !== '4eme') return null;

  async function handleSeed() {
    if (!window.confirm(`Importer les 40 journées de la 4ème dans Firestore (contenus/4eme) ?`)) return;
    setSeeding(true);
    setMsg(null);
    try {
      const { buildSeedJours, buildSeedSemaines } = await import('../../data/seed/4eme.js');
      const result = await seedContenus('4eme', buildSeedJours(), buildSeedSemaines(), true);
      setMsg(`✅ ${result.count} journées importées dans Firestore.`);
      onSeeded();
    } catch (e) {
      setMsg(`❌ Erreur : ${e.message}`);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="ac-seed-banner">
      <div className="ac-seed-text">
        <strong>Données statiques</strong> — Le contenu 4ème est actuellement chargé depuis les fichiers locaux.
        Pour passer à une architecture 100% Firestore, importez-le ci-dessous.
      </div>
      <button className="ac-seed-btn" onClick={handleSeed} disabled={seeding}>
        {seeding ? '⏳ Import en cours…' : '☁️ Importer dans Firestore'}
      </button>
      {msg && <div className="ac-seed-msg">{msg}</div>}
    </div>
  );
}

// ── Main AdminContent ──────────────────────────
export default function AdminContent() {
  const [activeLevel, setActiveLevel] = useState(LEVEL_IDS[2]); // default 4ème
  const { jours, semaines, loading, error, load,
    saveJour, deleteJour, addJour, saveExercice, deleteExercice } =
    useAdminLevelContent(activeLevel);

  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [showAddJour, setShowAddJour] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const filtered = jours.filter((j) =>
    !search ||
    j.id.includes(search) ||
    (j.label || '').toLowerCase().includes(search.toLowerCase()) ||
    (j.lecon || '').toLowerCase().includes(search.toLowerCase())
  );

  const activeJour = jours.find((j) => j.id === selectedId) || null;

  async function handleAddJour(id, data) {
    setSaving(true);
    try {
      await addJour(id, { ...data, semaineIndex: Number(id.split('-')[0]), jourIndex: Number(id.split('-')[1]) });
      setSelectedId(id);
      setShowAddJour(false);
    } finally { setSaving(false); }
  }

  async function handleDeleteJour(id) {
    await deleteJour(id);
    setSelectedId(null);
  }

  function handleLevelChange(id) {
    setActiveLevel(id);
    setSelectedId(null);
    setSearch('');
    setShowAddJour(false);
    setSeeded(false);
  }

  const levelMeta = LEVELS_REGISTRY[activeLevel];
  const isSeededFromFirestore = jours.some((j) => j.fromFirestore);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Level tabs */}
      <div className="ac-level-tabs">
        {LEVEL_IDS.map((id) => {
          const meta = LEVELS_REGISTRY[id];
          return (
            <button key={id}
              className={`ac-level-tab ${activeLevel === id ? 'ac-level-tab--active' : ''}`}
              style={activeLevel === id ? { borderBottomColor: meta.color, color: meta.color } : {}}
              onClick={() => handleLevelChange(id)}
            >
              {meta.emoji} {meta.label}
            </button>
          );
        })}
      </div>

      <SeedBanner
        niveau={activeLevel}
        seeded={seeded || isSeededFromFirestore}
        onSeeded={() => { setSeeded(true); load(); }}
      />

      <div className="admin-content-mgr" style={{ flex: 1 }}>
        {/* Left sidebar */}
        <aside className="content-sidebar">
          <div className="content-sidebar__head">
            <span className="content-sidebar__title">Jours ({jours.length})</span>
            <button className="content-sidebar__add" onClick={() => setShowAddJour((v) => !v)} title="Nouvelle journée">＋</button>
          </div>

          {showAddJour && (
            <div style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', background: 'var(--card-bg, #fff)' }}>
              <div className="day-panel__new-title" style={{ padding: '10px 14px 0' }}>Nouvelle journée</div>
              <JourForm initial={EMPTY_JOUR} onSave={handleAddJour}
                onCancel={() => setShowAddJour(false)} saving={saving} isNew />
            </div>
          )}

          <input className="content-search" placeholder="🔍 Filtrer…"
            value={search} onChange={(e) => setSearch(e.target.value)} />

          {loading && <div className="content-loading">Chargement…</div>}
          {error && <div className="content-error">⚠️ {error}</div>}

          <div className="content-day-list">
            {filtered.map((j) => (
              <button key={j.id}
                className={`content-day-item ${selectedId === j.id ? 'content-day-item--active' : ''}`}
                onClick={() => setSelectedId(j.id)}
              >
                <span className="content-day-key">{j.id}</span>
                <span className="content-day-title">{j.label || j.lecon || j.id}</span>
                <span className="content-day-count">{(j.exercices || []).length}</span>
                {j.fromFirestore && <span className="content-day-dot" title="Firestore" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Right panel */}
        <main className="content-main">
          {!activeJour ? (
            <div className="content-placeholder">
              <div style={{ fontSize: '2.5rem' }}>{levelMeta.emoji}</div>
              <p>Sélectionne un jour pour le modifier.</p>
              <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
                {jours.length === 0
                  ? `Aucun contenu pour ${levelMeta.label}. Utilise ＋ pour créer des journées.`
                  : 'Ou clique sur ＋ pour créer une nouvelle journée.'}
              </p>
            </div>
          ) : (
            <JourPanel
              key={activeJour.id}
              jour={activeJour}
              onSaveExercice={saveExercice}
              onDeleteExercice={deleteExercice}
              onSaveJour={saveJour}
              onDeleteJour={handleDeleteJour}
            />
          )}
        </main>
      </div>
    </div>
  );
}
