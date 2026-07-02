export const BADGES = [
  { key: 'premier-pas', emoji: '🌱', title: 'Premier pas', description: 'Termine ta première journée', check: (s) => s.totalDone >= 1 },
  { key: 'semaine-bouclee', emoji: '📚', title: 'Semaine bouclée', description: 'Termine une semaine complète (5/5)', check: (s) => s.maxWeekDone >= 5 },
  { key: 'studieux', emoji: '🎓', title: 'Studieux', description: 'Termine 10 journées', check: (s) => s.totalDone >= 10 },
  { key: 'critique-ia', emoji: '🤖', title: 'Critique IA', description: 'Reçois 5 corrections de l\'IA', check: (s) => s.totalCorrections >= 5 },
  { key: 'excellent-eleve', emoji: '🏅', title: 'Excellent élève', description: 'Obtiens une note de 18/20 ou plus', check: (s) => s.bestNote >= 18 },
  { key: 'cordon-bleu', emoji: '👨‍🍳', title: 'Cordon bleu', description: 'Ajoute une recette en favori', check: (s) => s.favoriteRecipes >= 1 },
  { key: 'sportif', emoji: '🏃', title: 'Sportif du jour', description: 'Termine une séance de sport', check: (s) => s.sportSections >= 3 },
  { key: 'champion-ete', emoji: '🏆', title: 'Champion de l\'été', description: 'Termine les 40 journées', check: (s) => s.totalDone >= 40 },
  // ── Badges 3ème / Brevet ──
  { key: 'brevet-ready', emoji: '🎓', title: 'Brevetiste', description: 'Réalise 50 exercices interactifs', check: (s) => s.totalExercisesDone >= 50 },
  { key: 'precision-pro', emoji: '🎯', title: 'Précision Pro', description: 'Atteins 80% de précision globale', check: (s) => s.totalExercisesDone >= 10 && s.averagePct >= 80 },
  { key: 'sans-faute', emoji: '⭐', title: 'Sans faute', description: 'Réalise 5 sessions parfaites', check: (s) => s.perfectSessions >= 5 },
  { key: 'marathonien', emoji: '⏱️', title: 'Marathonien', description: 'Accumule 2h de travail interactif', check: (s) => s.totalTimeSeconds >= 7200 },
  { key: 'brevet-blanc', emoji: '📋', title: 'Blanc réussi', description: 'Termine les semaines 7 et 8', check: (s) => s.totalDone >= 35 },
];
