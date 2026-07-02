import { useDone } from './useDone.js';
import { useCorrections } from './useCorrections.js';
import { useFavorites } from './useFavorites.js';
import { useSportProgress } from './useSportProgress.js';
import { useExerciseStats } from './useExerciseStats.js';
import { useLevelData } from './useLevelData.js';

export function useStats() {
  const { done } = useDone();
  const { corrections } = useCorrections();
  const { favorites } = useFavorites('recipes');
  const { done: sportDone } = useSportProgress();
  const exerciseStats = useExerciseStats();
  const { weeks } = useLevelData();
  const safeWeeks = weeks || [];
  const totalDays = safeWeeks.reduce((s, w) => s + (w.days?.length || 0), 0);

  const totalDone = Object.values(done).filter(Boolean).length;

  const maxWeekDone = safeWeeks.reduce((max, w, wi) => {
    const count = w.days.filter((_, di) => done[`${wi}-${di}`]).length;
    return Math.max(max, count);
  }, 0);

  const bestNote = corrections.reduce((max, c) => Math.max(max, c.note || 0), 0);
  const sportSections = Object.values(sportDone).filter(Boolean).length;

  return {
    totalDone,
    totalDays,
    maxWeekDone,
    totalCorrections: corrections.length,
    bestNote,
    favoriteRecipes: favorites.length,
    sportSections,
    averageNote: corrections.length ? Math.round((corrections.reduce((s, c) => s + (c.note || 0), 0) / corrections.length) * 10) / 10 : 0,
    // Exercise stats
    ...exerciseStats,
  };
}
