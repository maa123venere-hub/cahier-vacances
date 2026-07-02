import { useState } from 'react';
import { generatePlanningAI, generatePlanningLocal } from '../../services/aiPlanning.js';

// Panneau « Ma journée idéale » : l'élève décrit ses envies + ses heures,
// et le planning du jour est généré automatiquement.
export default function PlanningAI({ activeDay, onGenerated }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [wake, setWake] = useState('08:00');
  const [sleep, setSleep] = useState('22:00');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'ok'|'warn'|'err', msg }

  async function handleGenerate() {
    if (description.trim().length < 3) {
      setStatus({ type: 'err', msg: 'Décris au moins une activité !' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const items = await generatePlanningAI({ description, wake, sleep, day: activeDay });
      onGenerated(items);
      setStatus({ type: 'ok', msg: `Planning de ${activeDay} généré ! ✨` });
    } catch {
      // Secours local : l'élève obtient quand même son planning
      try {
        const items = generatePlanningLocal({ description, wake, sleep });
        onGenerated(items);
        setStatus({ type: 'warn', msg: 'Planning créé en mode hors-ligne (IA indisponible).' });
      } catch {
        setStatus({ type: 'err', msg: 'Impossible de générer le planning. Réessaie.' });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pai-wrap">
      <button className="pai-toggle" onClick={() => setOpen((v) => !v)}>
        <span className="pai-toggle-icon">✨</span>
        <span className="pai-toggle-text">
          <span className="pai-toggle-title">Créer mon planning de {activeDay}</span>
          <span className="pai-toggle-sub">Dis ce que tu veux faire, on organise ta journée</span>
        </span>
        <span className={`pai-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="pai-panel">
          <label className="pai-label">Qu'est-ce que tu veux faire {activeDay.toLowerCase()} ? (avec tes heures si tu veux)</label>
          <textarea
            className="pai-textarea"
            rows={3}
            placeholder={'Ex. : foot avec Tom à 10h, piscine l\'après-midi, réviser 30 min le matin, film à 20h30…'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={600}
          />

          <div className="pai-times">
            <label className="pai-time">
              <span>☀️ Réveil</span>
              <input type="time" value={wake} onChange={(e) => setWake(e.target.value)} />
            </label>
            <label className="pai-time">
              <span>😴 Coucher</span>
              <input type="time" value={sleep} onChange={(e) => setSleep(e.target.value)} />
            </label>
          </div>

          {status && <div className={`pai-status pai-status-${status.type}`}>{status.msg}</div>}

          <button className="pai-generate" onClick={handleGenerate} disabled={busy}>
            {busy ? '🧠 Organisation de ta journée…' : '✨ Générer mon planning'}
          </button>
        </div>
      )}
    </div>
  );
}
