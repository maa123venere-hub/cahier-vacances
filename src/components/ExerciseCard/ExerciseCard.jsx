import { useEffect, useRef, useState } from 'react';
import DayFlow from '../DayFlow/DayFlow.jsx';
import { useCorrections } from '../../hooks/useCorrections.js';
import { useDayProgress } from '../../hooks/useDayProgress.js';
import { useGamification } from '../../hooks/useGamification.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ExerciseCard({ day, dayKey, type, weekColor, isDone, isOpen, onToggleOpen, onToggleDone }) {
  const { niveau, matiere } = useAuth();
  const { corrections, saveCorrection } = useCorrections(dayKey);
  const { progress, markLessonRead, markPhotoSent, markCorrectionDone } = useDayProgress(dayKey);
  const { awardForDayComplete, awardForCorrection } = useGamification();
  const autoCompletedRef = useRef(false);
  const [directLesson, setDirectLesson] = useState(false);
  // XP dedup key scoped by level + subject (same as useExerciseSession)
  const awardKey = `${niveau || '4eme'}_${matiere || 'francais'}_${dayKey}`;

  useEffect(() => {
    if (progress.lessonRead && progress.correctionDone && !isDone && !autoCompletedRef.current) {
      autoCompletedRef.current = true;
      onToggleDone();
      awardForDayComplete(awardKey);
    }
  }, [progress.lessonRead, progress.correctionDone, isDone]);

  // When card closes, reset direct lesson flag
  useEffect(() => {
    if (!isOpen) setDirectLesson(false);
  }, [isOpen]);

  function handleLessonClick(e) {
    e.stopPropagation();
    setDirectLesson(true);
    if (!isOpen) onToggleOpen();
  }

  async function handleUploadResult(result) {
    await saveCorrection({ dayKey, lecon: day.lecon, ...result });
    awardForCorrection(result.note);
  }

  return (
    <div className={`day-card ${isDone ? 'done' : ''} ${isOpen ? 'open' : ''}`} style={isOpen ? { borderColor: weekColor } : undefined}>
      <div className="day-header" onClick={onToggleOpen}>
        <div
          className={`checkbox ${isDone ? 'checked' : ''}`}
          style={isDone ? { background: weekColor } : undefined}
          onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
        >
          {isDone ? '✓' : ''}
        </div>
        <div className="day-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 3 }}>
            <span className="day-badge" style={{ background: type.color }}>{type.label}</span>
            <button
              className="lesson-chip"
              style={{ borderColor: weekColor, color: weekColor }}
              onClick={handleLessonClick}
            >
              📖 Leçon
            </button>
          </div>
          <div className={`day-label ${isDone ? 'done-text' : ''}`}>{day.label}</div>
          <div className="day-lecon">{day.lecon}</div>
        </div>
        <div className={`chevron ${isOpen ? 'open' : ''}`}>▼</div>
      </div>
      <div className={`day-detail ${isOpen ? 'open' : ''}`}>
        <DayFlow
          day={day}
          dayKey={dayKey}
          weekColor={weekColor}
          progress={progress}
          markLessonRead={markLessonRead}
          markPhotoSent={markPhotoSent}
          markCorrectionDone={markCorrectionDone}
          corrections={corrections}
          onUploadResult={handleUploadResult}
          initialStep={directLesson ? 'lesson' : null}
        />

        <button
          className="done-btn"
          style={{ background: isDone ? '#E5E7EB' : weekColor, color: isDone ? '#6B7280' : 'white' }}
          onClick={onToggleDone}
        >
          {isDone ? '↩ Marquer comme non fait' : '✓ Marquer cette journée comme faite'}
        </button>
      </div>
    </div>
  );
}
