// Mathématiques — 5ème (2e année de collège)
// Programme complet : 8 semaines × 5 jours. Types : qcm | vrai_faux | completer.
import { assembleWeeks } from './shared.js';
import { buildMathsJours, buildMathsSemaines } from './seedBuilder.js';

const weekDefs = [
  // ── S1 — Nombres relatifs ──────────────────────────────────────
  { num: 1, theme: 'Les nombres relatifs', emoji: '🌡️', days: [
    { domaine: 'relatifs', type: 'lecon', lecon: 'Découvrir les nombres relatifs',
      detail: 'Nombres positifs et négatifs (températures, altitudes). Un relatif a un signe (+ ou −) et une distance à zéro.',
      tip: 'Un nombre négatif est toujours plus petit que 0.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Comparer et ranger les relatifs',
      detail: 'Plus on va vers la gauche sur la droite graduée, plus le nombre est petit. −8 < −3 < 0 < 2.',
      tip: 'Pour deux négatifs, le plus « grand en chiffres » est le plus petit : −8 < −3.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Repérage et abscisse',
      detail: 'Placer un point sur une droite graduée, lire son abscisse. L\'abscisse de l\'origine est 0.',
      tip: 'À gauche de 0 → abscisse négative. À droite → positive.' },
    { domaine: 'relatifs', type: 'lecon', lecon: 'Additionner des relatifs',
      detail: 'Mêmes signes : on additionne et on garde le signe. Signes différents : on soustrait et on prend le signe du plus « fort ».',
      tip: '(+7) + (−7) = 0 : deux opposés s\'annulent.' },
    { domaine: 'relatifs', type: 'exo', lecon: 'Soustraire des relatifs',
      detail: 'Soustraire un nombre revient à ajouter son opposé : a − b = a + (−b).',
      tip: '(+5) − (−3) = (+5) + (+3) = 8.' },
  ]},
  // ── S2 — Les fractions ─────────────────────────────────────────
  { num: 2, theme: 'Opérations sur les fractions', emoji: '🍰', days: [
    { domaine: 'fractions', type: 'lecon', lecon: 'Comparer des fractions',
      detail: 'Comparer en réduisant au même dénominateur, reconnaître des fractions égales.',
      tip: 'Même dénominateur ? Compare les numérateurs. Sinon, réduis d\'abord.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Additionner (même dénominateur)',
      detail: 'On additionne les numérateurs et on garde le dénominateur commun.',
      tip: '2/7 + 3/7 = 5/7 : le dénominateur ne change pas.' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Réduire au même dénominateur',
      detail: 'Pour additionner 1/2 + 1/4, on écrit 1/2 = 2/4, puis 2/4 + 1/4 = 3/4.',
      tip: 'Cherche un dénominateur commun (souvent le plus grand des deux quand l\'un est multiple de l\'autre).' },
    { domaine: 'fractions', type: 'lecon', lecon: 'Multiplier une fraction par un entier',
      detail: 'On multiplie le numérateur par l\'entier, le dénominateur ne change pas : 3 × 2/5 = 6/5.',
      tip: 'Seul le numérateur est multiplié par l\'entier.' },
    { domaine: 'fractions', type: 'exo', lecon: 'Problèmes de fractions',
      detail: 'Calculer une fraction d\'une quantité, une part restante.',
      tip: 'Les 3/4 de 800 : 800 ÷ 4 × 3.' },
  ]},
  // ── S3 — Proportionnalité et pourcentages ──────────────────────
  { num: 3, theme: 'Proportionnalité et pourcentages', emoji: '⚖️', days: [
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Reconnaître la proportionnalité',
      detail: 'On multiplie par un même nombre (le coefficient) pour passer d\'une ligne à l\'autre du tableau.',
      tip: 'Prix total et quantité (à prix fixe) : c\'est proportionnel.' },
    { domaine: 'proportionnalite', type: 'repos', lecon: '🎆 14 juillet — Coefficient',
      detail: 'Journée allégée. Le coefficient de proportionnalité relie les deux lignes d\'un tableau.',
      tip: 'Bonne fête ! Deux petits exercices aujourd\'hui 🎆' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Appliquer un pourcentage',
      detail: 'Calculer t % d\'une quantité : multiplier par t puis diviser par 100.',
      tip: '20 % de 150 = 150 × 20 ÷ 100 = 30.' },
    { domaine: 'proportionnalite', type: 'lecon', lecon: 'Calculer un pourcentage',
      detail: 'Exprimer une proportion en pourcentage : partie ÷ total × 100.',
      tip: '10 absents sur 40 : 10 ÷ 40 = 0,25 = 25 %.' },
    { domaine: 'proportionnalite', type: 'exo', lecon: 'Échelles et vitesses',
      detail: 'Échelle d\'une carte, lien vitesse-distance-durée.',
      tip: 'Échelle 1/100 : 1 cm sur la carte = 100 cm en vrai.' },
  ]},
  // ── S4 — Calcul littéral et priorités ──────────────────────────
  { num: 4, theme: 'Priorités et calcul littéral', emoji: '🔤', days: [
    { domaine: 'calcul', type: 'lecon', lecon: 'Priorités opératoires',
      detail: 'La multiplication et la division se calculent avant l\'addition et la soustraction.',
      tip: '3 + 4 × 2 : d\'abord 4×2 = 8, puis 3+8 = 11.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Calculs avec parenthèses',
      detail: 'On calcule toujours d\'abord ce qui est entre parenthèses.',
      tip: '(3 + 4) × 2 = 7 × 2 = 14.' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Expressions littérales',
      detail: 'On peut supprimer le signe × devant une lettre : 3 × x = 3x. Et a × a = a².',
      tip: '3 × x s\'écrit 3x (le signe × disparaît).' },
    { domaine: 'calcul', type: 'lecon', lecon: 'Substituer une valeur',
      detail: 'Remplacer la lettre par un nombre puis calculer : pour x = 4, 2x + 1 = 9.',
      tip: 'Remplace x par sa valeur, puis applique les priorités.' },
    { domaine: 'calcul', type: 'exo', lecon: 'Tester une égalité',
      detail: 'Vérifier si un nombre est solution d\'une égalité en remplaçant la lettre.',
      tip: 'x = 5 solution de x + 3 = 8 ? 5 + 3 = 8 ✓ donc oui.' },
  ]},
  // ── S5 — Triangles, angles, symétrie centrale ──────────────────
  { num: 5, theme: 'Triangles et symétrie centrale', emoji: '📐', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Somme des angles d\'un triangle',
      detail: 'Les trois angles d\'un triangle ont pour somme 180°.',
      tip: 'Angle manquant = 180° − (somme des deux autres).' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Angles complémentaires et supplémentaires',
      detail: 'Complémentaires : somme = 90°. Supplémentaires : somme = 180°.',
      tip: 'Complémentaires → 90° (angle droit). Supplémentaires → 180° (angle plat).' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Construire un triangle',
      detail: 'Inégalité triangulaire : chaque côté est plus petit que la somme des deux autres.',
      tip: 'Si le plus grand côté ≥ somme des deux autres, le triangle est impossible.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'La symétrie centrale',
      detail: 'Symétrie par rapport à un point (le centre) : c\'est un demi-tour (rotation de 180°).',
      tip: 'Symétrie centrale = par rapport à un POINT (≠ symétrie axiale = par rapport à une droite).' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Propriétés de la symétrie centrale',
      detail: 'Elle conserve longueurs et angles. L\'image d\'une droite est une droite parallèle.',
      tip: 'La symétrie centrale conserve toutes les mesures.' },
  ]},
  // ── S6 — Parallélogrammes et quadrilatères ─────────────────────
  { num: 6, theme: 'Parallélogrammes et quadrilatères', emoji: '🔷', days: [
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le parallélogramme',
      detail: 'Côtés opposés parallèles et de même longueur. Diagonales qui se coupent en leur milieu.',
      tip: 'Côtés opposés parallèles = définition du parallélogramme.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Rectangle, losange, carré',
      detail: 'Rectangle : 4 angles droits. Losange : 4 côtés égaux. Carré : les deux à la fois.',
      tip: 'Le carré est un rectangle ET un losange.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Propriétés des diagonales',
      detail: 'Rectangle : diagonales de même longueur. Losange : diagonales perpendiculaires.',
      tip: 'Losange → diagonales perpendiculaires. Rectangle → diagonales égales.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Angles du parallélogramme',
      detail: 'Angles opposés égaux. Deux angles consécutifs sont supplémentaires (somme 180°).',
      tip: 'Angles opposés égaux, angles consécutifs = 180°.' },
    { domaine: 'geometrie', type: 'exo', lecon: 'Reconnaître un quadrilatère',
      detail: 'Identifier carré, rectangle, losange à partir de ses propriétés.',
      tip: '4 côtés égaux + 4 angles droits = carré.' },
  ]},
  // ── S7 — Aires et volumes ──────────────────────────────────────
  { num: 7, theme: 'Aires et volumes', emoji: '📦', days: [
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Aire du triangle et du parallélogramme',
      detail: 'Parallélogramme : base × hauteur. Triangle : (base × hauteur) ÷ 2.',
      tip: 'Le triangle a la moitié de l\'aire du parallélogramme correspondant.' },
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Aire du disque',
      detail: 'Aire du disque = π × rayon² (à ne pas confondre avec le périmètre = π × diamètre).',
      tip: 'Aire → rayon AU CARRÉ. Périmètre → diamètre.' },
    { domaine: 'geometrie', type: 'lecon', lecon: 'Le prisme droit et le pavé',
      detail: 'Prisme : deux bases identiques et parallèles, faces latérales rectangulaires. Pavé droit : 6 faces.',
      tip: 'Les faces latérales d\'un prisme droit sont des rectangles.' },
    { domaine: 'grandeurs', type: 'lecon', lecon: 'Volume du pavé et du cube',
      detail: 'Volume du pavé = Longueur × largeur × hauteur. Cube d\'arête a : a³.',
      tip: 'Volume du pavé = L × l × h.' },
    { domaine: 'grandeurs', type: 'exo', lecon: 'Unités de volume et contenance',
      detail: '1 L = 1 dm³. 1 m³ = 1000 L. Conversions entre cm³, dm³, m³ et L, cL, mL.',
      tip: '1 litre = 1 dm³. Retiens ce lien clé.' },
  ]},
  // ── S8 — Statistiques et bilan final ───────────────────────────
  { num: 8, theme: 'Statistiques et bilan final', emoji: '🏆', days: [
    { domaine: 'donnees', type: 'lecon', lecon: 'Effectifs et tableaux',
      detail: 'Effectif d\'une valeur = nombre de fois qu\'elle apparaît. Effectif total = somme des effectifs.',
      tip: 'Effectif = combien de fois la valeur revient.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Les fréquences',
      detail: 'Fréquence = effectif ÷ effectif total (entre 0 et 1, ou en %).',
      tip: '5 sur 20 → 5 ÷ 20 = 0,25 = 25 %.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'La moyenne d\'une série',
      detail: 'Moyenne = somme des valeurs ÷ nombre de valeurs.',
      tip: 'Additionne tout, divise par le nombre de valeurs.' },
    { domaine: 'donnees', type: 'lecon', lecon: 'Lire des diagrammes',
      detail: 'Diagramme en barres, diagramme circulaire (le tout = 360°).',
      tip: 'Dans un « camembert », le tout fait 360°.' },
    { domaine: 'calcul', type: 'controle', lecon: '🏆 Grand Contrôle Final (/100)',
      detail: 'Bilan de tout le programme de 5ème : relatifs, fractions, proportionnalité, calcul littéral, géométrie et statistiques.',
      tip: '🌟 Relis bien chaque énoncé et vérifie tes signes. Montre tout ce que tu sais !' },
  ]},
];

export const weeks = assembleWeeks(weekDefs);

export const curriculum = {
  // ── S1 ──
  '0-0': { exercises: [
    { id: 'm5-0-0-1', type: 'qcm', question: 'La température passe de 3 °C à -2 °C. Elle a :', options: ['baissé de 5 °C', 'baissé de 1 °C', 'augmenté de 5 °C', 'baissé de 2 °C'], answer: 'baissé de 5 °C', explanation: 'De 3 à -2, on descend de 3 (jusqu\'à 0) puis encore de 2 : soit 5 °C de baisse.', hint: 'Compte les degrés de 3 jusqu\'à 0, puis de 0 jusqu\'à -2.' },
    { id: 'm5-0-0-2', type: 'vrai_faux', question: 'Un nombre négatif est plus petit que 0.', answer: 'vrai', explanation: 'Tous les nombres négatifs sont situés à gauche de 0, donc plus petits que 0.', hint: 'Ils sont à gauche de zéro.' },
    { id: 'm5-0-0-3', type: 'completer', question: 'L\'opposé de +7 est ___.', answer: '-7', explanation: 'L\'opposé d\'un nombre a le même chiffre mais le signe contraire : opposé de +7 = -7.', hint: 'Change juste le signe.' },
  ]},
  '0-1': { exercises: [
    { id: 'm5-0-1-1', type: 'qcm', question: 'Quel est le plus petit ? -5 ; -2 ; 3', options: ['-5', '-2', '3', '0'], answer: '-5', explanation: 'Sur la droite graduée, -5 est le plus à gauche, donc le plus petit.', hint: 'Le plus à gauche sur la droite.' },
    { id: 'm5-0-1-2', type: 'vrai_faux', question: 'On a -8 < -3.', answer: 'vrai', explanation: '-8 est plus loin à gauche de 0 que -3, donc -8 < -3.', hint: 'Pour les négatifs, plus le chiffre est grand, plus le nombre est petit.' },
    { id: 'm5-0-1-3', type: 'completer', question: 'Parmi -1 ; -6 ; 2, le plus petit est ___.', answer: '-6', explanation: '-6 est le plus à gauche sur la droite graduée, donc le plus petit.', hint: 'Compare les deux négatifs.' },
  ]},
  '0-2': { exercises: [
    { id: 'm5-0-2-1', type: 'qcm', question: 'Sur une droite graduée, l\'abscisse du point situé 4 unités à gauche de 0 est :', options: ['-4', '4', '0', '-2'], answer: '-4', explanation: 'À gauche de 0 → abscisse négative, à 4 unités : -4.', hint: 'À gauche = négatif.' },
    { id: 'm5-0-2-2', type: 'vrai_faux', question: 'L\'abscisse de l\'origine est 0.', answer: 'vrai', explanation: 'L\'origine est le point de référence : son abscisse est 0.', hint: 'L\'origine, c\'est le point 0.' },
    { id: 'm5-0-2-3', type: 'completer', question: 'Le point d\'abscisse -3 est à gauche de l\'origine, à ___ unités (en chiffres).', answer: '3', explanation: 'La distance à zéro de -3 est 3 unités.', hint: 'C\'est la distance à zéro.' },
  ]},
  '0-3': { exercises: [
    { id: 'm5-0-3-1', type: 'qcm', question: 'Calcule : (-5) + (+3) = ?', options: ['-2', '+2', '-8', '+8'], answer: '-2', explanation: 'Signes différents : on soustrait 5 - 3 = 2 et on garde le signe du plus fort (le -5) : -2.', hint: 'Soustrais et prends le signe du plus grand en distance.' },
    { id: 'm5-0-3-2', type: 'completer', question: 'Calcule : (-4) + (-6) = ___', answer: '-10', explanation: 'Mêmes signes : on additionne 4 + 6 = 10 et on garde le signe - : -10.', hint: 'Mêmes signes → on additionne, on garde le signe.' },
    { id: 'm5-0-3-3', type: 'vrai_faux', question: 'On a (+7) + (-7) = 0.', answer: 'vrai', explanation: 'Deux nombres opposés s\'annulent : leur somme vaut 0.', hint: '+7 et -7 sont opposés.' },
  ]},
  '0-4': { exercises: [
    { id: 'm5-0-4-1', type: 'qcm', question: 'Soustraire un nombre revient à ajouter son :', options: ['opposé', 'double', 'inverse', 'carré'], answer: 'opposé', explanation: 'a − b = a + (−b) : soustraire b, c\'est ajouter l\'opposé de b.', hint: 'On transforme le − en + en changeant le signe suivant.' },
    { id: 'm5-0-4-2', type: 'completer', question: 'Calcule : (+5) - (-3) = ___', answer: '8', explanation: '(+5) − (−3) = (+5) + (+3) = 8.', hint: 'Moins moins fait plus.' },
    { id: 'm5-0-4-3', type: 'vrai_faux', question: 'On a (-2) - (+4) = -6.', answer: 'vrai', explanation: '(−2) − (+4) = (−2) + (−4) = −6.', hint: 'Ajoute l\'opposé de +4.' },
  ]},
  // ── S2 ──
  '1-0': { exercises: [
    { id: 'm5-1-0-1', type: 'qcm', question: 'Quelle fraction est la plus grande : 2/3 ou 3/4 ?', options: ['3/4', '2/3', 'Elles sont égales', '1/2'], answer: '3/4', explanation: 'Au dénominateur 12 : 2/3 = 8/12 et 3/4 = 9/12. Donc 3/4 est plus grande.', hint: 'Réduis au dénominateur 12.' },
    { id: 'm5-1-0-2', type: 'vrai_faux', question: 'On a 3/5 = 6/10.', answer: 'vrai', explanation: 'On multiplie haut et bas par 2 : 3/5 = 6/10.', hint: 'Multiplie par 2 en haut et en bas.' },
    { id: 'm5-1-0-3', type: 'completer', question: 'Complète : 1/2 = ___/6', answer: '3', explanation: 'On multiplie par 3 : 1/2 = 3/6.', hint: 'Par combien multiplie-t-on 2 pour avoir 6 ?' },
  ]},
  '1-1': { exercises: [
    { id: 'm5-1-1-1', type: 'completer', question: 'Calcule : 2/7 + 3/7 = ___ (ex : 5/7)', answer: '5/7', explanation: 'Même dénominateur : 2 + 3 = 5, on garde 7. Résultat 5/7.', hint: 'Additionne les numérateurs.' },
    { id: 'm5-1-1-2', type: 'qcm', question: 'Calcule : 3/8 + 1/8 = ?', options: ['4/8', '2/8', '4/16', '1/4'], answer: '4/8', explanation: '3 + 1 = 4, dénominateur 8 : 4/8 (qui vaut aussi 1/2).', hint: 'Garde le dénominateur, additionne les numérateurs.' },
    { id: 'm5-1-1-3', type: 'vrai_faux', question: 'Pour additionner deux fractions de même dénominateur, on additionne les numérateurs et on garde le dénominateur.', answer: 'vrai', explanation: 'C\'est la règle : le dénominateur commun ne change pas.', hint: 'Le « bas » ne change pas.' },
  ]},
  '1-2': { exercises: [
    { id: 'm5-1-2-1', type: 'qcm', question: 'Pour calculer 1/2 + 1/4, on met tout sur le dénominateur :', options: ['4', '2', '6', '8'], answer: '4', explanation: '4 est multiple de 2 : on écrit 1/2 = 2/4, dénominateur commun 4.', hint: '2 et 4 : lequel est multiple de l\'autre ?' },
    { id: 'm5-1-2-2', type: 'completer', question: 'Réduis 1/2 au dénominateur 4 : 1/2 = ___/4', answer: '2', explanation: 'On multiplie par 2 : 1/2 = 2/4.', hint: 'Multiplie haut et bas par 2.' },
    { id: 'm5-1-2-3', type: 'vrai_faux', question: 'On a 1/2 + 1/4 = 3/4.', answer: 'vrai', explanation: '2/4 + 1/4 = 3/4.', hint: 'Transforme 1/2 en 2/4.' },
  ]},
  '1-3': { exercises: [
    { id: 'm5-1-3-1', type: 'qcm', question: 'Calcule : 3 × 2/5 = ?', options: ['6/5', '6/15', '5/6', '2/15'], answer: '6/5', explanation: 'On multiplie le numérateur : 3 × 2 = 6, dénominateur inchangé : 6/5.', hint: 'Seul le numérateur est multiplié.' },
    { id: 'm5-1-3-2', type: 'completer', question: 'Calcule : 4 × 1/3 = ___/3', answer: '4', explanation: '4 × 1 = 4, dénominateur 3 : 4/3.', hint: 'Multiplie 4 par le numérateur.' },
    { id: 'm5-1-3-3', type: 'vrai_faux', question: 'On a 2 × 3/7 = 6/7.', answer: 'vrai', explanation: '2 × 3 = 6, dénominateur 7 : 6/7.', hint: 'Numérateur × 2.' },
  ]},
  '1-4': { exercises: [
    { id: 'm5-1-4-1', type: 'qcm', question: 'Dans une classe de 30 élèves, 2/5 font de l\'allemand. Combien d\'élèves ?', options: ['12', '10', '15', '6'], answer: '12', explanation: '30 ÷ 5 = 6, puis 6 × 2 = 12 élèves.', hint: 'Divise par 5, multiplie par 2.' },
    { id: 'm5-1-4-2', type: 'completer', question: 'Les 3/4 d\'un gâteau de 800 g pèsent ___ g.', answer: '600', explanation: '800 ÷ 4 = 200, puis 200 × 3 = 600 g.', hint: 'Divise par 4, multiplie par 3.' },
    { id: 'm5-1-4-3', type: 'qcm', question: 'Il reste 1/3 d\'une pizza. Quelle fraction a été mangée ?', options: ['2/3', '1/3', '3/3', '1/2'], answer: '2/3', explanation: 'Le tout est 3/3. Si 1/3 reste, alors 3/3 − 1/3 = 2/3 a été mangé.', hint: 'Tout = 3/3.' },
  ]},
  // ── S3 ──
  '2-0': { exercises: [
    { id: 'm5-2-0-1', type: 'qcm', question: 'Un tableau est proportionnel si :', options: ['on multiplie par un même nombre pour passer d\'une ligne à l\'autre', 'les nombres augmentent', 'on ajoute toujours le même nombre', 'les nombres sont pairs'], answer: 'on multiplie par un même nombre pour passer d\'une ligne à l\'autre', explanation: 'Ce nombre constant est le coefficient de proportionnalité.', hint: 'On multiplie, on n\'ajoute pas.' },
    { id: 'm5-2-0-2', type: 'vrai_faux', question: 'Le prix à payer est proportionnel à la quantité (à prix unitaire fixe).', answer: 'vrai', explanation: 'Deux fois plus de quantité → deux fois plus cher : c\'est proportionnel.', hint: 'Prix unitaire constant.' },
    { id: 'm5-2-0-3', type: 'completer', question: '2 kg → 6 €, 4 kg → 12 €. Le prix au kg est ___ € (en chiffres).', answer: '3', explanation: '6 ÷ 2 = 3 € le kilo (et 12 ÷ 4 = 3 aussi).', hint: 'Divise le prix par la masse.' },
  ]},
  '2-1': { exercises: [
    { id: 'm5-2-1-1', type: 'qcm', question: 'Si 5 objets coûtent 15 €, le prix d\'un objet est :', options: ['3 €', '5 €', '10 €', '2 €'], answer: '3 €', explanation: '15 ÷ 5 = 3 €.', hint: 'Divise par 5.' },
    { id: 'm5-2-1-2', type: 'vrai_faux', question: 'Pour 7 objets, on paie alors 21 €.', answer: 'vrai', explanation: '7 × 3 = 21 €.', hint: '7 × prix unitaire.' },
  ]},
  '2-2': { exercises: [
    { id: 'm5-2-2-1', type: 'qcm', question: 'Calcule 20 % de 150.', options: ['30', '20', '15', '40'], answer: '30', explanation: '150 × 20 ÷ 100 = 30.', hint: '×20 puis ÷100.' },
    { id: 'm5-2-2-2', type: 'completer', question: 'Un article à 80 € a une réduction de 25 %. La réduction est de ___ € (en chiffres).', answer: '20', explanation: '80 × 25 ÷ 100 = 20 € de réduction.', hint: '25 % = un quart.' },
    { id: 'm5-2-2-3', type: 'vrai_faux', question: '30 % de 200 = 60.', answer: 'vrai', explanation: '200 × 30 ÷ 100 = 60.', hint: '10 % de 200 = 20.' },
  ]},
  '2-3': { exercises: [
    { id: 'm5-2-3-1', type: 'qcm', question: 'Sur 40 élèves, 10 sont absents. Quel pourcentage d\'absents ?', options: ['25 %', '10 %', '40 %', '30 %'], answer: '25 %', explanation: '10 ÷ 40 = 0,25 = 25 %.', hint: 'Partie ÷ total × 100.' },
    { id: 'm5-2-3-2', type: 'completer', question: '12 réussites sur 50. Cela fait ___ % (en chiffres).', answer: '24', explanation: '12 ÷ 50 = 0,24 = 24 %.', hint: '12 ÷ 50 × 100.' },
    { id: 'm5-2-3-3', type: 'vrai_faux', question: '15 sur 60 correspond à 25 %.', answer: 'vrai', explanation: '15 ÷ 60 = 0,25 = 25 %.', hint: '15/60 se simplifie en 1/4.' },
  ]},
  '2-4': { exercises: [
    { id: 'm5-2-4-1', type: 'qcm', question: 'Un cycliste roule à 20 km/h. En 3 h, il parcourt :', options: ['60 km', '23 km', '40 km', '30 km'], answer: '60 km', explanation: '20 × 3 = 60 km.', hint: 'Distance = vitesse × durée.' },
    { id: 'm5-2-4-2', type: 'completer', question: 'Échelle 1/100 : 1 cm sur la carte = ___ cm en réalité.', answer: '100', explanation: 'À l\'échelle 1/100, les distances réelles sont 100 fois plus grandes.', hint: 'Le dénominateur de l\'échelle.' },
    { id: 'm5-2-4-3', type: 'vrai_faux', question: 'À 30 km/h, on parcourt 15 km en une demi-heure.', answer: 'vrai', explanation: '30 × 0,5 = 15 km.', hint: 'Une demi-heure = 0,5 h.' },
  ]},
  // ── S4 ──
  '3-0': { exercises: [
    { id: 'm5-3-0-1', type: 'qcm', question: 'Calcule : 3 + 4 × 2 = ?', options: ['11', '14', '10', '9'], answer: '11', explanation: 'La multiplication d\'abord : 4 × 2 = 8, puis 3 + 8 = 11.', hint: '× avant +.' },
    { id: 'm5-3-0-2', type: 'completer', question: 'Calcule : 10 - 2 × 3 = ___', answer: '4', explanation: '2 × 3 = 6, puis 10 − 6 = 4.', hint: 'Multiplication d\'abord.' },
    { id: 'm5-3-0-3', type: 'vrai_faux', question: 'Dans un calcul, la multiplication se fait avant l\'addition.', answer: 'vrai', explanation: 'C\'est la règle des priorités opératoires.', hint: 'Priorité à × et ÷.' },
  ]},
  '3-1': { exercises: [
    { id: 'm5-3-1-1', type: 'qcm', question: 'Calcule : (3 + 4) × 2 = ?', options: ['14', '11', '10', '24'], answer: '14', explanation: 'Parenthèses d\'abord : 3 + 4 = 7, puis 7 × 2 = 14.', hint: 'Commence par les parenthèses.' },
    { id: 'm5-3-1-2', type: 'completer', question: 'Calcule : 2 × (5 - 1) = ___', answer: '8', explanation: '5 − 1 = 4, puis 2 × 4 = 8.', hint: 'Parenthèses d\'abord.' },
    { id: 'm5-3-1-3', type: 'vrai_faux', question: 'On calcule toujours d\'abord ce qui est entre parenthèses.', answer: 'vrai', explanation: 'Les parenthèses sont prioritaires sur toutes les autres opérations.', hint: 'Les parenthèses passent avant tout.' },
  ]},
  '3-2': { exercises: [
    { id: 'm5-3-2-1', type: 'qcm', question: 'L\'écriture simplifiée de 3 × x est :', options: ['3x', 'x3', '3+x', 'x/3'], answer: '3x', explanation: 'Devant une lettre, le signe × disparaît : 3 × x = 3x.', hint: 'Le × disparaît devant la lettre.' },
    { id: 'm5-3-2-2', type: 'vrai_faux', question: 'L\'expression a × a peut s\'écrire a².', answer: 'vrai', explanation: 'a × a = a² (a « au carré »).', hint: 'Deux facteurs identiques → un carré.' },
    { id: 'm5-3-2-3', type: 'completer', question: 'Écris plus simplement « 5 × y » : ___', answer: '5y', explanation: 'Le signe × disparaît devant la lettre : 5 × y = 5y.', hint: 'Colle le nombre et la lettre.' },
  ]},
  '3-3': { exercises: [
    { id: 'm5-3-3-1', type: 'qcm', question: 'Pour x = 4, l\'expression 2x + 1 vaut :', options: ['9', '8', '6', '5'], answer: '9', explanation: '2 × 4 = 8, puis 8 + 1 = 9.', hint: 'Remplace x par 4.' },
    { id: 'm5-3-3-2', type: 'completer', question: 'Pour x = 3, calcule 5x = ___', answer: '15', explanation: '5 × 3 = 15.', hint: '5 × 3.' },
    { id: 'm5-3-3-3', type: 'vrai_faux', question: 'Pour x = 2, l\'expression x + 7 vaut 9.', answer: 'vrai', explanation: '2 + 7 = 9.', hint: 'Remplace x par 2.' },
  ]},
  '3-4': { exercises: [
    { id: 'm5-3-4-1', type: 'qcm', question: 'x = 5 est-il solution de x + 3 = 8 ?', options: ['Oui', 'Non', 'On ne peut pas savoir', 'Seulement si x = 0'], answer: 'Oui', explanation: 'On remplace : 5 + 3 = 8 ✓. Donc x = 5 est bien solution.', hint: 'Remplace x par 5 et vérifie.' },
    { id: 'm5-3-4-2', type: 'completer', question: 'Quel nombre vérifie x + 4 = 10 ? x = ___', answer: '6', explanation: '6 + 4 = 10, donc x = 6.', hint: '10 − 4.' },
    { id: 'm5-3-4-3', type: 'vrai_faux', question: 'x = 2 est solution de 3x = 6.', answer: 'vrai', explanation: '3 × 2 = 6 ✓.', hint: 'Remplace x par 2.' },
  ]},
  // ── S5 ──
  '4-0': { exercises: [
    { id: 'm5-4-0-1', type: 'qcm', question: 'La somme des angles d\'un triangle est :', options: ['180°', '360°', '90°', '200°'], answer: '180°', explanation: 'Dans tout triangle, la somme des trois angles vaut 180°.', hint: 'Un demi-tour.' },
    { id: 'm5-4-0-2', type: 'completer', question: 'Un triangle a deux angles de 60° et 70°. Le troisième mesure ___° (en chiffres).', answer: '50', explanation: '180 − (60 + 70) = 180 − 130 = 50°.', hint: '180 − la somme des deux autres.' },
    { id: 'm5-4-0-3', type: 'vrai_faux', question: 'Un triangle peut avoir deux angles droits.', answer: 'faux', explanation: 'Deux angles droits font déjà 180°, il ne resterait rien pour le 3e angle : impossible.', hint: '90 + 90 = 180 déjà.' },
  ]},
  '4-1': { exercises: [
    { id: 'm5-4-1-1', type: 'qcm', question: 'Deux angles complémentaires ont pour somme :', options: ['90°', '180°', '360°', '45°'], answer: '90°', explanation: 'Complémentaires = somme égale à 90°.', hint: 'Complémentaires → angle droit.' },
    { id: 'm5-4-1-2', type: 'completer', question: 'L\'angle complémentaire de 30° mesure ___° (en chiffres).', answer: '60', explanation: '90 − 30 = 60°.', hint: '90 − 30.' },
    { id: 'm5-4-1-3', type: 'vrai_faux', question: 'Deux angles supplémentaires ont pour somme 180°.', answer: 'vrai', explanation: 'Supplémentaires = somme égale à 180° (angle plat).', hint: 'Supplémentaires → angle plat.' },
  ]},
  '4-2': { exercises: [
    { id: 'm5-4-2-1', type: 'qcm', question: 'Peut-on construire un triangle de côtés 3 cm, 4 cm et 10 cm ?', options: ['Non', 'Oui', 'Seulement si isocèle', 'Oui, un triangle plat'], answer: 'Non', explanation: '3 + 4 = 7, ce qui est plus petit que 10 : l\'inégalité triangulaire n\'est pas respectée.', hint: 'Compare 3 + 4 avec 10.' },
    { id: 'm5-4-2-2', type: 'vrai_faux', question: 'Dans un triangle, chaque côté est plus petit que la somme des deux autres.', answer: 'vrai', explanation: 'C\'est l\'inégalité triangulaire, condition pour construire un triangle.', hint: 'C\'est l\'inégalité triangulaire.' },
    { id: 'm5-4-2-3', type: 'completer', question: 'Côtés 5, 6 et x. Pour former un triangle, x doit être inférieur à ___ (en chiffres).', answer: '11', explanation: 'x doit être inférieur à 5 + 6 = 11.', hint: 'Somme des deux côtés connus.' },
  ]},
  '4-3': { exercises: [
    { id: 'm5-4-3-1', type: 'qcm', question: 'La symétrie centrale se fait par rapport à :', options: ['un point', 'une droite', 'un cercle', 'un axe'], answer: 'un point', explanation: 'La symétrie centrale utilise un point appelé centre (≠ symétrie axiale qui utilise une droite).', hint: 'Centrale → centre → point.' },
    { id: 'm5-4-3-2', type: 'vrai_faux', question: 'La symétrie centrale correspond à un demi-tour (rotation de 180°).', answer: 'vrai', explanation: 'Faire un demi-tour autour du centre donne la symétrie centrale.', hint: 'Un demi-tour = 180°.' },
    { id: 'm5-4-3-3', type: 'completer', question: 'Le point par rapport auquel on fait la symétrie s\'appelle le ___ de symétrie.', answer: 'centre', explanation: 'C\'est le centre de symétrie.', hint: 'Symétrie « centrale ».' },
  ]},
  '4-4': { exercises: [
    { id: 'm5-4-4-1', type: 'vrai_faux', question: 'La symétrie centrale conserve les longueurs et les angles.', answer: 'vrai', explanation: 'Comme la symétrie axiale, elle conserve toutes les mesures.', hint: 'Les mesures ne changent pas.' },
    { id: 'm5-4-4-2', type: 'qcm', question: 'Par symétrie centrale, une droite a pour image :', options: ['une droite parallèle', 'un cercle', 'un point', 'une droite perpendiculaire'], answer: 'une droite parallèle', explanation: 'L\'image d\'une droite par symétrie centrale est une droite qui lui est parallèle.', hint: 'Parallèle à la droite de départ.' },
    { id: 'm5-4-4-3', type: 'completer', question: 'La symétrie centrale est un demi-tour, soit une rotation de ___°.', answer: '180', explanation: 'Un demi-tour correspond à 180°.', hint: 'Un demi-tour.' },
  ]},
  // ── S6 ──
  '5-0': { exercises: [
    { id: 'm5-5-0-1', type: 'qcm', question: 'Dans un parallélogramme, les côtés opposés sont :', options: ['parallèles et de même longueur', 'perpendiculaires', 'de longueurs différentes', 'tous égaux'], answer: 'parallèles et de même longueur', explanation: 'C\'est la propriété caractéristique du parallélogramme.', hint: 'Deux à deux parallèles.' },
    { id: 'm5-5-0-2', type: 'vrai_faux', question: 'Les diagonales d\'un parallélogramme se coupent en leur milieu.', answer: 'vrai', explanation: 'C\'est une propriété clé : le point d\'intersection est le milieu de chaque diagonale.', hint: 'Elles se croisent au milieu.' },
    { id: 'm5-5-0-3', type: 'completer', question: 'Dans un parallélogramme, les côtés opposés sont deux à deux ___.', answer: 'parallèles', explanation: 'D\'où le nom « parallélogramme ».', hint: 'Le nom de la figure aide.' },
  ]},
  '5-1': { exercises: [
    { id: 'm5-5-1-1', type: 'qcm', question: 'Un losange est un quadrilatère qui a :', options: ['4 côtés de même longueur', '4 angles droits', '2 côtés parallèles seulement', 'un seul axe de symétrie'], answer: '4 côtés de même longueur', explanation: 'Le losange a ses 4 côtés égaux.', hint: 'Tous les côtés identiques.' },
    { id: 'm5-5-1-2', type: 'qcm', question: 'Un rectangle a :', options: ['4 angles droits', '4 côtés égaux', 'des diagonales perpendiculaires', 'aucun angle droit'], answer: '4 angles droits', explanation: 'Le rectangle est caractérisé par ses 4 angles droits.', hint: 'Pense aux coins d\'une feuille.' },
    { id: 'm5-5-1-3', type: 'vrai_faux', question: 'Un carré est à la fois un rectangle et un losange.', answer: 'vrai', explanation: 'Le carré a 4 angles droits (rectangle) ET 4 côtés égaux (losange).', hint: 'Il cumule les deux propriétés.' },
  ]},
  '5-2': { exercises: [
    { id: 'm5-5-2-1', type: 'qcm', question: 'Les diagonales d\'un rectangle sont :', options: ['de même longueur', 'perpendiculaires', 'de longueurs différentes', 'parallèles'], answer: 'de même longueur', explanation: 'Dans un rectangle, les deux diagonales ont la même longueur.', hint: 'Elles sont égales.' },
    { id: 'm5-5-2-2', type: 'vrai_faux', question: 'Les diagonales d\'un losange sont perpendiculaires.', answer: 'vrai', explanation: 'Dans un losange, les diagonales se coupent à angle droit.', hint: 'Angle droit entre les diagonales.' },
    { id: 'm5-5-2-3', type: 'completer', question: 'Dans un carré, les diagonales sont perpendiculaires et de même ___.', answer: 'longueur', explanation: 'Le carré cumule les propriétés du rectangle (diagonales égales) et du losange (perpendiculaires).', hint: 'Rectangle → diagonales de même…' },
  ]},
  '5-3': { exercises: [
    { id: 'm5-5-3-1', type: 'qcm', question: 'Dans un parallélogramme, les angles opposés sont :', options: ['égaux', 'supplémentaires', 'droits', 'complémentaires'], answer: 'égaux', explanation: 'Les angles opposés d\'un parallélogramme sont égaux.', hint: 'Face à face → identiques.' },
    { id: 'm5-5-3-2', type: 'completer', question: 'Deux angles consécutifs d\'un parallélogramme ont pour somme ___° (en chiffres).', answer: '180', explanation: 'Deux angles qui se suivent sont supplémentaires : leur somme vaut 180°.', hint: 'Angles consécutifs = supplémentaires.' },
    { id: 'm5-5-3-3', type: 'vrai_faux', question: 'Si un angle d\'un parallélogramme vaut 70°, l\'angle opposé vaut aussi 70°.', answer: 'vrai', explanation: 'Les angles opposés sont égaux.', hint: 'Opposés = égaux.' },
  ]},
  '5-4': { exercises: [
    { id: 'm5-5-4-1', type: 'qcm', question: 'Un quadrilatère avec 4 côtés égaux et 4 angles droits est un :', options: ['carré', 'losange', 'rectangle', 'trapèze'], answer: 'carré', explanation: '4 côtés égaux + 4 angles droits = carré.', hint: 'Le plus régulier des quadrilatères.' },
    { id: 'm5-5-4-2', type: 'vrai_faux', question: 'Tout rectangle est un parallélogramme.', answer: 'vrai', explanation: 'Un rectangle a ses côtés opposés parallèles : c\'est donc un parallélogramme particulier.', hint: 'Ses côtés opposés sont parallèles.' },
    { id: 'm5-5-4-3', type: 'completer', question: 'Un parallélogramme qui a 4 angles droits est un ___.', answer: 'rectangle', explanation: 'Parallélogramme + 4 angles droits = rectangle.', hint: '4 angles droits.' },
  ]},
  // ── S7 ──
  '6-0': { exercises: [
    { id: 'm5-6-0-1', type: 'qcm', question: 'L\'aire d\'un parallélogramme est :', options: ['base × hauteur', 'base × hauteur ÷ 2', 'côté × côté', '2 × (L + l)'], answer: 'base × hauteur', explanation: 'Aire du parallélogramme = base × hauteur (la hauteur perpendiculaire à la base).', hint: 'Comme un rectangle « penché ».' },
    { id: 'm5-6-0-2', type: 'completer', question: 'Aire d\'un triangle de base 8 et hauteur 5 = ___ (en chiffres).', answer: '20', explanation: '(8 × 5) ÷ 2 = 40 ÷ 2 = 20.', hint: 'base × hauteur ÷ 2.' },
    { id: 'm5-6-0-3', type: 'vrai_faux', question: 'L\'aire d\'un triangle est la moitié de celle d\'un parallélogramme de même base et hauteur.', answer: 'vrai', explanation: 'Deux triangles identiques forment un parallélogramme : d\'où le « ÷ 2 ».', hint: 'D\'où la division par 2.' },
  ]},
  '6-1': { exercises: [
    { id: 'm5-6-1-1', type: 'qcm', question: 'L\'aire d\'un disque est :', options: ['π × rayon²', 'π × diamètre', '2 × π × rayon', 'π × rayon'], answer: 'π × rayon²', explanation: 'Aire du disque = π × rayon². (π × diamètre et 2πr donnent le périmètre.)', hint: 'Rayon AU CARRÉ.' },
    { id: 'm5-6-1-2', type: 'completer', question: 'Aire d\'un disque de rayon 3 = π × ___ (nombre).', answer: '9', explanation: 'rayon² = 3² = 9, donc aire = π × 9.', hint: '3 au carré.' },
    { id: 'm5-6-1-3', type: 'vrai_faux', question: 'Pour l\'aire du disque, on utilise le rayon au carré.', answer: 'vrai', explanation: 'Aire = π × r². Le rayon est bien au carré.', hint: 'r² dans la formule.' },
  ]},
  '6-2': { exercises: [
    { id: 'm5-6-2-1', type: 'qcm', question: 'Un prisme droit a deux faces identiques et parallèles appelées :', options: ['bases', 'arêtes', 'sommets', 'diagonales'], answer: 'bases', explanation: 'Les deux faces identiques et parallèles sont les bases du prisme.', hint: 'Le « dessus » et le « dessous ».' },
    { id: 'm5-6-2-2', type: 'vrai_faux', question: 'Les faces latérales d\'un prisme droit sont des rectangles.', answer: 'vrai', explanation: 'Dans un prisme droit, les faces latérales sont toujours des rectangles.', hint: 'Les côtés sont « droits ».' },
    { id: 'm5-6-2-3', type: 'completer', question: 'Un pavé droit a ___ faces (en chiffres).', answer: '6', explanation: 'Le pavé droit (parallélépipède) a 6 faces rectangulaires.', hint: 'Comme un dé, une boîte.' },
  ]},
  '6-3': { exercises: [
    { id: 'm5-6-3-1', type: 'qcm', question: 'Le volume d\'un pavé droit est :', options: ['Longueur × largeur × hauteur', 'L × l', '2 × (L + l)', 'L + l + h'], answer: 'Longueur × largeur × hauteur', explanation: 'Volume du pavé = L × l × h.', hint: 'Trois dimensions multipliées.' },
    { id: 'm5-6-3-2', type: 'completer', question: 'Volume d\'un pavé 2 × 3 × 4 = ___ (en chiffres).', answer: '24', explanation: '2 × 3 × 4 = 24.', hint: 'Multiplie les trois.' },
    { id: 'm5-6-3-3', type: 'vrai_faux', question: 'Le volume d\'un cube d\'arête 3 est 27.', answer: 'vrai', explanation: '3 × 3 × 3 = 27.', hint: '3 au cube.' },
  ]},
  '6-4': { exercises: [
    { id: 'm5-6-4-1', type: 'qcm', question: '1 litre correspond à :', options: ['1 dm³', '1 cm³', '1 m³', '10 cm³'], answer: '1 dm³', explanation: '1 L = 1 dm³ : c\'est le lien clé entre volume et contenance.', hint: 'Décimètre cube.' },
    { id: 'm5-6-4-2', type: 'completer', question: '1 L = ___ cL (en chiffres).', answer: '100', explanation: '1 litre = 100 centilitres.', hint: 'centi = centième.' },
    { id: 'm5-6-4-3', type: 'vrai_faux', question: 'On a 1 m³ = 1000 L.', answer: 'vrai', explanation: '1 m³ = 1000 dm³ = 1000 L.', hint: '1 m³ = 1000 dm³.' },
  ]},
  // ── S8 ──
  '7-0': { exercises: [
    { id: 'm5-7-0-1', type: 'qcm', question: 'L\'effectif d\'une valeur, c\'est :', options: ['le nombre de fois qu\'elle apparaît', 'sa moyenne', 'son maximum', 'sa fréquence en %'], answer: 'le nombre de fois qu\'elle apparaît', explanation: 'L\'effectif compte combien de fois une valeur revient dans la série.', hint: 'On compte les répétitions.' },
    { id: 'm5-7-0-2', type: 'completer', question: 'Dans la série 5, 5, 5, 8, l\'effectif de la valeur 5 est ___.', answer: '3', explanation: 'La valeur 5 apparaît 3 fois.', hint: 'Compte les 5.' },
    { id: 'm5-7-0-3', type: 'vrai_faux', question: 'L\'effectif total est la somme de tous les effectifs.', answer: 'vrai', explanation: 'L\'effectif total = nombre total de données de la série.', hint: 'C\'est le nombre total de données.' },
  ]},
  '7-1': { exercises: [
    { id: 'm5-7-1-1', type: 'qcm', question: 'Sur 20 élèves, 5 aiment le sport. La fréquence est :', options: ['1/4', '1/5', '5', '1/2'], answer: '1/4', explanation: '5 ÷ 20 = 1/4.', hint: '5/20 se simplifie.' },
    { id: 'm5-7-1-2', type: 'completer', question: '10 sur 40 : la fréquence en pourcentage est ___ % (en chiffres).', answer: '25', explanation: '10 ÷ 40 = 0,25 = 25 %.', hint: '10/40 = 1/4.' },
    { id: 'm5-7-1-3', type: 'vrai_faux', question: 'Une fréquence est comprise entre 0 et 1.', answer: 'vrai', explanation: 'Une fréquence est un rapport partie/total, donc entre 0 et 1 (ou 0 % et 100 %).', hint: 'C\'est une part du total.' },
  ]},
  '7-2': { exercises: [
    { id: 'm5-7-2-1', type: 'qcm', question: 'La moyenne de 2, 4, 6, 8 est :', options: ['5', '4', '6', '20'], answer: '5', explanation: '(2 + 4 + 6 + 8) ÷ 4 = 20 ÷ 4 = 5.', hint: 'Somme ÷ 4.' },
    { id: 'm5-7-2-2', type: 'completer', question: 'Moyenne de 3, 7 et 8 = ___ (en chiffres).', answer: '6', explanation: '(3 + 7 + 8) ÷ 3 = 18 ÷ 3 = 6.', hint: 'Somme ÷ 3.' },
    { id: 'm5-7-2-3', type: 'vrai_faux', question: 'La moyenne de 10, 10, 10 est 10.', answer: 'vrai', explanation: '(10 + 10 + 10) ÷ 3 = 30 ÷ 3 = 10.', hint: 'Toutes les valeurs sont égales.' },
  ]},
  '7-3': { exercises: [
    { id: 'm5-7-3-1', type: 'qcm', question: 'Un diagramme circulaire représente des parts d\'un tout. L\'ensemble fait :', options: ['360°', '180°', '100°', '90°'], answer: '360°', explanation: 'Le disque complet (le tout) correspond à 360°.', hint: 'Un tour complet.' },
    { id: 'm5-7-3-2', type: 'vrai_faux', question: 'Dans un diagramme circulaire, la moitié correspond à 180°.', answer: 'vrai', explanation: 'La moitié de 360° est 180°.', hint: 'La moitié de 360.' },
    { id: 'm5-7-3-3', type: 'completer', question: 'Un secteur représentant la moitié des données occupe ___° (en chiffres).', answer: '180', explanation: 'La moitié de 360° = 180°.', hint: '360 ÷ 2.' },
  ]},
  '7-4': { exercises: [
    { id: 'm5-7-4-1', type: 'qcm', question: 'Calcule : (-3) + (+8) = ?', options: ['5', '-5', '11', '-11'], answer: '5', explanation: 'Signes différents : 8 − 3 = 5, signe du plus fort (+8) : +5.', hint: 'Soustrais, garde le signe du plus grand.' },
    { id: 'm5-7-4-2', type: 'qcm', question: 'Calcule 20 % de 250 = ?', options: ['50', '25', '20', '75'], answer: '50', explanation: '250 × 20 ÷ 100 = 50.', hint: '10 % de 250 = 25.' },
    { id: 'm5-7-4-3', type: 'qcm', question: 'Pour x = 3, 4x - 2 = ?', options: ['10', '12', '14', '9'], answer: '10', explanation: '4 × 3 = 12, puis 12 − 2 = 10.', hint: 'Remplace x par 3.' },
    { id: 'm5-7-4-4', type: 'vrai_faux', question: 'La somme des angles d\'un triangle est 180°.', answer: 'vrai', explanation: 'Vrai pour tout triangle.', hint: 'Propriété fondamentale.' },
  ]},
};

export const meta = {
  id: '5eme',
  title: 'Mathématiques 5e',
  description: 'Maths — Révisions Été 2026 (2e année de collège)',
  pdfFile: null,
  totalWeeks: 8,
  totalDays: 40,
};

export function buildSeedJours() { return buildMathsJours(weeks, curriculum, meta.pdfFile); }
export function buildSeedSemaines() { return buildMathsSemaines(weeks); }

export default { meta, weeks, curriculum };
