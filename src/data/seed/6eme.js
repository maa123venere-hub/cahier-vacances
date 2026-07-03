/**
 * Seed data for 6ème level.
 * Programme CM2 → 6ème : Français, Maths, Histoire-Géo, Sciences, Anglais
 * 8 semaines × 5 jours = 40 journées
 */

const SEMAINES_6EME = [
  { index: 0, num: 1, theme: "Les bases du collège", color: "#4F46E5", light: "#EEF2FF", emoji: "📖" },
  { index: 1, num: 2, theme: "Nombres et récit",    color: "#0891B2", light: "#ECFEFF", emoji: "🌊" },
  { index: 2, num: 3, theme: "La phrase et le passé", color: "#059669", light: "#ECFDF5", emoji: "📜" },
  { index: 3, num: 4, theme: "Vocabulaire et calcul", color: "#8B5CF6", light: "#F5F3FF", emoji: "🔢" },
  { index: 4, num: 5, theme: "Géométrie et récit",   color: "#EC4899", light: "#FDF2F8", emoji: "📐" },
  { index: 5, num: 6, theme: "Orthographe et mesures", color: "#D97706", light: "#FFFBEB", emoji: "🔬" },
  { index: 6, num: 7, theme: "Consolidation",        color: "#EF4444", light: "#FEF2F2", emoji: "⚡" },
  { index: 7, num: 8, theme: "Bilan de l'été 🏆",   color: "#F59E0B", light: "#FFFBEB", emoji: "🏆" },
];

const JOURS_6EME = [

  // ══════════════════════════════════════════════════════════
  // SEMAINE 1 — Les bases du collège ⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '0-0', semaineIndex: 0, jourIndex: 0, ordre: 0,
    label: 'Lun 29 juin', type: 'lecon', matiere: 'français', difficulte: 1,
    lecon: 'Français — Les classes de mots',
    detail: 'Découvre les grandes familles de mots : nom, verbe, adjectif, déterminant, pronom, adverbe. Chaque mot appartient à une classe grammaticale.',
    tip: 'Astuce : le nom désigne une personne, un animal ou une chose. Le verbe indique une action ou un état.',
    lessonPage: 7, exercisesPage: 8, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '0-0-1', type: 'qcm', question: 'Quelle est la classe grammaticale du mot « chien » ?', options: ['Verbe', 'Nom commun', 'Adjectif', 'Adverbe'], answer: 'Nom commun', explanation: '« Chien » désigne un animal : c\'est un nom commun.', hint: 'Un nom commun désigne une personne, un animal ou une chose.' },
      { id: '0-0-2', type: 'qcm', question: 'Dans « Le petit chat dort. », quel est le verbe ?', options: ['petit', 'chat', 'dort', 'Le'], answer: 'dort', explanation: '« Dort » exprime une action (dormir) : c\'est le verbe.', hint: 'Le verbe exprime une action ou un état.' },
      { id: '0-0-3', type: 'vrai_faux', question: 'Dans « une belle fleur », « belle » est un adjectif.', answer: 'vrai', explanation: '« Belle » qualifie le nom « fleur » : c\'est un adjectif qualificatif.', hint: 'L\'adjectif donne des informations sur le nom.' },
      { id: '0-0-4', type: 'qcm', question: 'Quel mot est un déterminant dans « le livre rouge » ?', options: ['livre', 'rouge', 'le', 'aucun'], answer: 'le', explanation: '« Le » est un article défini, donc un déterminant. Il accompagne le nom.', hint: 'Le déterminant est toujours placé devant un nom.' },
      { id: '0-0-5', type: 'completer', question: 'Complète : « Il court vite. » → « vite » est un ___.', answer: 'adverbe', explanation: '« Vite » modifie le verbe « court » et est invariable : c\'est un adverbe.', hint: 'L\'adverbe modifie un verbe, un adjectif ou un autre adverbe.' },
    ],
  },

  {
    id: '0-1', semaineIndex: 0, jourIndex: 1, ordre: 1,
    label: 'Mar 30 juin', type: 'lecon', matiere: 'maths', difficulte: 1,
    lecon: 'Maths — Les nombres entiers et la numération',
    detail: 'Les nombres entiers naturels : unités, dizaines, centaines, milliers. Apprends à lire, écrire et comparer les grands nombres.',
    tip: 'Pour lire un grand nombre, regroupe les chiffres par 3 en partant de la droite.',
    lessonPage: 9, exercisesPage: 10, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '0-1-1', type: 'qcm', question: 'Quel est le chiffre des centaines dans 4 372 ?', options: ['4', '3', '7', '2'], answer: '3', explanation: 'Dans 4 372 : 2 = unités, 7 = dizaines, 3 = centaines, 4 = milliers.', hint: 'Compte les rangs en partant de la droite.' },
      { id: '0-1-2', type: 'vrai_faux', question: '10 000 > 9 999', answer: 'vrai', explanation: '10 000 a 5 chiffres, 9 999 n\'en a que 4. Donc 10 000 est plus grand.', hint: 'Un nombre avec plus de chiffres est généralement plus grand.' },
      { id: '0-1-3', type: 'completer', question: 'Écris en chiffres : deux mille cinq cent trente = ___', answer: '2 530', explanation: '2 milliers + 5 centaines + 3 dizaines + 0 unités = 2 530.', hint: 'Décompose : milliers, centaines, dizaines, unités.' },
      { id: '0-1-4', type: 'qcm', question: 'Quel est le plus grand nombre ?', options: ['3 045', '3 450', '3 504', '3 405'], answer: '3 504', explanation: 'On compare chiffre par chiffre de gauche à droite. 3 504 > 3 450 car 5 > 4 aux centaines.', hint: 'Compare chiffre par chiffre de gauche à droite.' },
    ],
  },

  {
    id: '0-2', semaineIndex: 0, jourIndex: 2, ordre: 2,
    label: 'Mer 1er juil.', type: 'lecon', matiere: 'anglais', difficulte: 1,
    lecon: 'Anglais — Se présenter',
    detail: 'Apprends à te présenter en anglais : ton prénom, ton âge, ta nationalité et ce que tu aimes. Hello, my name is... I am ... years old.',
    tip: 'En anglais, on met toujours une majuscule au pronom « I » (je).',
    lessonPage: 11, exercisesPage: 12, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '0-2-1', type: 'qcm', question: 'Comment dit-on « Je m\'appelle » en anglais ?', options: ['I have name', 'My name is', 'I call me', 'I am name'], answer: 'My name is', explanation: '« My name is » signifie littéralement « Mon nom est ».', hint: 'My = mon/ma, name = nom, is = est.' },
      { id: '0-2-2', type: 'completer', question: 'Traduis : « J\'ai 11 ans. » → I ___ 11 years old.', answer: 'am', explanation: 'En anglais, on dit « I am 11 years old » (littéralement : je suis 11 ans vieux). On utilise « to be » et non « to have ».', hint: 'En anglais, on utilise le verbe « to be » pour l\'âge.' },
      { id: '0-2-3', type: 'vrai_faux', question: '« Hello, I am French. » signifie « Bonjour, je suis français. »', answer: 'vrai', explanation: '« Hello » = Bonjour, « I am » = je suis, « French » = français(e).', hint: 'French = français(e).' },
      { id: '0-2-4', type: 'qcm', question: 'Comment dit-on « J\'aime le foot » en anglais ?', options: ['I like football', 'I have football', 'Football is me', 'I am football'], answer: 'I like football', explanation: '« I like » = j\'aime. « Football » est identique en anglais.', hint: 'Like = aimer.' },
    ],
  },

  {
    id: '0-3', semaineIndex: 0, jourIndex: 3, ordre: 3,
    label: 'Jeu 2 juil.', type: 'lecon', matiere: 'histoire', difficulte: 1,
    lecon: 'Histoire — La Préhistoire',
    detail: 'La Préhistoire commence avec l\'apparition des premiers hommes (il y a environ 3 millions d\'années) et se termine avec l\'invention de l\'écriture (il y a environ 5 000 ans).',
    tip: 'Pour mémoriser les périodes, fais une frise chronologique dans ton cahier.',
    lessonPage: 13, exercisesPage: 14, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '0-3-1', type: 'qcm', question: 'Quand commence la Préhistoire ?', options: ['Il y a 3 millions d\'années', 'Il y a 5 000 ans', 'Il y a 2 000 ans', 'Il y a 10 000 ans'], answer: 'Il y a 3 millions d\'années', explanation: 'La Préhistoire débute avec l\'apparition des premiers hominidés, il y a environ 3 millions d\'années.', hint: 'C\'est la période la plus longue de l\'histoire humaine.' },
      { id: '0-3-2', type: 'vrai_faux', question: 'Les hommes préhistoriques vivaient dans des châteaux.', answer: 'faux', explanation: 'Les hommes préhistoriques vivaient dans des grottes ou des huttes. Les châteaux n\'apparaissent qu\'au Moyen Âge.', hint: 'Pense à leurs outils en pierre.' },
      { id: '0-3-3', type: 'qcm', question: 'Quel outil était fabriqué par les hommes préhistoriques ?', options: ['Le téléphone', 'Le silex taillé', 'La voiture', 'L\'ordinateur'], answer: 'Le silex taillé', explanation: 'Le silex est une roche que les hommes préhistoriques taillaient pour faire des outils (couteaux, pointes de flèches).', hint: 'C\'est une roche.' },
      { id: '0-3-4', type: 'completer', question: 'La Préhistoire se termine avec l\'invention de l\' ___.', answer: 'écriture', explanation: 'L\'invention de l\'écriture (vers 3 500 avant J.-C.) marque la fin de la Préhistoire et le début de l\'Histoire.', hint: 'C\'est ce qui permet de transmettre des informations par des signes.' },
    ],
  },

  {
    id: '0-4', semaineIndex: 0, jourIndex: 4, ordre: 4,
    label: 'Ven 3 juil.', type: 'lecon', matiere: 'sciences', difficulte: 1,
    lecon: 'Sciences — Les êtres vivants',
    detail: 'Qu\'est-ce qu\'un être vivant ? Un être vivant naît, se nourrit, grandit, se reproduit et meurt. Les êtres vivants sont classés en grands groupes : animaux, végétaux, champignons, bactéries.',
    tip: 'Pour identifier un être vivant : pose-toi la question « est-ce qu\'il naît, grandit et meurt ? »',
    lessonPage: 15, exercisesPage: 16, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '0-4-1', type: 'qcm', question: 'Lequel de ces éléments est un être vivant ?', options: ['Une pierre', 'Une table', 'Un champignon', 'Une voiture'], answer: 'Un champignon', explanation: 'Un champignon naît, se nourrit, grandit et se reproduit : c\'est un être vivant.', hint: 'Les êtres vivants naissent, grandissent et meurent.' },
      { id: '0-4-2', type: 'vrai_faux', question: 'Les plantes sont des êtres vivants.', answer: 'vrai', explanation: 'Les plantes naissent (germination), grandissent, se reproduisent (fleurs, fruits) et meurent : ce sont bien des êtres vivants.', hint: 'Pense à une graine qui devient une plante.' },
      { id: '0-4-3', type: 'qcm', question: 'Quelle est la fonction commune à tous les êtres vivants ?', options: ['Voler', 'Se reproduire', 'Nager', 'Parler'], answer: 'Se reproduire', explanation: 'Tous les êtres vivants se reproduisent pour assurer la continuité de leur espèce.', hint: 'C\'est ce qui permet aux espèces de ne pas disparaître.' },
      { id: '0-4-4', type: 'completer', question: 'Les animaux, les végétaux et les champignons sont des ___ vivants.', answer: 'êtres', explanation: 'Ce sont trois grands groupes d\'êtres vivants que l\'on étudie en sciences.', hint: 'Deux mots pour désigner ce qui est vivant.' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 2 — Nombres et récit ⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '1-0', semaineIndex: 1, jourIndex: 0, ordre: 5,
    label: 'Lun 6 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — Le groupe nominal (GN)',
    detail: 'Le groupe nominal est formé d\'un déterminant + un nom + (éventuellement) un adjectif ou un complément du nom. Ex : « le grand chien noir ».',
    tip: 'Pour identifier un GN, cherche d\'abord le nom (noyau), puis les mots qui l\'entourent.',
    lessonPage: 18, exercisesPage: 19, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '1-0-1', type: 'qcm', question: 'Quel est le noyau du groupe nominal « la belle maison bleue » ?', options: ['la', 'belle', 'maison', 'bleue'], answer: 'maison', explanation: '« Maison » est le nom, donc le noyau du GN. Les autres mots (la, belle, bleue) sont des expansions.', hint: 'Le noyau du GN est toujours un nom.' },
      { id: '1-0-2', type: 'vrai_faux', question: 'Dans « un gros nuage gris », il y a deux adjectifs.', answer: 'vrai', explanation: '« Gros » et « gris » sont deux adjectifs qualificatifs qui qualifient le nom « nuage ».', hint: 'Compte les mots qui qualifient le nom.' },
      { id: '1-0-3', type: 'completer', question: 'Complète le GN : « ___ vieux livre » (déterminant + adjectif + nom)', answer: 'un / le / ce', explanation: 'Un déterminant peut être : un, le, ce, mon... Toutes ces réponses sont correctes.', hint: 'Le déterminant est le premier mot du GN.' },
      { id: '1-0-4', type: 'qcm', question: 'Dans « le chien de mon voisin », quel est le complément du nom ?', options: ['le chien', 'de', 'mon voisin', 'de mon voisin'], answer: 'de mon voisin', explanation: '« De mon voisin » est un complément du nom introduit par la préposition « de » : il complète « chien ».', hint: 'Le complément du nom est souvent introduit par « de ».' },
    ],
  },

  {
    id: '1-1', semaineIndex: 1, jourIndex: 1, ordre: 6,
    label: 'Mar 7 juil.', type: 'lecon', matiere: 'maths', difficulte: 2,
    lecon: 'Maths — Addition et soustraction de décimaux',
    detail: 'Les nombres décimaux ont une partie entière et une partie décimale séparées par une virgule. Pour additionner ou soustraire, aligne les virgules.',
    tip: 'Toujours aligner les virgules en colonnes avant de calculer !',
    lessonPage: 20, exercisesPage: 21, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '1-1-1', type: 'qcm', question: 'Quel est le résultat de 3,5 + 2,4 ?', options: ['5,9', '5,54', '6,9', '5,1'], answer: '5,9', explanation: '3,5 + 2,4 = 5,9. On aligne les virgules et on additionne colonne par colonne.', hint: 'Aligne les virgules !' },
      { id: '1-1-2', type: 'vrai_faux', question: '7,8 − 3,2 = 4,6', answer: 'vrai', explanation: '7,8 − 3,2 = 4,6. On soustrait les dixièmes (8−2=6) puis les unités (7−3=4).', hint: 'Soustrais colonne par colonne.' },
      { id: '1-1-3', type: 'completer', question: 'Calcule : 12,50 + 7,30 = ___', answer: '19,80', explanation: '12,50 + 7,30 = 19,80. Aligne les virgules et additionne.', hint: 'N\'oublie pas le zéro en fin de résultat.' },
      { id: '1-1-4', type: 'qcm', question: 'Dans 45,73, quel chiffre est au rang des centièmes ?', options: ['4', '5', '7', '3'], answer: '3', explanation: 'Dans 45,73 : 4=dizaines, 5=unités, 7=dixièmes, 3=centièmes.', hint: 'Après la virgule : dixièmes, puis centièmes.' },
    ],
  },

  {
    id: '1-2', semaineIndex: 1, jourIndex: 2, ordre: 7,
    label: 'Mer 8 juil.', type: 'lecon', matiere: 'histoire', difficulte: 2,
    lecon: 'Histoire — La Grèce antique',
    detail: 'La Grèce antique (vers 800 à 146 avant J.-C.) a inventé la démocratie, les Jeux olympiques et nous a légué de nombreux mythes. Athènes et Sparte étaient les deux grandes cités.',
    tip: 'Retiens les grandes inventions grecques : démocratie, Jeux olympiques, philosophie.',
    lessonPage: 22, exercisesPage: 23, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '1-2-1', type: 'qcm', question: 'Quelle cité grecque a inventé la démocratie ?', options: ['Sparte', 'Athènes', 'Rome', 'Carthage'], answer: 'Athènes', explanation: 'C\'est à Athènes, au Ve siècle avant J.-C., que Clisthène a instauré la démocratie (pouvoir du peuple).', hint: 'La cité d\'Athéna.' },
      { id: '1-2-2', type: 'vrai_faux', question: 'Les Jeux olympiques ont été créés par les Grecs.', answer: 'vrai', explanation: 'Les premiers Jeux olympiques ont eu lieu à Olympie en 776 avant J.-C. en l\'honneur du dieu Zeus.', hint: 'Olympie est une ville de Grèce.' },
      { id: '1-2-3', type: 'qcm', question: 'Comment s\'appelait le chef des dieux grecs ?', options: ['Poséidon', 'Apollon', 'Zeus', 'Hermès'], answer: 'Zeus', explanation: 'Zeus est le roi des dieux de l\'Olympe dans la mythologie grecque. Son équivalent romain est Jupiter.', hint: 'Il règne depuis le mont Olympe.' },
      { id: '1-2-4', type: 'completer', question: 'La démocratie vient du grec « demos » (peuple) et « kratos » (___).',  answer: 'pouvoir', explanation: 'Démocratie = pouvoir du peuple. Demos = peuple, kratos = pouvoir/force.', hint: 'C\'est l\'autorité que détient le peuple.' },
    ],
  },

  {
    id: '1-3', semaineIndex: 1, jourIndex: 3, ordre: 8,
    label: 'Jeu 9 juil.', type: 'lecon', matiere: 'sciences', difficulte: 2,
    lecon: 'Sciences — Les états de la matière',
    detail: 'La matière peut exister sous trois états : solide (forme fixe), liquide (forme du contenant), gazeux (remplit tout l\'espace). On peut passer d\'un état à l\'autre en chauffant ou refroidissant.',
    tip: 'Pense à l\'eau : glace (solide) → eau liquide → vapeur (gazeux)',
    lessonPage: 24, exercisesPage: 25, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '1-3-1', type: 'qcm', question: 'Dans quel état est l\'eau sous forme de glace ?', options: ['Liquide', 'Gazeux', 'Solide', 'Plasma'], answer: 'Solide', explanation: 'La glace est de l\'eau à l\'état solide. Elle a une forme fixe et un volume fixe.', hint: 'La glace ne coule pas.' },
      { id: '1-3-2', type: 'vrai_faux', question: 'Un gaz prend la forme du récipient qui le contient.', answer: 'vrai', explanation: 'Un gaz n\'a pas de forme propre : il occupe tout l\'espace disponible dans son contenant.', hint: 'Pense à l\'air dans un ballon.' },
      { id: '1-3-3', type: 'qcm', question: 'Comment appelle-t-on le passage de l\'état solide à l\'état liquide ?', options: ['Évaporation', 'Fusion', 'Solidification', 'Condensation'], answer: 'Fusion', explanation: 'La fusion est le passage du solide au liquide (ex : glace qui fond). Elle se produit à la température de fusion (0°C pour l\'eau).', hint: 'La glace « fond » : quel est le nom de ce phénomène ?' },
      { id: '1-3-4', type: 'completer', question: 'Le passage de l\'état liquide à l\'état gazeux s\'appelle l\' ___.', answer: 'évaporation', explanation: 'L\'évaporation est le passage du liquide au gaz. Pour l\'eau, elle se produit à 100°C (ébullition).', hint: 'L\'eau qui s\'évapore devient de la vapeur.' },
    ],
  },

  {
    id: '1-4', semaineIndex: 1, jourIndex: 4, ordre: 9,
    label: 'Ven 10 juil.', type: 'lecon', matiere: 'anglais', difficulte: 2,
    lecon: 'Anglais — Les couleurs et les chiffres',
    detail: 'Les couleurs en anglais : red, blue, green, yellow, orange, purple, black, white, brown, pink. Les chiffres de 1 à 20.',
    tip: 'Associe chaque couleur à un objet familier pour la mémoriser.',
    lessonPage: 26, exercisesPage: 27, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '1-4-1', type: 'qcm', question: 'Comment dit-on « bleu » en anglais ?', options: ['Green', 'Blue', 'Red', 'Black'], answer: 'Blue', explanation: '« Blue » signifie bleu. Green = vert, Red = rouge, Black = noir.', hint: 'Pense au ciel (sky is blue).' },
      { id: '1-4-2', type: 'completer', question: 'Traduis : « J\'ai quinze ans » → I am ___ years old.', answer: 'fifteen', explanation: '15 = fifteen. Les chiffres de 13 à 19 se terminent en « -teen ».', hint: 'Cinq en anglais = five → quinze = fif-teen.' },
      { id: '1-4-3', type: 'vrai_faux', question: '« Red » signifie rouge en anglais.', answer: 'vrai', explanation: 'Red = rouge. C\'est l\'une des couleurs de base les plus faciles à retenir.', hint: 'Pense au drapeau anglais (rouge et blanc).' },
      { id: '1-4-4', type: 'qcm', question: 'Combien font « three + five » en anglais ?', options: ['6', '7', '8', '9'], answer: '8', explanation: 'Three (3) + five (5) = eight (8).', hint: 'Three = 3, five = 5.' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 3 — La phrase et le passé ⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '2-0', semaineIndex: 2, jourIndex: 0, ordre: 10,
    label: 'Lun 13 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — La phrase simple : sujet, verbe, complément',
    detail: 'Une phrase simple a un seul verbe conjugué. Elle contient : le sujet (qui fait l\'action), le verbe (l\'action) et éventuellement des compléments (où, quand, comment).',
    tip: 'Pour trouver le sujet, pose la question « Qui est-ce qui + verbe ? »',
    lessonPage: 29, exercisesPage: 30, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '2-0-1', type: 'qcm', question: 'Dans « Léa mange une pomme. », quel est le sujet ?', options: ['mange', 'une pomme', 'Léa', 'une'], answer: 'Léa', explanation: 'Qui est-ce qui mange ? → Léa. C\'est le sujet de la phrase.', hint: 'Pose la question « Qui est-ce qui + verbe ? »' },
      { id: '2-0-2', type: 'vrai_faux', question: 'Dans « Les oiseaux chantent dans le jardin. », « dans le jardin » est un complément circonstanciel de lieu.', answer: 'vrai', explanation: '« Dans le jardin » indique l\'endroit où se déroule l\'action : c\'est un CC de lieu.', hint: 'Un CC de lieu répond à la question « Où ? »' },
      { id: '2-0-3', type: 'completer', question: 'Dans « Paul court rapidement. », « rapidement » est un complément circonstanciel de ___.', answer: 'manière', explanation: '« Rapidement » répond à la question « Comment ? Paul court comment ? → rapidement » : c\'est un CC de manière.', hint: 'Il répond à la question « Comment ? »' },
      { id: '2-0-4', type: 'qcm', question: 'Laquelle de ces phrases est correcte ?', options: ['Mange le chien.', 'Le chien mange.', 'Mange chien le.', 'Chien le mange.'], answer: 'Le chien mange.', explanation: '« Le chien mange. » est grammaticalement correcte : déterminant + nom (sujet) + verbe.', hint: 'L\'ordre habituel est sujet + verbe (+ complément).' },
    ],
  },

  {
    id: '2-1', semaineIndex: 2, jourIndex: 1, ordre: 11,
    label: 'Mar 14 juil.', type: 'repos', matiere: 'français', difficulte: 1,
    lecon: '🎆 Fête nationale — Journée légère',
    detail: 'C\'est le 14 juillet ! Profites-en pour te reposer. Une petite révision pour garder le rythme.',
    tip: 'Le repos fait partie de l\'apprentissage. Ton cerveau consolide ses connaissances pendant que tu te reposes !',
    lessonPage: 31, exercisesPage: 32, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '2-1-1', type: 'qcm', question: 'Que fête-t-on le 14 juillet en France ?', options: ['La fête des pères', 'La prise de la Bastille', 'Noël', 'La victoire de 1945'], answer: 'La prise de la Bastille', explanation: 'Le 14 juillet 1789, le peuple de Paris a pris la forteresse de la Bastille. Cet événement symbolise le début de la Révolution française.', hint: 'C\'était en 1789.' },
      { id: '2-1-2', type: 'vrai_faux', question: 'La Marseillaise est l\'hymne national français.', answer: 'vrai', explanation: 'La Marseillaise a été composée en 1792 et est devenue l\'hymne national français. Elle est chantée lors des cérémonies officielles.', hint: 'Elle commence par « Allons enfants de la Patrie... »' },
      { id: '2-1-3', type: 'completer', question: 'Le drapeau français est bleu, ___ et rouge.', answer: 'blanc', explanation: 'Le drapeau tricolore français est bleu, blanc et rouge. Ces trois couleurs symbolisent la République française.', hint: 'Ce sont trois couleurs dans l\'ordre.' },
    ],
  },

  {
    id: '2-2', semaineIndex: 2, jourIndex: 2, ordre: 12,
    label: 'Mer 15 juil.', type: 'lecon', matiere: 'maths', difficulte: 2,
    lecon: 'Maths — La multiplication',
    detail: 'La multiplication est une addition répétée. Pour multiplier des grands nombres, on utilise la technique posée. Tables de multiplication jusqu\'à 10 × 10.',
    tip: 'Connais ta table de multiplication par cœur jusqu\'à 10 : c\'est la base de toutes les mathématiques !',
    lessonPage: 33, exercisesPage: 34, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '2-2-1', type: 'qcm', question: 'Combien font 7 × 8 ?', options: ['54', '56', '63', '48'], answer: '56', explanation: '7 × 8 = 56. La table de 7 : 7, 14, 21, 28, 35, 42, 49, 56.', hint: '7 × 8 = 7 × 4 × 2 = 28 × 2 = 56' },
      { id: '2-2-2', type: 'vrai_faux', question: '6 × 9 = 54', answer: 'vrai', explanation: '6 × 9 = 54. Astuce : 6 × 9 = 6 × 10 − 6 = 60 − 6 = 54.', hint: 'Utilise l\'astuce de la table de 9.' },
      { id: '2-2-3', type: 'completer', question: 'Calcule : 12 × 5 = ___', answer: '60', explanation: '12 × 5 = 60. Astuce : 12 × 5 = 12 × 10 ÷ 2 = 120 ÷ 2 = 60.', hint: '× 5 = × 10 puis ÷ 2.' },
      { id: '2-2-4', type: 'qcm', question: 'Un paquet contient 8 bonbons. Combien y a-t-il de bonbons dans 6 paquets ?', options: ['14', '42', '48', '64'], answer: '48', explanation: '6 × 8 = 48 bonbons.', hint: 'Multiplie le nombre de paquets par le nombre de bonbons par paquet.' },
    ],
  },

  {
    id: '2-3', semaineIndex: 2, jourIndex: 3, ordre: 13,
    label: 'Jeu 16 juil.', type: 'lecon', matiere: 'histoire', difficulte: 2,
    lecon: 'Histoire — La Rome antique',
    detail: 'Rome est fondée en 753 avant J.-C. La République romaine puis l\'Empire romain ont dominé l\'Europe pendant des siècles. Jules César est l\'une des figures les plus célèbres de l\'Antiquité.',
    tip: 'Retiens : Rome → République → Empire. Jules César a été assassiné en 44 avant J.-C.',
    lessonPage: 35, exercisesPage: 36, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '2-3-1', type: 'qcm', question: 'Quand Rome a-t-elle été fondée (selon la tradition) ?', options: ['En 44 avant J.-C.', 'En 753 avant J.-C.', 'En 476 après J.-C.', 'En 1000 avant J.-C.'], answer: 'En 753 avant J.-C.', explanation: 'Selon la tradition romaine, Rome a été fondée par Romulus en 753 avant J.-C.', hint: 'C\'est une date très ancienne, avant J.-C.' },
      { id: '2-3-2', type: 'vrai_faux', question: 'Jules César était un général et homme politique romain.', answer: 'vrai', explanation: 'Jules César (100−44 av. J.-C.) était général, dictateur et écrivain. Il a conquis la Gaule (58−52 av. J.-C.).', hint: 'Il est aussi à l\'origine du calendrier julien.' },
      { id: '2-3-3', type: 'qcm', question: 'Comment s\'appelait le chef de l\'Empire romain ?', options: ['Roi', 'Président', 'Empereur', 'Sultan'], answer: 'Empereur', explanation: 'Le dirigeant de l\'Empire romain portait le titre d\'Empereur. Auguste fut le premier empereur romain.', hint: 'Ce titre vient du latin « imperator ».' },
      { id: '2-3-4', type: 'completer', question: 'Les Romains parlaient le ___.', answer: 'latin', explanation: 'Le latin est la langue des Romains. Le français, l\'espagnol et l\'italien descendent du latin.', hint: 'C\'est une langue ancienne dont descend le français.' },
    ],
  },

  {
    id: '2-4', semaineIndex: 2, jourIndex: 4, ordre: 14,
    label: 'Ven 17 juil.', type: 'lecon', matiere: 'anglais', difficulte: 2,
    lecon: 'Anglais — La famille',
    detail: 'Le vocabulaire de la famille : mother (mère), father (père), brother (frère), sister (sœur), grandmother (grand-mère), grandfather (grand-père), uncle (oncle), aunt (tante).',
    tip: 'Dresse un arbre généalogique de ta famille en anglais !',
    lessonPage: 37, exercisesPage: 38, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '2-4-1', type: 'qcm', question: 'Comment dit-on « frère » en anglais ?', options: ['Sister', 'Father', 'Brother', 'Uncle'], answer: 'Brother', explanation: '« Brother » = frère. Sister = sœur, Father = père, Uncle = oncle.', hint: 'Pense à « brotherly love ».' },
      { id: '2-4-2', type: 'completer', question: 'Traduis : « Ma grand-mère s\'appelle Marie. » → My ___ is called Marie.', answer: 'grandmother', explanation: 'Grandmother = grand-mère. Grandfather = grand-père.', hint: 'Grand + mother = ?' },
      { id: '2-4-3', type: 'vrai_faux', question: '« Father » signifie « mère » en anglais.', answer: 'faux', explanation: '« Father » signifie « père ». « Mère » se dit « mother » en anglais.', hint: 'Father/mother = père/mère.' },
      { id: '2-4-4', type: 'qcm', question: 'Comment dit-on « J\'ai une sœur. » en anglais ?', options: ['I have a brother.', 'I am a sister.', 'I have a sister.', 'My sister have.'], answer: 'I have a sister.', explanation: '« I have » = j\'ai. Sister = sœur. « I have a sister. » = J\'ai une sœur.', hint: 'Have = avoir (I have = j\'ai).' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 4 — Vocabulaire et calcul ⭐⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '3-0', semaineIndex: 3, jourIndex: 0, ordre: 15,
    label: 'Lun 20 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — Synonymes, antonymes, familles de mots',
    detail: 'Un synonyme est un mot de sens proche (rapide/vite). Un antonyme est un mot de sens contraire (grand/petit). Une famille de mots regroupe des mots de même racine (terre, terrain, enterrer).',
    tip: 'Les synonymes enrichissent ton vocabulaire. Les antonymes aident à former les contraires.',
    lessonPage: 40, exercisesPage: 41, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '3-0-1', type: 'qcm', question: 'Quel est le synonyme de « heureux » ?', options: ['Triste', 'Content', 'Fatigué', 'Méchant'], answer: 'Content', explanation: '« Content » et « heureux » ont un sens proche : ce sont des synonymes.', hint: 'Un synonyme a un sens proche du mot de départ.' },
      { id: '3-0-2', type: 'completer', question: 'L\'antonyme de « chaud » est ___.', answer: 'froid', explanation: '« Froid » est le contraire de « chaud » : ce sont des antonymes.', hint: 'Quel est le contraire de la chaleur ?' },
      { id: '3-0-3', type: 'vrai_faux', question: '« Courir », « course » et « coureur » appartiennent à la même famille de mots.', answer: 'vrai', explanation: 'Ces trois mots ont la même racine « cour- » : ils forment une famille de mots.', hint: 'Cherche la racine commune.' },
      { id: '3-0-4', type: 'qcm', question: 'Quel est l\'antonyme de « montrer » ?', options: ['Afficher', 'Cacher', 'Exposer', 'Présenter'], answer: 'Cacher', explanation: '« Cacher » est le contraire de « montrer » : c\'est son antonyme.', hint: 'Si on ne montre pas, on...' },
    ],
  },

  {
    id: '3-1', semaineIndex: 3, jourIndex: 1, ordre: 16,
    label: 'Mar 21 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Les fractions simples',
    detail: 'Une fraction représente une partie d\'un tout. Elle s\'écrit a/b : a est le numérateur (nombre de parties prises), b est le dénominateur (nombre total de parties égales).',
    tip: 'Astuce : 1/2 = une moitié, 1/4 = un quart, 3/4 = trois quarts.',
    lessonPage: 42, exercisesPage: 43, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '3-1-1', type: 'qcm', question: 'Une pizza est coupée en 8 parts égales. On en mange 3. Quelle fraction représente ce qui a été mangé ?', options: ['8/3', '3/8', '5/8', '3/5'], answer: '3/8', explanation: '3 parts mangées sur 8 au total = 3/8. Le numérateur est 3, le dénominateur est 8.', hint: 'Numérateur = ce qu\'on prend, dénominateur = total de parts.' },
      { id: '3-1-2', type: 'vrai_faux', question: '1/2 est plus grand que 1/4.', answer: 'vrai', explanation: 'La moitié (1/2) est plus grande qu\'un quart (1/4). Pense à une pizza : la moitié c\'est plus qu\'un quart.', hint: 'Plus le dénominateur est grand, plus la part est petite.' },
      { id: '3-1-3', type: 'completer', question: 'Combien de huitièmes font une demie ? 1/2 = ___/8', answer: '4', explanation: '1/2 = 4/8. On multiplie numérateur et dénominateur par 4 : 1×4/2×4 = 4/8.', hint: '2 × 4 = 8, donc 1 × ? = ?' },
      { id: '3-1-4', type: 'qcm', question: 'Quelle fraction est égale à 1 entier ?', options: ['2/4', '5/5', '3/6', '4/8'], answer: '5/5', explanation: '5/5 = 1 car numérateur = dénominateur. Quand on prend toutes les parts, on a le tout entier.', hint: 'Quand le numérateur = dénominateur, la fraction = 1.' },
    ],
  },

  {
    id: '3-2', semaineIndex: 3, jourIndex: 2, ordre: 17,
    label: 'Mer 22 juil.', type: 'lecon', matiere: 'géographie', difficulte: 2,
    lecon: 'Géographie — Les continents et les océans',
    detail: 'La Terre est divisée en 6 continents (Europe, Afrique, Asie, Amérique, Océanie, Antarctique) et 5 océans (Pacifique, Atlantique, Indien, Arctique, Antarctique).',
    tip: 'Mémorise les continents : « En Afrique, des Animaux Amusants Ont des Ailes » (Europe, Afrique, Asie, Amérique, Océanie, Antarctique)',
    lessonPage: 44, exercisesPage: 45, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '3-2-1', type: 'qcm', question: 'Combien y a-t-il de continents sur Terre ?', options: ['5', '6', '7', '4'], answer: '6', explanation: 'Il y a 6 continents : Europe, Afrique, Asie, Amérique, Océanie et Antarctique.', hint: 'N\'oublie pas l\'Antarctique !' },
      { id: '3-2-2', type: 'vrai_faux', question: 'Le plus grand océan du monde est l\'océan Pacifique.', answer: 'vrai', explanation: 'L\'océan Pacifique est le plus grand et le plus profond des océans. Il couvre environ un tiers de la surface du globe.', hint: 'Pacific vient de « pacifique » = calme.' },
      { id: '3-2-3', type: 'completer', question: 'La France se trouve sur le continent ___.', answer: 'européen', explanation: 'La France est un pays d\'Europe occidentale. Elle fait partie du continent européen.', hint: 'Le continent le plus proche de la France.' },
      { id: '3-2-4', type: 'qcm', question: 'Quel océan sépare l\'Europe de l\'Amérique ?', options: ['Pacifique', 'Indien', 'Atlantique', 'Arctique'], answer: 'Atlantique', explanation: 'L\'océan Atlantique est situé entre l\'Europe/l\'Afrique à l\'est et les Amériques à l\'ouest.', hint: 'Il porte le nom du titan Atlas de la mythologie grecque.' },
    ],
  },

  {
    id: '3-3', semaineIndex: 3, jourIndex: 3, ordre: 18,
    label: 'Jeu 23 juil.', type: 'lecon', matiere: 'sciences', difficulte: 3,
    lecon: 'Sciences — Le corps humain',
    detail: 'Le corps humain est organisé en appareils (digestif, respiratoire, circulatoire) et en organes (cœur, poumons, foie...). Les squelette est formé de 206 os.',
    tip: 'Le cœur bat environ 70 fois par minute et pompe 5 litres de sang.',
    lessonPage: 46, exercisesPage: 47, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '3-3-1', type: 'qcm', question: 'Quel organe pompe le sang dans le corps ?', options: ['Les poumons', 'Le foie', 'Le cœur', 'L\'estomac'], answer: 'Le cœur', explanation: 'Le cœur est un muscle qui pompe le sang dans tout le corps. Il bat environ 70 fois par minute au repos.', hint: 'Il se situe dans la poitrine.' },
      { id: '3-3-2', type: 'vrai_faux', question: 'Le corps humain possède 206 os.', answer: 'vrai', explanation: 'Le corps humain adulte est composé de 206 os. Ensemble, ils forment le squelette.', hint: 'Ce nombre est fixe chez l\'adulte.' },
      { id: '3-3-3', type: 'completer', question: 'Les poumons sont les organes de l\'appareil ___.', answer: 'respiratoire', explanation: 'Les poumons permettent la respiration : ils captent l\'oxygène et rejettent le dioxyde de carbone. Ils font partie de l\'appareil respiratoire.', hint: 'Ils servent à respirer.' },
      { id: '3-3-4', type: 'qcm', question: 'Quel appareil transforme les aliments en nutriments ?', options: ['L\'appareil respiratoire', 'L\'appareil digestif', 'L\'appareil circulatoire', 'Le système nerveux'], answer: 'L\'appareil digestif', explanation: 'L\'appareil digestif (bouche, œsophage, estomac, intestins) transforme les aliments en nutriments utilisables par le corps.', hint: 'Il commence dans la bouche et finit par l\'intestin.' },
    ],
  },

  {
    id: '3-4', semaineIndex: 3, jourIndex: 4, ordre: 19,
    label: 'Ven 24 juil.', type: 'lecon', matiere: 'anglais', difficulte: 3,
    lecon: 'Anglais — La maison',
    detail: 'Les pièces de la maison : kitchen (cuisine), bedroom (chambre), bathroom (salle de bain), living room (salon), garden (jardin). Les meubles : table, chair (chaise), bed (lit), sofa.',
    tip: 'Étiquette les meubles de ta chambre en anglais pour les mémoriser !',
    lessonPage: 48, exercisesPage: 49, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '3-4-1', type: 'qcm', question: 'Comment dit-on « cuisine » en anglais ?', options: ['Bathroom', 'Bedroom', 'Kitchen', 'Living room'], answer: 'Kitchen', explanation: '« Kitchen » = cuisine. C\'est la pièce où l\'on prépare les repas.', hint: 'Pense à « kitchen » → les repas.' },
      { id: '3-4-2', type: 'completer', question: 'Traduis : « Je dors dans ma chambre. » → I sleep in my ___.', answer: 'bedroom', explanation: 'Bedroom = chambre à coucher. Bed = lit, room = pièce.', hint: 'Bed = lit. Quelle pièce contient un lit ?' },
      { id: '3-4-3', type: 'vrai_faux', question: '« Living room » signifie « salle à manger » en anglais.', answer: 'faux', explanation: '« Living room » = salon (pièce de vie). « Salle à manger » se dit « dining room » en anglais.', hint: 'Dining = repas. Living = vivre.' },
      { id: '3-4-4', type: 'qcm', question: 'Où se trouve la baignoire ? Dans la...', options: ['kitchen', 'bedroom', 'bathroom', 'garden'], answer: 'bathroom', explanation: '« Bathroom » = salle de bain. La baignoire (bath) s\'y trouve.', hint: 'Bath = bain.' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 5 — Géométrie et récit ⭐⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '4-0', semaineIndex: 4, jourIndex: 0, ordre: 20,
    label: 'Lun 27 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — Conjugaison : le présent de l\'indicatif',
    detail: 'Le présent de l\'indicatif exprime une action qui se passe maintenant ou une vérité générale. Terminaisons du 1er groupe (-er) : -e, -es, -e, -ons, -ez, -ent.',
    tip: 'Pour les verbes du 1er groupe au présent, enlève -er et ajoute les terminaisons : e, es, e, ons, ez, ent.',
    lessonPage: 51, exercisesPage: 52, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '4-0-1', type: 'qcm', question: 'Conjugue « manger » à la 3e personne du singulier (il/elle) au présent.', options: ['mange', 'manges', 'mangent', 'mangeons'], answer: 'mange', explanation: 'Il/elle + verbe du 1er groupe au présent = radical + e. Manger → mang + e = mange.', hint: '1er groupe, 3e personne du singulier → -e.' },
      { id: '4-0-2', type: 'vrai_faux', question: 'La conjugaison de « être » au présent : « nous sommes ».', answer: 'vrai', explanation: 'Être au présent : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.', hint: 'Être est un verbe irrégulier très important.' },
      { id: '4-0-3', type: 'completer', question: 'Conjugue « finir » (2e groupe) à la 2e personne du pluriel : vous ___.', answer: 'finissez', explanation: 'Finir au présent : je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.', hint: 'Le 2e groupe prend -iss- à partir de nous.' },
      { id: '4-0-4', type: 'qcm', question: 'Quelle forme est correcte pour « avoir » à la 1re personne du singulier ?', options: ['j\'es', 'j\'ai', 'j\'a', 'j\'ont'], answer: 'j\'ai', explanation: 'Avoir au présent : j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.', hint: 'Avoir est irrégulier : je → j\'ai.' },
    ],
  },

  {
    id: '4-1', semaineIndex: 4, jourIndex: 1, ordre: 21,
    label: 'Mar 28 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Les figures géométriques planes',
    detail: 'Figures à connaître : carré, rectangle, triangle, cercle, losange, trapèze. Chacune a des propriétés spécifiques (côtés, angles). Le périmètre est la mesure du contour.',
    tip: 'Le périmètre = somme de tous les côtés. Pour un carré : P = 4 × côté.',
    lessonPage: 53, exercisesPage: 54, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '4-1-1', type: 'qcm', question: 'Un carré a combien de côtés ?', options: ['3', '4', '5', '6'], answer: '4', explanation: 'Un carré a 4 côtés égaux et 4 angles droits.', hint: 'Pense à la forme d\'une feuille carrée.' },
      { id: '4-1-2', type: 'completer', question: 'Le périmètre d\'un carré de côté 5 cm = ___ cm', answer: '20', explanation: 'Périmètre d\'un carré = 4 × côté = 4 × 5 = 20 cm.', hint: 'P = 4 × côté pour un carré.' },
      { id: '4-1-3', type: 'vrai_faux', question: 'Un rectangle a 4 angles droits.', answer: 'vrai', explanation: 'Un rectangle a 4 angles droits (90°). C\'est l\'une de ses propriétés fondamentales.', hint: 'Angle droit = 90°.' },
      { id: '4-1-4', type: 'qcm', question: 'Quel est le périmètre d\'un rectangle de longueur 8 cm et de largeur 3 cm ?', options: ['11 cm', '22 cm', '24 cm', '11 cm²'], answer: '22 cm', explanation: 'P = 2 × (longueur + largeur) = 2 × (8 + 3) = 2 × 11 = 22 cm.', hint: 'P = 2 × (L + l) pour un rectangle.' },
    ],
  },

  {
    id: '4-2', semaineIndex: 4, jourIndex: 2, ordre: 22,
    label: 'Mer 29 juil.', type: 'lecon', matiere: 'géographie', difficulte: 3,
    lecon: 'Géographie — La France : régions et reliefs',
    detail: 'La France métropolitaine a 13 régions depuis 2016. Ses principaux reliefs : les Alpes (Mont-Blanc, 4 808 m), les Pyrénées, le Massif central. Ses grands fleuves : la Loire, le Rhône, la Garonne, la Seine.',
    tip: 'Le Mont-Blanc est le plus haut sommet de France et d\'Europe occidentale.',
    lessonPage: 55, exercisesPage: 56, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '4-2-1', type: 'qcm', question: 'Quel est le plus haut sommet de France ?', options: ['Le Puy de Dôme', 'Les Pyrénées', 'Le Mont-Blanc', 'Les Vosges'], answer: 'Le Mont-Blanc', explanation: 'Le Mont-Blanc (4 808 m) est le point culminant de France, situé dans les Alpes.', hint: 'Il est situé dans les Alpes.' },
      { id: '4-2-2', type: 'vrai_faux', question: 'La Loire est le plus long fleuve de France.', answer: 'vrai', explanation: 'La Loire mesure 1 013 km, c\'est le plus long fleuve de France. Elle se jette dans l\'Atlantique à Saint-Nazaire.', hint: 'Elle traverse le Val de Loire.' },
      { id: '4-2-3', type: 'completer', question: 'La capitale de la France est ___.', answer: 'Paris', explanation: 'Paris est la capitale et la plus grande ville de France. Elle est traversée par la Seine.', hint: 'C\'est la ville de la Tour Eiffel.' },
      { id: '4-2-4', type: 'qcm', question: 'Combien de régions compte la France métropolitaine depuis 2016 ?', options: ['22', '13', '18', '10'], answer: '13', explanation: 'La réforme territoriale de 2016 a réduit le nombre de régions de 22 à 13 en France métropolitaine.', hint: 'Un chiffre entre 10 et 20.' },
    ],
  },

  {
    id: '4-3', semaineIndex: 4, jourIndex: 3, ordre: 23,
    label: 'Jeu 30 juil.', type: 'lecon', matiere: 'sciences', difficulte: 3,
    lecon: 'Sciences — Les animaux et leur milieu de vie',
    detail: 'Chaque animal est adapté à son milieu de vie. Les animaux terrestres, aquatiques, aériens. Les chaînes alimentaires montrent qui mange qui.',
    tip: 'Dans une chaîne alimentaire, les plantes sont toujours au début (producteurs).',
    lessonPage: 57, exercisesPage: 58, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '4-3-1', type: 'qcm', question: 'Quel animal est adapté au milieu aquatique ?', options: ['L\'aigle', 'Le ver de terre', 'Le dauphin', 'Le lézard'], answer: 'Le dauphin', explanation: 'Le dauphin est un mammifère marin adapté à la vie dans l\'eau grâce à ses nageoires et sa morphologie hydrodynamique.', hint: 'Il vit dans la mer mais respire de l\'air.' },
      { id: '4-3-2', type: 'vrai_faux', question: 'Dans la chaîne alimentaire herbe → lapin → renard, le renard est un prédateur.', answer: 'vrai', explanation: 'Le renard mange le lapin : c\'est un prédateur. Le lapin est sa proie. La chaîne commence par les végétaux.', hint: 'Le prédateur chasse une proie.' },
      { id: '4-3-3', type: 'completer', question: 'Les animaux qui mangent uniquement des plantes sont appelés ___.', answer: 'herbivores', explanation: 'Herbivore = qui mange des herbes/plantes. Carnivore = qui mange de la viande. Omnivore = qui mange les deux.', hint: 'Herbe + vore (de « vorare » = manger).' },
      { id: '4-3-4', type: 'qcm', question: 'L\'oiseau est adapté au milieu aérien grâce à :', options: ['Ses nageoires', 'Ses pattes', 'Ses ailes et ses plumes', 'Ses écailles'], answer: 'Ses ailes et ses plumes', explanation: 'Les ailes permettent le vol et les plumes assurent l\'isolation thermique et l\'aérodynamisme.', hint: 'Ce qui lui permet de voler.' },
    ],
  },

  {
    id: '4-4', semaineIndex: 4, jourIndex: 4, ordre: 24,
    label: 'Ven 31 juil.', type: 'lecon', matiere: 'anglais', difficulte: 3,
    lecon: 'Anglais — Les animaux',
    detail: 'Les animaux en anglais : dog (chien), cat (chat), horse (cheval), bird (oiseau), fish (poisson), rabbit (lapin), elephant (éléphant), lion, tiger (tigre), bear (ours).',
    tip: 'Certains mots sont identiques ou très proches en français et en anglais : lion, tiger, elephant.',
    lessonPage: 59, exercisesPage: 60, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '4-4-1', type: 'qcm', question: 'Comment dit-on « chien » en anglais ?', options: ['Cat', 'Dog', 'Horse', 'Bird'], answer: 'Dog', explanation: '« Dog » = chien. Cat = chat, Horse = cheval, Bird = oiseau.', hint: 'Un « hot dog » est un sandwich avec une saucisse.' },
      { id: '4-4-2', type: 'completer', question: 'Traduis : « J\'ai un lapin blanc. » → I have a white ___.', answer: 'rabbit', explanation: 'Rabbit = lapin. White = blanc. « I have a white rabbit. »', hint: 'Pense à Alice au Pays des Merveilles (White Rabbit).' },
      { id: '4-4-3', type: 'vrai_faux', question: '« Fish » signifie « poisson » en anglais.', answer: 'vrai', explanation: '« Fish » = poisson. C\'est aussi le nom du célèbre plat anglais « fish and chips ».', hint: 'Fish and chips est un plat anglais typique.' },
      { id: '4-4-4', type: 'qcm', question: 'Quel animal se dit « horse » en anglais ?', options: ['Chat', 'Cheval', 'Ours', 'Lapin'], answer: 'Cheval', explanation: '« Horse » = cheval. On dit « on horseback » pour « à cheval ».', hint: 'Les cavaliers montent sur un « horse ».' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 6 — Orthographe et mesures ⭐⭐⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '5-0', semaineIndex: 5, jourIndex: 0, ordre: 25,
    label: 'Lun 3 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — Les accords dans le groupe nominal',
    detail: 'Dans un GN, l\'adjectif et le déterminant s\'accordent avec le nom en genre (masculin/féminin) et en nombre (singulier/pluriel). Ex : « les grandes maisons » → féminin pluriel.',
    tip: 'Trouve d\'abord le genre et le nombre du nom, puis accorde tout le GN.',
    lessonPage: 62, exercisesPage: 63, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '5-0-1', type: 'completer', question: 'Accorde l\'adjectif : « des fleurs ___» (joli)', answer: 'jolies', explanation: '« Fleurs » est féminin pluriel. Joli → féminin : jolie → pluriel : jolies.', hint: 'Féminin de joli = jolie, pluriel = jolies.' },
      { id: '5-0-2', type: 'vrai_faux', question: 'Dans « un beau jardin », « beau » est au masculin singulier.', answer: 'vrai', explanation: '« Jardin » est masculin singulier. L\'adjectif « beau » s\'accorde : masculin singulier = beau.', hint: 'Beau (masc. sing.), belle (fém. sing.), beaux (masc. plur.), belles (fém. plur.).' },
      { id: '5-0-3', type: 'qcm', question: 'Quelle phrase est correctement accordée ?', options: ['des joli garçons', 'des jolis garçon', 'des jolis garçons', 'des jolie garçons'], answer: 'des jolis garçons', explanation: '« Garçons » = masculin pluriel. Joli → masculin pluriel = jolis. Garçon → pluriel = garçons.', hint: 'Masculin pluriel pour l\'adjectif ET pour le nom.' },
      { id: '5-0-4', type: 'completer', question: 'Accorde : « la ___ (nouveau) directrice »', answer: 'nouvelle', explanation: 'Nouveau au féminin singulier devient « nouvelle ». (Nouveau → nouvelle, comme beau → belle).', hint: 'Nouveau au féminin = nouvelle (comme beau/belle).' },
    ],
  },

  {
    id: '5-1', semaineIndex: 5, jourIndex: 1, ordre: 26,
    label: 'Mar 4 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — L\'aire des figures planes',
    detail: 'L\'aire mesure la surface d\'une figure. Formules : carré = côté², rectangle = longueur × largeur, triangle = (base × hauteur) ÷ 2. L\'unité est le cm², m², km²...',
    tip: 'Ne confonds pas périmètre (contour) et aire (surface) !',
    lessonPage: 64, exercisesPage: 65, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '5-1-1', type: 'qcm', question: 'Quelle est l\'aire d\'un carré de côté 6 cm ?', options: ['24 cm²', '36 cm²', '12 cm²', '18 cm²'], answer: '36 cm²', explanation: 'Aire du carré = côté² = 6² = 6 × 6 = 36 cm².', hint: 'Aire carré = côté × côté.' },
      { id: '5-1-2', type: 'completer', question: 'Aire d\'un rectangle de longueur 10 cm et largeur 4 cm = ___ cm²', answer: '40', explanation: 'Aire rectangle = longueur × largeur = 10 × 4 = 40 cm².', hint: 'A = L × l' },
      { id: '5-1-3', type: 'vrai_faux', question: 'L\'aire d\'un triangle de base 8 cm et hauteur 5 cm est 20 cm².', answer: 'vrai', explanation: 'Aire triangle = (base × hauteur) ÷ 2 = (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm².', hint: 'A = (b × h) ÷ 2' },
      { id: '5-1-4', type: 'qcm', question: 'Quelle unité utilise-t-on pour mesurer une aire ?', options: ['cm', 'm', 'cm²', 'km'], answer: 'cm²', explanation: 'L\'aire se mesure en unités carrées : cm², m², km². Le périmètre se mesure en cm, m, km.', hint: 'L\'unité d\'aire est toujours au carré.' },
    ],
  },

  {
    id: '5-2', semaineIndex: 5, jourIndex: 2, ordre: 27,
    label: 'Mer 5 août', type: 'lecon', matiere: 'histoire', difficulte: 3,
    lecon: 'Histoire — Le Moyen Âge',
    detail: 'Le Moyen Âge s\'étend de 476 (chute de Rome) à 1492 (découverte de l\'Amérique). C\'est l\'époque des châteaux forts, des chevaliers, des cathédrales et de la féodalité.',
    tip: 'Retiens les dates clés : 476 (début) et 1492 (fin du Moyen Âge).',
    lessonPage: 66, exercisesPage: 67, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '5-2-1', type: 'qcm', question: 'Quand commence le Moyen Âge ?', options: ['En 1492', 'En 476 après J.-C.', 'En 1000 après J.-C.', 'En 44 avant J.-C.'], answer: 'En 476 après J.-C.', explanation: 'Le Moyen Âge commence en 476 avec la chute de l\'Empire romain d\'Occident.', hint: 'C\'est la chute d\'un grand empire.' },
      { id: '5-2-2', type: 'vrai_faux', question: 'Les chevaliers portaient une armure pour se protéger.', answer: 'vrai', explanation: 'Les chevaliers médiévaux portaient des armures en métal pour se protéger lors des combats.', hint: 'Pense aux tournois du Moyen Âge.' },
      { id: '5-2-3', type: 'completer', question: 'La cathédrale Notre-Dame de Paris est un monument du Moyen ___.', answer: 'Âge', explanation: 'Notre-Dame de Paris a été construite entre 1163 et 1345, soit pendant le Moyen Âge.', hint: 'La période entre l\'Antiquité et l\'époque moderne.' },
      { id: '5-2-4', type: 'qcm', question: 'Comment s\'appelait le système politique du Moyen Âge où le roi donnait des terres aux seigneurs ?', options: ['La démocratie', 'La féodalité', 'La République', 'L\'Empire'], answer: 'La féodalité', explanation: 'La féodalité est le système du Moyen Âge : le roi donne des fiefs (terres) aux seigneurs qui lui doivent fidélité.', hint: 'Fief → féodalité.' },
    ],
  },

  {
    id: '5-3', semaineIndex: 5, jourIndex: 3, ordre: 28,
    label: 'Jeu 6 août', type: 'lecon', matiere: 'sciences', difficulte: 3,
    lecon: 'Sciences — Les mélanges et la matière',
    detail: 'Un mélange peut être homogène (eau + sel : on ne voit pas les deux composants) ou hétérogène (eau + huile : on voit deux couches). On peut séparer les mélanges par filtration, décantation ou distillation.',
    tip: 'Eau + sel = homogène (transparent). Eau + huile = hétérogène (deux couches visibles).',
    lessonPage: 68, exercisesPage: 69, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '5-3-1', type: 'qcm', question: 'Quel mélange est homogène ?', options: ['Eau + sable', 'Eau + huile', 'Eau + sel dissous', 'Eau + cailloux'], answer: 'Eau + sel dissous', explanation: 'L\'eau salée est homogène : le sel se dissout complètement et on ne le voit plus. C\'est une solution.', hint: 'Dans un mélange homogène, on ne distingue pas les composants.' },
      { id: '5-3-2', type: 'vrai_faux', question: 'La filtration permet de séparer l\'eau du sable.', answer: 'vrai', explanation: 'La filtration retient les particules solides (sable) et laisse passer le liquide (eau). On utilise un filtre.', hint: 'Un filtre retient les gros éléments.' },
      { id: '5-3-3', type: 'completer', question: 'L\'eau + huile forment un mélange ___.', answer: 'hétérogène', explanation: 'L\'eau et l\'huile ne se mélangent pas : on voit deux couches distinctes. C\'est un mélange hétérogène.', hint: 'On voit deux couches séparées.' },
      { id: '5-3-4', type: 'qcm', question: 'Comment sépare-t-on un mélange hétérogène liquide (eau + huile) ?', options: ['Par filtration', 'Par décantation', 'Par chauffage', 'Par agitation'], answer: 'Par décantation', explanation: 'La décantation consiste à laisser reposer le mélange pour que les phases se séparent par gravité, puis à transvaser.', hint: 'On laisse reposer le mélange et les couches se séparent.' },
    ],
  },

  {
    id: '5-4', semaineIndex: 5, jourIndex: 4, ordre: 29,
    label: 'Ven 7 août', type: 'lecon', matiere: 'anglais', difficulte: 4,
    lecon: 'Anglais — Les sports et les loisirs',
    detail: 'Les sports : football, basketball, tennis, swimming (natation), running (course à pied), cycling (vélo). Les loisirs : reading (lecture), drawing (dessin), cooking (cuisine), dancing (danse).',
    tip: 'En anglais, les activités sportives utilisent souvent le verbe « to play » (jouer) ou « to do » (faire).',
    lessonPage: 70, exercisesPage: 71, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '5-4-1', type: 'qcm', question: 'Comment dit-on « Je joue au football » en anglais ?', options: ['I do football', 'I play football', 'I am football', 'I have football'], answer: 'I play football', explanation: 'Pour les sports d\'équipe (football, basketball, tennis), on utilise « to play » : I play football.', hint: 'Play = jouer (pour les sports).' },
      { id: '5-4-2', type: 'completer', question: 'Traduis : « J\'aime la natation. » → I like ___.', answer: 'swimming', explanation: 'Swimming = natation. To swim = nager. « I like swimming. »', hint: 'To swim → swimming (forme en -ing).' },
      { id: '5-4-3', type: 'vrai_faux', question: '« Reading » signifie « lire » ou « la lecture » en anglais.', answer: 'vrai', explanation: '« Reading » est la forme en -ing du verbe « to read » (lire). « I like reading » = J\'aime lire.', hint: 'Read → reading.' },
      { id: '5-4-4', type: 'qcm', question: 'Quel sport dit-on « I do » et non « I play » ?', options: ['Basketball', 'Tennis', 'Judo', 'Football'], answer: 'Judo', explanation: 'Pour les arts martiaux (judo, karaté) et certains sports (gymnastics), on dit « I do judo » et non « I play judo ».', hint: 'Les arts martiaux utilisent « to do ».' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 7 — Consolidation ⭐⭐⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '6-0', semaineIndex: 6, jourIndex: 0, ordre: 30,
    label: 'Lun 10 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — Le passé composé',
    detail: 'Le passé composé exprime une action terminée dans le passé. Il se forme avec un auxiliaire (avoir ou être) conjugué au présent + le participe passé du verbe. Ex : j\'ai mangé, je suis allé(e).',
    tip: 'Avec être : les verbes de mouvement et les verbes pronominaux. Le participe passé s\'accorde avec le sujet.',
    lessonPage: 73, exercisesPage: 74, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '6-0-1', type: 'qcm', question: 'Conjugue « manger » au passé composé, 1re personne du singulier.', options: ['je mangeais', 'j\'ai mangé', 'je mangerai', 'j\'avais mangé'], answer: 'j\'ai mangé', explanation: 'Passé composé = auxiliaire avoir au présent + participe passé. J\'ai + mangé = j\'ai mangé.', hint: 'Avoir ou être au présent + participe passé.' },
      { id: '6-0-2', type: 'vrai_faux', question: '« Elle est allée au cinéma. » est correctement conjugué au passé composé.', answer: 'vrai', explanation: '« Aller » se conjugue avec l\'auxiliaire être. Le participe passé s\'accorde avec le sujet féminin : allée.', hint: 'Aller → être + allé(e).' },
      { id: '6-0-3', type: 'completer', question: 'Conjugue « partir » au passé composé : nous ___ partis.', answer: 'sommes', explanation: 'Partir utilise l\'auxiliaire être. Nous sommes partis (accord au masculin pluriel).', hint: 'Partir est un verbe de mouvement → auxiliaire être.' },
      { id: '6-0-4', type: 'qcm', question: 'Quel auxiliaire utilise-t-on pour conjuguer « venir » au passé composé ?', options: ['avoir', 'être', 'aller', 'faire'], answer: 'être', explanation: 'Venir → être. Il est venu, elle est venue. Les verbes de mouvement (aller, venir, partir, arriver...) utilisent être.', hint: 'Les verbes de mouvement utilisent être.' },
    ],
  },

  {
    id: '6-1', semaineIndex: 6, jourIndex: 1, ordre: 31,
    label: 'Mar 11 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — La proportionnalité',
    detail: 'Deux grandeurs sont proportionnelles quand on peut passer de l\'une à l\'autre en multipliant par le même nombre (le coefficient de proportionnalité). Ex : prix = 3 × quantité.',
    tip: 'Dans un tableau de proportionnalité, on peut toujours multiplier ou diviser une colonne par le même nombre.',
    lessonPage: 75, exercisesPage: 76, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '6-1-1', type: 'qcm', question: '1 cahier coûte 2 €. Combien coûtent 5 cahiers ?', options: ['7 €', '8 €', '10 €', '12 €'], answer: '10 €', explanation: '5 × 2 € = 10 €. Le prix est proportionnel au nombre de cahiers.', hint: 'Multiplie le prix d\'un cahier par le nombre de cahiers.' },
      { id: '6-1-2', type: 'vrai_faux', question: 'Si 3 pommes coûtent 1,50 €, alors 6 pommes coûtent 3 €.', answer: 'vrai', explanation: '6 pommes = 2 × 3 pommes, donc le prix est 2 × 1,50 = 3 €.', hint: 'On double la quantité, donc on double le prix.' },
      { id: '6-1-3', type: 'completer', question: 'Une voiture roule à 90 km/h. En 2 heures, elle parcourt ___ km.', answer: '180', explanation: 'Distance = vitesse × temps = 90 × 2 = 180 km.', hint: 'Distance = vitesse × temps.' },
      { id: '6-1-4', type: 'qcm', question: 'Lequel de ces tableaux est proportionnel ?', options: ['1→2, 2→5, 3→8', '2→4, 4→8, 6→12', '1→3, 2→4, 3→5', '1→1, 2→3, 3→6'], answer: '2→4, 4→8, 6→12', explanation: 'Dans le tableau 2→4, 4→8, 6→12, le coefficient est toujours ×2. C\'est une situation proportionnelle.', hint: 'Le coefficient doit être le même dans toutes les colonnes.' },
    ],
  },

  {
    id: '6-2', semaineIndex: 6, jourIndex: 2, ordre: 32,
    label: 'Mer 12 août', type: 'lecon', matiere: 'géographie', difficulte: 4,
    lecon: 'Géographie — Lire et utiliser une carte',
    detail: 'Une carte est une représentation à plat d\'un territoire. Elle comporte une légende, une échelle et une orientation (la rose des vents). L\'échelle indique le rapport entre la carte et la réalité.',
    tip: 'Sur une carte, le Nord est généralement en haut. La légende explique les symboles utilisés.',
    lessonPage: 77, exercisesPage: 78, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '6-2-1', type: 'qcm', question: 'À quoi sert la légende d\'une carte ?', options: ['À indiquer l\'échelle', 'À expliquer les symboles et couleurs', 'À montrer le nord', 'À calculer les distances'], answer: 'À expliquer les symboles et couleurs', explanation: 'La légende explique la signification de chaque symbole, couleur ou motif utilisé sur la carte.', hint: 'Sans légende, on ne saurait pas ce que signifient les couleurs.' },
      { id: '6-2-2', type: 'vrai_faux', question: 'Sur une carte, le Nord est généralement en haut.', answer: 'vrai', explanation: 'Par convention, les cartes sont orientées avec le Nord en haut. On le vérifie grâce à la rose des vents.', hint: 'C\'est une convention cartographique universelle.' },
      { id: '6-2-3', type: 'completer', question: 'Si l\'échelle est 1/100 000, 1 cm sur la carte représente ___ km en réalité.', answer: '1', explanation: '1/100 000 signifie que 1 cm représente 100 000 cm = 1 km en réalité.', hint: '100 000 cm = 1 km.' },
      { id: '6-2-4', type: 'qcm', question: 'La rose des vents sert à :', options: ['Indiquer les fleuves', 'Montrer les frontières', 'Orienter la carte (N, S, E, O)', 'Mesurer les distances'], answer: 'Orienter la carte (N, S, E, O)', explanation: 'La rose des vents montre les quatre points cardinaux : Nord, Sud, Est, Ouest.', hint: 'Elle montre les directions.' },
    ],
  },

  {
    id: '6-3', semaineIndex: 6, jourIndex: 3, ordre: 33,
    label: 'Jeu 13 août', type: 'lecon', matiere: 'sciences', difficulte: 4,
    lecon: 'Sciences — L\'énergie et l\'environnement',
    detail: 'Il existe des énergies renouvelables (solaire, éolienne, hydraulique) et non renouvelables (charbon, pétrole, gaz). Les énergies fossiles produisent du CO₂ et contribuent au réchauffement climatique.',
    tip: 'Renouvelable = inépuisable (soleil, vent, eau). Non renouvelable = se terminera un jour (pétrole, gaz).',
    lessonPage: 79, exercisesPage: 80, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '6-3-1', type: 'qcm', question: 'Laquelle de ces énergies est renouvelable ?', options: ['Le charbon', 'Le pétrole', 'L\'énergie solaire', 'Le gaz naturel'], answer: 'L\'énergie solaire', explanation: 'L\'énergie solaire est renouvelable : le soleil brille chaque jour et son énergie est inépuisable à l\'échelle humaine.', hint: 'Elle vient du soleil.' },
      { id: '6-3-2', type: 'vrai_faux', question: 'Le pétrole est une énergie non renouvelable.', answer: 'vrai', explanation: 'Le pétrole est une énergie fossile formée en millions d\'années. Il est non renouvelable car les réserves sont limitées.', hint: 'Il met des millions d\'années à se former.' },
      { id: '6-3-3', type: 'completer', question: 'L\'énergie produite par le vent s\'appelle l\'énergie ___.', answer: 'éolienne', explanation: 'Les éoliennes captent l\'énergie du vent pour produire de l\'électricité. « Éole » était le dieu du vent dans la mythologie grecque.', hint: 'Éole = dieu du vent → éolien.' },
      { id: '6-3-4', type: 'qcm', question: 'Quel gaz produit-on en brûlant du pétrole, contribuant au réchauffement climatique ?', options: ['L\'oxygène', 'L\'azote', 'Le CO₂', 'L\'hydrogène'], answer: 'Le CO₂', explanation: 'La combustion des énergies fossiles libère du dioxyde de carbone (CO₂), un gaz à effet de serre responsable du réchauffement climatique.', hint: 'C\'est le principal gaz à effet de serre.' },
    ],
  },

  {
    id: '6-4', semaineIndex: 6, jourIndex: 4, ordre: 34,
    label: 'Ven 14 août', type: 'lecon', matiere: 'anglais', difficulte: 4,
    lecon: 'Anglais — Le temps et les saisons',
    detail: 'Les saisons : spring (printemps), summer (été), autumn/fall (automne), winter (hiver). La météo : sunny (ensoleillé), rainy (pluvieux), cloudy (nuageux), windy (venteux), snowy (neigeux).',
    tip: 'Pour parler du temps : « What\'s the weather like? » (Quel temps fait-il ?)',
    lessonPage: 81, exercisesPage: 82, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '6-4-1', type: 'qcm', question: 'Comment dit-on « hiver » en anglais ?', options: ['Spring', 'Summer', 'Autumn', 'Winter'], answer: 'Winter', explanation: '« Winter » = hiver. Spring = printemps, Summer = été, Autumn = automne.', hint: 'C\'est la saison la plus froide.' },
      { id: '6-4-2', type: 'completer', question: 'Comment dit-on « Il fait soleil. » en anglais ? → It is ___.', answer: 'sunny', explanation: '« It is sunny. » = Il fait soleil. Sunny vient de « sun » (soleil) + -y.', hint: 'Sun = soleil → sunny = ensoleillé.' },
      { id: '6-4-3', type: 'vrai_faux', question: '« What\'s the weather like? » signifie « Quel temps fait-il ? »', answer: 'vrai', explanation: 'C\'est la formule standard pour demander le temps qu\'il fait en anglais.', hint: 'Weather = météo/temps.' },
      { id: '6-4-4', type: 'qcm', question: 'En quelle saison va-t-on à l\'école en France ?', options: ['Only in summer', 'In spring and autumn', 'In autumn, winter and spring', 'In winter only'], answer: 'In autumn, winter and spring', explanation: 'L\'année scolaire en France va de septembre (automne) à juin (printemps). L\'été est la période des grandes vacances.', hint: 'Les grandes vacances sont en été (summer).' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SEMAINE 8 — Bilan de l'été 🏆 ⭐⭐⭐⭐⭐
  // ══════════════════════════════════════════════════════════

  {
    id: '7-0', semaineIndex: 7, jourIndex: 0, ordre: 35,
    label: 'Lun 17 août', type: 'exo', matiere: 'français', difficulte: 5,
    lecon: 'Français — Révision : grammaire et conjugaison',
    detail: 'Révise les notions essentielles de l\'été : classes grammaticales, groupes nominaux, accords, présent, passé composé.',
    tip: 'Relis tes notes et résumés des semaines précédentes avant de faire ces exercices.',
    lessonPage: 84, exercisesPage: 85, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '7-0-1', type: 'qcm', question: 'Dans « Les petits oiseaux chantaient joyeusement. », quelle est la classe de « joyeusement » ?', options: ['Adjectif', 'Adverbe', 'Nom', 'Verbe'], answer: 'Adverbe', explanation: '« Joyeusement » modifie le verbe « chantaient » et est invariable : c\'est un adverbe.', hint: 'Il répond à « Comment ? » et est invariable.' },
      { id: '7-0-2', type: 'completer', question: 'Accorde : « de beau___ roses rouges___»', answer: 'belles / rouges', explanation: 'Roses est féminin pluriel. Beau → belle → belles. Rouge → rouges.', hint: 'Roses = féminin pluriel → accordez tous les adjectifs.' },
      { id: '7-0-3', type: 'vrai_faux', question: '« Ils ont couru. » est au passé composé avec l\'auxiliaire « avoir ».', answer: 'vrai', explanation: 'Courir se conjugue avec avoir au passé composé : ils ont couru.', hint: 'Courir → avoir + couru.' },
      { id: '7-0-4', type: 'qcm', question: 'Quel est le sujet dans « Dans la forêt sombre vivait un vieux loup. » ?', options: ['Dans la forêt sombre', 'sombre', 'un vieux loup', 'vivait'], answer: 'un vieux loup', explanation: 'Qui est-ce qui vivait ? → un vieux loup. Le sujet est inversé (après le verbe).', hint: 'Le sujet peut être après le verbe ! Pose la question « Qui est-ce qui vivait ? »' },
    ],
  },

  {
    id: '7-1', semaineIndex: 7, jourIndex: 1, ordre: 36,
    label: 'Mar 18 août', type: 'exo', matiere: 'maths', difficulte: 5,
    lecon: 'Maths — Révision : calcul et géométrie',
    detail: 'Révise les opérations, les fractions, le périmètre, l\'aire et la proportionnalité.',
    tip: 'Pour les problèmes, lis l\'énoncé deux fois et identifie ce qu\'on cherche avant de calculer.',
    lessonPage: 86, exercisesPage: 87, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '7-1-1', type: 'completer', question: 'Calcule : 3/4 + 1/4 = ___', answer: '4/4 ou 1', explanation: '3/4 + 1/4 = 4/4 = 1. Quand le dénominateur est le même, on additionne les numérateurs.', hint: 'Même dénominateur → additionne les numérateurs.' },
      { id: '7-1-2', type: 'qcm', question: 'Un rectangle mesure 12 cm de long et 5 cm de large. Quelle est son aire ?', options: ['34 cm²', '60 cm²', '17 cm²', '70 cm²'], answer: '60 cm²', explanation: 'Aire = L × l = 12 × 5 = 60 cm².', hint: 'Aire rectangle = longueur × largeur.' },
      { id: '7-1-3', type: 'vrai_faux', question: 'Le périmètre d\'un triangle équilatéral de côté 7 cm est 21 cm.', answer: 'vrai', explanation: 'Périmètre triangle équilatéral = 3 × côté = 3 × 7 = 21 cm.', hint: 'Équilatéral = 3 côtés égaux.' },
      { id: '7-1-4', type: 'qcm', question: 'Si 4 stylos coûtent 6 €, combien coûtent 8 stylos ?', options: ['10 €', '12 €', '14 €', '8 €'], answer: '12 €', explanation: '8 stylos = 2 × 4 stylos, donc le prix = 2 × 6 = 12 €.', hint: 'On double la quantité → on double le prix.' },
    ],
  },

  {
    id: '7-2', semaineIndex: 7, jourIndex: 2, ordre: 37,
    label: 'Mer 19 août', type: 'exo', matiere: 'histoire', difficulte: 5,
    lecon: 'Histoire-Géographie — Révision générale',
    detail: 'Révise les grandes périodes de l\'Histoire et la géographie de la France et du monde.',
    tip: 'Fais une frise chronologique : Préhistoire → Antiquité → Moyen Âge.',
    lessonPage: 88, exercisesPage: 89, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '7-2-1', type: 'qcm', question: 'Remets dans l\'ordre chronologique : Moyen Âge, Préhistoire, Antiquité.', options: ['Antiquité, Préhistoire, Moyen Âge', 'Moyen Âge, Antiquité, Préhistoire', 'Préhistoire, Antiquité, Moyen Âge', 'Préhistoire, Moyen Âge, Antiquité'], answer: 'Préhistoire, Antiquité, Moyen Âge', explanation: 'L\'ordre est : Préhistoire (−3M → −3500 av. J.-C.) → Antiquité (−3500 av. J.-C. → 476) → Moyen Âge (476 → 1492).', hint: 'Du plus ancien au plus récent.' },
      { id: '7-2-2', type: 'completer', question: 'Le plus haut sommet de France est le Mont-___.', answer: 'Blanc', explanation: 'Le Mont-Blanc (4 808 m) est le point culminant de France, situé dans les Alpes.', hint: 'Sa couleur... c\'est de la neige !' },
      { id: '7-2-3', type: 'vrai_faux', question: 'La Grèce antique a inventé les Jeux olympiques.', answer: 'vrai', explanation: 'Les premiers Jeux olympiques ont eu lieu à Olympie en 776 avant J.-C.', hint: 'Olympie est une ville de Grèce.' },
      { id: '7-2-4', type: 'qcm', question: 'Combien y a-t-il d\'océans sur Terre ?', options: ['3', '4', '5', '6'], answer: '5', explanation: 'Il y a 5 océans : Pacifique, Atlantique, Indien, Arctique et Antarctique.', hint: 'Plus que les continents moins que les continents + 1.' },
    ],
  },

  {
    id: '7-3', semaineIndex: 7, jourIndex: 3, ordre: 38,
    label: 'Jeu 20 août', type: 'exo', matiere: 'sciences', difficulte: 5,
    lecon: 'Sciences & Anglais — Révision croisée',
    detail: 'Un dernier tour des sciences et de l\'anglais pour être prêt pour la 6ème !',
    tip: 'La confiance vient de la répétition. Tu as travaillé toute l\'été : tu es prêt(e) !',
    lessonPage: 90, exercisesPage: 91, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '7-3-1', type: 'qcm', question: 'Quelle énergie utilise la force du vent ?', options: ['L\'énergie solaire', 'L\'énergie hydraulique', 'L\'énergie éolienne', 'L\'énergie nucléaire'], answer: 'L\'énergie éolienne', explanation: 'L\'énergie éolienne est produite par les éoliennes qui captent la force du vent.', hint: 'Éole = dieu du vent.' },
      { id: '7-3-2', type: 'completer', question: 'Traduis : « I play basketball in winter. » → Je ___ au basketball en ___.', answer: 'joue / hiver', explanation: 'I play = je joue. Basketball = basketball. In winter = en hiver.', hint: 'Play = jouer, winter = hiver.' },
      { id: '7-3-3', type: 'vrai_faux', question: 'Les plantes sont des producteurs dans la chaîne alimentaire.', answer: 'vrai', explanation: 'Les plantes produisent leur propre nourriture grâce à la photosynthèse. Elles sont donc les premiers maillons (producteurs) de toute chaîne alimentaire.', hint: 'Les plantes fabriquent leur nourriture avec la lumière du soleil.' },
      { id: '7-3-4', type: 'qcm', question: 'Comment dit-on « Il fait nuageux. » en anglais ?', options: ['It is sunny.', 'It is windy.', 'It is cloudy.', 'It is rainy.'], answer: 'It is cloudy.', explanation: '« Cloudy » vient de « cloud » (nuage). It is cloudy = il fait nuageux.', hint: 'Cloud = nuage → cloudy = nuageux.' },
    ],
  },

  {
    id: '7-4', semaineIndex: 7, jourIndex: 4, ordre: 39,
    label: 'Ven 21 août', type: 'controle', matiere: 'français', difficulte: 5,
    lecon: '🏆 Bilan final de l\'été !',
    detail: 'Bravo ! Tu as terminé ton cahier de vacances 6ème. Ce bilan final teste toutes les matières de l\'été. Bonne chance !',
    tip: 'Lis bien chaque question avant de répondre. Tu peux le faire, tu as tout révisé !',
    lessonPage: 92, exercisesPage: 93, pdfFile: '/cahier-6eme.pdf',
    exercices: [
      { id: '7-4-1', type: 'qcm', question: 'Quelle est la classe de « rapidement » dans « Elle court rapidement. » ?', options: ['Nom', 'Adjectif', 'Adverbe', 'Verbe'], answer: 'Adverbe', explanation: '« Rapidement » modifie le verbe « court » : c\'est un adverbe de manière.', hint: 'Invariable et modifie le verbe.' },
      { id: '7-4-2', type: 'qcm', question: 'Combien font 9 × 7 ?', options: ['54', '56', '63', '72'], answer: '63', explanation: '9 × 7 = 63. Astuce : 9 × 7 = 10 × 7 − 7 = 70 − 7 = 63.', hint: '9 × 7 = (10 × 7) − 7.' },
      { id: '7-4-3', type: 'completer', question: 'La chute de l\'Empire romain en 476 marque la fin de l\'Antiquité et le début du Moyen ___.', answer: 'Âge', explanation: 'En 476, l\'Empire romain d\'Occident tombe. Cette date marque la fin de l\'Antiquité et le début du Moyen Âge.', hint: 'La période qui suit l\'Antiquité.' },
      { id: '7-4-4', type: 'vrai_faux', question: '« My name is » sert à se présenter en anglais.', answer: 'vrai', explanation: '« My name is [prénom] » est la formule de base pour se présenter en anglais.', hint: 'My = mon/ma, name = nom.' },
      { id: '7-4-5', type: 'qcm', question: 'Quel est le participe passé de « partir » ?', options: ['parti', 'partu', 'parté', 'partis'], answer: 'parti', explanation: 'Le participe passé de « partir » est « parti ». Ex : il est parti. (Attention à l\'accord : elle est partie.)', hint: 'Il est parti(e), nous sommes parti(e)s.' },
    ],
  },
];

import { EXTRA_6EME } from './extra6.js';
// Exercices supplémentaires générés pour les jours Français & Maths
JOURS_6EME.forEach((j) => {
  if (EXTRA_6EME[j.id]) j.exercices.push(...EXTRA_6EME[j.id]);
});

export function buildSeedJours() {
  return JOURS_6EME;
}

export function buildSeedSemaines() {
  return SEMAINES_6EME;
}
