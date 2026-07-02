import { useRef, useState, useCallback } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useGamification } from './useGamification.js';

import { invalidateStatsCache } from './useExerciseStats.js';

// XP per correct answer, bonus for no mistakes
const XP_CORRECT = 5;
const XP_PERFECT_BONUS = 20;
const XP_COMPLETE = 15;

export function useExerciseSession(dayKey, totalQuestions) {
  const { user, niveau, matiere } = useAuth();
  const levelId = niveau || '4eme';
  const matiereId = matiere || 'francais';
  const { awardForDayComplete } = useGamification();
  const startTime = useRef(Date.now());
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [wrongCounts, setWrongCounts] = useState({}); // questionId → number of wrong attempts

  function recordAnswer(questionId, correct) {
    if (correct) {
      const xp = XP_CORRECT;
      setScore((s) => s + 1);
      setXpEarned((x) => x + xp);
    } else {
      setWrongCounts((prev) => ({ ...prev, [questionId]: (prev[questionId] || 0) + 1 }));
    }
  }

  const getWrongCount = useCallback(
    (questionId) => wrongCounts[questionId] || 0,
    [wrongCounts]
  );

  async function saveSession(finalScore) {
    if (!user) return;
    const elapsed = Math.round((Date.now() - startTime.current) / 1000);
    const perfect = finalScore === totalQuestions;
    const totalXp = xpEarned + XP_COMPLETE + (perfect ? XP_PERFECT_BONUS : 0);

    // Save exercise result to Firestore (namespaced by level + subject)
    const sessionRef = doc(db, 'users', user.uid, 'exerciseSessions', `${levelId}_${matiereId}_${dayKey}-${Date.now()}`);
    await setDoc(sessionRef, {
      dayKey,
      niveau: levelId,
      subject: matiereId,
      score: finalScore,
      total: totalQuestions,
      pct: Math.round((finalScore / totalQuestions) * 100),
      xpEarned: totalXp,
      elapsedSeconds: elapsed,
      perfect,
      completedAt: serverTimestamp(),
    }).catch(() => {});

    // Award XP / day complete — dedup key scoped by level + subject
    awardForDayComplete(`${levelId}_${matiereId}_${dayKey}`);

    // Bust stats cache so Statistiques page shows fresh data on next visit
    invalidateStatsCache(user.uid, levelId, matiereId);

    return { totalXp, elapsed, perfect };
  }

  function elapsedSeconds() {
    return Math.round((Date.now() - startTime.current) / 1000);
  }

  return { score, xpEarned, wrongCounts, recordAnswer, getWrongCount, saveSession, elapsedSeconds };
}
