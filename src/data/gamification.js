export const XP_REWARDS = {
  DAY_COMPLETE: 50,
  CORRECTION_RECEIVED: 10, // + up to 20 more based on the note
  SPORT_SESSION: 25,
  MISSION: 15,
};

export const COIN_REWARDS = {
  DAY_COMPLETE: 10,
  CORRECTION_RECEIVED: 2,
  SPORT_SESSION: 5,
  MISSION: 5,
  CHEST_MIN: 15,
  CHEST_MAX: 40,
};

export function xpForLevel(level) {
  return (level - 1) * 100;
}

export function levelFromXp(xp) {
  return Math.floor(xp / 100) + 1;
}

export function xpProgressInLevel(xp) {
  return xp % 100;
}

export const DAILY_MISSIONS = [
  { key: 'sport', emoji: '🏃', label: 'Termine au moins une étape de sport' },
  { key: 'correction', emoji: '🤖', label: 'Reçois une correction de l\'IA' },
  { key: 'assistant', emoji: '💬', label: 'Pose une question à l\'assistant IA' },
];
