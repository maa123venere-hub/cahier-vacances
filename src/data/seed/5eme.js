/**
 * Seed data — 5ème (CM2 → 5ème, programme officiel)
 * 8 semaines × 5 jours = 40 journées
 * Matières : Français, Maths, Histoire, Géographie, SVT, Physique-Chimie, Technologie, Anglais
 */

const SEMAINES_5EME = [
  { index: 0, num: 1, theme: 'Revoir les fondamentaux',   color: '#1D4ED8', light: '#EFF6FF', emoji: '📚' },
  { index: 1, num: 2, theme: 'Explorer et comprendre',    color: '#0891B2', light: '#ECFEFF', emoji: '🔭' },
  { index: 2, num: 3, theme: 'Approfondir',               color: '#059669', light: '#ECFDF5', emoji: '🌿' },
  { index: 3, num: 4, theme: 'Consolider',                color: '#7C3AED', light: '#F5F3FF', emoji: '🔢' },
  { index: 4, num: 5, theme: 'Maîtriser',                 color: '#EC4899', light: '#FDF2F8', emoji: '⚡' },
  { index: 5, num: 6, theme: 'Enrichir',                  color: '#D97706', light: '#FFFBEB', emoji: '🌍' },
  { index: 6, num: 7, theme: 'Perfectionner',             color: '#EF4444', light: '#FEF2F2', emoji: '🎯' },
  { index: 7, num: 8, theme: 'Bilan final 🏆',            color: '#F59E0B', light: '#FFFBEB', emoji: '🏆' },
];

const JOURS_5EME = [

  // ══════════════════════════════════════
  // SEMAINE 1 — Revoir les fondamentaux
  // ══════════════════════════════════════

  {
    id: '0-0', semaineIndex: 0, jourIndex: 0, ordre: 0,
    label: 'Lun 29 juin', type: 'lecon', matiere: 'français', difficulte: 1,
    lecon: 'Français — La subordonnée relative',
    detail: 'La proposition subordonnée relative complète un nom (son antécédent). Elle est introduite par un pronom relatif : qui, que, dont, où, lequel… Ex. : « Le chevalier qui portait l\'armure dorée triompha. » → la relative complète « chevalier ».',
    tip: 'Pour identifier la relative, cherche le pronom relatif et demande-toi quel nom il complète (l\'antécédent).',
    lessonPage: 7, exercisesPage: 8, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '0-0-1', type: 'qcm', question: 'Dans « Le livre que tu m\'as prêté est passionnant. », quel est l\'antécédent du pronom relatif « que » ?', options: ['tu', 'livre', 'prêté', 'passionnant'], answer: 'livre', explanation: '« que » reprend « livre » : c\'est l\'antécédent de la relative.', hint: 'L\'antécédent est le nom que le pronom relatif reprend.' },
      { id: '0-0-2', type: 'qcm', question: 'Quel pronom relatif convient ? « La ville ___ je suis né a beaucoup changé. »', options: ['qui', 'que', 'dont', 'où'], answer: 'où', explanation: '« où » est un pronom relatif de lieu : il reprend « ville » et indique un lieu.', hint: 'Pour un lieu ou un temps, on utilise « où ».' },
      { id: '0-0-3', type: 'vrai_faux', question: 'Dans « Je parle de l\'auteur dont j\'admire le style. », « dont » est un pronom relatif.', answer: 'vrai', explanation: '« dont » = pronom relatif introduisant un complément avec « de ». Ici il reprend « auteur » et équivaut à « de qui ».', hint: '« dont » remplace toujours un GN introduit par « de ».' },
      { id: '0-0-4', type: 'completer', question: 'Identifie la subordonnée relative dans : « Le dragon qui crachait du feu terrorisait le village. »', answer: 'qui crachait du feu', explanation: '« qui crachait du feu » est la relative : elle complète le nom « dragon ».', hint: 'La relative commence par un pronom relatif.' },
      { id: '0-0-5', type: 'qcm', question: 'Quelle est la fonction de la subordonnée relative dans une phrase ?', options: ['Sujet du verbe', 'COD du verbe', 'Expansion du nom', 'Complément circonstanciel'], answer: 'Expansion du nom', explanation: 'La relative est une expansion du nom : elle complète et précise le nom-noyau (l\'antécédent).', hint: 'Elle enrichit un nom, comme un adjectif épithète.' },
    ],
  },

  {
    id: '0-1', semaineIndex: 0, jourIndex: 1, ordre: 1,
    label: 'Mar 30 juin', type: 'lecon', matiere: 'maths', difficulte: 1,
    lecon: 'Maths — Les fractions : addition et soustraction',
    detail: 'Pour additionner ou soustraire des fractions, il faut un dénominateur commun. Si les dénominateurs sont différents, on les rend égaux en multipliant. Ex. : 1/3 + 1/4 = 4/12 + 3/12 = 7/12.',
    tip: 'PGCD ou multiplicateur : le dénominateur commun est souvent le produit des deux dénominateurs si ils sont premiers entre eux.',
    lessonPage: 9, exercisesPage: 10, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '0-1-1', type: 'qcm', question: 'Calcule 1/2 + 1/3.', options: ['2/5', '2/6', '5/6', '3/6'], answer: '5/6', explanation: '1/2 + 1/3 = 3/6 + 2/6 = 5/6. On rend les dénominateurs égaux à 6.', hint: 'Le dénominateur commun de 2 et 3 est 6.' },
      { id: '0-1-2', type: 'completer', question: 'Calcule 3/4 − 1/8 = ___', answer: '5/8', explanation: '3/4 = 6/8. Donc 6/8 − 1/8 = 5/8.', hint: 'Convertis 3/4 en huitièmes.' },
      { id: '0-1-3', type: 'vrai_faux', question: '2/5 + 1/5 = 3/10', answer: 'faux', explanation: '2/5 + 1/5 = 3/5. Même dénominateur : on additionne uniquement les numérateurs.', hint: 'Quand les dénominateurs sont identiques, on additionne les numérateurs sans changer le dénominateur.' },
      { id: '0-1-4', type: 'qcm', question: 'Quel est le dénominateur commun de 1/6 et 1/4 ?', options: ['10', '12', '24', '6'], answer: '12', explanation: 'Le plus petit commun multiple de 6 et 4 est 12.', hint: 'PPCM(6, 4) = ?' },
    ],
  },

  {
    id: '0-2', semaineIndex: 0, jourIndex: 2, ordre: 2,
    label: 'Mer 1er juil.', type: 'lecon', matiere: 'histoire', difficulte: 1,
    lecon: 'Histoire — Le Moyen Âge : société féodale et chevalerie',
    detail: 'Au Moyen Âge (Ve–XVe s.), la société est organisée en trois ordres : ceux qui prient (clergé), ceux qui combattent (noblesse), ceux qui travaillent (paysans). Les chevaliers suivent un code d\'honneur : la chevalerie.',
    tip: 'Retiens les trois ordres avec la phrase : « Prêtre, Chevalier, Paysan » = Prier, Combattre, Travailler.',
    lessonPage: 11, exercisesPage: 12, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '0-2-1', type: 'qcm', question: 'Au Moyen Âge, qui appartient à l\'ordre de ceux qui « combattent » ?', options: ['Les moines', 'Les serfs', 'Les chevaliers', 'Les marchands'], answer: 'Les chevaliers', explanation: 'Les chevaliers forment l\'ordre de la noblesse guerrière, qui défend la société.', hint: 'Pense aux trois ordres.' },
      { id: '0-2-2', type: 'vrai_faux', question: 'La féodalité est un système où le roi donne des fiefs (terres) aux seigneurs en échange de leur loyauté.', answer: 'vrai', explanation: 'C\'est le principe du contrat vassalique : le seigneur suzerain donne un fief, le vassal lui doit foi et hommage.', hint: 'Fief → féodalité.' },
      { id: '0-2-3', type: 'completer', question: 'Le code moral des chevaliers s\'appelle la ___.', answer: 'chevalerie', explanation: 'La chevalerie impose courage, loyauté, protection des faibles et défense de la foi chrétienne.', hint: 'C\'est le nom donné à l\'idéal moral du chevalier.' },
      { id: '0-2-4', type: 'qcm', question: 'Quelle période historique suit le Moyen Âge ?', options: ['L\'Antiquité', 'La Préhistoire', 'La Renaissance', 'L\'époque contemporaine'], answer: 'La Renaissance', explanation: 'Le Moyen Âge se termine en 1492 avec la découverte de l\'Amérique. La Renaissance (XVe–XVIe s.) lui succède.', hint: 'Elle commence aux alentours de 1492.' },
    ],
  },

  {
    id: '0-3', semaineIndex: 0, jourIndex: 3, ordre: 3,
    label: 'Jeu 2 juil.', type: 'lecon', matiere: 'svt', difficulte: 1,
    lecon: 'SVT — La nutrition : digestion et absorption',
    detail: 'La digestion transforme les aliments en nutriments utilisables par les cellules. Le trajet : bouche → œsophage → estomac → intestin grêle → gros intestin. L\'absorption des nutriments se fait principalement dans l\'intestin grêle.',
    tip: 'Retiens le trajet : B-O-E-I-G (Bouche, Œsophage, Estomac, Intestin grêle, Gros intestin).',
    lessonPage: 13, exercisesPage: 14, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '0-3-1', type: 'qcm', question: 'Où se fait l\'absorption de la majorité des nutriments ?', options: ['Dans l\'estomac', 'Dans le gros intestin', 'Dans l\'intestin grêle', 'Dans la bouche'], answer: 'Dans l\'intestin grêle', explanation: 'L\'intestin grêle, avec ses villosités, absorbe les nutriments issus de la digestion pour les passer dans le sang.', hint: 'C\'est l\'organe le plus long de l\'appareil digestif.' },
      { id: '0-3-2', type: 'vrai_faux', question: 'La salive contient des enzymes qui commencent la digestion de l\'amidon.', answer: 'vrai', explanation: 'La salive contient de l\'amylase salivaire, une enzyme qui dégrade l\'amidon dès la bouche.', hint: 'La digestion commence dans la bouche, pas dans l\'estomac.' },
      { id: '0-3-3', type: 'completer', question: 'L\'organe qui produit la bile pour digérer les graisses s\'appelle le ___.', answer: 'foie', explanation: 'Le foie produit la bile, stockée dans la vésicule biliaire, qui émulsionne les graisses dans l\'intestin.', hint: 'C\'est le plus gros organe de l\'abdomen.' },
      { id: '0-3-4', type: 'qcm', question: 'Quelle est la fonction principale de la digestion ?', options: ['Éliminer les déchets', 'Transformer les aliments en nutriments assimilables', 'Produire de l\'énergie directement', 'Absorber l\'oxygène'], answer: 'Transformer les aliments en nutriments assimilables', explanation: 'La digestion découpe mécaniquement et chimiquement les aliments en molécules simples (glucides, lipides, protéines) que les cellules peuvent utiliser.', hint: 'Les aliments doivent être découpés en molécules simples.' },
    ],
  },

  {
    id: '0-4', semaineIndex: 0, jourIndex: 4, ordre: 4,
    label: 'Ven 3 juil.', type: 'lecon', matiere: 'anglais', difficulte: 1,
    lecon: 'Anglais — Le Present Simple vs Present Continuous',
    detail: 'Present Simple : actions habituelles, vérités générales. Ex. : « She reads every day. » Present Continuous : action en cours maintenant. Forme : be + V-ing. Ex. : « She is reading now. »',
    tip: 'Les marqueurs temporels t\'aident : always/usually/often/never → Present Simple. Now/at the moment → Present Continuous.',
    lessonPage: 15, exercisesPage: 16, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '0-4-1', type: 'qcm', question: 'Which tense? « I ___ (watch) TV every evening. »', options: ['am watching', 'watch', 'is watching', 'watches'], answer: 'watch', explanation: '« Every evening » signals a habit → Present Simple. « I watch » (no -s for I).', hint: 'Every evening = habitual action → Present Simple.' },
      { id: '0-4-2', type: 'completer', question: 'Fill in: « Look! She ___ (run) in the park. »', answer: 'is running', explanation: '« Look! » signals something happening right now → Present Continuous: is + running.', hint: 'Look! = right now → Present Continuous.' },
      { id: '0-4-3', type: 'vrai_faux', question: '« He is knowing the answer. » is a correct English sentence.', answer: 'faux', explanation: '« Know » is a stative verb (état mental) and cannot be used in the continuous form. Correct: « He knows the answer. »', hint: 'Stative verbs (know, like, want, believe) never use -ing.' },
      { id: '0-4-4', type: 'qcm', question: 'What does « She doesn\'t eat meat. » mean?', options: ['She is not eating meat right now', 'She never eats meat (habit/general truth)', 'She forgot to eat meat', 'She will not eat meat'], answer: 'She never eats meat (habit/general truth)', explanation: 'Present Simple negative: doesn\'t + V-base expresses a habitual fact or general truth.', hint: 'Present Simple = habitual or general truth.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 2 — Explorer et comprendre
  // ══════════════════════════════════════

  {
    id: '1-0', semaineIndex: 1, jourIndex: 0, ordre: 5,
    label: 'Lun 6 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — Le roman de chevalerie et la description',
    detail: 'Le roman de chevalerie (Moyen Âge) met en scène des héros qui combattent pour l\'honneur, l\'amour et la foi. La description utilise des champs lexicaux précis et des figures de style (comparaison, métaphore) pour créer des images.',
    tip: 'Pour réussir une description : choisis un point de vue, utilise des détails sensoriels (vue, ouïe, toucher, odorat) et des figures de style.',
    lessonPage: 18, exercisesPage: 19, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '1-0-1', type: 'qcm', question: 'Quelle figure de style est utilisée dans « Sa voix était douce comme le miel » ?', options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'], answer: 'Comparaison', explanation: 'La comparaison utilise un outil de comparaison : ici « comme ». On compare la voix au miel.', hint: 'Cherche un mot outil : comme, tel, pareil à…' },
      { id: '1-0-2', type: 'vrai_faux', question: '« Le soleil était une boule de feu » est une métaphore.', answer: 'vrai', explanation: 'La métaphore compare sans outil de comparaison : le soleil EST présenté directement comme une boule de feu.', hint: 'Pas de « comme » = métaphore.' },
      { id: '1-0-3', type: 'completer', question: 'Dans « Le vent hurlait entre les créneaux », le vent est ___ (figure de style).', answer: 'personnifié', explanation: 'Attribuer une action humaine (hurler) à un élément non humain (vent) = personnification.', hint: 'On prête une action humaine à un élément non humain.' },
      { id: '1-0-4', type: 'qcm', question: 'Quel terme appartient au champ lexical de la guerre au Moyen Âge ?', options: ['Stylo', 'Épée', 'Ordinateur', 'Téléphone'], answer: 'Épée', explanation: 'Épée, lance, heaume, destrier, tournoi… appartiennent au champ lexical de la guerre médiévale.', hint: 'Pense aux objets utilisés par les chevaliers.' },
    ],
  },

  {
    id: '1-1', semaineIndex: 1, jourIndex: 1, ordre: 6,
    label: 'Mar 7 juil.', type: 'lecon', matiere: 'maths', difficulte: 2,
    lecon: 'Maths — Les nombres relatifs',
    detail: 'Les nombres relatifs sont positifs (+) ou négatifs (−). On les représente sur une droite graduée. Pour additionner deux relatifs de même signe : on additionne les valeurs absolues et on garde le signe. De signes contraires : on soustrait et on prend le signe du plus grand.',
    tip: 'Sur la droite graduée : droite = positif, gauche = négatif. La valeur absolue |−5| = 5.',
    lessonPage: 20, exercisesPage: 21, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '1-1-1', type: 'qcm', question: 'Calcule (−3) + (−5).', options: ['8', '−8', '−2', '2'], answer: '−8', explanation: 'Même signe (−) : on additionne les valeurs absolues 3 + 5 = 8, et on garde le signe −. Résultat : −8.', hint: 'Même signe → on additionne et on garde le signe.' },
      { id: '1-1-2', type: 'completer', question: 'Calcule (−7) + (+4) = ___', answer: '−3', explanation: 'Signes contraires : |−7| − |+4| = 7 − 4 = 3. On prend le signe du plus grand (7 > 4) donc −3.', hint: 'Signes contraires → on soustrait et on garde le signe du plus grand.' },
      { id: '1-1-3', type: 'vrai_faux', question: '(+6) + (−6) = 0', answer: 'vrai', explanation: 'Deux nombres opposés s\'annulent : leur somme est toujours 0.', hint: '+n et −n sont des opposés : leur somme = 0.' },
      { id: '1-1-4', type: 'qcm', question: 'Quel nombre est le plus grand : −8 ou −3 ?', options: ['−8', '−3', 'Ils sont égaux', 'Impossible à comparer'], answer: '−3', explanation: 'Sur la droite graduée, −3 est à droite de −8 : donc −3 > −8. Plus un nombre négatif est proche de 0, plus il est grand.', hint: 'Sur la droite graduée, le plus grand est le plus à droite.' },
    ],
  },

  {
    id: '1-2', semaineIndex: 1, jourIndex: 2, ordre: 7,
    label: 'Mer 8 juil.', type: 'lecon', matiere: 'physique', difficulte: 2,
    lecon: 'Physique-Chimie — La lumière : réflexion et réfraction',
    detail: 'La lumière se propage en ligne droite dans un milieu homogène (principe de propagation rectiligne). Quand elle change de milieu, elle peut se réfléchir (miroir) ou se réfracter (changer de direction). La loi de Snell-Descartes décrit la réfraction.',
    tip: 'Réflexion : angle d\'incidence = angle de réflexion. Réfraction : la lumière change de direction en changeant de milieu (ex. crayon dans l\'eau qui semble brisé).',
    lessonPage: 22, exercisesPage: 23, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '1-2-1', type: 'qcm', question: 'Qu\'observe-t-on quand la lumière passe de l\'air vers l\'eau ?', options: ['Elle accélère et se réfléchit', 'Elle ralentit et change de direction (réfraction)', 'Elle disparaît', 'Elle ne change pas de direction'], answer: 'Elle ralentit et change de direction (réfraction)', explanation: 'En passant dans un milieu plus dense (eau), la lumière ralentit et se rapproche de la normale : c\'est la réfraction.', hint: 'Pense au crayon qui semble brisé dans un verre d\'eau.' },
      { id: '1-2-2', type: 'vrai_faux', question: 'Lors d\'une réflexion sur un miroir plan, l\'angle d\'incidence est égal à l\'angle de réflexion.', answer: 'vrai', explanation: 'C\'est la loi de la réflexion : angle d\'incidence (i) = angle de réflexion (r), tous deux mesurés par rapport à la normale au miroir.', hint: 'i = r est la loi fondamentale de la réflexion.' },
      { id: '1-2-3', type: 'completer', question: 'La lumière se propage en ___ droite dans un milieu homogène.', answer: 'ligne', explanation: 'C\'est le principe de propagation rectiligne de la lumière, fondamental en optique géométrique.', hint: 'Pense aux rayons de lumière représentés par des flèches droites.' },
      { id: '1-2-4', type: 'qcm', question: 'Un arc-en-ciel est causé par :', options: ['La réflexion de la lumière sur les nuages', 'La réfraction et dispersion de la lumière par les gouttes d\'eau', 'La diffraction de la lumière', 'La polarisation de la lumière'], answer: 'La réfraction et dispersion de la lumière par les gouttes d\'eau', explanation: 'Les gouttes d\'eau réfractent et dispersent la lumière blanche en ses couleurs composantes (rouge, orange, jaune, vert, bleu, indigo, violet).', hint: 'Les gouttes d\'eau agissent comme des prismes.' },
    ],
  },

  {
    id: '1-3', semaineIndex: 1, jourIndex: 3, ordre: 8,
    label: 'Jeu 9 juil.', type: 'lecon', matiere: 'géographie', difficulte: 2,
    lecon: 'Géographie — Les espaces urbains dans le monde',
    detail: 'Une métropole est une grande ville qui concentre population, pouvoirs et activités. En 2024, plus de 55 % de la population mondiale est urbaine. Les mégapoles (+ de 10 millions d\'hab.) sont souvent dans les pays émergents (Tokyo, Mumbai, São Paulo).',
    tip: 'Distingue : village < ville < agglomération < métropole < mégapole.',
    lessonPage: 24, exercisesPage: 25, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '1-3-1', type: 'qcm', question: 'À partir de combien d\'habitants parle-t-on de mégapole ?', options: ['1 million', '5 millions', '10 millions', '100 millions'], answer: '10 millions', explanation: 'Une mégapole est une agglomération de plus de 10 millions d\'habitants. Ex. : Tokyo (37 M), Mumbai (21 M).', hint: 'Méga = très grand (préfixe grec).' },
      { id: '1-3-2', type: 'vrai_faux', question: 'La majorité de la population mondiale vit aujourd\'hui en ville.', answer: 'vrai', explanation: 'Depuis 2007, la population urbaine dépasse la population rurale au niveau mondial. En 2024 : ~56% d\'urbains.', hint: 'L\'urbanisation est un phénomène mondial majeur du XXIe siècle.' },
      { id: '1-3-3', type: 'completer', question: 'La plus grande agglomération du monde est ___, au Japon.', answer: 'Tokyo', explanation: 'Tokyo-Yokohama est l\'agglomération la plus peuplée du monde avec environ 37 millions d\'habitants.', hint: 'C\'est la capitale du Japon.' },
      { id: '1-3-4', type: 'qcm', question: 'Que désigne le terme « rurbanisation » ?', options: ['La migration vers les campagnes', 'L\'extension des villes vers les zones rurales périurbaines', 'La destruction des villes', 'La création de nouvelles villes'], answer: 'L\'extension des villes vers les zones rurales périurbaines', explanation: 'La rurbanisation (ou périurbanisation) désigne l\'étalement des agglomérations urbaines dans les espaces ruraux alentour.', hint: 'Rural + urbanisation = ?' },
    ],
  },

  {
    id: '1-4', semaineIndex: 1, jourIndex: 4, ordre: 9,
    label: 'Ven 10 juil.', type: 'lecon', matiere: 'technologie', difficulte: 1,
    lecon: 'Technologie — Les matériaux et leurs propriétés',
    detail: 'Les matériaux se classent en familles : métaux (fer, aluminium), plastiques (PVC, PET), bois, verres, composites. Chaque matériau a des propriétés mécaniques (résistance), thermiques, électriques et optiques qui guident son usage.',
    tip: 'Pour choisir un matériau, on analyse ses propriétés : conducteur/isolant, rigide/souple, transparent/opaque, léger/lourd.',
    lessonPage: 26, exercisesPage: 27, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '1-4-1', type: 'qcm', question: 'Quel matériau est le meilleur conducteur électrique ?', options: ['Le bois', 'Le plastique', 'Le cuivre', 'Le verre'], answer: 'Le cuivre', explanation: 'Le cuivre est un excellent conducteur électrique. C\'est pourquoi on l\'utilise dans les fils électriques.', hint: 'Pense aux fils électriques.' },
      { id: '1-4-2', type: 'vrai_faux', question: 'Le plastique est un isolant thermique et électrique.', answer: 'vrai', explanation: 'Le plastique ne conduit ni la chaleur ni l\'électricité : c\'est un isolant. C\'est pourquoi les prises électriques sont en plastique.', hint: 'Les manchons des fils électriques sont en plastique pour nous protéger.' },
      { id: '1-4-3', type: 'completer', question: 'Un matériau ___ laisse passer la lumière sans qu\'on puisse voir à travers clairement (ex. verre dépoli).', answer: 'translucide', explanation: 'Translucide = laisse passer la lumière mais diffuse les images. Transparent = laisse voir nettement. Opaque = ne laisse pas passer la lumière.', hint: 'Entre transparent et opaque.' },
      { id: '1-4-4', type: 'qcm', question: 'Pour fabriquer une bouteille d\'eau recyclable, on choisit :', options: ['De l\'acier', 'Du béton', 'Du PET (plastique)', 'Du bois'], answer: 'Du PET (plastique)', explanation: 'Le PET (polytéréphtalate d\'éthylène) est léger, transparent, résistant et recyclable : idéal pour les bouteilles d\'eau.', hint: 'Le numéro 1 sur les bouteilles = PET.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 3 — Approfondir
  // ══════════════════════════════════════

  {
    id: '2-0', semaineIndex: 2, jourIndex: 0, ordre: 10,
    label: 'Lun 13 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — L\'imparfait et le passé simple',
    detail: 'Dans un récit au passé, l\'imparfait décrit (cadre, durée, habitude) et le passé simple raconte les actions (ponctuelles, successives). Ex. : « Le soleil brillait [imparfait] quand le chevalier apparut [passé simple]. »',
    tip: 'Règle rapide : imparfait = décor/description ; passé simple = action qui fait avancer le récit.',
    lessonPage: 29, exercisesPage: 30, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '2-0-1', type: 'qcm', question: 'Dans « Les oiseaux chantaient pendant qu\'il traversa la forêt. », quel temps est incorrect ?', options: ['chantaient (imparfait)', 'traversa (passé simple)', 'Les deux sont corrects', 'Les deux sont incorrects'], answer: 'traversa (passé simple)', explanation: 'Avec « pendant que » (simultanéité/durée), on utilise l\'imparfait pour les deux actions : « pendant qu\'il traversait ».', hint: '« Pendant que » exprime la simultanéité → imparfait dans les deux propositions.' },
      { id: '2-0-2', type: 'completer', question: 'Conjugue « être » au passé simple, 3e personne du singulier : il ___.', answer: 'fut', explanation: 'Être au passé simple : je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent.', hint: 'Passé simple d\'être : pas de rapport avec l\'imparfait (était).' },
      { id: '2-0-3', type: 'vrai_faux', question: 'L\'imparfait s\'utilise pour décrire une action ponctuelle qui fait avancer le récit.', answer: 'faux', explanation: 'Le passé simple s\'utilise pour les actions ponctuelles qui font avancer le récit. L\'imparfait sert à la description, la durée, l\'habitude.', hint: 'Imparfait = durée/description. Passé simple = action ponctuelle.' },
      { id: '2-0-4', type: 'qcm', question: 'Choisir le bon temps : « Il ___ (pleuvoir) depuis le matin quand l\'orage ___ (éclater). »', options: ['pleuvait / éclata', 'plut / éclata', 'pleuvait / éclatait', 'plut / éclatait'], answer: 'pleuvait / éclata', explanation: 'Pleuvait (imparfait = description de fond) / éclata (passé simple = action soudaine et ponctuelle).', hint: 'Durée en fond → imparfait. Action soudaine → passé simple.' },
    ],
  },

  {
    id: '2-1', semaineIndex: 2, jourIndex: 1, ordre: 11,
    label: 'Mar 14 juil.', type: 'repos', matiere: 'français', difficulte: 1,
    lecon: '🎆 Fête nationale — Journée légère',
    detail: 'C\'est le 14 juillet ! Une courte révision pour garder le rythme.',
    tip: 'Ton cerveau consolide ce qu\'il a appris pendant les moments de repos.',
    lessonPage: 31, exercisesPage: 32, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '2-1-1', type: 'qcm', question: 'La Révolution française a débuté en :', options: ['1776', '1789', '1799', '1815'], answer: '1789', explanation: 'La Révolution française débute en 1789 avec la prise de la Bastille le 14 juillet.', hint: 'La fête nationale commémore le 14 juillet 1789.' },
      { id: '2-1-2', type: 'completer', question: 'La devise de la République française est Liberté, Égalité, ___.', answer: 'Fraternité', explanation: 'Liberté, Égalité, Fraternité est la devise officielle de la République française depuis 1848.', hint: 'Trois mots, trois valeurs fondamentales.' },
      { id: '2-1-3', type: 'vrai_faux', question: 'La Marseillaise a été composée pendant la Révolution française.', answer: 'vrai', explanation: 'La Marseillaise a été composée en 1792 par Rouget de Lisle à Strasbourg, pendant la Révolution.', hint: 'Elle date de la même époque que la Révolution.' },
    ],
  },

  {
    id: '2-2', semaineIndex: 2, jourIndex: 2, ordre: 12,
    label: 'Mer 15 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — La proportionnalité et les pourcentages',
    detail: 'Deux grandeurs sont proportionnelles si leur rapport est constant (coefficient). Un pourcentage est un rapport dont le dénominateur est 100. Calculer 20 % de 150 : 150 × 20/100 = 30.',
    tip: 'Pour calculer t% de n : n × t ÷ 100. Augmenter de t% : multiplier par (1 + t/100).',
    lessonPage: 33, exercisesPage: 34, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '2-2-1', type: 'qcm', question: 'Calcule 15 % de 200.', options: ['15', '20', '30', '3'], answer: '30', explanation: '15 % de 200 = 200 × 15 ÷ 100 = 200 × 0,15 = 30.', hint: 'Pourcentage = × t ÷ 100.' },
      { id: '2-2-2', type: 'completer', question: 'Un article coûte 80 €. Il est soldé à −25 %. Il coûte maintenant ___ €.', answer: '60', explanation: 'Réduction = 80 × 25/100 = 20 €. Prix final = 80 − 20 = 60 €.', hint: 'Calcule d\'abord la réduction, puis soustrais.' },
      { id: '2-2-3', type: 'vrai_faux', question: 'Augmenter un prix de 10 % puis le diminuer de 10 % redonne le prix initial.', answer: 'faux', explanation: 'Ex. : 100 € + 10 % = 110 €. 110 € − 10 % = 110 × 0,90 = 99 €. On n\'obtient pas 100 €.', hint: 'Les pourcentages s\'appliquent sur des bases différentes.' },
      { id: '2-2-4', type: 'qcm', question: 'Dans un tableau de proportionnalité, si x = 4 donne y = 10, quelle est la valeur de y pour x = 6 ?', options: ['12', '15', '16', '24'], answer: '15', explanation: 'Coefficient = 10/4 = 2,5. Pour x = 6 : y = 6 × 2,5 = 15.', hint: 'Calcule le coefficient k = y/x, puis applique-le.' },
    ],
  },

  {
    id: '2-3', semaineIndex: 2, jourIndex: 3, ordre: 13,
    label: 'Jeu 16 juil.', type: 'lecon', matiere: 'svt', difficulte: 2,
    lecon: 'SVT — La reproduction humaine',
    detail: 'La reproduction humaine est sexuée : elle nécessite la rencontre d\'un spermatozoïde (gamète mâle) et d\'un ovule (gamète femelle) → fécondation → zygote → embryon → fœtus → naissance (après ~9 mois de gestation).',
    tip: 'Mémorise les étapes : gamètes → fécondation → zygote → embryon (8 sem.) → fœtus (jusqu\'à la naissance).',
    lessonPage: 35, exercisesPage: 36, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '2-3-1', type: 'qcm', question: 'Qu\'est-ce que la fécondation ?', options: ['La division d\'une cellule en deux', 'La rencontre et la fusion d\'un spermatozoïde et d\'un ovule', 'La naissance d\'un bébé', 'La formation des gamètes'], answer: 'La rencontre et la fusion d\'un spermatozoïde et d\'un ovule', explanation: 'La fécondation est la fusion du gamète mâle (spermatozoïde) et du gamète femelle (ovule) pour former un zygote (première cellule de l\'embryon).', hint: 'C\'est l\'union des deux cellules reproductrices.' },
      { id: '2-3-2', type: 'completer', question: 'La durée de la grossesse chez la femme est d\'environ ___ mois.', answer: '9', explanation: 'La gestation humaine dure environ 9 mois (38 à 40 semaines d\'aménorrhée).', hint: 'C\'est une durée connue de tous.' },
      { id: '2-3-3', type: 'vrai_faux', question: 'L\'ovule est le gamète mâle.', answer: 'faux', explanation: 'L\'ovule est le gamète FEMELLE. Le gamète mâle est le spermatozoïde.', hint: 'L\'ovule vient des ovaires (femelle). Le spermatozoïde vient des testicules (mâle).' },
      { id: '2-3-4', type: 'qcm', question: 'Comment s\'appelle la cellule résultant de la fécondation ?', options: ['Embryon', 'Zygote', 'Fœtus', 'Gamète'], answer: 'Zygote', explanation: 'Le zygote est la toute première cellule formée après la fécondation. Il se divise ensuite pour former l\'embryon.', hint: 'C\'est la première cellule de la nouvelle vie.' },
    ],
  },

  {
    id: '2-4', semaineIndex: 2, jourIndex: 4, ordre: 14,
    label: 'Ven 17 juil.', type: 'lecon', matiere: 'anglais', difficulte: 2,
    lecon: 'Anglais — Le Past Simple (régulier et irrégulier)',
    detail: 'Le Past Simple exprime une action terminée dans le passé. Verbes réguliers : V + -ed (worked, played). Verbes irréguliers à mémoriser : go→went, see→saw, eat→ate, have→had, be→was/were.',
    tip: 'Marqueurs temporels du Past Simple : yesterday, last week, in 2020, ago, when…',
    lessonPage: 37, exercisesPage: 38, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '2-4-1', type: 'qcm', question: 'What is the Past Simple of « go »?', options: ['goed', 'gone', 'went', 'going'], answer: 'went', explanation: '« Go » is an irregular verb: go → went → gone. « Went » is the Past Simple form.', hint: 'Irregular! Not « goed ».' },
      { id: '2-4-2', type: 'completer', question: 'Conjugate in Past Simple: « She ___ (visit) Rome last summer. »', answer: 'visited', explanation: '« Visit » is regular: visit + ed = visited. « Last summer » confirms Past Simple.', hint: 'Regular verb: add -ed.' },
      { id: '2-4-3', type: 'vrai_faux', question: '« Did you saw the film? » is grammatically correct.', answer: 'faux', explanation: 'After the auxiliary « did », we use the base form: « Did you SEE the film? » not « saw ».', hint: 'After did/didn\'t, use the base form (infinitive without to).' },
      { id: '2-4-4', type: 'qcm', question: 'Which sentence is in Past Simple?', options: ['She is eating pizza.', 'She eats pizza every day.', 'She ate pizza yesterday.', 'She will eat pizza.'], answer: 'She ate pizza yesterday.', explanation: '« Ate » is Past Simple of « eat » (irregular). « Yesterday » confirms the past.', hint: 'Look for a past form of the verb and a past time marker.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 4 — Consolider
  // ══════════════════════════════════════

  {
    id: '3-0', semaineIndex: 3, jourIndex: 0, ordre: 15,
    label: 'Lun 20 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — Les types de textes : narratif, descriptif, argumentatif',
    detail: 'Un texte narratif raconte des événements (roman, conte). Un texte descriptif présente un lieu, une personne, un objet avec des détails sensoriels. Un texte argumentatif défend une thèse avec des arguments et des exemples.',
    tip: 'Pour identifier un type de texte : cherche l\'intention de l\'auteur. Raconter ? Décrire ? Convaincre ?',
    lessonPage: 40, exercisesPage: 41, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '3-0-1', type: 'qcm', question: 'Un texte qui raconte l\'histoire d\'un héros qui surmonte des épreuves est un texte :', options: ['Descriptif', 'Argumentatif', 'Narratif', 'Injonctif'], answer: 'Narratif', explanation: 'Un texte narratif raconte une histoire avec des personnages, des événements, une chronologie.', hint: 'Narratif vient de « narrer » = raconter.' },
      { id: '3-0-2', type: 'vrai_faux', question: 'Dans un texte argumentatif, on doit obligatoirement donner la thèse adverse (contre-argument).', answer: 'faux', explanation: 'Dans un texte argumentatif simple, on peut se contenter d\'exposer sa thèse et ses arguments. La concession (contre-argument) enrichit l\'argumentation mais n\'est pas obligatoire.', hint: 'Un argumentatif défend une thèse avec des arguments. La concession est une technique rhétorique, pas une obligation.' },
      { id: '3-0-3', type: 'completer', question: 'Un texte qui donne des instructions (recette, mode d\'emploi) est de type ___.', answer: 'injonctif', explanation: 'Le type injonctif (ou prescriptif) donne des ordres, des instructions, des conseils. Il utilise souvent l\'impératif.', hint: 'Injonctif vient d\'« injonction » = ordre.' },
      { id: '3-0-4', type: 'qcm', question: 'Quel connecteur logique introduit un argument supplémentaire ?', options: ['Cependant', 'De plus', 'Mais', 'Pourtant'], answer: 'De plus', explanation: '« De plus » (aussi : « en outre », « également ») introduit un argument qui s\'ajoute au précédent. « Cependant », « mais », « pourtant » introduisent une opposition.', hint: 'Connecteur d\'addition : de plus, également, en outre…' },
    ],
  },

  {
    id: '3-1', semaineIndex: 3, jourIndex: 1, ordre: 16,
    label: 'Mar 21 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Le calcul littéral : expressions et équations',
    detail: 'Le calcul littéral utilise des lettres pour représenter des nombres. Réduire une expression : regrouper les termes semblables. Résoudre une équation : trouver la valeur de l\'inconnue. Ex. : 2x + 5 = 13 → 2x = 8 → x = 4.',
    tip: 'Pour résoudre une équation : isole l\'inconnue en faisant la même opération des deux côtés du signe =.',
    lessonPage: 42, exercisesPage: 43, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '3-1-1', type: 'qcm', question: 'Résous : 3x + 7 = 22. Quelle est la valeur de x ?', options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'], answer: 'x = 5', explanation: '3x + 7 = 22 → 3x = 22 − 7 = 15 → x = 15 ÷ 3 = 5. Vérification : 3×5 + 7 = 15 + 7 = 22 ✓', hint: 'Isole le terme en x : soustrait 7 des deux côtés, puis divise par 3.' },
      { id: '3-1-2', type: 'completer', question: 'Réduis l\'expression : 4a + 3b − 2a + b = ___', answer: '2a + 4b', explanation: 'On regroupe les termes en a : 4a − 2a = 2a. Et les termes en b : 3b + b = 4b. Résultat : 2a + 4b.', hint: 'Regroupe les termes avec la même lettre.' },
      { id: '3-1-3', type: 'vrai_faux', question: 'Dans l\'expression 5x² + 3x − 2, le coefficient de x est 3.', answer: 'vrai', explanation: 'Le coefficient de x (degré 1) est bien 3 dans cette expression polynomiale.', hint: 'Le coefficient est le nombre qui multiplie la lettre.' },
      { id: '3-1-4', type: 'qcm', question: 'Si x = 3, quelle est la valeur de 2x² − x + 1 ?', options: ['10', '16', '13', '7'], answer: '16', explanation: '2×(3²) − 3 + 1 = 2×9 − 3 + 1 = 18 − 3 + 1 = 16.', hint: 'Remplace x par 3 dans l\'expression et calcule en respectant les priorités.' },
    ],
  },

  {
    id: '3-2', semaineIndex: 3, jourIndex: 2, ordre: 17,
    label: 'Mer 22 juil.', type: 'lecon', matiere: 'histoire', difficulte: 2,
    lecon: 'Histoire — L\'Humanisme et la Renaissance',
    detail: 'La Renaissance (XVe–XVIe s.) est un renouveau intellectuel et artistique qui commence en Italie. L\'Humanisme place l\'Homme au centre (Érasme, Rabelais, Montaigne). L\'imprimerie (Gutenberg, 1450) révolutionne la diffusion du savoir.',
    tip: 'Renaissance = retour aux textes antiques + curiosité pour l\'Homme = Humanisme.',
    lessonPage: 44, exercisesPage: 45, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '3-2-1', type: 'qcm', question: 'Quel est le pays d\'origine de la Renaissance ?', options: ['France', 'Espagne', 'Italie', 'Allemagne'], answer: 'Italie', explanation: 'La Renaissance naît en Italie au XIVe–XVe s. (Florence, Venise, Rome) avant de se répandre en Europe.', hint: 'Pense à Léonard de Vinci, Michel-Ange, Raphaël…' },
      { id: '3-2-2', type: 'completer', question: 'Gutenberg invente l\'imprimerie avec caractères mobiles vers ___.', answer: '1450', explanation: 'Vers 1450, Johannes Gutenberg perfectionne l\'imprimerie à caractères mobiles en Allemagne, révolutionnant la diffusion des livres.', hint: 'C\'est au milieu du XVe siècle.' },
      { id: '3-2-3', type: 'vrai_faux', question: 'L\'Humanisme met Dieu au centre de toute réflexion philosophique.', answer: 'faux', explanation: 'L\'Humanisme place l\'Homme au centre (d\'où le nom). Ce courant valorise la raison, l\'éducation et la dignité humaine.', hint: 'Huma-nisme → l\'Homme au centre, pas Dieu.' },
      { id: '3-2-4', type: 'qcm', question: 'Quel auteur humaniste français a écrit Pantagruel et Gargantua ?', options: ['Montaigne', 'Rabelais', 'Erasme', 'Calvin'], answer: 'Rabelais', explanation: 'François Rabelais (1483–1553) est l\'auteur de Gargantua et Pantagruel, romans humanistes et satiriques.', hint: 'Il a créé des géants philosophes.' },
    ],
  },

  {
    id: '3-3', semaineIndex: 3, jourIndex: 3, ordre: 18,
    label: 'Jeu 23 juil.', type: 'lecon', matiere: 'physique', difficulte: 3,
    lecon: 'Physique-Chimie — Les mélanges et la dissolution',
    detail: 'Un soluté se dissout dans un solvant pour former une solution. La concentration massique c = m/V (g/L). Une solution saturée ne peut plus dissoudre de soluté. La solubilité dépend de la température.',
    tip: 'c (g/L) = masse du soluté (g) ÷ volume de la solution (L). Attention : volume de la solution, pas du solvant.',
    lessonPage: 46, exercisesPage: 47, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '3-3-1', type: 'qcm', question: 'Quelle est la concentration d\'une solution obtenue en dissolvant 5 g de sel dans 250 mL d\'eau ?', options: ['0,5 g/L', '2 g/L', '20 g/L', '12,5 g/L'], answer: '20 g/L', explanation: 'c = m/V = 5 g ÷ 0,250 L = 20 g/L. (250 mL = 0,250 L).', hint: 'Convertis mL en L avant de calculer.' },
      { id: '3-3-2', type: 'vrai_faux', question: 'La solubilité d\'un solide dans l\'eau augmente généralement avec la température.', answer: 'vrai', explanation: 'En général, chauffer l\'eau permet de dissoudre plus de solide : la solubilité augmente avec la température (ex. sucre, sel).', hint: 'L\'eau chaude dissout mieux que l\'eau froide.' },
      { id: '3-3-3', type: 'completer', question: 'Dans une solution saline, l\'eau est le ___ et le sel est le ___.', answer: 'solvant / soluté', explanation: 'Le solvant est le liquide dans lequel on dissout (eau). Le soluté est la substance dissoute (sel).', hint: 'Solvant = dissout. Soluté = dissous.' },
      { id: '3-3-4', type: 'qcm', question: 'Comment sépare-t-on un mélange eau + sucre dissous ?', options: ['Filtration', 'Décantation', 'Évaporation', 'Distillation'], answer: 'Évaporation', explanation: 'L\'eau s\'évapore en chauffant, laissant le sucre cristallisé. On peut aussi utiliser la distillation pour récupérer l\'eau.', hint: 'Le sucre ne s\'évapore pas, mais l\'eau oui.' },
    ],
  },

  {
    id: '3-4', semaineIndex: 3, jourIndex: 4, ordre: 19,
    label: 'Ven 24 juil.', type: 'lecon', matiere: 'anglais', difficulte: 3,
    lecon: 'Anglais — Le Present Perfect',
    detail: 'Le Present Perfect lie le passé au présent : une action passée dont le résultat est visible maintenant. Forme : have/has + participe passé. Ex. : « I have lost my keys. » (= je les ai perdues et je ne les trouve toujours pas).',
    tip: 'Marqueurs : just, already, yet, ever, never, since, for → Present Perfect. Yesterday, last…, in 2020 → Past Simple.',
    lessonPage: 48, exercisesPage: 49, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '3-4-1', type: 'qcm', question: 'Which sentence uses the Present Perfect correctly?', options: ['She has visited Paris last year.', 'She has never been to Paris.', 'She have visited Paris.', 'She visited Paris since 2020.'], answer: 'She has never been to Paris.', explanation: '« Never » signals Present Perfect. « Last year » requires Past Simple. « Have » must agree with subject (she → has).', hint: '« Never » → Present Perfect.' },
      { id: '3-4-2', type: 'completer', question: '« I ___ (eat) already. » → Fill in with Present Perfect.', answer: 'have already eaten', explanation: 'Already + Present Perfect: have/has + past participle. Eat → eaten (irregular).', hint: 'already + have + past participle.' },
      { id: '3-4-3', type: 'vrai_faux', question: '« Have you ever tried sushi? » is a correct Present Perfect question.', answer: 'vrai', explanation: '« Ever » in questions about life experience → Present Perfect: Have you + ever + past participle?', hint: '« Ever » in questions = Present Perfect.' },
      { id: '3-4-4', type: 'qcm', question: 'Past Simple or Present Perfect? « He ___ (live) here for 10 years. »', options: ['lived', 'has lived', 'is living', 'was living'], answer: 'has lived', explanation: '« For + duration » connecting past to present → Present Perfect: he has lived here for 10 years (and still does).', hint: '« For » + duration → Present Perfect (still ongoing).' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 5 — Maîtriser
  // ══════════════════════════════════════

  {
    id: '4-0', semaineIndex: 4, jourIndex: 0, ordre: 20,
    label: 'Lun 27 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — Les figures de style : métaphore, hyperbole, antithèse',
    detail: 'Métaphore : comparaison sans outil (« ses yeux sont des étoiles »). Hyperbole : exagération (« je t\'ai dit mille fois »). Antithèse : opposition de deux idées (« je l\'aime, je le hais »). Ces figures renforcent l\'expression.',
    tip: 'Pour identifier une figure : cherche l\'effet produit. Exagération = hyperbole. Opposition = antithèse. Comparaison sans « comme » = métaphore.',
    lessonPage: 51, exercisesPage: 52, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '4-0-1', type: 'qcm', question: 'Identifie la figure dans « Il a pleuré des rivières de larmes ».', options: ['Métaphore', 'Comparaison', 'Hyperbole', 'Antithèse'], answer: 'Hyperbole', explanation: '« Des rivières de larmes » est une exagération (hyperbole) pour amplifier l\'intensité des pleurs.', hint: 'Exagération volontaire pour créer un effet = hyperbole.' },
      { id: '4-0-2', type: 'completer', question: '« Partir, c\'est mourir un peu » est une ___ (figure qui compare sans outil).', answer: 'métaphore', explanation: 'Partir EST mourir un peu : on assimile le départ à une petite mort sans utiliser « comme ». C\'est une métaphore.', hint: 'Comparaison sans comme/tel → métaphore.' },
      { id: '4-0-3', type: 'vrai_faux', question: 'L\'antithèse rapproche deux idées similaires pour les renforcer.', answer: 'faux', explanation: 'L\'antithèse rapproche deux idées OPPOSÉES pour créer un contraste expressif. Ex. : « Blanc comme la neige, noir comme la nuit ».', hint: 'Anti- = contre → opposition.' },
      { id: '4-0-4', type: 'qcm', question: 'Dans « La vie est un long fleuve tranquille », quelle figure identifie-t-on ?', options: ['Hyperbole', 'Comparaison', 'Métaphore', 'Antithèse'], answer: 'Métaphore', explanation: 'La vie est assimilée à un fleuve tranquille sans outil de comparaison : c\'est une métaphore filée.', hint: 'Pas de « comme » = métaphore.' },
    ],
  },

  {
    id: '4-1', semaineIndex: 4, jourIndex: 1, ordre: 21,
    label: 'Mar 28 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Les angles et les triangles',
    detail: 'Un triangle a 3 angles dont la somme = 180°. Triangle rectangle (1 angle 90°), isocèle (2 côtés égaux), équilatéral (3 côtés égaux). Le théorème de Pythagore : dans un triangle rectangle, c² = a² + b² (c = hypoténuse).',
    tip: 'Pythagore : l\'hypoténuse est toujours le côté opposé à l\'angle droit (le plus long côté).',
    lessonPage: 53, exercisesPage: 54, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '4-1-1', type: 'qcm', question: 'Un triangle a deux angles de 45° chacun. Quel est le troisième angle ?', options: ['45°', '90°', '80°', '100°'], answer: '90°', explanation: 'Somme des angles d\'un triangle = 180°. 180° − 45° − 45° = 90°. C\'est donc un triangle rectangle isocèle.', hint: 'Somme des 3 angles = 180°.' },
      { id: '4-1-2', type: 'completer', question: 'Dans un triangle rectangle avec les côtés 3 cm et 4 cm, l\'hypoténuse mesure ___ cm.', answer: '5', explanation: 'Pythagore : c² = 3² + 4² = 9 + 16 = 25 → c = √25 = 5 cm. (Triangle 3-4-5 : triangle de référence !)', hint: 'c² = a² + b² → c = √(a² + b²).' },
      { id: '4-1-3', type: 'vrai_faux', question: 'Dans un triangle équilatéral, chaque angle mesure 60°.', answer: 'vrai', explanation: '3 angles égaux dans un triangle → 180° ÷ 3 = 60° chacun.', hint: 'Équilatéral = 3 angles égaux = 180°/3.' },
      { id: '4-1-4', type: 'qcm', question: 'Un triangle isocèle a deux côtés de 7 cm et un angle au sommet de 40°. Quels sont les deux angles à la base ?', options: ['40° et 100°', '70° et 70°', '60° et 80°', '50° et 90°'], answer: '70° et 70°', explanation: 'Triangle isocèle → deux angles à la base égaux. 180° − 40° = 140°. 140° ÷ 2 = 70° chacun.', hint: 'Triangle isocèle : les deux angles à la base sont égaux.' },
    ],
  },

  {
    id: '4-2', semaineIndex: 4, jourIndex: 2, ordre: 22,
    label: 'Mer 29 juil.', type: 'lecon', matiere: 'géographie', difficulte: 3,
    lecon: 'Géographie — Le développement durable',
    detail: 'Le développement durable répond aux besoins du présent sans compromettre les besoins des générations futures (définition Brundtland, 1987). Il repose sur 3 piliers : économique, social et environnemental. Les ODD (Objectifs de Développement Durable) de l\'ONU fixent 17 objectifs à atteindre d\'ici 2030.',
    tip: 'Les 3 piliers du DD : Économie (croissance) + Social (équité) + Environnement (préservation).',
    lessonPage: 55, exercisesPage: 56, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '4-2-1', type: 'qcm', question: 'Combien y a-t-il d\'Objectifs de Développement Durable (ODD) fixés par l\'ONU ?', options: ['7', '12', '17', '21'], answer: '17', explanation: 'L\'Agenda 2030 de l\'ONU comprend 17 ODD adoptés en 2015, couvrant la pauvreté, la santé, l\'éducation, le climat, etc.', hint: 'Adoptés en 2015, à atteindre en 2030.' },
      { id: '4-2-2', type: 'vrai_faux', question: 'Le développement durable prend uniquement en compte l\'aspect environnemental.', answer: 'faux', explanation: 'Le développement durable articule TROIS piliers : économique, social ET environnemental. Aucun des trois ne doit être sacrifié.', hint: 'Trois piliers, pas un seul.' },
      { id: '4-2-3', type: 'completer', question: 'Le rapport Brundtland (1987) définit le développement durable comme répondant aux besoins du présent sans compromettre ceux des générations ___.', answer: 'futures', explanation: 'C\'est la définition fondamentale du développement durable : satisfaire les besoins actuels sans hypothéquer l\'avenir.', hint: 'Le développement durable pense à l\'avenir.' },
      { id: '4-2-4', type: 'qcm', question: 'Quelle énergie est une énergie renouvelable ?', options: ['Le pétrole', 'Le charbon', 'L\'énergie éolienne', 'Le gaz naturel'], answer: 'L\'énergie éolienne', explanation: 'L\'énergie éolienne (vent) est renouvelable et ne produit pas de CO₂. Le pétrole, le charbon et le gaz sont des énergies fossiles non renouvelables.', hint: 'Éolienne vient de « Éole », dieu du vent.' },
    ],
  },

  {
    id: '4-3', semaineIndex: 4, jourIndex: 3, ordre: 23,
    label: 'Jeu 30 juil.', type: 'lecon', matiere: 'svt', difficulte: 3,
    lecon: 'SVT — Les écosystèmes et la biodiversité',
    detail: 'Un écosystème est l\'ensemble formé par les êtres vivants (biocénose) et leur milieu (biotope). La biodiversité désigne la variété du vivant. Les chaînes alimentaires s\'organisent en producteurs (végétaux) → consommateurs primaires → secondaires → décomposeurs.',
    tip: 'Biocénose = vivants. Biotope = milieu. Ensemble = écosystème.',
    lessonPage: 57, exercisesPage: 58, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '4-3-1', type: 'qcm', question: 'Qu\'est-ce que la biocénose ?', options: ['Le milieu physique d\'un écosystème', 'L\'ensemble des êtres vivants d\'un écosystème', 'La quantité d\'eau disponible', 'Les interactions entre les espèces seulement'], answer: 'L\'ensemble des êtres vivants d\'un écosystème', explanation: 'La biocénose regroupe tous les êtres vivants (animaux, végétaux, champignons, bactéries) d\'un écosystème donné.', hint: 'Bio = vie → biocénose = communauté du vivant.' },
      { id: '4-3-2', type: 'vrai_faux', question: 'La disparition d\'une espèce dans un écosystème n\'affecte pas les autres espèces.', answer: 'faux', explanation: 'Les espèces sont interdépendantes dans un écosystème. La disparition d\'une espèce peut déséquilibrer toute la chaîne alimentaire.', hint: 'Tout est lié dans un écosystème : pense aux chaînes alimentaires.' },
      { id: '4-3-3', type: 'completer', question: 'Dans la chaîne : herbe → lapin → renard → ver de terre, le ver de terre est un ___.', answer: 'décomposeur', explanation: 'Les décomposeurs (vers de terre, bactéries, champignons) décomposent la matière organique morte et la restituent au sol.', hint: 'Le ver de terre décompose la matière morte.' },
      { id: '4-3-4', type: 'qcm', question: 'Que désigne la biodiversité ?', options: ['La quantité de biomasse d\'un écosystème', 'La variété des espèces vivantes et de leurs interactions', 'Le nombre d\'individus d\'une espèce', 'La résistance d\'un écosystème aux perturbations'], answer: 'La variété des espèces vivantes et de leurs interactions', explanation: 'La biodiversité englobe la diversité des espèces, des gènes et des écosystèmes. C\'est un indicateur de la santé du vivant.', hint: 'Bio = vie, diversité = variété.' },
    ],
  },

  {
    id: '4-4', semaineIndex: 4, jourIndex: 4, ordre: 24,
    label: 'Ven 31 juil.', type: 'lecon', matiere: 'technologie', difficulte: 2,
    lecon: 'Technologie — La programmation par blocs',
    detail: 'La programmation par blocs (Scratch, Blockly) permet de créer des programmes sans syntaxe complexe. Les concepts clés : séquence (instructions dans l\'ordre), boucle (répétition), condition (si… alors…), variable (stockage d\'une valeur).',
    tip: 'Séquence → ordre. Boucle → répétition. Condition → choix. Variable → mémoire.',
    lessonPage: 59, exercisesPage: 60, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '4-4-1', type: 'qcm', question: 'Qu\'est-ce qu\'une boucle en programmation ?', options: ['Une instruction exécutée une seule fois', 'Une erreur dans le code', 'Une instruction répétée plusieurs fois', 'Un type de variable'], answer: 'Une instruction répétée plusieurs fois', explanation: 'Une boucle (loop) permet de répéter un bloc d\'instructions un certain nombre de fois ou tant qu\'une condition est vraie.', hint: 'Loop = boucle = répétition.' },
      { id: '4-4-2', type: 'vrai_faux', question: 'Dans « si score > 10 alors afficher "Bravo" », la condition est « score > 10 ».', answer: 'vrai', explanation: 'La condition est l\'expression booléenne évaluée (vraie ou fausse). Ici : score > 10 est la condition.', hint: 'La condition vient après « si ».' },
      { id: '4-4-3', type: 'completer', question: 'Une ___ est un espace mémoire qui stocke une valeur pouvant changer au cours du programme.', answer: 'variable', explanation: 'Une variable est un conteneur nommé qui stocke une valeur (nombre, texte, booléen). Sa valeur peut être modifiée pendant l\'exécution.', hint: 'Elle peut varier → elle s\'appelle variable.' },
      { id: '4-4-4', type: 'qcm', question: 'Combien de fois s\'exécutera le bloc dans « répéter 5 fois : dire Bonjour » ?', options: ['1 fois', '5 fois', '10 fois', 'Indéfiniment'], answer: '5 fois', explanation: 'La boucle « répéter 5 fois » exécute les instructions à l\'intérieur exactement 5 fois.', hint: 'Répéter n fois → n exécutions.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 6 — Enrichir
  // ══════════════════════════════════════

  {
    id: '5-0', semaineIndex: 5, jourIndex: 0, ordre: 25,
    label: 'Lun 3 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — Le discours rapporté (direct, indirect)',
    detail: 'Le discours direct cite les paroles exactes entre guillemets : « Je viendrai demain. ». Le discours indirect rapporte les paroles dans une subordonnée : Il dit qu\'il viendrait le lendemain. Attention aux changements : pronoms, temps, indicateurs de temps.',
    tip: 'Direct → Indirect : « je » → il/elle ; présent → imparfait ; demain → le lendemain ; « » disparaissent.',
    lessonPage: 62, exercisesPage: 63, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '5-0-1', type: 'qcm', question: 'Transforme au discours indirect : « Je suis fatigué », dit-il.', options: ['Il dit qu\'il est fatigué.', 'Il dit qu\'il était fatigué.', 'Il dit qu\'il sera fatigué.', 'Il a dit : « Je suis fatigué. »'], answer: 'Il dit qu\'il était fatigué.', explanation: 'Verbe de parole au passé (dit) → on recule les temps. Présent → imparfait. « je » → il. Résultat : Il dit qu\'il était fatigué.', hint: 'Verbe introducteur au passé → le présent du discours direct devient imparfait.' },
      { id: '5-0-2', type: 'vrai_faux', question: 'Dans le discours indirect, on conserve les guillemets.', answer: 'faux', explanation: 'Dans le discours indirect, les guillemets disparaissent. Les paroles sont intégrées dans la phrase principale avec une conjonction (que).', hint: 'Guillemets = discours direct uniquement.' },
      { id: '5-0-3', type: 'completer', question: 'D.D. : « Viens demain ! » → D.I. : Il lui a demandé de venir ___.', answer: 'le lendemain', explanation: 'Passage au D.I. : « demain » → « le lendemain ». L\'ordre (impératif) devient infinitif avec « de ».', hint: 'Demain → le lendemain (changement d\'indicateur temporel).' },
      { id: '5-0-4', type: 'qcm', question: 'Quel est le verbe introducteur dans « Elle murmura qu\'elle avait peur. » ?', options: ['avait', 'peur', 'murmura', 'Elle'], answer: 'murmura', explanation: '« Murmura » est le verbe introducteur du discours indirect. Il indique comment les paroles ont été dites.', hint: 'Le verbe introducteur précède la proposition subordonnée.' },
    ],
  },

  {
    id: '5-1', semaineIndex: 5, jourIndex: 1, ordre: 26,
    label: 'Mar 4 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — Le cercle : périmètre, aire et angles',
    detail: 'Périmètre d\'un cercle : P = 2πR. Aire d\'un disque : A = πR². Angle inscrit dans un demi-cercle = 90°. π ≈ 3,14159. Si R est le rayon, D = 2R est le diamètre.',
    tip: 'Formules à retenir : P = 2πR et A = πR². Pense à ne pas confondre périmètre (longueur) et aire (surface).',
    lessonPage: 64, exercisesPage: 65, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '5-1-1', type: 'qcm', question: 'Calcule la circonférence d\'un cercle de rayon 5 cm. (π ≈ 3,14)', options: ['15,7 cm', '31,4 cm', '78,5 cm', '10 cm'], answer: '31,4 cm', explanation: 'P = 2πR = 2 × 3,14 × 5 = 31,4 cm.', hint: 'P = 2πR.' },
      { id: '5-1-2', type: 'completer', question: 'L\'aire d\'un disque de rayon 4 cm = ___ cm² (π ≈ 3,14)', answer: '50,24', explanation: 'A = πR² = 3,14 × 4² = 3,14 × 16 = 50,24 cm².', hint: 'A = πR².' },
      { id: '5-1-3', type: 'vrai_faux', question: 'Le diamètre est égal à deux fois le rayon.', answer: 'vrai', explanation: 'D = 2R. Si R = 7 cm, alors D = 14 cm. Le diamètre passe par le centre et relie deux points du cercle.', hint: 'Diamètre = 2 × rayon.' },
      { id: '5-1-4', type: 'qcm', question: 'Un disque a un diamètre de 10 cm. Quelle est son aire ? (π ≈ 3,14)', options: ['31,4 cm²', '78,5 cm²', '314 cm²', '15,7 cm²'], answer: '78,5 cm²', explanation: 'D = 10 cm → R = 5 cm. A = πR² = 3,14 × 25 = 78,5 cm².', hint: 'D = 10 → R = 5.' },
    ],
  },

  {
    id: '5-2', semaineIndex: 5, jourIndex: 2, ordre: 27,
    label: 'Mer 5 août', type: 'lecon', matiere: 'histoire', difficulte: 3,
    lecon: 'Histoire — Les Grandes Découvertes',
    detail: 'À partir de 1492, les Européens explorent le monde : Christophe Colomb découvre l\'Amérique (1492), Vasco de Gama atteint l\'Inde (1498), Magellan circumnavigue le globe (1519–1522). Ces voyages ouvrent un commerce mondial mais engendrent la colonisation et la traite des esclaves.',
    tip: '1492 = Christophe Colomb en Amérique. 1498 = Vasco de Gama en Inde. 1522 = premier tour du monde (Magellan/Elcano).',
    lessonPage: 66, exercisesPage: 67, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '5-2-1', type: 'qcm', question: 'Qui a effectué le premier tour du monde ?', options: ['Christophe Colomb', 'Vasco de Gama', 'Ferdinand Magellan (puis Elcano)', 'Amerigo Vespucci'], answer: 'Ferdinand Magellan (puis Elcano)', explanation: 'L\'expédition Magellan-Elcano (1519–1522) est la première à circumnaviguer le globe. Magellan mourut aux Philippines ; Elcano acheva le voyage.', hint: 'Il est parti d\'Espagne en 1519.' },
      { id: '5-2-2', type: 'completer', question: 'Christophe Colomb arrive en Amérique le 12 octobre ___.', answer: '1492', explanation: 'Le 12 octobre 1492, Christophe Colomb et son équipage abordent l\'île de Guanahani (Bahamas), croyant avoir atteint l\'Asie.', hint: 'C\'est aussi la fin du Moyen Âge (date de référence).' },
      { id: '5-2-3', type: 'vrai_faux', question: 'Les Grandes Découvertes ont uniquement eu des conséquences positives pour les populations amérindiennes.', answer: 'faux', explanation: 'Les Grandes Découvertes ont entraîné la colonisation, l\'exploitation et le déclin démographique catastrophique des populations amérindiennes (maladies, esclavage, violence).', hint: 'Pour les Amérindiens, ce furent souvent des « grandes catastrophes ».' },
      { id: '5-2-4', type: 'qcm', question: 'Quel navigateur portugais a atteint l\'Inde en contournant l\'Afrique en 1498 ?', options: ['Christophe Colomb', 'Magellan', 'Vasco de Gama', 'Bartolomeu Dias'], answer: 'Vasco de Gama', explanation: 'Vasco de Gama atteint Calicut (Inde) en 1498 en contournant le cap de Bonne-Espérance, ouvrant la route maritime des Indes.', hint: 'Il est portugais et a contourné l\'Afrique.' },
    ],
  },

  {
    id: '5-3', semaineIndex: 5, jourIndex: 3, ordre: 28,
    label: 'Jeu 6 août', type: 'lecon', matiere: 'physique', difficulte: 3,
    lecon: 'Physique-Chimie — L\'électricité : circuits et lois',
    detail: 'Un circuit électrique comprend un générateur, des conducteurs et des récepteurs. Loi des nœuds (//): I = I₁ + I₂. Loi des mailles (série): U = U₁ + U₂. Loi d\'Ohm : U = R × I. Unités : tension U en Volt (V), intensité I en Ampère (A), résistance R en Ohm (Ω).',
    tip: 'Loi d\'Ohm : U = R × I. Retiens : U = R×I → triangle URi.',
    lessonPage: 68, exercisesPage: 69, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '5-3-1', type: 'qcm', question: 'Quelle est l\'intensité dans un circuit si la résistance est 10 Ω et la tension 20 V ?', options: ['0,5 A', '2 A', '200 A', '30 A'], answer: '2 A', explanation: 'Loi d\'Ohm : I = U/R = 20/10 = 2 A.', hint: 'I = U ÷ R (loi d\'Ohm).' },
      { id: '5-3-2', type: 'vrai_faux', question: 'Dans un circuit en série, l\'intensité est la même en tout point.', answer: 'vrai', explanation: 'Dans un circuit série, il n\'y a pas de nœud : le même courant traverse tous les composants.', hint: 'Série = un seul chemin pour le courant.' },
      { id: '5-3-3', type: 'completer', question: 'La tension aux bornes d\'une résistance de 5 Ω traversée par 3 A est ___ V.', answer: '15', explanation: 'U = R × I = 5 × 3 = 15 V.', hint: 'U = R × I.' },
      { id: '5-3-4', type: 'qcm', question: 'Dans un circuit parallèle avec deux branches (I₁ = 0,3 A, I₂ = 0,5 A), quelle est l\'intensité totale ?', options: ['0,2 A', '0,3 A', '0,8 A', '1,5 A'], answer: '0,8 A', explanation: 'Loi des nœuds (circuit parallèle) : I = I₁ + I₂ = 0,3 + 0,5 = 0,8 A.', hint: 'Parallèle → les intensités s\'additionnent.' },
    ],
  },

  {
    id: '5-4', semaineIndex: 5, jourIndex: 4, ordre: 29,
    label: 'Ven 7 août', type: 'lecon', matiere: 'anglais', difficulte: 4,
    lecon: 'Anglais — Le futur : will vs going to',
    detail: '« Will » = décision spontanée, prédiction. « Going to » = intention planifiée, futur certain visible. Ex. : « I\'ll help you! » (spontané) vs « I\'m going to visit London next month. » (planifié).',
    tip: 'Spontané = will. Planifié / intention = going to. Preuve visible = going to.',
    lessonPage: 70, exercisesPage: 71, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '5-4-1', type: 'qcm', question: 'Which is correct? The phone rings. → « ___ answer it! »', options: ['I\'m going to answer it!', 'I will answer it!', 'I answer it!', 'I am answering it!'], answer: 'I will answer it!', explanation: 'Spontaneous decision at the moment of speaking → will. There was no plan beforehand.', hint: 'Spontaneous decision → will.' },
      { id: '5-4-2', type: 'completer', question: '« She has bought flour and eggs. She ___ make a cake. » (intention) → ___', answer: 'is going to', explanation: 'She has evidence of a plan (bought ingredients) → going to. « She is going to make a cake. »', hint: 'Clear evidence/plan → going to.' },
      { id: '5-4-3', type: 'vrai_faux', question: '« Look at those clouds! It will rain. » correctly uses « will » for a visible prediction.', answer: 'vrai', explanation: 'Actually, with visible evidence (clouds), « going to » is more natural: « It\'s going to rain. » However « will » for general predictions is also accepted.', hint: 'With visible evidence, « going to » is more natural, but « will » for predictions is acceptable.' },
      { id: '5-4-4', type: 'qcm', question: 'Choose the correct form: « We ___ visit Paris next summer – we\'ve already booked the hotel. »', options: ['will visit', 'are going to visit', 'visit', 'visited'], answer: 'are going to visit', explanation: 'Planned intention with evidence (hotel booked) → going to.', hint: 'Already planned and booked → going to.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 7 — Perfectionner
  // ══════════════════════════════════════

  {
    id: '6-0', semaineIndex: 6, jourIndex: 0, ordre: 30,
    label: 'Lun 10 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — Le subjonctif présent',
    detail: 'Le subjonctif exprime le doute, la volonté, la nécessité, le sentiment. Il est presque toujours dans une subordonnée introduite par « que ». Ex. : « Je veux que tu viennes. » Radical du présent + terminaisons : -e, -es, -e, -ions, -iez, -ent.',
    tip: 'Mots déclencheurs du subjonctif : vouloir que, falloir que, douter que, bien que, pour que, avant que…',
    lessonPage: 73, exercisesPage: 74, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '6-0-1', type: 'qcm', question: 'Conjugue « finir » au subjonctif présent, 3e pers. du singulier.', options: ['finit', 'finisse', 'finira', 'finissait'], answer: 'finisse', explanation: 'Subjonctif présent de finir : que je finisse, tu finisses, il/elle finisse, nous finissions, vous finissiez, ils/elles finissent.', hint: 'Subjonctif 2e groupe : radical + -iss + terminaisons du subjonctif.' },
      { id: '6-0-2', type: 'vrai_faux', question: '« Il faut que tu saches la vérité. » est au subjonctif.', answer: 'vrai', explanation: '« Falloir que » déclenche le subjonctif. « Saches » est bien le subjonctif de « savoir ».', hint: '« Il faut que » → subjonctif.' },
      { id: '6-0-3', type: 'completer', question: '« Bien qu\'il ___ (pleuvoir), nous sortons. » Conjugue au subjonctif.', answer: 'pleuve', explanation: '« Bien que » déclenche le subjonctif. Pleuvoir au subjonctif : qu\'il pleuve.', hint: 'Bien que → subjonctif.' },
      { id: '6-0-4', type: 'qcm', question: 'Dans quelle phrase le subjonctif est-il INCORRECTEMENT utilisé ?', options: ['Je doute qu\'il vienne.', 'Je sais qu\'il vient.', 'Je veux qu\'il vienne.', 'Il faut qu\'il vienne.'], answer: 'Je sais qu\'il vient.', explanation: '« Je sais que » exprime une certitude → indicatif. Les autres déclenchent le subjonctif (doute, volonté, nécessité).', hint: 'Certitude → indicatif. Doute/volonté/nécessité → subjonctif.' },
    ],
  },

  {
    id: '6-1', semaineIndex: 6, jourIndex: 1, ordre: 31,
    label: 'Mar 11 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — Les statistiques : moyenne, médiane, étendue',
    detail: 'Moyenne : somme des valeurs ÷ nombre de valeurs. Médiane : valeur centrale d\'une série ordonnée. Étendue : valeur max − valeur min. Ces indicateurs statistiques décrivent une série de données.',
    tip: 'Moyenne = (somme) ÷ n. Médiane = valeur du milieu (série ordonnée). Étendue = max − min.',
    lessonPage: 75, exercisesPage: 76, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '6-1-1', type: 'qcm', question: 'Quelle est la moyenne de : 4, 8, 6, 10, 7 ?', options: ['6', '7', '7,5', '8'], answer: '7', explanation: 'Somme = 4+8+6+10+7 = 35. Nombre de valeurs = 5. Moyenne = 35/5 = 7.', hint: 'Additionne tout puis divise par le nombre de valeurs.' },
      { id: '6-1-2', type: 'completer', question: 'Série ordonnée : 3, 5, 7, 9, 11. La médiane est ___.', answer: '7', explanation: '5 valeurs → la médiane est la 3e valeur (centrale). Série ordonnée : 3, 5, [7], 9, 11. Médiane = 7.', hint: 'Valeur centrale d\'une série ordonnée.' },
      { id: '6-1-3', type: 'vrai_faux', question: 'L\'étendue de la série 12, 5, 18, 3, 9 est 15.', answer: 'vrai', explanation: 'Max = 18, min = 3. Étendue = 18 − 3 = 15.', hint: 'Étendue = max − min.' },
      { id: '6-1-4', type: 'qcm', question: 'Une série de 6 valeurs ordonnées est : 2, 4, 6, 8, 10, 12. Quelle est la médiane ?', options: ['6', '7', '8', '6 ou 8'], answer: '7', explanation: 'Nombre pair de valeurs (6) → médiane = moyenne des deux valeurs centrales : (6+8)/2 = 7.', hint: 'Nombre pair de valeurs → médiane = moyenne des deux centrales.' },
    ],
  },

  {
    id: '6-2', semaineIndex: 6, jourIndex: 2, ordre: 32,
    label: 'Mer 12 août', type: 'lecon', matiere: 'géographie', difficulte: 4,
    lecon: 'Géographie — L\'Afrique : diversité et enjeux',
    detail: 'L\'Afrique est le 2e plus grand continent (30,3 M km²) avec 54 pays et 1,4 milliard d\'habitants (2023). Diversité : Afrique du Nord (Maghreb, monde arabe), Afrique subsaharienne (grande diversité culturelle). Enjeux : démographie, urbanisation, ressources naturelles, changement climatique.',
    tip: 'L\'Afrique est très diverse : ne la considère pas comme un tout homogène. 54 pays = 54 situations différentes.',
    lessonPage: 77, exercisesPage: 78, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '6-2-1', type: 'qcm', question: 'Combien de pays composent le continent africain ?', options: ['44', '48', '54', '60'], answer: '54', explanation: 'L\'Afrique compte 54 États reconnus par l\'Union africaine. C\'est le continent avec le plus grand nombre de pays.', hint: 'Plus de 50 pays.' },
      { id: '6-2-2', type: 'vrai_faux', question: 'L\'Afrique est le continent le plus peuplé du monde.', answer: 'faux', explanation: 'L\'Asie est le continent le plus peuplé (4,7 milliards). L\'Afrique est le 2e avec environ 1,4 milliard d\'habitants (2023).', hint: 'L\'Asie abrite plus de la moitié de l\'humanité.' },
      { id: '6-2-3', type: 'completer', question: 'Le plus long fleuve du monde, le ___, traverse plusieurs pays d\'Afrique du Nord et du Nord-Est.', answer: 'Nil', explanation: 'Le Nil (6 650 km) est le plus long fleuve du monde. Il traverse l\'Éthiopie, le Soudan, l\'Égypte et se jette dans la Méditerranée.', hint: 'Il passe par l\'Égypte et a bercé la civilisation pharaonique.' },
      { id: '6-2-4', type: 'qcm', question: 'Quelle est la capitale du Nigéria, pays le plus peuplé d\'Afrique ?', options: ['Lagos', 'Abuja', 'Dakar', 'Nairobi'], answer: 'Abuja', explanation: 'Abuja est la capitale fédérale du Nigéria depuis 1991. Lagos est la plus grande ville, mais pas la capitale.', hint: 'La plus grande ville n\'est pas toujours la capitale.' },
    ],
  },

  {
    id: '6-3', semaineIndex: 6, jourIndex: 3, ordre: 33,
    label: 'Jeu 13 août', type: 'lecon', matiere: 'svt', difficulte: 4,
    lecon: 'SVT — La géologie : plaques tectoniques et séismes',
    detail: 'La surface de la Terre est divisée en plaques tectoniques en mouvement lent (quelques cm/an). Leurs mouvements (divergence, convergence, coulissement) provoquent séismes, volcans et formation des reliefs. Le foyer est l\'origine du séisme, l\'épicentre est le point en surface le plus proche.',
    tip: 'Foyer = sous la terre (origine du séisme). Épicentre = point à la surface directement au-dessus du foyer.',
    lessonPage: 79, exercisesPage: 80, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '6-3-1', type: 'qcm', question: 'Qu\'est-ce que l\'épicentre d\'un séisme ?', options: ['Le point sous terre où le séisme prend naissance', 'Le point en surface situé au-dessus du foyer', 'La région la plus touchée par le séisme', 'L\'instrument qui mesure les séismes'], answer: 'Le point en surface situé au-dessus du foyer', explanation: 'L\'épicentre est le point à la surface terrestre directement au-dessus du foyer (hypocentre). C\'est là où les secousses sont généralement les plus fortes.', hint: 'Épi = au-dessus (du foyer).' },
      { id: '6-3-2', type: 'vrai_faux', question: 'Les plaques tectoniques se déplacent de plusieurs mètres par an.', answer: 'faux', explanation: 'Les plaques tectoniques se déplacent très lentement : de quelques millimètres à quelques centimètres par an seulement.', hint: 'On parle de centimètres par an, pas de mètres.' },
      { id: '6-3-3', type: 'completer', question: 'L\'instrument qui enregistre les ondes sismiques s\'appelle un ___.', answer: 'sismographe', explanation: 'Le sismographe enregistre les vibrations du sol et produit un sismogramme. Il permet de localiser et de mesurer l\'intensité des séismes.', hint: 'Seism = séisme + graphe = écrire.' },
      { id: '6-3-4', type: 'qcm', question: 'Que se passe-t-il quand deux plaques tectoniques convergent ?', options: ['Elles s\'écartent, créant un océan', 'L\'une plonge sous l\'autre (subduction) ou elles se heurtent (orogenèse)', 'Elles glissent l\'une le long de l\'autre sans déformation', 'Rien, les plaques sont immobiles'], answer: 'L\'une plonge sous l\'autre (subduction) ou elles se heurtent (orogenèse)', explanation: 'La convergence entraîne soit la subduction (une plaque plonge sous l\'autre → volcans), soit la collision (formation de montagnes comme les Himalaya).', hint: 'Convergence = les plaques se rapprochent → collision ou subduction.' },
    ],
  },

  {
    id: '6-4', semaineIndex: 6, jourIndex: 4, ordre: 34,
    label: 'Ven 14 août', type: 'lecon', matiere: 'anglais', difficulte: 4,
    lecon: 'Anglais — Les modaux : can, could, must, should',
    detail: 'Can = capacité/permission (présent). Could = capacité/permission (passé/poli). Must = obligation. Should = conseil/recommandation. Ex. : « You must wear a helmet. » (obligation) / « You should study more. » (conseil).',
    tip: 'Must = tu es obligé(e). Should = c\'est conseillé. Can = tu es capable/tu peux. Could = tu pourrais (plus poli).',
    lessonPage: 81, exercisesPage: 82, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '6-4-1', type: 'qcm', question: 'Choose the correct modal: « You ___ stop at a red light. It\'s the law. »', options: ['should', 'could', 'must', 'can'], answer: 'must', explanation: '« Must » expresses a strong obligation or a law. It\'s compulsory, not optional.', hint: 'Legal obligation → must.' },
      { id: '6-4-2', type: 'completer', question: '« You look tired. You ___ go to bed early. » (advice) → ___', answer: 'should', explanation: '« Should » gives advice or a recommendation. It\'s not an obligation.', hint: 'Advice → should.' },
      { id: '6-4-3', type: 'vrai_faux', question: '« Could » can be used as a polite way to ask for permission.', answer: 'vrai', explanation: '« Could I borrow your pen? » is more polite than « Can I borrow your pen? » Both ask for permission, but « could » is more formal and polite.', hint: 'Could = polite form of can.' },
      { id: '6-4-4', type: 'qcm', question: 'What does « She can\'t speak Russian. » mean?', options: ['She is not allowed to speak Russian', 'She doesn\'t know how to speak Russian', 'She must not speak Russian', 'She refuses to speak Russian'], answer: 'She doesn\'t know how to speak Russian', explanation: '« Can » for ability: « can\'t » means she lacks the ability (she doesn\'t know how). Context makes it clear it\'s about ability, not permission.', hint: 'Can = ability. Can\'t = lack of ability.' },
    ],
  },

  // ══════════════════════════════════════
  // SEMAINE 8 — Bilan final 🏆
  // ══════════════════════════════════════

  {
    id: '7-0', semaineIndex: 7, jourIndex: 0, ordre: 35,
    label: 'Lun 17 août', type: 'exo', matiere: 'français', difficulte: 5,
    lecon: 'Français — Révision : grammaire et style',
    detail: 'Révise la subordonnée relative, les temps du passé, les figures de style, le subjonctif et le discours rapporté.',
    tip: 'Relis chaque leçon des semaines précédentes avant de commencer.',
    lessonPage: 84, exercisesPage: 85, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '7-0-1', type: 'qcm', question: 'Identifie la subordonnée dans : « Je cherche un livre qui soit facile à lire. »', options: ['Je cherche un livre', 'qui soit facile à lire', 'soit facile', 'à lire'], answer: 'qui soit facile à lire', explanation: '« qui soit facile à lire » est une subordonnée relative (pronom relatif « qui », subjonctif car après un superlatif implicite/indefini).', hint: 'Pronom relatif → subordonnée relative.' },
      { id: '7-0-2', type: 'completer', question: 'Passe au discours indirect : « Je reviendrai demain », dit-elle. → Elle dit qu\'elle ___ le ___.', answer: 'reviendrait / lendemain', explanation: 'Verbe introducteur au passé : futur → conditionnel (reviendrait). « Demain » → « le lendemain ».', hint: 'Futur → conditionnel dans le discours indirect au passé.' },
      { id: '7-0-3', type: 'vrai_faux', question: '« Ses yeux brillaient comme deux diamants. » est une métaphore.', answer: 'faux', explanation: 'La présence de « comme » en fait une COMPARAISON, pas une métaphore.', hint: '« Comme » → comparaison. Sans outil → métaphore.' },
      { id: '7-0-4', type: 'qcm', question: 'Conjugue « avoir » au subjonctif présent, 1re pers. du singulier.', options: ['j\'ai', 'j\'aurai', 'j\'aie', 'j\'avais'], answer: 'j\'aie', explanation: 'Subjonctif présent d\'avoir : que j\'aie, tu aies, il ait, nous ayons, vous ayez, ils aient.', hint: 'Avoir est irrégulier au subjonctif.' },
    ],
  },

  {
    id: '7-1', semaineIndex: 7, jourIndex: 1, ordre: 36,
    label: 'Mar 18 août', type: 'exo', matiere: 'maths', difficulte: 5,
    lecon: 'Maths — Révision : calcul et géométrie',
    detail: 'Révise les fractions, les relatifs, le calcul littéral, la géométrie et les statistiques.',
    tip: 'Montre toutes tes étapes de calcul.',
    lessonPage: 86, exercisesPage: 87, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '7-1-1', type: 'qcm', question: 'Résous : 2x − 3 = x + 5. Quelle est la valeur de x ?', options: ['x = 2', 'x = 8', 'x = 4', 'x = 6'], answer: 'x = 8', explanation: '2x − x = 5 + 3 → x = 8. Vérification : 2×8−3 = 13 = 8+5 ✓', hint: 'Regroupe les x d\'un côté et les nombres de l\'autre.' },
      { id: '7-1-2', type: 'completer', question: 'Calcule l\'aire d\'un disque de rayon 3 cm. (π ≈ 3,14) : ___ cm²', answer: '28,26', explanation: 'A = πR² = 3,14 × 9 = 28,26 cm².', hint: 'A = πR².' },
      { id: '7-1-3', type: 'vrai_faux', question: '(−4) × (−3) = −12', answer: 'faux', explanation: '(−4) × (−3) = +12. Moins × moins = plus. Les signes négatifs se compensent.', hint: '− × − = +.' },
      { id: '7-1-4', type: 'qcm', question: 'La médiane de la série 1, 3, 4, 7, 9 est :', options: ['3', '4', '4,8', '7'], answer: '4', explanation: '5 valeurs ordonnées → valeur centrale (3e) = 4.', hint: 'Valeur centrale de 5 valeurs = la 3e.' },
    ],
  },

  {
    id: '7-2', semaineIndex: 7, jourIndex: 2, ordre: 37,
    label: 'Mer 19 août', type: 'exo', matiere: 'histoire', difficulte: 5,
    lecon: 'Histoire-Géo — Révision : du Moyen Âge à nos jours',
    detail: 'Révise la société féodale, l\'Humanisme, les Grandes Découvertes, le développement durable et la géographie mondiale.',
    tip: 'Construis une frise chronologique pour visualiser l\'ordre des événements.',
    lessonPage: 88, exercisesPage: 89, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '7-2-1', type: 'qcm', question: 'Remet dans l\'ordre : Grandes Découvertes / Moyen Âge / Renaissance', options: ['Grandes Découvertes, Renaissance, Moyen Âge', 'Moyen Âge, Renaissance, Grandes Découvertes', 'Renaissance, Moyen Âge, Grandes Découvertes', 'Moyen Âge, Grandes Découvertes, Renaissance'], answer: 'Moyen Âge, Renaissance, Grandes Découvertes', explanation: 'Moyen Âge (476–1492) → Renaissance (XVe–XVIe s.) → Grandes Découvertes (à partir de 1492, simultané à la Renaissance).', hint: 'Moyen Âge se termine en 1492 (date clé).' },
      { id: '7-2-2', type: 'completer', question: 'L\'invention de ___ (vers 1450) révolutionne la diffusion du savoir en Europe.', answer: 'l\'imprimerie', explanation: 'Gutenberg perfectionne l\'imprimerie à caractères mobiles vers 1450, permettant la diffusion massive des livres et des idées humanistes.', hint: 'Elle permet de reproduire des textes en grand nombre.' },
      { id: '7-2-3', type: 'vrai_faux', question: 'Tokyo est la capitale et la plus grande ville du Japon.', answer: 'vrai', explanation: 'Tokyo est la capitale du Japon et la plus grande agglomération du monde (~37 millions d\'habitants).', hint: 'Tokyo = capitale + plus grande ville + plus grande agglomération mondiale.' },
      { id: '7-2-4', type: 'qcm', question: 'Quel pays est le plus peuplé d\'Afrique ?', options: ['Afrique du Sud', 'Égypte', 'Nigéria', 'Éthiopie'], answer: 'Nigéria', explanation: 'Le Nigéria est le pays le plus peuplé d\'Afrique avec plus de 220 millions d\'habitants (2023).', hint: 'C\'est un pays d\'Afrique de l\'Ouest.' },
    ],
  },

  {
    id: '7-3', semaineIndex: 7, jourIndex: 3, ordre: 38,
    label: 'Jeu 20 août', type: 'exo', matiere: 'sciences', difficulte: 5,
    lecon: 'Sciences — Révision SVT + Physique-Chimie',
    detail: 'Révise la digestion, la reproduction, les écosystèmes, la géologie, la lumière, les mélanges et l\'électricité.',
    tip: 'Relis tes schémas et tes tableaux de résumé.',
    lessonPage: 90, exercisesPage: 91, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '7-3-1', type: 'qcm', question: 'Quelle loi relie tension, résistance et intensité ?', options: ['Loi de Newton', 'Loi d\'Ohm', 'Loi de Snell-Descartes', 'Loi de Faraday'], answer: 'Loi d\'Ohm', explanation: 'La loi d\'Ohm : U = R × I. Elle relie la tension (U en Volts), la résistance (R en Ohms) et l\'intensité (I en Ampères).', hint: 'U = R × I.' },
      { id: '7-3-2', type: 'completer', question: 'Dans un écosystème, les végétaux sont appelés ___ car ils produisent leur propre matière organique.', answer: 'producteurs', explanation: 'Les végétaux (autotrophes) produisent de la matière organique par photosynthèse. Ils sont les producteurs primaires de tout écosystème.', hint: 'Ils produisent la matière organique grâce à la lumière.' },
      { id: '7-3-3', type: 'vrai_faux', question: 'Le foyer d\'un séisme est toujours à la surface de la Terre.', answer: 'faux', explanation: 'Le foyer (hypocentre) est le point dans la croûte terrestre où le séisme prend naissance. L\'épicentre est en surface.', hint: 'Foyer = sous terre. Épicentre = en surface.' },
      { id: '7-3-4', type: 'qcm', question: 'Où se produit l\'absorption des nutriments dans l\'appareil digestif ?', options: ['Dans l\'estomac', 'Dans le gros intestin', 'Dans l\'intestin grêle', 'Dans le foie'], answer: 'Dans l\'intestin grêle', explanation: 'L\'intestin grêle, grâce à ses villosités intestinales, est le siège principal de l\'absorption des nutriments dans le sang.', hint: 'C\'est l\'organe le plus long du tube digestif.' },
    ],
  },

  {
    id: '7-4', semaineIndex: 7, jourIndex: 4, ordre: 39,
    label: 'Ven 21 août', type: 'controle', matiere: 'français', difficulte: 5,
    lecon: '🏆 Grand Contrôle Final — Toutes matières',
    detail: 'Bravo, tu as terminé ton cahier de vacances 5ème ! Ce contrôle final teste toutes les matières de l\'été. Prends ton temps et relis chaque question.',
    tip: 'Tu as travaillé dur cet été. Fais confiance à tes révisions !',
    lessonPage: 92, exercisesPage: 93, pdfFile: '/cahier-5eme.pdf',
    exercices: [
      { id: '7-4-1', type: 'qcm', question: 'FRANÇAIS — Quel temps est employé dans « Il pleuvait depuis une heure quand l\'orage éclata. » (2e verbe) ?', options: ['Imparfait', 'Passé simple', 'Plus-que-parfait', 'Passé composé'], answer: 'Passé simple', explanation: '« Éclata » est le passé simple du verbe éclater (3e groupe). Action soudaine et ponctuelle qui fait avancer le récit.', hint: 'Action soudaine qui fait avancer le récit → passé simple.' },
      { id: '7-4-2', type: 'qcm', question: 'MATHS — Résous : 5x + 2 = 3x + 10. Valeur de x ?', options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'], answer: 'x = 4', explanation: '5x − 3x = 10 − 2 → 2x = 8 → x = 4. Vérification : 5×4+2 = 22 = 3×4+10 ✓', hint: 'Regroupe les x et les constantes.' },
      { id: '7-4-3', type: 'completer', question: 'HISTOIRE — En quelle année Christophe Colomb découvre-t-il l\'Amérique ?', answer: '1492', explanation: '1492 est une date fondamentale : Colomb aborde le 12 octobre 1492 l\'île de Guanahani (Bahamas), croyant atteindre l\'Asie.', hint: 'C\'est aussi la fin officielle du Moyen Âge.' },
      { id: '7-4-4', type: 'qcm', question: 'SVT — Comment s\'appelle le point en surface situé au-dessus du foyer d\'un séisme ?', options: ['Hypocentre', 'Épicentre', 'Sismographe', 'Magnitude'], answer: 'Épicentre', explanation: 'L\'épicentre est le point à la surface terrestre directement au-dessus du foyer (hypocentre). Les secousses y sont généralement les plus intenses.', hint: 'Épi (grec) = au-dessus.' },
      { id: '7-4-5', type: 'qcm', question: 'ANGLAIS — Which sentence is correct?', options: ['She has went to school.', 'She went to school yesterday.', 'She go to school yesterday.', 'She is go to school.'], answer: 'She went to school yesterday.', explanation: '« Went » is the Past Simple of « go » (irregular). « Yesterday » confirms Past Simple. The others have errors.', hint: 'Yesterday → Past Simple. Go → went (irregular).' },
    ],
  },
];

import { EXTRA_5EME } from './extra5.js';
// Exercices supplémentaires générés pour les jours Français & Maths
JOURS_5EME.forEach((j) => {
  if (EXTRA_5EME[j.id]) j.exercices.push(...EXTRA_5EME[j.id]);
});

export function buildSeedJours() {
  return JOURS_5EME;
}

export function buildSeedSemaines() {
  return SEMAINES_5EME;
}
