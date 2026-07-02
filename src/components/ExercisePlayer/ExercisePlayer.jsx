import { useState, useEffect, useMemo } from 'react';
import { useLevelData } from '../../hooks/useLevelData.js';
import { useExerciseSession } from '../../hooks/useExerciseSession.js';
import { useExerciseProgress } from '../../hooks/useExerciseProgress.js';
import { useAdaptiveDifficulty } from '../../hooks/useAdaptiveDifficulty.js';
import { playCorrect, playWrong, playComplete, playXP } from '../../utils/sounds.js';
import { launchConfetti } from '../../utils/confetti.js';
import './ExercisePlayer.css';

// ── Similar exercise suggestion ───────────────────────────────
function SimilarExercise({ exercise, weekColor }) {
  const [show, setShow] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [result, setResult] = useState(null);

  const similar = exercise.similarExercise;
  if (!similar) return null;

  function handleAnswer(choice) {
    if (answered) return;
    setAnswered(true);
    setResult(choice === similar.answer);
  }

  return (
    <div className="ep-similar-wrap">
      <button className="ep-similar-toggle" style={{ borderColor: weekColor, color: weekColor }} onClick={() => setShow(v => !v)}>
        🔄 {show ? 'Masquer l\'exercice similaire' : 'Essaie un exercice similaire'}
      </button>
      {show && (
        <div className="ep-similar-card ep-slide-in">
          <div className="ep-similar-label">Exercice similaire</div>
          <div className="ep-similar-question">{similar.question}</div>
          {similar.options && (
            <div className="ep-similar-options">
              {similar.options.map(opt => {
                let cls = 'ep-similar-opt';
                if (answered) {
                  if (opt === similar.answer) cls += ' correct';
                  else cls += ' disabled';
                }
                return (
                  <button key={opt} className={cls} onClick={() => handleAnswer(opt)} disabled={answered}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
          {answered && (
            <div className={`ep-similar-result ${result ? 'correct' : 'wrong'}`}>
              {result ? '✅ Bravo !' : `❌ La réponse était : ${similar.answer}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Brevet tip banner for high-difficulty exercises ───────────
function BrevetTip({ exercise }) {
  if (!exercise.brevetTip) return null;
  return (
    <div className="ep-brevet-tip">
      <span className="ep-brevet-tip-icon">📝</span>
      <span className="ep-brevet-tip-text"><b>Conseil brevet :</b> {exercise.brevetTip}</span>
    </div>
  );
}

// ── Feedback panel shown after every answer ──────────────────
function FeedbackPanel({ correct, exercise, wrongCount, onNext, isLast, weekColor }) {
  const [showAI, setShowAI] = useState(false);
  const needsAI = wrongCount >= 2;

  return (
    <div className={`ep-feedback ${correct ? 'correct' : 'wrong'} ep-slide-in`}>
      {/* Verdict */}
      <div className="ep-feedback-verdict">
        {correct ? '✅ Bonne réponse !' : '❌ Ce n\'est pas ça…'}
      </div>

      {/* Correct answer when wrong */}
      {!correct && (
        <div className="ep-feedback-correct-ans">
          <span className="ep-feedback-correct-label">Bonne réponse :</span>
          <span className="ep-feedback-correct-val">{exercise.answer}</span>
        </div>
      )}

      {/* Core explanation */}
      <div className="ep-feedback-section">
        <div className="ep-feedback-section-title">💡 Explication</div>
        <div className="ep-feedback-text">{exercise.explanation}</div>
      </div>

      {/* Method (optional) */}
      {exercise.method && (
        <div className="ep-feedback-section ep-feedback-method">
          <div className="ep-feedback-section-title">🔧 Méthode</div>
          <div className="ep-feedback-text">{exercise.method}</div>
        </div>
      )}

      {/* Brevet tip */}
      <BrevetTip exercise={exercise} />

      {/* Hint (shown on wrong) */}
      {!correct && exercise.hint && (
        <div className="ep-feedback-hint">
          <span className="ep-hint-icon">🔍</span>
          <span className="ep-hint-text">{exercise.hint}</span>
        </div>
      )}

      {/* AI re-explanation after 2+ wrong */}
      {needsAI && !correct && (
        <div className="ep-feedback-ai-wrap">
          <button
            className="ep-feedback-ai-btn"
            onClick={() => setShowAI((v) => !v)}
          >
            🤖 {showAI ? 'Masquer' : 'L\'IA t\'explique autrement'}
          </button>
          {showAI && (
            <div className="ep-feedback-ai-explain ep-slide-in">
              {exercise.aiExplain || generateAIExplain(exercise)}
            </div>
          )}
        </div>
      )}

      {/* Similar exercise suggestion (when wrong) */}
      {!correct && <SimilarExercise exercise={exercise} weekColor={weekColor} />}

      {/* Next button */}
      <button
        className="ep-next-btn"
        style={{ background: correct ? '#16A34A' : '#DC2626' }}
        onClick={onNext}
      >
        {isLast ? 'Voir mes résultats →' : 'Question suivante →'}
      </button>
    </div>
  );
}

function generateAIExplain(exercise) {
  const base = exercise.explanation || '';
  const hint = exercise.hint ? ` Indice clé : ${exercise.hint}` : '';
  if (exercise.type === 'qcm') {
    return `🤖 Méthode pour trouver la bonne réponse : commence par éliminer les options manifestement fausses. La réponse correcte est « ${exercise.answer} ». ${base}${hint}`;
  }
  if (exercise.type === 'vrai_faux') {
    return `🤖 Pour valider une affirmation Vrai/Faux : cherche une exception. Si l'affirmation n'est pas toujours vraie, c'est « Faux ». Ici la réponse est « ${exercise.answer} ». ${base}${hint}`;
  }
  return `🤖 Pour trouver le mot manquant : lis la phrase en entier, identifie le thème et le registre (définition, terme technique…). La réponse est « ${exercise.answer} ». ${base}${hint}`;
}

// ── QCM ───────────────────────────────────────────────────────
function QCM({ exercise, onAnswer, answered, weekColor }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(opt) {
    if (answered) return;
    setSelected(opt);
    onAnswer(opt === exercise.answer, opt);
  }

  return (
    <div className="ep-options">
      {exercise.options.map((opt) => {
        let cls = 'ep-option';
        if (answered) {
          if (opt === exercise.answer) cls += ' correct';
          else if (opt === selected) cls += ' wrong';
          else cls += ' disabled';
        } else if (opt === selected) {
          cls += ' selected';
        }
        return (
          <button
            key={opt}
            className={cls}
            style={!answered && opt === selected ? { borderColor: weekColor, color: weekColor } : undefined}
            onClick={() => handleSelect(opt)}
          >
            {answered && opt === exercise.answer && <span className="ep-icon">✓</span>}
            {answered && opt === selected && opt !== exercise.answer && <span className="ep-icon">✗</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Vrai/Faux ─────────────────────────────────────────────────
function VraiFaux({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(val) {
    if (answered) return;
    setSelected(val);
    onAnswer(val === exercise.answer, val);
  }

  return (
    <div className="ep-vf-row">
      {['vrai', 'faux'].map((val) => {
        let cls = 'ep-vf-btn';
        if (answered) {
          if (val === exercise.answer) cls += ' correct';
          else if (val === selected) cls += ' wrong';
          else cls += ' disabled';
        } else if (val === selected) {
          cls += ' selected';
        }
        return (
          <button key={val} className={cls} onClick={() => handleSelect(val)}>
            {val === 'vrai' ? '✓ Vrai' : '✗ Faux'}
          </button>
        );
      })}
    </div>
  );
}

// ── Compléter ─────────────────────────────────────────────────
function Completer({ exercise, onAnswer, answered, weekColor }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function normalize(str) {
    return str.trim().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[''']/g, "'");
  }

  function handleSubmit() {
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    const correct = normalize(value) === normalize(exercise.answer);
    onAnswer(correct, value.trim());
  }

  const isCorrect = submitted && normalize(value) === normalize(exercise.answer);
  const isWrong = submitted && !isCorrect;

  return (
    <div className="ep-completer">
      <div className="ep-completer-input-row">
        <input
          className={`ep-completer-input ${isCorrect ? 'correct' : isWrong ? 'wrong' : ''}`}
          type="text"
          placeholder="Ta réponse…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={submitted}
          style={!submitted ? { borderColor: weekColor } : undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {!submitted && (
          <button
            className="ep-completer-submit"
            style={{ background: weekColor }}
            onClick={handleSubmit}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

// ── Results screen ────────────────────────────────────────────
function ResultsScreen({ score, total, xpEarned, elapsed, weekColor, onComplete }) {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="ep-results ep-slide-in">
      <div className="ep-results-stars">{'⭐'.repeat(stars)}</div>

      <div className="ep-results-score-row">
        <div className="ep-results-score">{score}<span className="ep-results-total">/{total}</span></div>
        <div className="ep-results-pct">{pct}%</div>
      </div>

      <div className="ep-results-label">
        {pct >= 80 ? 'Excellent travail ! 🎉' : pct >= 50 ? 'Bien joué, continue ! 💪' : 'Continue à t\'entraîner ! 📚'}
      </div>

      {/* Progress bar */}
      <div className="ep-results-bar-wrap">
        <div className="ep-results-bar" style={{ width: `${pct}%`, background: weekColor }} />
      </div>

      {/* Stats */}
      <div className="ep-results-stats">
        <div className="ep-results-stat">
          <div className="ep-results-stat-val" style={{ color: weekColor }}>+{xpEarned} XP</div>
          <div className="ep-results-stat-label">XP gagnés</div>
        </div>
        <div className="ep-results-stat">
          <div className="ep-results-stat-val">⏱ {mins > 0 ? `${mins}m` : ''}{secs}s</div>
          <div className="ep-results-stat-label">Temps</div>
        </div>
        <div className="ep-results-stat">
          <div className="ep-results-stat-val">{score}/{total}</div>
          <div className="ep-results-stat-label">Bonnes rép.</div>
        </div>
      </div>

      <button className="ep-results-btn" style={{ background: weekColor }} onClick={onComplete}>
        ✓ Terminer la journée
      </button>
    </div>
  );
}

// ── XP pop animation ─────────────────────────────────────────
function XPPop({ xp, color }) {
  return (
    <div className="ep-xp-pop" style={{ color }}>+{xp} XP</div>
  );
}

// ── Adaptive banner shown before first question ───────────────
function AdaptiveBanner({ level, lastPct, lessonDayKey, weekColor, onDismiss }) {
  if (level === 'normal' && lastPct === null) return null;

  if (level === 'easy') {
    return (
      <div className="ep-adaptive-banner ep-adaptive-easy">
        <div className="ep-adaptive-icon">📖</div>
        <div className="ep-adaptive-body">
          <div className="ep-adaptive-title">On y va progressivement !</div>
          <div className="ep-adaptive-text">
            Tu as eu {lastPct}% la dernière fois. Les exercices commencent par les plus simples pour t'aider à progresser.
          </div>
          <a className="ep-adaptive-link" href={`/cahier.pdf`} target="_blank" rel="noreferrer">
            📄 Relire la leçon avant de commencer →
          </a>
        </div>
        <button className="ep-adaptive-close" onClick={onDismiss}>✕</button>
      </div>
    );
  }

  if (level === 'hard') {
    return (
      <div className="ep-adaptive-banner ep-adaptive-hard" style={{ borderColor: weekColor }}>
        <div className="ep-adaptive-icon">🏆</div>
        <div className="ep-adaptive-body">
          <div className="ep-adaptive-title">Mode défi activé !</div>
          <div className="ep-adaptive-text">Tu maîtrises ce sujet ({lastPct}%). Les exercices les plus difficiles passent en premier.</div>
        </div>
        <button className="ep-adaptive-close" onClick={onDismiss}>✕</button>
      </div>
    );
  }

  return null;
}

// ── Revision suggestion shown in feedback when struggling ─────
function RevisionSuggestion({ dayKey }) {
  return (
    <div className="ep-revision-tip">
      <span>💡</span>
      <span>Tu sembles avoir du mal avec ce point. Relis la leçon avant de continuer.</span>
    </div>
  );
}

// ── Main ExercisePlayer ───────────────────────────────────────
export default function ExercisePlayer({ dayKey, weekColor, onComplete }) {
  const { curriculum } = useLevelData();
  const rawExercises = curriculum[dayKey]?.exercises || [];
  const { level, lastPct, loading: adaptLoading, adaptExercises, invalidateCache } = useAdaptiveDifficulty(dayKey);

  const exercises = useMemo(() => adaptExercises(rawExercises), [level, rawExercises.length]);
  const total = exercises.length;
  const session = useExerciseSession(dayKey, total);
  const { saved, ready, save, clear } = useExerciseProgress(dayKey);

  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showXP, setShowXP] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState(null);
  const [resumed, setResumed] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // ── Restore saved progress once Firestore snapshot arrives ──
  useEffect(() => {
    if (!ready || resumed) return;
    setResumed(true);
    if (saved && saved.idx > 0) {
      setIdx(saved.idx);
      // Restore wrongCounts into session
      if (saved.wrongCounts) {
        Object.entries(saved.wrongCounts).forEach(([qId, count]) => {
          for (let i = 0; i < count; i++) session.recordAnswer(qId, false);
        });
      }
      // Restore score (correct answers = saved.score)
      for (let i = 0; i < (saved.score || 0); i++) {
        // Mark synthetic correct answers to restore the counter
        session.recordAnswer(`__restore_${i}`, true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (!exercises.length) return null;

  // Show spinner while loading saved state or adaptive level
  if (!ready || adaptLoading) {
    return <div className="ep-loading">⏳ Chargement…</div>;
  }

  const current = exercises[Math.min(idx, total - 1)];
  const wrongCount = session.getWrongCount(current.id);
  const typeLabel = current.type === 'qcm' ? 'QCM' : current.type === 'vrai_faux' ? 'Vrai ou Faux' : 'Compléter';

  function handleAnswer(correct) {
    if (answered) return;
    setAnswered(true);
    setIsCorrect(correct);
    session.recordAnswer(current.id, correct);

    // Persist answer immediately
    const nextScore = session.score + (correct ? 1 : 0);
    const nextWrong = correct
      ? session.wrongCounts
      : { ...session.wrongCounts, [current.id]: (session.wrongCounts[current.id] || 0) + 1 };
    save({ idx, score: nextScore, wrongCounts: nextWrong, startedAt: saved?.startedAt || new Date().toISOString() });

    if (correct) {
      playCorrect();
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1200);
    } else {
      playWrong();
    }
  }

  async function handleNext() {
    // session.score is already up to date here: recordAnswer ran in the previous
    // click event (handleAnswer), so adding the last answer again would double-count it.
    if (idx + 1 >= total) {
      playComplete();
      const finalScore = session.score;
      // Clear in-progress save — session complete
      clear();
      // Invalidate adaptive cache so next session recomputes level
      invalidateCache();
      const res = await session.saveSession(finalScore);
      if (finalScore / total >= 0.7) launchConfetti(100);
      playXP();
      setResults({ ...res, finalScore });
      setDone(true);
    } else {
      const nextIdx = idx + 1;
      setIdx(nextIdx);
      setAnswered(false);
      setIsCorrect(null);
      // Save new index so resume lands on the right question
      save({ idx: nextIdx, score: session.score, wrongCounts: session.wrongCounts });
    }
  }

  // ── Results screen ────────────────────────────────────────
  if (done && results) {
    return (
      <ResultsScreen
        score={results.finalScore}
        total={total}
        xpEarned={results.totalXp}
        elapsed={results.elapsed}
        weekColor={weekColor}
        onComplete={onComplete}
      />
    );
  }

  // Track wrong answers in this session to detect struggling
  const sessionWrongTotal = Object.values(session.wrongCounts).reduce((s, v) => s + v, 0);
  const isStruggling = level === 'easy' || (idx >= 2 && sessionWrongTotal >= 2);

  return (
    <div className="ep-wrap">
      {/* Adaptive banner (first question only) */}
      {idx === 0 && showBanner && (
        <AdaptiveBanner
          level={level}
          lastPct={lastPct}
          dayKey={dayKey}
          weekColor={weekColor}
          onDismiss={() => setShowBanner(false)}
        />
      )}

      {/* Progress bar */}
      <div className="ep-progress-row">
        <div className="ep-progress-bar">
          <div className="ep-progress-fill" style={{ width: `${(idx / total) * 100}%`, background: weekColor }} />
        </div>
        <div className="ep-counter">{idx + 1}/{total}</div>
      </div>

      {/* XP pop */}
      {showXP && <XPPop xp={5} color={weekColor} />}

      {/* Question card */}
      <div className="ep-card">
        <div className="ep-type-chip" style={{ background: `${weekColor}22`, color: weekColor }}>
          {typeLabel}{level === 'hard' ? ' 🏆' : ''}
        </div>
        <div className="ep-question">{current.question}</div>

        {/* Extra hint shown upfront when user is struggling */}
        {isStruggling && !answered && current.hint && (
          <div className="ep-proactive-hint">
            <span>🔍</span> <span>{current.hint}</span>
          </div>
        )}

        {current.type === 'qcm' && (
          <QCM exercise={current} onAnswer={handleAnswer} answered={answered} weekColor={weekColor} />
        )}
        {current.type === 'vrai_faux' && (
          <VraiFaux exercise={current} onAnswer={handleAnswer} answered={answered} />
        )}
        {current.type === 'completer' && (
          <Completer exercise={current} onAnswer={handleAnswer} answered={answered} weekColor={weekColor} />
        )}
      </div>

      {/* Feedback */}
      {answered && (
        <>
          {/* Revision suggestion when struggling and wrong */}
          {isStruggling && !isCorrect && <RevisionSuggestion dayKey={dayKey} />}
          <FeedbackPanel
            correct={isCorrect}
            exercise={current}
            wrongCount={wrongCount}
            onNext={handleNext}
            isLast={idx + 1 >= total}
            weekColor={weekColor}
          />
        </>
      )}
    </div>
  );
}
