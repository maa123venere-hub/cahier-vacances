// Generic seed builder for Maths levels.
// Transforms a level's { weeks, curriculum } into the unified jours/semaines
// documents consumed by useContenus → buildLegacyShapes (same shape as Français seed).

export function buildMathsJours(weeks, curriculum, pdfFile = null, pagesMap = {}) {
  const jours = [];
  let ordre = 0;

  weeks.forEach((week, semaineIndex) => {
    week.days.forEach((day, jourIndex) => {
      const id = `${semaineIndex}-${jourIndex}`;
      const cur = curriculum[id] || {};

      jours.push({
        id,
        semaineIndex,
        jourIndex,
        semaineNum: week.num,
        jourNum: jourIndex + 1,
        ordre: ordre++,

        label: day.label || '',
        type: day.type || 'lecon',
        // Per-day domain (algèbre, géométrie…) — used for matière-stats grouping
        matiere: day.domaine || 'calcul',

        lecon: day.lecon || '',
        detail: day.detail || '',
        tip: day.tip || '',
        difficulte: Math.min(5, Math.ceil(week.num / 2)),

        lessonPage: pagesMap[id]?.lesson ?? null,
        exercisesPage: pagesMap[id]?.exercises ?? null,
        pdfFile,

        exercices: cur.exercises || [],
        images: [],
        videos: [],
      });
    });
  });

  return jours;
}

export function buildMathsSemaines(weeks) {
  return weeks.map((week, index) => ({
    index,
    num: week.num,
    theme: week.theme,
    color: week.color,
    light: week.light,
    emoji: week.emoji,
  }));
}
