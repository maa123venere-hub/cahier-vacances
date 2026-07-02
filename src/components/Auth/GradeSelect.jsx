import { useState } from 'react';
import './GradeSelect.css';

const GRADES = [
  { id: '6eme', label: '6ème', emoji: '🌱', sub: 'Entrée au collège' },
  { id: '5eme', label: '5ème', emoji: '📘', sub: '2e année de collège' },
  { id: '4eme', label: '4ème', emoji: '📗', sub: '3e année de collège' },
  { id: '3eme', label: '3ème', emoji: '🎯', sub: 'Préparation brevet' },
];

export default function GradeSelect({ onContinue }) {
  const [selected, setSelected] = useState(null);

  function handleContinue() {
    if (!selected) return;
    sessionStorage.setItem('pendingGrade', selected);
    onContinue(selected);
  }

  return (
    <div className="gs-wrap">
      <div className="gs-header">
        <div className="gs-logo">📚</div>
        <div className="gs-title">Calendrier 2k26</div>
        <div className="gs-sub">Révisions Été 2026</div>
      </div>

      <div className="gs-card">
        <div className="gs-question">Dans quelle classe es-tu ?</div>
        <div className="gs-hint">Choisis ton niveau pour commencer</div>

        <div className="gs-grid">
          {GRADES.map(g => (
            <button
              key={g.id}
              className={`gs-option ${selected === g.id ? 'selected' : ''}`}
              onClick={() => setSelected(g.id)}
            >
              <span className="gs-option-emoji">{g.emoji}</span>
              <span className="gs-option-label">{g.label}</span>
              <span className="gs-option-sub">{g.sub}</span>
              {selected === g.id && <span className="gs-check">✓</span>}
            </button>
          ))}
        </div>

        <button
          className="gs-continue"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}
