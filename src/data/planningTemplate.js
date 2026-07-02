export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const SLOTS = [
  { key: 'petitDejeuner', emoji: '🥐', label: 'Petit-déjeuner', defaultText: '7h30 — Petit-déjeuner' },
  { key: 'sport', emoji: '🏃', label: 'Sport', defaultText: '9h00 — 30 min d\'activité physique' },
  { key: 'dejeuner', emoji: '🍽️', label: 'Déjeuner', defaultText: '12h30 — Déjeuner' },
  { key: 'devoirs', emoji: '📚', label: 'Devoirs', defaultText: '14h00 — Cahier de vacances' },
  { key: 'tempsLibre', emoji: '🎮', label: 'Temps libre', defaultText: '16h00 — Temps libre' },
  { key: 'diner', emoji: '🌙', label: 'Dîner', defaultText: '19h30 — Dîner' },
];

export function buildDefaultPlanning() {
  const planning = {};
  for (const day of DAYS) {
    planning[day] = {};
    for (const slot of SLOTS) {
      planning[day][slot.key] = { text: slot.defaultText, done: false };
    }
  }
  return planning;
}
