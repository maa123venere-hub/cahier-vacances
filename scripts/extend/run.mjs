// Rallonge tous les jours de Maths et de Français à 10-15 questions.
// Idempotent : les exercices générés portent un id contenant "-x" ;
// on ne compte que les exercices "de base" pour calculer les ajouts,
// puis on réécrit entièrement les fichiers générés.
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { generateMathsExercises } from './templates-maths.mjs';
import { generateFrancaisExercises } from './banks-francais.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = (p) => resolve(ROOT, p);

const TARGET = 12;      // cible par jour
const TARGET_REPOS = 10; // jours 14 juillet (allégés) → au minimum demandé
const MIN = 10, MAX = 15;

function baseCount(exos) {
  return (exos || []).filter((e) => !String(e.id).includes('-x')).length;
}
function needFor(exos, isRepos) {
  const base = baseCount(exos);
  const target = Math.max(MIN, Math.min(MAX, isRepos ? TARGET_REPOS : TARGET));
  return Math.max(0, target - base);
}
function writeModule(path, varName, obj, header) {
  const body = `// ${header}\n// Fichier GÉNÉRÉ par scripts/extend/run.mjs — ne pas éditer à la main.\nexport const ${varName} = ${JSON.stringify(obj, null, 1)};\n`;
  writeFileSync(OUT(path), body);
}

let total = 0;
const report = [];

// ── 1. Matière MATHS : 4 niveaux, tous les jours ──────────────────
for (const lvl of [6, 5, 4, 3]) {
  const mod = await import(`${ROOT}/src/data/maths/${lvl}eme.js`);
  const drills = {};
  let count = 0;
  for (const [dayId, cur] of Object.entries(mod.curriculum)) {
    const day = mod.weeks[Number(dayId.split('-')[0])]?.days[Number(dayId.split('-')[1])];
    const isRepos = day?.type === 'repos';
    const need = needFor(cur.exercises, isRepos);
    if (!need) continue;
    drills[dayId] = generateMathsExercises(dayId, day?.lecon || '', lvl, need, `m${lvl}`);
    count += drills[dayId].length;
  }
  writeModule(`src/data/maths/drills${lvl}.js`, 'DRILLS', drills, `Exercices d'entraînement supplémentaires — Maths ${lvl}e`);
  report.push(`Maths ${lvl}e : +${count}`);
  total += count;
}

// ── 2. FRANÇAIS 4ème (curriculum.js) : tous les jours ─────────────
{
  const mod = await import(`${ROOT}/src/data/curriculum.js`);
  const { WEEKS } = await import(`${ROOT}/src/data/weeks.js`);
  const used = new Set();
  const extra = {};
  let count = 0;
  for (const [dayId, cur] of Object.entries(mod.CURRICULUM)) {
    const [s, j] = dayId.split('-').map(Number);
    const day = WEEKS[s]?.days[j];
    const isRepos = day?.type === 'repos';
    const need = needFor(cur.exercises, isRepos);
    if (!need) continue;
    extra[dayId] = generateFrancaisExercises(dayId, day?.lecon || '', 4, need, '4f', used);
    count += extra[dayId].length;
  }
  writeModule('src/data/curriculumExtra.js', 'CURRICULUM_EXTRA', extra, 'Exercices supplémentaires — Français 4e');
  report.push(`Français 4e : +${count}`);
  total += count;
}

// ── 3. Seeds 6e / 5e / 3e : jours français et maths uniquement ────
for (const lvl of [6, 5, 3]) {
  const mod = await import(`${ROOT}/src/data/seed/${lvl}eme.js`);
  const jours = mod.buildSeedJours();
  const used = new Set();
  const extra = {};
  let count = 0;
  for (const day of jours) {
    if (day.matiere !== 'français' && day.matiere !== 'maths') continue;
    const isRepos = day.type === 'repos';
    const need = needFor(day.exercices, isRepos);
    if (!need) continue;
    extra[day.id] = day.matiere === 'maths'
      ? generateMathsExercises(day.id, day.lecon, lvl, need, `${lvl}m`)
      : generateFrancaisExercises(day.id, day.lecon, lvl, need, `${lvl}f`, used);
    count += extra[day.id].length;
  }
  writeModule(`src/data/seed/extra${lvl}.js`, `EXTRA_${lvl}EME`, extra, `Exercices supplémentaires — jours Français & Maths du cahier ${lvl}e`);
  report.push(`Cahier ${lvl}e (fr+maths) : +${count}`);
  total += count;
}

console.log(report.join('\n'));
console.log(`TOTAL exercices générés : ${total}`);
