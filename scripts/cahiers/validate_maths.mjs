// Validate all 4 Maths curricula: structure + exercise correctness.
const BASE = '/Users/maxwellve/Desktop/Claude code/cahier-vacances 2k26/src/data/maths';
const LEVELS = ['6eme', '5eme', '4eme', '3eme'];

let errors = 0;
let warnings = 0;
const err = (m) => { console.log('  ❌ ' + m); errors++; };
const warn = (m) => { console.log('  ⚠️  ' + m); warnings++; };

function normalize(str) {
  return String(str).trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘`]/g, "'");
}

let grandExos = 0;

for (const lvl of LEVELS) {
  console.log(`\n=== MATHS ${lvl} ===`);
  const mod = await import(`${BASE}/${lvl}.js`);
  const { weeks, curriculum, meta, buildSeedJours, buildSeedSemaines } = mod;

  // Weeks structure
  if (weeks.length !== 8) err(`weeks.length = ${weeks.length} (attendu 8)`);
  let dayCount = 0;
  weeks.forEach((w, i) => {
    if (!w.theme) err(`S${i + 1} sans thème`);
    if (!w.color || !w.light || !w.emoji) err(`S${i + 1} style incomplet`);
    if (w.days.length !== 5) err(`S${i + 1} a ${w.days.length} jours (attendu 5)`);
    w.days.forEach((d, j) => {
      dayCount++;
      if (!d.label) err(`${i}-${j} sans label`);
      if (!d.lecon) err(`${i}-${j} sans leçon`);
      if (!d.type) err(`${i}-${j} sans type`);
      if (!d.domaine) warn(`${i}-${j} sans domaine`);
      if (!d.detail) warn(`${i}-${j} sans detail`);
    });
  });
  if (dayCount !== 40) err(`${dayCount} jours (attendu 40)`);

  // Curriculum: every dayKey 0-0..7-4 present with exercises
  let exoCount = 0;
  const types = { qcm: 0, vrai_faux: 0, completer: 0 };
  const seenIds = new Set();
  for (let s = 0; s < 8; s++) {
    for (let j = 0; j < 5; j++) {
      const key = `${s}-${j}`;
      const cur = curriculum[key];
      if (!cur || !Array.isArray(cur.exercises) || cur.exercises.length === 0) {
        err(`${key} sans exercices`);
        continue;
      }
      cur.exercises.forEach((ex) => {
        exoCount++;
        if (!ex.id) err(`${key} exercice sans id`);
        if (seenIds.has(ex.id)) err(`id dupliqué : ${ex.id}`);
        seenIds.add(ex.id);
        if (!ex.question) err(`${ex.id} sans question`);
        if (!ex.explanation) warn(`${ex.id} sans explication`);
        if (!['qcm', 'vrai_faux', 'completer'].includes(ex.type)) { err(`${ex.id} type invalide : ${ex.type}`); return; }
        types[ex.type]++;
        if (ex.type === 'qcm') {
          if (!Array.isArray(ex.options) || ex.options.length < 2) { err(`${ex.id} QCM sans options`); return; }
          // answer must EXACTLY match one option (=== in player)
          if (!ex.options.includes(ex.answer)) err(`${ex.id} QCM : réponse « ${ex.answer} » absente des options`);
          // no duplicate options
          if (new Set(ex.options).size !== ex.options.length) warn(`${ex.id} QCM options dupliquées`);
        } else if (ex.type === 'vrai_faux') {
          if (ex.answer !== 'vrai' && ex.answer !== 'faux') err(`${ex.id} V/F réponse invalide : « ${ex.answer} »`);
        } else if (ex.type === 'completer') {
          if (ex.answer == null || String(ex.answer).trim() === '') err(`${ex.id} completer sans réponse`);
          if (normalize(ex.answer) === '') err(`${ex.id} completer réponse vide après normalisation`);
        }
      });
    }
  }
  grandExos += exoCount;

  // Seed builders
  const jours = buildSeedJours();
  const semaines = buildSeedSemaines();
  if (jours.length !== 40) err(`buildSeedJours = ${jours.length} (attendu 40)`);
  if (semaines.length !== 8) err(`buildSeedSemaines = ${semaines.length} (attendu 8)`);
  // seed jours carry their exercises
  const joursWithExos = jours.filter((j) => j.exercices && j.exercices.length > 0).length;
  if (joursWithExos !== 40) err(`seed: ${joursWithExos}/40 jours ont des exercices`);

  if (!meta || meta.totalDays !== 40 || meta.totalWeeks !== 8) err(`meta incorrecte`);

  console.log(`  ✅ ${dayCount} jours · ${exoCount} exercices (QCM:${types.qcm} V/F:${types.vrai_faux} Compl:${types.completer})`);
  console.log(`  ✅ seed: ${jours.length} jours, ${semaines.length} semaines · meta « ${meta.title} »`);
}

console.log(`\n────────────────────────────`);
console.log(`Total exercices Maths (4 niveaux) : ${grandExos}`);
console.log(errors === 0 ? `🏆 ${warnings === 0 ? 'PARFAIT' : warnings + ' avertissement(s)'} — 0 erreur` : `❌ ${errors} erreur(s), ${warnings} avertissement(s)`);
process.exit(errors === 0 ? 0 : 1);
