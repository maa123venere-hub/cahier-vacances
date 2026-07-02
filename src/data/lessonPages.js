// Mapping dayKey → page(s) du cahier PDF
// Basé sur le vrai cahier Français 4e→3e (168 pages)
// weekIdx-dayIdx : { lesson: page de la leçon, exercises: page des exercices }

export const LESSON_PAGES = {

  // ── SEMAINE 1 — Les bases de la phrase ──────────────────────
  '0-0': { lesson: 10, exercises: 24 },  // Classes grammaticales (p.10-11) · Exos p.24
  '0-1': { lesson: 12, exercises: 25 },  // Fonctions dans la phrase (p.12-13) · Exos p.25
  '0-2': { lesson: 24, exercises: 24 },  // Révision — Exercices de grammaire p.24-29
  '0-3': { lesson: 32, exercises: 43 },  // Présent de l'indicatif (p.32-33) · Exos p.43
  '0-4': { lesson: 94, exercises: 43 },  // Dictée 1 (p.94) · Conjugaison exos p.43

  // ── SEMAINE 2 — Enrichir et construire ──────────────────────
  '1-0': { lesson: 14, exercises: 26 },  // Expansions du nom (p.14-15) · Exos p.26
  '1-1': { lesson: 16, exercises: 26 },  // Phrase simple et complexe (p.16-17) · Exos p.26
  '1-2': { lesson: 34, exercises: 44 },  // Imparfait (p.34) · Exos p.44
  '1-3': { lesson: 18, exercises: 27 },  // Propositions subordonnées (p.18-19) · Exos p.27
  '1-4': { lesson: 137, exercises: 95 }, // Lecture 1 — Le premier jour (p.137) · Dictée 2 p.95

  // ── SEMAINE 3 — Subordonnées et récit au passé ──────────────
  '2-0': { lesson: 18, exercises: 27 },  // Subordonnées suite (p.18-21) · Exos p.27
  '2-1': { lesson: 20, exercises: 28 },  // Coordination et juxtaposition (p.20-21) · Exos p.28
  '2-2': { lesson: 35, exercises: 45 },  // Passé simple (p.35) · Exos p.45
  '2-3': { lesson: 36, exercises: 45 },  // Plus-que-parfait (p.36) · Exos p.45
  '2-4': { lesson: 115, exercises: 96 }, // Rédaction 1 (p.115) · Dictée 3 p.96

  // ── SEMAINE 4 — Types de phrases et futur ───────────────────
  '3-0': { lesson: 22, exercises: 28 },  // Types et formes de phrases (p.22-23) · Exos p.28
  '3-1': { lesson: 37, exercises: 46 },  // Futur simple (p.37) · Exos p.46
  '3-2': { lesson: 38, exercises: 46 },  // Conditionnel (p.38) · Exos p.46
  '3-3': { lesson: 28, exercises: 29 },  // Entraînement grammaire · Exos p.28-29
  '3-4': { lesson: 139, exercises: 97 }, // Lecture 2 — La porte (p.139) · Dictée 4 p.97

  // ── SEMAINE 5 — Orthographe et modes ────────────────────────
  '4-0': { lesson: 50, exercises: 58 },  // Accord sujet/verbe (p.50) · Exos p.58
  '4-1': { lesson: 51, exercises: 58 },  // Accord GN + participe passé (p.51-52) · Exos p.58
  '4-2': { lesson: 39, exercises: 47 },  // Subjonctif + impératif (p.39-40) · Exos p.47
  '4-3': { lesson: 58, exercises: 60 },  // Entraînement accords · Exos p.60
  '4-4': { lesson: 116, exercises: 98 }, // Rédaction 2 (p.116) · Dictée 5 p.98

  // ── SEMAINE 6 — Orthographe suite et participe passé ────────
  '5-0': { lesson: 53, exercises: 59 },  // Homophones grammaticaux (p.53-54) · Exos p.59
  '5-1': { lesson: 55, exercises: 61 },  // Ponctuation + pluriels particuliers (p.55-57) · Exos p.61
  '5-2': { lesson: 41, exercises: 48 },  // Participe passé et accord (p.41-42) · Exos p.48
  '5-3': { lesson: 58, exercises: 60 },  // Entraînement homophones + PP · Exos p.60
  '5-4': { lesson: 141, exercises: 99 }, // Lecture 3 — L'aube (p.141) · Dictée 6 p.99

  // ── SEMAINE 7 — Vocabulaire et figures de style ─────────────
  '6-0': { lesson: 63, exercises: 70 },  // Préfixes, suffixes, synonymes (p.63-66) · Exos p.70
  '6-1': { lesson: 67, exercises: 71 },  // Champ lexical + niveaux + sens (p.67-69) · Exos p.71
  '6-2': { lesson: 74, exercises: 70 },  // Figures de style (p.74-75) · Exos p.70
  '6-3': { lesson: 76, exercises: 71 },  // Registres littéraires (p.76) · Exos p.71
  '6-4': { lesson: 117, exercises: 100 },// Rédaction 3 (p.117) · Dictée 7 p.100

  // ── SEMAINE 8 — Genres littéraires, méthodes, bilan final ───
  '7-0': { lesson: 77, exercises: 78 },  // Genres littéraires + poésie + théâtre (p.77-81)
  '7-1': { lesson: 82, exercises: 84 },  // Roman, nouvelle + argumentation (p.82-85)
  '7-2': { lesson: 87, exercises: 92 },  // Méthodes 1 à 6 (p.87-92) · Préparer le brevet p.92
  '7-3': { lesson: 145, exercises: 101 },// Lecture 5 — Conte (p.145) · Dictée 8 p.101
  '7-4': { lesson: 157, exercises: 157 },// Grand Contrôle Final (p.157-167)
};

export const PDF_URL = '/cahier.pdf';

export function getPdfPageUrl(dayKey, type = 'lesson') {
  const pages = LESSON_PAGES[dayKey];
  if (!pages) return PDF_URL;
  const page = type === 'exercises' ? pages.exercises : pages.lesson;
  return `${PDF_URL}#page=${page}`;
}
