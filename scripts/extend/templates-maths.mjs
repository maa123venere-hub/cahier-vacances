// Générateurs paramétriques d'exercices de maths.
// Toutes les réponses sont CALCULÉES (aucun corrigé erroné possible).
// RNG déterministe (LCG) : la régénération produit exactement les mêmes exercices.

export function makeRng(seedStr) {
  let seed = 0;
  for (const c of seedStr) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Options QCM : bonne réponse + distracteurs uniques, mélangés
function qcmOpts(rng, answer, distractors) {
  const uniq = [...new Set([String(answer), ...distractors.map(String)])];
  const wrongs = uniq.slice(1).filter((d) => d !== String(answer)).slice(0, 3);
  while (wrongs.length < 3) wrongs.push(String(Number(answer) + wrongs.length + 7));
  return shuffle(rng, [String(answer), ...wrongs]);
}
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100).replace('.', ','));
const signed = (n) => (n < 0 ? `(${n})` : `(+${n})`);
function pgcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

// ── Templates. Chacun : (rng, lvl) -> exercice ────────────────────
// lvl : 6, 5, 4, 3 (ajuste la difficulté des plages de nombres)
export const T = {

  numerationChiffre(rng) {
    const n = int(rng, 1000, 99999);
    const ranks = [['unités', 0], ['dizaines', 1], ['centaines', 2], ['milliers', 3]];
    const [name, p] = pick(rng, ranks);
    const answer = String(Math.floor(n / 10 ** p) % 10);
    return { type: 'qcm', question: `Quel est le chiffre des ${name} dans ${n.toLocaleString('fr-FR')} ?`,
      options: qcmOpts(rng, answer, [String(Math.floor(n / 10 ** ((p + 1) % 4)) % 10), String(Math.floor(n / 10 ** ((p + 2) % 4)) % 10), String((Number(answer) + 1) % 10)]),
      answer, explanation: `En partant de la droite : unités, dizaines, centaines, milliers. Le chiffre des ${name} de ${n.toLocaleString('fr-FR')} est ${answer}.`,
      hint: 'Compte les rangs en partant de la droite.' };
  },

  comparerEntiers(rng) {
    const a = int(rng, 100, 99999);
    let b = a + pick(rng, [-1, 1]) * int(rng, 1, 90);
    const answer = a > b ? '>' : '<';
    return { type: 'qcm', question: `Quel signe complète : ${a.toLocaleString('fr-FR')} ___ ${b.toLocaleString('fr-FR')} ?`,
      options: qcmOpts(rng, answer, [answer === '>' ? '<' : '>', '=']),
      answer, explanation: `${a.toLocaleString('fr-FR')} ${answer} ${b.toLocaleString('fr-FR')} : compare le nombre de chiffres, puis chiffre par chiffre de gauche à droite.`,
      hint: 'Compare de gauche à droite.' };
  },

  addDecimaux(rng) {
    const a = int(rng, 10, 89) + int(rng, 1, 9) / 10;
    const b = int(rng, 1, 20) + int(rng, 1, 99) / 100;
    const s = Math.round((a + b) * 100) / 100;
    return { type: 'completer', question: `Calcule : ${fmt(a)} + ${fmt(b)} = ___`,
      answer: fmt(s), explanation: `On aligne les virgules : ${fmt(a)} + ${fmt(b)} = ${fmt(s)}.`,
      hint: 'Aligne les virgules, complète avec des zéros si besoin.' };
  },

  subDecimaux(rng) {
    const b = int(rng, 1, 30) + int(rng, 1, 9) / 10;
    const s = int(rng, 5, 40) + int(rng, 1, 9) / 10;
    const a = Math.round((b + s) * 100) / 100;
    return { type: 'completer', question: `Calcule : ${fmt(a)} - ${fmt(b)} = ___`,
      answer: fmt(s), explanation: `${fmt(a)} - ${fmt(b)} = ${fmt(s)}. Vérification : ${fmt(s)} + ${fmt(b)} = ${fmt(a)}.`,
      hint: 'Vérifie en additionnant ta réponse au deuxième nombre.' };
  },

  multiplication(rng, lvl) {
    const a = lvl >= 5 ? int(rng, 12, 99) : int(rng, 3, 12);
    const b = lvl >= 5 ? int(rng, 3, 12) : int(rng, 3, 9);
    const p = a * b;
    return { type: 'qcm', question: `Calcule : ${a} × ${b} = ?`,
      options: qcmOpts(rng, p, [p + b, p - a, p + 10]),
      answer: String(p), explanation: `${a} × ${b} = ${p}.`,
      hint: `Décompose : ${a} × ${b} = (${a} × ${b - 1}) + ${a}.` };
  },

  multiPuissance10(rng) {
    const a = int(rng, 1, 99) + int(rng, 1, 9) / 10;
    const p = pick(rng, [10, 100, 1000]);
    const r = Math.round(a * p * 100) / 100;
    return { type: 'completer', question: `Calcule : ${fmt(a)} × ${p} = ___`,
      answer: fmt(r), explanation: `×${p} : la virgule se déplace de ${String(p).length - 1} rang(s) vers la droite. ${fmt(a)} × ${p} = ${fmt(r)}.`,
      hint: `Décale la virgule de ${String(p).length - 1} rang(s) vers la droite.` };
  },

  divisionEuclidienne(rng) {
    const d = int(rng, 3, 9);
    const q = int(rng, 4, 12);
    const r = int(rng, 1, d - 1);
    const n = d * q + r;
    return { type: 'qcm', question: `Dans la division euclidienne de ${n} par ${d}, quel est le reste ?`,
      options: qcmOpts(rng, r, [q, d, (r + 1) % d || 1]),
      answer: String(r), explanation: `${n} = ${d} × ${q} + ${r}, avec ${r} < ${d}. Le reste est ${r}.`,
      hint: `Cherche le plus grand multiple de ${d} inférieur à ${n}.` };
  },

  multiples(rng) {
    const t = int(rng, 3, 9);
    const m = t * int(rng, 3, 12);
    const not1 = m + int(rng, 1, t - 1);
    const not2 = m - int(rng, 1, t - 1);
    return { type: 'qcm', question: `Lequel de ces nombres est un multiple de ${t} ?`,
      options: qcmOpts(rng, m, [not1, not2, m + t + 1]),
      answer: String(m), explanation: `${m} = ${t} × ${m / t}, donc ${m} est un multiple de ${t}.`,
      hint: `Un multiple de ${t} est dans la table de ${t}.` };
  },

  divisibilite(rng) {
    const rules = [[3, 'la somme de ses chiffres est divisible par 3'], [9, 'la somme de ses chiffres est divisible par 9'], [5, 'il se termine par 0 ou 5'], [2, 'il est pair']];
    const [d, why] = pick(rng, rules);
    let n = int(rng, 100, 999);
    n = n - (n % d); if (n < 100) n += d;
    const digits = String(n).split('').reduce((s, c) => s + Number(c), 0);
    return { type: 'vrai_faux', question: `${n} est divisible par ${d}.`,
      answer: 'vrai', explanation: `Oui : ${d === 3 || d === 9 ? `la somme des chiffres vaut ${digits}` : why}. ${n} ÷ ${d} = ${n / d}.`,
      hint: `Critère : ${why}.` };
  },

  fractionSimplifier(rng) {
    const k = int(rng, 2, 6);
    const a = int(rng, 1, 5);
    let b = a + int(rng, 1, 5);
    const g = pgcd(a, b); const na = a / g, nb = b / g;
    return { type: 'completer', question: `Simplifie la fraction ${a * k}/${b * k} au maximum : ___ (ex : 2/3)`,
      answer: `${na}/${nb}`, explanation: `On divise le numérateur et le dénominateur par ${k * g} : ${a * k}/${b * k} = ${na}/${nb}.`,
      hint: `Divise le haut et le bas par ${k}.` };
  },

  fractionAddMemeDenom(rng) {
    const d = pick(rng, [5, 7, 9, 11, 13]);
    const a = int(rng, 1, d - 3);
    const b = int(rng, 1, d - a - 1);
    return { type: 'qcm', question: `Calcule : ${a}/${d} + ${b}/${d} = ?`,
      options: qcmOpts(rng, `${a + b}/${d}`, [`${a + b}/${2 * d}`, `${a * b}/${d}`, `${a + b + 1}/${d}`]),
      answer: `${a + b}/${d}`, explanation: `Même dénominateur : on additionne les numérateurs. ${a} + ${b} = ${a + b}, donc ${a + b}/${d}.`,
      hint: 'Le dénominateur ne change pas.' };
  },

  fractionDeQuantite(rng) {
    const d = pick(rng, [3, 4, 5, 8]);
    const n = int(rng, 1, d - 1);
    const q = d * int(rng, 3, 12);
    const r = (q / d) * n;
    return { type: 'completer', question: `Calcule les ${n}/${d} de ${q} : ___`,
      answer: String(r), explanation: `${q} ÷ ${d} = ${q / d}, puis ${q / d} × ${n} = ${r}.`,
      hint: `Divise ${q} par ${d}, puis multiplie par ${n}.` };
  },

  fractionMult(rng) {
    const a = int(rng, 1, 4), b = int(rng, 2, 5), c = int(rng, 1, 4), d = int(rng, 2, 5);
    const num = a * c, den = b * d, g = pgcd(num, den);
    return { type: 'qcm', question: `Calcule : ${a}/${b} × ${c}/${d} = ? (fraction simplifiée)`,
      options: qcmOpts(rng, `${num / g}/${den / g}`, [`${a + c}/${b + d}`, `${num}/${den === num ? den + 1 : den}`, `${a * d}/${b * c}`]),
      answer: `${num / g}/${den / g}`, explanation: `On multiplie les numérateurs (${a}×${c}=${num}) et les dénominateurs (${b}×${d}=${den}) : ${num}/${den}${g > 1 ? ` = ${num / g}/${den / g}` : ''}.`,
      hint: 'Numérateurs ensemble, dénominateurs ensemble, puis simplifie.' };
  },

  relatifsComparer(rng) {
    const a = -int(rng, 2, 15);
    const b = -int(rng, 2, 15);
    if (a === b) return T.relatifsComparer(rng);
    const answer = a < b ? '<' : '>';
    return { type: 'qcm', question: `Quel signe complète : ${a} ___ ${b} ?`,
      options: qcmOpts(rng, answer, [answer === '<' ? '>' : '<', '=']),
      answer, explanation: `Sur la droite graduée, ${Math.min(a, b)} est à gauche de ${Math.max(a, b)}, donc ${a} ${answer} ${b}.`,
      hint: 'Pour deux négatifs, le plus « grand en chiffres » est le plus petit.' };
  },

  relatifsAdd(rng) {
    const a = int(rng, 2, 12) * pick(rng, [1, -1]);
    const b = int(rng, 2, 12) * pick(rng, [1, -1]);
    const s = a + b;
    return { type: 'completer', question: `Calcule : ${signed(a)} + ${signed(b)} = ___`,
      answer: String(s), explanation: `${signed(a)} + ${signed(b)} = ${s}. ${Math.sign(a) === Math.sign(b) ? 'Mêmes signes : on additionne et on garde le signe.' : 'Signes contraires : on soustrait et on prend le signe du plus fort.'}`,
      hint: a * b > 0 ? 'Mêmes signes → additionne, garde le signe.' : 'Signes différents → soustrais, signe du plus fort.' };
  },

  relatifsMult(rng) {
    const a = int(rng, 2, 9) * pick(rng, [1, -1]);
    const b = int(rng, 2, 9) * pick(rng, [1, -1]);
    const p = a * b;
    return { type: 'qcm', question: `Calcule : ${signed(a)} × ${signed(b)} = ?`,
      options: qcmOpts(rng, p, [-p, Math.abs(a) + Math.abs(b), p + (p > 0 ? 2 : -2)]),
      answer: String(p), explanation: `${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(p)}, et ${a * b > 0 ? 'deux signes identiques donnent +' : 'deux signes différents donnent −'} : ${p}.`,
      hint: 'Signes identiques → +. Signes différents → −.' };
  },

  relatifsSub(rng) {
    const a = int(rng, 2, 12) * pick(rng, [1, -1]);
    const b = int(rng, 2, 12) * pick(rng, [1, -1]);
    const s = a - b;
    return { type: 'completer', question: `Calcule : ${signed(a)} - ${signed(b)} = ___`,
      answer: String(s), explanation: `Soustraire, c'est ajouter l'opposé : ${signed(a)} + ${signed(-b)} = ${s}.`,
      hint: `Transforme en addition : ${signed(a)} + ${signed(-b)}.` };
  },

  prioritesCalcul(rng, lvl) {
    const a = int(rng, 2, 9), b = int(rng, 2, 9), c = int(rng, 2, 6);
    const r = a + b * c;
    return { type: 'qcm', question: `Calcule : ${a} + ${b} × ${c} = ?`,
      options: qcmOpts(rng, r, [(a + b) * c, a * b + c, r + b]),
      answer: String(r), explanation: `La multiplication d'abord : ${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${r}.`,
      hint: '× avant +.' };
  },

  puissanceCalc(rng, lvl) {
    const a = pick(rng, [2, 3, 4, 5, 10]);
    const n = a === 10 ? int(rng, 2, 6) : (a <= 3 ? int(rng, 2, 4) : 2);
    const p = a ** n;
    return { type: 'completer', question: `Calcule : ${a}^${n} = ___`,
      answer: String(p), explanation: `${a}^${n} = ${Array(n).fill(a).join(' × ')} = ${p}.`,
      hint: `${a} multiplié ${n} fois par lui-même.` };
  },

  puissanceProduit(rng) {
    const a = int(rng, 2, 5), b = int(rng, 2, 5);
    return { type: 'qcm', question: `Écris 10^${a} × 10^${b} sous la forme d'une seule puissance de 10 :`,
      options: qcmOpts(rng, `10^${a + b}`, [`10^${a * b}`, `100^${a + b}`, `10^${Math.abs(a - b) || a + b + 1}`]),
      answer: `10^${a + b}`, explanation: `Même base : on additionne les exposants. ${a} + ${b} = ${a + b}.`,
      hint: 'On additionne les exposants.' };
  },

  notationScientifique(rng) {
    const m = int(rng, 11, 89) / 10;
    const e = int(rng, 2, 5);
    const n = m * 10 ** e;
    const disp = n.toLocaleString('fr-FR');
    return { type: 'qcm', question: `Quelle est l'écriture scientifique de ${disp} ?`,
      options: qcmOpts(rng, `${fmt(m)} × 10^${e}`, [`${fmt(m * 10)} × 10^${e - 1}`, `${fmt(m)} × 10^${e + 1}`, `${fmt(m / 10)} × 10^${e}`]),
      answer: `${fmt(m)} × 10^${e}`, explanation: `Un seul chiffre non nul avant la virgule : ${disp} = ${fmt(m)} × 10^${e}.`,
      hint: 'Un seul chiffre (1 à 9) avant la virgule.' };
  },

  litteralReduire(rng) {
    const a = int(rng, 2, 9), b = int(rng, 1, 8);
    return { type: 'completer', question: `Réduis : ${a}x + ${b}x = ___ (ex : 7x)`,
      answer: `${a + b}x`, explanation: `On additionne les coefficients : ${a} + ${b} = ${a + b}, donc ${a + b}x.`,
      hint: 'Additionne les nombres devant x.' };
  },

  litteralDevelopper(rng) {
    const k = int(rng, 2, 7), a = int(rng, 1, 9);
    return { type: 'qcm', question: `Développe : ${k}(x + ${a}) = ?`,
      options: qcmOpts(rng, `${k}x + ${k * a}`, [`${k}x + ${a}`, `${k + a}x`, `${k}x + ${k + a}`]),
      answer: `${k}x + ${k * a}`, explanation: `${k} × x + ${k} × ${a} = ${k}x + ${k * a}.`,
      hint: `Multiplie ${k} par chaque terme de la parenthèse.` };
  },

  litteralFactoriser(rng) {
    const k = int(rng, 2, 6), a = int(rng, 2, 8);
    return { type: 'qcm', question: `Factorise : ${k}x + ${k * a} = ?`,
      options: qcmOpts(rng, `${k}(x + ${a})`, [`${k}(x + ${k * a})`, `x(${k} + ${k * a})`, `${k * a}(x + ${k})`]),
      answer: `${k}(x + ${a})`, explanation: `Le facteur commun est ${k} : ${k}x + ${k * a} = ${k}(x + ${a}).`,
      hint: `${k * a} = ${k} × ${a}.` };
  },

  litteralSubstituer(rng) {
    const a = int(rng, 2, 6), b = int(rng, 1, 9), x = int(rng, 2, 6);
    const r = a * x + b;
    return { type: 'completer', question: `Pour x = ${x}, calcule ${a}x + ${b} = ___`,
      answer: String(r), explanation: `${a} × ${x} = ${a * x}, puis ${a * x} + ${b} = ${r}.`,
      hint: `Remplace x par ${x}.` };
  },

  identiteRemarquable(rng) {
    const a = int(rng, 1, 6);
    const which = pick(rng, ['plus', 'moins', 'conj']);
    if (which === 'conj') {
      return { type: 'qcm', question: `Développe : (x - ${a})(x + ${a}) = ?`,
        options: qcmOpts(rng, `x² - ${a * a}`, [`x² + ${a * a}`, `x² - ${2 * a}x - ${a * a}`, `x² - ${2 * a}`]),
        answer: `x² - ${a * a}`, explanation: `(a-b)(a+b) = a² - b² : x² - ${a}² = x² - ${a * a}.`,
        hint: 'Différence de deux carrés.' };
    }
    const s = which === 'plus' ? '+' : '-';
    return { type: 'qcm', question: `Développe : (x ${s} ${a})² = ?`,
      options: qcmOpts(rng, `x² ${s} ${2 * a}x + ${a * a}`, [`x² + ${a * a}`, `x² ${s} ${a}x + ${a * a}`, `x² ${s} ${2 * a}x - ${a * a}`]),
      answer: `x² ${s} ${2 * a}x + ${a * a}`, explanation: `(a ${s} b)² = a² ${s} 2ab + b² : x² ${s} ${2 * a}x + ${a * a}. N'oublie pas le double produit !`,
      hint: `Double produit : 2 × x × ${a} = ${2 * a}x.` };
  },

  equationSimple(rng, lvl) {
    const x = int(rng, 2, 12);
    if (lvl >= 5 && rng() < 0.5) {
      const a = int(rng, 2, 6), b = int(rng, 1, 9);
      return { type: 'completer', question: `Résous : ${a}x + ${b} = ${a * x + b}. x = ___`,
        answer: String(x), explanation: `${a}x = ${a * x + b} - ${b} = ${a * x}, puis x = ${a * x} ÷ ${a} = ${x}.`,
        hint: `Enlève ${b}, puis divise par ${a}.` };
    }
    const b = int(rng, 2, 20);
    return { type: 'completer', question: `Résous : x + ${b} = ${x + b}. x = ___`,
      answer: String(x), explanation: `x = ${x + b} - ${b} = ${x}.`,
      hint: `Soustrais ${b} des deux côtés.` };
  },

  equationProduit(rng) {
    const a = int(rng, 1, 8), b = int(rng, 1, 8);
    return { type: 'qcm', question: `Quelles sont les solutions de (x - ${a})(x + ${b}) = 0 ?`,
      options: qcmOpts(rng, `${a} et -${b}`, [`-${a} et ${b}`, `${a} et ${b}`, `-${a} et -${b}`]),
      answer: `${a} et -${b}`, explanation: `Un produit est nul si un facteur est nul : x - ${a} = 0 → x = ${a} ; x + ${b} = 0 → x = -${b}.`,
      hint: 'Chaque facteur égalé à zéro donne une solution.' };
  },

  proportionnalite(rng, lvl) {
    const u = int(rng, 2, 9);
    const q1 = int(rng, 2, 6);
    const q2 = q1 + int(rng, 1, 6);
    return { type: 'completer', question: `${q1} objets identiques coûtent ${q1 * u} €. Combien coûtent ${q2} objets ? ___ € (en chiffres)`,
      answer: String(q2 * u), explanation: `1 objet coûte ${q1 * u} ÷ ${q1} = ${u} €, donc ${q2} objets coûtent ${q2} × ${u} = ${q2 * u} €.`,
      hint: 'Cherche d\'abord le prix d\'un seul objet.' };
  },

  pourcentage(rng, lvl) {
    const t = pick(rng, [10, 20, 25, 50]);
    const n = pick(rng, [40, 60, 80, 120, 200, 240]) * (lvl <= 5 ? 1 : pick(rng, [1, 2]));
    const r = (n * t) / 100;
    return { type: 'completer', question: `Calcule ${t} % de ${n} : ___`,
      answer: String(r), explanation: `${n} × ${t} ÷ 100 = ${r}.`,
      hint: t === 50 ? 'La moitié.' : t === 25 ? 'Le quart.' : t === 10 ? 'Divise par 10.' : '×20 puis ÷100.' };
  },

  vitesse(rng) {
    const v = pick(rng, [40, 50, 60, 80, 90, 100]);
    const t = int(rng, 2, 4);
    return { type: 'completer', question: `Une voiture roule à ${v} km/h pendant ${t} h. Quelle distance parcourt-elle ? ___ km`,
      answer: String(v * t), explanation: `Distance = vitesse × durée = ${v} × ${t} = ${v * t} km.`,
      hint: 'd = v × t.' };
  },

  moyenne(rng) {
    const n = pick(rng, [3, 4]);
    const m = int(rng, 5, 15);
    const vals = [];
    let sum = 0;
    for (let i = 0; i < n - 1; i++) { const v = m + int(rng, -3, 3); vals.push(v); sum += v; }
    vals.push(m * n - sum);
    return { type: 'completer', question: `Calcule la moyenne de la série : ${vals.join(' ; ')}. Moyenne = ___`,
      answer: String(m), explanation: `(${vals.join(' + ')}) ÷ ${n} = ${m * n} ÷ ${n} = ${m}.`,
      hint: `Somme ÷ ${n}.` };
  },

  medianeEtendue(rng) {
    const vals = shuffle(rng, [int(rng, 2, 6), int(rng, 7, 10), int(rng, 11, 14), int(rng, 15, 18), int(rng, 19, 25)]);
    const sorted = [...vals].sort((a, b) => a - b);
    if (rng() < 0.5) {
      return { type: 'completer', question: `Quelle est la médiane de la série : ${vals.join(' ; ')} ? ___`,
        answer: String(sorted[2]), explanation: `Série ordonnée : ${sorted.join(' ; ')}. La valeur du milieu (3e sur 5) est ${sorted[2]}.`,
        hint: 'Ordonne la série d\'abord !' };
    }
    return { type: 'completer', question: `Quelle est l'étendue de la série : ${vals.join(' ; ')} ? ___`,
      answer: String(sorted[4] - sorted[0]), explanation: `Étendue = max - min = ${sorted[4]} - ${sorted[0]} = ${sorted[4] - sorted[0]}.`,
      hint: 'Plus grande valeur moins plus petite valeur.' };
  },

  probaDe(rng) {
    const evts = [
      ['obtenir un 6', 1], ['obtenir un nombre pair', 3], ['obtenir un nombre impair', 3],
      ['obtenir un nombre supérieur ou égal à 5', 2], ['obtenir un multiple de 3', 2], ['obtenir moins de 3', 2],
    ];
    const [evt, fav] = pick(rng, evts);
    const g = pgcd(fav, 6);
    const answer = `${fav / g}/${6 / g}`;
    return { type: 'qcm', question: `On lance un dé équilibré à 6 faces. Quelle est la probabilité d'${evt.startsWith('o') ? evt : "'" + evt} ?`,
      options: qcmOpts(rng, answer, ['1/6', '1/2', '1/3', '2/3', '5/6'].filter((o) => o !== answer).slice(0, 3)),
      answer, explanation: `${fav} cas favorable(s) sur 6 possibles : ${fav}/6${g > 1 ? ` = ${answer}` : ''}.`,
      hint: 'Cas favorables ÷ cas possibles.' };
  },

  probaUrne(rng) {
    const r = int(rng, 2, 5), b = int(rng, 2, 5);
    const tot = r + b;
    const g = pgcd(r, tot);
    const answer = `${r / g}/${tot / g}`;
    return { type: 'completer', question: `Une urne contient ${r} boules rouges et ${b} boules bleues. P(tirer une rouge) = ___ (fraction)`,
      answer, explanation: `${r} cas favorables sur ${tot} boules : ${r}/${tot}${g > 1 ? ` = ${answer}` : ''}.`,
      hint: `${r} rouges sur ${tot} boules en tout.` };
  },

  anglesTriangle(rng) {
    const a = int(rng, 30, 80), b = int(rng, 30, 80);
    const c = 180 - a - b;
    return { type: 'completer', question: `Un triangle a deux angles de ${a}° et ${b}°. Combien mesure le troisième angle ? ___° `,
      answer: String(c), explanation: `La somme des angles vaut 180° : 180 - (${a} + ${b}) = ${c}°.`,
      hint: '180° moins la somme des deux autres.' };
  },

  complementaire(rng) {
    const type = pick(rng, [[90, 'complémentaire'], [180, 'supplémentaire']]);
    const a = int(rng, 15, type[0] - 15);
    return { type: 'completer', question: `Quel est l'angle ${type[1]} de ${a}° ? ___°`,
      answer: String(type[0] - a), explanation: `${type[1] === 'complémentaire' ? 'Complémentaires : somme = 90°' : 'Supplémentaires : somme = 180°'} : ${type[0]} - ${a} = ${type[0] - a}°.`,
      hint: `Somme = ${type[0]}°.` };
  },

  perimetreAire(rng, lvl) {
    const shape = pick(rng, ['carreP', 'rectP', 'carreA', 'rectA', 'triA']);
    if (shape === 'carreP') {
      const c = int(rng, 3, 15);
      return { type: 'completer', question: `Quel est le périmètre d'un carré de côté ${c} cm ? ___ cm`,
        answer: String(4 * c), explanation: `Périmètre = 4 × côté = 4 × ${c} = ${4 * c} cm.`, hint: '4 × côté.' };
    }
    if (shape === 'rectP') {
      const L = int(rng, 6, 15), l = int(rng, 2, 5);
      return { type: 'completer', question: `Quel est le périmètre d'un rectangle de longueur ${L} cm et largeur ${l} cm ? ___ cm`,
        answer: String(2 * (L + l)), explanation: `2 × (${L} + ${l}) = 2 × ${L + l} = ${2 * (L + l)} cm.`, hint: '2 × (L + l).' };
    }
    if (shape === 'carreA') {
      const c = int(rng, 3, 12);
      return { type: 'completer', question: `Quelle est l'aire d'un carré de côté ${c} cm ? ___ cm²`,
        answer: String(c * c), explanation: `Aire = côté × côté = ${c} × ${c} = ${c * c} cm².`, hint: 'côté × côté.' };
    }
    if (shape === 'rectA') {
      const L = int(rng, 5, 12), l = int(rng, 2, 6);
      return { type: 'completer', question: `Quelle est l'aire d'un rectangle de ${L} cm sur ${l} cm ? ___ cm²`,
        answer: String(L * l), explanation: `Aire = L × l = ${L} × ${l} = ${L * l} cm².`, hint: 'Longueur × largeur.' };
    }
    const b = pick(rng, [4, 6, 8, 10, 12]), h = pick(rng, [3, 5, 7]);
    return { type: 'completer', question: `Quelle est l'aire d'un triangle de base ${b} cm et de hauteur ${h} cm ? ___ cm²`,
      answer: String((b * h) / 2), explanation: `(base × hauteur) ÷ 2 = (${b} × ${h}) ÷ 2 = ${(b * h) / 2} cm².`, hint: 'N\'oublie pas de diviser par 2.' };
  },

  volume(rng) {
    const L = int(rng, 2, 6), l = int(rng, 2, 5), h = int(rng, 2, 5);
    return { type: 'completer', question: `Quel est le volume d'un pavé droit de dimensions ${L} × ${l} × ${h} (en cm) ? ___ cm³`,
      answer: String(L * l * h), explanation: `V = L × l × h = ${L} × ${l} × ${h} = ${L * l * h} cm³.`,
      hint: 'Multiplie les trois dimensions.' };
  },

  pythagore(rng) {
    const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]];
    const [a, b, c] = pick(rng, triples);
    if (rng() < 0.6) {
      return { type: 'completer', question: `Un triangle rectangle a des côtés de l'angle droit de ${a} et ${b}. Combien mesure l'hypoténuse ? ___`,
        answer: String(c), explanation: `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, et √${c * c} = ${c}.`,
        hint: 'Additionne les carrés, puis prends la racine.' };
    }
    return { type: 'completer', question: `Dans un triangle rectangle, l'hypoténuse mesure ${c} et un côté mesure ${a}. Combien mesure l'autre côté ? ___`,
      answer: String(b), explanation: `${c}² - ${a}² = ${c * c} - ${a * a} = ${b * b}, et √${b * b} = ${b}.`,
      hint: 'Cette fois on soustrait les carrés.' };
  },

  thales(rng) {
    const k = pick(rng, [2, 3]);
    const ab = int(rng, 2, 5);
    const am = ab * k;
    const bc = int(rng, 2, 6);
    return { type: 'completer', question: `Configuration de Thalès : AM = ${am}, AB = ${ab}, et BC = ${bc}. Les droites sont parallèles. MN = AM/AB × BC = ___`,
      answer: String(k * bc), explanation: `Le rapport vaut ${am}/${ab} = ${k}, donc MN = ${k} × ${bc} = ${k * bc}.`,
      hint: `AM/AB = ${k}.` };
  },

  trigo(rng) {
    const data = [['cos', 'adjacent', 4, 8], ['cos', 'adjacent', 3, 6], ['sin', 'opposé', 5, 10], ['sin', 'opposé', 3, 6], ['tan', 'opposé', 6, 8]];
    const [f, side, num, den] = pick(rng, data);
    const r = num / den;
    return { type: 'completer', question: `Dans un triangle rectangle, le côté ${side} mesure ${num} et ${f === 'tan' ? 'le côté adjacent' : "l'hypoténuse"} mesure ${den}. Calcule ${f}(angle) = ___ (nombre décimal)`,
      answer: fmt(r), explanation: `${f} = ${side} ÷ ${f === 'tan' ? 'adjacent' : 'hypoténuse'} = ${num} ÷ ${den} = ${fmt(r)}.`,
      hint: 'SOH-CAH-TOA.' };
  },

  fonctionImage(rng, lvl) {
    const a = int(rng, 2, 6), b = lvl >= 4 ? int(rng, 1, 9) : 0, x = int(rng, 2, 8);
    const fx = b === 0 ? `${a}x` : `${a}x + ${b}`;
    return { type: 'completer', question: `Soit f(x) = ${fx}. Calcule f(${x}) = ___`,
      answer: String(a * x + b), explanation: `f(${x}) = ${a} × ${x}${b ? ` + ${b}` : ''} = ${a * x + b}.`,
      hint: `Remplace x par ${x}.` };
  },

  pgcdCalc(rng) {
    const g = pick(rng, [4, 5, 6, 8, 12]);
    const a = g * pick(rng, [2, 3]), b = g * pick(rng, [3, 4, 5].filter((k) => k !== a / g));
    const real = pgcd(a, b);
    return { type: 'completer', question: `Quel est le PGCD de ${a} et ${b} ? ___`,
      answer: String(real), explanation: `Diviseurs communs de ${a} et ${b} : le plus grand est ${real}.`,
      hint: `Liste les diviseurs de ${Math.min(a, b)}.` };
  },

  conversion(rng) {
    const convs = [
      ['m', 'cm', 100], ['km', 'm', 1000], ['L', 'cL', 100], ['kg', 'g', 1000], ['h', 'min', 60], ['m²', 'cm²', 10000],
    ];
    const [from, to, k] = pick(rng, convs);
    const v = int(rng, 2, 15);
    return { type: 'completer', question: `Convertis : ${v} ${from} = ___ ${to}`,
      answer: String(v * k), explanation: `1 ${from} = ${k.toLocaleString('fr-FR')} ${to}, donc ${v} ${from} = ${(v * k).toLocaleString('fr-FR')} ${to}.`,
      hint: `1 ${from} = ${k.toLocaleString('fr-FR')} ${to}.` };
  },

  ordreGrandeur(rng) {
    const a = int(rng, 18, 42) * 10 + int(rng, 1, 9);
    const b = int(rng, 3, 9);
    const approx = Math.round(a / 100) * 100 * b;
    return { type: 'qcm', question: `Quel est l'ordre de grandeur de ${a} × ${b} ?`,
      options: qcmOpts(rng, approx, [approx / 10, approx * 10, approx + 300]),
      answer: String(approx), explanation: `${a} ≈ ${Math.round(a / 100) * 100}, donc ${a} × ${b} ≈ ${Math.round(a / 100) * 100} × ${b} = ${approx}.`,
      hint: `Arrondis ${a} à la centaine.` };
  },
};

// ── Routeur : mots-clés du titre de leçon -> templates adaptés ────
const ROUTES = [
  [/pythagore|thal|trigonom|cosinus/i, ['pythagore', 'thales', 'trigo']],
  [/fonction/i, ['fonctionImage', 'litteralSubstituer']],
  [/identit|littéral|litteral|développ|factoris|distributiv/i, ['litteralReduire', 'litteralDevelopper', 'litteralFactoriser', 'litteralSubstituer', 'identiteRemarquable']],
  [/équation|equation|inéquation|inequation/i, ['equationSimple', 'equationProduit', 'litteralSubstituer']],
  [/puissance|scientifique/i, ['puissanceCalc', 'puissanceProduit', 'notationScientifique']],
  [/pgcd|arithmé|arithme|premier|irréductible/i, ['pgcdCalc', 'divisibilite', 'multiples', 'fractionSimplifier']],
  [/fraction/i, ['fractionSimplifier', 'fractionAddMemeDenom', 'fractionDeQuantite', 'fractionMult']],
  [/relatif/i, ['relatifsComparer', 'relatifsAdd', 'relatifsSub', 'relatifsMult']],
  [/priorité|priorite|enchaîné|enchaine/i, ['prioritesCalcul', 'relatifsAdd', 'relatifsMult']],
  [/pourcentage|proportionnalité|proportionnalite|échelle|echelle/i, ['proportionnalite', 'pourcentage', 'vitesse']],
  [/vitesse|débit|debit|grandeur/i, ['vitesse', 'proportionnalite', 'conversion']],
  [/statisti|moyenne|médiane|mediane|données|donnees/i, ['moyenne', 'medianeEtendue']],
  [/probabilit|hasard|arbre/i, ['probaDe', 'probaUrne']],
  [/angle/i, ['anglesTriangle', 'complementaire']],
  [/volume|espace|prisme|cylindre|pavé|pave/i, ['volume', 'conversion', 'perimetreAire']],
  [/aire|périmètre|perimetre|cercle|disque|figure|carré|carre|rectangle|triangle/i, ['perimetreAire', 'anglesTriangle']],
  [/division|euclidienne|partage/i, ['divisionEuclidienne', 'multiples', 'divisibilite']],
  [/multipli|table/i, ['multiplication', 'multiPuissance10', 'ordreGrandeur']],
  [/divisib|multiple|diviseur/i, ['divisibilite', 'multiples', 'divisionEuclidienne']],
  [/décima|decima|addition|soustra/i, ['addDecimaux', 'subDecimaux', 'multiPuissance10']],
  [/numération|numeration|entier|nombre|comparer|grands nombres/i, ['numerationChiffre', 'comparerEntiers', 'ordreGrandeur']],
  [/symétri|symetri|droite|perpendic|parallèle|parallele|quadrilat|construction|carte|repér|reper/i, ['anglesTriangle', 'complementaire', 'perimetreAire']],
  [/mesure|conversion|unité|unite/i, ['conversion', 'perimetreAire', 'volume']],
];

// Templates génériques de révision (jours bilan / brevet blanc / contrôle)
const REVISION = {
  6: ['numerationChiffre', 'addDecimaux', 'multiplication', 'fractionDeQuantite', 'perimetreAire', 'moyenne', 'conversion', 'divisionEuclidienne'],
  5: ['relatifsAdd', 'fractionAddMemeDenom', 'prioritesCalcul', 'pourcentage', 'anglesTriangle', 'moyenne', 'litteralSubstituer', 'volume'],
  4: ['relatifsMult', 'puissanceCalc', 'fractionMult', 'litteralDevelopper', 'equationSimple', 'pythagore', 'pourcentage', 'probaDe'],
  3: ['identiteRemarquable', 'equationProduit', 'pgcdCalc', 'fonctionImage', 'pythagore', 'trigo', 'medianeEtendue', 'probaUrne', 'notationScientifique'],
};

export function templatesForLesson(lecon, lvl) {
  for (const [re, keys] of ROUTES) {
    if (re.test(lecon)) return keys;
  }
  return REVISION[lvl] || REVISION[4];
}

export function generateMathsExercises(dayId, lecon, lvl, count, idPrefix) {
  const rng = makeRng(`${idPrefix}-${dayId}-${lecon}`);
  const keys = templatesForLesson(lecon, lvl);
  const out = [];
  const seenQuestions = new Set();
  let guard = 0;
  while (out.length < count && guard < count * 30) {
    guard++;
    const key = keys[(out.length + guard) % keys.length];
    const ex = T[key](rng, lvl);
    if (seenQuestions.has(ex.question)) continue;
    seenQuestions.add(ex.question);
    out.push({ id: `${idPrefix}-${dayId}-x${out.length + 1}`, ...ex });
  }
  return out;
}
