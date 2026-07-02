// Shared constants + helpers for all Maths levels.
// Keeps the per-level files focused on pedagogical content (themes, lessons, exercises)
// while calendar labels and week colors stay consistent across the whole app.

// Same 8-week color scheme as Français so the app stays visually coherent.
export const WEEK_STYLE = [
  { color: '#2563EB', light: '#EFF6FF' }, // S1 — blue
  { color: '#0891B2', light: '#ECFEFF' }, // S2 — cyan
  { color: '#059669', light: '#ECFDF5' }, // S3 — emerald
  { color: '#D97706', light: '#FFFBEB' }, // S4 — amber
  { color: '#7C3AED', light: '#F5F3FF' }, // S5 — violet
  { color: '#DC2626', light: '#FEF2F2' }, // S6 — red
  { color: '#0D9488', light: '#F0FDFA' }, // S7 — teal
  { color: '#BE185D', light: '#FDF2F8' }, // S8 — pink
];

// Summer 2026 calendar — same day labels as the Français cahier (Mon→Fri, 8 weeks).
export const DAY_LABELS = [
  ['Lun 29 juin', 'Mar 30 juin', 'Mer 1er juil.', 'Jeu 2 juil.', 'Ven 3 juil.'],
  ['Lun 6 juil.', 'Mar 7 juil.', 'Mer 8 juil.', 'Jeu 9 juil.', 'Ven 10 juil.'],
  ['Lun 13 juil.', 'Mar 14 juil.', 'Mer 15 juil.', 'Jeu 16 juil.', 'Ven 17 juil.'],
  ['Lun 20 juil.', 'Mar 21 juil.', 'Mer 22 juil.', 'Jeu 23 juil.', 'Ven 24 juil.'],
  ['Lun 27 juil.', 'Mar 28 juil.', 'Mer 29 juil.', 'Jeu 30 juil.', 'Ven 31 juil.'],
  ['Lun 3 août', 'Mar 4 août', 'Mer 5 août', 'Jeu 6 août', 'Ven 7 août'],
  ['Lun 10 août', 'Mar 11 août', 'Mer 12 août', 'Jeu 13 août', 'Ven 14 août'],
  ['Lun 17 août', 'Mar 18 août', 'Mer 19 août', 'Jeu 20 août', 'Ven 21 août'],
];

// Assemble the full `weeks` array from compact per-level week definitions.
// weekDefs: [{ num, theme, emoji, days: [{ lecon, detail, tip, type, domaine }] }]
export function assembleWeeks(weekDefs) {
  return weekDefs.map((w, i) => ({
    num: w.num,
    theme: w.theme,
    emoji: w.emoji,
    color: WEEK_STYLE[i].color,
    light: WEEK_STYLE[i].light,
    days: w.days.map((d, j) => ({
      label: DAY_LABELS[i]?.[j] || '',
      type: d.type || 'lecon',
      domaine: d.domaine || 'calcul',
      lecon: d.lecon || '',
      detail: d.detail || '',
      tip: d.tip || '',
    })),
  }));
}
