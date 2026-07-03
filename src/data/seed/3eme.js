/**
 * Seed data — 3ème (Préparation au Brevet)
 * 8 semaines × 5 jours = 40 journées
 * Matières : Français, Maths, Histoire, Géographie, EMC, SVT, Physique-Chimie, Technologie, Anglais
 * Difficulté progressive 1 → 5 (niveau DNB)
 */

const SEMAINES_3EME = [
  { index: 0, num: 1, theme: 'Consolider les bases',        color: '#1D4ED8', light: '#EFF6FF', emoji: '📚' },
  { index: 1, num: 2, theme: 'Maîtriser les fondamentaux',  color: '#0891B2', light: '#ECFEFF', emoji: '🔬' },
  { index: 2, num: 3, theme: 'Approfondir le programme',    color: '#059669', light: '#ECFDF5', emoji: '🌍' },
  { index: 3, num: 4, theme: 'Méthodes du Brevet',          color: '#7C3AED', light: '#F5F3FF', emoji: '✍️' },
  { index: 4, num: 5, theme: 'Entraînement intensif',       color: '#EC4899', light: '#FDF2F8', emoji: '⚡' },
  { index: 5, num: 6, theme: 'Exercices type Brevet',       color: '#D97706', light: '#FFFBEB', emoji: '🎯' },
  { index: 6, num: 7, theme: 'Brevet blanc intermédiaire',  color: '#EF4444', light: '#FEF2F2', emoji: '📝' },
  { index: 7, num: 8, theme: 'Grand Brevet Blanc 🏆',       color: '#DC2626', light: '#FFF1F2', emoji: '🏆' },
];

const JOURS_3EME = [

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 1 — Consolider les bases  (difficulté 1-2)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '0-0', semaineIndex: 0, jourIndex: 0, ordre: 0,
    label: 'Lun 29 juin', type: 'lecon', matiere: 'français', difficulte: 1,
    lecon: 'Français — Les registres de langue et les figures de style',
    detail: 'Le registre de langue désigne la façon dont on utilise la langue selon la situation. On distingue le registre familier (à l\'oral entre amis), courant (usage quotidien normal) et soutenu (à l\'écrit formel ou littéraire). Les figures de style enrichissent le texte : la métaphore compare sans outil de comparaison (« la vie est un voyage »), la comparaison utilise « comme », « tel », « ainsi que » (« rapide comme l\'éclair »), la métonymie remplace un mot par un mot lié (« boire un verre » = boire le contenu), la personnification attribue des caractères humains à un objet ou animal. Au brevet, on vous demande d\'identifier la figure et d\'expliquer son effet.',
    tip: 'Pour chaque figure de style, pose-toi deux questions : 1) Quel est le procédé ? 2) Quel effet produit-il sur le lecteur ? C\'est cette deuxième question qui vous donne des points au brevet.',
    lessonPage: 7, exercisesPage: 8, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'0-0-1',type:'qcm',question:'Quelle figure de style est utilisée dans « Le temps est un voleur » ?',options:['Comparaison','Métaphore','Métonymie','Personnification'],answer:'Métaphore',explanation:'C\'est une métaphore : on compare le temps à un voleur SANS outil de comparaison (comme, tel que…).',hint:'Une métaphore compare sans « comme » ni « tel que ».',similarExercise:{'question':'« Il avait un cœur de pierre » est un exemple de :','options':['Comparaison','Métaphore','Personnification','Métonymie'],'answer':'Métaphore'},brevetTip:'Au brevet, nommer la figure rapporte 1 pt ; expliquer son effet rapporte 2 pts. Ne vous arrêtez pas au nom !',method:'Méthode : 1) Identifie s\'il y a un outil de comparaison (comme, tel…). 2) Oui → comparaison. Non → métaphore. 3) Nomme la figure et explique l\'effet produit.'},
      {id:'0-0-2',type:'qcm',question:'« Il pleure dans mon cœur comme il pleut sur la ville » (Verlaine). Quelle figure est employée ?',options:['Métaphore','Comparaison','Personnification','Métonymie'],answer:'Comparaison',explanation:'Il y a l\'outil de comparaison « comme » : c\'est donc une comparaison (et non une métaphore).',hint:'Cherche l\'outil de comparaison dans la phrase.'},
      {id:'0-0-3',type:'vrai_faux',question:'La personnification consiste à attribuer des caractéristiques humaines à un objet ou à un animal.',answer:'vrai',explanation:'Correct. Ex. : « La lune se lève timidement » → la lune est personnifiée car elle a un comportement humain (timide).',hint:'Pense à « person » = personne.'},
      {id:'0-0-4',type:'completer',question:'« Boire un verre » est un exemple de ___ car « verre » remplace le mot « contenu du verre ».',answer:'métonymie',explanation:'La métonymie remplace un mot par un autre mot entretenant un lien logique avec lui (contenant → contenu).',hint:'C\'est une figure qui remplace un mot par un autre mot lié.'},
      {id:'0-0-5',type:'qcm',question:'Dans quel registre de langue dit-on « Je ne sais pas » ?',options:['Familier','Courant','Soutenu','Argotique'],answer:'Courant',explanation:'« Je ne sais pas » est le registre courant (correct, usage quotidien standard). « Je sais pas » = familier ; « Je n\'en ai point connaissance » = soutenu.',hint:'Le registre courant est celui qu\'on utilise dans la vie de tous les jours de façon correcte.'}
    ]
  },

  {
    id: '0-1', semaineIndex: 0, jourIndex: 1, ordre: 1,
    label: 'Mar 30 juin', type: 'lecon', matiere: 'maths', difficulte: 1,
    lecon: 'Maths — Calcul algébrique et équations du premier degré',
    detail: 'Le calcul littéral consiste à manipuler des expressions contenant des lettres (variables). Règles essentielles : distributivité simple k(a+b) = ka+kb, double distributivité (a+b)(c+d) = ac+ad+bc+bd, identités remarquables : (a+b)² = a²+2ab+b², (a-b)² = a²-2ab+b², (a+b)(a-b) = a²-b². Une équation du premier degré est de la forme ax+b = 0. Pour la résoudre : isoler x en effectuant les mêmes opérations des deux côtés. Exemple : 3x+5 = 14 → 3x = 9 → x = 3.',
    tip: 'Au brevet, vérifiez toujours votre solution en la réinjectant dans l\'équation de départ. Un calcul juste mais non vérifié peut perdre des points.',
    lessonPage: 9, exercisesPage: 10, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'0-1-1',type:'qcm',question:'Quelle est la solution de l\'équation 3x + 5 = 14 ?',options:['x = 3','x = 6','x = 9','x = 19/3'],answer:'x = 3',explanation:'3x = 14 - 5 = 9, donc x = 9 ÷ 3 = 3. Vérification : 3×3 + 5 = 9 + 5 = 14 ✓',hint:'Commence par isoler le terme en x en soustrayant 5 des deux côtés.',brevetTip:'Montrez TOUTES les étapes de calcul. Une réponse juste sans justification peut valoir 0 au brevet.',method:'Méthode résolution : 1) Isoler le terme en x (soustraire/additionner des deux côtés). 2) Diviser/multiplier pour trouver x. 3) Vérifier en réinjectant.'},
      {id:'0-1-2',type:'vrai_faux',question:'(a + b)² = a² + b²',answer:'faux',explanation:'(a+b)² = a² + 2ab + b². On oublie souvent le terme 2ab. Par exemple : (3+2)² = 25 ≠ 9+4 = 13.',hint:'Développe (a+b)(a+b) en utilisant la double distributivité.'},
      {id:'0-1-3',type:'qcm',question:'Développe et simplifie : (x + 3)(x - 3) =',options:['x² - 9','x² + 9','x² - 6x + 9','x² + 6x - 9'],answer:'x² - 9',explanation:'(a+b)(a-b) = a² - b², donc (x+3)(x-3) = x² - 3² = x² - 9. C\'est l\'identité remarquable « différence de carrés ».',hint:'Reconnaît-on une identité remarquable ? a = x et b = 3.'},
      {id:'0-1-4',type:'completer',question:'La solution de 2x - 7 = 3 est x = ___',answer:'5',explanation:'2x = 3 + 7 = 10, donc x = 10 ÷ 2 = 5. Vérification : 2×5 - 7 = 10 - 7 = 3 ✓',hint:'Ajoute 7 des deux côtés, puis divise par 2.'}
    ]
  },

  {
    id: '0-2', semaineIndex: 0, jourIndex: 2, ordre: 2,
    label: 'Mer 1er juil.', type: 'lecon', matiere: 'histoire', difficulte: 1,
    lecon: 'Histoire — La Première Guerre mondiale (1914-1918)',
    detail: 'La Première Guerre mondiale éclate le 28 juillet 1914 après l\'assassinat de l\'archiduc François-Ferdinand à Sarajevo. Deux blocs s\'affrontent : la Triple Entente (France, Royaume-Uni, Russie) face aux Empires centraux (Allemagne, Autriche-Hongrie). Caractéristiques : guerre de position dans les tranchées, utilisation de nouvelles armes (gaz, chars, avions), violence de masse. Le génocide arménien (1915) est le premier génocide du XXe siècle. Le bilan humain est de 10 millions de morts militaires et des millions de civils. La guerre se termine le 11 novembre 1918 par l\'armistice.',
    tip: 'Pour le brevet, retenez les dates clés : 1914 (début), 1916 (Verdun), 1917 (entrée des États-Unis, révolution russe), 1918 (armistice du 11/11). Une frise chronologique mentale aide beaucoup.',
    lessonPage: 11, exercisesPage: 12, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'0-2-1',type:'qcm',question:'Quelle est la date de l\'armistice de la Première Guerre mondiale ?',options:['11 novembre 1916','11 novembre 1918','8 mai 1945','28 juillet 1914'],answer:'11 novembre 1918',explanation:'L\'armistice du 11 novembre 1918 marque la fin des combats sur le front occidental. C\'est une date à connaître absolument.',hint:'Pense à la commémoration nationale du 11 novembre.',brevetTip:'Retenez les dates sous forme de frise : 1914 → 1916 (Verdun) → 1917 (USA) → 11.11.1918. Ces jalons reviennent dans toutes les questions de contexte.'},
      {id:'0-2-2',type:'vrai_faux',question:'La bataille de Verdun a eu lieu en 1916.',answer:'vrai',explanation:'La bataille de Verdun (21 février – 18 décembre 1916) est l\'une des plus meurtrières de la guerre : plus de 300 000 morts.',hint:'Verdun est le symbole de la violence de masse de la PGM.'},
      {id:'0-2-3',type:'qcm',question:'Quel pays rejoint la guerre côté Entente en 1917 ?',options:['L\'Espagne','Le Portugal','Les États-Unis','Le Japon'],answer:'Les États-Unis',explanation:'En avril 1917, les États-Unis déclarent la guerre aux Empires centraux après les attaques de sous-marins allemands contre des navires civils (dont le Lusitania).',hint:'Ce pays avait d\'abord observé un strict isolationnisme.'},
      {id:'0-2-4',type:'completer',question:'Le génocide des Arméniens a eu lieu en ___ pendant la Première Guerre mondiale.',answer:'1915',explanation:'En 1915, l\'Empire ottoman organise le massacre et la déportation de la population arménienne. C\'est le premier génocide reconnu du XXe siècle.',hint:'C\'est une date entre 1914 et 1918.'},
      {id:'0-2-5',type:'qcm',question:'Qu\'est-ce que la « guerre de position » ?',options:['Une guerre très rapide','Une guerre menée en mer','Une guerre dans les tranchées sans avancée','Une guerre aérienne'],answer:'Une guerre dans les tranchées sans avancée',explanation:'La guerre de position est caractérisée par des tranchées fixes sur des centaines de kilomètres. Les deux camps s\'affrontent sans pouvoir avancer significativement.',hint:'Elle s\'oppose à la « guerre de mouvement ».'}
    ]
  },

  {
    id: '0-3', semaineIndex: 0, jourIndex: 3, ordre: 3,
    label: 'Jeu 2 juil.', type: 'lecon', matiere: 'svt', difficulte: 1,
    lecon: 'SVT — La génétique et la transmission héréditaire',
    detail: 'L\'information génétique est portée par l\'ADN, molécule présente dans le noyau de chaque cellule. L\'ADN est organisé en chromosomes : l\'être humain possède 46 chromosomes (23 paires). Lors de la reproduction sexuée, chaque parent transmet 23 chromosomes via les gamètes (ovule et spermatozoïde), formant un zygote à 46 chromosomes. Les gènes sont des portions d\'ADN qui déterminent les caractères héréditaires. Un même gène peut avoir plusieurs versions appelées allèles. Un allèle dominant s\'exprime même en un seul exemplaire ; un allèle récessif ne s\'exprime que si présent en deux exemplaires.',
    tip: 'Retenez : gène = information ; allèle = version du gène ; dominant = s\'exprime toujours ; récessif = se cache si dominant présent. Pour les problèmes génétiques, faites toujours un tableau de croisement (échiquier de Punnett).',
    lessonPage: 13, exercisesPage: 14, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'0-3-1',type:'qcm',question:'Combien de chromosomes possède une cellule humaine diploïde normale ?',options:['23','46','48','92'],answer:'46',explanation:'Les cellules humaines (sauf les gamètes) contiennent 46 chromosomes, soit 23 paires. Les gamètes (ovule, spermatozoïde) en contiennent 23 (haploïdes).',hint:'Les gamètes ont la moitié, soit 23.'},
      {id:'0-3-2',type:'vrai_faux',question:'Un allèle récessif s\'exprime même si un seul exemplaire est présent dans la cellule.',answer:'faux',explanation:'Un allèle récessif ne s\'exprime que s\'il est présent en double exemplaire (homozygote récessif). Un allèle dominant s\'exprime dès qu\'il est présent en un seul exemplaire.',hint:'Récessif = caché si dominant présent.',similarExercise:{'question':'Un individu aa exprime quel phénotype ?','options':['Dominant','Récessif','Les deux','Aucun'],'answer':'Récessif'},method:'Pour tout problème génétique : 1) Identifiez l\'allèle dominant (majuscule A) et récessif (minuscule a). 2) Dressez l\'échiquier de Punnett. 3) Lisez les proportions phénotypiques.'},
      {id:'0-3-3',type:'qcm',question:'Où est stockée l\'information génétique dans la cellule ?',options:['Dans les mitochondries','Dans le cytoplasme','Dans le noyau','Dans la membrane'],answer:'Dans le noyau',explanation:'L\'ADN est contenu dans le noyau cellulaire, organisé en chromosomes. (Note : les mitochondries possèdent aussi un ADN, mais très limité.)',hint:'C\'est l\'organite central de la cellule.'},
      {id:'0-3-4',type:'completer',question:'Deux individus ayant le même gène mais des versions différentes ont des ___ différents pour ce gène.',answer:'allèles',explanation:'Les allèles sont les différentes versions d\'un même gène. Par exemple, le gène de la couleur des yeux peut avoir l\'allèle « yeux bruns » ou « yeux bleus ».',hint:'Un gène peut exister sous plusieurs formes appelées…'}
    ]
  },

  {
    id: '0-4', semaineIndex: 0, jourIndex: 4, ordre: 4,
    label: 'Ven 3 juil.', type: 'lecon', matiere: 'anglais', difficulte: 1,
    lecon: 'Anglais — Le prétérit simple et le present perfect',
    detail: 'Le prétérit simple (simple past) exprime une action terminée à un moment précis du passé. Formation : verbe+ed pour les réguliers (worked, played) ou forme irrégulière (went, saw, took). Signal words : yesterday, last year, in 2010, ago. Le present perfect exprime une action passée avec un lien avec le présent, ou dont le moment n\'est pas précisé. Formation : have/has + participe passé (I have seen, she has gone). Signal words : already, yet, just, ever, never, since, for. Différence clé : "I saw the film yesterday" (prétérit = moment précis) vs "I have seen this film" (present perfect = expérience, pas de moment précis).',
    tip: 'Astuce infaillible : si tu peux ajouter "yesterday" ou une date précise → prétérit. Si tu peux ajouter "already/just/never" → present perfect.',
    lessonPage: 15, exercisesPage: 16, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'0-4-1',type:'qcm',question:'Which tense is correct? "She ___ to Paris last year."',options:['has gone','went','goes','is going'],answer:'went',explanation:'"Last year" is a specific past time indicator → simple past. "Went" is the irregular past form of "go".',hint:'Last year = time indicator → which tense ?',method:'Méthode : 1) Repère le signal temporel (yesterday, last year → prétérit ; already, never → present perfect). 2) S\'il n\'y a pas de signal, demande-toi si l\'action a un lien avec le présent.'},
      {id:'0-4-2',type:'vrai_faux',question:'"I have never visited Japan" uses the present perfect correctly.',answer:'vrai',explanation:'"Never" is a present perfect signal word. This sentence expresses a life experience without specifying when. ✓',hint:'"Never" → present perfect.'},
      {id:'0-4-3',type:'qcm',question:'Choose the correct form: "They ___ the film three times already."',options:['saw','see','have seen','had seen'],answer:'have seen',explanation:'"Already" is a present perfect signal word. The action happened before now, with a link to the present (relevance now). → have/has + past participle.',hint:'"Already" is a present perfect signal word.',brevetTip:'Au brevet d\'anglais, les erreurs de temps (prétérit vs present perfect) sont très pénalisées. Identifie toujours le signal temporel avant de choisir.'},
      {id:'0-4-4',type:'completer',question:'Le prétérit de "write" (verbe irrégulier) est ___',answer:'wrote',explanation:'Write → wrote → written (base / prétérit / participe passé). Exemples : "She wrote a letter yesterday."',hint:'C\'est un verbe irrégulier : infinitif → prétérit → participe passé.'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 2 — Maîtriser les fondamentaux  (difficulté 2)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '1-0', semaineIndex: 1, jourIndex: 0, ordre: 5,
    label: 'Lun 6 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — L\'argumentation et les types de raisonnement',
    detail: 'Argumenter consiste à défendre une thèse (opinion) en l\'appuyant sur des arguments (raisons) illustrés par des exemples. Types de raisonnements : le raisonnement par exemple (on illustre une idée générale), le raisonnement par analogie (on compare deux situations), le raisonnement par concession (on reconnaît une idée adverse avant de la réfuter). La structure d\'un texte argumentatif comprend : une introduction avec la thèse, des paragraphes de développement (un argument + exemple + explication), une conclusion qui rappelle la thèse et ouvre sur une perspective. Au brevet, la rédaction argumentée est notée sur la clarté de la thèse, la qualité des arguments et la cohérence du plan.',
    tip: 'Méthode PEEL pour chaque paragraphe : Point (idée directrice) → Evidence (exemple) → Explanation (lien avec la thèse) → Link (transition vers le paragraphe suivant).',
    lessonPage: 18, exercisesPage: 19, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'1-0-1',type:'qcm',question:'Qu\'est-ce qu\'une thèse dans un texte argumentatif ?',options:['Un exemple concret','L\'opinion défendue par l\'auteur','Un contre-argument','La conclusion du texte'],answer:'L\'opinion défendue par l\'auteur',explanation:'La thèse est le point de vue, l\'opinion que l\'auteur cherche à défendre tout au long de son texte. Les arguments viennent la soutenir.',hint:'La thèse = ce que l\'auteur pense et veut démontrer.'},
      {id:'1-0-2',type:'vrai_faux',question:'Dans un raisonnement par concession, l\'auteur reconnaît d\'abord un argument adverse avant de le réfuter.',answer:'vrai',explanation:'C\'est exactement ça. Le raisonnement par concession structure : « Certes… [argument adverse] ; mais… [réfutation + argument renforcé]. » Il montre que l\'auteur tient compte des objections.',hint:'Pense à la structure « Certes... mais... ».'},
      {id:'1-0-3',type:'qcm',question:'Quel connecteur logique exprime une OPPOSITION ?',options:['De plus','Par conséquent','Cependant','En outre'],answer:'Cependant',explanation:'« Cependant » (= toutefois, néanmoins, or) exprime une opposition ou une restriction. Les autres options expriment l\'addition (de plus, en outre) ou la conséquence (par conséquent).',hint:'Cherche le connecteur qui signifie « mais » de façon plus soutenue.',brevetTip:'La rédaction brevet est évaluée sur la COHÉRENCE. Un connecteur mal utilisé crée une incohérence logique qui fait perdre des points.',method:'Mémo connecteurs : Addition → De plus, En outre, Par ailleurs. Opposition → Cependant, Néanmoins, Or. Cause → Car, Puisque, En effet. Conséquence → Donc, Ainsi, Par conséquent.'},
      {id:'1-0-4',type:'completer',question:'La structure d\'un paragraphe argumentatif efficace est : ___ + exemple + explication.',answer:'argument',explanation:'Chaque paragraphe suit le schéma : Argument (idée directrice) → Exemple (illustration) → Explication (lien avec la thèse). La méthode PEEL structure ce raisonnement.',hint:'Le paragraphe commence par l\'idée principale que l\'on va défendre.'}
    ]
  },

  {
    id: '1-1', semaineIndex: 1, jourIndex: 1, ordre: 6,
    label: 'Mar 7 juil.', type: 'lecon', matiere: 'maths', difficulte: 2,
    lecon: 'Maths — Puissances et notation scientifique',
    detail: 'Une puissance a^n est le produit de n facteurs égaux à a. Propriétés : a^m × a^n = a^(m+n) ; a^m ÷ a^n = a^(m-n) ; (a^m)^n = a^(m×n) ; a^0 = 1 ; a^(-n) = 1/a^n. La notation scientifique écrit un nombre sous la forme a × 10^n avec 1 ≤ a < 10 et n entier. Exemples : 300 000 = 3 × 10^5 ; 0,0042 = 4,2 × 10^(-3). Pour calculer avec des puissances de 10, on additionne (multiplication) ou soustrait (division) les exposants. Cette notation est essentielle en sciences pour exprimer des grandeurs très grandes ou très petites.',
    tip: 'Pour convertir en notation scientifique : déplace la virgule jusqu\'à ce que le nombre soit entre 1 et 10. Chaque déplacement à gauche = +1 à l\'exposant ; à droite = -1.',
    lessonPage: 20, exercisesPage: 21, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'1-1-1',type:'qcm',question:'Calcule 2³ × 2⁴ =',options:['2⁷','2¹²','4⁷','2⁶'],answer:'2⁷',explanation:'a^m × a^n = a^(m+n). Donc 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128.',hint:'Pour multiplier des puissances de même base, on additionne les exposants.',method:'Règles de calcul avec les puissances : Même base, multiplication → additionne les exposants. Même base, division → soustrait les exposants. Puissance de puissance → multiplie les exposants.'},
      {id:'1-1-2',type:'vrai_faux',question:'3,7 × 10⁻² = 0,037',answer:'vrai',explanation:'10⁻² = 1/100 = 0,01. Donc 3,7 × 0,01 = 0,037. En notation scientifique, un exposant négatif déplace la virgule vers la gauche.',hint:'10⁻² = 0,01. Multiplie 3,7 par 0,01.'},
      {id:'1-1-3',type:'qcm',question:'Écris 0,00056 en notation scientifique.',options:['5,6 × 10⁻⁴','5,6 × 10⁴','56 × 10⁻⁵','0,56 × 10⁻³'],answer:'5,6 × 10⁻⁴',explanation:'On déplace la virgule de 4 rangs vers la droite pour obtenir 5,6 (compris entre 1 et 10). Chaque déplacement à droite donne -1 à l\'exposant → 10⁻⁴.',hint:'Le nombre doit être entre 1 et 10. Compte combien de fois tu déplaces la virgule.',brevetTip:'En notation scientifique, vérifiez toujours que le premier nombre est entre 1 et 10. Sinon votre réponse n\'est pas en notation scientifique.'},
      {id:'1-1-4',type:'completer',question:'(2³)² = 2 puissance ___',answer:'6',explanation:'(a^m)^n = a^(m×n). Donc (2³)² = 2^(3×2) = 2⁶ = 64.',hint:'Pour une puissance de puissance, on multiplie les exposants.'}
    ]
  },

  {
    id: '1-2', semaineIndex: 1, jourIndex: 2, ordre: 7,
    label: 'Mer 8 juil.', type: 'lecon', matiere: 'géographie', difficulte: 2,
    lecon: 'Géographie — La mondialisation et les flux mondiaux',
    detail: 'La mondialisation désigne l\'intensification des échanges à l\'échelle mondiale : marchandises, capitaux, informations, personnes. Les flux mondiaux circulent via des réseaux de transport (ports, aéroports, routes maritimes) et numériques (internet). Les Firmes Transnationales (FTN) sont des acteurs majeurs : elles produisent dans plusieurs pays pour optimiser les coûts. Les grandes métropoles mondiales (New York, Londres, Tokyo, Shanghai) sont les nœuds de la mondialisation. La mondialisation crée des inégalités : certains territoires sont très intégrés (pays riches, littoraux) ; d\'autres restent en marge (pays enclavés, régions rurales pauvres).',
    tip: 'Pour le brevet, sachez expliquer pourquoi un port comme Shanghai ou Rotterdam est un symbole de la mondialisation. Pensez : échanges + réseaux + acteurs + inégalités.',
    lessonPage: 22, exercisesPage: 23, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'1-2-1',type:'qcm',question:'Qu\'est-ce qu\'une FTN (Firme Transnationale) ?',options:['Une organisation humanitaire','Une entreprise qui produit dans plusieurs pays','Un traité commercial','Une banque internationale'],answer:'Une entreprise qui produit dans plusieurs pays',explanation:'Une FTN (ou multinationale) est une entreprise qui possède des filiales dans plusieurs pays. Elle organise la production à l\'échelle mondiale pour optimiser les coûts.',hint:'Trans = à travers ; Nationale = pays. Une FTN opère à travers plusieurs pays.'},
      {id:'1-2-2',type:'vrai_faux',question:'La mondialisation profite de manière égale à tous les territoires du monde.',answer:'faux',explanation:'La mondialisation crée des inégalités : certains territoires sont très intégrés (littoraux, grandes métropoles), d\'autres restent marginalisés (pays enclavés, zones rurales pauvres).',hint:'Pense aux territoires « intégrés » vs « marginalisés ».'},
      {id:'1-2-3',type:'qcm',question:'Quel type de ville constitue le principal nœud de la mondialisation ?',options:['La ville industrielle','La métropole mondiale','La ville touristique','La ville portuaire'],answer:'La métropole mondiale',explanation:'Les métropoles mondiales (New York, Londres, Tokyo, Shanghai) concentrent les centres de décision économique, financière et culturelle de la mondialisation.',hint:'Ces villes concentrent les sièges des FTN, les bourses et les aéroports internationaux.'},
      {id:'1-2-4',type:'completer',question:'L\'intensification des échanges de marchandises, de capitaux et d\'informations à l\'échelle mondiale s\'appelle la ___.',answer:'mondialisation',explanation:'La mondialisation désigne ce processus d\'intégration croissante des économies et des sociétés à l\'échelle planétaire.',hint:'Ce mot vient de « monde » et désigne un phénomène planétaire.'}
    ]
  },

  {
    id: '1-3', semaineIndex: 1, jourIndex: 3, ordre: 8,
    label: 'Jeu 9 juil.', type: 'lecon', matiere: 'physique', difficulte: 2,
    lecon: 'Physique-Chimie — Les atomes et la classification périodique',
    detail: 'Un atome est la plus petite unité de matière. Il est composé d\'un noyau (protons chargés positivement + neutrons neutres) entouré d\'électrons chargés négativement. Le numéro atomique Z = nombre de protons. Le nombre de masse A = nombre de protons + neutrons. Des atomes de même Z mais de A différent sont des isotopes. La classification périodique (tableau de Mendeleïev) range les éléments par Z croissant. Les éléments d\'une même colonne (famille) ont des propriétés chimiques similaires. Les liaisons chimiques (ionique, covalente) permettent aux atomes de former des molécules et des solides.',
    tip: 'Retenez les 5 premiers éléments du tableau périodique : H (1), He (2), Li (3), Be (4), B (5). Pour un atome neutre : nombre d\'électrons = nombre de protons = Z.',
    lessonPage: 24, exercisesPage: 25, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'1-3-1',type:'qcm',question:'Que représente le numéro atomique Z d\'un élément ?',options:['Le nombre de neutrons','Le nombre de protons','Le nombre de masse','Le nombre d\'électrons de valence'],answer:'Le nombre de protons',explanation:'Z = nombre de protons dans le noyau. Il est unique à chaque élément et définit son identité chimique. Pour un atome neutre, Z = nombre d\'électrons.',hint:'Z est aussi appelé numéro atomique et se lit directement sur le tableau périodique.'},
      {id:'1-3-2',type:'vrai_faux',question:'Des isotopes sont des atomes du même élément ayant le même nombre de protons mais un nombre différent de neutrons.',answer:'vrai',explanation:'Les isotopes ont le même Z (même élément) mais un A différent (nombre de masse différent) car leur nombre de neutrons diffère. Ex : ¹²C et ¹⁴C sont deux isotopes du carbone.',hint:'Iso = même ; tope = endroit dans le tableau (même Z).'},
      {id:'1-3-3',type:'qcm',question:'Un atome de carbone (Z=6, A=12) contient combien de neutrons ?',options:['6','12','18','3'],answer:'6',explanation:'Nombre de neutrons = A - Z = 12 - 6 = 6. Le carbone 12 a 6 protons et 6 neutrons dans son noyau.',hint:'Neutrons = A - Z (nombre de masse - numéro atomique).'},
      {id:'1-3-4',type:'completer',question:'Pour un atome neutre, le nombre d\'électrons est égal au nombre de ___.',answer:'protons',explanation:'Un atome neutre a autant d\'électrons (charges négatives) que de protons (charges positives), ce qui équilibre les charges électriques.',hint:'Les protons sont positifs, les électrons sont négatifs. Pour un atome neutre, ils se compensent.'}
    ]
  },

  {
    id: '1-4', semaineIndex: 1, jourIndex: 4, ordre: 9,
    label: 'Ven 10 juil.', type: 'lecon', matiere: 'anglais', difficulte: 2,
    lecon: 'Anglais — Les modaux : can, must, should, would',
    detail: 'Les verbes modaux expriment une nuance sur l\'action principale. Can exprime la capacité ou la possibilité (I can swim / It can be dangerous). Must exprime l\'obligation ou la déduction logique (You must wear a seatbelt / She must be tired). Should exprime le conseil ou la recommandation (You should eat less sugar). Would exprime la politesse ou une action hypothétique (Would you help me? / I would travel if I had money). Règle de formation : modal + base verbale sans "to" (I can go, not I can to go). Au négatif : can\'t, mustn\'t, shouldn\'t, wouldn\'t.',
    tip: 'Astuce mémo : Can = pouvoir ; Must = devoir (obligation) ; Should = devrait (conseil) ; Would = conditionnel (politesse/hypothèse). Aucun modal ne prend de -s à la 3e personne.',
    lessonPage: 26, exercisesPage: 27, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'1-4-1',type:'qcm',question:'Choose the correct modal: "You ___ wear a seatbelt. It\'s the law."',options:['should','can','must','would'],answer:'must',explanation:'"Must" expresses obligation or necessity. It\'s the law = it\'s an absolute obligation. "Should" only gives advice, not obligation.',hint:'C\'est une obligation légale → quel modal exprime l\'obligation ?'},
      {id:'1-4-2',type:'vrai_faux',question:'Les verbes modaux prennent un -s à la 3ème personne du singulier (he/she/it).',answer:'faux',explanation:'Jamais de -s avec les modaux : "He can swim" (pas "He cans swim"). C\'est une règle absolue pour tous les modaux : can, must, should, would, may, might…',hint:'Les modaux sont invariables : pas de conjugaison, pas de -s.'},
      {id:'1-4-3',type:'qcm',question:'"You ___ eat more vegetables." = Give advice',options:['must','can\'t','should','would'],answer:'should',explanation:'"Should" exprime le conseil ou la recommandation. "You should eat more vegetables" = "Tu devrais manger plus de légumes" (c\'est un conseil, pas une obligation).',hint:'Should = devoir (au sens de conseil), pas d\'obligation.'},
      {id:'1-4-4',type:'completer',question:'Complète : "She ___ speak three languages fluently." (capacité)',answer:'can',explanation:'"Can" exprime la capacité ou l\'aptitude. "She can speak three languages" = elle est capable de parler trois langues.',hint:'Quel modal exprime la capacité ou la possibilité ?'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 3 — Approfondir le programme  (difficulté 2-3)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '2-0', semaineIndex: 2, jourIndex: 0, ordre: 10,
    label: 'Lun 13 juil.', type: 'lecon', matiere: 'français', difficulte: 2,
    lecon: 'Français — Lire et analyser un texte littéraire',
    detail: 'L\'analyse d\'un texte littéraire suit une méthode rigoureuse. D\'abord, identifier la nature du texte (narratif, descriptif, argumentatif, poétique) et le genre (roman, poésie, théâtre). Ensuite, repérer le point de vue narratif : externe (on décrit de l\'extérieur), interne (on voit à travers les yeux d\'un personnage), omniscient (le narrateur sait tout). Analyser le champ lexical dominant (mots appartenant au même thème), le temps des verbes (présent de narration, passé simple pour les événements, imparfait pour la description/le décor). Identifier les procédés stylistiques et les expliquer. Enfin, formuler un axe de lecture : qu\'est-ce que l\'auteur veut montrer ?',
    tip: 'Au brevet, commencez toujours par lire le texte deux fois. La première pour comprendre le sens global, la deuxième en prenant des notes sur les procédés. Ne jamais paraphraser : analyser.',
    lessonPage: 29, exercisesPage: 30, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'2-0-1',type:'qcm',question:'Quel point de vue narratif est utilisé quand le narrateur sait tout des personnages ?',options:['Point de vue interne','Point de vue externe','Point de vue omniscient','Point de vue subjectif'],answer:'Point de vue omniscient',explanation:'Le narrateur omniscient connaît les pensées, les sentiments et les actions de tous les personnages. C\'est le point de vue le plus courant dans les romans du XIXe siècle.',hint:'Omni = tout ; scient = savoir. Il sait TOUT.'},
      {id:'2-0-2',type:'vrai_faux',question:'Paraphraser un texte consiste à l\'analyser en profondeur.',answer:'faux',explanation:'Paraphraser = redire avec d\'autres mots sans analyser. Analyser = expliquer comment et pourquoi l\'auteur utilise tel procédé pour produire tel effet. Au brevet, il faut analyser, pas paraphraser.',hint:'Para = à côté. Paraphraser = tourner autour du sens sans l\'analyser.'},
      {id:'2-0-3',type:'qcm',question:'Dans quel genre littéraire le narrateur joue-t-il souvent un rôle de personnage (je) ?',options:['Le roman à la troisième personne','L\'autobiographie','Le roman policier','La fable'],answer:'L\'autobiographie',explanation:'L\'autobiographie est écrite à la première personne (« je »), le narrateur est aussi le personnage principal et l\'auteur. Exemples : Les Confessions (Rousseau), Les Mots (Sartre).',hint:'Auto = soi-même ; bio = vie ; graphie = écrire.'},
      {id:'2-0-4',type:'completer',question:'Le temps verbal utilisé pour les actions ponctuelles dans un récit au passé est le ___.',answer:'passé simple',explanation:'Dans un récit au passé, on utilise le passé simple pour les actions (événements qui font avancer l\'histoire) et l\'imparfait pour les descriptions, les états ou les actions répétées.',hint:'C\'est un temps peu utilisé à l\'oral mais très présent dans les textes littéraires.'}
    ]
  },

  {
    id: '2-1', semaineIndex: 2, jourIndex: 1, ordre: 11,
    label: 'Mar 14 juil.', type: 'lecon', matiere: 'maths', difficulte: 2,
    lecon: 'Maths — Les fonctions linéaires et affines',
    detail: 'Une fonction est une relation qui associe à chaque valeur de x une valeur unique f(x). Fonction linéaire : f(x) = ax. Sa courbe est une droite passant par l\'origine. Le coefficient a est la pente (taux d\'accroissement). Fonction affine : f(x) = ax + b. Sa courbe est une droite d\'ordonnée à l\'origine b. Pour tracer une droite : calculer deux points, les placer et tracer. Pour lire l\'image d\'un nombre : partir de l\'axe des x, remonter jusqu\'à la courbe, puis aller horizontalement jusqu\'à l\'axe des y. L\'antécédent est la valeur de x pour une image donnée : on fait le chemin inverse.',
    tip: 'Méthode infaillible pour tracer f(x) = 2x-3 : calculer f(0) = -3 (ordonnée à l\'origine) et f(1) = -1. Placer ces deux points et tracer la droite. Vérifier avec un troisième point.',
    lessonPage: 31, exercisesPage: 32, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'2-1-1',type:'qcm',question:'Quelle est l\'ordonnée à l\'origine de la fonction f(x) = 3x - 5 ?',options:['3','-5','5','0'],answer:'-5',explanation:'Pour f(x) = ax + b, b est l\'ordonnée à l\'origine (valeur de f quand x = 0). Ici f(0) = 3×0 - 5 = -5. La droite coupe l\'axe des ordonnées en (0 ; -5).',hint:'L\'ordonnée à l\'origine est la valeur de f(x) quand x = 0.'},
      {id:'2-1-2',type:'vrai_faux',question:'La courbe représentative d\'une fonction linéaire passe toujours par l\'origine.',answer:'vrai',explanation:'Une fonction linéaire est de la forme f(x) = ax (sans terme constant b). Pour x = 0 : f(0) = a×0 = 0. La droite passe donc toujours par le point (0;0).',hint:'Linéaire = forme f(x) = ax, sans terme indépendant.'},
      {id:'2-1-3',type:'qcm',question:'Quelle est l\'image de x = 2 par la fonction f(x) = -2x + 7 ?',options:['3','11','-3','9'],answer:'3',explanation:'f(2) = -2 × 2 + 7 = -4 + 7 = 3. L\'image de 2 par f est 3, c\'est-à-dire le point (2 ; 3) est sur la droite.',hint:'Remplace x par 2 dans l\'expression de f(x) et calcule.'},
      {id:'2-1-4',type:'completer',question:'Si f(x) = 2x + 1, quel est l\'antécédent de 7 ? (f(x) = 7, x = ___)',answer:'3',explanation:'2x + 1 = 7 → 2x = 6 → x = 3. L\'antécédent de 7 est 3 : f(3) = 2×3+1 = 7 ✓',hint:'Pose f(x) = 7 et résous l\'équation.',similarExercise:{'question':'Si f(x) = 3x - 6, quel est l\'antécédent de 9 ?','options':['3','5','1','-1'],'answer':'5'},method:'Méthode antécédent : 1) Pose f(x) = valeur cherchée. 2) Résous l\'équation (isole x). 3) Vérifie en recalculant f(x).'}
    ]
  },

  {
    id: '2-2', semaineIndex: 2, jourIndex: 2, ordre: 12,
    label: 'Mer 15 juil.', type: 'lecon', matiere: 'histoire', difficulte: 2,
    lecon: 'Histoire — La Seconde Guerre mondiale et la Shoah',
    detail: 'La Seconde Guerre mondiale (1939-1945) débute avec l\'invasion de la Pologne par l\'Allemagne nazie le 1er septembre 1939. Le régime nazi, dirigé par Hitler, développe une idéologie raciste et antisémite. La Shoah est le génocide des Juifs d\'Europe : environ 6 millions de Juifs sont assassinés par les nazis et leurs complices, notamment dans les camps d\'extermination (Auschwitz, Treblinka). En France, le régime de Vichy collabore avec l\'occupant allemand. La Résistance française combat clandestinement. Le débarquement allié en Normandie (6 juin 1944) marque le tournant. La guerre se termine le 8 mai 1945 en Europe et le 2 septembre 1945 en Asie.',
    tip: 'Le brevet demande souvent d\'expliquer la spécificité de la Shoah comme génocide : extermination planifiée, industrielle, idéologique. Retenez : Wannsee (1942) = réunion qui planifie la « Solution finale ».',
    lessonPage: 33, exercisesPage: 34, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'2-2-1',type:'qcm',question:'En quelle année Hitler arrive-t-il au pouvoir en Allemagne ?',options:['1929','1933','1935','1939'],answer:'1933',explanation:'Adolf Hitler est nommé chancelier d\'Allemagne le 30 janvier 1933. Il instaure rapidement une dictature nazie (Troisième Reich) basée sur l\'antisémitisme et le totalitarisme.',hint:'C\'est quelques années avant le début de la guerre.'},
      {id:'2-2-2',type:'vrai_faux',question:'La conférence de Wannsee (1942) planifie la « Solution finale » d\'extermination des Juifs d\'Europe.',answer:'vrai',explanation:'Le 20 janvier 1942, à Wannsee (Berlin), des responsables nazis organisent la logistique de la « Solution finale » : déportation et extermination systématique des Juifs d\'Europe dans les camps d\'extermination.',hint:'Wannsee = réunion de coordination pour l\'extermination industrielle.',brevetTip:'Le brevet demande souvent d\'expliquer la SPÉCIFICITÉ de la Shoah : planifiée (Wannsee 1942), industrielle (chambres à gaz), idéologique (antisémitisme nazi). Ces 3 mots-clés sont essentiels.'},
      {id:'2-2-3',type:'qcm',question:'Quelle est la date du débarquement allié en Normandie ?',options:['8 mai 1945','6 juin 1944','1er septembre 1939','11 novembre 1942'],answer:'6 juin 1944',explanation:'Le 6 juin 1944 (Jour J / D-Day), les Alliés débarquent sur les plages de Normandie. C\'est le tournant de la guerre en Europe occidentale.',hint:'Cette date est commémorée chaque année en Normandie.'},
      {id:'2-2-4',type:'completer',question:'Le régime de ___ gouverne la France sous l\'Occupation nazie et collabore avec l\'Allemagne.',answer:'Vichy',explanation:'Le régime de Vichy (1940-1944), dirigé par le maréchal Pétain, collabore avec l\'occupant nazi. Il participe notamment aux déportations de Juifs de France.',hint:'C\'est une ville du centre de la France où s\'installe ce gouvernement.',method:'Pour situer Vichy dans votre réponse : régime autoritaire (pas de démocratie), collaborationniste (aide l\'occupant), antisémite (lois de 1940), dirigé par Pétain. Ces 4 caractéristiques sont attendues.'},
      {id:'2-2-5',type:'qcm',question:'Environ combien de Juifs ont été assassinés pendant la Shoah ?',options:['600 000','2 millions','6 millions','10 millions'],answer:'6 millions',explanation:'La Shoah est le génocide de 6 millions de Juifs d\'Europe par les nazis et leurs complices entre 1941 et 1945. C\'est le plus grand génocide de l\'histoire.',hint:'Ce chiffre correspond à environ 2/3 des Juifs d\'Europe.'}
    ]
  },

  {
    id: '2-3', semaineIndex: 2, jourIndex: 3, ordre: 13,
    label: 'Jeu 16 juil.', type: 'lecon', matiere: 'svt', difficulte: 2,
    lecon: 'SVT — L\'immunologie et les défenses de l\'organisme',
    detail: 'L\'organisme dispose de deux lignes de défense. L\'immunité innée (non spécifique) est immédiate : la peau et les muqueuses forment une barrière ; en cas d\'intrusion, les phagocytes (macrophages, neutrophiles) détruisent les agents pathogènes par phagocytose. L\'immunité acquise (spécifique) se met en place en quelques jours : les lymphocytes B produisent des anticorps qui reconnaissent et neutralisent l\'antigène ; les lymphocytes T cytotoxiques détruisent les cellules infectées. La mémoire immunitaire conserve l\'information : en cas de second contact, la réponse est plus rapide et plus forte. La vaccination exploite cette mémoire : on introduit un antigène inoffensif pour préparer l\'organisme.',
    tip: 'Schéma de la réponse immunitaire : Antigène → Phagocytose → Présentation aux lymphocytes → Lymphocytes B (anticorps) + Lymphocytes T → Élimination. La mémoire garantit une protection durable.',
    lessonPage: 35, exercisesPage: 36, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'2-3-1',type:'qcm',question:'Quel processus permet aux macrophages d\'éliminer les agents pathogènes ?',options:['La vaccination','La phagocytose','La mitose','La fécondation'],answer:'La phagocytose',explanation:'La phagocytose est le processus par lequel les phagocytes (macrophages, neutrophiles) « avalent » et détruisent les agents pathogènes. C\'est la première réponse immunitaire (innée).',hint:'Phago = manger ; cyte = cellule. Les phagocytes « mangent » les envahisseurs.'},
      {id:'2-3-2',type:'vrai_faux',question:'La vaccination exploite la mémoire immunitaire pour protéger contre une maladie.',answer:'vrai',explanation:'Un vaccin introduit un antigène inoffensif. L\'organisme produit des lymphocytes mémoire. En cas de vrai contact avec le pathogène, la réponse est immédiate et forte.',hint:'La mémoire immunitaire est le principe fondamental de la vaccination.'},
      {id:'2-3-3',type:'qcm',question:'Quel type de cellule produit les anticorps ?',options:['Les macrophages','Les lymphocytes T cytotoxiques','Les lymphocytes B','Les globules rouges'],answer:'Les lymphocytes B',explanation:'Les lymphocytes B (de la moelle osseuse, Bone marrow) se différencient en plasmocytes qui sécrètent des anticorps spécifiques d\'un antigène.',hint:'B pour « moelle osseuse » (Bone marrow en anglais). Ce sont eux qui fabriquent les anticorps.'},
      {id:'2-3-4',type:'completer',question:'L\'immunité ___ est immédiate et non spécifique ; elle constitue la première ligne de défense.',answer:'innée',explanation:'L\'immunité innée (ou non spécifique) est présente dès la naissance. Elle réagit rapidement à toute agression par la phagocytose et l\'inflammation, sans distinction entre les agents pathogènes.',hint:'Ce mot s\'oppose à « acquise ». Il signifie « présente dès la naissance ».'}
    ]
  },

  {
    id: '2-4', semaineIndex: 2, jourIndex: 4, ordre: 14,
    label: 'Ven 17 juil.', type: 'lecon', matiere: 'technologie', difficulte: 2,
    lecon: 'Technologie — Les systèmes embarqués et la programmation',
    detail: 'Un système embarqué est un système informatique intégré à un objet pour lui conférer des fonctions automatiques (voiture, téléphone, montre connectée). Il comprend des capteurs (entrées), un microcontrôleur (traitement) et des actionneurs (sorties). La programmation par blocs (Scratch) ou en texte (Python) permet de définir le comportement du système. En Python : les variables stockent des données, les conditions (if/elif/else) gèrent les choix, les boucles (for, while) répètent des actions, les fonctions organisent le code. L\'intelligence artificielle est de plus en plus intégrée dans les objets du quotidien : reconnaissance faciale, assistants vocaux, recommandations.',
    tip: 'Pour le brevet de technologie : savoir lire un algorithme en blocs, comprendre ses entrées/sorties, et expliquer comment un système répond à un besoin. La logique compte plus que la syntaxe.',
    lessonPage: 37, exercisesPage: 38, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'2-4-1',type:'qcm',question:'Qu\'est-ce qu\'un capteur dans un système embarqué ?',options:['Une sortie (actionneur)','Une entrée qui mesure le monde physique','Le microcontrôleur (cerveau)','Un programme informatique'],answer:'Une entrée qui mesure le monde physique',explanation:'Un capteur est un composant d\'entrée qui mesure une grandeur physique (température, lumière, mouvement) et la convertit en signal électrique pour le microcontrôleur.',hint:'Le capteur « sent » le monde extérieur. Pense à un thermomètre électronique.'},
      {id:'2-4-2',type:'vrai_faux',question:'En Python, une boucle « for » permet de répéter une action un nombre fixe de fois.',answer:'vrai',explanation:'La boucle for in (itération sur une séquence) permet de répéter une action pour chaque élément d\'une liste ou un nombre défini de fois avec range(). Ex : for i in range(5): print(i).',hint:'For = pour chaque élément… Les instructions s\'exécutent autant de fois qu\'il y a d\'éléments.'},
      {id:'2-4-3',type:'qcm',question:'Dans l\'architecture d\'un système embarqué, qu\'est-ce qu\'un actionneur ?',options:['Un capteur de température','Le microprocesseur central','Un composant de sortie (lampe, moteur…)','Un protocole de communication'],answer:'Un composant de sortie (lampe, moteur…)',explanation:'L\'actionneur produit une action physique en réponse à l\'ordre du microcontrôleur (allumer une LED, faire tourner un moteur, ouvrir une porte).',hint:'Un actionneur agit sur le monde physique. C\'est la sortie du système.'},
      {id:'2-4-4',type:'completer',question:'La séquence : entrée (capteur) → traitement (___ ) → sortie (actionneur) décrit le fonctionnement d\'un système embarqué.',answer:'microcontrôleur',explanation:'Le microcontrôleur (ou microprocesseur) est le « cerveau » du système : il reçoit les données des capteurs, exécute le programme et envoie des ordres aux actionneurs.',hint:'C\'est le composant central qui traite l\'information (puce électronique).'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 4 — Méthodes du Brevet  (difficulté 3)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '3-0', semaineIndex: 3, jourIndex: 0, ordre: 15,
    label: 'Lun 20 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — La rédaction type brevet : le texte argumentatif',
    detail: 'La rédaction argumentée au brevet (16 points) demande de défendre un point de vue de manière structurée. La structure attendue : Introduction (présenter le sujet, annoncer la thèse et le plan), Développement en 2-3 parties avec transitions claires, Conclusion (bilan + ouverture). Chaque argument doit être illustré par un exemple précis (vécu, lecture, actualité). Connecteurs logiques indispensables : pour ajouter (de plus, en outre, par ailleurs), pour opposer (cependant, néanmoins, or), pour conclure (ainsi, en définitive, par conséquent). Critères de notation : clarté de la thèse, pertinence des arguments, qualité de l\'expression, respect de la ponctuation et de l\'orthographe.',
    tip: 'Avant d\'écrire, faites un plan au brouillon : Thèse → 2 ou 3 arguments → 1 exemple par argument → Conclusion. 10 minutes de brouillon = 30 minutes d\'écriture gagnées.',
    lessonPage: 40, exercisesPage: 41, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'3-0-1',type:'qcm',question:'Quelle est la structure correcte d\'une introduction dans une rédaction argumentative ?',options:['Thèse + exemples + conclusion','Présentation du sujet + thèse + annonce du plan','Exemples + arguments + thèse','Conclusion + développement + introduction'],answer:'Présentation du sujet + thèse + annonce du plan',explanation:'L\'introduction comporte : 1) Une accroche/présentation du sujet (amener le lecteur), 2) La thèse (votre position), 3) L\'annonce du plan (les grandes parties de votre développement).',hint:'L\'introduction va du général au particulier. Elle annonce ce que vous allez démontrer.'},
      {id:'3-0-2',type:'vrai_faux',question:'On peut commencer une introduction par « Je vais vous parler de… »',answer:'faux',explanation:'Cette formulation est trop familière et trop scolaire. Il faut une vraie accroche : citation, fait d\'actualité, question rhétorique, constat général. « Je vais vous parler de… » est à proscrire au brevet.',hint:'L\'introduction doit accrocher le lecteur, pas annoncer platement le sujet.'},
      {id:'3-0-3',type:'qcm',question:'Quel connecteur logique est le plus adapté pour introduire une CONCLUSION ?',options:['De plus','Cependant','En définitive','Par exemple'],answer:'En définitive',explanation:'« En définitive », « Ainsi », « En conclusion », « Pour conclure » sont des connecteurs de conclusion. « De plus » = addition ; « Cependant » = opposition ; « Par exemple » = illustration.',hint:'La conclusion clôt le développement. Quel connecteur signale cette étape ?',brevetTip:'La conclusion doit être courte (4-6 lignes max). Un développement qui déborde dans la conclusion perd des points de structure.',method:'Structure de la conclusion : 1) Bilan (résumé des 2-3 arguments en une phrase). 2) Réponse synthétique à la question de départ. 3) Ouverture (question, perspective, prolongement du débat).'},
      {id:'3-0-4',type:'completer',question:'Au brevet, la rédaction est notée sur ___ points.',answer:'20',explanation:'Au DNB, la rédaction (2e partie de l\'épreuve de français) est notée sur 20 points. Elle représente le tiers de la note de français (60 points au total).',hint:'C\'est un nombre pair entre 10 et 30.'}
    ]
  },

  {
    id: '3-1', semaineIndex: 3, jourIndex: 1, ordre: 16,
    label: 'Mar 21 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Géométrie dans l\'espace : volumes et aires',
    detail: 'Les solides usuels et leurs formules. Cube de côté a : V = a³, Alatérale = 4a². Pavé droit (l,L,h) : V = l×L×h. Cylindre (r,h) : V = πr²h, Alatérale = 2πrh. Cône (r,h) : V = πr²h/3. Sphère (r) : V = 4πr³/3, A = 4πr². Pyramide (base B, hauteur h) : V = B×h/3. Pour calculer l\'aire totale d\'un solide : développer la figure en un patron et calculer chaque face. La diagonale d\'un cube de côté a = a√3 (utilisation de Pythagore en 3D). Les sections planes (coupes) permettent d\'obtenir des polygones à partir de solides.',
    tip: 'Au brevet, les formules de volume sont souvent données. Exercez-vous surtout à trouver les dimensions manquantes (h, r) à partir d\'un volume donné, ce qui demande de résoudre une équation.',
    lessonPage: 42, exercisesPage: 43, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'3-1-1',type:'qcm',question:'Quel est le volume d\'un cylindre de rayon r = 3 cm et de hauteur h = 5 cm ? (π ≈ 3,14)',options:['141,3 cm³','47,1 cm³','94,2 cm³','28,26 cm³'],answer:'141,3 cm³',explanation:'V = π × r² × h = 3,14 × 3² × 5 = 3,14 × 9 × 5 = 3,14 × 45 = 141,3 cm³.',hint:'Formule du cylindre : V = π r² h. N\'oublie pas de mettre r² au carré.',similarExercise:{'question':'Cylindre r = 2 cm, h = 10 cm. Volume (π≈3,14) :','options':['62,8 cm³','125,6 cm³','40 cm³','12,56 cm³'],'answer':'125,6 cm³'},method:'Méthode volume cylindre : 1) Identifie r (rayon = diamètre ÷ 2) et h (hauteur). 2) Calcule r². 3) Multiplie par π puis par h. 4) Vérifie l\'unité (cm³ ou m³).'},
      {id:'3-1-2',type:'vrai_faux',question:'Le volume d\'une pyramide est égal à (base × hauteur) ÷ 3.',answer:'vrai',explanation:'V = (B × h) ÷ 3 où B est l\'aire de la base et h la hauteur. Le facteur 1/3 différencie le volume de la pyramide de celui du prisme (même base et hauteur, mais 3 fois moins de volume).',hint:'Un prisme a le même volume sans diviser par 3 ; une pyramide c\'est 3 fois moins.'},
      {id:'3-1-3',type:'qcm',question:'Un cube a un côté de 4 cm. Quel est son volume ?',options:['16 cm³','24 cm³','64 cm³','48 cm³'],answer:'64 cm³',explanation:'V = a³ = 4³ = 4 × 4 × 4 = 64 cm³. Pour l\'aire totale : Atotale = 6 × a² = 6 × 16 = 96 cm².',hint:'Volume du cube = côté au cube (c\'est d\'ailleurs l\'origine du mot « cube » en mathématiques).'},
      {id:'3-1-4',type:'completer',question:'La formule du volume d\'une sphère de rayon r est V = (4/3) × π × r ___',answer:'³',explanation:'V = (4/3)πr³. Exemple : une sphère de rayon 6 cm a un volume de (4/3) × 3,14 × 216 ≈ 904 cm³.',hint:'Dans la formule du volume de la sphère, le rayon est élevé à quelle puissance ?'}
    ]
  },

  {
    id: '3-2', semaineIndex: 3, jourIndex: 2, ordre: 17,
    label: 'Mer 22 juil.', type: 'lecon', matiere: 'géographie', difficulte: 3,
    lecon: 'Géographie — Inégalités de développement dans le monde',
    detail: 'Le monde est divisé en pays développés (IDH élevé, forts revenus, bonne espérance de vie) et pays en développement. L\'IDH (Indice de Développement Humain) mesure le niveau de vie, l\'éducation et l\'espérance de vie (de 0 à 1). Les pays du « Sud » font face à des difficultés : pauvreté, accès limité à l\'eau et à la santé, instabilité politique. Les pays émergents (BRICS : Brésil, Russie, Inde, Chine, Afrique du Sud) connaissent une croissance rapide mais des inégalités internes fortes. L\'aide au développement, les ONG et les Objectifs de Développement Durable (ODD de l\'ONU) tentent de réduire ces inégalités. La dette extérieure freine le développement de nombreux pays.',
    tip: 'Pour le brevet HG, sachez situer des pays sur une carte et les classer selon leur niveau de développement. Retenez : IDH fort = pays développé ; IDH faible ≠ forcément pauvre en ressources naturelles.',
    lessonPage: 44, exercisesPage: 45, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'3-2-1',type:'qcm',question:'Que mesure l\'IDH (Indice de Développement Humain) ?',options:['Uniquement le PIB par habitant','Le niveau de vie, l\'éducation et l\'espérance de vie','La puissance militaire d\'un pays','Le volume des exportations'],answer:'Le niveau de vie, l\'éducation et l\'espérance de vie',explanation:'L\'IDH combine trois dimensions : le revenu (PIB/habitant), l\'éducation (alphabétisation, durée de scolarisation) et la santé (espérance de vie à la naissance). Il varie entre 0 et 1.',hint:'L\'IDH est plus complet que le seul PIB car il intègre aussi la santé et l\'éducation.'},
      {id:'3-2-2',type:'vrai_faux',question:'Un pays riche en ressources naturelles est nécessairement un pays développé.',answer:'faux',explanation:'De nombreux pays riches en pétrole ou en minerais ont un IDH faible (ex : Nigeria, RDC). Inversement, des pays sans ressources sont très développés (ex : Japon). Le développement dépend surtout des institutions et de l\'investissement dans le capital humain.',hint:'Pense à des pays producteurs de pétrole en Afrique sub-saharienne.'},
      {id:'3-2-3',type:'qcm',question:'Que signifie l\'acronyme BRICS ?',options:['Brésil, Russie, Inde, Chine, Afrique du Sud','Belgique, Roumanie, Irlande, Chypre, Suède','Brésil, Roumanie, Iran, Corée, Sénégal','Bolivie, Russie, Italie, Croatie, Suisse'],answer:'Brésil, Russie, Inde, Chine, Afrique du Sud',explanation:'Les BRICS sont cinq pays émergents à forte croissance économique. Ils représentent environ 40% de la population mondiale et cherchent à contester la domination des pays occidentaux.',hint:'Ce sont cinq grandes économies émergentes dont les initiales forment le sigle.'},
      {id:'3-2-4',type:'completer',question:'Les ODD (Objectifs de Développement ___) de l\'ONU visent à réduire les inégalités mondiales d\'ici 2030.',answer:'Durable',explanation:'Les 17 Objectifs de Développement Durable (ODD) ont été adoptés par l\'ONU en 2015. Ils couvrent la pauvreté, la faim, la santé, l\'éducation, l\'égalité et l\'environnement.',hint:'Ces objectifs sont liés au développement qui ne compromet pas les générations futures.'}
    ]
  },

  {
    id: '3-3', semaineIndex: 3, jourIndex: 3, ordre: 18,
    label: 'Jeu 23 juil.', type: 'lecon', matiere: 'emc', difficulte: 3,
    lecon: 'EMC — La citoyenneté et les institutions françaises',
    detail: 'La citoyenneté française confère des droits (vote, liberté d\'expression, protection sociale) et des devoirs (respecter les lois, payer les impôts, défense nationale). Les institutions de la Ve République : le Président de la République (élu pour 5 ans au suffrage universel direct, chef de l\'exécutif), le Premier ministre (chef du gouvernement, nommé par le Président), le Parlement (Assemblée nationale + Sénat) qui vote les lois, le Conseil constitutionnel qui vérifie la conformité des lois à la Constitution. La séparation des pouvoirs (exécutif, législatif, judiciaire) garantit l\'État de droit. La laïcité est un principe fondamental : la République ne reconnaît aucune religion officielle.',
    tip: 'Au brevet EMC, on vous demande souvent d\'expliquer un principe (laïcité, séparation des pouvoirs) et de l\'illustrer par un exemple. Mémorisez les articles clés de la Déclaration des droits de l\'homme de 1789.',
    lessonPage: 46, exercisesPage: 47, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'3-3-1',type:'qcm',question:'Qui est à la tête du gouvernement français (chef du gouvernement) ?',options:['Le Président de la République','Le Premier ministre','Le Président du Sénat','Le Président de l\'Assemblée nationale'],answer:'Le Premier ministre',explanation:'Sous la Ve République, le Premier ministre est le chef du gouvernement : il dirige l\'action du gouvernement et coordonne les ministères. Le Président de la République est le chef de l\'exécutif.',hint:'Attention à la distinction : le Président est chef de l\'État, le Premier ministre est chef du gouvernement.'},
      {id:'3-3-2',type:'vrai_faux',question:'La laïcité signifie que l\'État français reconnaît une religion officielle.',answer:'faux',explanation:'La laïcité (loi de 1905) implique la séparation de l\'Église et de l\'État. L\'État n\'a pas de religion officielle et garantit la liberté de conscience à tous les citoyens.',hint:'La laïcité garantit la neutralité de l\'État face aux religions.'},
      {id:'3-3-3',type:'qcm',question:'Quel organisme vérifie que les lois françaises respectent la Constitution ?',options:['L\'Assemblée nationale','Le Sénat','Le Conseil constitutionnel','La Cour de cassation'],answer:'Le Conseil constitutionnel',explanation:'Le Conseil constitutionnel contrôle la conformité des lois à la Constitution française. Il peut annuler une loi anticonstitutionnelle. Il est composé de 9 membres nommés pour 9 ans.',hint:'Cet organe veille à ce que les lois respectent la loi fondamentale du pays.'},
      {id:'3-3-4',type:'completer',question:'Sous la Ve République, le Président de la République est élu pour ___ ans au suffrage universel direct.',answer:'5',explanation:'Depuis 2002 (quinquennat), le Président est élu pour 5 ans (et non 7 ans comme avant avec le septennat). Il est élu au suffrage universel direct (vote de tous les citoyens).',hint:'Ce mandat est appelé le quinquennat (quinque = cinq en latin).'}
    ]
  },

  {
    id: '3-4', semaineIndex: 3, jourIndex: 4, ordre: 19,
    label: 'Ven 24 juil.', type: 'lecon', matiere: 'anglais', difficulte: 3,
    lecon: 'Anglais — Compréhension écrite et vocabulaire thématique',
    detail: 'La compréhension écrite en anglais demande une méthode. Avant de lire : regarder le titre, la source, les dates pour contextualiser. Pendant la lecture : identifier le thème général dès la première phrase de chaque paragraphe. Repérer les mots-clés (noms propres, chiffres, mots en majuscules). Ne pas bloquer sur un mot inconnu : chercher le sens par le contexte. Pour les questions : reformulez avec vos propres mots, citez le texte avec des guillemets. Vocabulaire thématique brevet : Environment (pollution, climate change, renewable energy), Technology (social media, AI, cybersecurity), Society (inequality, diversity, rights).',
    tip: 'Ne traduisez jamais mot à mot : le sens global compte. Pour les questions en anglais, répondez en anglais avec des phrases complètes. Utilisez des synonymes plutôt que de recopier le texte.',
    lessonPage: 48, exercisesPage: 49, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'3-4-1',type:'qcm',question:'What is the best strategy when you find an unknown word in a text ?',options:['Stop reading immediately','Translate every word in the dictionary','Try to understand its meaning from context','Skip the whole paragraph'],answer:'Try to understand its meaning from context',explanation:'Comprendre par le contexte (mots autour, sens général de la phrase) est la meilleure stratégie. Chercher dans le dictionnaire chaque mot inconnu perd trop de temps.',hint:'Le contexte (les mots autour) donne souvent le sens d\'un mot inconnu.'},
      {id:'3-4-2',type:'vrai_faux',question:'When answering comprehension questions in English, you should copy sentences from the text word for word.',answer:'faux',explanation:'Il faut reformuler avec vos propres mots. Recopier montre que vous n\'avez pas compris. On peut citer une courte partie (entre guillemets) mais toujours avec une reformulation ou explication.',hint:'Le correcteur veut voir que VOUS avez compris, pas que vous savez copier.'},
      {id:'3-4-3',type:'qcm',question:'What does "renewable energy" mean ?',options:['Energy that can run out','Energy from natural sources that replenish naturally','Energy produced by nuclear power','Fossil fuels'],answer:'Energy from natural sources that replenish naturally',explanation:'"Renewable" = which renews itself. Renewable energies (solar, wind, hydro) come from sources that naturally replenish, unlike fossil fuels (coal, oil, gas) which are finite.',hint:'"Renewable" comes from "renew" = se renouveler.'},
      {id:'3-4-4',type:'completer',question:'In English, the expression "social ___" refers to platforms like Instagram or Twitter.',answer:'media',explanation:'"Social media" = les réseaux sociaux. This is an essential vocabulary item for the brevet (technology and society topics).',hint:'These are platforms used to share content and communicate online.'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 5 — Entraînement intensif  (difficulté 3-4)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '4-0', semaineIndex: 4, jourIndex: 0, ordre: 20,
    label: 'Lun 27 juil.', type: 'lecon', matiere: 'français', difficulte: 3,
    lecon: 'Français — Grammaire de phrase : propositions et subordination',
    detail: 'Une phrase complexe contient plusieurs propositions. La proposition principale est autonome ; la proposition subordonnée dépend de la principale. Types de subordonnées : subordonnée relative (introduite par un pronom relatif : qui, que, dont, où) ; subordonnée conjonctive complétive (introduite par « que », COD du verbe principal : « Je pense qu\'il a raison ») ; subordonnées circonstancielles (temps, cause, conséquence, but, condition, opposition). Chaque subordonnée circonstancielle a sa conjonction : quand/lorsque (temps), parce que/car (cause), pour que (but), si (condition), bien que + subjonctif (opposition). Le mode subjonctif s\'utilise après certains verbes ou conjonctions exprimant le doute, le souhait ou la concession.',
    tip: 'Pour identifier le type de subordonnée : 1) Cherche le mot subordonnant (qui, que, parce que, etc.) 2) Pose-toi la question que répond la subordonnée (quand ? pourquoi ? afin de ?). La réponse donne le type.',
    lessonPage: 51, exercisesPage: 52, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'4-0-1',type:'qcm',question:'Dans « Je pense qu\'il a raison », quelle est la nature de la proposition « qu\'il a raison » ?',options:['Subordonnée relative','Subordonnée circonstancielle de cause','Subordonnée conjonctive complétive','Proposition indépendante'],answer:'Subordonnée conjonctive complétive',explanation:'Introduite par « que », cette proposition est COD du verbe « penser » → c\'est une subordonnée conjonctive complétive. Elle peut être remplacée par un GN (Je pense cela).',hint:'Elle est COD du verbe principal. Peut-elle être remplacée par « cela » ? Si oui → complétive.'},
      {id:'4-0-2',type:'vrai_faux',question:'« Bien que » introduit une subordonnée circonstancielle d\'opposition et est suivi du subjonctif.',answer:'vrai',explanation:'« Bien que », « quoique », « encore que » introduisent des subordonnées d\'opposition (ou concession) et exigent toujours le subjonctif. Ex : « Bien qu\'il soit fatigué, il continue. »',hint:'Les conjonctions d\'opposition comme « bien que » imposent le subjonctif.'},
      {id:'4-0-3',type:'qcm',question:'Quelle conjonction introduit une subordonnée circonstancielle de CAUSE ?',options:['Pour que','Lorsque','Parce que','Afin que'],answer:'Parce que',explanation:'« Parce que » introduit la cause. « Pour que » et « afin que » introduisent le but. « Lorsque » introduit le temps. Chaque type de subordonnée circonstancielle a ses conjonctions spécifiques.',hint:'La cause répond à la question « pourquoi ? ».'},
      {id:'4-0-4',type:'completer',question:'Dans « Le livre dont il parle est passionnant », « dont » est un pronom relatif dont l\'antécédent est ___.',answer:'livre',explanation:'« Dont » reprend « le livre » : c\'est son antécédent. « Dont » équivaut à « de qui » ou « duquel » et est utilisé quand le verbe de la relative se construit avec « de ».',hint:'L\'antécédent est le nom que le pronom relatif reprend. Cherche le nom placé avant « dont ».'}
    ]
  },

  {
    id: '4-1', semaineIndex: 4, jourIndex: 1, ordre: 21,
    label: 'Mar 28 juil.', type: 'lecon', matiere: 'maths', difficulte: 3,
    lecon: 'Maths — Statistiques et probabilités',
    detail: 'En statistiques, la moyenne est la somme des valeurs divisée par leur nombre. La médiane partage la série en deux parties égales (50% des valeurs en dessous, 50% au-dessus). La moyenne et la médiane ne coïncident pas quand la série est asymétrique. L\'étendue est la différence entre la valeur max et min. Les probabilités : si une expérience a n issues équiprobables, la probabilité d\'un événement A ayant k issues favorables est P(A) = k/n. Propriétés : 0 ≤ P(A) ≤ 1 ; P(événement certain) = 1 ; P(contraire de A) = 1 - P(A). Pour des événements indépendants : P(A et B) = P(A) × P(B).',
    tip: 'Pour la médiane avec un nombre pair de valeurs : elle est la moyenne des deux valeurs centrales. Vérifiez toujours que votre liste est bien ordonnée avant de chercher la médiane.',
    lessonPage: 53, exercisesPage: 54, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'4-1-1',type:'qcm',question:'Dans la série 4, 7, 3, 9, 2, 7, 8, quelle est la médiane ?',options:['7','5,7','7,5','4'],answer:'7',explanation:'On ordonne : 2, 3, 4, 7, 7, 8, 9. La médiane est la valeur centrale (4e valeur sur 7) = 7. La moyenne serait (2+3+4+7+7+8+9)/7 = 40/7 ≈ 5,7.',hint:'Ordonne la série et trouve la valeur du milieu. 7 valeurs → la 4e est la médiane.',similarExercise:{'question':'Médiane de 2, 5, 7, 10, 12, 15 :','options':['7','8,5','8','10'],'answer':'8,5'},method:'Méthode médiane : 1) Ordonne la série. 2) Si n impair → prends la valeur centrale. 3) Si n pair → moyenne des 2 valeurs centrales. La médiane N\'EST PAS la moyenne.'},
      {id:'4-1-2',type:'vrai_faux',question:'La probabilité d\'un événement impossible est 1.',answer:'faux',explanation:'La probabilité d\'un événement impossible est 0 (pas 1). La probabilité d\'un événement certain est 1. Une probabilité est toujours comprise entre 0 et 1.',hint:'Impossible = aucune chance. Certain = certitude absolue. Ces deux extrêmes valent 0 et 1.'},
      {id:'4-1-3',type:'qcm',question:'On lance un dé à 6 faces. Quelle est la probabilité d\'obtenir un nombre pair ?',options:['1/6','1/3','1/2','2/3'],answer:'1/2',explanation:'Nombres pairs sur un dé : 2, 4, 6 → 3 issues favorables sur 6 issues équiprobables. P(pair) = 3/6 = 1/2.',hint:'Compte les nombres pairs sur un dé à 6 faces, puis divise par 6.'},
      {id:'4-1-4',type:'completer',question:'La probabilité du contraire (complément) de A est P(Ā) = 1 - ___',answer:'P(A)',explanation:'P(Ā) = 1 - P(A). Si P(A) = 0,3 alors P(Ā) = 0,7. La somme des probabilités d\'un événement et de son contraire est toujours égale à 1.',hint:'La probabilité de « ne pas A » complète P(A) pour donner 1 au total.'}
    ]
  },

  {
    id: '4-2', semaineIndex: 4, jourIndex: 2, ordre: 22,
    label: 'Mer 29 juil.', type: 'lecon', matiere: 'histoire', difficulte: 3,
    lecon: 'Histoire — La décolonisation et la Guerre froide',
    detail: 'Après 1945, les peuples colonisés réclament leur indépendance : c\'est la décolonisation. Elle prend deux formes : pacifique (Inde, 1947, sous Gandhi) ou violente (Algérie 1954-1962, Vietnam). La Guerre froide (1947-1991) oppose les États-Unis (bloc capitaliste) et l\'URSS (bloc communiste) sans affrontement direct, par crises interposées : blocus de Berlin (1948), guerre de Corée (1950-1953), crise des missiles de Cuba (1962). Le monde est bipolaire : les pays s\'alignent sur l\'un ou l\'autre bloc, sauf les non-alignés (conférence de Bandung 1955). La chute du mur de Berlin (9 novembre 1989) symbolise la fin de la Guerre froide. L\'URSS se dissout en 1991.',
    tip: 'Mémorisez ces repères : 1947 = doctrine Truman + plan Marshall (début Guerre froide) ; 1962 = crise de Cuba (point culminant) ; 1989 = chute du mur de Berlin. Ces dates reviennent très souvent au brevet.',
    lessonPage: 55, exercisesPage: 56, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'4-2-1',type:'qcm',question:'Que signifie la doctrine Truman (1947) ?',options:['Les États-Unis aident militairement leurs alliés contre le communisme','Les États-Unis s\'engagent à ne pas intervenir dans les affaires européennes','L\'URSS propose une coopération économique à l\'Europe','Les deux blocs acceptent de ne pas s\'affronter directement'],answer:'Les États-Unis aident militairement leurs alliés contre le communisme',explanation:'La doctrine Truman (mars 1947) engage les États-Unis à soutenir les pays menacés par le communisme. Elle marque le début de la Guerre froide et rompt avec l\'isolationnisme américain.',hint:'Cette doctrine marque le début de la Guerre froide. Les USA s\'opposent à l\'expansion soviétique.'},
      {id:'4-2-2',type:'vrai_faux',question:'La chute du mur de Berlin a eu lieu le 9 novembre 1989.',answer:'vrai',explanation:'Le 9 novembre 1989, le régime est-allemand ouvre les frontières. Des milliers de Berlinois se retrouvent pour abattre le mur. C\'est le symbole de la fin de la Guerre froide et de la division de l\'Europe.',hint:'C\'est une date clé à mémoriser absolument pour le brevet.'},
      {id:'4-2-3',type:'qcm',question:'La conférence de Bandung (1955) réunit des pays qui refusent de s\'aligner sur l\'un des deux blocs. On les appelle :',options:['Les pays du Commonwealth','Les non-alignés','Les pays de l\'OTAN','Les BRICS'],answer:'Les non-alignés',explanation:'La conférence de Bandung réunit 29 pays d\'Asie et d\'Afrique (dont l\'Inde de Nehru et l\'Égypte de Nasser) qui refusent de choisir entre le bloc américain et le bloc soviétique.',hint:'Ils refusent de s\'aligner sur l\'un ou l\'autre bloc. Quel est leur nom ?'},
      {id:'4-2-4',type:'completer',question:'L\'indépendance de l\'Inde en 1947 a été obtenue de façon pacifique grâce à la résistance non-violente menée par ___.',answer:'Gandhi',explanation:'Mahatma Gandhi a dirigé la lutte pour l\'indépendance indienne par la désobéissance civile et la non-violence. L\'Inde accède à l\'indépendance le 15 août 1947.',hint:'Ce leader politique et spiritual est une icône de la résistance pacifique.'}
    ]
  },

  {
    id: '4-3', semaineIndex: 4, jourIndex: 3, ordre: 23,
    label: 'Jeu 30 juil.', type: 'lecon', matiere: 'physique', difficulte: 3,
    lecon: 'Physique-Chimie — L\'électricité : circuits et lois fondamentales',
    detail: 'Un circuit électrique est constitué d\'un générateur (source d\'énergie), de conducteurs (fils), de récepteurs (lampes, résistances) et éventuellement d\'un interrupteur. En série : le courant est identique en tous les points (I = même partout), les tensions s\'additionnent (U = U1+U2). En dérivation (parallèle) : les tensions sont identiques aux bornes de chaque branche (U = même partout), les intensités s\'additionnent (I = I1+I2). Loi d\'Ohm : U = R × I (tension en volts, résistance en ohms, intensité en ampères). Puissance électrique : P = U × I (watts). Énergie : E = P × t (joules ou watt-heure).',
    tip: 'Moyen mémo-technique pour la loi d\'Ohm : pensez à un triangle URI (U en haut, R×I en bas). Cache la grandeur cherchée pour lire la formule : cache U → U = R×I ; cache R → R = U/I ; cache I → I = U/R.',
    lessonPage: 57, exercisesPage: 58, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'4-3-1',type:'qcm',question:'Dans un circuit en série, comment se répartit l\'intensité ?',options:['Elle est différente dans chaque branche','Elle s\'additionne aux nœuds','Elle est identique en tous les points','Elle est nulle dans les résistances'],answer:'Elle est identique en tous les points',explanation:'En série, l\'intensité est la même partout : I est identique. Les tensions s\'additionnent : U = U1 + U2 + … C\'est l\'inverse du circuit en dérivation.',hint:'En série = une seule boucle → le courant ne peut aller que dans un seul chemin.'},
      {id:'4-3-2',type:'vrai_faux',question:'La loi d\'Ohm s\'écrit U = R × I.',answer:'vrai',explanation:'La loi d\'Ohm : tension (U, en volts) = résistance (R, en ohms) × intensité (I, en ampères). Cette loi s\'applique à tout conducteur ohmique (résistance).',hint:'Le triangle URI aide à retrouver la formule : U au sommet, R×I à la base.'},
      {id:'4-3-3',type:'qcm',question:'Une résistance de 50 Ω est parcourue par un courant de 2 A. Quelle est la tension à ses bornes ?',options:['25 V','52 V','100 V','48 V'],answer:'100 V',explanation:'U = R × I = 50 × 2 = 100 V. Unités : ohms × ampères = volts.',hint:'Applique la loi d\'Ohm : U = R × I.',similarExercise:{'question':'Résistance 240 Ω sous 12 V. Intensité :','options':['0,05 A','20 A','2880 A','0,5 A'],'answer':'0,05 A'},method:'Triangle URI : U au sommet, R×I à la base. Cache la grandeur cherchée. Cache U → U = R×I. Cache R → R = U/I. Cache I → I = U/R.'},
      {id:'4-3-4',type:'completer',question:'La puissance électrique se calcule avec la formule P = U × ___ (en watts).',answer:'I',explanation:'P = U × I (puissance = tension × intensité). L\'énergie consommée est E = P × t (en joules ou en Wh). Par exemple : une lampe de 60 W consomme 60 J/s.',hint:'La puissance est le produit de la tension par l\'intensité.'}
    ]
  },

  {
    id: '4-4', semaineIndex: 4, jourIndex: 4, ordre: 24,
    label: 'Ven 31 juil.', type: 'lecon', matiere: 'technologie', difficulte: 3,
    lecon: 'Technologie — Développement durable et éco-conception',
    detail: 'Le développement durable répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs (Brundtland, 1987). Il repose sur trois piliers : économique (croissance), social (équité), environnemental (préservation). L\'analyse du cycle de vie (ACV) d\'un produit évalue son impact environnemental de la matière première au recyclage. L\'éco-conception intègre l\'environnement dès la conception : choix de matériaux recyclables, réduction de la consommation d\'énergie, durabilité. Les énergies renouvelables (solaire, éolien, hydraulique) s\'opposent aux énergies fossiles (pétrole, charbon). Le bilan carbone mesure les émissions de CO₂ d\'une activité.',
    tip: 'Au brevet de technologie, être capable d\'analyser un produit selon les 3 piliers du développement durable. Pour chaque critère, demandez-vous : est-ce que ce produit économise des ressources ? respecte les personnes ? est viable économiquement ?',
    lessonPage: 59, exercisesPage: 60, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'4-4-1',type:'qcm',question:'Quels sont les trois piliers du développement durable ?',options:['Économie, environnement, culture','Social, économique, environnemental','Politique, économique, militaire','Santé, éducation, transport'],answer:'Social, économique, environnemental',explanation:'Le développement durable repose sur 3 piliers : Social (équité, droits), Économique (croissance, emploi) et Environnemental (préservation des ressources et des écosystèmes). Ces 3 dimensions doivent progresser ensemble.',hint:'Pensez à un triangle avec les 3 piliers à chaque angle.'},
      {id:'4-4-2',type:'vrai_faux',question:'L\'Analyse du Cycle de Vie (ACV) d\'un produit s\'arrête à sa phase d\'utilisation.',answer:'faux',explanation:'L\'ACV analyse TOUT le cycle de vie : extraction des matières premières → fabrication → distribution → utilisation → fin de vie (recyclage, déchets). Elle évalue l\'impact environnemental à chaque étape.',hint:'L\'ACV suit le produit « du berceau à la tombe » (et même au recyclage).'},
      {id:'4-4-3',type:'qcm',question:'Quelle énergie est considérée comme renouvelable ?',options:['Le charbon','Le pétrole','L\'énergie solaire','L\'énergie nucléaire'],answer:'L\'énergie solaire',explanation:'L\'énergie solaire, éolienne et hydraulique sont renouvelables car elles proviennent de sources naturelles inépuisables. Le nucléaire utilise l\'uranium (ressource limitée) et produit des déchets radioactifs.',hint:'Une énergie renouvelable provient d\'une source qui se régénère naturellement et indéfiniment.'},
      {id:'4-4-4',type:'completer',question:'Le concept de « bilan ___ » mesure la quantité de CO₂ émise par une activité.',answer:'carbone',explanation:'Le bilan carbone quantifie les émissions de gaz à effet de serre (principalement CO₂) d\'une activité, d\'un produit ou d\'une organisation. Il sert à identifier les postes les plus polluants pour les réduire.',hint:'Ce bilan est exprimé en tonnes de CO₂ équivalent.'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 6 — Exercices type Brevet  (difficulté 4)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '5-0', semaineIndex: 5, jourIndex: 0, ordre: 25,
    label: 'Lun 3 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — La dictée et les règles d\'accord complexes',
    detail: 'Les accords complexes les plus fréquents au brevet. Accord du participe passé : avec être → s\'accorde avec le sujet (Elle est partie) ; avec avoir → s\'accorde avec le COD si celui-ci est placé avant le verbe (Les livres que j\'ai lus) ; verbes pronominaux → généralement avec le sujet. Accord de l\'adjectif qualificatif : s\'accorde en genre et en nombre avec le nom auquel il se rapporte. Les mots invariables à mémoriser : quand (≠ qu\'en), ou/où, leur/leurs (déterminant vs pronom), ces/c\'est/s\'est/sait. Homophones verbaux : a/à, est/et, son/sont, on/ont, ce/se. Terminaisons verbales : -é/-er/-ez (infinitif, participe passé, 2e personne du pluriel).',
    tip: 'Pour ne pas confondre -é et -er : remplacez par un verbe du 3e groupe au même temps. Si ça sonne "vendre" → infinitif (-er) ; si ça sonne "vendu" → participe passé (-é). Exemple : "Il est arrivé" → "Il est venu" ✓ (pas "venir").',
    lessonPage: 62, exercisesPage: 63, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'5-0-1',type:'qcm',question:'Dans « Les livres que j\'ai lus », pourquoi « lus » prend-il un -s ?',options:['Car « livres » est sujet de « ai lus »','Car le COD « que » représentant « livres » est placé avant le verbe avoir','Car le participe passé s\'accorde toujours au pluriel','Car « j\'ai » impose le pluriel'],answer:'Car le COD « que » représentant « livres » est placé avant le verbe avoir',explanation:'Avec avoir, le participe passé s\'accorde avec le COD si celui-ci est placé AVANT le verbe. Ici « que » (= les livres, masculin pluriel) est placé avant → lus (masc. plur.).',hint:'COD AVANT le verbe avec avoir → accord du participe passé.',similarExercise:{'question':'Accord correct : La chanson que tu as ___ (écouter) :','options':['écouté','écoutée','écoutés','écoutées'],'answer':'écoutée'},brevetTip:'La dictée du brevet comporte souvent 1-2 pièges sur le participe passé avec avoir. Soulignez le COD et vérifiez sa position par rapport au verbe.',method:'Règle du participe passé avec AVOIR : 1) Y a-t-il un COD ? 2) Est-il AVANT le verbe ? 3) Si oui aux deux → accorde en genre et nombre. Sinon → invariable.'},
      {id:'5-0-2',type:'vrai_faux',question:'Pour distinguer -é et -er, on peut remplacer par un verbe du 3e groupe au même temps.',answer:'vrai',explanation:'Si la substitution donne « vendre » → infinitif (-er) ; si elle donne « vendu » → participe passé (-é). Ex : « Il est arrivé » → « Il est venu » ✓ (participe passé) ; « Il doit arriver » → « Il doit vendre » ✓ (infinitif).',hint:'Test du verbe du 3e groupe : vendre/vendu → er/é.'},
      {id:'5-0-3',type:'qcm',question:'Lequel est orthographié correctement ?',options:['Il c\'est trompé','Il s\'est trompé','Il ses trompé','Il ce trompait'],answer:'Il s\'est trompé',explanation:'« s\'est » = pronom réfléchi « se » + auxiliaire « être » élidés. « c\'est » = présentatif. On vérifie : « il s\'est trompé » → on peut dire « elle s\'est trompée » (accord), donc c\'est le verbe pronominal.',hint:'Pour les verbes pronominaux, on a toujours : se/s\' + auxiliaire être.'},
      {id:'5-0-4',type:'completer',question:'Dans « Il a chanté, elles ont ___ » (chanter), le participe passé est invariable car le COD est ___ le verbe.',answer:'chanté / après',explanation:'Elles ont chanté : « chanté » est invariable car il n\'y a pas de COD placé avant le verbe avoir. (Elles ont chanté QUOI ? → pas de COD → pas d\'accord.)',hint:'Sans COD avant le verbe avoir, le participe passé est invariable.'}
    ]
  },

  {
    id: '5-1', semaineIndex: 5, jourIndex: 1, ordre: 26,
    label: 'Mar 4 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — Pythagore, Thalès et trigonométrie',
    detail: 'Théorème de Pythagore : dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des deux autres côtés. BC² = AB² + AC² (avec BC l\'hypoténuse). Réciproque : si BC² = AB² + AC², alors le triangle est rectangle en A. Théorème de Thalès : si une droite coupe deux côtés d\'un triangle en des points qui sont des points de division proportionnels, alors cette droite est parallèle au troisième côté. Ratios trigonométriques dans un triangle rectangle : sin(angle) = côté opposé / hypoténuse ; cos(angle) = côté adjacent / hypoténuse ; tan(angle) = côté opposé / côté adjacent. Mémo : SOH-CAH-TOA.',
    tip: 'Pour Pythagore : identifiez d\'abord l\'angle droit (marqué d\'un carré) → le côté en face est l\'hypoténuse. Pour la trigo : nommez les côtés par rapport à l\'angle donné (opposé / adjacent / hypoténuse) puis appliquez SOH-CAH-TOA.',
    lessonPage: 64, exercisesPage: 65, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'5-1-1',type:'qcm',question:'Dans un triangle rectangle, l\'hypoténuse mesure 10 cm et un côté de l\'angle droit mesure 6 cm. Quel est l\'autre côté ?',options:['4 cm','8 cm','√136 cm','16 cm'],answer:'8 cm',explanation:'Pythagore : BC² = AB² + AC². 10² = 6² + AC². 100 = 36 + AC². AC² = 64. AC = 8 cm.',hint:'Identifie l\'hypoténuse (face à l\'angle droit), puis applique a² + b² = c².',brevetTip:'Écrivez toujours la formule avant de remplacer les valeurs. « D\'après le théorème de Pythagore dans le triangle ABC rectangle en A : BC² = AB² + AC² » = formule complète qui rapporte des points.',method:'Méthode Pythagore : 1) Identifie l\'angle droit (carré sur le schéma). 2) Le côté opposé = hypoténuse (c). 3) Applique a² + b² = c². 4) Si tu cherches un petit côté : a² = c² - b².'},
      {id:'5-1-2',type:'vrai_faux',question:'Dans un triangle rectangle, sin(30°) = 0,5.',answer:'vrai',explanation:'sin(30°) = 1/2 = 0,5. À connaître par cœur : sin(30°) = 0,5 ; cos(30°) = √3/2 ≈ 0,866 ; tan(30°) = 1/√3 ≈ 0,577.',hint:'C\'est une valeur remarquable de la trigonométrie.'},
      {id:'5-1-3',type:'qcm',question:'SOH-CAH-TOA : dans un triangle rectangle, sin(α) = ?',options:['Côté adjacent / hypoténuse','Côté opposé / côté adjacent','Côté opposé / hypoténuse','Hypoténuse / côté opposé'],answer:'Côté opposé / hypoténuse',explanation:'SOH = Sin = Opposé / Hypoténuse. CAH = Cos = Adjacent / Hypoténuse. TOA = Tan = Opposé / Adjacent. Les côtés sont définis par rapport à l\'angle α.',hint:'SOH : S-O-H = Sin = Opposé / Hypoténuse.',similarExercise:{'question':'Si sin(α) = 0,8 et hypoténuse = 20 cm, côté opposé =','options':['16 cm','25 cm','10 cm','4 cm'],'answer':'16 cm'},method:'SOH-CAH-TOA : 1) Identifie l\'angle α. 2) Nomme les côtés : Hyp (face à l\'angle droit), Opp (face à α), Adj (à côté de α). 3) Choisis la formule selon les données et l\'inconnue.'},
      {id:'5-1-4',type:'completer',question:'Si cos(α) = 0,6 et l\'hypoténuse = 15 cm, le côté adjacent mesure ___ cm.',answer:'9',explanation:'cos(α) = adjacent / hypoténuse → adjacent = cos(α) × hypoténuse = 0,6 × 15 = 9 cm.',hint:'adjacent = cos(α) × hypoténuse. Multiplie le cosinus par l\'hypoténuse.'}
    ]
  },

  {
    id: '5-2', semaineIndex: 5, jourIndex: 2, ordre: 27,
    label: 'Mer 5 août', type: 'lecon', matiere: 'géographie', difficulte: 4,
    lecon: 'Géographie — La France et l\'Union européenne',
    detail: 'L\'Union européenne (UE) regroupe 27 pays membres. Elle est fondée sur le traité de Rome (1957) et a évolué jusqu\'au traité de Lisbonne (2007). Ses institutions : Parlement européen (élus des citoyens), Conseil européen (chefs d\'État), Commission européenne (gouvernement de l\'UE). L\'euro (monnaie unique) est utilisé par 20 pays de la zone euro. La France est l\'un des pays fondateurs et l\'un des principaux contributeurs budgétaires. Les politiques communes : PAC (agriculture), Schengen (libre circulation), politique de cohésion (aides aux régions défavorisées). Le Brexit (2020) marque le départ du Royaume-Uni de l\'UE, illustrant les tensions entre intégration et souveraineté nationale.',
    tip: 'Connaître les 4 libertés fondamentales de l\'UE : libre circulation des personnes, des marchandises, des capitaux et des services. Ces libertés sont au cœur du marché intérieur européen.',
    lessonPage: 66, exercisesPage: 67, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'5-2-1',type:'qcm',question:'Combien de pays membres compte l\'Union européenne (en 2024) ?',options:['25','27','28','30'],answer:'27',explanation:'Depuis le Brexit (sortie du Royaume-Uni en 2020), l\'UE compte 27 pays membres. Le Royaume-Uni en faisait partie depuis 1973 ; il est officiellement sorti le 31 janvier 2020.',hint:'Le Brexit a fait passer le nombre de 28 à un nombre inférieur.'},
      {id:'5-2-2',type:'vrai_faux',question:'Tous les pays membres de l\'UE utilisent l\'euro comme monnaie.',answer:'faux',explanation:'Seuls 20 pays de la zone euro utilisent l\'euro. Des pays comme la Suède, la Pologne, la Hongrie et (avant le Brexit) le Royaume-Uni gardent leur monnaie nationale.',hint:'La zone euro ≠ l\'UE entière. Certains États membres conservent leur monnaie.'},
      {id:'5-2-3',type:'qcm',question:'Quelle institution européenne représente les citoyens de l\'UE élus au suffrage universel direct ?',options:['La Commission européenne','Le Conseil européen','Le Parlement européen','La Cour de justice de l\'UE'],answer:'Le Parlement européen',explanation:'Le Parlement européen est la seule institution européenne élue directement par les citoyens de l\'UE (tous les 5 ans). Il vote les lois et le budget européens.',hint:'Quel organe est élu directement par les citoyens dans une démocratie ?'},
      {id:'5-2-4',type:'completer',question:'Le traité fondateur de l\'Union européenne a été signé à Rome en ___.',answer:'1957',explanation:'Le traité de Rome (25 mars 1957) fonde la CEE (Communauté Économique Européenne) entre 6 pays fondateurs : France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg. C\'est l\'acte de naissance de l\'Europe communautaire.',hint:'C\'est dans les années 1950, après la Seconde Guerre mondiale, dans une volonté de paix durable.'}
    ]
  },

  {
    id: '5-3', semaineIndex: 5, jourIndex: 3, ordre: 28,
    label: 'Jeu 6 août', type: 'lecon', matiere: 'svt', difficulte: 4,
    lecon: 'SVT — Les écosystèmes et l\'impact humain sur la biodiversité',
    detail: 'Un écosystème est l\'ensemble formé par une communauté d\'êtres vivants (biocénose) et son milieu physique (biotope). Les relations entre espèces : prédation, parasitisme, symbiose, compétition. Les chaînes et réseaux alimentaires décrivent les transferts d\'énergie et de matière (producteurs → consommateurs primaires → secondaires → décomposeurs). L\'activité humaine menace la biodiversité : déforestation, pollution, changement climatique, espèces invasives, surexploitation des ressources. La biodiversité est évaluée à trois niveaux : génétique (variété d\'allèles), spécifique (nombre d\'espèces), écosystémique (diversité des milieux). La protection passe par les parcs naturels, les conventions internationales (COP biodiversité) et les pratiques durables.',
    tip: 'Pour un réseau alimentaire, identifiez d\'abord les producteurs (végétaux), puis les herbivores, puis les carnivores. La flèche indique le sens du transfert d\'énergie : A → B signifie "A est mangé par B".',
    lessonPage: 68, exercisesPage: 69, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'5-3-1',type:'qcm',question:'Dans une chaîne alimentaire, les organismes qui fabriquent leur propre matière organique sont appelés :',options:['Décomposeurs','Consommateurs primaires','Producteurs','Consommateurs secondaires'],answer:'Producteurs',explanation:'Les producteurs (végétaux chlorophylliens) fabriquent leur matière organique par photosynthèse. Ils sont à la base de toutes les chaînes alimentaires.',hint:'Ils produisent leur propre nourriture grâce à la photosynthèse.'},
      {id:'5-3-2',type:'vrai_faux',question:'La biodiversité se mesure uniquement par le nombre d\'espèces présentes dans un milieu.',answer:'faux',explanation:'La biodiversité se mesure à trois niveaux : génétique (diversité des allèles), spécifique (nombre d\'espèces) et écosystémique (diversité des milieux). Une définition réduite au seul nombre d\'espèces est insuffisante.',hint:'La biodiversité est à la fois dans les gènes, les espèces et les écosystèmes.'},
      {id:'5-3-3',type:'qcm',question:'Quelle activité humaine est considérée comme la principale cause de perte de biodiversité ?',options:['La pêche en mer','La déforestation','Le tourisme','La recherche scientifique'],answer:'La déforestation',explanation:'La déforestation (destruction des forêts) détruit des habitats essentiels pour des millions d\'espèces. Elle est notamment massive en Amazonie, en Asie du Sud-Est et en Afrique centrale.',hint:'Destruction d\'habitat = première cause mondiale d\'extinction des espèces.'},
      {id:'5-3-4',type:'completer',question:'Dans un réseau alimentaire, la flèche A → B signifie que A est ___ par B.',answer:'mangé',explanation:'La convention est que la flèche indique le sens du transfert d\'énergie et de matière : « A est mangé par B » ou « B se nourrit de A ». Ex : Herbe → Lapin → Renard.',hint:'La flèche va du mangé vers le mangeur (sens du transfert d\'énergie).'}
    ]
  },

  {
    id: '5-4', semaineIndex: 5, jourIndex: 4, ordre: 29,
    label: 'Ven 7 août', type: 'lecon', matiere: 'anglais', difficulte: 4,
    lecon: 'Anglais — Expression écrite : rédiger un texte argumenté',
    detail: 'Rédiger un texte argumenté en anglais requiert une structure claire. Introduction : hook (phrase d\'accroche), context (mise en contexte), thesis (votre opinion/thèse). Body paragraphs : chaque paragraphe présente un argument (topic sentence), une preuve ou un exemple (evidence), une explication (analysis), et une transition. Conclusion : restate thesis (reformuler la thèse), summary (résumé des arguments), closing thought (réflexion finale ou ouverture). Connecteurs utiles : First of all, Furthermore, However, On the other hand, In conclusion, Therefore. Évitez les répétitions : utilisez des synonymes. Vérifiez la grammaire (accords, temps verbaux) et la ponctuation.',
    tip: 'La topic sentence est la première phrase de chaque paragraphe : elle doit annoncer clairement l\'argument. Le correcteur doit comprendre votre idée en lisant uniquement les topic sentences.',
    lessonPage: 70, exercisesPage: 71, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'5-4-1',type:'qcm',question:'What is a "topic sentence" in a paragraph ?',options:['The last sentence of the paragraph','The first sentence that states the main idea','An example or evidence','A transition to the next paragraph'],answer:'The first sentence that states the main idea',explanation:'La topic sentence (phrase directrice) est la première phrase du paragraphe. Elle annonce l\'idée principale. Le reste du paragraphe développe, illustre et explique cette idée.',hint:'Topic = sujet. La topic sentence annonce le sujet du paragraphe.'},
      {id:'5-4-2',type:'vrai_faux',question:'In conclusion, you should introduce new arguments that were not mentioned in the body.',answer:'faux',explanation:'La conclusion résume les arguments du développement et peut ouvrir sur une perspective. Elle ne doit jamais introduire de nouveaux arguments (ceux-ci doivent être dans le développement).',hint:'La conclusion = bilan + ouverture. Jamais de nouveaux arguments.'},
      {id:'5-4-3',type:'qcm',question:'Which connector expresses CONTRAST or OPPOSITION ?',options:['Furthermore','Therefore','However','In addition'],answer:'However',explanation:'"However" exprime l\'opposition (= cependant, néanmoins). "Furthermore" et "In addition" expriment l\'addition. "Therefore" exprime la conséquence.',hint:'However = cependant = mais (de façon formelle). Quel sens a ce mot ?'},
      {id:'5-4-4',type:'completer',question:'To express your opinion in English, you can write: "In my ___, …"',answer:'opinion',explanation:'"In my opinion" est la façon standard d\'exprimer son point de vue en anglais académique. On peut aussi dire "I believe that", "I think that", "From my point of view".',hint:'C\'est le mot français « opinion » adapté à l\'anglais.'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 7 — Brevet blanc intermédiaire  (difficulté 4-5)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '6-0', semaineIndex: 6, jourIndex: 0, ordre: 30,
    label: 'Lun 10 août', type: 'lecon', matiere: 'français', difficulte: 4,
    lecon: 'Français — Méthode complète de l\'épreuve du brevet',
    detail: 'L\'épreuve de français au brevet dure 3 heures et se compose de deux parties. Première partie — Compréhension de texte et grammaire (40 points) : lecture attentive du texte, réponse aux questions de compréhension (analyse du sens, des procédés), exercices de grammaire et de vocabulaire, dictée (10 points). Deuxième partie — Rédaction (20 points) : un sujet d\'imagination (écriture créative) ou un sujet de réflexion (texte argumentatif). Méthode recommandée : 30 min pour lire et comprendre le texte + questions ; 20 min pour la grammaire ; 20 min pour la dictée ; 50 min pour la rédaction. Relisez toujours votre copie les 10 dernières minutes.',
    tip: 'Lors de la dictée, après l\'écriture, relisez en appliquant les 4 accords : groupe nominal (déterminant + nom + adjectif), sujet-verbe, participe passé avec avoir, participe passé avec être.',
    lessonPage: 73, exercisesPage: 74, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'6-0-1',type:'qcm',question:'Quelle est la durée de l\'épreuve de français au brevet ?',options:['1h30','2h','3h','4h'],answer:'3h',explanation:'L\'épreuve de français au DNB dure 3 heures. Elle comprend une partie compréhension et langue (40 pts) et une partie rédaction (20 pts). Au total, le français est noté sur 100 points (avec le contrôle continu).',hint:'C\'est l\'épreuve la plus longue du brevet.',brevetTip:'Répartissez le temps de l\'épreuve : 30 min lecture + questions, 20 min grammaire, 20 min dictée, 50 min rédaction, 10 min relecture. Respecter ce minutage évite de manquer de temps.'},
      {id:'6-0-2',type:'vrai_faux',question:'Dans une dictée, on doit appliquer l\'accord sujet-verbe, l\'accord du GN et l\'accord du participe passé.',answer:'vrai',explanation:'Les quatre accords fondamentaux en dictée : 1) Groupe nominal (déterminant + nom + adjectif), 2) Sujet-verbe, 3) Participe passé avec être (= accord sujet), 4) Participe passé avec avoir (accord COD placé avant).',hint:'Quatre types d\'accord à vérifier systématiquement en relecture.'},
      {id:'6-0-3',type:'qcm',question:'Combien de temps conseillez-vous pour la relecture d\'une copie de brevet ?',options:['Aucun temps : finir d\'écrire jusqu\'au bout','5 minutes à la fin','10 minutes à la fin','30 minutes'],answer:'10 minutes à la fin',explanation:'10 minutes de relecture bien organisée (sens → accords → ponctuation) permettent de corriger des erreurs sans changer le fond. Écrire jusqu\'à la dernière seconde sans relire est une erreur courante.',hint:'La relecture en 3 étapes (sens, accords, ponctuation) prend environ 10 minutes.'},
      {id:'6-0-4',type:'completer',question:'Pour ne pas paraphraser lors de l\'analyse d\'un texte, il faut ___ les procédés et expliquer leurs effets.',answer:'identifier',explanation:'Analyser = identifier le procédé + expliquer l\'effet produit sur le lecteur. Paraphraser = redire le texte avec ses propres mots sans l\'analyser. Au brevet, identifier ET expliquer rapporte des points.',hint:'La première étape de l\'analyse littéraire est de nommer le procédé utilisé.'}
    ]
  },

  {
    id: '6-1', semaineIndex: 6, jourIndex: 1, ordre: 31,
    label: 'Mar 11 août', type: 'lecon', matiere: 'maths', difficulte: 4,
    lecon: 'Maths — Méthode complète de l\'épreuve du brevet',
    detail: 'L\'épreuve de mathématiques au brevet dure 2 heures (sans calculatrice pour la partie 1, avec calculatrice pour la partie 2). Elle comporte 5 exercices indépendants couvrant : calcul numérique et algébrique, géométrie plane et dans l\'espace, fonctions, statistiques et probabilités, résolution de problèmes. Méthode de travail : lisez tous les exercices en premier (2 min), commencez par ce que vous maîtrisez, ne restez pas bloqué (passez à la question suivante), montrez votre raisonnement même si le résultat est faux. En géométrie : faites toujours une figure claire et annotée. En algèbre : montrez chaque étape. En statistiques : vérifiez vos calculs avec une autre méthode.',
    tip: 'Même si vous n\'avez pas la réponse de la question 1, vous pouvez souvent utiliser un résultat donné ou supposé pour traiter la question 2. Ne restez jamais bloqué : avancez.',
    lessonPage: 75, exercisesPage: 76, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'6-1-1',type:'qcm',question:'Que faire si on ne trouve pas la réponse à la question 1 d\'un exercice mais qu\'on a besoin de ce résultat pour la question 2 ?',options:['Laisser la question 2 en blanc','Utiliser un résultat inventé sans le signaler','Indiquer « on admet que… » et continuer avec une valeur supposée','Refaire entièrement la question 1 jusqu\'à trouver'],answer:'Indiquer « on admet que… » et continuer avec une valeur supposée',explanation:'Si vous bloquez sur Q1, écrivez « On admet que le résultat est X » et utilisez cette valeur pour Q2. Vous pouvez gagner les points de Q2 même sans Q1 résolue.',hint:'Ne jamais rester bloqué : avancez en admettant un résultat.',brevetTip:'Si vous bloquez sur une question : écrivez « On admet que… [résultat supposé] » et continuez. Vous pouvez marquer les points des questions suivantes même si la première est fausse.'},
      {id:'6-1-2',type:'vrai_faux',question:'En géométrie, tracer une figure précise et annotée rapporte des points même si le raisonnement est incomplet.',answer:'vrai',explanation:'Une figure bien tracée avec les données indiquées (longueurs, angles, parallèles) peut rapporter des points de « démarche ». Au brevet, la présentation et le raisonnement sont évalués, pas seulement la réponse finale.',hint:'Montrez votre travail même incomplet : chaque étape juste compte.'},
      {id:'6-1-3',type:'qcm',question:'Pour vérifier un résultat de calcul algébrique, quelle est la meilleure méthode ?',options:['Refaire exactement le même calcul','Réinjecter le résultat dans l\'équation de départ','Demander à un voisin','Ignorer et passer à la suite'],answer:'Réinjecter le résultat dans l\'équation de départ',explanation:'La vérification consiste à remplacer x par la valeur trouvée dans l\'équation initiale et vérifier l\'égalité. Ex : x = 3 dans 3x+5=14 → 3×3+5 = 14 ✓. C\'est rapide et infaillible.',hint:'Revenir à l\'équation de départ et tester votre solution.'},
      {id:'6-1-4',type:'completer',question:'Dans la partie SANS calculatrice du brevet de maths, la durée est d\'environ ___ minutes.',answer:'45',explanation:'L\'épreuve de maths (2h) comprend environ 45 minutes sans calculatrice (calcul mental, fractions, puissances) puis 1h15 avec calculatrice. La partie sans calculatrice évalue le calcul posé et la rigueur.',hint:'C\'est environ le tiers de la durée totale de l\'épreuve de maths.'}
    ]
  },

  {
    id: '6-2', semaineIndex: 6, jourIndex: 2, ordre: 32,
    label: 'Mer 12 août', type: 'lecon', matiere: 'histoire', difficulte: 5,
    lecon: 'Histoire-Géo — Méthode de l\'étude de documents au brevet',
    detail: 'L\'étude de documents en HG-EMC comporte 4 étapes. 1) Présenter le document : nature (texte, carte, photo, graphique), auteur, date, source, contexte historique. 2) Extraire les informations : repérer les idées principales, les faits, les chiffres-clés. 3) Confronter les documents (si plusieurs) : points communs, différences, complémentarité. 4) Porter un regard critique : fiabilité de la source, intentions de l\'auteur, limites du document. Pour la question de développement construit : rédiger 2-3 paragraphes organisés avec une introduction et une conclusion courtes. La réponse doit mobiliser des connaissances et s\'appuyer sur les documents.',
    tip: 'Erreur classique : recopier le document sans l\'analyser. Le correcteur veut vous voir comprendre, interpréter et contextualiser. Citez le document (entre guillemets avec la référence), puis expliquez avec vos mots.',
    lessonPage: 77, exercisesPage: 78, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'6-2-1',type:'qcm',question:'Quelle est la première étape de l\'étude d\'un document en HG ?',options:['Répondre aux questions','Présenter le document (nature, auteur, date, source)','Comparer avec d\'autres documents','Donner son opinion personnelle'],answer:'Présenter le document (nature, auteur, date, source)',explanation:'La présentation (ou contextualisation) précède toujours l\'analyse. Elle situe le document dans son contexte historique et géographique et permet d\'évaluer sa fiabilité.',hint:'Avant d\'analyser, il faut savoir QUI a écrit QUOI, QUAND et POURQUOI.',method:'Présentation d\'un document : Nature (texte, carte, photo…) + Auteur/Source + Date + Contexte historique (1-2 phrases). Ces 4 éléments = présentation complète = 2 pts garantis.'},
      {id:'6-2-2',type:'vrai_faux',question:'Dans un développement construit en HG, chaque paragraphe doit contenir au moins un exemple précis.',answer:'vrai',explanation:'Un exemple précis (date, lieu, personnage, chiffre) donne de la solidité à l\'argument. Un développement sans exemples reste trop général et peu convaincant.',hint:'Une idée générale sans exemple précis ne convainc pas le correcteur.'},
      {id:'6-2-3',type:'qcm',question:'Qu\'est-ce qu\'un regard critique sur un document ?',options:['Critiquer l\'auteur personnellement','Évaluer la fiabilité, les intentions et les limites du document','Refuser de l\'utiliser','Ignorer la source et se concentrer sur le contenu'],answer:'Évaluer la fiabilité, les intentions et les limites du document',explanation:'Le regard critique consiste à évaluer : Qui a produit le document ? Dans quel but ? Peut-on lui faire confiance ? Que ne dit-il pas ? C\'est une compétence clé du brevet HG.',hint:'Critique ≠ négatif. Critique = analyse de la valeur et des limites du document.'},
      {id:'6-2-4',type:'completer',question:'Pour citer un passage d\'un document dans une réponse, on utilise des ___ et on indique la référence du document.',answer:'guillemets',explanation:'Les guillemets (« … ») signalent une citation directe. Il faut ensuite indiquer « (doc. 1) » ou « (ligne X) » pour référencer précisément. Une citation sans guillemets peut être considérée comme du plagiat.',hint:'On les utilise aussi pour les paroles rapportées dans un texte.',brevetTip:'Chaque citation doit être entre guillemets et suivie de la référence entre parenthèses (doc. 1, l. 3). Sans guillemets, c\'est du plagiat. Sans référence, la citation est incomplète.'}
    ]
  },

  {
    id: '6-3', semaineIndex: 6, jourIndex: 3, ordre: 33,
    label: 'Jeu 13 août', type: 'lecon', matiere: 'physique', difficulte: 4,
    lecon: 'Physique-Chimie — Bilan des grandes notions du programme',
    detail: 'Rappel des notions clés à maîtriser pour le brevet. Chimie : atomes et molécules, réactions chimiques (équation bilan, conservation des atomes), solutions (concentration, dilution), pH et acidité. Physique — Optique : lois de la réflexion et de la réfraction, formation des images par les lentilles. Physique — Mécanique : forces (poids, réaction du support, frottement), principe d\'inertie, vecteur force, pression. Physique — Énergie : formes d\'énergie (cinétique, potentielle, thermique), conservation de l\'énergie, rendement. Physique — Ondes : lumière blanche et spectre, son (fréquence, amplitude, vitesse). Toutes ces notions peuvent être mobilisées dans un même exercice de synthèse.',
    tip: 'Méthode pour équilibrer une équation chimique : comptez les atomes de chaque élément de chaque côté. Ajoutez des coefficients (jamais de changements de formules) pour équilibrer. Commencez par les atomes les plus complexes.',
    lessonPage: 79, exercisesPage: 80, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'6-3-1',type:'qcm',question:'Quelle est la formule de la concentration en masse d\'une solution ?',options:['Cm = V / m','Cm = m × V','Cm = m / V','Cm = V² / m'],answer:'Cm = m / V',explanation:'La concentration en masse Cm (en g/L) = masse du soluté m (en g) / volume de la solution V (en L). Ex : 5 g de sel dans 0,25 L d\'eau → Cm = 5/0,25 = 20 g/L.',hint:'C = m/V : masse divisée par volume. Les unités : g/L.'},
      {id:'6-3-2',type:'vrai_faux',question:'Lors d\'une réaction chimique, la masse totale des réactifs est égale à la masse totale des produits.',answer:'vrai',explanation:'C\'est la loi de conservation de la masse (Lavoisier, 1789) : rien ne se perd, rien ne se crée, tout se transforme. Le nombre d\'atomes de chaque élément est conservé.',hint:'La loi de Lavoisier : conservation de la masse lors des transformations chimiques.'},
      {id:'6-3-3',type:'qcm',question:'La lumière blanche, dispersée par un prisme, donne :',options:['De la lumière noire','Un rayon unique de couleur rouge','Un spectre de couleurs (arc-en-ciel)','De la chaleur'],answer:'Un spectre de couleurs (arc-en-ciel)',explanation:'La lumière blanche est une lumière polychromatique : elle contient toutes les couleurs du spectre visible (rouge, orange, jaune, vert, bleu, indigo, violet). Le prisme les sépare par réfraction.',hint:'La lumière blanche contient toutes les couleurs, le prisme les sépare.'},
      {id:'6-3-4',type:'completer',question:'Le rendement d\'un moteur est égal à l\'énergie ___ divisée par l\'énergie fournie.',answer:'utile',explanation:'Rendement = énergie utile / énergie fournie (× 100 pour avoir un %). Ex : une ampoule convertit 20 J en lumière sur 100 J reçus → rendement = 20%. Les 80 J restants sont perdus en chaleur.',hint:'Le rendement compare ce qu\'on obtient à ce qu\'on a mis en entrée.'}
    ]
  },

  {
    id: '6-4', semaineIndex: 6, jourIndex: 4, ordre: 34,
    label: 'Ven 14 août', type: 'lecon', matiere: 'emc', difficulte: 4,
    lecon: 'EMC — Les droits de l\'homme et l\'engagement citoyen',
    detail: 'La Déclaration universelle des droits de l\'homme (1948) proclame des droits inaliénables : droit à la vie, à la liberté, à la sécurité, à un procès équitable, à l\'éducation, à la liberté d\'expression. Les droits politiques permettent la participation à la vie démocratique : vote, liberté de manifestation, liberté de la presse. L\'engagement citoyen prend de nombreuses formes : vote (devoir civique), adhésion à des associations, service civique, dons, militantisme. La société civile joue un rôle essentiel dans la démocratie : ONG, syndicats, partis politiques, médias. Les menaces à la démocratie : totalitarisme, populisme, fake news, abstention. Le rôle de l\'école est de former des citoyens éclairés et critiques.',
    tip: 'Pour le brevet EMC, illustrez toujours un principe abstrait par un exemple concret. Pour la liberté d\'expression : citer la loi sur la presse de 1881, ses limites (diffamation, incitation à la haine). Montrez que vous comprenez les enjeux réels.',
    lessonPage: 81, exercisesPage: 82, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'6-4-1',type:'qcm',question:'La Déclaration universelle des droits de l\'homme a été adoptée par l\'ONU en :',options:['1789','1905','1948','1958'],answer:'1948',explanation:'La DUDH est adoptée le 10 décembre 1948 par l\'ONU, en réponse aux horreurs de la Seconde Guerre mondiale. Elle proclame des droits fondamentaux universels et inaliénables.',hint:'C\'est après la Seconde Guerre mondiale, dans le contexte de création de l\'ONU.'},
      {id:'6-4-2',type:'vrai_faux',question:'La liberté d\'expression est absolue et sans aucune limite en France.',answer:'faux',explanation:'La liberté d\'expression est un droit fondamental (loi sur la presse de 1881) mais elle a des limites : la diffamation, l\'injure, l\'incitation à la haine raciale ou discriminatoire sont punies par la loi.',hint:'Tous les droits ont des limites qui garantissent les droits des autres.'},
      {id:'6-4-3',type:'qcm',question:'Quel principe garantit que l\'État français ne favorise aucune religion ?',options:['Le fédéralisme','La laïcité','L\'égalité','Le républicanisme'],answer:'La laïcité',explanation:'La laïcité (inscrite dans la loi de séparation des Églises et de l\'État de 1905, puis dans la Constitution de 1958) garantit la neutralité de l\'État et la liberté de conscience de tous.',hint:'Ce principe est l\'un des piliers de la République française (Liberté, Égalité, Fraternité, Laïcité).'},
      {id:'6-4-4',type:'completer',question:'Le ___ civique est une forme d\'engagement citoyen permettant aux jeunes de 16-25 ans de s\'engager au service de l\'intérêt général.',answer:'service',explanation:'Le service civique est une mission volontaire d\'intérêt général (6 à 12 mois, indemnisée) ouverte aux 16-25 ans (30 ans pour les personnes en situation de handicap). C\'est une forme d\'engagement citoyen actif.',hint:'Service + civique = engagement au service de la cité (la société).'}
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // SEMAINE 8 — Grand Brevet Blanc  (difficulté 5)
  // ══════════════════════════════════════════════════════════════════

  {
    id: '7-0', semaineIndex: 7, jourIndex: 0, ordre: 35,
    label: 'Lun 17 août', type: 'lecon', matiere: 'français', difficulte: 5,
    lecon: 'Grand Brevet Blanc — Français (3h) : compréhension, grammaire, dictée et rédaction',
    detail: 'Épreuve de français complète en conditions réelles (3 heures). Partie 1 — Compréhension et langue (40 points) : lecture d\'un texte littéraire ou documentaire, questions de compréhension (sens, procédés, vocabulaire), exercices de grammaire (analyse de propositions, accords, conjugaison), dictée préparée et non préparée. Partie 2 — Rédaction (20 points) : au choix entre un texte d\'imagination ou un texte argumentatif. Critères d\'évaluation : cohérence du propos, richesse du vocabulaire, maîtrise orthographique, structure du texte. À la fin : bilan chiffré avec estimation de la note au brevet, compétences identifiées comme maîtrisées ou à renforcer.',
    tip: 'Dernière relecture en 3 temps : d\'abord le sens (est-ce que ça se lit bien ?), puis les accords (groupe nominal + sujet-verbe + participes), enfin la ponctuation (chaque phrase a un point, les guillemets sont fermés). 10 minutes bien utilisées peuvent faire gagner plusieurs points.',
    lessonPage: 84, exercisesPage: 85, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'7-0-1',type:'qcm',question:'(Type brevet) Dans un texte, la phrase « Les mains du temps nous façonnent » contient :',options:['Une comparaison','Une métaphore','Une personnification','Une métonymie'],answer:'Une personnification',explanation:'« Le temps » est personnifié : il a des « mains » et il « façonne » (verbe humain). Une métaphore comparerait le temps à quelque chose. Une comparaison utiliserait « comme ».',hint:'Ici, le temps a des mains et agit comme un être humain (il façonne).',method:'Pour identifier une figure de style : 1) Y a-t-il un outil de comparaison (comme, tel) ? → Comparaison. 2) Y a-t-il une image sans outil ? → Métaphore. 3) Un objet a-t-il un caractère humain ? → Personnification.'},
      {id:'7-0-2',type:'qcm',question:'(Type brevet) « Bien qu\'il soit épuisé, il continua sa route. » La subordonnée est :',options:['Circonstancielle de cause','Circonstancielle de concession','Circonstancielle de but','Conjonctive complétive'],answer:'Circonstancielle de concession',explanation:'« Bien que » introduit une subordonnée de concession/opposition. Elle marque un obstacle qui aurait pu empêcher l\'action mais ne l\'a pas empêché. Elle impose le subjonctif (soit).',hint:'La concession = malgré un obstacle, l\'action a quand même lieu.'},
      {id:'7-0-3',type:'qcm',question:'(Type brevet — dictée) Lequel est correct ?',options:['Ils ce sont disputés','Ils se sont disputés','Ils se sons disputés','Ils ce sons disputés'],answer:'Ils se sont disputés',explanation:'Verbe pronominal : se + auxiliaire être → « ils se sont disputés ». Accord du participe passé avec le sujet (ils = masc. plur. → disputés). « ce » est un pronom/déterminant démonstratif, pas la forme réfléchie.',hint:'Pour les verbes pronominaux : se/s\' + être. Pas « ce ».'},
      {id:'7-0-4',type:'vrai_faux',question:'(Type brevet) Un texte argumentatif peut parfaitement utiliser des exemples tirés de la littérature ou du cinéma.',answer:'vrai',explanation:'Les exemples dans une rédaction argumentée peuvent venir de la littérature, du cinéma, de l\'actualité, de l\'histoire ou de l\'expérience personnelle. La variété des exemples enrichit la démonstration.',hint:'L\'exemple sert à illustrer un argument. Sa source peut être diverse.'},
      {id:'7-0-5',type:'completer',question:'(Dictée — orthographe) « Les élèves que j\'ai ___ (interroger) ont répondu. »',answer:'interrogés',explanation:'Le COD « que » (= les élèves, masc. plur.) est placé avant le verbe avoir → le participe passé s\'accorde : interrogés (masc. plur. = -és).',hint:'COD avant avoir = accord. « Que » représente « les élèves » (masculin pluriel).',method:'Accord PP avec avoir : Cherchez le COD (qui ? quoi ? après le verbe). Placé AVANT → accord. « Les élèves que j\'ai interrogés » : COD = que (= les élèves, masc. plur.) placé avant → -és.'}
    ]
  },

  {
    id: '7-1', semaineIndex: 7, jourIndex: 1, ordre: 36,
    label: 'Mar 18 août', type: 'lecon', matiere: 'maths', difficulte: 5,
    lecon: 'Grand Brevet Blanc — Mathématiques (2h) : problème complet',
    detail: 'Épreuve de mathématiques complète en conditions réelles (2 heures). L\'épreuve comporte deux temps : partie sans calculatrice (45 min) couvrant calcul mental, fractions, puissances, probabilités simples, géométrie de base ; partie avec calculatrice (1h15) couvrant fonctions, géométrie dans l\'espace, statistiques, problèmes de la vie courante. Exercices de synthèse mobilisant Pythagore + trigonométrie, ou algèbre + géométrie. Problème de résolution couvrant plusieurs chapitres. À l\'issue : score sur 50, estimation de la note DNB, analyse des erreurs par domaine (calcul / géométrie / fonctions / statistiques).',
    tip: 'Stratégie d\'examen : dans la partie sans calculatrice, travaillez proprement et montrez chaque calcul intermédiaire. Dans la partie avec calculatrice, validez vos résultats par une estimation mentale. Un résultat vraisemblable compte.',
    lessonPage: 86, exercisesPage: 87, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'7-1-1',type:'qcm',question:'(Type brevet) Un triangle a pour côtés 5 cm, 12 cm et 13 cm. Est-il rectangle ?',options:['Oui, car 5+12=17≠13','Oui, car 5²+12²=13²','Non, car 5×12≠13','Non, car aucun côté n\'est double d\'un autre'],answer:'Oui, car 5²+12²=13²',explanation:'5² + 12² = 25 + 144 = 169 = 13². Par la réciproque du théorème de Pythagore, le triangle est rectangle (l\'angle droit est en face de l\'hypoténuse 13 cm).',hint:'Vérifie si la somme des carrés des deux petits côtés = carré du grand côté.',brevetTip:'Écrivez : « D\'après la réciproque du théorème de Pythagore, comme 5² + 12² = 13², le triangle est rectangle. » Cette rédaction complète rapporte tous les points de raisonnement.',method:'Réciproque de Pythagore : si a² + b² = c², alors le triangle est rectangle en face de c. Calcule les trois carrés, vérifie si la somme des deux petits = le grand.'},
      {id:'7-1-2',type:'qcm',question:'(Type brevet) La fonction f est définie par f(x) = -3x + 6. Pour quelle valeur de x a-t-on f(x) = 0 ?',options:['x = 2','x = -2','x = 6','x = 3'],answer:'x = 2',explanation:'-3x + 6 = 0 → -3x = -6 → x = 2. C\'est le zéro de la fonction (la droite coupe l\'axe des abscisses en x = 2).',hint:'Pose f(x) = 0 et résous l\'équation.'},
      {id:'7-1-3',type:'qcm',question:'(Type brevet) Une urne contient 4 boules rouges et 6 boules bleues. On tire une boule au hasard. P(rouge) = ?',options:['4/10','6/10','4/6','1/4'],answer:'4/10',explanation:'P(rouge) = nb boules rouges / nb total = 4 / (4+6) = 4/10 = 2/5 = 0,4. On peut simplifier : 4/10 = 2/5.',hint:'Probabilité = cas favorables / cas totaux.'},
      {id:'7-1-4',type:'completer',question:'(Type brevet) Dans un triangle rectangle, si tan(α) = 3/4 et le côté adjacent = 8 cm, le côté opposé = ___ cm.',answer:'6',explanation:'tan(α) = opposé/adjacent → opposé = tan(α) × adjacent = (3/4) × 8 = 6 cm.',hint:'Isole le côté opposé : opposé = tan(α) × adjacent.'},
      {id:'7-1-5',type:'vrai_faux',question:'(Type brevet) Si P(A) = 0,3 et P(B) = 0,5 avec A et B indépendants, alors P(A et B) = 0,15.',answer:'vrai',explanation:'Pour des événements indépendants : P(A et B) = P(A) × P(B) = 0,3 × 0,5 = 0,15. L\'indépendance est une condition nécessaire pour multiplier les probabilités.',hint:'Événements indépendants → multiplication des probabilités.'}
    ]
  },

  {
    id: '7-2', semaineIndex: 7, jourIndex: 2, ordre: 37,
    label: 'Mer 19 août', type: 'lecon', matiere: 'histoire', difficulte: 5,
    lecon: 'Grand Brevet Blanc — Histoire-Géographie-EMC (2h)',
    detail: 'Épreuve HG-EMC complète (2 heures). Partie HG : étude de 2 ou 3 documents, questions de compréhension, mise en relation, question de développement construit (6-8 lignes). Sujets possibles en histoire : Première ou Seconde Guerre mondiale, décolonisation, Guerre froide, construction européenne. Sujets possibles en géographie : mondialisation, inégalités de développement, France et UE, environnement et développement durable. Partie EMC : analyse d\'une situation citoyenne, argumentation sur un principe républicain (laïcité, liberté, égalité). Notation : maîtrise des connaissances + qualité de l\'analyse documentaire + expression écrite.',
    tip: 'Pour le développement construit : 3 paragraphes suffisent. Chaque paragraphe = 1 idée clé + 1 exemple précis (date, lieu, personnage, chiffre). Ne faites pas de longs paragraphes vagues : soyez précis et structuré.',
    lessonPage: 88, exercisesPage: 89, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'7-2-1',type:'qcm',question:'(Type brevet) Quel événement marque le déclenchement de la Seconde Guerre mondiale ?',options:['L\'invasion de la Pologne par l\'Allemagne (1er sept. 1939)','L\'attentat de Sarajevo (1914)','Le débarquement en Normandie (1944)','La signature du traité de Versailles (1919)'],answer:'L\'invasion de la Pologne par l\'Allemagne (1er sept. 1939)',explanation:'Le 1er septembre 1939, l\'Allemagne nazie envahit la Pologne. La France et le Royaume-Uni déclarent la guerre à l\'Allemagne le 3 septembre 1939 : c\'est le début de la SGM.',hint:'Quelle agression militaire a poussé la France et le Royaume-Uni à déclarer la guerre à l\'Allemagne ?'},
      {id:'7-2-2',type:'qcm',question:'(Type brevet) Qu\'est-ce que le « plan Marshall » (1948) ?',options:['Un plan de défense militaire américain','Un plan d\'aide économique américain pour reconstruire l\'Europe','Un accord de paix entre l\'URSS et les États-Unis','Un plan d\'expansion coloniale américain'],answer:'Un plan d\'aide économique américain pour reconstruire l\'Europe',explanation:'Le plan Marshall (1948) est un programme d\'aide économique américain (13 milliards de dollars) pour reconstruire l\'Europe occidentale après la guerre et l\'empêcher de basculer dans le communisme.',hint:'Marshall était le secrétaire d\'État américain qui proposa ce plan de reconstruction de l\'Europe.',brevetTip:'Pour le plan Marshall, retenez : 1948, aide économique américaine, 13 milliards $, Europe occidentale, objectif anti-communiste. Ces 5 éléments suffisent pour une réponse complète au brevet.'},
      {id:'7-2-3',type:'vrai_faux',question:'(Type brevet) En France, la souveraineté appartient au peuple selon la Constitution de 1958.',answer:'vrai',explanation:'L\'article 3 de la Constitution dispose : « La souveraineté nationale appartient au peuple qui l\'exerce par ses représentants et par la voie du référendum. »',hint:'Le principe fondamental de la démocratie : qui détient le pouvoir suprême ?'},
      {id:'7-2-4',type:'completer',question:'(Type brevet) La conférence de Bandung réunit en 1955 des pays qui refusent de s\'aligner sur l\'un des deux blocs : ce sont les pays ___.',answer:'non-alignés',explanation:'Le mouvement des non-alignés naît à Bandung (Indonésie) en 1955. Ces pays (Inde, Égypte, Yougoslavie, etc.) refusent de choisir entre le camp américain et le camp soviétique pendant la Guerre froide.',hint:'Ces pays refusent de s\'aligner sur l\'un des deux blocs. Quel est leur nom ?'}
    ]
  },

  {
    id: '7-3', semaineIndex: 7, jourIndex: 3, ordre: 38,
    label: 'Jeu 20 août', type: 'lecon', matiere: 'svt', difficulte: 5,
    lecon: 'Grand Brevet Blanc — Sciences (SVT + Physique-Chimie) (1h30)',
    detail: 'Épreuve scientifique complète (1h30). En SVT : étude d\'un document scientifique (graphique, tableau, schéma), questions sur la génétique, l\'immunologie, les écosystèmes ou la reproduction. Raisonnement scientifique attendu : observation → hypothèse → déduction. En Physique-Chimie : exercices sur les circuits électriques, la chimie (équations, solutions), l\'optique ou la mécanique. Exercice de synthèse liant les deux disciplines (exemple : impact des polluants sur un écosystème = SVT + chimie). Notation : rigueur scientifique, maîtrise du vocabulaire, justification des réponses.',
    tip: 'En sciences, la méthode compte autant que le résultat. Pour chaque question : reformulez ce qu\'on vous demande, identifiez les données utiles, expliquez votre raisonnement, donnez une réponse avec l\'unité correcte.',
    lessonPage: 90, exercisesPage: 91, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'7-3-1',type:'qcm',question:'(Type brevet SVT) Un individu de génotype Aa (A dominant) exprimera le caractère :',options:['Le caractère récessif uniquement','Le caractère dominant uniquement','Les deux caractères en même temps','Aucun caractère'],answer:'Le caractère dominant uniquement',explanation:'L\'allèle A est dominant : il s\'exprime même en un seul exemplaire. L\'individu Aa est hétérozygote ; il exprime le phénotype dominant (caractère de A), l\'allèle a étant masqué.',hint:'Dominant = s\'exprime même présent en un seul exemplaire.',method:'Pour les problèmes génétiques au brevet : 1) Listez les génotypes possibles (AA, Aa, aa). 2) Identifiez le phénotype de chacun. 3) Si hétérozygote (Aa) → phénotype dominant.'},
      {id:'7-3-2',type:'qcm',question:'(Type brevet Physique) Un circuit série a deux résistances R1 = 20 Ω et R2 = 30 Ω. La résistance totale est :',options:['10 Ω','25 Ω','50 Ω','600 Ω'],answer:'50 Ω',explanation:'En série, les résistances s\'additionnent : Rtotale = R1 + R2 = 20 + 30 = 50 Ω. (En dérivation, on utiliserait la formule 1/R = 1/R1 + 1/R2.)',hint:'En série, les résistances s\'additionnent simplement.'},
      {id:'7-3-3',type:'vrai_faux',question:'(Type brevet SVT) Les anticorps sont des protéines produites par les lymphocytes B.',answer:'vrai',explanation:'Les lymphocytes B (ou plasmocytes après activation) synthétisent et sécrètent des anticorps spécifiques d\'un antigène. Ces anticorps neutralisent l\'agent pathogène.',hint:'Les lymphocytes B = usines à anticorps.'},
      {id:'7-3-4',type:'completer',question:'(Type brevet Physique) L\'énergie électrique consommée par un appareil de puissance P pendant un temps t est E = ___ × t.',answer:'P',explanation:'E = P × t (énergie = puissance × temps). En joules : P en watts et t en secondes. En kWh : P en kW et t en heures. Exemple : une TV de 100 W allumée 3h consomme 100×3 = 300 Wh = 0,3 kWh.',hint:'L\'énergie est la puissance multipliée par la durée.'},
      {id:'7-3-5',type:'qcm',question:'(Type brevet SVT) Quel est le rôle des lymphocytes T cytotoxiques dans la réponse immunitaire ?',options:['Produire des anticorps','Phagocyter les agents pathogènes','Détruire les cellules infectées ou cancéreuses','Mémoriser les antigènes pour une future infection'],answer:'Détruire les cellules infectées ou cancéreuses',explanation:'Les lymphocytes T cytotoxiques (LTc) reconnaissent et détruisent les cellules présentant un antigène sur leur surface (cellules infectées par un virus, cellules cancéreuses). Ils assurent l\'immunité cellulaire.',hint:'Cytotoxique = qui tue les cellules. Ces lymphocytes détruisent les cellules infectées.'}
    ]
  },

  {
    id: '7-4', semaineIndex: 7, jourIndex: 4, ordre: 39,
    label: 'Ven 21 août', type: 'lecon', matiere: 'anglais', difficulte: 5,
    lecon: 'Grand Brevet Blanc — Bilan final, résultats et conseils personnalisés',
    detail: 'Dernière journée du cahier de vacances 3ème. Bilan général de l\'ensemble des 8 semaines de travail. Récapitulatif des compétences évaluées : Français (compréhension, grammaire, expression écrite), Mathématiques (calcul, géométrie, probabilités, fonctions), Histoire-Géographie-EMC (connaissances, méthode documentaire, argumentation), Sciences (SVT + Physique, raisonnement scientifique), Anglais (compréhension, expression). Estimation de la note globale au brevet (sur 400 points : 100 par matière principale + contrôle continu 400 points). Compétences identifiées comme maîtrisées. Compétences à retravailler avant l\'examen. Conseils personnalisés de révision pour les semaines précédant le brevet.',
    tip: 'Le brevet se prépare sur la durée, pas en une nuit. À partir de maintenant, consacrez 20 minutes par jour à la matière la plus fragile. Relisez vos fiches de méthode la veille. Et surtout : ayez confiance en vous. Vous avez travaillé sérieusement.',
    lessonPage: 92, exercisesPage: 93, pdfFile: '/cahier-3eme.pdf',
    exercices: [
      {id:'7-4-1',type:'qcm',question:'(Bilan) Quelle est la note maximale au DNB (Diplôme National du Brevet) ?',options:['300 points','400 points','600 points','800 points'],answer:'800 points',explanation:'Le DNB est noté sur 800 points : 400 points de contrôle continu (livret scolaire) + 400 points d\'épreuves finales (Français, Maths, HG-EMC, Sciences, Oral). Le seuil d\'obtention est 400/800.',hint:'Il y a autant de points de contrôle continu que d\'épreuves finales.'},
      {id:'7-4-2',type:'vrai_faux',question:'Le brevet s\'obtient avec une moyenne de 10/20, soit 400 points sur 800.',answer:'vrai',explanation:'Pour obtenir le brevet, il faut au minimum 400 points sur 800 (= 10/20 de moyenne). Des mentions sont attribuées : Assez Bien (480/800), Bien (560/800), Très Bien (640/800).',hint:'10/20 = 50% = 400/800. C\'est le seuil minimal pour l\'obtention.'},
      {id:'7-4-3',type:'qcm',question:'(Bilan) Quelle mention est attribuée à partir de 560/800 au brevet ?',options:['Assez Bien','Bien','Très Bien','Félicitations du jury'],answer:'Bien',explanation:'Mentions au DNB : Assez Bien = 480/800 (12/20), Bien = 560/800 (14/20), Très Bien = 640/800 (16/20). Il n\'existe pas de « Félicitations du jury » au brevet (uniquement au bac).',hint:'560/800 = 70% = 14/20. Quelle mention correspond à 14/20 ?',brevetTip:'Mentions au DNB : Assez Bien = 480/800 (12/20), Bien = 560/800 (14/20), Très Bien = 640/800 (16/20). Si vous avez travaillé régulièrement, viser 560 est tout à fait réaliste.'},
      {id:'7-4-4',type:'completer',question:'Le cahier de vacances 3ème t\'a préparé sur ___ semaines de révisions progressives.',answer:'8',explanation:'Ce cahier de vacances couvre 8 semaines de révisions (40 journées), avec une progression allant des bases (semaine 1) jusqu\'au Grand Brevet Blanc final (semaine 8). Bravo pour ce travail !',hint:'Compte les semaines du cahier : de S1 à S8.'},
      {id:'7-4-5',type:'vrai_faux',question:'Le brevet est un examen important mais il ne détermine pas l\'orientation au lycée, qui dépend principalement des résultats du contrôle continu.',answer:'vrai',explanation:'L\'orientation en seconde dépend surtout des résultats scolaires (contrôle continu, conseils de classe) et non du résultat au brevet. Cependant, avoir le brevet (et une belle mention) valorise le dossier.',hint:'L\'orientation au lycée se décide avec les enseignants et le conseil de classe, pas uniquement sur le résultat du brevet.'}
    ]
  },
];

import { EXTRA_3EME } from './extra3.js';
// Exercices supplémentaires générés pour les jours Français & Maths
JOURS_3EME.forEach((j) => {
  if (EXTRA_3EME[j.id]) j.exercices.push(...EXTRA_3EME[j.id]);
});

export function buildSeedJours()    { return JOURS_3EME; }
export function buildSeedSemaines() { return SEMAINES_3EME; }
