// Mathématiques — 6ème (entrée au collège)
// Programme complet : 8 semaines × 5 jours. Types : qcm | vrai_faux | completer.
import { assembleWeeks } from './shared.js';
import { buildMathsJours, buildMathsSemaines } from './seedBuilder.js';
import { MATHS_PDF_PAGES } from './pdfPages.js';
import { DRILLS } from './drills6.js';

const weekDefs = [
  // ── S1 — Nombres entiers et décimaux ──────────────────────────
  { num: 1, theme: 'Nombres entiers et décimaux', emoji: '🔢', days: [
    { domaine: 'nombres', type: 'lecon', lecon: 'Lire et écrire les nombres entiers',
      detail: 'La numération de position : chaque chiffre a une valeur selon sa place (unités, dizaines, centaines, milliers…). Sais écrire un nombre en chiffres et en lettres.',
      tip: 'Regroupe les chiffres par tranches de 3 en partant de la droite pour lire les grands nombres.' },
    { domaine: 'nombres', type: 'lecon', lecon: 'Comparer et ranger les entiers',
      detail: 'Comparer deux nombres (< , > , =), ranger dans l\'ordre croissant (du plus petit au plus grand) ou décroissant.',
      tip: 'Le nombre qui a le plus de chiffres est le plus grand. À nombre de chiffres égal, on compare de gauche à droite.' },
    { domaine: 'nombres', type: 'lecon', lecon: 'Les nombres décimaux',
      detail: 'Partie entière et partie décimale séparées par une virgule. Dixièmes, centièmes, millièmes.',
      tip: 'Après la virgule : 1er rang = dixièmes, 2e = centièmes, 3e = millièmes.' },
    { domaine: 'nombres', type: 'lecon', lecon: 'Comparer les décimaux',
      detail: 'On compare d\'abord la partie entière, puis les décimales rang par rang. Attention : 0,5 = 0,50.',
      tip: 'Complète avec des zéros pour avoir le même nombre de décimales, puis compare.' },
    { domaine: 'nombres', type: 'exo', lecon: 'Demi-droite graduée et encadrement',
      detail: 'Placer un nombre sur une demi-droite graduée et l\'encadrer entre deux entiers consécutifs.',
      tip: 'Encadrer 6,8 : le plus proche en dessous est 6, au-dessus 7 → 6 < 6,8 < 7.' },
  ]},
  // ── S2 — Opérations sur les nombres ────────────────────────────
  { num: 2, theme: 'Additionner, soustraire, multiplier', emoji: '➕', days: [
    { domaine: 'calcul', type: 'lecon', lecon: 'Addition et soustraction',
      detail: 'Poser et effectuer additions et soustractions, avec des entiers et des décimaux (bien aligner les virgules).',
      tip: 'Aligne toujours les virgules les unes sous les autres avant de calculer.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'La multiplication',
      detail: 'Multiplier des entiers, tables de multiplication, propriété de commutativité (l\'ordre ne change pas le produit).',
      tip: 'Connais tes tables par cœur : c\'est la base de tout le calcul.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Multiplier / diviser par 10, 100, 1000',
      detail: 'Décaler la virgule vers la droite (×) ou vers la gauche (÷) d\'autant de rangs qu\'il y a de zéros.',
      tip: '×100 → la virgule se déplace de 2 rangs vers la droite.' },
    { domaine: 'calcul', type: 'exo', lecon: 'Ordre de grandeur et arrondis',
      detail: 'Estimer un résultat en arrondissant les nombres, arrondir à la dizaine, centaine…',
      tip: 'Pour arrondir à la centaine : regarde le chiffre des dizaines. 5 ou plus → on arrondit au-dessus.' },
    { domaine: 'calcul', type: 'exo', lecon: 'Résoudre des problèmes',
      detail: 'Choisir la bonne opération, poser le calcul et vérifier que la réponse a du sens.',
      tip: 'Relis la question à la fin : ta réponse répond-elle vraiment à ce qui est demandé ?' },
  ]},
  // ── S3 — Division et divisibilité ──────────────────────────────
  { num: 3, theme: 'Division et divisibilité', emoji: '➗', days: [
    { domaine: 'calcul', type: 'lecon', lecon: 'La division euclidienne',
      detail: 'Dividende = diviseur × quotient + reste, avec un reste plus petit que le diviseur.',
      tip: 'Vérifie toujours : le reste doit être STRICTEMENT plus petit que le diviseur.' },
    { domaine: 'nombres', type: 'repos', lecon: '🎆 14 juillet — Multiples et diviseurs',
      detail: 'Journée allégée. Un multiple de 7 s\'obtient en multipliant 7 par un entier. Un diviseur divise sans reste.',
      tip: 'Bonne fête nationale ! Deux petits exercices aujourd\'hui, c\'est tout 🎆' },
    { domaine: 'nombres', type: 'lecon', lecon: 'Critères de divisibilité',
      detail: 'Par 2 (chiffre pair), par 5 (finit par 0 ou 5), par 10 (finit par 0), par 3 et 9 (somme des chiffres).',
      tip: 'Divisible par 3 : additionne tous les chiffres. Si la somme est dans la table de 3, c\'est bon.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'La division décimale',
      detail: 'Poursuivre la division au-delà de la virgule pour obtenir un quotient décimal.',
      tip: 'Quand tu « descends » la virgule, place-la aussi au quotient au même moment.' },
    { domaine: 'calcul', type: 'exo', lecon: 'Problèmes de partage',
      detail: 'Partages équitables, groupements : reconnaître quand utiliser la division.',
      tip: 'Partage équitable = division. Le reste indique ce qu\'il « reste » après le partage.' },
  ]},
  // ── S4 — Les fractions ─────────────────────────────────────────
  { num: 4, theme: 'Les fractions', emoji: '🍕', days: [
    { domaine: 'fractions', type: 'lecon', lecon: 'Comprendre une fraction',
      detail: 'Numérateur (parts prises) sur dénominateur (parts égales du tout). Fraction = partage.',
      tip: 'Le dénominateur est en BAS : c\'est le nombre total de parts égales.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Fractions et demi-droite',
      detail: 'Placer une fraction sur une demi-droite graduée, fractions supérieures ou inférieures à 1.',
      tip: 'Si numérateur < dénominateur → la fraction est plus petite que 1.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Fractions égales et simplification',
      detail: 'Multiplier ou diviser numérateur ET dénominateur par un même nombre donne une fraction égale.',
      tip: 'Simplifier = diviser le haut et le bas par le même nombre.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Fraction d\'une quantité',
      detail: 'Calculer « les 3/5 de 30 » : diviser par le dénominateur puis multiplier par le numérateur.',
      tip: 'Les 3/5 de 30 : 30 ÷ 5 = 6, puis 6 × 3 = 18.' },
    { domaine: 'fractions', type: 'exo', lecon: 'Comparer des fractions',
      detail: 'Comparer deux fractions de même dénominateur : la plus grande a le plus grand numérateur.',
      tip: 'Même dénominateur ? Il suffit de comparer les numérateurs.' },
  ]},
  // ── S5 — Proportionnalité et données ───────────────────────────
  { num: 5, theme: 'Proportionnalité et données', emoji: '📊', days: [
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'La proportionnalité',
      detail: 'Reconnaître une situation proportionnelle, compléter un tableau en utilisant le coefficient.',
      tip: 'Cherche le prix (ou la valeur) d\'UNE unité : tout devient facile ensuite.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Les pourcentages simples',
      detail: 'Calculer 50 % (moitié), 25 % (quart), 10 % (÷10) d\'une quantité.',
      tip: '10 % d\'un nombre = ce nombre divisé par 10.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Vitesse et distance',
      detail: 'Lien entre distance, vitesse et durée dans des cas simples (initiation).',
      tip: 'À vitesse constante, en 2 h on parcourt 2 fois la distance d\'1 h.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Lire un tableau, un graphique',
      detail: 'Extraire des informations d\'un tableau ou d\'un diagramme en barres.',
      tip: 'Repère bien le titre et les légendes avant de lire les valeurs.' },
    { domaine: 'donnees', type: 'exo', lecon: 'La moyenne',
      detail: 'Calculer une moyenne : additionner toutes les valeurs puis diviser par leur nombre.',
      tip: 'Moyenne = somme des valeurs ÷ nombre de valeurs.' },
  ]},
  // ── S6 — Géométrie : droites et cercles ────────────────────────
  { num: 6, theme: 'Droites, cercles et constructions', emoji: '📐', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Points, droites, segments',
      detail: 'Vocabulaire et notations : droite (AB), segment [AB], demi-droite [AB). Point, appartenance.',
      tip: 'Crochets [ ] = segment (limité). Parenthèses ( ) = droite (illimitée).' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Perpendiculaires et parallèles',
      detail: 'Droites perpendiculaires (angle droit, symbole ⊥) et parallèles (jamais sécantes, symbole //).',
      tip: 'Perpendiculaires = elles se croisent en formant un angle droit (90°).' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le cercle',
      detail: 'Centre, rayon, diamètre (diamètre = 2 × rayon), corde. Tracer un cercle au compas.',
      tip: 'Diamètre = double du rayon. Rayon = moitié du diamètre.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Programme de construction',
      detail: 'Utiliser règle, équerre, compas et rapporteur pour reproduire une figure.',
      tip: 'L\'équerre sert à tracer et vérifier les angles droits.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Alignement et appartenance',
      detail: 'Points alignés (sur une même droite), symboles ∈ (appartient) et ∉ (n\'appartient pas).',
      tip: 'Trois points alignés = ils sont tous sur une même droite.' },
  ]},
  // ── S7 — Angles et symétrie ────────────────────────────────────
  { num: 7, theme: 'Angles et symétrie axiale', emoji: '🔺', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Vocabulaire des angles',
      detail: 'Angle aigu (< 90°), droit (= 90°), obtus (entre 90° et 180°), plat (= 180°).',
      tip: 'Aigu = « pointu » et petit. Obtus = « ouvert » et grand.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Mesurer et tracer un angle',
      detail: 'Utiliser le rapporteur pour mesurer et construire un angle en degrés.',
      tip: 'Place bien le centre du rapporteur sur le sommet de l\'angle.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'La symétrie axiale',
      detail: 'Symétrie par rapport à une droite (l\'axe). Figure et image superposables par pliage.',
      tip: 'Plie sur l\'axe : les deux moitiés doivent se superposer exactement.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Axes de symétrie d\'une figure',
      detail: 'Trouver le(s) axe(s) de symétrie : carré (4), rectangle (2), cercle (infinité).',
      tip: 'Un carré a 4 axes : 2 par les milieux des côtés, 2 par les diagonales.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Construire un symétrique',
      detail: 'La symétrie axiale conserve les longueurs, les angles et les aires.',
      tip: 'La symétrie ne change pas les mesures : longueurs et angles sont conservés.' },
  ]},
  // ── S8 — Grandeurs et bilan final ──────────────────────────────
  { num: 8, theme: 'Périmètres, aires et bilan final', emoji: '🏆', days: [
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Le périmètre',
      detail: 'Périmètre = longueur du contour. Carré : 4 × côté. Rectangle : 2 × (L + l).',
      tip: 'Périmètre du rectangle = 2 × (Longueur + largeur).' },
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Le périmètre du cercle',
      detail: 'Circonférence = π × diamètre = 2 × π × rayon, avec π ≈ 3,14.',
      tip: 'Périmètre du cercle = π × diamètre.' },
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Aire du carré et du rectangle',
      detail: 'Aire du rectangle = Longueur × largeur. Aire du carré = côté × côté.',
      tip: 'L\'aire s\'exprime en unités carrées : cm², m²…' },
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Aire du triangle et unités',
      detail: 'Aire du triangle = (base × hauteur) ÷ 2. Conversions : 1 m² = 10 000 cm².',
      tip: 'N\'oublie pas de diviser par 2 pour l\'aire d\'un triangle !' },
    { domaine: 'grandeurs', type: 'controle', lecon: '🏆 Grand Contrôle Final (/100)',
      detail: 'Bilan de tout le programme de 6ème : nombres, opérations, fractions, proportionnalité, géométrie et grandeurs.',
      tip: '🌟 Prends ton temps, relis chaque énoncé. Tu as travaillé tout l\'été, montre ce que tu sais !' },
  ]},
];

export const weeks = assembleWeeks(weekDefs);

export const curriculum = {
  // ── S1 ──
  '0-0': { exercises: [
    { id: 'm6-0-0-1', type: 'qcm', question: 'Dans le nombre 45 208, quel est le chiffre des centaines ?', options: ['5', '2', '0', '4'], answer: '2', explanation: 'De droite à gauche : 8 (unités), 0 (dizaines), 2 (centaines), 5 (milliers), 4 (dizaines de mille). Le chiffre des centaines est donc 2.', hint: 'Compte les rangs à partir de la droite : unités, dizaines, centaines.' },
    { id: 'm6-0-0-2', type: 'vrai_faux', question: 'Le nombre « trois-mille-quarante » s\'écrit 3 040.', answer: 'vrai', explanation: 'Trois-mille = 3 000, quarante = 40. Le rang des centaines est vide → on met un 0. Donc 3 040.', hint: 'Attention au 0 des centaines qu\'on n\'entend pas.' },
    { id: 'm6-0-0-3', type: 'completer', question: 'Écris en chiffres « douze-mille-cinq-cents » (sans espace).', answer: '12500', explanation: 'Douze-mille = 12 000, cinq-cents = 500. Total : 12 500.', hint: 'Douze-mille puis cinq-cents.' },
  ]},
  '0-1': { exercises: [
    { id: 'm6-0-1-1', type: 'qcm', question: 'Quel signe complète : 7 809 ___ 7 890 ?', options: ['<', '>', '=', '≥'], answer: '<', explanation: 'Même nombre de chiffres. On compare de gauche à droite : 7=7, 8=8, puis 0 < 9. Donc 7 809 < 7 890.', hint: 'Compare chiffre par chiffre en partant de la gauche.' },
    { id: 'm6-0-1-2', type: 'vrai_faux', question: 'On a 10 001 > 9 999.', answer: 'vrai', explanation: '10 001 a 5 chiffres, 9 999 en a 4. Le nombre qui a le plus de chiffres est le plus grand.', hint: 'Compte le nombre de chiffres.' },
    { id: 'm6-0-1-3', type: 'completer', question: 'Parmi 302 ; 320 ; 230, le plus petit est ___.', answer: '230', explanation: 'On compare le chiffre des centaines : 2 < 3. Donc 230 est le plus petit.', hint: 'Regarde d\'abord le chiffre des centaines.' },
  ]},
  '0-2': { exercises: [
    { id: 'm6-0-2-1', type: 'qcm', question: 'Comment lit-on 3,07 ?', options: ['Trois virgule sept', 'Trois unités et sept centièmes', 'Trois unités et sept dixièmes', 'Trois-cent-sept'], answer: 'Trois unités et sept centièmes', explanation: '3,07 : partie entière 3 unités. Après la virgule, le 0 est aux dixièmes et le 7 aux centièmes.', hint: '2e chiffre après la virgule = centièmes.' },
    { id: 'm6-0-2-2', type: 'completer', question: 'Le chiffre des dixièmes de 8,42 est ___.', answer: '4', explanation: 'Juste après la virgule vient le rang des dixièmes : c\'est le 4. Le 2 est aux centièmes.', hint: '1er chiffre après la virgule.' },
    { id: 'm6-0-2-3', type: 'vrai_faux', question: 'On a 5,6 = 5,60.', answer: 'vrai', explanation: 'Ajouter un zéro à la fin de la partie décimale ne change pas le nombre : 5,6 = 5,60 = 5,600.', hint: 'Un zéro final après la virgule ne change rien.' },
  ]},
  '0-3': { exercises: [
    { id: 'm6-0-3-1', type: 'qcm', question: 'Quel est le plus grand ? 0,5 ; 0,45 ; 0,09', options: ['0,5', '0,45', '0,09', 'Ils sont égaux'], answer: '0,5', explanation: 'On écrit tout avec 2 décimales : 0,50 ; 0,45 ; 0,09. Le plus grand est 0,50, soit 0,5.', hint: 'Complète avec des zéros : 0,5 = 0,50.' },
    { id: 'm6-0-3-2', type: 'vrai_faux', question: 'On a 0,7 < 0,68.', answer: 'faux', explanation: '0,7 = 0,70 et 0,70 > 0,68. L\'affirmation est donc fausse.', hint: 'Écris 0,7 comme 0,70 avant de comparer.' },
    { id: 'm6-0-3-3', type: 'completer', question: 'Complète avec < ou > : 2,3 ___ 2,29', answer: '>', explanation: '2,3 = 2,30 et 2,30 > 2,29. Donc 2,3 > 2,29.', hint: '2,3 vaut 2,30.' },
  ]},
  '0-4': { exercises: [
    { id: 'm6-0-4-1', type: 'qcm', question: 'Entre quels entiers consécutifs se trouve 6,8 ?', options: ['5 et 6', '6 et 7', '7 et 8', '8 et 9'], answer: '6 et 7', explanation: 'La partie entière de 6,8 est 6, donc 6 < 6,8 < 7.', hint: 'Regarde la partie entière.' },
    { id: 'm6-0-4-2', type: 'completer', question: 'Complète l\'encadrement : 4 < 4,3 < ___', answer: '5', explanation: '4,3 est compris entre 4 et l\'entier suivant, 5. Donc 4 < 4,3 < 5.', hint: 'Quel est l\'entier juste au-dessus de 4 ?' },
    { id: 'm6-0-4-3', type: 'vrai_faux', question: 'Sur une demi-droite graduée, 3,5 se place au milieu de 3 et 4.', answer: 'vrai', explanation: '3,5 = 3 + 0,5, soit exactement à mi-chemin entre 3 et 4.', hint: '0,5 c\'est un demi.' },
  ]},
  // ── S2 ──
  '1-0': { exercises: [
    { id: 'm6-1-0-1', type: 'completer', question: 'Calcule : 348 + 265 = ___', answer: '613', explanation: '8+5=13 (je pose 3, retenue 1) ; 4+6+1=11 (pose 1, retenue 1) ; 3+2+1=6. Résultat : 613.', hint: 'Additionne colonne par colonne en gérant les retenues.' },
    { id: 'm6-1-0-2', type: 'completer', question: 'Calcule : 802 − 379 = ___', answer: '423', explanation: '802 − 379 = 423. Vérification : 423 + 379 = 802.', hint: 'Vérifie en ajoutant ta réponse à 379.' },
    { id: 'm6-1-0-3', type: 'qcm', question: 'Calcule : 12,5 + 3,75 = ?', options: ['16,25', '15,25', '16,20', '15,75'], answer: '16,25', explanation: 'On aligne les virgules : 12,50 + 3,75 = 16,25.', hint: 'Écris 12,5 comme 12,50 pour aligner les décimales.' },
  ]},
  '1-1': { exercises: [
    { id: 'm6-1-1-1', type: 'completer', question: 'Calcule : 24 × 6 = ___', answer: '144', explanation: '24 × 6 = (20 × 6) + (4 × 6) = 120 + 24 = 144.', hint: 'Décompose : 20×6 puis 4×6.' },
    { id: 'm6-1-1-2', type: 'qcm', question: 'Calcule : 125 × 8 = ?', options: ['1000', '900', '1025', '800'], answer: '1000', explanation: '125 × 8 = 1000 (astuce : 125 × 8 = 1000, car 1000 ÷ 8 = 125).', hint: '125 × 8 est un résultat « rond » à connaître.' },
    { id: 'm6-1-1-3', type: 'vrai_faux', question: 'Un produit ne change pas si on change l\'ordre des facteurs.', answer: 'vrai', explanation: 'C\'est la commutativité : 4 × 7 = 7 × 4 = 28.', hint: 'Essaie 3 × 5 et 5 × 3.' },
  ]},
  '1-2': { exercises: [
    { id: 'm6-1-2-1', type: 'qcm', question: 'Calcule : 3,4 × 100 = ?', options: ['340', '34', '3400', '0,34'], answer: '340', explanation: '×100 : la virgule se déplace de 2 rangs vers la droite. 3,4 → 340.', hint: '×100 = 2 rangs vers la droite.' },
    { id: 'm6-1-2-2', type: 'completer', question: 'Calcule : 52 ÷ 10 = ___', answer: '5,2', explanation: '÷10 : la virgule se déplace de 1 rang vers la gauche. 52 → 5,2.', hint: '÷10 = 1 rang vers la gauche.' },
    { id: 'm6-1-2-3', type: 'vrai_faux', question: 'On a 0,6 × 1000 = 600.', answer: 'vrai', explanation: '×1000 : 3 rangs vers la droite. 0,6 → 600.', hint: 'Compte les zéros : 1000 → 3 rangs.' },
  ]},
  '1-3': { exercises: [
    { id: 'm6-1-3-1', type: 'qcm', question: 'L\'ordre de grandeur de 297 × 4 est proche de :', options: ['1200', '800', '2000', '300'], answer: '1200', explanation: 'On arrondit 297 à 300, puis 300 × 4 = 1200.', hint: 'Arrondis 297 à la centaine.' },
    { id: 'm6-1-3-2', type: 'vrai_faux', question: 'Pour estimer 613 + 388, on peut calculer 600 + 400 = 1000.', answer: 'vrai', explanation: 'En arrondissant à la centaine : 613 ≈ 600 et 388 ≈ 400, donc ≈ 1000.', hint: 'Arrondis chaque nombre à la centaine.' },
    { id: 'm6-1-3-3', type: 'completer', question: 'Arrondis 6 842 à la centaine : ___', answer: '6800', explanation: 'Chiffre des dizaines : 4 (< 5), on arrondit en dessous → 6 800.', hint: 'Regarde le chiffre des dizaines (4).' },
  ]},
  '1-4': { exercises: [
    { id: 'm6-1-4-1', type: 'qcm', question: 'Un carnet coûte 3 €. Combien coûtent 7 carnets ?', options: ['21 €', '10 €', '24 €', '14 €'], answer: '21 €', explanation: '7 × 3 = 21 €.', hint: 'C\'est une multiplication.' },
    { id: 'm6-1-4-2', type: 'completer', question: 'Léa a 50 €. Elle achète un jeu à 32 €. Il lui reste ___ € (en chiffres).', answer: '18', explanation: '50 − 32 = 18 €.', hint: 'C\'est une soustraction.' },
    { id: 'm6-1-4-3', type: 'qcm', question: 'Un bus a 48 places. Combien d\'élèves 3 bus transportent-ils au maximum ?', options: ['144', '96', '51', '148'], answer: '144', explanation: '48 × 3 = 144 places.', hint: '48 × 3.' },
  ]},
  // ── S3 ──
  '2-0': { exercises: [
    { id: 'm6-2-0-1', type: 'qcm', question: 'Dans la division euclidienne de 47 par 5, le quotient est :', options: ['9', '8', '10', '7'], answer: '9', explanation: '5 × 9 = 45, et 47 − 45 = 2 (reste < 5). Donc quotient 9, reste 2.', hint: 'Cherche le plus grand multiple de 5 sous 47.' },
    { id: 'm6-2-0-2', type: 'completer', question: 'Complète : 47 = 5 × 9 + ___ (reste)', answer: '2', explanation: '5 × 9 = 45, donc 47 − 45 = 2. Le reste est 2.', hint: '47 − 45 = ?' },
    { id: 'm6-2-0-3', type: 'vrai_faux', question: 'Dans une division euclidienne, le reste est toujours plus petit que le diviseur.', answer: 'vrai', explanation: 'Si le reste était ≥ au diviseur, on pourrait encore diviser. Le reste est donc strictement inférieur au diviseur.', hint: 'Sinon on pourrait continuer à diviser.' },
  ]},
  '2-1': { exercises: [
    { id: 'm6-2-1-1', type: 'qcm', question: 'Lequel est un multiple de 7 ?', options: ['42', '50', '30', '16'], answer: '42', explanation: '42 = 7 × 6. Les autres ne sont pas dans la table de 7.', hint: 'Récite la table de 7.' },
    { id: 'm6-2-1-2', type: 'vrai_faux', question: '12 est un diviseur de 60.', answer: 'vrai', explanation: '60 ÷ 12 = 5, division exacte (reste 0). Donc 12 divise 60.', hint: 'Est-ce que 60 ÷ 12 tombe juste ?' },
  ]},
  '2-2': { exercises: [
    { id: 'm6-2-2-1', type: 'qcm', question: 'Lequel est divisible par 3 ?', options: ['124', '231', '142', '170'], answer: '231', explanation: 'Somme des chiffres de 231 : 2+3+1 = 6, divisible par 3. Donc 231 l\'est aussi.', hint: 'Additionne les chiffres de chaque nombre.' },
    { id: 'm6-2-2-2', type: 'vrai_faux', question: '738 est divisible par 9.', answer: 'vrai', explanation: 'Somme des chiffres : 7+3+8 = 18, divisible par 9. Donc 738 l\'est.', hint: 'Somme des chiffres divisible par 9 ?' },
    { id: 'm6-2-2-3', type: 'completer', question: 'Un nombre est divisible par 5 s\'il se termine par 0 ou par ___.', answer: '5', explanation: 'Les multiples de 5 finissent tous par 0 ou 5.', hint: '5, 10, 15, 20…' },
  ]},
  '2-3': { exercises: [
    { id: 'm6-2-3-1', type: 'qcm', question: 'Calcule : 13 ÷ 4 = ?', options: ['3,25', '3,4', '3,5', '4,25'], answer: '3,25', explanation: '13 ÷ 4 = 3,25 (car 4 × 3,25 = 13).', hint: 'Vérifie avec 4 × ta réponse.' },
    { id: 'm6-2-3-2', type: 'completer', question: 'Calcule : 9 ÷ 2 = ___', answer: '4,5', explanation: '9 ÷ 2 = 4,5 (car 2 × 4,5 = 9).', hint: 'La moitié de 9.' },
    { id: 'm6-2-3-3', type: 'vrai_faux', question: 'On a 6 ÷ 4 = 1,5.', answer: 'vrai', explanation: '6 ÷ 4 = 1,5 (car 4 × 1,5 = 6).', hint: 'Vérifie : 4 × 1,5.' },
  ]},
  '2-4': { exercises: [
    { id: 'm6-2-4-1', type: 'qcm', question: 'On partage 96 bonbons entre 8 enfants. Chaque enfant en reçoit :', options: ['12', '11', '13', '8'], answer: '12', explanation: '96 ÷ 8 = 12.', hint: 'C\'est une division.' },
    { id: 'm6-2-4-2', type: 'completer', question: 'On range 100 livres par étagères de 12. Combien d\'étagères sont complètes ? ___', answer: '8', explanation: '100 ÷ 12 = 8 reste 4. Il y a 8 étagères complètes (et 4 livres restants).', hint: 'Combien de fois 12 dans 100 ?' },
    { id: 'm6-2-4-3', type: 'qcm', question: 'Un ruban de 7,5 m est coupé en 3 morceaux égaux. Chaque morceau mesure :', options: ['2,5 m', '2 m', '3,5 m', '2,25 m'], answer: '2,5 m', explanation: '7,5 ÷ 3 = 2,5 m.', hint: '7,5 ÷ 3.' },
  ]},
  // ── S4 ──
  '3-0': { exercises: [
    { id: 'm6-3-0-1', type: 'qcm', question: 'Quelle fraction représente 3 parts sur 8 ?', options: ['3/8', '8/3', '3/5', '5/8'], answer: '3/8', explanation: 'Le numérateur (parts prises) est 3, le dénominateur (parts totales) est 8 : 3/8.', hint: 'Parts prises sur parts totales.' },
    { id: 'm6-3-0-2', type: 'completer', question: 'Dans la fraction 5/9, le dénominateur est ___.', answer: '9', explanation: 'Le dénominateur est le nombre du bas : 9.', hint: 'C\'est le nombre du bas.' },
    { id: 'm6-3-0-3', type: 'vrai_faux', question: 'La fraction 4/4 est égale à 1.', answer: 'vrai', explanation: 'Prendre 4 parts sur 4, c\'est prendre le tout, donc 1.', hint: 'On prend toutes les parts.' },
  ]},
  '3-1': { exercises: [
    { id: 'm6-3-1-1', type: 'qcm', question: 'Quelle fraction est égale à un demi ?', options: ['2/4', '2/3', '1/3', '3/4'], answer: '2/4', explanation: '2/4 = 1/2 (on divise haut et bas par 2).', hint: 'Simplifie chaque fraction.' },
    { id: 'm6-3-1-2', type: 'vrai_faux', question: 'La fraction 7/2 est supérieure à 1.', answer: 'vrai', explanation: '7/2 = 3,5, qui est bien supérieur à 1 (numérateur > dénominateur).', hint: 'Numérateur plus grand que le dénominateur ?' },
    { id: 'm6-3-1-3', type: 'completer', question: 'Un demi + un demi = ___ (en entier).', answer: '1', explanation: '1/2 + 1/2 = 2/2 = 1.', hint: 'Deux moitiés font un tout.' },
  ]},
  '3-2': { exercises: [
    { id: 'm6-3-2-1', type: 'qcm', question: 'Quelle fraction est égale à 6/9 ?', options: ['2/3', '3/4', '1/2', '6/12'], answer: '2/3', explanation: 'On divise haut et bas par 3 : 6÷3 = 2 et 9÷3 = 3, donc 2/3.', hint: 'Divise par 3 en haut et en bas.' },
    { id: 'm6-3-2-2', type: 'completer', question: 'Simplifie 10/15 = ___ (ex : 2/3)', answer: '2/3', explanation: 'On divise par 5 : 10÷5 = 2 et 15÷5 = 3, donc 2/3.', hint: 'Divise par 5.' },
    { id: 'm6-3-2-3', type: 'vrai_faux', question: 'On a 3/6 = 1/2.', answer: 'vrai', explanation: '3/6 se simplifie en divisant par 3 : 1/2.', hint: 'Divise par 3.' },
  ]},
  '3-3': { exercises: [
    { id: 'm6-3-3-1', type: 'qcm', question: 'Combien vaut 1/4 de 20 ?', options: ['5', '4', '10', '8'], answer: '5', explanation: '1/4 de 20 = 20 ÷ 4 = 5.', hint: 'Divise 20 par 4.' },
    { id: 'm6-3-3-2', type: 'completer', question: 'Calcule les 3/5 de 30 : ___', answer: '18', explanation: '30 ÷ 5 = 6, puis 6 × 3 = 18.', hint: 'Divise par 5, multiplie par 3.' },
    { id: 'm6-3-3-3', type: 'qcm', question: 'La moitié de 50 est :', options: ['25', '20', '30', '15'], answer: '25', explanation: '50 ÷ 2 = 25.', hint: 'La moitié = ÷2.' },
  ]},
  '3-4': { exercises: [
    { id: 'm6-3-4-1', type: 'qcm', question: 'Quelle fraction est la plus grande : 3/7 ou 5/7 ?', options: ['3/7', '5/7', 'Elles sont égales', 'On ne peut pas savoir'], answer: '5/7', explanation: 'Même dénominateur (7) : la plus grande est celle avec le plus grand numérateur, donc 5/7.', hint: 'Compare les numérateurs.' },
    { id: 'm6-3-4-2', type: 'vrai_faux', question: 'Avec le même dénominateur, la plus grande fraction a le plus grand numérateur.', answer: 'vrai', explanation: 'Les parts ont la même taille : plus il y en a, plus la fraction est grande.', hint: 'Pense à des parts de même taille.' },
    { id: 'm6-3-4-3', type: 'completer', question: 'Complète avec < ou > : 2/9 ___ 7/9', answer: '<', explanation: 'Même dénominateur : 2 < 7, donc 2/9 < 7/9.', hint: 'Compare 2 et 7.' },
  ]},
  // ── S5 ──
  '4-0': { exercises: [
    { id: 'm6-4-0-1', type: 'qcm', question: '3 stylos coûtent 6 €. Combien coûtent 5 stylos (prix proportionnel) ?', options: ['10 €', '8 €', '11 €', '9 €'], answer: '10 €', explanation: '1 stylo = 6 ÷ 3 = 2 €. Donc 5 stylos = 5 × 2 = 10 €.', hint: 'Cherche d\'abord le prix d\'un seul stylo.' },
    { id: 'm6-4-0-2', type: 'completer', question: 'Si 2 kg coûtent 4 €, alors 1 kg coûte ___ € (en chiffres).', answer: '2', explanation: '4 ÷ 2 = 2 € le kilo.', hint: 'Divise par 2.' },
    { id: 'm6-4-0-3', type: 'vrai_faux', question: 'Dans un tableau de proportionnalité, on passe d\'une ligne à l\'autre en multipliant par un même nombre.', answer: 'vrai', explanation: 'Ce nombre est le coefficient de proportionnalité, constant pour tout le tableau.', hint: 'C\'est le coefficient de proportionnalité.' },
  ]},
  '4-1': { exercises: [
    { id: 'm6-4-1-1', type: 'qcm', question: 'Calcule 50 % de 80.', options: ['40', '50', '30', '20'], answer: '40', explanation: '50 % = la moitié. 80 ÷ 2 = 40.', hint: '50 % = moitié.' },
    { id: 'm6-4-1-2', type: 'completer', question: 'Calcule 10 % de 250 : ___', answer: '25', explanation: '10 % = ÷ 10. 250 ÷ 10 = 25.', hint: '10 % = diviser par 10.' },
    { id: 'm6-4-1-3', type: 'qcm', question: 'Calcule 25 % de 40.', options: ['10', '15', '20', '8'], answer: '10', explanation: '25 % = le quart. 40 ÷ 4 = 10.', hint: '25 % = quart.' },
  ]},
  '4-2': { exercises: [
    { id: 'm6-4-2-1', type: 'qcm', question: 'Une voiture roule à 60 km/h. En 2 h, elle parcourt :', options: ['120 km', '30 km', '62 km', '60 km'], answer: '120 km', explanation: 'En 2 h à 60 km/h : 60 × 2 = 120 km.', hint: 'Distance = vitesse × durée.' },
    { id: 'm6-4-2-2', type: 'completer', question: 'Un train parcourt 150 km en 3 h. Sa vitesse est ___ km/h.', answer: '50', explanation: '150 ÷ 3 = 50 km/h.', hint: 'Vitesse = distance ÷ durée.' },
    { id: 'm6-4-2-3', type: 'vrai_faux', question: 'À 50 km/h, on parcourt 100 km en 2 heures.', answer: 'vrai', explanation: '50 × 2 = 100 km.', hint: '50 × 2.' },
  ]},
  '4-3': { exercises: [
    { id: 'm6-4-3-1', type: 'qcm', question: 'Un tableau indique lundi 12 et mardi 15. De combien la valeur augmente-t-elle ?', options: ['3', '27', '2', '5'], answer: '3', explanation: '15 − 12 = 3.', hint: 'C\'est une soustraction.' },
    { id: 'm6-4-3-2', type: 'vrai_faux', question: 'Sur un diagramme en barres, plus la barre est haute, plus la valeur est grande.', answer: 'vrai', explanation: 'La hauteur de la barre représente la valeur : plus haute = plus grande.', hint: 'La hauteur représente la valeur.' },
    { id: 'm6-4-3-3', type: 'completer', question: 'Lundi 8, mardi 8, mercredi 8. Le total des trois jours est ___.', answer: '24', explanation: '8 + 8 + 8 = 24 (ou 8 × 3).', hint: '8 × 3.' },
  ]},
  '4-4': { exercises: [
    { id: 'm6-4-4-1', type: 'qcm', question: 'La moyenne de 4, 6 et 8 est :', options: ['6', '5', '7', '9'], answer: '6', explanation: '(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.', hint: 'Somme ÷ nombre de valeurs.' },
    { id: 'm6-4-4-2', type: 'completer', question: 'Calcule la moyenne de 10 et 20 : ___', answer: '15', explanation: '(10 + 20) ÷ 2 = 30 ÷ 2 = 15.', hint: 'Additionne puis divise par 2.' },
    { id: 'm6-4-4-3', type: 'vrai_faux', question: 'La moyenne de 0 et 10 est 5.', answer: 'vrai', explanation: '(0 + 10) ÷ 2 = 5.', hint: 'Le milieu de 0 et 10.' },
  ]},
  // ── S6 ──
  '5-0': { exercises: [
    { id: 'm6-5-0-1', type: 'qcm', question: 'Quelle notation désigne le segment d\'extrémités A et B ?', options: ['[AB]', '(AB)', '[AB)', 'AB'], answer: '[AB]', explanation: 'Segment = [AB] (crochets). (AB) est la droite, [AB) une demi-droite.', hint: 'Crochets fermés des deux côtés = segment.' },
    { id: 'm6-5-0-2', type: 'vrai_faux', question: 'Une droite est illimitée des deux côtés.', answer: 'vrai', explanation: 'Une droite se prolonge à l\'infini dans les deux sens, contrairement au segment.', hint: 'Segment = limité, droite = illimitée.' },
    { id: 'm6-5-0-3', type: 'completer', question: 'La notation (AB) désigne une ___ (droite / segment / point).', answer: 'droite', explanation: 'Les parenthèses ( ) désignent la droite passant par A et B.', hint: 'Parenthèses = illimité.' },
  ]},
  '5-1': { exercises: [
    { id: 'm6-5-1-1', type: 'qcm', question: 'Deux droites perpendiculaires forment un angle de :', options: ['90°', '45°', '180°', '60°'], answer: '90°', explanation: 'Perpendiculaires = elles se coupent en formant un angle droit de 90°.', hint: 'Angle droit.' },
    { id: 'm6-5-1-2', type: 'vrai_faux', question: 'Deux droites parallèles ne se croisent jamais.', answer: 'vrai', explanation: 'Des droites parallèles gardent toujours le même écart et ne se rencontrent jamais.', hint: 'Elles gardent le même écart.' },
    { id: 'm6-5-1-3', type: 'completer', question: 'Le symbole ⊥ signifie « est ___ à ».', answer: 'perpendiculaire', explanation: 'Le symbole ⊥ se lit « est perpendiculaire à ».', hint: 'Angle droit entre deux droites.' },
  ]},
  '5-2': { exercises: [
    { id: 'm6-5-2-1', type: 'qcm', question: 'Le rayon d\'un cercle de diamètre 10 cm mesure :', options: ['5 cm', '10 cm', '20 cm', '2,5 cm'], answer: '5 cm', explanation: 'Rayon = diamètre ÷ 2 = 10 ÷ 2 = 5 cm.', hint: 'Rayon = moitié du diamètre.' },
    { id: 'm6-5-2-2', type: 'completer', question: 'Le diamètre est le ___ du rayon (double / moitié).', answer: 'double', explanation: 'Diamètre = 2 × rayon, c\'est donc le double du rayon.', hint: 'Diamètre = 2 × rayon.' },
    { id: 'm6-5-2-3', type: 'vrai_faux', question: 'Tous les points d\'un cercle sont à la même distance du centre.', answer: 'vrai', explanation: 'Cette distance constante est justement le rayon du cercle.', hint: 'Cette distance s\'appelle le rayon.' },
  ]},
  '5-3': { exercises: [
    { id: 'm6-5-3-1', type: 'qcm', question: 'Pour tracer un cercle, quel instrument utilise-t-on ?', options: ['Le compas', 'L\'équerre', 'Le rapporteur', 'La règle graduée'], answer: 'Le compas', explanation: 'Le compas trace tous les points à égale distance du centre : un cercle.', hint: 'Il a une pointe et une mine.' },
    { id: 'm6-5-3-2', type: 'vrai_faux', question: 'L\'équerre sert à tracer des angles droits.', answer: 'vrai', explanation: 'L\'équerre possède un angle droit servant à tracer et vérifier les perpendiculaires.', hint: 'Elle a un coin à 90°.' },
    { id: 'm6-5-3-3', type: 'completer', question: 'Pour vérifier que deux droites sont perpendiculaires, on utilise une ___.', answer: 'équerre', explanation: 'On place l\'angle droit de l\'équerre au point d\'intersection.', hint: 'Instrument avec un angle droit.' },
  ]},
  '5-4': { exercises: [
    { id: 'm6-5-4-1', type: 'qcm', question: 'Trois points sont alignés lorsqu\'ils :', options: ['appartiennent à une même droite', 'forment un triangle', 'sont sur un cercle', 'sont perpendiculaires'], answer: 'appartiennent à une même droite', explanation: 'Des points alignés sont situés sur une seule et même droite.', hint: 'Une seule droite passe par tous.' },
    { id: 'm6-5-4-2', type: 'vrai_faux', question: 'Le symbole ∈ signifie « appartient à ».', answer: 'vrai', explanation: 'M ∈ (d) se lit « M appartient à la droite (d) ».', hint: 'Il relie un point à un ensemble.' },
    { id: 'm6-5-4-3', type: 'completer', question: 'Si le point M est sur la droite (d), on dit que M ___ à (d).', answer: 'appartient', explanation: 'On écrit M ∈ (d), lu « M appartient à (d) ».', hint: 'Symbole ∈.' },
  ]},
  // ── S7 ──
  '6-0': { exercises: [
    { id: 'm6-6-0-1', type: 'qcm', question: 'Un angle de 90° est un angle :', options: ['droit', 'aigu', 'obtus', 'plat'], answer: 'droit', explanation: 'Un angle de 90° est un angle droit.', hint: 'C\'est l\'angle du coin d\'une feuille.' },
    { id: 'm6-6-0-2', type: 'qcm', question: 'Un angle de 40° est un angle :', options: ['aigu', 'droit', 'obtus', 'plat'], answer: 'aigu', explanation: 'Inférieur à 90° → angle aigu.', hint: 'Moins de 90° = aigu.' },
    { id: 'm6-6-0-3', type: 'vrai_faux', question: 'Un angle plat mesure 180°.', answer: 'vrai', explanation: 'Un angle plat forme une ligne droite : 180°.', hint: 'Une ligne droite complète.' },
  ]},
  '6-1': { exercises: [
    { id: 'm6-6-1-1', type: 'qcm', question: 'Quel instrument mesure un angle ?', options: ['Le rapporteur', 'Le compas', 'La règle', 'L\'équerre'], answer: 'Le rapporteur', explanation: 'Le rapporteur, gradué en degrés, mesure les angles.', hint: 'Instrument gradué en degrés.' },
    { id: 'm6-6-1-2', type: 'completer', question: 'Un angle obtus mesure entre 90° et ___°.', answer: '180', explanation: 'Un angle obtus est compris strictement entre 90° et 180°.', hint: 'Jusqu\'à l\'angle plat.' },
    { id: 'm6-6-1-3', type: 'vrai_faux', question: 'Un angle de 120° est obtus.', answer: 'vrai', explanation: '120° est compris entre 90° et 180° : c\'est un angle obtus.', hint: 'Entre 90 et 180 = obtus.' },
  ]},
  '6-2': { exercises: [
    { id: 'm6-6-2-1', type: 'qcm', question: 'La symétrie axiale se fait par rapport à :', options: ['une droite (axe)', 'un point', 'un cercle', 'un angle'], answer: 'une droite (axe)', explanation: 'La symétrie axiale utilise une droite appelée axe de symétrie.', hint: '« Axiale » vient de « axe ».' },
    { id: 'm6-6-2-2', type: 'vrai_faux', question: 'Par symétrie axiale, une figure et son image se superposent par pliage sur l\'axe.', answer: 'vrai', explanation: 'C\'est la définition : le pliage sur l\'axe superpose la figure et son symétrique.', hint: 'Pense au pliage d\'une feuille.' },
    { id: 'm6-6-2-3', type: 'completer', question: 'La symétrie par rapport à une droite s\'appelle la symétrie ___.', answer: 'axiale', explanation: 'Symétrie par rapport à une droite (axe) = symétrie axiale.', hint: 'Dérivé du mot « axe ».' },
  ]},
  '6-3': { exercises: [
    { id: 'm6-6-3-1', type: 'qcm', question: 'Combien d\'axes de symétrie possède un carré ?', options: ['4', '2', '1', '0'], answer: '4', explanation: 'Le carré a 4 axes : 2 médianes et 2 diagonales.', hint: 'Médianes ET diagonales.' },
    { id: 'm6-6-3-2', type: 'qcm', question: 'Combien d\'axes de symétrie possède un rectangle non carré ?', options: ['2', '4', '1', '0'], answer: '2', explanation: 'Le rectangle a 2 axes de symétrie (les médianes). Ses diagonales ne sont pas des axes.', hint: 'Attention, pas les diagonales !' },
    { id: 'm6-6-3-3', type: 'vrai_faux', question: 'Un cercle possède une infinité d\'axes de symétrie.', answer: 'vrai', explanation: 'Toute droite passant par le centre est un axe de symétrie : il y en a une infinité.', hint: 'Toute droite passant par le centre.' },
  ]},
  '6-4': { exercises: [
    { id: 'm6-6-4-1', type: 'vrai_faux', question: 'Le symétrique d\'un segment est un segment de même longueur.', answer: 'vrai', explanation: 'La symétrie axiale conserve les longueurs : le segment image a la même longueur.', hint: 'La symétrie conserve les longueurs.' },
    { id: 'm6-6-4-2', type: 'qcm', question: 'Par symétrie axiale, les longueurs sont :', options: ['conservées', 'doublées', 'réduites', 'augmentées'], answer: 'conservées', explanation: 'La symétrie axiale ne modifie ni les longueurs ni les angles.', hint: 'La figure garde la même taille.' },
    { id: 'm6-6-4-3', type: 'completer', question: 'La symétrie axiale conserve les longueurs et les ___ (angles / couleurs).', answer: 'angles', explanation: 'Les longueurs, les angles et les aires sont conservés par symétrie axiale.', hint: 'Une mesure géométrique en degrés.' },
  ]},
  // ── S8 ──
  '7-0': { exercises: [
    { id: 'm6-7-0-1', type: 'qcm', question: 'Le périmètre d\'un carré de côté 5 cm est :', options: ['20 cm', '25 cm', '10 cm', '15 cm'], answer: '20 cm', explanation: 'Périmètre du carré = 4 × côté = 4 × 5 = 20 cm.', hint: '4 × côté.' },
    { id: 'm6-7-0-2', type: 'completer', question: 'Le périmètre d\'un rectangle de longueur 8 et largeur 3 est ___ (en cm).', answer: '22', explanation: 'Périmètre = 2 × (L + l) = 2 × (8 + 3) = 2 × 11 = 22 cm.', hint: '2 × (Longueur + largeur).' },
    { id: 'm6-7-0-3', type: 'vrai_faux', question: 'Le périmètre est la longueur du contour d\'une figure.', answer: 'vrai', explanation: 'Le périmètre correspond à la longueur totale du bord (contour) de la figure.', hint: 'C\'est le « tour » de la figure.' },
  ]},
  '7-1': { exercises: [
    { id: 'm6-7-1-1', type: 'qcm', question: 'Le périmètre d\'un cercle se calcule avec :', options: ['π × diamètre', 'π × rayon', '2 × diamètre', 'π × rayon²'], answer: 'π × diamètre', explanation: 'Périmètre du cercle = π × diamètre = 2 × π × rayon.', hint: 'π multiplié par le diamètre.' },
    { id: 'm6-7-1-2', type: 'completer', question: 'Le périmètre d\'un cercle de rayon 5 cm vaut 2 × π × ___ (nombre).', answer: '5', explanation: 'Périmètre = 2 × π × rayon = 2 × π × 5.', hint: 'On utilise le rayon.' },
    { id: 'm6-7-1-3', type: 'vrai_faux', question: 'On utilise le nombre π (≈ 3,14) pour le périmètre d\'un cercle.', answer: 'vrai', explanation: 'π ≈ 3,14 intervient dans toutes les formules du cercle (périmètre et aire).', hint: 'Le fameux « pi ».' },
  ]},
  '7-2': { exercises: [
    { id: 'm6-7-2-1', type: 'qcm', question: 'L\'aire d\'un rectangle de longueur 6 cm et largeur 4 cm est :', options: ['24 cm²', '20 cm²', '10 cm²', '48 cm²'], answer: '24 cm²', explanation: 'Aire = Longueur × largeur = 6 × 4 = 24 cm².', hint: 'L × l.' },
    { id: 'm6-7-2-2', type: 'completer', question: 'L\'aire d\'un carré de côté 7 cm est ___ (en cm²).', answer: '49', explanation: 'Aire du carré = côté × côté = 7 × 7 = 49 cm².', hint: 'côté × côté.' },
    { id: 'm6-7-2-3', type: 'vrai_faux', question: 'L\'aire d\'un rectangle = longueur × largeur.', answer: 'vrai', explanation: 'C\'est la formule de l\'aire du rectangle.', hint: 'On multiplie les deux dimensions.' },
  ]},
  '7-3': { exercises: [
    { id: 'm6-7-3-1', type: 'qcm', question: 'L\'aire d\'un triangle de base 10 et hauteur 4 est :', options: ['20', '40', '14', '24'], answer: '20', explanation: 'Aire = (base × hauteur) ÷ 2 = (10 × 4) ÷ 2 = 40 ÷ 2 = 20.', hint: 'N\'oublie pas de diviser par 2.' },
    { id: 'm6-7-3-2', type: 'completer', question: 'Combien vaut 1 m² en cm² ? ___ (en chiffres)', answer: '10000', explanation: '1 m = 100 cm, donc 1 m² = 100 × 100 = 10 000 cm².', hint: '100 × 100.' },
    { id: 'm6-7-3-3', type: 'vrai_faux', question: 'L\'aire d\'un triangle = (base × hauteur) ÷ 2.', answer: 'vrai', explanation: 'C\'est la formule de l\'aire du triangle.', hint: 'La moitié d\'un rectangle.' },
  ]},
  '7-4': { exercises: [
    { id: 'm6-7-4-1', type: 'qcm', question: 'Calcule : 45,6 + 4,4 = ?', options: ['50', '49', '50,10', '46'], answer: '50', explanation: '45,6 + 4,4 = 50,0 = 50.', hint: 'Aligne les virgules.' },
    { id: 'm6-7-4-2', type: 'qcm', question: 'Les 3/4 de 100 = ?', options: ['75', '25', '50', '60'], answer: '75', explanation: '100 ÷ 4 = 25, puis 25 × 3 = 75.', hint: 'Divise par 4, multiplie par 3.' },
    { id: 'm6-7-4-3', type: 'qcm', question: 'L\'aire d\'un carré de côté 9 cm = ?', options: ['81 cm²', '36 cm²', '18 cm²', '72 cm²'], answer: '81 cm²', explanation: '9 × 9 = 81 cm².', hint: 'côté × côté.' },
    { id: 'm6-7-4-4', type: 'vrai_faux', question: '20 % de 200 = 40.', answer: 'vrai', explanation: '10 % de 200 = 20, donc 20 % = 40.', hint: '10 % de 200 = 20.' },
  ]},
};

// Exercices d'entraînement générés (objectif : 10 à 15 questions par jour)
for (const [k, extra] of Object.entries(DRILLS)) {
  if (curriculum[k]) curriculum[k].exercises.push(...extra);
}

export const meta = {
  id: '6eme',
  title: 'Mathématiques 6e',
  description: 'Maths — Révisions Été 2026 (entrée au collège)',
  pdfFile: '/cahier-maths-6eme.pdf',
  totalWeeks: 8,
  totalDays: 40,
};

export function buildSeedJours() { return buildMathsJours(weeks, curriculum, meta.pdfFile, MATHS_PDF_PAGES['6eme']); }
export function buildSeedSemaines() { return buildMathsSemaines(weeks); }

export default { meta, weeks, curriculum };
