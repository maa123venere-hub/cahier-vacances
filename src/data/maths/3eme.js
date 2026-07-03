// Mathématiques — 3ème (préparation au brevet)
// Programme complet : 8 semaines × 5 jours. Types : qcm | vrai_faux | completer.
// Semaines 7 et 8 : brevets blancs (le panneau BrevetBlanc s'affiche une fois la semaine terminée).
import { assembleWeeks } from './shared.js';
import { buildMathsJours, buildMathsSemaines } from './seedBuilder.js';
import { MATHS_PDF_PAGES } from './pdfPages.js';
import { DRILLS } from './drills3.js';

const weekDefs = [
  // ── S1 — Calcul littéral et identités remarquables ─────────────
  { num: 1, theme: 'Calcul littéral et identités', emoji: '🔤', days: [
    { domaine: 'calcul', type: 'lecon', lecon: 'La double distributivité',
      detail: '(a + b)(c + d) = ac + ad + bc + bd. On multiplie chaque terme du premier facteur par chaque terme du second.',
      tip: '(x + 2)(x + 3) : n\'oublie aucun des 4 produits.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Identité (a + b)²',
      detail: '(a + b)² = a² + 2ab + b². Ne pas oublier le double produit 2ab.',
      tip: 'Erreur classique : (a+b)² ≠ a² + b². Il manque le 2ab !' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Identités (a − b)² et (a + b)(a − b)',
      detail: '(a − b)² = a² − 2ab + b². (a + b)(a − b) = a² − b².',
      tip: '(a+b)(a−b) = a² − b² : le produit des termes croisés s\'annule.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Factoriser avec un facteur commun',
      detail: 'ka + kb = k(a + b). On repère le facteur présent dans tous les termes.',
      tip: '4x² + 8x : le facteur commun est 4x → 4x(x + 2).' },
    { domaine: 'calcul', type: 'exo', lecon: 'Factoriser avec les identités',
      detail: 'Reconnaître a² − b² = (a − b)(a + b) et a² ± 2ab + b² = (a ± b)².',
      tip: 'x² − 9 = x² − 3² = (x − 3)(x + 3).' },
  ]},
  // ── S2 — Équations et inéquations ──────────────────────────────
  { num: 2, theme: 'Équations et inéquations', emoji: '⚖️', days: [
    { domaine: 'equations', type: 'lecon', lecon: 'Équations du premier degré',
      detail: 'Regrouper les x d\'un côté, les nombres de l\'autre, puis diviser.',
      tip: '5x + 2 = 3x + 10 → 2x = 8 → x = 4.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Les équations produit',
      detail: 'A × B = 0 équivaut à A = 0 OU B = 0. Un produit est nul si au moins un facteur est nul.',
      tip: '(x − 2)(x + 5) = 0 → x = 2 ou x = −5.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Mise en équation',
      detail: 'Traduire un problème par une équation puis la résoudre.',
      tip: 'Nomme le nombre cherché x, traduis chaque information.' },
    { domaine: 'equations', type: 'lecon', lecon: 'Les inéquations',
      detail: 'Résoudre une inéquation comme une équation ; l\'ensemble des solutions est un intervalle.',
      tip: 'x + 3 > 5 → x > 2 : une infinité de solutions.' },
    { domaine: 'equations', type: 'exo', lecon: 'Résoudre et représenter',
      detail: 'Attention : diviser par un négatif inverse le sens de l\'inégalité (hors programme de base ici, on reste positif).',
      tip: 'Diviser par un positif ne change pas le sens de l\'inégalité.' },
  ]},
  // ── S3 — Arithmétique ──────────────────────────────────────────
  { num: 3, theme: 'Arithmétique et PGCD', emoji: '🔢', days: [
    { domaine: 'arithmetique', type: 'lecon', lecon: 'Nombres premiers',
      detail: 'Un nombre premier a exactement deux diviseurs : 1 et lui-même. 2, 3, 5, 7, 11, 13…',
      tip: '2 est le seul nombre premier pair.' },
    { domaine: 'arithmetique', type: 'repos', lecon: '🎆 14 juillet — Facteurs premiers',
      detail: 'Journée allégée. Décomposer un nombre en produit de facteurs premiers. 12 = 2² × 3.',
      tip: 'Bonne fête ! Deux exercices aujourd\'hui 🎆' },
    { domaine: 'arithmetique', type: 'lecon', lecon: 'Le PGCD',
      detail: 'Plus Grand Commun Diviseur de deux nombres. PGCD(12 ; 18) = 6.',
      tip: 'Décompose en facteurs premiers, garde les facteurs communs.' },
    { domaine: 'arithmetique', type: 'lecon', lecon: 'Fractions irréductibles',
      detail: 'Une fraction est irréductible quand numérateur et dénominateur n\'ont plus de diviseur commun (PGCD = 1).',
      tip: 'Divise par le PGCD pour simplifier d\'un coup.' },
    { domaine: 'arithmetique', type: 'exo', lecon: 'Problèmes d\'arithmétique',
      detail: 'Paquets identiques, partages : le PGCD donne le plus grand nombre de parts égales.',
      tip: '« Le plus grand nombre de paquets identiques » → PGCD.' },
  ]},
  // ── S4 — Les fonctions ─────────────────────────────────────────
  { num: 4, theme: 'Fonctions linéaires et affines', emoji: '📈', days: [
    { domaine: 'fonctions', type: 'lecon', lecon: 'Notion de fonction',
      detail: 'Une fonction associe à un nombre x une image f(x). Antécédent → image.',
      tip: 'f(3) se lit « image de 3 par f ».' },
    { domaine: 'fonctions', type: 'lecon', lecon: 'La fonction linéaire',
      detail: 'f(x) = ax. Représente une proportionnalité, graphique = droite passant par l\'origine.',
      tip: 'Linéaire = proportionnalité = droite par (0 ; 0).' },
    { domaine: 'fonctions', type: 'lecon', lecon: 'Coefficient directeur',
      detail: 'Dans f(x) = ax, le nombre a est le coefficient. On le trouve avec a = f(x) ÷ x.',
      tip: 'Si f(2) = 10 alors a = 10 ÷ 2 = 5.' },
    { domaine: 'fonctions', type: 'lecon', lecon: 'La fonction affine',
      detail: 'f(x) = ax + b. Graphique = droite qui coupe l\'axe des ordonnées en b.',
      tip: 'b est l\'ordonnée à l\'origine (valeur en x = 0).' },
    { domaine: 'fonctions', type: 'exo', lecon: 'Lire et représenter',
      detail: 'Calculer des images, lire une ordonnée à l\'origine, reconnaître une droite.',
      tip: 'f(0) donne toujours l\'ordonnée à l\'origine.' },
  ]},
  // ── S5 — Thalès et trigonométrie ───────────────────────────────
  { num: 5, theme: 'Thalès et trigonométrie', emoji: '📐', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le théorème de Thalès',
      detail: 'Avec des droites parallèles coupant deux sécantes, les rapports de longueurs sont égaux.',
      tip: 'Thalès → droites parallèles → rapports égaux.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Calculer une longueur (Thalès)',
      detail: 'Écrire l\'égalité des rapports, puis utiliser le produit en croix.',
      tip: 'Une longueur inconnue = rapport connu × longueur correspondante.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le cosinus',
      detail: 'Dans un triangle rectangle : cos(angle) = adjacent ÷ hypoténuse (SOH-CAH-TOA).',
      tip: 'CAH : Cosinus = Adjacent ÷ Hypoténuse.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Sinus et tangente',
      detail: 'sin = opposé ÷ hypoténuse (SOH). tan = opposé ÷ adjacent (TOA).',
      tip: 'SOH-CAH-TOA : mémorise ce mot-clé.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Calculer un angle ou une longueur',
      detail: 'Choisir la bonne formule trigonométrique selon les côtés connus.',
      tip: 'Repère les côtés connus, choisis sin, cos ou tan en conséquence.' },
  ]},
  // ── S6 — Statistiques et probabilités ──────────────────────────
  { num: 6, theme: 'Statistiques et probabilités', emoji: '🎲', days: [
    { domaine: 'donnees', type: 'lecon', lecon: 'Moyenne, médiane, étendue',
      detail: 'Moyenne (somme ÷ effectif), médiane (valeur du milieu), étendue (max − min).',
      tip: 'Médiane : ordonne la série d\'abord !' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Les quartiles',
      detail: 'La médiane partage en deux moitiés (Q2). Q1 et Q3 découpent en quarts.',
      tip: 'La médiane est le deuxième quartile Q2.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Probabilités simples',
      detail: 'P(événement) = cas favorables ÷ cas possibles. Somme des probabilités = 1.',
      tip: '3 rouges sur 5 boules → P(rouge) = 3/5.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Deux épreuves et arbres',
      detail: 'Dénombrer les issues de deux épreuves (deux pièces, deux tirages) avec un arbre.',
      tip: 'Deux pièces : 4 issues (PP, PF, FP, FF).' },
    { domaine: 'donnees', type: 'exo', lecon: 'Problèmes de probabilité',
      detail: 'Calculer une probabilité dans des situations variées (urne, cartes, dé).',
      tip: 'Compte bien les cas favorables ET les cas possibles.' },
  ]},
  // ── S7 — Brevet Blanc intermédiaire ────────────────────────────
  { num: 7, theme: 'Brevet Blanc — Révisions', emoji: '📝', days: [
    { domaine: 'calcul', type: 'exo', lecon: 'Révision : calcul littéral',
      detail: 'Développer, factoriser, utiliser les identités remarquables.',
      tip: 'Relis les 3 identités remarquables avant de commencer.' },
    { domaine: 'equations', type: 'exo', lecon: 'Révision : équations',
      detail: 'Équations du premier degré et équations produit.',
      tip: 'Une équation produit se résout après factorisation.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Révision : Pythagore et Thalès',
      detail: 'Calculs de longueurs, trigonométrie, configurations de Thalès.',
      tip: 'Vérifie toujours quel théorème s\'applique.' },
    { domaine: 'fonctions', type: 'exo', lecon: 'Révision : fonctions',
      detail: 'Images, antécédents, fonctions linéaires et affines.',
      tip: 'f(0) = ordonnée à l\'origine.' },
    { domaine: 'donnees', type: 'exo', lecon: 'Révision : statistiques et probabilités',
      detail: 'Moyenne, médiane, étendue, probabilités simples.',
      tip: 'Distingue bien moyenne, médiane et étendue.' },
  ]},
  // ── S8 — Grand Brevet Blanc final ──────────────────────────────
  { num: 8, theme: 'Grand Brevet Blanc final', emoji: '🏆', days: [
    { domaine: 'calcul', type: 'exo', lecon: 'Épreuve : numérique et calcul',
      detail: 'Partie « numérique » du brevet : calculs, puissances, arithmétique, calcul littéral.',
      tip: 'Conditions d\'examen : seul(e), sans aide, chronomètre lancé.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Épreuve : géométrie',
      detail: 'Pythagore, Thalès, trigonométrie, triangles semblables.',
      tip: 'Justifie chaque théorème utilisé.' },
    { domaine: 'fonctions', type: 'exo', lecon: 'Épreuve : fonctions et proportionnalité',
      detail: 'Fonctions linéaires/affines, pourcentages, proportionnalité.',
      tip: 'Une fonction linéaire est une proportionnalité.' },
    { domaine: 'donnees', type: 'exo', lecon: 'Épreuve : statistiques et probabilités',
      detail: 'Indicateurs statistiques et calculs de probabilités.',
      tip: 'Ordonne la série avant de chercher la médiane.' },
    { domaine: 'calcul', type: 'controle', lecon: '🏆 Grand Brevet Blanc (/100)',
      detail: 'Bilan complet du programme de 3ème, en conditions d\'examen. Couvre tout le brevet de mathématiques.',
      tip: '🌟 Lis tout le sujet, gère ton temps, vérifie tes réponses. Bonne chance pour le brevet !' },
  ]},
];

export const weeks = assembleWeeks(weekDefs);

export const curriculum = {
  // ── S1 ──
  '0-0': { exercises: [
    { id: 'm3-0-0-1', type: 'qcm', question: 'Développe : (x + 2)(x + 3) = ?', options: ['x² + 5x + 6', 'x² + 6', 'x² + 6x + 5', 'x² + 5x + 5'], answer: 'x² + 5x + 6', explanation: 'x×x + x×3 + 2×x + 2×3 = x² + 3x + 2x + 6 = x² + 5x + 6.', hint: 'Fais les 4 produits, puis regroupe les termes en x.' },
    { id: 'm3-0-0-2', type: 'completer', question: 'Développe : (x + 1)(x + 4) = x² + ___x + 4 (coefficient, en chiffres).', answer: '5', explanation: 'x² + 4x + x + 4 = x² + 5x + 4. Le coefficient est 5.', hint: '4x + 1x = 5x.' },
    { id: 'm3-0-0-3', type: 'vrai_faux', question: 'On a (x + 2)(x + 3) = x² + 5x + 6.', answer: 'vrai', explanation: 'x² + 3x + 2x + 6 = x² + 5x + 6.', hint: 'Vérifie en développant les 4 produits.' },
  ]},
  '0-1': { exercises: [
    { id: 'm3-0-1-1', type: 'qcm', question: 'Développe : (x + 3)² = ?', options: ['x² + 6x + 9', 'x² + 9', 'x² + 3x + 9', 'x² + 6x + 6'], answer: 'x² + 6x + 9', explanation: '(a+b)² = a² + 2ab + b² : x² + 2×x×3 + 3² = x² + 6x + 9.', hint: 'N\'oublie pas le double produit 2ab.' },
    { id: 'm3-0-1-2', type: 'completer', question: 'Complète l\'identité : (a + b)² = a² + ___ab + b² (coefficient, en chiffres).', answer: '2', explanation: 'L\'identité remarquable est a² + 2ab + b².', hint: 'Le double produit.' },
    { id: 'm3-0-1-3', type: 'vrai_faux', question: 'On a (x + 5)² = x² + 10x + 25.', answer: 'vrai', explanation: 'x² + 2×x×5 + 5² = x² + 10x + 25.', hint: '2 × x × 5 = 10x.' },
  ]},
  '0-2': { exercises: [
    { id: 'm3-0-2-1', type: 'qcm', question: 'Développe : (x - 4)² = ?', options: ['x² - 8x + 16', 'x² + 8x + 16', 'x² - 16', 'x² - 8x - 16'], answer: 'x² - 8x + 16', explanation: '(a−b)² = a² − 2ab + b² : x² − 2×x×4 + 4² = x² − 8x + 16.', hint: 'Le terme du milieu est négatif, mais b² reste positif.' },
    { id: 'm3-0-2-2', type: 'qcm', question: 'Développe : (x - 3)(x + 3) = ?', options: ['x² - 9', 'x² + 9', 'x² - 6x - 9', 'x² - 6'], answer: 'x² - 9', explanation: '(a−b)(a+b) = a² − b² : x² − 3² = x² − 9.', hint: 'Les termes croisés s\'annulent.' },
    { id: 'm3-0-2-3', type: 'vrai_faux', question: 'On a (a - b)(a + b) = a² - b².', answer: 'vrai', explanation: 'C\'est la 3e identité remarquable.', hint: 'Différence de deux carrés.' },
  ]},
  '0-3': { exercises: [
    { id: 'm3-0-3-1', type: 'qcm', question: 'Factorise : 4x² + 8x = ?', options: ['4x(x + 2)', '4x(x + 4)', '4x(x - 2)', '2x(2x + 8)'], answer: '4x(x + 2)', explanation: 'Facteur commun 4x : 4x² + 8x = 4x × x + 4x × 2 = 4x(x + 2).', hint: 'Cherche le plus grand facteur commun (4x).' },
    { id: 'm3-0-3-2', type: 'completer', question: 'Factorise : 3x² + 6x = 3x(x + ___) (en chiffres).', answer: '2', explanation: '6x = 3x × 2, donc 3x² + 6x = 3x(x + 2).', hint: '6x ÷ 3x = 2.' },
    { id: 'm3-0-3-3', type: 'vrai_faux', question: 'On a 5x + 10 = 5(x + 2).', answer: 'vrai', explanation: 'Facteur commun 5 : 5x + 10 = 5(x + 2).', hint: 'Vérifie en développant.' },
  ]},
  '0-4': { exercises: [
    { id: 'm3-0-4-1', type: 'qcm', question: 'Factorise : x² - 9 = ?', options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', '(x + 3)²'], answer: '(x - 3)(x + 3)', explanation: 'x² − 9 = x² − 3² = (x − 3)(x + 3) (différence de deux carrés).', hint: '9 = 3². Différence de carrés.', brevetTip: 'Reconnais les 3 identités remarquables : elles sont incontournables au brevet.' },
    { id: 'm3-0-4-2', type: 'completer', question: 'Factorise : x² - 25 = (x - 5)(x + ___) (en chiffres).', answer: '5', explanation: 'x² − 25 = x² − 5² = (x − 5)(x + 5).', hint: '25 = 5².' },
    { id: 'm3-0-4-3', type: 'vrai_faux', question: 'On a x² + 6x + 9 = (x + 3)².', answer: 'vrai', explanation: 'x² + 6x + 9 = x² + 2×3×x + 3² = (x + 3)².', hint: 'Reconnais a² + 2ab + b².' },
  ]},
  // ── S2 ──
  '1-0': { exercises: [
    { id: 'm3-1-0-1', type: 'qcm', question: 'Résous : 3x - 5 = 7. x = ?', options: ['4', '2', '12', '3'], answer: '4', explanation: '3x = 7 + 5 = 12, puis x = 12 ÷ 3 = 4.', hint: 'Ajoute 5, divise par 3.' },
    { id: 'm3-1-0-2', type: 'completer', question: 'Résous : 5x + 2 = 3x + 10. x = ___', answer: '4', explanation: '5x − 3x = 10 − 2 → 2x = 8 → x = 4.', hint: 'Regroupe les x d\'un côté.' },
    { id: 'm3-1-0-3', type: 'vrai_faux', question: 'La solution de 2x - 6 = 0 est x = 3.', answer: 'vrai', explanation: '2x = 6 → x = 3.', hint: '2x = 6.' },
  ]},
  '1-1': { exercises: [
    { id: 'm3-1-1-1', type: 'qcm', question: 'Un produit de facteurs est nul si :', options: ['au moins un des facteurs est nul', 'les deux facteurs sont nuls', 'aucun facteur n\'est nul', 'le produit vaut 1'], answer: 'au moins un des facteurs est nul', explanation: 'A × B = 0 équivaut à A = 0 OU B = 0.', hint: 'Un seul facteur nul suffit.' },
    { id: 'm3-1-1-2', type: 'qcm', question: 'Les solutions de (x - 2)(x + 5) = 0 sont :', options: ['2 et -5', '-2 et 5', '2 et 5', '-2 et -5'], answer: '2 et -5', explanation: 'x − 2 = 0 → x = 2 ; x + 5 = 0 → x = −5.', hint: 'Chaque facteur = 0.', brevetTip: 'Équation produit : chaque facteur égalé à 0 donne une solution.' },
    { id: 'm3-1-1-3', type: 'completer', question: 'Une solution de (x - 7)(x + 1) = 0 est x = 7, l\'autre est x = ___ (en chiffres).', answer: '-1', explanation: 'x + 1 = 0 → x = −1.', hint: 'x + 1 = 0.' },
  ]},
  '1-2': { exercises: [
    { id: 'm3-1-2-1', type: 'qcm', question: 'Le périmètre d\'un carré de côté x est 20. Alors x = ?', options: ['5', '4', '80', '16'], answer: '5', explanation: 'Périmètre = 4x = 20 → x = 5.', hint: '4x = 20.' },
    { id: 'm3-1-2-2', type: 'completer', question: 'La somme de deux entiers consécutifs est 15. Le plus petit est ___ (x + (x+1) = 15).', answer: '7', explanation: '2x + 1 = 15 → 2x = 14 → x = 7 (et 7 + 8 = 15).', hint: '2x + 1 = 15.' },
    { id: 'm3-1-2-3', type: 'vrai_faux', question: 'Si 2x + 3 = 21, alors x = 9.', answer: 'vrai', explanation: '2x = 18 → x = 9.', hint: '2x = 18.' },
  ]},
  '1-3': { exercises: [
    { id: 'm3-1-3-1', type: 'qcm', question: 'Résous : x + 3 > 5. Les solutions sont :', options: ['x > 2', 'x < 2', 'x > 8', 'x < 8'], answer: 'x > 2', explanation: 'x > 5 − 3, donc x > 2.', hint: 'Enlève 3 des deux côtés.' },
    { id: 'm3-1-3-2', type: 'vrai_faux', question: '5 est une solution de x > 2.', answer: 'vrai', explanation: '5 > 2, donc 5 vérifie l\'inéquation.', hint: '5 est-il plus grand que 2 ?' },
    { id: 'm3-1-3-3', type: 'completer', question: 'Résous : 2x < 10. Alors x < ___ (en chiffres).', answer: '5', explanation: 'x < 10 ÷ 2 = 5.', hint: 'Divise par 2.' },
  ]},
  '1-4': { exercises: [
    { id: 'm3-1-4-1', type: 'qcm', question: 'Résous : 3x ≥ 12. Alors :', options: ['x ≥ 4', 'x ≤ 4', 'x ≥ 36', 'x ≤ 36'], answer: 'x ≥ 4', explanation: 'x ≥ 12 ÷ 3 = 4.', hint: 'Divise par 3 (positif).' },
    { id: 'm3-1-4-2', type: 'vrai_faux', question: 'Quand on divise une inéquation par un nombre positif, le sens de l\'inégalité ne change pas.', answer: 'vrai', explanation: 'Le sens ne change que si on divise (ou multiplie) par un nombre NÉGATIF.', hint: 'Positif → sens conservé.' },
    { id: 'm3-1-4-3', type: 'completer', question: 'Résous : x - 4 ≤ 0. Alors x ≤ ___ (en chiffres).', answer: '4', explanation: 'x ≤ 4.', hint: 'Ajoute 4 des deux côtés.' },
  ]},
  // ── S3 ──
  '2-0': { exercises: [
    { id: 'm3-2-0-1', type: 'qcm', question: 'Lequel est un nombre premier ?', options: ['13', '15', '21', '9'], answer: '13', explanation: '13 n\'a que 1 et 13 comme diviseurs. 15 = 3×5, 21 = 3×7, 9 = 3².', hint: 'Cherche celui qui n\'a aucun diviseur autre que 1 et lui-même.' },
    { id: 'm3-2-0-2', type: 'vrai_faux', question: 'Un nombre premier n\'a que deux diviseurs : 1 et lui-même.', answer: 'vrai', explanation: 'C\'est la définition d\'un nombre premier.', hint: 'Exactement deux diviseurs.' },
    { id: 'm3-2-0-3', type: 'completer', question: 'Le plus petit nombre premier est ___ (en chiffres).', answer: '2', explanation: '2 est le plus petit nombre premier (et le seul qui soit pair).', hint: '1 n\'est pas premier.' },
  ]},
  '2-1': { exercises: [
    { id: 'm3-2-1-1', type: 'qcm', question: 'La décomposition de 12 en facteurs premiers est :', options: ['2² × 3', '2 × 6', '3 × 4', '2 × 3²'], answer: '2² × 3', explanation: '12 = 2 × 2 × 3 = 2² × 3 (6 et 4 ne sont pas premiers).', hint: 'Tous les facteurs doivent être premiers.' },
    { id: 'm3-2-1-2', type: 'completer', question: 'Décompose 30 : 30 = 2 × 3 × ___ (en chiffres).', answer: '5', explanation: '30 = 2 × 3 × 5.', hint: '30 ÷ 6 = 5.' },
  ]},
  '2-2': { exercises: [
    { id: 'm3-2-2-1', type: 'qcm', question: 'Le PGCD de 12 et 18 est :', options: ['6', '2', '3', '36'], answer: '6', explanation: '12 = 2²×3, 18 = 2×3². Facteurs communs : 2 × 3 = 6.', hint: 'Garde les facteurs communs.' },
    { id: 'm3-2-2-2', type: 'completer', question: 'Le PGCD de 20 et 30 est ___ (en chiffres).', answer: '10', explanation: '20 = 2²×5, 30 = 2×3×5. Communs : 2 × 5 = 10.', hint: 'Facteurs communs : 2 et 5.' },
    { id: 'm3-2-2-3', type: 'vrai_faux', question: 'Le PGCD de 7 et 5 est 1 (ils sont premiers entre eux).', answer: 'vrai', explanation: '7 et 5 n\'ont aucun diviseur commun sauf 1 : premiers entre eux.', hint: 'Aucun diviseur commun.' },
  ]},
  '2-3': { exercises: [
    { id: 'm3-2-3-1', type: 'qcm', question: 'Rends irréductible la fraction 12/18 :', options: ['2/3', '6/9', '4/6', '3/4'], answer: '2/3', explanation: 'On divise par le PGCD 6 : 12/18 = 2/3. (6/9 et 4/6 valent 2/3 mais ne sont pas irréductibles.)', hint: 'Divise haut et bas par le PGCD (6).', brevetTip: 'Simplifie par le PGCD pour obtenir directement la fraction irréductible.' },
    { id: 'm3-2-3-2', type: 'completer', question: 'Simplifie 15/25 sous forme irréductible : ___', answer: '3/5', explanation: 'PGCD(15, 25) = 5 : 15/25 = 3/5.', hint: 'Divise par 5.' },
    { id: 'm3-2-3-3', type: 'vrai_faux', question: 'Pour rendre une fraction irréductible, on divise par le PGCD du numérateur et du dénominateur.', answer: 'vrai', explanation: 'Diviser par le PGCD donne directement la fraction irréductible.', hint: 'Le PGCD simplifie d\'un coup.' },
  ]},
  '2-4': { exercises: [
    { id: 'm3-2-4-1', type: 'qcm', question: 'On fait des paquets identiques avec 24 stylos et 36 crayons, sans reste. Le plus grand nombre de paquets est :', options: ['12', '6', '24', '72'], answer: '12', explanation: 'C\'est le PGCD de 24 et 36, qui vaut 12.', hint: 'Le « plus grand nombre de paquets » = PGCD.' },
    { id: 'm3-2-4-2', type: 'completer', question: 'PGCD(16, 24) = ___ (en chiffres).', answer: '8', explanation: '16 = 2⁴, 24 = 2³×3. Communs : 2³ = 8.', hint: 'Facteur commun 2³.' },
    { id: 'm3-2-4-3', type: 'vrai_faux', question: 'Deux nombres premiers entre eux ont un PGCD égal à 1.', answer: 'vrai', explanation: 'C\'est la définition de « premiers entre eux ».', hint: 'Aucun facteur commun sauf 1.' },
  ]},
  // ── S4 ──
  '3-0': { exercises: [
    { id: 'm3-3-0-1', type: 'qcm', question: 'Pour la fonction f(x) = 2x, l\'image de 3 est :', options: ['6', '5', '1,5', '23'], answer: '6', explanation: 'f(3) = 2 × 3 = 6.', hint: 'Remplace x par 3.' },
    { id: 'm3-3-0-2', type: 'completer', question: 'Si f(x) = x + 4, alors f(2) = ___ (en chiffres).', answer: '6', explanation: 'f(2) = 2 + 4 = 6.', hint: '2 + 4.' },
    { id: 'm3-3-0-3', type: 'vrai_faux', question: 'L\'image de 5 par la fonction f(x) = x² est 25.', answer: 'vrai', explanation: 'f(5) = 5² = 25.', hint: '5 au carré.' },
  ]},
  '3-1': { exercises: [
    { id: 'm3-3-1-1', type: 'qcm', question: 'Une fonction linéaire a la forme :', options: ['f(x) = ax', 'f(x) = ax + b', 'f(x) = x²', 'f(x) = a'], answer: 'f(x) = ax', explanation: 'Une fonction linéaire s\'écrit f(x) = ax (proportionnalité).', hint: 'Sans terme constant b.' },
    { id: 'm3-3-1-2', type: 'completer', question: 'Pour f(x) = 3x, f(4) = ___ (en chiffres).', answer: '12', explanation: 'f(4) = 3 × 4 = 12.', hint: '3 × 4.' },
    { id: 'm3-3-1-3', type: 'vrai_faux', question: 'Une fonction linéaire représente une situation de proportionnalité.', answer: 'vrai', explanation: 'f(x) = ax : y est proportionnel à x.', hint: 'y = ax, c\'est de la proportionnalité.' },
  ]},
  '3-2': { exercises: [
    { id: 'm3-3-2-1', type: 'qcm', question: 'Pour f(x) = 5x, le coefficient directeur est :', options: ['5', '0', '1', 'x'], answer: '5', explanation: 'Dans f(x) = ax, le coefficient est a = 5.', hint: 'Le nombre devant x.' },
    { id: 'm3-3-2-2', type: 'vrai_faux', question: 'La représentation d\'une fonction linéaire est une droite passant par l\'origine.', answer: 'vrai', explanation: 'Le graphique de f(x) = ax passe toujours par (0 ; 0).', hint: 'f(0) = 0.' },
    { id: 'm3-3-2-3', type: 'completer', question: 'Si f(x) = ax et f(2) = 10, alors a = ___ (en chiffres).', answer: '5', explanation: 'a = f(2) ÷ 2 = 10 ÷ 2 = 5.', hint: 'a = f(x) ÷ x.' },
  ]},
  '3-3': { exercises: [
    { id: 'm3-3-3-1', type: 'qcm', question: 'Une fonction affine a la forme :', options: ['f(x) = ax + b', 'f(x) = ax', 'f(x) = x²', 'f(x) = a/x'], answer: 'f(x) = ax + b', explanation: 'Une fonction affine s\'écrit f(x) = ax + b.', hint: 'Avec un terme constant b.' },
    { id: 'm3-3-3-2', type: 'completer', question: 'Pour f(x) = 2x + 3, f(1) = ___ (en chiffres).', answer: '5', explanation: 'f(1) = 2 × 1 + 3 = 5.', hint: '2 + 3.' },
    { id: 'm3-3-3-3', type: 'vrai_faux', question: 'La représentation d\'une fonction affine est une droite.', answer: 'vrai', explanation: 'Le graphique de f(x) = ax + b est une droite (qui ne passe pas forcément par l\'origine).', hint: 'C\'est une droite.' },
  ]},
  '3-4': { exercises: [
    { id: 'm3-3-4-1', type: 'qcm', question: 'Pour f(x) = 2x + 1, l\'ordonnée à l\'origine (valeur en x = 0) est :', options: ['1', '2', '0', '3'], answer: '1', explanation: 'f(0) = 2 × 0 + 1 = 1. L\'ordonnée à l\'origine est b = 1.', hint: 'Calcule f(0).' },
    { id: 'm3-3-4-2', type: 'completer', question: 'Pour f(x) = 4x - 2, f(0) = ___ (en chiffres).', answer: '-2', explanation: 'f(0) = 4 × 0 − 2 = −2.', hint: '4 × 0 = 0.' },
    { id: 'm3-3-4-3', type: 'vrai_faux', question: 'Une fonction affine f(x) = ax + b coupe l\'axe des ordonnées en b.', answer: 'vrai', explanation: 'Pour x = 0, f(0) = b : c\'est l\'ordonnée à l\'origine.', hint: 'b = ordonnée à l\'origine.' },
  ]},
  // ── S5 ──
  '4-0': { exercises: [
    { id: 'm3-4-0-1', type: 'qcm', question: 'Le théorème de Thalès concerne :', options: ['des droites parallèles coupant deux sécantes', 'un triangle rectangle', 'un cercle', 'des angles'], answer: 'des droites parallèles coupant deux sécantes', explanation: 'Thalès s\'utilise avec deux droites parallèles coupées par deux sécantes.', hint: 'Il faut des droites parallèles.' },
    { id: 'm3-4-0-2', type: 'vrai_faux', question: 'Le théorème de Thalès permet de calculer des longueurs grâce à des rapports égaux.', answer: 'vrai', explanation: 'Il donne l\'égalité de rapports de longueurs.', hint: 'Rapports de longueurs égaux.' },
    { id: 'm3-4-0-3', type: 'completer', question: 'Thalès utilise des droites ___ (parallèles / perpendiculaires).', answer: 'parallèles', explanation: 'Le théorème repose sur des droites parallèles.', hint: 'Pas perpendiculaires.' },
  ]},
  '4-1': { exercises: [
    { id: 'm3-4-1-1', type: 'qcm', question: 'Configuration de Thalès : si AM/AB = 1/2 et AB = 10, alors AM = ?', options: ['5', '20', '2', '15'], answer: '5', explanation: 'AM = (1/2) × 10 = 5.', hint: 'Multiplie le rapport par AB.' },
    { id: 'm3-4-1-2', type: 'completer', question: 'Si le rapport vaut 2/3 et la longueur correspondante mesure 9, alors 9 × 2/3 = ___ (en chiffres).', answer: '6', explanation: '9 × 2 ÷ 3 = 18 ÷ 3 = 6.', hint: '9 ÷ 3 × 2.' },
    { id: 'm3-4-1-3', type: 'vrai_faux', question: 'Dans Thalès, on écrit des rapports de longueurs égaux.', answer: 'vrai', explanation: 'On pose l\'égalité des rapports, puis produit en croix.', hint: 'Égalité de rapports.' },
  ]},
  '4-2': { exercises: [
    { id: 'm3-4-2-1', type: 'qcm', question: 'cos(angle) dans un triangle rectangle = ?', options: ['adjacent / hypoténuse', 'opposé / hypoténuse', 'opposé / adjacent', 'hypoténuse / opposé'], answer: 'adjacent / hypoténuse', explanation: 'CAH : Cosinus = Adjacent ÷ Hypoténuse.', hint: 'Le C de CAH.' },
    { id: 'm3-4-2-2', type: 'completer', question: 'Dans SOH-CAH-TOA, le C de CAH désigne ___ (cosinus / sinus).', answer: 'cosinus', explanation: 'CAH → Cosinus = Adjacent ÷ Hypoténuse.', hint: 'C comme…' },
    { id: 'm3-4-2-3', type: 'vrai_faux', question: 'On a cos(60°) = 0,5.', answer: 'vrai', explanation: 'cos(60°) = 0,5 (valeur remarquable).', hint: 'Valeur remarquable à connaître.' },
  ]},
  '4-3': { exercises: [
    { id: 'm3-4-3-1', type: 'qcm', question: 'sin(angle) = ?', options: ['opposé / hypoténuse', 'adjacent / hypoténuse', 'opposé / adjacent', 'hypoténuse / adjacent'], answer: 'opposé / hypoténuse', explanation: 'SOH : Sinus = Opposé ÷ Hypoténuse.', hint: 'Le S de SOH.' },
    { id: 'm3-4-3-2', type: 'qcm', question: 'tan(angle) = ?', options: ['opposé / adjacent', 'adjacent / opposé', 'opposé / hypoténuse', 'adjacent / hypoténuse'], answer: 'opposé / adjacent', explanation: 'TOA : Tangente = Opposé ÷ Adjacent.', hint: 'Le T de TOA.' },
    { id: 'm3-4-3-3', type: 'completer', question: 'Dans SOH-CAH-TOA, le T de TOA désigne la ___.', answer: 'tangente', explanation: 'TOA → Tangente = Opposé ÷ Adjacent.', hint: 'T comme…' },
  ]},
  '4-4': { exercises: [
    { id: 'm3-4-4-1', type: 'qcm', question: 'Triangle rectangle : adjacent = 4, hypoténuse = 8. cos(angle) = ?', options: ['0,5', '2', '0,25', '1'], answer: '0,5', explanation: 'cos = adjacent ÷ hypoténuse = 4 ÷ 8 = 0,5.', hint: '4 ÷ 8.', brevetTip: 'Choisis sin, cos ou tan selon les deux côtés que tu connais.' },
    { id: 'm3-4-4-2', type: 'vrai_faux', question: 'Si cos(angle) = 0,5, alors l\'angle mesure 60°.', answer: 'vrai', explanation: 'cos(60°) = 0,5.', hint: 'Valeur remarquable.' },
    { id: 'm3-4-4-3', type: 'completer', question: 'opposé = 3, hypoténuse = 6. sin(angle) = 3 ÷ 6 = ___ (décimal).', answer: '0,5', explanation: 'sin = opposé ÷ hypoténuse = 3 ÷ 6 = 0,5.', hint: '3 ÷ 6.' },
  ]},
  // ── S6 ──
  '5-0': { exercises: [
    { id: 'm3-5-0-1', type: 'qcm', question: 'Série 5, 8, 8, 11. La moyenne est :', options: ['8', '9', '7', '32'], answer: '8', explanation: '(5 + 8 + 8 + 11) ÷ 4 = 32 ÷ 4 = 8.', hint: 'Somme ÷ 4.' },
    { id: 'm3-5-0-2', type: 'completer', question: 'L\'étendue de 3, 10, 6, 15 est ___ (en chiffres).', answer: '12', explanation: 'Étendue = 15 − 3 = 12.', hint: 'Max − min.' },
    { id: 'm3-5-0-3', type: 'vrai_faux', question: 'La médiane de 2, 5, 9, 12, 20 est 9.', answer: 'vrai', explanation: 'Série ordonnée de 5 valeurs : la 3e (celle du milieu) est 9.', hint: 'La valeur centrale.' },
  ]},
  '5-1': { exercises: [
    { id: 'm3-5-1-1', type: 'qcm', question: 'La médiane partage une série ordonnée en :', options: ['deux moitiés', 'trois tiers', 'quatre quarts', 'dix parts'], answer: 'deux moitiés', explanation: 'La médiane sépare la série en deux moitiés de même effectif.', hint: 'Moitié en dessous, moitié au-dessus.' },
    { id: 'm3-5-1-2', type: 'vrai_faux', question: 'Le premier quartile Q1 est une valeur telle qu\'au moins un quart des données lui sont inférieures ou égales.', answer: 'vrai', explanation: 'C\'est la définition du premier quartile.', hint: 'Un quart des données.' },
    { id: 'm3-5-1-3', type: 'completer', question: 'La médiane correspond au deuxième quartile, noté Q___ (en chiffres).', answer: '2', explanation: 'La médiane est le quartile Q2.', hint: 'Le deuxième quartile.' },
  ]},
  '5-2': { exercises: [
    { id: 'm3-5-2-1', type: 'qcm', question: 'Urne : 3 boules rouges, 2 bleues. P(rouge) = ?', options: ['3/5', '2/5', '3/2', '1/5'], answer: '3/5', explanation: '3 cas favorables sur 5 possibles : 3/5.', hint: 'Rouges ÷ total.' },
    { id: 'm3-5-2-2', type: 'completer', question: 'Dé à 6 faces : P(obtenir 3 ou 6) = ___/6 (numérateur).', answer: '2', explanation: '2 cas favorables (3 et 6) sur 6 : 2/6.', hint: 'Deux faces favorables.' },
    { id: 'm3-5-2-3', type: 'vrai_faux', question: 'La somme des probabilités de tous les résultats possibles est 1.', answer: 'vrai', explanation: 'La probabilité totale vaut toujours 1.', hint: 'Le total fait 1 (ou 100 %).' },
  ]},
  '5-3': { exercises: [
    { id: 'm3-5-3-1', type: 'qcm', question: 'On lance deux pièces. Combien de résultats possibles (PP, PF, FP, FF) ?', options: ['4', '2', '3', '8'], answer: '4', explanation: 'Chaque pièce a 2 issues : 2 × 2 = 4 résultats.', hint: '2 × 2.' },
    { id: 'm3-5-3-2', type: 'completer', question: 'Avec deux pièces, P(obtenir deux fois pile) = 1/___ (en chiffres).', answer: '4', explanation: '1 cas favorable (PP) sur 4 : 1/4.', hint: '1 issue sur 4.' },
    { id: 'm3-5-3-3', type: 'vrai_faux', question: 'Un arbre de probabilités aide à dénombrer les issues de deux épreuves.', answer: 'vrai', explanation: 'L\'arbre liste toutes les combinaisons possibles.', hint: 'Il liste les issues.' },
  ]},
  '5-4': { exercises: [
    { id: 'm3-5-4-1', type: 'qcm', question: 'Un sac : 4 boules rouges, 6 vertes. P(verte) = ?', options: ['3/5', '2/5', '6/4', '4/6'], answer: '3/5', explanation: '6 vertes sur 10 : 6/10 = 3/5.', hint: 'Vertes ÷ total, puis simplifie.' },
    { id: 'm3-5-4-2', type: 'completer', question: '10 cartes numérotées de 1 à 10. P(tirer un nombre pair) = ___/10 (numérateur).', answer: '5', explanation: '5 nombres pairs (2,4,6,8,10) sur 10 : 5/10.', hint: 'Compte les nombres pairs.' },
    { id: 'm3-5-4-3', type: 'vrai_faux', question: 'Une probabilité peut être exprimée en fraction, en décimal ou en pourcentage.', answer: 'vrai', explanation: '1/2 = 0,5 = 50 % : trois écritures d\'une même probabilité.', hint: '1/2 = 0,5 = 50 %.' },
  ]},
  // ── S7 — Brevet Blanc intermédiaire ──
  '6-0': { exercises: [
    { id: 'm3-6-0-1', type: 'qcm', question: 'Développe (2x + 1)² = ?', options: ['4x² + 4x + 1', '4x² + 1', '2x² + 4x + 1', '4x² + 2x + 1'], answer: '4x² + 4x + 1', explanation: '(2x)² + 2×(2x)×1 + 1² = 4x² + 4x + 1.', hint: 'a = 2x, b = 1 dans (a+b)².', brevetTip: 'Pour (a+b)² pense a² + 2ab + b² : le double produit 2ab est souvent oublié.' },
    { id: 'm3-6-0-2', type: 'completer', question: 'Factorise : x² - 16 = (x - 4)(x + ___) (en chiffres).', answer: '4', explanation: 'x² − 16 = x² − 4² = (x − 4)(x + 4).', hint: '16 = 4².' },
    { id: 'm3-6-0-3', type: 'vrai_faux', question: 'On a (x - 1)(x + 1) = x² - 1.', answer: 'vrai', explanation: 'Différence de deux carrés : x² − 1² = x² − 1.', hint: 'a² − b².' },
  ]},
  '6-1': { exercises: [
    { id: 'm3-6-1-1', type: 'qcm', question: 'Résous : 4x - 3 = 2x + 7. x = ?', options: ['5', '2', '10', '4'], answer: '5', explanation: '4x − 2x = 7 + 3 → 2x = 10 → x = 5.', hint: 'Regroupe les x d\'un côté.', brevetTip: 'Regroupe les x d\'un côté, les nombres de l\'autre, puis divise.' },
    { id: 'm3-6-1-2', type: 'completer', question: 'Solutions de x(x - 3) = 0 : x = 0 ou x = ___ (en chiffres).', answer: '3', explanation: 'x = 0 ou x − 3 = 0 → x = 3.', hint: 'Chaque facteur = 0.' },
    { id: 'm3-6-1-3', type: 'vrai_faux', question: 'L\'équation 2(x + 1) = 2x + 2 est vraie pour toute valeur de x.', answer: 'vrai', explanation: '2(x + 1) = 2x + 2 : les deux membres sont identiques, toujours vrai.', hint: 'Développe le membre de gauche.' },
  ]},
  '6-2': { exercises: [
    { id: 'm3-6-2-1', type: 'qcm', question: 'Triangle rectangle, côtés de l\'angle droit 8 et 15. Hypoténuse ?', options: ['17', '23', '13', '16'], answer: '17', explanation: '8² + 15² = 64 + 225 = 289, et √289 = 17.', hint: '64 + 225 = 289.', brevetTip: 'Justifie que le triangle est rectangle avant d\'appliquer Pythagore.' },
    { id: 'm3-6-2-2', type: 'completer', question: 'cos(angle) avec adjacent 5 et hypoténuse 10 = ___ (décimal).', answer: '0,5', explanation: 'cos = 5 ÷ 10 = 0,5.', hint: '5 ÷ 10.' },
    { id: 'm3-6-2-3', type: 'vrai_faux', question: 'Le théorème de Thalès s\'utilise avec des droites parallèles.', answer: 'vrai', explanation: 'Thalès repose sur des droites parallèles.', hint: 'Parallèles.' },
  ]},
  '6-3': { exercises: [
    { id: 'm3-6-3-1', type: 'qcm', question: 'Pour f(x) = 3x - 2, f(4) = ?', options: ['10', '14', '12', '1'], answer: '10', explanation: 'f(4) = 3 × 4 − 2 = 12 − 2 = 10.', hint: 'Remplace x par 4.', brevetTip: 'Pour une fonction linéaire f(x)=ax, on trouve a avec a = f(x) ÷ x.' },
    { id: 'm3-6-3-2', type: 'completer', question: 'Fonction linéaire f(x) = ax avec f(3) = 12. a = ___ (en chiffres).', answer: '4', explanation: 'a = 12 ÷ 3 = 4.', hint: 'a = f(x) ÷ x.' },
    { id: 'm3-6-3-3', type: 'vrai_faux', question: 'Une fonction affine est représentée par une droite.', answer: 'vrai', explanation: 'Le graphique de f(x) = ax + b est une droite.', hint: 'Toujours une droite.' },
  ]},
  '6-4': { exercises: [
    { id: 'm3-6-4-1', type: 'qcm', question: 'Moyenne de 6, 10, 14, 10 ?', options: ['10', '12', '8', '40'], answer: '10', explanation: '(6 + 10 + 14 + 10) ÷ 4 = 40 ÷ 4 = 10.', hint: 'Somme ÷ 4.', brevetTip: 'Vérifie si on demande la moyenne, la médiane ou l\'étendue : ce sont trois notions différentes.' },
    { id: 'm3-6-4-2', type: 'completer', question: 'Dé à 6 faces : P(obtenir 5) = 1/___ (en chiffres).', answer: '6', explanation: '1 cas favorable sur 6 : 1/6.', hint: '1 face sur 6.' },
    { id: 'm3-6-4-3', type: 'vrai_faux', question: 'L\'étendue d\'une série est la différence entre la plus grande et la plus petite valeur.', answer: 'vrai', explanation: 'Étendue = max − min.', hint: 'Max − min.' },
  ]},
  // ── S8 — Grand Brevet Blanc final ──
  '7-0': { exercises: [
    { id: 'm3-7-0-1', type: 'qcm', question: 'Calcule : (-3)² = ?', options: ['9', '-9', '6', '-6'], answer: '9', explanation: '(−3)² = (−3) × (−3) = 9.', hint: 'Deux négatifs → positif.', brevetTip: '(−3)² = 9 mais −3² = −9 : les parenthèses changent tout !' },
    { id: 'm3-7-0-2', type: 'completer', question: 'Le PGCD de 24 et 36 est ___ (en chiffres).', answer: '12', explanation: '24 = 2³×3, 36 = 2²×3². Communs : 2² × 3 = 12.', hint: 'Facteurs communs 2² et 3.' },
    { id: 'm3-7-0-3', type: 'vrai_faux', question: 'Développer (x + 4)(x - 4) donne x² - 16.', answer: 'vrai', explanation: 'Différence de deux carrés : x² − 4² = x² − 16.', hint: 'a² − b².' },
  ]},
  '7-1': { exercises: [
    { id: 'm3-7-1-1', type: 'qcm', question: 'Triangle rectangle de côtés 7 et 24. Hypoténuse ?', options: ['25', '31', '23', '26'], answer: '25', explanation: '7² + 24² = 49 + 576 = 625, et √625 = 25.', hint: '49 + 576 = 625.', brevetTip: 'Repère l\'angle droit et l\'hypoténuse sur la figure avant de calculer.' },
    { id: 'm3-7-1-2', type: 'completer', question: 'sin(angle) avec opposé 6 et hypoténuse 10 = ___ (décimal).', answer: '0,6', explanation: 'sin = opposé ÷ hypoténuse = 6 ÷ 10 = 0,6.', hint: '6 ÷ 10.' },
    { id: 'm3-7-1-3', type: 'vrai_faux', question: 'Deux triangles semblables ont leurs angles égaux.', answer: 'vrai', explanation: 'Des triangles semblables ont les mêmes angles (côtés proportionnels).', hint: 'Mêmes angles.' },
  ]},
  '7-2': { exercises: [
    { id: 'm3-7-2-1', type: 'qcm', question: 'Pour f(x) = 2x + 5, f(3) = ?', options: ['11', '6', '10', '8'], answer: '11', explanation: 'f(3) = 2 × 3 + 5 = 6 + 5 = 11.', hint: 'Remplace x par 3.', brevetTip: 'Fonction linéaire = proportionnalité = droite passant par l\'origine.' },
    { id: 'm3-7-2-2', type: 'completer', question: 'Une augmentation de 20 % sur 50 € donne ___ € (en chiffres).', answer: '60', explanation: '20 % de 50 = 10, donc 50 + 10 = 60 €.', hint: '20 % de 50 = 10.' },
    { id: 'm3-7-2-3', type: 'vrai_faux', question: 'Le graphique d\'une fonction linéaire passe par l\'origine.', answer: 'vrai', explanation: 'f(x) = ax donne f(0) = 0 : passe par (0 ; 0).', hint: 'f(0) = 0.' },
  ]},
  '7-3': { exercises: [
    { id: 'm3-7-3-1', type: 'qcm', question: 'Dé à 6 faces : P(obtenir un nombre > 4, soit 5 ou 6) = ?', options: ['1/3', '1/2', '2/3', '1/6'], answer: '1/3', explanation: '2 cas favorables (5 et 6) sur 6 : 2/6 = 1/3.', hint: 'Deux faces sur six.', brevetTip: 'Ordonne toujours la série avant de chercher la médiane.' },
    { id: 'm3-7-3-2', type: 'completer', question: 'Médiane de 4, 7, 9, 12, 15 = ___ (en chiffres).', answer: '9', explanation: 'Série ordonnée de 5 valeurs : la 3e est 9.', hint: 'Valeur du milieu.' },
    { id: 'm3-7-3-3', type: 'vrai_faux', question: 'Une probabilité est toujours comprise entre 0 et 1.', answer: 'vrai', explanation: 'De 0 (impossible) à 1 (certain).', hint: 'Entre impossible et certain.' },
  ]},
  '7-4': { exercises: [
    { id: 'm3-7-4-1', type: 'qcm', question: 'Factorise : x² - 49 = ?', options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)'], answer: '(x - 7)(x + 7)', explanation: 'x² − 49 = x² − 7² = (x − 7)(x + 7).', hint: '49 = 7². Différence de carrés.', brevetTip: 'Lis tout le sujet avant de commencer et gère ton temps (~1,5 min par question ici).' },
    { id: 'm3-7-4-2', type: 'qcm', question: 'Résous : 3x + 4 = 19. x = ?', options: ['5', '7', '15', '6'], answer: '5', explanation: '3x = 15 → x = 5.', hint: 'Enlève 4, divise par 3.' },
    { id: 'm3-7-4-3', type: 'qcm', question: 'Triangle rectangle de côtés 9 et 12. Hypoténuse ?', options: ['15', '21', '16', '13'], answer: '15', explanation: '9² + 12² = 81 + 144 = 225, et √225 = 15.', hint: '81 + 144 = 225.' },
    { id: 'm3-7-4-4', type: 'qcm', question: 'Pour f(x) = 5x, f(6) = ?', options: ['30', '11', '56', '25'], answer: '30', explanation: 'f(6) = 5 × 6 = 30.', hint: '5 × 6.' },
    { id: 'm3-7-4-5', type: 'vrai_faux', question: 'Le PGCD de 15 et 25 est 5.', answer: 'vrai', explanation: '15 = 3×5, 25 = 5². Facteur commun : 5.', hint: 'Facteur commun 5.' },
  ]},
};

// Exercices d'entraînement générés (objectif : 10 à 15 questions par jour)
for (const [k, extra] of Object.entries(DRILLS)) {
  if (curriculum[k]) curriculum[k].exercises.push(...extra);
}

export const meta = {
  id: '3eme',
  title: 'Mathématiques 3e',
  description: 'Maths — Révisions Été 2026 (préparation brevet)',
  pdfFile: '/cahier-maths-3eme.pdf',
  totalWeeks: 8,
  totalDays: 40,
};

export function buildSeedJours() { return buildMathsJours(weeks, curriculum, meta.pdfFile, MATHS_PDF_PAGES['3eme']); }
export function buildSeedSemaines() { return buildMathsSemaines(weeks); }

export default { meta, weeks, curriculum };
