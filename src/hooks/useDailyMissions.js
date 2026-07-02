import { DAILY_MISSIONS } from '../data/gamification.js';
import { useSportProgress } from './useSportProgress.js';
import { useCorrections } from './useCorrections.js';
import { useAssistantChat } from './useAssistantChat.js';
import { useGamification } from './useGamification.js';
import { todayKey } from '../utils/date.js';

export function useDailyMissions() {
  const { done: sportDone } = useSportProgress();
  const { corrections } = useCorrections();
  const { messages } = useAssistantChat();
  const { isMissionClaimed, claimMission } = useGamification();

  const today = todayKey();

  const completion = {
    sport: Object.values(sportDone).some(Boolean),
    correction: corrections.some((c) => c.createdAt?.toDate && c.createdAt.toDate().toISOString().slice(0, 10) === today),
    assistant: messages.some((m) => m.role === 'user' && m.ts === today),
  };

  const missions = DAILY_MISSIONS.map((m) => ({
    ...m,
    completed: completion[m.key],
    claimed: isMissionClaimed(m.key),
  }));

  return { missions, claimMission };
}
