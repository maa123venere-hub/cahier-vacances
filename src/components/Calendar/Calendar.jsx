import { useEffect, useRef } from 'react';
import { TYPE } from '../../data/weeks.js';
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx';
import BilanSemaine from '../BilanSemaine/BilanSemaine.jsx';
import BrevetBlanc from '../BrevetBlanc/BrevetBlanc.jsx';

export default function Calendar({ weeks, currentWeek, onChangeWeek, openDay, onToggleDay, done, onToggleDone, jours = [], niveau = '' }) {
  const tabsRef = useRef([]);
  const w = weeks[currentWeek];

  useEffect(() => {
    if (!w) return;
    document.documentElement.style.setProperty('--week-color', w.color);
  }, [w?.color]);

  useEffect(() => {
    tabsRef.current[currentWeek]?.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }, [currentWeek]);

  // Guard: weeks not yet loaded
  if (!w) return null;

  function goWeek(i) {
    onChangeWeek(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Check if all days of the current week are done
  const weekDaysDone = w.days.every((_, j) => !!done[`${currentWeek}-${j}`]);

  // Brevet blanc weeks (semaineIndex 6 = intermédiaire, 7 = final) — 3ème only
  const isBrevetWeek = niveau === '3eme' && (currentWeek === 6 || currentWeek === 7);
  const isBrevetFinal = currentWeek === 7;

  return (
    <>
      <div className="tabs-wrap">
        <div className="tabs">
          {weeks.map((wk, i) => {
            const wd = wk.days.filter((_, j) => done[`${i}-${j}`]).length;
            return (
              <button
                key={wk.num}
                ref={(el) => (tabsRef.current[i] = el)}
                className={`tab ${i === currentWeek ? 'active' : ''}`}
                style={{ '--week-color': wk.color }}
                onClick={() => goWeek(i)}
              >
                <span className="tab-emoji">{wk.emoji}</span>
                <span className="tab-num">S{wk.num}</span>
                <span className="tab-progress">{wd}/{wk.days.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="week-banner" style={{ background: w.light, borderColor: `${w.color}33` }}>
        <div className="week-eyebrow" style={{ color: w.color }}>Semaine {w.num} sur {weeks.length}</div>
        <div className="week-title">{w.emoji} {w.theme}</div>
      </div>

      <div className="days-list">
        {w.days.map((day, j) => {
          const key = `${currentWeek}-${j}`;
          const type = TYPE[day.type] || TYPE.exo;
          return (
            <ExerciseCard
              key={key}
              day={day}
              dayKey={key}
              type={type}
              weekColor={w.color}
              isDone={!!done[key]}
              isOpen={openDay === j}
              onToggleOpen={() => onToggleDay(j)}
              onToggleDone={() => onToggleDone(key)}
            />
          );
        })}
      </div>

      {/* ── Contrôles — shown once all days of the week are done ── */}
      {weekDaysDone && (
        isBrevetWeek ? (
          <BrevetBlanc
            semaineIndex={currentWeek}
            weekColor={w.color}
            weekTheme={w.theme}
            jours={jours}
            isFinal={isBrevetFinal}
          />
        ) : (
          <BilanSemaine
            semaineIndex={currentWeek}
            weekColor={w.color}
            weekTheme={w.theme}
            jours={jours}
          />
        )
      )}

      <div className="bottom-nav">
        <button className="nav-btn" disabled={currentWeek === 0} onClick={() => goWeek(currentWeek - 1)}>← Préc.</button>
        <button className="nav-btn next" disabled={currentWeek === weeks.length - 1} onClick={() => goWeek(currentWeek + 1)}>Suiv. →</button>
      </div>
    </>
  );
}
