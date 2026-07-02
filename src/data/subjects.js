// Subjects (matières) available in the app.
// The top-level axis alongside `niveau`: a user studies a given LEVEL in a given SUBJECT.
// Français is the historical default; Maths is the second subject.
export const SUBJECTS = [
  { id: 'francais', label: 'Français', short: 'Français', emoji: '📖' },
  { id: 'maths',    label: 'Mathématiques', short: 'Maths', emoji: '🔢' },
];

export const DEFAULT_SUBJECT = 'francais';

export function getSubject(id) {
  return SUBJECTS.find((s) => s.id === id) || SUBJECTS[0];
}

export const SUBJECT_IDS = SUBJECTS.map((s) => s.id);
