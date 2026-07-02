import { useEffect, useState } from 'react';
import { SPORT_PROGRAMS, getSuggestedProgramKey, getProgram } from '../../data/sportProgram.js';
import { useSportProgress } from '../../hooks/useSportProgress.js';
import { useGamification } from '../../hooks/useGamification.js';
import './Sport.css';

export default function Sport() {
  const { done, toggleSection } = useSportProgress();
  const { awardForSport } = useGamification();

  const suggestedKey = getSuggestedProgramKey();
  const [programKey, setProgramKey] = useState(suggestedKey);
  const program = getProgram(programKey);
  const sections = program.sections;

  const totalCalories = sections.reduce((sum, s) => sum + (done[s.key] ? s.calories : 0), 0);
  const doneCount = sections.filter((s) => done[s.key]).length;
  const totalDuration = sections.reduce((sum, s) => sum + parseInt(s.duration, 10), 0);

  useEffect(() => {
    if (sections.length > 0 && doneCount === sections.length) {
      awardForSport();
    }
  }, [doneCount, sections.length]);

  return (
    <div className="sport-body">
      {/* ── Choix du programme ── */}
      <div className="sport-programs">
        {SPORT_PROGRAMS.map((p) => (
          <button
            key={p.key}
            className={`sport-program-btn ${p.key === programKey ? 'active' : ''}`}
            onClick={() => setProgramKey(p.key)}
          >
            <span className="sport-program-emoji">{p.emoji}</span>
            <span>{p.title}</span>
            {p.key === suggestedKey && <span className="sport-program-badge">Jour</span>}
          </button>
        ))}
      </div>

      <div className="sport-program-sub">
        {program.emoji} <strong>{program.title}</strong> — {program.subtitle} · ⏱ {totalDuration} min
        {programKey === suggestedKey ? ' · Programme suggéré aujourd\'hui ✨' : ''}
      </div>

      <div className="sport-summary">
        <div className="sport-stat">
          <div className="sport-stat-value">{doneCount}/{sections.length}</div>
          <div className="sport-stat-label">Étapes faites</div>
        </div>
        <div className="sport-stat">
          <div className="sport-stat-value">🔥 {totalCalories}</div>
          <div className="sport-stat-label">Calories brûlées</div>
        </div>
      </div>

      <div className="sport-challenge">
        <div className="sport-challenge-title">{program.challenge.title}</div>
        <div className="sport-challenge-text">{program.challenge.description}</div>
      </div>

      {sections.map((section) => (
        <div key={section.key} className={`sport-section ${done[section.key] ? 'done' : ''}`}>
          <div className="sport-section-head">
            <span className="sport-emoji">{section.emoji}</span>
            <span className="sport-title">{section.title}</span>
            <span className="sport-meta">⏱ {section.duration}</span>
          </div>
          <ul className="sport-list">
            {section.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <button className="sport-done-btn" onClick={() => toggleSection(section.key)}>
            {done[section.key] ? '✓ Fait' : 'Marquer comme fait'}
          </button>
        </div>
      ))}
    </div>
  );
}
