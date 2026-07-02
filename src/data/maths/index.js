// Light registry for the Mathématiques subject — metadata only.
// Heavy per-level content (weeks + curriculum) is loaded on demand via dynamic
// import in useContenus, so switching to Maths doesn't bloat the main bundle.

export const MATHS_META = {
  '6eme': {
    id: '6eme', label: '6ème', emoji: '📘', sub: 'Entrée au collège',
    color: '#0891B2', light: '#ECFEFF',
    title: 'Mathématiques 6e', description: 'Maths — Révisions Été 2026 (entrée au collège)',
    pdfFile: null, totalWeeks: 8, totalDays: 40,
  },
  '5eme': {
    id: '5eme', label: '5ème', emoji: '📗', sub: '2e année de collège',
    color: '#059669', light: '#ECFDF5',
    title: 'Mathématiques 5e', description: 'Maths — Révisions Été 2026 (2e année de collège)',
    pdfFile: null, totalWeeks: 8, totalDays: 40,
  },
  '4eme': {
    id: '4eme', label: '4ème', emoji: '📙', sub: '3e année de collège',
    color: '#D97706', light: '#FFFBEB',
    title: 'Mathématiques 4e', description: 'Maths — Révisions Été 2026 (3e année de collège)',
    pdfFile: null, totalWeeks: 8, totalDays: 40,
  },
  '3eme': {
    id: '3eme', label: '3ème', emoji: '📕', sub: 'Préparation brevet',
    color: '#DC2626', light: '#FEF2F2',
    title: 'Mathématiques 3e', description: 'Maths — Révisions Été 2026 (préparation brevet)',
    pdfFile: null, totalWeeks: 8, totalDays: 40,
  },
};

const MATHS_DEFAULT = '4eme';

export function getMathsMeta(niveau) {
  return MATHS_META[niveau] ?? MATHS_META[MATHS_DEFAULT];
}

// Dynamically import a level's full content (weeks + curriculum + seed builders).
// Returns the module's default export: { meta, weeks, curriculum }.
export function loadMathsLevel(niveau) {
  switch (niveau) {
    case '6eme': return import('./6eme.js');
    case '5eme': return import('./5eme.js');
    case '3eme': return import('./3eme.js');
    case '4eme':
    default: return import('./4eme.js');
  }
}
