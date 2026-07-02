/**
 * Seed data for 4ème level.
 * Transforms the static weeks/lessonPages/curriculum into
 * the unified ContenusDocument format used by Firestore.
 *
 * This file is ONLY used for seeding — the app reads from Firestore.
 * Run seedContenus('4eme') from the admin panel to push this to Firestore.
 */

import { WEEKS } from '../weeks.js';
import { LESSON_PAGES } from '../lessonPages.js';
import { CURRICULUM } from '../curriculum.js';

// Infer matiere from leçon title
function inferMatiere(lecon = '') {
  const t = lecon.toLowerCase();
  if (t.includes('grammaire') || t.includes('phrase') || t.includes('subordonnée') || t.includes('expansion') || t.includes('fonctions')) return 'grammaire';
  if (t.includes('conjugaison') || t.includes('imparfait') || t.includes('présent') || t.includes('passé') || t.includes('futur') || t.includes('conditionnel') || t.includes('subjonctif')) return 'conjugaison';
  if (t.includes('orthographe') || t.includes('accord') || t.includes('homophone') || t.includes('participe') || t.includes('participe passé')) return 'orthographe';
  if (t.includes('dictée')) return 'orthographe';
  if (t.includes('lecture') || t.includes('texte')) return 'lecture';
  if (t.includes('rédaction') || t.includes('redac')) return 'redaction';
  if (t.includes('vocabulaire') || t.includes('préfixe') || t.includes('suffixe') || t.includes('figure')) return 'vocabulaire';
  if (t.includes('révision') || t.includes('revision') || t.includes('exercice')) return 'revision';
  return 'grammaire';
}

export function buildSeedJours() {
  const jours = [];
  let ordre = 0;

  WEEKS.forEach((week, semaineIndex) => {
    week.days.forEach((day, jourIndex) => {
      const id = `${semaineIndex}-${jourIndex}`;
      const pages = LESSON_PAGES[id] || {};
      const curriculumDay = CURRICULUM[id] || {};

      jours.push({
        id,
        semaineIndex,
        jourIndex,
        semaineNum: week.num,
        jourNum: jourIndex + 1,
        ordre: ordre++,

        label: day.label || '',
        type: day.type || 'lecon',
        matiere: inferMatiere(day.lecon),

        lecon: day.lecon || '',
        detail: day.detail || '',
        tip: day.tip || '',
        difficulte: Math.min(5, Math.ceil(week.num / 2)),

        lessonPage: pages.lesson || null,
        exercisesPage: pages.exercises || null,
        pdfFile: '/cahier.pdf',

        exercices: curriculumDay.exercises || [],
        images: [],
        videos: [],
      });
    });
  });

  return jours;
}

export function buildSeedSemaines() {
  return WEEKS.map((week, index) => ({
    index,
    num: week.num,
    theme: week.theme,
    color: week.color,
    light: week.light,
    emoji: week.emoji,
  }));
}
