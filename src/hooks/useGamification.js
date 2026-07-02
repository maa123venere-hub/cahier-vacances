import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';
import { XP_REWARDS, COIN_REWARDS } from '../data/gamification.js';
import { todayKey, daysBetween } from '../utils/date.js';

const DEFAULT_STATS = {
  xp: 0,
  coins: 0,
  streak: 0,
  lastActiveDate: null,
  awardedDays: {},
  chestClaimedDate: null,
  missionsClaimed: {}, // `${date}-${missionKey}` -> true
};

export function useGamification() {
  const { user } = useAuth();
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'gamification', 'stats');
    const unsubscribe = onSnapshot(ref, (snap) => {
      setStats(snap.exists() ? { ...DEFAULT_STATS, ...snap.data() } : DEFAULT_STATS);
    });
    return unsubscribe;
  }, [user]);

  function persist(next) {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'gamification', 'stats');
    setDoc(ref, next, { merge: true }).catch(() => {});
  }

  function bumpStreak(prev) {
    const today = todayKey();
    if (prev.lastActiveDate === today) return prev.streak || 0;
    if (prev.lastActiveDate && daysBetween(prev.lastActiveDate, today) === 1) return (prev.streak || 0) + 1;
    return 1;
  }

  function addReward(xpAmount, coinsAmount) {
    setStats((prev) => {
      const next = {
        ...prev,
        xp: (prev.xp || 0) + xpAmount,
        coins: (prev.coins || 0) + coinsAmount,
        streak: bumpStreak(prev),
        lastActiveDate: todayKey(),
      };
      persist(next);
      return next;
    });
  }

  function awardForDayComplete(dayKey) {
    setStats((prev) => {
      if (prev.awardedDays?.[dayKey]) return prev;
      const next = {
        ...prev,
        xp: (prev.xp || 0) + XP_REWARDS.DAY_COMPLETE,
        coins: (prev.coins || 0) + COIN_REWARDS.DAY_COMPLETE,
        streak: bumpStreak(prev),
        lastActiveDate: todayKey(),
        awardedDays: { ...prev.awardedDays, [dayKey]: true },
      };
      persist(next);
      return next;
    });
  }

  function awardForCorrection(note = 0) {
    const bonus = Math.round((note / 20) * 20);
    addReward(XP_REWARDS.CORRECTION_RECEIVED + bonus, COIN_REWARDS.CORRECTION_RECEIVED);
  }

  function awardForSport() {
    const today = todayKey();
    setStats((prev) => {
      if (prev.sportSessionDate === today) return prev;
      const next = {
        ...prev,
        xp: (prev.xp || 0) + XP_REWARDS.SPORT_SESSION,
        coins: (prev.coins || 0) + COIN_REWARDS.SPORT_SESSION,
        streak: bumpStreak(prev),
        lastActiveDate: today,
        sportSessionDate: today,
      };
      persist(next);
      return next;
    });
  }

  function claimMission(missionKey) {
    const today = todayKey();
    const id = `${today}-${missionKey}`;
    setStats((prev) => {
      if (prev.missionsClaimed?.[id]) return prev;
      const next = {
        ...prev,
        xp: (prev.xp || 0) + XP_REWARDS.MISSION,
        coins: (prev.coins || 0) + COIN_REWARDS.MISSION,
        streak: bumpStreak(prev),
        lastActiveDate: today,
        missionsClaimed: { ...prev.missionsClaimed, [id]: true },
      };
      persist(next);
      return next;
    });
  }

  function isMissionClaimed(missionKey) {
    return !!stats.missionsClaimed?.[`${todayKey()}-${missionKey}`];
  }

  function canClaimChest() {
    return stats.chestClaimedDate !== todayKey();
  }

  function claimChest() {
    if (!canClaimChest()) return 0;
    const reward = Math.floor(Math.random() * (COIN_REWARDS.CHEST_MAX - COIN_REWARDS.CHEST_MIN + 1)) + COIN_REWARDS.CHEST_MIN;
    setStats((prev) => {
      const next = {
        ...prev,
        coins: (prev.coins || 0) + reward,
        chestClaimedDate: todayKey(),
      };
      persist(next);
      return next;
    });
    return reward;
  }

  return {
    stats,
    awardForDayComplete,
    awardForCorrection,
    awardForSport,
    claimMission,
    isMissionClaimed,
    canClaimChest,
    claimChest,
  };
}
