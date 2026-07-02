import { useState } from 'react';
import LessonPage from '../Lesson/LessonPage.jsx';
import ExercisePlayer from '../ExercisePlayer/ExercisePlayer.jsx';
import UploadExercise from '../UploadExercise/UploadExercise.jsx';
import AICorrection from '../AICorrection/AICorrection.jsx';
import { useLevelData } from '../../hooks/useLevelData.js';
import './DayFlow.css';

export default function DayFlow({
  day, dayKey, weekColor, progress,
  markLessonRead, markPhotoSent, markCorrectionDone,
  corrections, onUploadResult, initialStep,
}) {
  const resolveAuto = () => {
    if (progress.correctionDone) return 'results';
    if (progress.lessonRead) return 'exercises';
    return null; // not started yet → show start screen
  };

  const [step, setStep] = useState(initialStep || resolveAuto());
  const { curriculum } = useLevelData();

  // ── step done check ──────────────────────────────────────────
  const lessonDone = progress.lessonRead;
  const exercisesDone = progress.correctionDone;

  function stepStatus(key) {
    if (key === 'lesson') return lessonDone ? 'done' : step === 'lesson' ? 'active' : 'pending';
    if (key === 'exercises') return exercisesDone ? 'done' : step === 'exercises' ? 'active' : lessonDone ? 'pending' : 'locked';
    if (key === 'results') return step === 'results' ? 'active' : exercisesDone ? 'pending' : 'locked';
    return 'locked';
  }

  function goToStep(key) {
    const s = stepStatus(key);
    if (s === 'locked') return;
    setStep(key);
  }

  async function handleUploadResult(result) {
    markPhotoSent();
    markCorrectionDone();
    await onUploadResult(result);
    setStep('results');
  }

  // ── Not started yet ──────────────────────────────────────────
  if (!step) {
    return (
      <div>
        <div className="flow-preview-steps">
          {['lesson', 'exercises', 'results'].map((k, i) => (
            <div key={k} className="flow-preview-step">
              <div className="flow-preview-num">{i + 1}</div>
              <div className="flow-preview-label">
                {k === 'lesson' ? 'Lire la leçon' : k === 'exercises' ? 'Exercices' : 'Résultats'}
              </div>
            </div>
          ))}
        </div>
        <button
          className="flow-start-btn"
          style={{ background: weekColor }}
          onClick={() => setStep('lesson')}
        >
          ▶ Commencer la journée
        </button>
      </div>
    );
  }

  // ── Step bar ─────────────────────────────────────────────────
  const STEPS = [
    { key: 'lesson', num: 1, label: 'Leçon' },
    { key: 'exercises', num: 2, label: 'Exercices' },
    { key: 'results', num: 3, label: 'Résultats' },
  ];

  return (
    <div>
      {/* ── Numbered step bar ── */}
      <div className="step-bar">
        {STEPS.map((s, i) => {
          const st = stepStatus(s.key);
          return (
            <div key={s.key} className="step-bar-item" onClick={() => goToStep(s.key)}>
              <div className={`step-circle ${st}`} style={st === 'active' ? { background: weekColor, borderColor: weekColor } : st === 'done' ? { background: '#16A34A', borderColor: '#16A34A' } : undefined}>
                {st === 'done' ? '✓' : s.num}
              </div>
              <div className={`step-label ${st}`}>{s.label}</div>
              {i < STEPS.length - 1 && (
                <div className={`step-connector ${lessonDone && i === 0 ? 'done' : exercisesDone && i === 1 ? 'done' : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step content ── */}
      {step === 'lesson' && (
        <LessonPage
          day={day}
          dayKey={dayKey}
          weekColor={weekColor}
          onComplete={() => { markLessonRead(); setStep('exercises'); }}
        />
      )}

      {step === 'exercises' && (() => {
        const hasInteractive = (curriculum[dayKey]?.exercises || []).length > 0;
        return (
          <div>
            {hasInteractive ? (
              <ExercisePlayer
                dayKey={dayKey}
                weekColor={weekColor}
                onComplete={() => {
                  markPhotoSent();
                  markCorrectionDone();
                  setStep('results');
                }}
              />
            ) : (
              <div>
                <div className="detail-section">
                  <div className="detail-label" style={{ color: weekColor }}>✏️ Exercices à faire</div>
                  <div className="detail-box">
                    {day.exercices.map((e, i) => (
                      <div className="exo-row" key={i}><span className="exo-arrow">→</span>{e}</div>
                    ))}
                  </div>
                </div>
                <div className="flow-instruction">
                  📤 Fais les exercices sur ta feuille, prends une photo et envoie-la pour que l'IA corrige.
                </div>
                <UploadExercise
                  dayKey={dayKey}
                  exerciseLabel={day.exercices.join(', ')}
                  lecon={day.lecon}
                  onResult={handleUploadResult}
                />
              </div>
            )}
          </div>
        );
      })()}

      {step === 'results' && (
        <div>
          <div className="flow-complete-banner">
            🎉 Journée terminée ! Tu as bien travaillé.
          </div>
          {corrections.map((c) => <AICorrection key={c.id} correction={c} />)}
          {corrections.length === 0 && (
            <div className="flow-interactive-done">
              <div className="flow-interactive-done-icon">✅</div>
              <div className="flow-interactive-done-text">Leçon lue et exercices complétés !</div>
            </div>
          )}
          {corrections.length > 0 && (
            <button
              className="flow-next-btn"
              style={{ background: weekColor }}
              onClick={() => setStep('exercises')}
            >
              📤 Envoyer une nouvelle feuille
            </button>
          )}
        </div>
      )}
    </div>
  );
}
