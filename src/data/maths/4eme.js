// Mathématiques — 4ème (3e année de collège)
// Programme complet : 8 semaines × 5 jours. Types : qcm | vrai_faux | completer.
import { assembleWeeks } from './shared.js';
import { buildMathsJours, buildMathsSemaines } from './seedBuilder.js';
import { DRILLS } from './drills4.js';

const weekDefs = [
  // ── S1 — Calculs sur les nombres relatifs ──────────────────────
  { num: 1, theme: 'Calculs sur les relatifs', emoji: '➖', days: [
    { domaine: 'relatifs', type: 'lecon', lecon: 'Multiplier des relatifs',
      detail: 'Règle des signes : (+)(+) = +, (−)(−) = +, (+)(−) = −. Deux signes identiques → produit positif.',
      tip: 'Deux signes identiques → +. Deux signes différents → −.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Diviser des relatifs',
      detail: 'Même règle des signes que pour la multiplication.',
      tip: 'La règle des signes est la même pour × et ÷.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Additions et soustractions enchaînées',
      detail: 'Enchaîner les calculs avec des relatifs, gérer les signes successifs.',
      tip: 'Transforme les soustractions en additions de l\'opposé.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Priorités avec les relatifs',
      detail: 'Appliquer les priorités (× et ÷ avant + et −) en gérant les signes.',
      tip: 'Fais les multiplications d\'abord, puis additionne en surveillant les signes.' },
    { domaine: 'relatifs', type: 'exo', lecon: 'Problèmes avec les relatifs',
      detail: 'Températures, altitudes, comptes bancaires : modéliser avec des relatifs.',
      tip: 'Une baisse ou une profondeur se note avec un signe −.' },
  ]},
  // ── S2 — Les puissances ────────────────────────────────────────
  { num: 2, theme: 'Puissances et écriture scientifique', emoji: '⚡', days: [
    { domaine: 'puissances', type: 'lecon', lecon: 'Les puissances d\'un nombre',
      detail: 'aⁿ = a × a × … × a (n fois). Exemple : 2⁵ = 2×2×2×2×2 = 32.',
      tip: 'L\'exposant indique le nombre de facteurs, PAS une multiplication par l\'exposant.' },
    { domaine: 'puissances', type: 'lecon', lecon: 'Les puissances de 10',
      detail: '10ⁿ = 1 suivi de n zéros. 10³ = 1000, 10⁶ = 1 000 000.',
      tip: 'L\'exposant = le nombre de zéros.' },
    { domaine: 'puissances', type: 'lecon', lecon: 'L\'écriture scientifique',
      detail: 'a × 10ⁿ avec un seul chiffre non nul avant la virgule. 3200 = 3,2 × 10³.',
      tip: 'Un seul chiffre (non nul) avant la virgule.' },
    { domaine: 'puissances', type: 'lecon', lecon: 'Produit de puissances',
      detail: 'Même base : on additionne les exposants. 10² × 10³ = 10⁵.',
      tip: 'Multiplier des puissances de même base → on ADDITIONNE les exposants.' },
    { domaine: 'puissances', type: 'exo', lecon: 'Calculs avec puissances',
      detail: 'Combiner puissances et opérations dans des calculs.',
      tip: 'Calcule chaque puissance avant d\'additionner.' },
  ]},
  // ── S3 — Opérations sur les fractions ──────────────────────────
  { num: 3, theme: 'Opérations sur les fractions', emoji: '🍕', days: [
    { domaine: 'fractions', type: 'lecon', lecon: 'Additionner des fractions',
      detail: 'Réduire au même dénominateur avant d\'additionner ou soustraire.',
      tip: '1/3 + 1/6 : mets tout sur 6 → 2/6 + 1/6 = 3/6 = 1/2.' },
    { domaine: 'fractions', type: 'repos', lecon: '🎆 14 juillet — Multiplier des fractions',
      detail: 'Journée allégée. On multiplie les numérateurs entre eux et les dénominateurs entre eux.',
      tip: 'Bonne fête ! Deux exercices aujourd\'hui 🎆' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Diviser des fractions',
      detail: 'Diviser par une fraction = multiplier par son inverse. L\'inverse de a/b est b/a.',
      tip: '÷ par 1/4 revient à × par 4.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Fractions et priorités',
      detail: 'Appliquer les priorités opératoires avec des fractions.',
      tip: 'Multiplication de fractions avant l\'addition.' },
    { domaine: 'fractions', type: 'exo', lecon: 'Problèmes de fractions',
      detail: 'Fraction d\'une fraction, parts successives d\'un tout.',
      tip: '« Les 2/3 des 3/4 » = 2/3 × 3/4.' },
  ]},
  // ── S4 — Calcul littéral ───────────────────────────────────────
  { num: 4, theme: 'Calcul littéral', emoji: '🔤', days: [
    { domaine: 'calcul', type: 'lecon', lecon: 'Réduire une expression',
      detail: 'Regrouper les termes « en x » ensemble et les nombres ensemble : 3x + 2x = 5x.',
      tip: 'On ne réduit que des termes « de même nature » (les x avec les x).' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Développer avec la distributivité',
      detail: 'k(a + b) = ka + kb. On multiplie le facteur par chaque terme.',
      tip: '3(x + 2) = 3×x + 3×2 = 3x + 6.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Développer et réduire',
      detail: 'Développer puis regrouper les termes semblables.',
      tip: 'Développe d\'abord, réduis ensuite.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Factoriser',
      detail: 'Mettre en évidence un facteur commun : ka + kb = k(a + b).',
      tip: 'Cherche le nombre (ou la lettre) présent dans tous les termes.' },
    { domaine: 'calcul', type: 'exo', lecon: 'Substituer une valeur',
      detail: 'Remplacer la lettre par un nombre et calculer.',
      tip: 'Remplace, puis applique les priorités.' },
  ]},
  // ── S5 — Les équations ─────────────────────────────────────────
  { num: 5, theme: 'Équations du premier degré', emoji: '⚖️', days: [
    { domaine: 'equations', type: 'lecon', lecon: 'Qu\'est-ce qu\'une équation ?',
      detail: 'Une égalité avec une inconnue. Résoudre = trouver la valeur qui rend l\'égalité vraie.',
      tip: 'On vérifie une solution en la remplaçant dans l\'équation.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Résoudre x + a = b',
      detail: 'On isole x en enlevant a des deux côtés.',
      tip: 'x + 7 = 12 → x = 12 − 7 = 5.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Résoudre ax = b',
      detail: 'On divise les deux côtés par a.',
      tip: '4x = 20 → x = 20 ÷ 4 = 5.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Résoudre ax + b = c',
      detail: 'On enlève b, puis on divise par a (deux étapes).',
      tip: '2x + 3 = 11 → 2x = 8 → x = 4.' },
    { domaine: 'equations', type: 'exo', lecon: 'Problèmes et équations',
      detail: 'Traduire un énoncé par une équation, puis la résoudre.',
      tip: 'Nomme le nombre cherché « x », traduis chaque phrase.' },
  ]},
  // ── S6 — Proportionnalité ──────────────────────────────────────
  { num: 6, theme: 'Proportionnalité appliquée', emoji: '📈', days: [
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'La quatrième proportionnelle',
      detail: 'Retrouver une valeur manquante par le produit en croix.',
      tip: 'Si 2/3 = x/9, alors x = (2 × 9) ÷ 3 = 6.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Pourcentages : hausses et baisses',
      detail: 'Augmenter ou diminuer une quantité d\'un pourcentage.',
      tip: 'Augmenter de 10 % : + un dixième de la valeur.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'La vitesse moyenne',
      detail: 'Vitesse = distance ÷ durée. Distance = vitesse × durée.',
      tip: '240 km en 3 h → 240 ÷ 3 = 80 km/h.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Grandeurs composées et débits',
      detail: 'Débit (L/min), consommation… : appliquer la proportionnalité.',
      tip: '3 L/min pendant 5 min → 3 × 5 = 15 L.' },
    { domaine: 'proportionnalite', type: 'exo', lecon: 'Proportionnalité et graphiques',
      detail: 'Reconnaître une proportionnalité à sa représentation : une droite passant par l\'origine.',
      tip: 'Droite qui passe par (0 ; 0) → proportionnalité.' },
  ]},
  // ── S7 — Pythagore et trigonométrie ────────────────────────────
  { num: 7, theme: 'Pythagore et cosinus', emoji: '📐', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le théorème de Pythagore',
      detail: 'Dans un triangle rectangle : (hypoténuse)² = (côté)² + (autre côté)². L\'hypoténuse est le côté opposé à l\'angle droit.',
      tip: 'L\'hypoténuse est le plus long côté, face à l\'angle droit.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Calculer l\'hypoténuse',
      detail: 'On additionne les carrés des deux côtés, puis on prend la racine carrée.',
      tip: 'Côtés 3 et 4 → 9 + 16 = 25 → hypoténuse = 5.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Calculer un côté de l\'angle droit',
      detail: '(côté)² = (hypoténuse)² − (autre côté)².',
      tip: 'On soustrait cette fois : hyp² − côté connu².' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'La réciproque de Pythagore',
      detail: 'Si (grand côté)² = somme des carrés des deux autres, alors le triangle est rectangle.',
      tip: 'Compare le carré du plus grand côté à la somme des deux autres carrés.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Le cosinus d\'un angle',
      detail: 'Dans un triangle rectangle : cos(angle) = côté adjacent ÷ hypoténuse.',
      tip: 'CAH : Cosinus = Adjacent ÷ Hypoténuse.' },
  ]},
  // ── S8 — Statistiques, probabilités, bilan ─────────────────────
  { num: 8, theme: 'Statistiques, probabilités, bilan', emoji: '🏆', days: [
    { domaine: 'donnees', type: 'lecon', lecon: 'La moyenne',
      detail: 'Moyenne = somme des valeurs ÷ nombre de valeurs.',
      tip: 'Additionne tout, divise par le nombre de valeurs.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Médiane et étendue',
      detail: 'Médiane : valeur du milieu (série ordonnée). Étendue : max − min.',
      tip: 'Étendue = plus grande − plus petite valeur.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Notion de probabilité',
      detail: 'Une probabilité est comprise entre 0 (impossible) et 1 (certain).',
      tip: 'Impossible → 0. Certain → 1.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Probabilités simples',
      detail: 'Probabilité = nombre de cas favorables ÷ nombre de cas possibles.',
      tip: 'Dé : P(obtenir 3) = 1/6 (1 cas favorable sur 6).' },
    { domaine: 'calcul', type: 'controle', lecon: '🏆 Grand Contrôle Final (/100)',
      detail: 'Bilan de tout le programme de 4ème : relatifs, puissances, fractions, calcul littéral, équations, Pythagore et probabilités.',
      tip: '🌟 Surveille tes signes et vérifie chaque solution. Montre tout ce que tu sais !' },
  ]},
];

export const weeks = assembleWeeks(weekDefs);

export const curriculum = {
  // ── S1 ──
  '0-0': { exercises: [
    { id: 'm4-0-0-1', type: 'qcm', question: 'Calcule : (-4) × (+3) = ?', options: ['-12', '+12', '-7', '+7'], answer: '-12', explanation: 'Signes différents → produit négatif. 4 × 3 = 12, donc -12.', hint: 'Signes différents → −.' },
    { id: 'm4-0-0-2', type: 'completer', question: 'Calcule : (-5) × (-2) = ___', answer: '10', explanation: 'Signes identiques → produit positif. 5 × 2 = 10, donc +10.', hint: 'Moins par moins = plus.' },
    { id: 'm4-0-0-3', type: 'vrai_faux', question: 'Le produit de deux nombres négatifs est positif.', answer: 'vrai', explanation: '(−) × (−) = (+). Deux signes identiques donnent un résultat positif.', hint: 'Deux signes identiques → +.' },
  ]},
  '0-1': { exercises: [
    { id: 'm4-0-1-1', type: 'qcm', question: 'Calcule : (-20) ÷ (+4) = ?', options: ['-5', '+5', '-16', '+16'], answer: '-5', explanation: 'Signes différents → quotient négatif. 20 ÷ 4 = 5, donc -5.', hint: 'Même règle des signes que ×.' },
    { id: 'm4-0-1-2', type: 'completer', question: 'Calcule : (-18) ÷ (-3) = ___', answer: '6', explanation: 'Signes identiques → quotient positif. 18 ÷ 3 = 6.', hint: 'Moins ÷ moins = plus.' },
    { id: 'm4-0-1-3', type: 'vrai_faux', question: 'On a (+15) ÷ (-5) = -3.', answer: 'vrai', explanation: 'Signes différents → négatif. 15 ÷ 5 = 3, donc -3.', hint: 'Signes différents → −.' },
  ]},
  '0-2': { exercises: [
    { id: 'm4-0-2-1', type: 'qcm', question: 'Calcule : -3 - 5 + 2 = ?', options: ['-6', '-10', '4', '6'], answer: '-6', explanation: '-3 - 5 = -8, puis -8 + 2 = -6.', hint: 'Calcule de gauche à droite.' },
    { id: 'm4-0-2-2', type: 'completer', question: 'Calcule : 7 - 10 = ___', answer: '-3', explanation: 'On enlève plus que ce qu\'on a : 7 - 10 = -3.', hint: 'Le résultat est négatif.' },
    { id: 'm4-0-2-3', type: 'vrai_faux', question: 'On a -4 + 9 = 5.', answer: 'vrai', explanation: '9 - 4 = 5, et le signe du plus fort (+9) l\'emporte : +5.', hint: '9 est plus fort que 4.' },
  ]},
  '0-3': { exercises: [
    { id: 'm4-0-3-1', type: 'qcm', question: 'Calcule : -2 + 3 × (-4) = ?', options: ['-14', '-4', '-20', '10'], answer: '-14', explanation: 'Multiplication d\'abord : 3 × (-4) = -12, puis -2 + (-12) = -14.', hint: 'La multiplication passe avant.' },
    { id: 'm4-0-3-2', type: 'completer', question: 'Calcule : (-6) + (-2) × (-5) = ___', answer: '4', explanation: '(-2) × (-5) = 10, puis -6 + 10 = 4.', hint: 'Le produit de deux négatifs est positif.' },
    { id: 'm4-0-3-3', type: 'vrai_faux', question: 'Dans -1 + 2 × 3, on calcule d\'abord 2 × 3.', answer: 'vrai', explanation: 'La multiplication est prioritaire sur l\'addition.', hint: 'Priorité à ×.' },
  ]},
  '0-4': { exercises: [
    { id: 'm4-0-4-1', type: 'qcm', question: 'Un plongeur est à -12 m. Il remonte de 5 m. Il est à :', options: ['-7 m', '-17 m', '7 m', '-5 m'], answer: '-7 m', explanation: 'Remonter = ajouter : -12 + 5 = -7 m.', hint: 'Remonter, c\'est ajouter.' },
    { id: 'm4-0-4-2', type: 'completer', question: 'La température est -3 °C, elle baisse de 4 °C. Elle est maintenant à ___ °C (en chiffres).', answer: '-7', explanation: 'Baisser = soustraire : -3 - 4 = -7 °C.', hint: 'Baisser, c\'est soustraire.' },
    { id: 'm4-0-4-3', type: 'qcm', question: 'Un compte a -50 €. On dépose 80 €. Le solde est :', options: ['30 €', '-130 €', '130 €', '-30 €'], answer: '30 €', explanation: '-50 + 80 = 30 €.', hint: 'Déposer = ajouter.' },
  ]},
  // ── S2 ──
  '1-0': { exercises: [
    { id: 'm4-1-0-1', type: 'qcm', question: 'Que vaut 2⁵ ?', options: ['32', '10', '25', '16'], answer: '32', explanation: '2⁵ = 2×2×2×2×2 = 32.', hint: 'Multiplie 2 par lui-même 5 fois.' },
    { id: 'm4-1-0-2', type: 'completer', question: 'Calcule 3² = ___', answer: '9', explanation: '3² = 3 × 3 = 9.', hint: '3 × 3.' },
    { id: 'm4-1-0-3', type: 'vrai_faux', question: 'On a 5³ = 125.', answer: 'vrai', explanation: '5³ = 5×5×5 = 125.', hint: '5 × 5 × 5.' },
  ]},
  '1-1': { exercises: [
    { id: 'm4-1-1-1', type: 'qcm', question: 'Que vaut 10⁴ ?', options: ['10000', '1000', '40', '100000'], answer: '10000', explanation: '10⁴ = 1 suivi de 4 zéros = 10 000.', hint: '4 zéros.' },
    { id: 'm4-1-1-2', type: 'completer', question: 'Calcule 10³ = ___ (en chiffres).', answer: '1000', explanation: '10³ = 1 suivi de 3 zéros = 1000.', hint: '3 zéros.' },
    { id: 'm4-1-1-3', type: 'vrai_faux', question: 'On a 10⁶ = 1 000 000.', answer: 'vrai', explanation: '10⁶ = 1 suivi de 6 zéros = 1 000 000 (un million).', hint: '6 zéros = un million.' },
  ]},
  '1-2': { exercises: [
    { id: 'm4-1-2-1', type: 'qcm', question: 'L\'écriture scientifique de 3200 est :', options: ['3,2 × 10³', '32 × 10²', '3,2 × 10²', '0,32 × 10⁴'], answer: '3,2 × 10³', explanation: '3200 = 3,2 × 1000 = 3,2 × 10³ (un seul chiffre non nul avant la virgule).', hint: 'Un seul chiffre avant la virgule.' },
    { id: 'm4-1-2-2', type: 'vrai_faux', question: 'En écriture scientifique, il y a un seul chiffre non nul avant la virgule.', answer: 'vrai', explanation: 'C\'est la définition : a × 10ⁿ avec 1 ≤ a < 10.', hint: 'Entre 1 et 10 avant la virgule.' },
    { id: 'm4-1-2-3', type: 'completer', question: 'Calcule 5 × 10² = ___ (en chiffres).', answer: '500', explanation: '5 × 100 = 500.', hint: '10² = 100.' },
  ]},
  '1-3': { exercises: [
    { id: 'm4-1-3-1', type: 'qcm', question: 'Calcule 10² × 10³ (en puissance de 10) = ?', options: ['10⁵', '10⁶', '10¹', '100⁵'], answer: '10⁵', explanation: 'Même base : on additionne les exposants. 2 + 3 = 5, donc 10⁵.', hint: 'Additionne les exposants.' },
    { id: 'm4-1-3-2', type: 'completer', question: '2³ × 2² = 2 puissance ___ (on additionne les exposants).', answer: '5', explanation: '3 + 2 = 5, donc 2⁵.', hint: '3 + 2.' },
    { id: 'm4-1-3-3', type: 'vrai_faux', question: 'Pour multiplier deux puissances de même base, on additionne les exposants.', answer: 'vrai', explanation: 'aᵐ × aⁿ = aᵐ⁺ⁿ.', hint: 'On additionne, on ne multiplie pas.' },
  ]},
  '1-4': { exercises: [
    { id: 'm4-1-4-1', type: 'qcm', question: 'Que vaut 4² + 3² ?', options: ['25', '49', '12', '14'], answer: '25', explanation: '4² = 16 et 3² = 9, donc 16 + 9 = 25.', hint: 'Calcule chaque carré séparément.' },
    { id: 'm4-1-4-2', type: 'completer', question: 'Calcule 2⁴ = ___', answer: '16', explanation: '2⁴ = 2×2×2×2 = 16.', hint: '2 × 2 × 2 × 2.' },
    { id: 'm4-1-4-3', type: 'vrai_faux', question: 'On a 3² × 10² = 900.', answer: 'vrai', explanation: '3² = 9 et 10² = 100, donc 9 × 100 = 900.', hint: '9 × 100.' },
  ]},
  // ── S3 ──
  '2-0': { exercises: [
    { id: 'm4-2-0-1', type: 'qcm', question: 'Calcule : 1/3 + 1/6 = ?', options: ['1/2', '2/9', '1/9', '5/6'], answer: '1/2', explanation: '1/3 = 2/6, donc 2/6 + 1/6 = 3/6 = 1/2.', hint: 'Mets tout sur le dénominateur 6.' },
    { id: 'm4-2-0-2', type: 'completer', question: 'Calcule : 5/6 - 1/6 = ___/6', answer: '4', explanation: 'Même dénominateur : 5 - 1 = 4, donc 4/6.', hint: 'Soustrais les numérateurs.' },
    { id: 'm4-2-0-3', type: 'vrai_faux', question: 'On a 1/3 + 1/6 = 1/2.', answer: 'vrai', explanation: '2/6 + 1/6 = 3/6 = 1/2.', hint: 'Réduis au même dénominateur.' },
  ]},
  '2-1': { exercises: [
    { id: 'm4-2-1-1', type: 'qcm', question: 'Calcule : 2/3 × 3/4 = ?', options: ['1/2', '6/7', '5/12', '3/7'], answer: '1/2', explanation: '2 × 3 = 6 et 3 × 4 = 12, donc 6/12 = 1/2.', hint: 'Multiplie numérateurs et dénominateurs, puis simplifie.' },
    { id: 'm4-2-1-2', type: 'completer', question: 'Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les ___ entre eux.', answer: 'dénominateurs', explanation: 'Numérateur × numérateur, dénominateur × dénominateur.', hint: 'Le « bas » avec le « bas ».' },
  ]},
  '2-2': { exercises: [
    { id: 'm4-2-2-1', type: 'qcm', question: 'Diviser par une fraction revient à multiplier par son :', options: ['inverse', 'opposé', 'carré', 'double'], answer: 'inverse', explanation: 'a ÷ (b/c) = a × (c/b) : on multiplie par l\'inverse.', hint: 'On retourne la fraction.' },
    { id: 'm4-2-2-2', type: 'completer', question: 'L\'inverse de 2/5 est 5/___ (en chiffres).', answer: '2', explanation: 'On échange numérateur et dénominateur : l\'inverse de 2/5 est 5/2.', hint: 'On retourne la fraction.' },
    { id: 'm4-2-2-3', type: 'vrai_faux', question: 'On a 1/2 ÷ 1/4 = 2.', answer: 'vrai', explanation: '1/2 × 4/1 = 4/2 = 2.', hint: 'Multiplie par l\'inverse de 1/4.' },
  ]},
  '2-3': { exercises: [
    { id: 'm4-2-3-1', type: 'qcm', question: 'Calcule : 1/2 + 1/2 × 1/2 = ?', options: ['3/4', '1/2', '1/1', '2/4'], answer: '3/4', explanation: 'Multiplication d\'abord : 1/2 × 1/2 = 1/4, puis 1/2 + 1/4 = 3/4.', hint: 'La multiplication passe avant l\'addition.' },
    { id: 'm4-2-3-2', type: 'completer', question: 'Calcule : 1/3 × 3 = ___ (en entier).', answer: '1', explanation: '1/3 × 3 = 3/3 = 1.', hint: 'Trois tiers font un entier.' },
    { id: 'm4-2-3-3', type: 'vrai_faux', question: 'Dans 1/4 + 1/2 × 2, on calcule d\'abord 1/2 × 2.', answer: 'vrai', explanation: 'La multiplication est prioritaire.', hint: 'Priorité à ×.' },
  ]},
  '2-4': { exercises: [
    { id: 'm4-2-4-1', type: 'qcm', question: 'Les 2/3 de 3/4 valent :', options: ['1/2', '5/7', '6/7', '2/4'], answer: '1/2', explanation: '2/3 × 3/4 = 6/12 = 1/2.', hint: '« les … de … » se traduit par une multiplication.' },
    { id: 'm4-2-4-2', type: 'completer', question: 'Marc lit 1/4 d\'un livre lundi et 1/4 mardi. Il a lu ___/4 du livre.', answer: '2', explanation: '1/4 + 1/4 = 2/4 du livre.', hint: 'Additionne les deux quarts.' },
    { id: 'm4-2-4-3', type: 'vrai_faux', question: 'Il reste alors la moitié du livre à lire.', answer: 'vrai', explanation: '2/4 = 1/2 lu, donc il reste bien 1/2.', hint: '2/4 = un demi.' },
  ]},
  // ── S4 ──
  '3-0': { exercises: [
    { id: 'm4-3-0-1', type: 'qcm', question: 'Réduis : 3x + 2x = ?', options: ['5x', '6x', '5', '6x²'], answer: '5x', explanation: 'On ajoute les coefficients : 3 + 2 = 5, donc 5x.', hint: 'Additionne les nombres devant x.' },
    { id: 'm4-3-0-2', type: 'completer', question: 'Réduis : 4a + a = ___ (ex : 5a)', answer: '5a', explanation: '4a + 1a = 5a.', hint: 'a tout seul vaut 1a.' },
    { id: 'm4-3-0-3', type: 'vrai_faux', question: 'L\'expression 3x + 2 ne peut pas se réduire davantage.', answer: 'vrai', explanation: '3x et 2 ne sont pas de même nature (l\'un a un x, l\'autre non) : on ne peut pas les regrouper.', hint: 'On ne mélange pas les x et les nombres seuls.' },
  ]},
  '3-1': { exercises: [
    { id: 'm4-3-1-1', type: 'qcm', question: 'Développe : 3(x + 2) = ?', options: ['3x + 6', '3x + 2', 'x + 6', '3x + 5'], answer: '3x + 6', explanation: '3 × x + 3 × 2 = 3x + 6.', hint: 'Multiplie 3 par chaque terme.' },
    { id: 'm4-3-1-2', type: 'completer', question: 'Développe : 5(a + 3) = 5a + ___ (en chiffres).', answer: '15', explanation: '5 × 3 = 15, donc 5a + 15.', hint: '5 × 3.' },
    { id: 'm4-3-1-3', type: 'vrai_faux', question: 'On a 2(x + 4) = 2x + 8.', answer: 'vrai', explanation: '2 × x + 2 × 4 = 2x + 8.', hint: 'Distribue le 2.' },
  ]},
  '3-2': { exercises: [
    { id: 'm4-3-2-1', type: 'qcm', question: 'Développe et réduis : 2(x + 3) + 4 = ?', options: ['2x + 10', '2x + 7', '2x + 6', '6x'], answer: '2x + 10', explanation: '2(x + 3) = 2x + 6, puis + 4 = 2x + 10.', hint: 'Développe puis additionne les nombres.' },
    { id: 'm4-3-2-2', type: 'completer', question: 'Développe : 3(2x + 1) = 6x + ___ (en chiffres).', answer: '3', explanation: '3 × 2x = 6x et 3 × 1 = 3, donc 6x + 3.', hint: '3 × 1.' },
    { id: 'm4-3-2-3', type: 'vrai_faux', question: 'On a 4(x + 1) + 2 = 4x + 6.', answer: 'vrai', explanation: '4x + 4 + 2 = 4x + 6.', hint: 'Développe, puis additionne 4 et 2.' },
  ]},
  '3-3': { exercises: [
    { id: 'm4-3-3-1', type: 'qcm', question: 'Factorise : 3x + 3 = ?', options: ['3(x + 1)', '3x(1)', 'x(3 + 3)', '3(x + 3)'], answer: '3(x + 1)', explanation: 'Le facteur commun est 3 : 3x + 3 = 3(x + 1).', hint: 'Quel nombre est dans les deux termes ?' },
    { id: 'm4-3-3-2', type: 'completer', question: 'Factorise : 5a + 10 = 5(a + ___) (en chiffres).', answer: '2', explanation: '10 = 5 × 2, donc 5a + 10 = 5(a + 2).', hint: '10 ÷ 5.' },
    { id: 'm4-3-3-3', type: 'vrai_faux', question: 'On a 2x + 6 = 2(x + 3).', answer: 'vrai', explanation: 'Facteur commun 2 : 2x + 6 = 2(x + 3).', hint: 'Vérifie en développant.' },
  ]},
  '3-4': { exercises: [
    { id: 'm4-3-4-1', type: 'qcm', question: 'Pour x = 2, l\'expression 3(x + 1) vaut :', options: ['9', '7', '6', '8'], answer: '9', explanation: '3(2 + 1) = 3 × 3 = 9.', hint: 'Calcule d\'abord la parenthèse.' },
    { id: 'm4-3-4-2', type: 'completer', question: 'Pour x = 5, calcule 2x - 3 = ___', answer: '7', explanation: '2 × 5 = 10, puis 10 - 3 = 7.', hint: 'Remplace x par 5.' },
    { id: 'm4-3-4-3', type: 'vrai_faux', question: 'Pour x = 0, l\'expression 4x + 7 vaut 7.', answer: 'vrai', explanation: '4 × 0 + 7 = 0 + 7 = 7.', hint: '4 × 0 = 0.' },
  ]},
  // ── S5 ──
  '4-0': { exercises: [
    { id: 'm4-4-0-1', type: 'qcm', question: 'Résoudre une équation, c\'est trouver :', options: ['la valeur de l\'inconnue qui rend l\'égalité vraie', 'le plus grand nombre', 'la somme', 'le produit'], answer: 'la valeur de l\'inconnue qui rend l\'égalité vraie', explanation: 'Une solution est une valeur de l\'inconnue qui vérifie l\'égalité.', hint: 'On cherche la valeur qui « marche ».' },
    { id: 'm4-4-0-2', type: 'vrai_faux', question: 'x = 3 est solution de 2x = 6.', answer: 'vrai', explanation: '2 × 3 = 6 ✓.', hint: 'Remplace x par 3.' },
    { id: 'm4-4-0-3', type: 'completer', question: 'Dans l\'équation x + 5 = 9, l\'inconnue est ___.', answer: 'x', explanation: 'L\'inconnue est la lettre à déterminer : x.', hint: 'C\'est la lettre.' },
  ]},
  '4-1': { exercises: [
    { id: 'm4-4-1-1', type: 'qcm', question: 'Résous : x + 7 = 12. x = ?', options: ['5', '19', '7', '12'], answer: '5', explanation: 'x = 12 - 7 = 5.', hint: 'Enlève 7 des deux côtés.' },
    { id: 'm4-4-1-2', type: 'completer', question: 'Résous : x - 4 = 10. x = ___', answer: '14', explanation: 'x = 10 + 4 = 14.', hint: 'Ajoute 4 des deux côtés.' },
    { id: 'm4-4-1-3', type: 'vrai_faux', question: 'La solution de x + 3 = 3 est x = 0.', answer: 'vrai', explanation: 'x = 3 - 3 = 0.', hint: '3 - 3.' },
  ]},
  '4-2': { exercises: [
    { id: 'm4-4-2-1', type: 'qcm', question: 'Résous : 4x = 20. x = ?', options: ['5', '16', '24', '80'], answer: '5', explanation: 'x = 20 ÷ 4 = 5.', hint: 'Divise par 4.' },
    { id: 'm4-4-2-2', type: 'completer', question: 'Résous : 3x = 21. x = ___', answer: '7', explanation: 'x = 21 ÷ 3 = 7.', hint: 'Divise par 3.' },
    { id: 'm4-4-2-3', type: 'vrai_faux', question: 'La solution de 5x = 0 est x = 0.', answer: 'vrai', explanation: 'x = 0 ÷ 5 = 0.', hint: '0 divisé par 5.' },
  ]},
  '4-3': { exercises: [
    { id: 'm4-4-3-1', type: 'qcm', question: 'Résous : 2x + 3 = 11. x = ?', options: ['4', '7', '8', '5'], answer: '4', explanation: '2x = 11 - 3 = 8, puis x = 8 ÷ 2 = 4.', hint: 'Enlève 3, puis divise par 2.' },
    { id: 'm4-4-3-2', type: 'completer', question: 'Résous : 3x - 1 = 8. x = ___', answer: '3', explanation: '3x = 8 + 1 = 9, puis x = 9 ÷ 3 = 3.', hint: 'Ajoute 1, puis divise par 3.' },
    { id: 'm4-4-3-3', type: 'vrai_faux', question: 'La solution de 5x + 2 = 12 est x = 2.', answer: 'vrai', explanation: '5 × 2 + 2 = 10 + 2 = 12 ✓.', hint: 'Remplace x par 2 pour vérifier.' },
  ]},
  '4-4': { exercises: [
    { id: 'm4-4-4-1', type: 'qcm', question: 'Je pense à un nombre, je le multiplie par 2 et j\'ajoute 5 : j\'obtiens 17. Ce nombre est :', options: ['6', '11', '7', '9'], answer: '6', explanation: 'Équation 2x + 5 = 17 → 2x = 12 → x = 6.', hint: 'Traduis par 2x + 5 = 17.' },
    { id: 'm4-4-4-2', type: 'completer', question: 'Le triple d\'un nombre est 27. Ce nombre est ___.', answer: '9', explanation: '3x = 27 → x = 27 ÷ 3 = 9.', hint: 'Divise 27 par 3.' },
    { id: 'm4-4-4-3', type: 'vrai_faux', question: 'Si le double d\'un nombre augmenté de 4 vaut 10, ce nombre est 3.', answer: 'vrai', explanation: '2x + 4 = 10 → 2x = 6 → x = 3.', hint: 'Résous 2x + 4 = 10.' },
  ]},
  // ── S6 ──
  '5-0': { exercises: [
    { id: 'm4-5-0-1', type: 'qcm', question: '3 kg coûtent 12 €. Combien coûtent 5 kg ?', options: ['20 €', '15 €', '17 €', '36 €'], answer: '20 €', explanation: '1 kg = 12 ÷ 3 = 4 €, donc 5 kg = 5 × 4 = 20 €.', hint: 'Cherche le prix d\'un kilo.' },
    { id: 'm4-5-0-2', type: 'completer', question: 'Produit en croix : si 2/3 = x/9, alors x = ___ (en chiffres).', answer: '6', explanation: 'x = (2 × 9) ÷ 3 = 18 ÷ 3 = 6.', hint: '(2 × 9) ÷ 3.' },
    { id: 'm4-5-0-3', type: 'vrai_faux', question: 'Dans un tableau de proportionnalité, les produits en croix sont égaux.', answer: 'vrai', explanation: 'C\'est la propriété du produit en croix (ou des produits en croix).', hint: 'C\'est la base du produit en croix.' },
  ]},
  '5-1': { exercises: [
    { id: 'm4-5-1-1', type: 'qcm', question: 'Un article de 50 € augmente de 10 %. Nouveau prix :', options: ['55 €', '60 €', '40 €', '51 €'], answer: '55 €', explanation: '10 % de 50 = 5, donc 50 + 5 = 55 €.', hint: 'Calcule d\'abord 10 % de 50.' },
    { id: 'm4-5-1-2', type: 'completer', question: 'Un jean de 40 € est soldé -25 %. Il coûte ___ € (en chiffres).', answer: '30', explanation: '25 % de 40 = 10, donc 40 - 10 = 30 €.', hint: '25 % de 40 = 10.' },
    { id: 'm4-5-1-3', type: 'vrai_faux', question: 'Augmenter de 100 %, c\'est doubler.', answer: 'vrai', explanation: '+100 % ajoute une fois la valeur, donc on double.', hint: '+100 % = + la totalité.' },
  ]},
  '5-2': { exercises: [
    { id: 'm4-5-2-1', type: 'qcm', question: 'Une voiture parcourt 240 km en 3 h. Sa vitesse moyenne est :', options: ['80 km/h', '120 km/h', '60 km/h', '720 km/h'], answer: '80 km/h', explanation: '240 ÷ 3 = 80 km/h.', hint: 'Vitesse = distance ÷ temps.' },
    { id: 'm4-5-2-2', type: 'completer', question: 'À 90 km/h pendant 2 h, on parcourt ___ km.', answer: '180', explanation: '90 × 2 = 180 km.', hint: 'Distance = vitesse × temps.' },
    { id: 'm4-5-2-3', type: 'vrai_faux', question: 'Vitesse = distance ÷ temps.', answer: 'vrai', explanation: 'C\'est la formule de la vitesse moyenne.', hint: 'Distance divisée par la durée.' },
  ]},
  '5-3': { exercises: [
    { id: 'm4-5-3-1', type: 'qcm', question: 'Un robinet débite 3 L par minute. En 5 min, il verse :', options: ['15 L', '8 L', '3 L', '35 L'], answer: '15 L', explanation: '3 × 5 = 15 L.', hint: 'Débit × durée.' },
    { id: 'm4-5-3-2', type: 'completer', question: 'Une imprimante fait 10 pages/min. En 4 min : ___ pages.', answer: '40', explanation: '10 × 4 = 40 pages.', hint: '10 × 4.' },
    { id: 'm4-5-3-3', type: 'vrai_faux', question: 'Un débit de 2 L/min remplit 20 L en 10 minutes.', answer: 'vrai', explanation: '2 × 10 = 20 L.', hint: '2 × 10.' },
  ]},
  '5-4': { exercises: [
    { id: 'm4-5-4-1', type: 'qcm', question: 'Une situation de proportionnalité est représentée par :', options: ['une droite passant par l\'origine', 'une courbe', 'un cercle', 'une droite horizontale'], answer: 'une droite passant par l\'origine', explanation: 'La proportionnalité donne une droite qui passe par le point (0 ; 0).', hint: 'Une droite qui part de l\'origine.' },
    { id: 'm4-5-4-2', type: 'vrai_faux', question: 'Le graphique d\'une proportionnalité passe par le point (0 ; 0).', answer: 'vrai', explanation: 'Pour 0 unité, on paie 0 : la droite passe par l\'origine.', hint: '0 unité = 0 €.' },
    { id: 'm4-5-4-3', type: 'completer', question: 'Si 1 objet vaut 2 € (droite proportionnelle), pour 4 objets on lit ___ € (en chiffres).', answer: '8', explanation: '4 × 2 = 8 €.', hint: '4 × 2.' },
  ]},
  // ── S7 ──
  '6-0': { exercises: [
    { id: 'm4-6-0-1', type: 'qcm', question: 'Le théorème de Pythagore s\'applique dans un triangle :', options: ['rectangle', 'isocèle', 'équilatéral', 'quelconque'], answer: 'rectangle', explanation: 'Pythagore ne s\'applique que dans les triangles rectangles.', hint: 'Il faut un angle droit.' },
    { id: 'm4-6-0-2', type: 'vrai_faux', question: 'Dans un triangle rectangle, le côté le plus long est l\'hypoténuse.', answer: 'vrai', explanation: 'L\'hypoténuse (opposée à l\'angle droit) est toujours le plus long côté.', hint: 'Face à l\'angle droit.' },
    { id: 'm4-6-0-3', type: 'completer', question: 'L\'hypoténuse est le côté opposé à l\'angle ___.', answer: 'droit', explanation: 'L\'hypoténuse est en face de l\'angle droit.', hint: 'L\'angle de 90°.' },
  ]},
  '6-1': { exercises: [
    { id: 'm4-6-1-1', type: 'qcm', question: 'Triangle rectangle de côtés 3 et 4. L\'hypoténuse mesure :', options: ['5', '7', '6', '25'], answer: '5', explanation: '3² + 4² = 9 + 16 = 25, et √25 = 5.', hint: 'Additionne les carrés, puis prends la racine.' },
    { id: 'm4-6-1-2', type: 'completer', question: 'Côtés de l\'angle droit 6 et 8. Hypoténuse = ___ (en chiffres).', answer: '10', explanation: '6² + 8² = 36 + 64 = 100, et √100 = 10.', hint: '36 + 64 = 100.' },
    { id: 'm4-6-1-3', type: 'vrai_faux', question: 'Pour un triangle rectangle de côtés 5 et 12, l\'hypoténuse est 13.', answer: 'vrai', explanation: '5² + 12² = 25 + 144 = 169, et √169 = 13.', hint: '25 + 144 = 169.' },
  ]},
  '6-2': { exercises: [
    { id: 'm4-6-2-1', type: 'qcm', question: 'Hypoténuse 13, un côté 5. L\'autre côté mesure :', options: ['12', '8', '18', '9'], answer: '12', explanation: '13² − 5² = 169 − 25 = 144, et √144 = 12.', hint: 'Cette fois on soustrait les carrés.' },
    { id: 'm4-6-2-2', type: 'completer', question: 'Hypoténuse 10, un côté 6. L\'autre côté = ___ (en chiffres).', answer: '8', explanation: '10² − 6² = 100 − 36 = 64, et √64 = 8.', hint: '100 − 36 = 64.' },
    { id: 'm4-6-2-3', type: 'vrai_faux', question: 'On utilise Pythagore : (côté)² = (hypoténuse)² − (autre côté)².', answer: 'vrai', explanation: 'Pour un côté de l\'angle droit, on soustrait les carrés.', hint: 'On soustrait pour un côté de l\'angle droit.' },
  ]},
  '6-3': { exercises: [
    { id: 'm4-6-3-1', type: 'qcm', question: 'Un triangle a pour côtés 6, 8, 10. Est-il rectangle ?', options: ['Oui', 'Non', 'Impossible à dire', 'Seulement si isocèle'], answer: 'Oui', explanation: '6² + 8² = 36 + 64 = 100 = 10². D\'après la réciproque, il est rectangle.', hint: 'Compare 6² + 8² avec 10².' },
    { id: 'm4-6-3-2', type: 'vrai_faux', question: 'Si (grand côté)² = somme des carrés des deux autres, le triangle est rectangle.', answer: 'vrai', explanation: 'C\'est la réciproque du théorème de Pythagore.', hint: 'C\'est la réciproque.' },
    { id: 'm4-6-3-3', type: 'completer', question: 'Pour 3, 4, 5 : 3² + 4² = ___ (en chiffres), égal à 5².', answer: '25', explanation: '9 + 16 = 25 = 5². Le triangle est rectangle.', hint: '9 + 16.' },
  ]},
  '6-4': { exercises: [
    { id: 'm4-6-4-1', type: 'qcm', question: 'Dans un triangle rectangle, le cosinus d\'un angle aigu = ?', options: ['côté adjacent ÷ hypoténuse', 'côté opposé ÷ hypoténuse', 'hypoténuse ÷ adjacent', 'opposé ÷ adjacent'], answer: 'côté adjacent ÷ hypoténuse', explanation: 'CAH : Cosinus = Adjacent ÷ Hypoténuse.', hint: 'Pense au moyen mnémotechnique CAH.' },
    { id: 'm4-6-4-2', type: 'vrai_faux', question: 'Le cosinus d\'un angle aigu est toujours compris entre 0 et 1.', answer: 'vrai', explanation: 'L\'adjacent est plus court que l\'hypoténuse, donc le rapport est entre 0 et 1.', hint: 'Adjacent < hypoténuse.' },
    { id: 'm4-6-4-3', type: 'completer', question: 'cos = adjacent ÷ ___.', answer: 'hypoténuse', explanation: 'Cosinus = côté adjacent ÷ hypoténuse.', hint: 'Le plus long côté.' },
  ]},
  // ── S8 ──
  '7-0': { exercises: [
    { id: 'm4-7-0-1', type: 'qcm', question: 'Notes : deux 10 et un 16. La moyenne est :', options: ['12', '13', '14', '36'], answer: '12', explanation: '(10 + 10 + 16) ÷ 3 = 36 ÷ 3 = 12.', hint: 'Additionne les 3 notes, divise par 3.' },
    { id: 'm4-7-0-2', type: 'completer', question: 'Trois notes : 8, 12, 16. Moyenne = ___ (en chiffres).', answer: '12', explanation: '(8 + 12 + 16) ÷ 3 = 36 ÷ 3 = 12.', hint: 'Somme ÷ 3.' },
    { id: 'm4-7-0-3', type: 'vrai_faux', question: 'Pour une moyenne, on divise la somme par le nombre de valeurs.', answer: 'vrai', explanation: 'Moyenne = somme ÷ effectif.', hint: 'Somme ÷ nombre de valeurs.' },
  ]},
  '7-1': { exercises: [
    { id: 'm4-7-1-1', type: 'qcm', question: 'Étendue de la série 4, 9, 12, 7 ?', options: ['8', '12', '4', '16'], answer: '8', explanation: 'Étendue = max − min = 12 − 4 = 8.', hint: 'Plus grande − plus petite.' },
    { id: 'm4-7-1-2', type: 'completer', question: 'La médiane de 3, 5, 9 est ___ (en chiffres).', answer: '5', explanation: 'La série est ordonnée : la valeur du milieu est 5.', hint: 'La valeur du milieu.' },
    { id: 'm4-7-1-3', type: 'vrai_faux', question: 'L\'étendue = plus grande valeur − plus petite valeur.', answer: 'vrai', explanation: 'C\'est la définition de l\'étendue d\'une série.', hint: 'Max − min.' },
  ]},
  '7-2': { exercises: [
    { id: 'm4-7-2-1', type: 'qcm', question: 'Une probabilité est un nombre compris entre :', options: ['0 et 1', '0 et 100', '1 et 10', '-1 et 1'], answer: '0 et 1', explanation: 'Une probabilité va de 0 (impossible) à 1 (certain).', hint: 'De l\'impossible au certain.' },
    { id: 'm4-7-2-2', type: 'vrai_faux', question: 'Un événement certain a une probabilité de 1.', answer: 'vrai', explanation: 'Certain → probabilité 1 (ou 100 %).', hint: 'Certain = 1.' },
    { id: 'm4-7-2-3', type: 'completer', question: 'Un événement impossible a une probabilité de ___ (en chiffres).', answer: '0', explanation: 'Impossible → probabilité 0.', hint: 'Impossible = 0.' },
  ]},
  '7-3': { exercises: [
    { id: 'm4-7-3-1', type: 'qcm', question: 'On lance un dé à 6 faces. Probabilité d\'obtenir 3 ?', options: ['1/6', '1/3', '3/6', '1/2'], answer: '1/6', explanation: '1 cas favorable (le 3) sur 6 possibles : 1/6.', hint: '1 chance sur 6.' },
    { id: 'm4-7-3-2', type: 'completer', question: 'Avec une pièce, la probabilité de « pile » est 1/___ (en chiffres).', answer: '2', explanation: '1 cas favorable sur 2 (pile ou face) : 1/2.', hint: 'Pile OU face.' },
    { id: 'm4-7-3-3', type: 'qcm', question: 'Probabilité d\'obtenir un nombre pair avec un dé (2, 4, 6) ?', options: ['1/2', '1/6', '1/3', '2/3'], answer: '1/2', explanation: '3 cas favorables (2, 4, 6) sur 6 : 3/6 = 1/2.', hint: '3 faces paires sur 6.' },
  ]},
  '7-4': { exercises: [
    { id: 'm4-7-4-1', type: 'qcm', question: 'Calcule : (-6) × (-4) = ?', options: ['24', '-24', '-10', '10'], answer: '24', explanation: 'Deux négatifs → positif. 6 × 4 = 24.', hint: 'Moins par moins = plus.' },
    { id: 'm4-7-4-2', type: 'qcm', question: 'Résous : 2x + 5 = 13. x = ?', options: ['4', '9', '6', '8'], answer: '4', explanation: '2x = 13 − 5 = 8, puis x = 8 ÷ 2 = 4.', hint: 'Enlève 5, divise par 2.' },
    { id: 'm4-7-4-3', type: 'qcm', question: 'Triangle rectangle de côtés 9 et 12. Hypoténuse ?', options: ['15', '21', '225', '16'], answer: '15', explanation: '9² + 12² = 81 + 144 = 225, et √225 = 15.', hint: '81 + 144 = 225.' },
    { id: 'm4-7-4-4', type: 'vrai_faux', question: 'On a 10³ = 1000.', answer: 'vrai', explanation: '10³ = 1 suivi de 3 zéros = 1000.', hint: '3 zéros.' },
  ]},
};

// Exercices d'entraînement générés (objectif : 10 à 15 questions par jour)
for (const [k, extra] of Object.entries(DRILLS)) {
  if (curriculum[k]) curriculum[k].exercises.push(...extra);
}

export const meta = {
  id: '4eme',
  title: 'Mathématiques 4e',
  description: 'Maths — Révisions Été 2026 (3e année de collège)',
  pdfFile: null,
  totalWeeks: 8,
  totalDays: 40,
};

export function buildSeedJours() { return buildMathsJours(weeks, curriculum, meta.pdfFile); }
export function buildSeedSemaines() { return buildMathsSemaines(weeks); }

export default { meta, weeks, curriculum };
