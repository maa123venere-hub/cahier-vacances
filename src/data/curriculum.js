// Exercices interactifs pour les 40 jours
// Basés sur le programme Français 4e→3e — préparation au brevet
// Types : qcm | vrai_faux | completer
// Difficulté progressive : ⭐ S1 → ⭐⭐⭐⭐⭐ S8

export const CURRICULUM = {

  // ════════════════════════════════════════════════════════════
  // SEMAINE 1 — Les bases de la phrase ⭐
  // ════════════════════════════════════════════════════════════

  '0-0': { // Lun 29 juin — Classes grammaticales
    exercises: [
      {
        id: '0-0-1', type: 'qcm',
        question: 'Dans « Trois hérissons traversaient prudemment la route. », quelle est la classe de « prudemment » ?',
        options: ['Adjectif qualificatif', 'Adverbe de manière', 'Complément circonstanciel', 'Verbe'],
        answer: 'Adverbe de manière',
        explanation: '« Prudemment » est un adverbe de manière (invariable, formé sur l\'adjectif « prudent »). Il modifie le verbe « traversaient ». Piège : il a une fonction (CC de manière) mais sa CLASSE est adverbe.',
        method: 'La CLASSE est la nature du mot (ce qu\'il est dans le dictionnaire). La FONCTION est son rôle dans la phrase. Ne les confonds pas.',
        hint: 'Un adverbe répond à « Comment ? » et est invariable.',
      },
      {
        id: '0-0-2', type: 'vrai_faux',
        question: 'Dans « La petite fille aux yeux verts courut vers sa mère. », « aux yeux verts » est un complément du nom.',
        answer: 'vrai',
        explanation: '« Aux yeux verts » est un complément du nom : introduit par la préposition « à » (contractée en « aux »), il enrichit le nom « fille ». C\'est une expansion du GN.',
        method: 'Un complément du nom est toujours introduit par une préposition (de, à, avec, en…) et complète un nom.',
        hint: 'Cherche la préposition qui relie ce groupe au nom qu\'il complète.',
      },
      {
        id: '0-0-3', type: 'qcm',
        question: 'Dans « Ce soir-là, il ne sortit pas. », quelle est la classe de « ne… pas » ?',
        options: ['Adverbe de négation', 'Pronom', 'Conjonction de coordination', 'Déterminant'],
        answer: 'Adverbe de négation',
        explanation: '« Ne… pas » est une locution adverbiale de négation. Elle encadre le verbe conjugué pour le nier. Attention : « ne » seul (style soutenu) ou « pas » seul (oral familier) peuvent aussi exprimer la négation.',
        hint: 'Ces mots modifient le sens du verbe sans être eux-mêmes des verbes.',
      },
      {
        id: '0-0-4', type: 'completer',
        question: 'Dans « Elle semble fatiguée. », l\'adjectif « fatiguée » a pour classe grammaticale ___ et pour fonction ___.',
        answer: 'adjectif qualificatif / attribut du sujet',
        explanation: 'La CLASSE d\'un adjectif ne change pas (il reste adjectif). Mais sa FONCTION ici est « attribut du sujet » car il est relié au sujet « elle » par le verbe d\'état « semble ».',
        hint: 'Rappelle-toi : classe ≠ fonction.',
      },
      {
        id: '0-0-5', type: 'vrai_faux',
        question: 'Les pronoms relatifs (qui, que, dont, où) appartiennent à la classe des pronoms.',
        answer: 'vrai',
        explanation: 'Oui, « qui, que, dont, où, lequel, auquel, duquel… » sont tous des PRONOMS relatifs — ils remplacent un nom (l\'antécédent) et introduisent une proposition relative.',
        hint: 'Ils remplacent = pronoms. Ils sont « relatifs » car ils relient la subordonnée à l\'antécédent.',
      },
    ]
  },

  '0-1': { // Mar 30 juin — Fonctions dans la phrase
    exercises: [
      {
        id: '0-1-1', type: 'qcm',
        question: 'Dans « Au fond du couloir sombre dormait un enfant. », quel est le SUJET du verbe « dormait » ?',
        options: ['Au fond du couloir sombre', 'sombre', 'un enfant', 'couloir'],
        answer: 'un enfant',
        explanation: 'Sujet inversé ! « Qui est-ce qui dormait ? → un enfant. » Le sujet est APRÈS le verbe. Le CC de lieu « Au fond du couloir sombre » est en tête de phrase — c\'est un piège classique au brevet.',
        method: 'Pour trouver le sujet, pose toujours la question « Qui/Qu\'est-ce qui + verbe ? » — peu importe où il se trouve dans la phrase.',
        hint: 'Attention : le sujet n\'est pas forcément avant le verbe.',
      },
      {
        id: '0-1-2', type: 'qcm',
        question: 'Dans « Elle parle à ses amis de ses projets. », quelle est la fonction de « à ses amis » ?',
        options: ['COD', 'COI', 'CC de destination', 'Attribut du sujet'],
        answer: 'COI',
        explanation: '« Parle À qui ? → à ses amis. » La construction avec « à » fait un COI. « De ses projets » est un second COI. Piège : « destination » n\'est pas une fonction grammaticale.',
        hint: 'Question : à qui ? ou de qui ? = COI. Quoi (sans préposition) = COD.',
      },
      {
        id: '0-1-3', type: 'vrai_faux',
        question: 'Dans « Elle paraît heureuse depuis son retour. », « heureuse » est attribut du sujet.',
        answer: 'vrai',
        explanation: '« Heureuse » est attribut du sujet « elle ». Le verbe « paraître » est un verbe d\'état (être, paraître, sembler, devenir, demeurer, rester, avoir l\'air). Ces verbes relient le sujet à son attribut.',
      },
      {
        id: '0-1-4', type: 'completer',
        question: 'Dans « Max lit un roman. », transforme la phrase pour mettre « roman » en sujet. Le roman ___ ___ par Max.',
        answer: 'est lu',
        explanation: 'Voix passive : le COD (roman) devient sujet + auxiliaire être au même temps (présent → est) + PP accordé (lu, masc. sing.). L\'agent est introduit par « par ».',
        hint: 'Même temps que la phrase active → présent → « est » + PP.',
      },
      {
        id: '0-1-5', type: 'qcm',
        question: 'Dans « À l\'aube, silencieusement, le village se réveillait. », combien y a-t-il de compléments circonstanciels ?',
        options: ['0', '1', '2', '3'],
        answer: '2',
        explanation: '« À l\'aube » = CC de temps. « Silencieusement » = CC de manière. Ces deux éléments sont mobiles (on peut les déplacer ou supprimer). « Le village se réveillait » est la phrase noyau.',
      },
    ]
  },

  '0-2': { // Mer 1er juil. — Révision + exercices grammaire
    exercises: [
      {
        id: '0-2-1', type: 'qcm',
        question: 'Quelle phrase contient un sujet INVERSÉ ?',
        options: [
          'Les enfants jouaient dans la cour.',
          'Soudain retentit une explosion.',
          'Elle a dit qu\'elle viendrait.',
          'Le chien aboie depuis ce matin.',
        ],
        answer: 'Soudain retentit une explosion.',
        explanation: 'Dans « Soudain retentit une explosion », le sujet « une explosion » est APRÈS le verbe « retentit ». Ce type de construction est courant dans les textes littéraires et les sujets de brevet.',
        hint: 'Le sujet inversé se trouve après le verbe. L\'inversion est souvent signalée par un adverbe en tête (soudain, alors, ainsi…).',
      },
      {
        id: '0-2-2', type: 'vrai_faux',
        question: 'Dans « Il lui a offert des fleurs. », « lui » est un COI.',
        answer: 'vrai',
        explanation: '« Lui » est un pronom personnel COI (= à lui / à elle). « A offert À QUI ? → lui. » Les fleurs sont le COD. Une phrase peut avoir à la fois un COD et un COI.',
      },
      {
        id: '0-2-3', type: 'completer',
        question: 'Dans « Le livre dont tu parles est épuisé. », « dont » remplace un complément introduit par la préposition ___.',
        answer: 'de',
        explanation: '« Dont » = pronom relatif qui remplace un complément introduit par « de ». « Parler de qqch » → « dont tu parles » (= de ce livre). C\'est un point très souvent évalué au brevet.',
        hint: 'Dont = de + qui / de + lequel.',
      },
      {
        id: '0-2-4', type: 'qcm',
        question: 'Dans « Bien qu\'il soit tard, il travaille encore. », quelle est la nature de la proposition « Bien qu\'il soit tard » ?',
        options: [
          'Proposition principale',
          'Subordonnée relative',
          'Subordonnée circonstancielle de concession',
          'Subordonnée complétive',
        ],
        answer: 'Subordonnée circonstancielle de concession',
        explanation: '« Bien que » introduit une subordonnée circonstancielle de concession (ou d\'opposition). Elle exprime un fait qui aurait dû empêcher l\'action principale. + subjonctif obligatoire.',
        hint: '« Bien que », « quoique », « même si » = concession.',
      },
    ]
  },

  '0-3': { // Jeu 2 juil. — Présent de l'indicatif
    exercises: [
      {
        id: '0-3-1', type: 'qcm',
        question: 'Conjugue « s\'asseoir » au présent, 3e personne du singulier :',
        options: ['il s\'assoit', 'il s\'assied', 'il s\'asseoit', 'Les deux premières formes sont correctes'],
        answer: 'Les deux premières formes sont correctes',
        explanation: '« S\'asseoir » a deux conjugaisons admises au présent : il s\'ASSOIT (forme courante) ET il s\'ASSIED (forme classique). Les deux sont correctes selon l\'Académie française.',
        hint: 'Certains verbes ont plusieurs formes admises — c\'est un piège classique.',
      },
      {
        id: '0-3-2', type: 'completer',
        question: 'Conjugue « conclure » au présent, 1re personne du singulier : je ___.',
        answer: 'conclus',
        explanation: '« Conclure » : je conclus, tu conclus, il conclut, nous concluons, vous concluez, ils concluent. Ne pas confondre avec « résoudre » : je résous.',
        hint: 'Verbe en -ure → terminaisons en -s, -s, -t comme les verbes du 3e groupe.',
      },
      {
        id: '0-3-3', type: 'vrai_faux',
        question: 'On écrit « nous interpellons » (et non « nous interpelons ») au présent.',
        answer: 'vrai',
        explanation: 'INTERPELLER s\'écrit avec deux « l » partout : j\'interpelle, nous interpellons. Verbe à ne pas confondre avec « appeler » qui lui double le « l » seulement devant un « e » muet.',
        hint: 'Interpeller = toujours deux « l ». Appeler = doublement variable.',
      },
      {
        id: '0-3-4', type: 'qcm',
        question: 'Dans « Les nouvelles que tu m\'annonces me surprennent. », pourquoi « surprennent » prend-il la terminaison « -ent » ?',
        options: [
          'Parce que « nouvelles » est pluriel',
          'Parce que le sujet réel est « les nouvelles que tu m\'annonces »',
          'Parce que le sujet est « tu »',
          'Parce que c\'est un verbe du 3e groupe',
        ],
        answer: 'Parce que le sujet réel est « les nouvelles que tu m\'annonces »',
        explanation: 'Le sujet du verbe « surprennent » est le GN « les nouvelles que tu m\'annonces » (3e pers. pluriel). La relative « que tu m\'annonces » fait partie du GN sujet mais son verbe (annonces) a pour sujet « tu ».',
        hint: 'Identifie bien QUEL verbe accord avec QUEL sujet dans les phrases complexes.',
      },
      {
        id: '0-3-5', type: 'completer',
        question: 'Conjugue « vaincre » au présent, 1re personne du pluriel : nous ___.',
        answer: 'vainquons',
        explanation: '« Vaincre » : je vaincs, tu vaincs, il vainc, nous VAINQUONS. Attention : le « c » devient « qu » devant les voyelles. À ne pas écrire « vaincrons » (futur).',
      },
    ]
  },

  '0-4': { // Ven 3 juil. — Dictée 1 + Conjugaison suite
    exercises: [
      {
        id: '0-4-1', type: 'qcm',
        question: 'Quelle est la forme correcte ? « Les résultats ___ (ont/sont) été publiés hier. »',
        options: ['ont', 'sont', 'Les deux sont possibles selon le sens', 'Ni l\'un ni l\'autre'],
        answer: 'ont',
        explanation: '« Les résultats ONT été publiés » = passé composé à la voix passive (avoir + été + PP). « Sont » serait incorrect ici. Piège : « été » fait penser à « être » mais l\'auxiliaire de ce passé composé est « avoir ».',
        hint: 'Voix passive : être + PP. Passé composé de la voix passive : avoir + été + PP.',
      },
      {
        id: '0-4-2', type: 'vrai_faux',
        question: 'On écrit « vous dissoudrez » (futur de « dissoudre ») sans « e » avant « -rez ».',
        answer: 'vrai',
        explanation: '« Dissoudre » au futur : je dissoudrai, vous dissoudrez. Comme « résoudre » : je résoudrai. Le « e » final de l\'infinitif disparaît au futur (comme « prendre » → je prendrai).',
      },
      {
        id: '0-4-3', type: 'completer',
        question: 'Conjugue « mourir » au présent, 3e personne du pluriel : ils ___.',
        answer: 'meurent',
        explanation: '« Mourir » : je meurs, tu meurs, il meurt, nous mourons, vous mourez, ILS MEURENT. Radical change : meur- au singulier + 3e pl., mour- à nous/vous.',
      },
      {
        id: '0-4-4', type: 'qcm',
        question: 'Comment s\'écrit « appeler » à la 3e pers. du pluriel du présent ?',
        options: ['ils appelent', 'ils appellent', 'ils apèlent', 'ils appèlent'],
        answer: 'ils appellent',
        explanation: '« Appeler » double le « l » devant un « e » muet : j\'appelle, il appelle, ILS APPELLENT. Mais : nous appelons, vous appelez (pas de doublement car la syllabe est tonique).',
        hint: 'Règle du doublement : devant un « e » muet → on double. Devant une syllabe tonique → on ne double pas.',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 2 — Enrichir et construire ⭐⭐
  // ════════════════════════════════════════════════════════════

  '1-0': { // Lun 6 juil. — Expansions du nom
    exercises: [
      {
        id: '1-0-1', type: 'qcm',
        question: 'Dans « un vieillard aux mains tremblantes qui fixait l\'horizon », combien d\'expansions du nom « vieillard » y a-t-il ?',
        options: ['1', '2', '3', '0'],
        answer: '2',
        explanation: '« aux mains tremblantes » = complément du nom. « qui fixait l\'horizon » = proposition relative. Deux expansions enrichissent le nom « vieillard ».',
        hint: 'Compte chaque groupe qui dépend directement du nom.',
      },
      {
        id: '1-0-2', type: 'vrai_faux',
        question: 'Dans « une vieille dame, ancienne institutrice du village, » les virgules encadrent une apposition.',
        answer: 'vrai',
        explanation: 'L\'apposition est encadrée par des virgules (ou des tirets). Elle désigne le même référent que le nom qu\'elle complète. « Ancienne institutrice du village » = apposition de « dame ».',
      },
      {
        id: '1-0-3', type: 'qcm',
        question: 'Quelle expansion du nom est présente dans « l\'homme dont vous parlez » ?',
        options: [
          'Complément du nom',
          'Adjectif épithète',
          'Proposition relative',
          'Apposition',
        ],
        answer: 'Proposition relative',
        explanation: '« dont vous parlez » est une proposition relative introduite par le pronom relatif « dont ». Elle complète le nom « homme ». Elle contient un verbe conjugué.',
        hint: 'La relative contient un verbe conjugué et est introduite par un pronom relatif.',
      },
      {
        id: '1-0-4', type: 'completer',
        question: 'Dans « un enfant triste, aux yeux rouges, qui ne parlait plus », les trois expansions ont pour natures : ___, ___ et ___.',
        answer: 'adjectif épithète / complément du nom / proposition relative',
        explanation: '« triste » = adjectif épithète (accolé au nom). « aux yeux rouges » = complément du nom (préposition + GN). « qui ne parlait plus » = proposition relative (pronom relatif + verbe conjugué).',
      },
      {
        id: '1-0-5', type: 'vrai_faux',
        question: 'Dans « Il portait un manteau, élégant et noir, aux boutons dorés. », l\'adjectif « élégant » est un adjectif apposé.',
        answer: 'vrai',
        explanation: 'Quand l\'adjectif est séparé du nom par des virgules, on parle d\'adjectif APPOSÉ (ou épithète détaché). Il peut être déplacé. S\'il était directement accolé (« un manteau élégant »), ce serait un épithète simple.',
        hint: 'Épithète lié = accolé sans virgule. Épithète détaché / apposé = séparé par virgules.',
      },
    ]
  },

  '1-1': { // Mar 7 juil. — Phrase simple et complexe
    exercises: [
      {
        id: '1-1-1', type: 'qcm',
        question: 'Combien de propositions y a-t-il dans : « Lorsqu\'il entra, les enfants se turent et le regardèrent fixement. » ?',
        options: ['1', '2', '3', '4'],
        answer: '3',
        explanation: '3 verbes conjugués = 3 propositions : « Lorsqu\'il entra » (subordonnée circ. de temps) + « les enfants se turent » (principale) + « le regardèrent fixement » (juxtaposée ou coordonnée par « et »).',
        hint: 'Compte les verbes conjugués = nombre de propositions.',
      },
      {
        id: '1-1-2', type: 'vrai_faux',
        question: 'Dans « Il avait l\'air fatigué, mais il refusa de s\'arrêter. », les deux propositions sont reliées par subordination.',
        answer: 'faux',
        explanation: 'Elles sont reliées par COORDINATION grâce à la conjonction de coordination « mais ». La subordination impliquerait une proposition dépendante d\'une autre (avec une conjonction de subordination comme « parce que », « bien que »…).',
      },
      {
        id: '1-1-3', type: 'qcm',
        question: 'Dans « Je lis le livre que tu m\'as offert. », quelle est la fonction de la proposition « que tu m\'as offert » ?',
        options: [
          'Sujet de la principale',
          'COD de « lis »',
          'Épithète de « livre »',
          'CC de cause',
        ],
        answer: 'Épithète de « livre »',
        explanation: 'La proposition relative « que tu m\'as offert » complète le nom « livre » : elle est épithète du nom (ou encore : elle a la fonction de relative épithète). Ne pas confondre avec le COD du verbe principal.',
        hint: 'Une relative qui complète un nom a pour fonction « épithète de ce nom ».',
      },
      {
        id: '1-1-4', type: 'completer',
        question: 'La subordonnée dans « Appelle-moi quand tu arriveras. » est une circonstancielle de ___.',
        answer: 'temps',
        explanation: '« Quand tu arriveras » exprime le moment de l\'action → circonstancielle de TEMPS. Les conjonctions de temps : quand, lorsque, dès que, avant que, après que…',
      },
    ]
  },

  '1-2': { // Mer 8 juil. — L'imparfait
    exercises: [
      {
        id: '1-2-1', type: 'qcm',
        question: 'Lequel de ces emplois de l\'imparfait est INCORRECT ?',
        options: [
          '« Chaque soir, elle chantait. » (habitude)',
          '« Hier, il mangeait une pomme à 14h00. » (action en cours)',
          '« Il entra soudain dans la pièce. » (action ponctuelle)',
          '« La rue était déserte. » (description)',
        ],
        answer: '« Il entra soudain dans la pièce. » (action ponctuelle)',
        explanation: '« Il entra soudain » utilise le PASSÉ SIMPLE, pas l\'imparfait. Les actions ponctuelles et soudaines dans un récit = passé simple. L\'imparfait serait : « Il entrait lentement. » (action en cours).',
        hint: 'Imparfait = durée, description, habitude. Passé simple = action ponctuelle, délimitée.',
      },
      {
        id: '1-2-2', type: 'completer',
        question: 'Conjugue « manger » à l\'imparfait, 1re pers. du pluriel : nous ___.',
        answer: 'mangions',
        explanation: 'Les verbes en -ger gardent le « e » devant certaines terminaisons pour conserver le son [ʒ]. Mais à « nous », la terminaison commence par « i » → nous mangIONS (le « e » disparaît car inutile).',
        hint: 'Attention : le « e » de « mange- » n\'est utile que devant « a » ou « o » (nous mangeons au présent). À l\'imparfait, nous mangIONS (pas de e).',
      },
      {
        id: '1-2-3', type: 'vrai_faux',
        question: 'Dans « Si j\'étais riche, j\'achèterais un bateau. », l\'imparfait exprime une condition irréelle.',
        answer: 'vrai',
        explanation: 'L\'imparfait dans une proposition conditionnelle (après « si ») exprime une condition irréelle au présent : « j\'étais » ≠ je suis riche (= c\'est faux). La conséquence est au conditionnel : j\'achèterais.',
        hint: 'Si + imparfait = condition irréelle (présent ou futur). Si + plus-que-parfait = condition irréelle dans le passé.',
      },
      {
        id: '1-2-4', type: 'qcm',
        question: 'Dans un récit, l\'imparfait et le passé simple s\'utilisent ensemble. Quelle est leur relation ?',
        options: [
          'Ils sont interchangeables',
          'L\'imparfait = décor/description ; le passé simple = actions qui font avancer le récit',
          'Le passé simple décrit, l\'imparfait raconte les actions',
          'L\'imparfait est pour le discours direct, le passé simple pour le récit',
        ],
        answer: 'L\'imparfait = décor/description ; le passé simple = actions qui font avancer le récit',
        explanation: 'C\'est la règle fondamentale du récit au passé : L\'IMPARFAIT campe le décor (état, description, habitude). Le PASSÉ SIMPLE fait progresser l\'histoire (actions précises, ponctuelles). C\'est un point clé du brevet.',
      },
    ]
  },

  '1-3': { // Jeu 9 juil. — Subordonnées
    exercises: [
      {
        id: '1-3-1', type: 'qcm',
        question: 'Dans « Le fait qu\'il ait menti m\'a déçue. », de quel type est la subordonnée « qu\'il ait menti » ?',
        options: [
          'Relative',
          'Complétive sujet',
          'Circonstancielle de cause',
          'Complétive COD',
        ],
        answer: 'Complétive sujet',
        explanation: '« Qu\'il ait menti » est sujet du verbe « a déçue » (introduit par « que » après le nom « le fait »). C\'est une subordonnée conjonctive complétive sujet.',
        hint: 'La complétive peut être sujet (remplaçable par « cela ») ou COD (après les verbes de parole, pensée, sentiment).',
      },
      {
        id: '1-3-2', type: 'vrai_faux',
        question: 'Dans « La maison dont il rêvait était à vendre. », « dont » peut être remplacé par « de laquelle ».',
        answer: 'vrai',
        explanation: '« Dont » = de + pronom relatif. On peut toujours le développer en « de qui » (personnes) ou « de laquelle/duquel » (choses). Test : « La maison DE LAQUELLE il rêvait » ✓.',
        hint: 'Dont = de + qui/quoi/lequel. C\'est une forme contractée.',
      },
      {
        id: '1-3-3', type: 'qcm',
        question: 'Quelle est la nuance entre « parce que » et « puisque » (deux conjonctions de cause) ?',
        options: [
          'Il n\'y a aucune nuance',
          '« Parce que » apporte une cause nouvelle ; « puisque » s\'appuie sur une cause connue ou évidente',
          '« Puisque » apporte une cause nouvelle ; « parce que » s\'appuie sur une cause connue',
          '« Puisque » est toujours en début de phrase',
        ],
        answer: '« Parce que » apporte une cause nouvelle ; « puisque » s\'appuie sur une cause connue ou évidente',
        explanation: '« Il est absent PARCE QU\'il est malade. » (cause nouvelle, inconnue de l\'interlocuteur). « PUISQUE tu insistes, j\'accepte. » (cause connue des deux). Nuance subtile mais évaluée en 3e.',
      },
      {
        id: '1-3-4', type: 'completer',
        question: 'Dans « Pour qu\'il réussisse, il faut qu\'il travaille. », les deux subordonnées utilisent le mode ___.',
        answer: 'subjonctif',
        explanation: '« Pour que » + subjonctif (but). « Il faut que » + subjonctif (obligation). Ces deux constructions imposent le subjonctif. C\'est une règle fondamentale : certains verbes et conjonctions imposent le subjonctif.',
        hint: 'Pour que, bien que, avant que, à moins que, il faut que → subjonctif obligatoire.',
      },
    ]
  },

  '1-4': { // Ven 10 juil. — Lecture 1 + Dictée 2
    exercises: [
      {
        id: '1-4-1', type: 'qcm',
        question: 'À l\'imparfait, « étudier » s\'écrit « nous étudi_ons ». Combien de lettres « i » faut-il ?',
        options: ['1 seul « i » : nous étudiions', '2 « i » : nous étudiions', '0 « i » : nous étudions', 'Ça dépend du contexte'],
        answer: '2 « i » : nous étudiions',
        explanation: 'Les verbes en -ier (étudier, crier, plier…) ont un double « i » à l\'imparfait (nous/vous) : nous étudii-ONS, vous étudii-EZ. 1er « i » = radical, 2e « i » = terminaison de l\'imparfait (-ions).',
        hint: 'Imparfait -ier : nous étudiions, vous étudiiez. C\'est un piège classique de dictée.',
      },
      {
        id: '1-4-2', type: 'vrai_faux',
        question: 'Dans un texte de lecture, il est toujours préférable de citer le texte en répondant aux questions.',
        answer: 'vrai',
        explanation: 'Les correcteurs du brevet attendent des citations précises entre guillemets avec la référence à la ligne. Une réponse sans citation manque de rigueur et perd des points.',
        hint: 'Format attendu : « Comme l\'indique le texte : ″...″ (l. X) »',
      },
      {
        id: '1-4-3', type: 'completer',
        question: 'Conjugue « voir » à l\'imparfait, 2e personne du pluriel : vous ___.',
        answer: 'voyiez',
        explanation: '« Voir » à l\'imparfait : je voyais, tu voyais, il voyait, nous voyions, VOUS VOYIEZ, ils voyaient. Le radical est « voy- » (et non « ver- » du futur).',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 3 — Récit au passé et subordonnées ⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '2-0': { // Lun 13 juil. — Les propositions subordonnées
    exercises: [
      {
        id: '2-0-1', type: 'qcm',
        question: 'Dans « Quoiqu\'il fût épuisé, il continua sa route. », pourquoi « fût » est-il au subjonctif imparfait ?',
        options: [
          'C\'est une erreur, on devrait écrire « était »',
          'La conjonction « quoique » impose le subjonctif ; le subjonctif imparfait est la forme littéraire de concordance',
          'Le subjonctif imparfait s\'emploie après « quoique » uniquement dans les textes anciens',
          'C\'est le subjonctif présent déguisé',
        ],
        answer: 'La conjonction « quoique » impose le subjonctif ; le subjonctif imparfait est la forme littéraire de concordance',
        explanation: '« Quoique » (= bien que) impose le subjonctif. Dans un registre littéraire soutenu, la concordance des temps impose le subjonctif imparfait quand la principale est au passé. À l\'oral contemporain : « bien qu\'il soit épuisé ».',
        hint: 'Au brevet, reconnaître le subjonctif imparfait sans forcément le conjuguer est suffisant.',
      },
      {
        id: '2-0-2', type: 'completer',
        question: 'Quelle conjonction introduit une subordonnée de but ? « Il chuchota ___ personne ne l\'entende. »',
        answer: 'pour que',
        explanation: '« Pour que » + subjonctif = subordonnée circonstancielle de BUT. Autres locutions de but : afin que, de crainte que (+ ne), de peur que (+ ne).',
        hint: 'But = pour que, afin que. Cause = parce que, puisque. Concession = bien que, quoique.',
      },
      {
        id: '2-0-3', type: 'qcm',
        question: 'Analysez la phrase : « Dès qu\'il vit la lumière, il sut que tout était fini. » Combien de propositions ?',
        options: ['2', '3', '4', '1'],
        answer: '3',
        explanation: '3 propositions : 1) « Dès qu\'il vit la lumière » (circ. de temps). 2) « il sut » (principale). 3) « que tout était fini » (complétive COD de « sut »).',
        hint: 'Compte les verbes conjugués : vit, sut, était = 3.',
      },
    ]
  },

  '2-1': { // Mar 14 juil. — 🎆 Journée légère
    exercises: [
      {
        id: '2-1-1', type: 'qcm',
        question: 'Quel mot de liaison exprime la conséquence ?',
        options: ['or', 'donc', 'ni', 'mais'],
        answer: 'donc',
        explanation: '« Donc » exprime la conséquence (ou la conclusion). Les 7 conjonctions de coordination (MOEDONIC) : Mais, Ou, Et, Donc, Or, Ni, Car. « Or » introduit une prémisse/nuance. « Ni » = négation. « Mais » = opposition.',
        hint: 'MOEDONIC = Mais Ou Et Donc Or Ni Car. À connaître par cœur.',
      },
      {
        id: '2-1-2', type: 'vrai_faux',
        question: 'Dans un texte argumentatif, « cependant » et « néanmoins » expriment tous les deux la concession.',
        answer: 'vrai',
        explanation: 'Oui : « cependant », « néanmoins », « toutefois », « pourtant », « en revanche » sont tous des connecteurs de concession/opposition. Ils nuancent un argument.',
        hint: 'Connecteurs de concession : cependant, néanmoins, toutefois, pourtant, or, certes…',
      },
    ]
  },

  '2-2': { // Mer 15 juil. — Passé simple
    exercises: [
      {
        id: '2-2-1', type: 'qcm',
        question: 'Quel est le passé simple correct de « peindre » à la 3e pers. du singulier ?',
        options: ['il peignit', 'il peinda', 'il peigna', 'il peindit'],
        answer: 'il peignit',
        explanation: '« Peindre » au passé simple : je peignis, tu peignis, IL PEIGNIT, nous peignîmes, vous peignîtes, ils peignirent. Comme « craindre » (il craignit), « atteindre » (il atteignit).',
        hint: 'Les verbes en -indre, -eindre, -oindre font leur passé simple en -ignis.',
      },
      {
        id: '2-2-2', type: 'completer',
        question: 'Conjugue « naître » au passé simple, 3e pers. du singulier : il ___.',
        answer: 'naquit',
        explanation: '« Naître » au passé simple : il NAQUIT. Participe passé : né. Passé simple irrégulier à connaître. Comme « mourir » → il mourut.',
        hint: 'Naître = naquit (pas naîtit !). Comme « faire » → fit, « être » → fut.',
      },
      {
        id: '2-2-3', type: 'vrai_faux',
        question: 'Le passé simple s\'emploie dans les textes écrits littéraires, pas à l\'oral.',
        answer: 'vrai',
        explanation: 'Le passé simple est un temps du récit littéraire écrit. À l\'oral, on utilise le passé composé. C\'est pourquoi on dit qu\'au brevet, comprendre et reconnaître le passé simple est essentiel pour analyser des textes.',
      },
      {
        id: '2-2-4', type: 'qcm',
        question: 'Dans ce passage, quel verbe est au passé simple ? « Il tremblait. Soudain, la porte s\'ouvrit. Un homme entra. »',
        options: ['tremblait', 's\'ouvrit et entra', 'tremblait et s\'ouvrit', 'Tous les verbes'],
        answer: 's\'ouvrit et entra',
        explanation: '« Tremblait » = imparfait (description). « S\'ouvrit » et « entra » = passé simple (actions ponctuelles qui font avancer le récit). C\'est la coexistence imparfait/passé simple dans un récit.',
      },
    ]
  },

  '2-3': { // Jeu 16 juil. — Plus-que-parfait
    exercises: [
      {
        id: '2-3-1', type: 'qcm',
        question: 'Quel temps faut-il dans les blancs ? « Quand elle ___ (arriver), tous les autres ___ (partir) depuis longtemps. »',
        options: [
          'arriva / étaient partis',
          'était arrivée / partirent',
          'arriva / partirent',
          'était arrivée / avaient eu parti',
        ],
        answer: 'arriva / étaient partis',
        explanation: '« Quand elle arriva » = passé simple (action ponctuelle). « étaient partis » = plus-que-parfait (action AVANT l\'arrivée). Le PQP exprime l\'antériorité par rapport à un autre passé.',
        hint: 'PQP = action la plus ancienne dans le passé. Il précède le passé simple ou l\'imparfait.',
      },
      {
        id: '2-3-2', type: 'completer',
        question: 'Conjugue « promettre » au plus-que-parfait, 3e pers. du singulier : il ___.',
        answer: 'avait promis',
        explanation: 'PQP de « promettre » : il AVAIT PROMIS. Avoir à l\'imparfait (avait) + participe passé (promis). Accord du PP : pas d\'accord ici car le COD est après.',
        hint: 'Auxiliaire avoir ou être à l\'imparfait + PP.',
      },
      {
        id: '2-3-3', type: 'vrai_faux',
        question: 'Dans « Elle avait lu le livre avant que le film sorte. », le plus-que-parfait exprime une action postérieure à la sortie du film.',
        answer: 'faux',
        explanation: 'Au contraire ! Le PQP « avait lu » exprime une action ANTÉRIEURE (elle a lu LE LIVRE D\'ABORD, puis le film est sorti). PQP = action passée la plus ancienne.',
        hint: 'PQP = action passée AVANT une autre action passée.',
      },
    ]
  },

  '2-4': { // Ven 17 juil. — Rédaction 1 + Dictée 3
    exercises: [
      {
        id: '2-4-1', type: 'qcm',
        question: 'Pour une rédaction narrative (raconter une histoire), quel temps convient pour les actions ?',
        options: [
          'Le présent uniquement',
          'Le passé simple (ou passé composé à l\'oral) pour les actions, l\'imparfait pour le décor',
          'L\'imparfait uniquement',
          'Le futur simple',
        ],
        answer: 'Le passé simple (ou passé composé à l\'oral) pour les actions, l\'imparfait pour le décor',
        explanation: 'C\'est la règle d\'or de la narration au passé. Les correcteurs du brevet vérifient que tu maîtrises cette alternance : imparfait (cadre, description) + passé simple ou composé (événements).',
      },
      {
        id: '2-4-2', type: 'vrai_faux',
        question: 'Le point d\'exclamation peut exprimer la joie, la colère, la surprise et l\'admiration.',
        answer: 'vrai',
        explanation: 'Le point d\'exclamation exprime une forte émotion : joie, colère, surprise, admiration, peur, dégoût… La nature de l\'émotion dépend du contexte et du sens de la phrase.',
        hint: 'Ne pas confondre le signe de ponctuation avec l\'émotion : le contexte décide du sens.',
      },
      {
        id: '2-4-3', type: 'completer',
        question: 'Le connecteur logique qui introduit un exemple est ___.',
        answer: 'par exemple',
        explanation: 'Connecteurs d\'exemplification : par exemple, c\'est le cas de, notamment, ainsi, comme en témoigne… Ces connecteurs structurent un texte argumentatif et montrent que tu maîtrises la progression logique.',
        hint: 'Argument → connecteur d\'exemple → exemple → conclusion.',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 4 — Types de phrases et modes ⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '3-0': { // Lun 20 juil. — Types et formes de phrases
    exercises: [
      {
        id: '3-0-1', type: 'qcm',
        question: 'Quelle est la transformation correcte à la voix passive ? « Les archéologues ont découvert une tombe. »',
        options: [
          'Une tombe était découverte par les archéologues.',
          'Une tombe a été découverte par les archéologues.',
          'Une tombe est découverte des archéologues.',
          'Les archéologues ont été découverts par une tombe.',
        ],
        answer: 'Une tombe a été découverte par les archéologues.',
        explanation: 'Passé composé actif → passé composé passif. Actif : ont découvert (passé composé). Passif : a été + PP accordé. « Une tombe » (féminin) → découverte. Agent introduit par « par ».',
        hint: 'Même temps à la voix passive. Accord du PP avec le nouveau sujet.',
      },
      {
        id: '3-0-2', type: 'vrai_faux',
        question: 'La phrase « N\'est-il pas regrettable que tant de livres soient perdus ? » est à la fois interrogative et négative.',
        answer: 'vrai',
        explanation: 'Le TYPE (interrogative) et la FORME (négative) sont indépendants. Cette phrase pose une question (interrogative) tout en contenant « ne… pas » (forme négative). On peut aussi combiner : interrogative + passive, exclamative + négative…',
      },
      {
        id: '3-0-3', type: 'qcm',
        question: 'Quelle est la valeur de la forme passive dans : « Des milliers de livres ont été détruits. » ?',
        options: [
          'Insister sur l\'agent (les destructeurs)',
          'Mettre en valeur l\'objet de l\'action (les livres) et effacer ou taire l\'agent',
          'Rendre la phrase plus courte',
          'Exprimer une habitude passée',
        ],
        answer: 'Mettre en valeur l\'objet de l\'action (les livres) et effacer ou taire l\'agent',
        explanation: 'La voix passive met l\'OBJET de l\'action en position de sujet pour l\'insister. L\'agent peut disparaître (comme ici) si on ne sait pas qui a détruit ou si on veut ne pas le nommer. C\'est une valeur rhétorique importante.',
        hint: 'La voix passive est souvent un choix stylistique, pas qu\'une transformation grammaticale.',
      },
      {
        id: '3-0-4', type: 'completer',
        question: 'La mise en relief « C\'est à lui que je pense. » correspond à la forme normale : « Je pense ___ ».',
        answer: 'à lui',
        explanation: '« C\'est… que » est une tournure emphatique (mise en relief). Elle insiste sur le COI « à lui ». Forme normale : je pense à lui. L\'emphase déplace l\'élément important en tête de phrase.',
        hint: 'C\'est + élément mis en valeur + que/qui + reste de la phrase.',
      },
    ]
  },

  '3-1': { // Mar 21 juil. — Futur simple
    exercises: [
      {
        id: '3-1-1', type: 'qcm',
        question: 'Lequel de ces futurs est INCORRECT ?',
        options: ['il courra', 'nous verrons', 'ils voudront', 'elle saurai'],
        answer: 'elle saurai',
        explanation: '« Saurai » est la 1re personne du singulier (je saurai). Pour « elle », il faut « elle SAURA ». Erreur classique : oublier de modifier la terminaison selon la personne.',
        hint: 'Futur : je -rai, tu -ras, il/elle -ra, nous -rons, vous -rez, ils/elles -ront.',
      },
      {
        id: '3-1-2', type: 'completer',
        question: 'Conjugue « envoyer » au futur, 2e pers. du singulier : tu ___.',
        answer: 'enverras',
        explanation: '« Envoyer » a un radical irrégulier au futur : ENVERR-. Tu enverras (et non tu envoieras). Comme « voir » → je verrai, « s\'asseoir » → il s\'assiéra.',
        hint: 'Envoyer → enverr- (futur irrégulier). Attention à ne pas écrire « envoieras ».',
      },
      {
        id: '3-1-3', type: 'vrai_faux',
        question: 'Dans « Quand tu seras prêt, nous partirons. », le futur dans la subordonnée en « quand » est obligatoire.',
        answer: 'vrai',
        explanation: 'Contrairement à l\'anglais (« When you\'re ready »), le français exige le futur dans la subordonnée en « quand » si l\'action est future. « Quand tu SERAS prêt » (et non « quand tu es prêt »).',
        hint: 'Quand + action future → futur dans la subordonnée aussi (en français).',
      },
    ]
  },

  '3-2': { // Mer 22 juil. — Conditionnel
    exercises: [
      {
        id: '3-2-1', type: 'qcm',
        question: 'Quelle phrase contient une ERREUR ?',
        options: [
          '« Si tu venais, je serais heureux. »',
          '« Si tu étais venu, j\'aurais été heureux. »',
          '« Si tu viendras, je serai heureux. »',
          '« Si tu viens, je serai heureux. »',
        ],
        answer: '« Si tu viendras, je serai heureux. »',
        explanation: 'JAMAIS de futur après « si » de condition ! « Si + futur » est une faute grave. Les formes correctes : si + présent → futur ; si + imparfait → conditionnel ; si + PQP → cond. passé.',
        hint: 'Si + présent → futur. Si + imparfait → conditionnel. JAMAIS si + futur ou conditionnel.',
      },
      {
        id: '3-2-2', type: 'completer',
        question: 'Conjugue « savoir » au conditionnel présent, 1re pers. du pluriel : nous ___.',
        answer: 'saurions',
        explanation: '« Savoir » au conditionnel : je saurais, tu saurais, il saurait, NOUS SAURIONS… Radical du futur (saur-) + terminaison imparfait (-ions). Différent de l\'imparfait (nous savions).',
        hint: 'Conditionnel = futur + terminaison imparfait. Comparer : nous savions (imparfait) ≠ nous saurions (conditionnel).',
      },
      {
        id: '3-2-3', type: 'vrai_faux',
        question: 'Dans un article de presse, le conditionnel peut indiquer que l\'information est non vérifiée.',
        answer: 'vrai',
        explanation: 'C\'est le conditionnel journalistique (ou épistémique) : « Le suspect aurait fui en voiture. » exprime l\'incertitude, la rumeur. Cette valeur est distincte du conditionnel de condition.',
        hint: 'Conditionnel = condition, souhait, politesse, OU information non confirmée (presse).',
      },
    ]
  },

  '3-3': { // Jeu 23 juil. — Entraînement
    exercises: [
      {
        id: '3-3-1', type: 'qcm',
        question: 'Dans « On lui demanda de se taire. », quelle est la fonction du groupe « de se taire » ?',
        options: [
          'Sujet',
          'COD',
          'COI',
          'Attribut du sujet',
        ],
        answer: 'COI',
        explanation: '« Demander DE faire qqch » = construction avec préposition « de » → COI. La proposition infinitive « de se taire » est COI de « demanda ». À distinguer du COD (sans préposition).',
        hint: 'Demander de = COI (avec préposition de). Demander à = COI aussi (avec préposition à). Les deux sont COI.',
      },
      {
        id: '3-3-2', type: 'vrai_faux',
        question: 'Dans « Il semblait que tout fût perdu. », le subjonctif imparfait « fût » est la forme littéraire correcte.',
        answer: 'vrai',
        explanation: 'Dans un registre soutenu, après un verbe au passé (semblait), la concordance des temps impose le subjonctif imparfait (fût) plutôt que le subjonctif présent (soit). Les deux sont acceptés au brevet.',
      },
    ]
  },

  '3-4': { // Ven 24 juil. — Lecture 2 + Dictée 4
    exercises: [
      {
        id: '3-4-1', type: 'qcm',
        question: 'Dans l\'analyse d\'un texte, que signifie « le point de vue interne » ?',
        options: [
          'Le narrateur est extérieur à l\'histoire, il la raconte de dehors',
          'Le narrateur est un personnage et raconte ce qu\'il ressent, perçoit, pense',
          'Le narrateur sait tout sur tous les personnages',
          'Le narrateur est omniscient',
        ],
        answer: 'Le narrateur est un personnage et raconte ce qu\'il ressent, perçoit, pense',
        explanation: 'Point de vue interne = focalisation interne : le lecteur ne sait que ce que sait le personnage-narrateur. Le point de vue omniscient = le narrateur sait tout. Le point de vue externe = le narrateur observe de l\'extérieur sans accéder aux pensées.',
        hint: 'Interne = personnage qui raconte. Omniscient = il sait tout. Externe = il observe seulement.',
      },
      {
        id: '3-4-2', type: 'completer',
        question: 'Le discours rapporté au style indirect transforme le discours direct : « Il dit : "Je pars demain" » → Il dit qu\'il ___ le ___.',
        answer: 'partait lendemain',
        explanation: 'Passage au style indirect : temps recule d\'un cran (je pars → il partait), déictiques changent (demain → le lendemain, je → il). Ce mécanisme est fréquemment évalué au brevet.',
        hint: 'Style indirect après verbe au passé : présent → imparfait. demain → le lendemain. je → il/elle.',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 5 — Orthographe avancée ⭐⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '4-0': { // Lun 27 juil. — Accord sujet/verbe (cas complexes)
    exercises: [
      {
        id: '4-0-1', type: 'qcm',
        question: 'Quelle est la forme correcte ? « La majorité des élèves ___ absent(s). »',
        options: [
          'est absente (accord avec « la majorité »)',
          'sont absents (accord avec « des élèves »)',
          'Les deux sont possibles selon le sens voulu',
          'est absents',
        ],
        answer: 'Les deux sont possibles selon le sens voulu',
        explanation: 'Avec « la majorité de », « la plupart de », « un grand nombre de »… les deux accords sont possibles. Si l\'on pense à la collectivité → singulier. Si l\'on pense aux individus → pluriel. Cas souvent rencontré au brevet.',
        hint: 'Noms collectifs (majorité, groupe, foule, ensemble…) → accord possible au singulier ou pluriel selon le sens.',
      },
      {
        id: '4-0-2', type: 'vrai_faux',
        question: 'Dans « Ni lui ni elle ne viendront. », le verbe est au pluriel car il y a deux sujets.',
        answer: 'vrai',
        explanation: 'Avec « ni… ni… » qui relie deux sujets, le verbe se met généralement au pluriel : « ni lui ni elle ne viendront ». Si les deux sujets sont au singulier et forment une alternative exclusive, le singulier est aussi acceptable.',
        hint: 'Ni…ni + deux sujets → pluriel généralement. Ex : « ni le chat ni le chien ne dort » (acceptable) / « ne dorment » (plus courant).',
      },
      {
        id: '4-0-3', type: 'qcm',
        question: '« Chacun de ces enfants ___ sa chance. » Quelle est la forme correcte ?',
        options: ['a', 'ont', 'Les deux', 'avons'],
        answer: 'a',
        explanation: '« Chacun » est toujours singulier, même s\'il est suivi d\'un complément pluriel. « Chacun a sa chance. » De même : « chacun de ces élèves A répondu » (et non ont).',
        hint: 'Chacun / chaque → toujours singulier.',
      },
      {
        id: '4-0-4', type: 'completer',
        question: 'Dans « Ce sont eux qui ___ (décider) de tout. », conjugue le verbe : ce sont eux qui ___.',
        answer: 'décident',
        explanation: '« Ce sont eux qui décident » : le pronom relatif « qui » reprend « eux » (3e pers. pluriel) → verbe au pluriel. Piège : « c\'est moi qui décide » (1re pers. sing.), « c\'est toi qui décides » (2e pers. sing.).',
        hint: 'C\'est + pronom + qui → le verbe après « qui » s\'accorde avec le pronom.',
      },
    ]
  },

  '4-1': { // Mar 28 juil. — Accord PP (cas complexes)
    exercises: [
      {
        id: '4-1-1', type: 'qcm',
        question: 'Dans « La chanson que j\'ai entendu___ hier était magnifique. » Faut-il un accord ?',
        options: [
          'Non, car l\'auxiliaire est « avoir »',
          'Oui : entendue — car le COD « que » (= la chanson, féminin) est avant le verbe',
          'Non, car « hier » indique que l\'action est révolue',
          'Non, car « magnifique » fait déjà l\'accord',
        ],
        answer: 'Oui : entendue — car le COD « que » (= la chanson, féminin) est avant le verbe',
        explanation: 'Règle : avec auxiliaire AVOIR, le PP s\'accorde avec le COD si le COD est AVANT le verbe. « Que » = la chanson (féminin singulier) est avant « ai entendu » → entendue.',
        hint: 'Identifier le COD, puis vérifier s\'il est AVANT le verbe. Si oui → accord. Si après → pas d\'accord.',
      },
      {
        id: '4-1-2', type: 'vrai_faux',
        question: 'Dans « Elle s\'est lavé les mains. », le PP « lavé » ne s\'accorde pas.',
        answer: 'vrai',
        explanation: 'Piège classique ! Le COD est « les mains » (après le verbe) → pas d\'accord. Si le COD était avant : « Les mains qu\'elle s\'est lavées ». Avec les verbes pronominaux, on cherche si le pronom réfléchi (se) EST le COD : ici, « se laver les mains » → se = COI (à qui ?) → pas d\'accord.',
        hint: 'Verbe pronominal : si le pronom se est COD = accord. Si se est COI = pas d\'accord (cherche le COD ailleurs).',
      },
      {
        id: '4-1-3', type: 'qcm',
        question: 'Dans « Ils se sont téléphoné. », le PP « téléphoné » s\'accorde-t-il ?',
        options: [
          'Oui : téléphonés',
          'Non : téléphoné (invariable)',
          'Oui si les sujets sont féminins',
          'Cela dépend du contexte',
        ],
        answer: 'Non : téléphoné (invariable)',
        explanation: '« Se téléphoner » = téléphoner À quelqu\'un. Le pronom « se » est COI (on téléphone À quelqu\'un). Donc pas d\'accord. De même : se parler, se dire, se nuire, se ressembler → PP invariable.',
        hint: 'Verbes dont la construction normale = COI : se téléphoner, se parler, se nuire, s\'écrire → PP invariable.',
      },
      {
        id: '4-1-4', type: 'completer',
        question: 'Dans « Les lettres qu\'il m\'a écr___ étaient longues. », écris la terminaison correcte du PP.',
        answer: 'ites',
        explanation: '« Que » reprend « les lettres » (féminin pluriel) et est COD placé AVANT le verbe → accord : écrITES (féminin pluriel du PP de « écrire »).',
        hint: 'PP de écrire = écrit, écrite, écrits, écrites selon le genre et le nombre du COD avant.',
      },
    ]
  },

  '4-2': { // Mer 29 juil. — Subjonctif + Impératif
    exercises: [
      {
        id: '4-2-1', type: 'qcm',
        question: 'Quelle phrase requiert le subjonctif ?',
        options: [
          '« Je crois qu\'il ___ (venir). »',
          '« Il est probable qu\'il ___ (venir). »',
          '« Il est certain qu\'il ___ (venir). »',
          '« Je suis sûr qu\'il ___ (venir). »',
        ],
        answer: '« Il est probable qu\'il ___ (venir). »',
        explanation: '« Il est probable que » + subjonctif (doute). Piège : « il est certain que », « je crois que », « je suis sûr que » + indicatif (pas de doute). « Il faut que », « il est douteux que », « il est possible que » → subjonctif.',
        hint: 'Certitude / affirmation → indicatif. Doute / volonté / sentiment → subjonctif.',
      },
      {
        id: '4-2-2', type: 'completer',
        question: 'Conjugue « prendre » au subjonctif présent, 3e pers. du pluriel : qu\'ils ___.',
        answer: 'prennent',
        explanation: '« Prendre » au subjonctif présent : que je prenne, que tu prennes, qu\'il prenne, que nous prenions, que vous preniez, QU\'ILS PRENNENT. Le radical est « prenn- » (différent du présent ils prennent = même forme ici, mais pas toujours).',
        hint: 'Subjonctif présent : base souvent la même que la 3e pers. pluriel du présent. Irréguliers : aller → aille, avoir → ait, être → soit.',
      },
      {
        id: '4-2-3', type: 'vrai_faux',
        question: 'À l\'impératif, « va » ne prend pas de « s », sauf devant « y » : « Vas-y ! »',
        answer: 'vrai',
        explanation: 'Règle de l\'impératif des verbes du 1er groupe : pas de « s » à la 2e pers. du sing. → va, mange, parle. EXCEPTION : devant « y » ou « en » (liaison) → vas-y, manges-en, parles-en (le « s » permet la liaison).',
      },
    ]
  },

  '4-3': { // Jeu 30 juil. — Homophones (niveau brevet)
    exercises: [
      {
        id: '4-3-1', type: 'qcm',
        question: 'Complète : « ___ nuit, il se leva et ___ rendit compte qu\'il ___ était plus seul. »',
        options: [
          'Cette / ce / n\'',
          'Cet / se / n\'',
          'Cette / se / n\'',
          'Cet / ce / n\'',
        ],
        answer: 'Cette / se / n\'',
        explanation: '« Cette nuit » (déterminant démonstratif féminin). « se rendit » (pronom réfléchi, verbe pronominal). « n\'était plus » (ne… plus = négation). Piège triple classique de dictée.',
        hint: 'Cette = déterminant féminin. Se = pronom réfléchi. N\' = négation devant voyelle.',
      },
      {
        id: '4-3-2', type: 'vrai_faux',
        question: 'On peut distinguer « quand » / « qu\'en » / « cant » en testant avec « lorsque » : si ça marche, c\'est « quand ».',
        answer: 'vrai',
        explanation: 'Test : remplace par « lorsque » → si la phrase tient = QUAND. « Qu\'en » = que + en (pronom). Ex : « Qu\'en penses-tu ? » → « De cela que penses-tu ? ». Il n\'existe pas de mot « cant » en français (seulement en anglais).',
        hint: 'Quand = lorsque (temps / condition). Qu\'en = que + en. Kant = le philosophe (majuscule).',
      },
      {
        id: '4-3-3', type: 'completer',
        question: 'Complète : « Je ne sais pas ___ (si/s\'y) tu t\'y connais, mais moi, je m\'y perds. »',
        answer: 'si',
        explanation: '« Si » = conjonction de subordination (condition / interrogation indirecte). « S\'y » = se + y (pronom réfléchi + pronom). Test : « je ne sais pas SI tu t\'y connais » = interrogation indirecte → SI.',
        hint: 'Si = conjonction (condition, interro. indirecte). S\'y = pronom réfléchi + y.',
      },
    ]
  },

  '4-4': { // Ven 31 juil. — Rédaction 2 + Dictée 5
    exercises: [
      {
        id: '4-4-1', type: 'qcm',
        question: 'Dans quel ordre faut-il relire une dictée ?',
        options: [
          'D\'abord mot à mot, puis pour le sens global',
          'D\'abord pour le sens global, puis mot à mot en vérifiant chaque accord',
          'On commence par les verbes, puis les noms',
          'L\'ordre n\'a pas d\'importance',
        ],
        answer: 'D\'abord pour le sens global, puis mot à mot en vérifiant chaque accord',
        explanation: '1re relecture : sens global (vérifier la cohérence). 2e relecture : MOT À MOT, vérifier chaque accord (sujet/verbe, PP, adjectifs, homophones). Procède par groupes de sens : le GN, puis le GV.',
      },
      {
        id: '4-4-2', type: 'vrai_faux',
        question: 'On peut écrire « quoique » en un seul mot et « bien que » en deux mots.',
        answer: 'vrai',
        explanation: '« Quoique » (un mot = conjonction de concession, + subjonctif) est différent de « quoi que » (deux mots = pronom relatif, « quoi que tu fasses »). « Bien que » s\'écrit toujours en deux mots.',
        hint: 'Quoique (un mot) = bien que (+ subj.). Quoi que (deux mots) = « quelle que soit la chose que ».',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 6 — Analyse littéraire ⭐⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '5-0': { // Lun 3 août — Analyse de texte (niveau brevet)
    exercises: [
      {
        id: '5-0-1', type: 'qcm',
        question: 'Voici un extrait : « La nuit tombait sur la ville. Les lumières s\'allumaient une à une, timides et tremblantes comme des étoiles naissantes. » Quelle figure de style est utilisée ?',
        options: ['Métaphore', 'Hyperbole', 'Comparaison', 'Personnification'],
        answer: 'Comparaison',
        explanation: '« comme des étoiles naissantes » utilise l\'outil de comparaison « comme » → c\'est une COMPARAISON (et non une métaphore, qui n\'aurait pas l\'outil). Les lumières = le comparé ; les étoiles = le comparant ; comme = l\'outil.',
        method: 'Pour identifier la figure : cherche si il y a un outil (comme, tel, ainsi que…) → comparaison. Sans outil → métaphore.',
      },
      {
        id: '5-0-2', type: 'vrai_faux',
        question: 'Dans l\'extrait ci-dessus, « les lumières s\'allumaient » est une personnification.',
        answer: 'vrai',
        explanation: 'Les lumières n\'ont pas de volonté propre pour « s\'allumer » comme des êtres animés. Attribuer cette action à des lumières est une PERSONNIFICATION (elles agissent comme des êtres vivants).',
      },
      {
        id: '5-0-3', type: 'qcm',
        question: 'Dans un texte au point de vue omniscient, le narrateur peut :',
        options: [
          'Seulement décrire les actions extérieures',
          'Raconter les pensées et sentiments de TOUS les personnages',
          'Raconter uniquement ce que voit le héros',
          'Ne pas être présent dans le texte',
        ],
        answer: 'Raconter les pensées et sentiments de TOUS les personnages',
        explanation: 'Point de vue omniscient = narrateur « tout-sachant » : il connaît les pensées, le passé, l\'avenir de tous les personnages. C\'est le point de vue le plus courant dans les romans du 19e siècle (Balzac, Hugo).',
      },
      {
        id: '5-0-4', type: 'completer',
        question: 'L\'accumulation de termes négatifs dans un texte peut créer un effet de ___ ou de ___.',
        answer: 'pessimisme / désespoir',
        explanation: 'En analyse littéraire, repérer les champs lexicaux négatifs (mort, tristesse, désespoir…) permet d\'identifier le registre pathétique ou tragique. L\'accumulation de ces termes intensifie l\'effet.',
        hint: 'Champ lexical négatif → registre pathétique, tragique, lyrique de la mélancolie.',
      },
    ]
  },

  '5-1': { // Mar 4 août — Figures de style avancées
    exercises: [
      {
        id: '5-1-1', type: 'qcm',
        question: 'Identifie la figure dans : « Ce silence qui criait. »',
        options: ['Comparaison', 'Oxymore', 'Hyperbole', 'Métonymie'],
        answer: 'Oxymore',
        explanation: 'L\'OXYMORE (ou alliance de mots) associe deux termes contradictoires : « silence » (absence de son) + « criait » (son fort). L\'effet : créer une tension, une contradiction qui force le lecteur à réfléchir.',
        method: 'Oxymore = deux mots contradictoires dans le même groupe. Ex : une obscure clarté, un bruit silencieux.',
      },
      {
        id: '5-1-2', type: 'qcm',
        question: 'Dans « Le Palais-Royal appartient aux spectateurs de la pièce. » (= aux amateurs de théâtre), quelle figure est utilisée ?',
        options: ['Métaphore', 'Métonymie', 'Hyperbole', 'Comparaison'],
        answer: 'Métonymie',
        explanation: 'La MÉTONYMIE remplace un mot par un autre qui entretient un lien de contiguïté : le lieu (Palais-Royal) pour les gens qui y vont. Autres exemples : « boire un verre » (le contenu pour le contenant), « lire Balzac » (l\'auteur pour l\'œuvre).',
        hint: 'Métonymie = remplacement par contigüité. Métaphore = remplacement par analogie (ressemblance).',
      },
      {
        id: '5-1-3', type: 'vrai_faux',
        question: 'L\'anaphore est la répétition d\'un mot ou groupe de mots en début de plusieurs phrases ou vers.',
        answer: 'vrai',
        explanation: 'ANAPHORE = répétition au début. Ex : « Je mourrai d\'avoir aimé. / Je mourrai d\'avoir espéré. / Je mourrai… » (Éluard). Effet : insistance, rythme, emphase. Différent de l\'épiphore (répétition en fin de vers).',
        hint: 'Anaphore = début. Épiphore = fin. Les deux sont des figures de répétition.',
      },
      {
        id: '5-1-4', type: 'completer',
        question: 'Dans « Il a un courage de lion », la figure utilisée est une ___ introduite par la préposition « de ».',
        answer: 'comparaison',
        explanation: 'Cette figure est une comparaison elliptique (sans outil explicite comme « comme » mais avec « de ») : « courage de lion » = courageux comme un lion. Parfois appelée comparaison nominale.',
        hint: 'Comparaison avec « de » : un courage de lion, une mémoire d\'éléphant, des yeux de chat.',
      },
    ]
  },

  '5-2': { // Mer 5 août — Registres littéraires
    exercises: [
      {
        id: '5-2-1', type: 'qcm',
        question: 'Quel registre est dominant dans : « La mort de ma mère m\'a brisé. Cette absence déchirait chaque instant. Tout me rappelait son rire. » ?',
        options: ['Comique', 'Épique', 'Pathétique', 'Fantastique'],
        answer: 'Pathétique',
        explanation: 'Le registre PATHÉTIQUE provoque la pitié et l\'émotion chez le lecteur, en décrivant une souffrance intense. Champ lexical de la douleur : « brisé », « absence », « déchirait ». Différent du lyrique (sentiment personnel de l\'auteur) et du tragique (destin fatal inévitable).',
        method: 'Repère le champ lexical dominant et l\'effet visé : pitié → pathétique. Destin inévitable → tragique. Sentiments personnels → lyrique. Héroïsme grandiose → épique.',
      },
      {
        id: '5-2-2', type: 'vrai_faux',
        question: 'Un même texte peut relever à la fois du registre ironique et du registre comique.',
        answer: 'vrai',
        explanation: 'L\'ironie et le comique sont souvent mêlés. L\'ironie dit le contraire de ce qu\'on pense pour se moquer (registre ironique). Le comique provoque le rire par différents procédés (situation, mots, gestes). Un auteur comme Molière mêle souvent les deux.',
      },
      {
        id: '5-2-3', type: 'qcm',
        question: 'Lequel de ces textes relève du registre ÉPIQUE ?',
        options: [
          '« Il pleurait doucement. Ses larmes coulaient sans bruit. »',
          '« Soudain, mille soldats s\'élancèrent comme un tonnerre sur l\'ennemi. »',
          '« L\'araignée prit son café, s\'essuya la bouche et dit "bonjour". »',
          '« Et si demain n\'existait pas ? »',
        ],
        answer: '« Soudain, mille soldats s\'élancèrent comme un tonnerre sur l\'ennemi. »',
        explanation: 'Le registre ÉPIQUE glorifie les exploits héroïques, les batailles et les actions grandioses, souvent avec des hyperboles et des comparaisons. Caractéristiques : actions collectives, héroïsme, grandeur.',
        hint: 'Épique = exploits, héros, grandiose. Pathétique = souffrance. Comique = rire. Fantastique = surnaturel.',
      },
    ]
  },

  '5-3': { // Jeu 6 août — Vocabulaire niveau brevet
    exercises: [
      {
        id: '5-3-1', type: 'qcm',
        question: 'Quel est le sens du suffixe « -phobe » dans « claustrophobe » ?',
        options: [
          'Qui aime les espaces fermés',
          'Qui craint / a peur des espaces fermés',
          'Qui vit dans les espaces fermés',
          'Qui étudie les espaces fermés',
        ],
        answer: 'Qui craint / a peur des espaces fermés',
        explanation: '« -phobe » vient du grec « phobos » (= peur). Autres : xénophobe (peur des étrangers), agoraphobe (peur des espaces ouverts). À l\'opposé, « -phile » = qui aime.',
        hint: '-phobe = peur. -phile = amour. -graphe = qui écrit. -logue = qui étudie.',
      },
      {
        id: '5-3-2', type: 'completer',
        question: 'Le mot « bibliophile » désigne quelqu\'un qui aime les ___ .',
        answer: 'livres',
        explanation: '« Biblio- » (du grec « biblion ») = livre. Bibliophile = qui aime les livres. Bibliothèque = lieu des livres. Bible = « le livre ». Bibliographie = liste d\'ouvrages.',
        hint: 'Biblio- = livre (grec). Photo- = lumière. Chrono- = temps. Géo- = terre.',
      },
      {
        id: '5-3-3', type: 'qcm',
        question: 'Quel niveau de langue est utilisé dans « Il s\'est tiré sans dire au revoir » ?',
        options: ['Soutenu', 'Courant', 'Familier', 'Argotique'],
        answer: 'Familier',
        explanation: '« Se tirer » (= partir) est une expression du niveau familier. En niveau courant : « Il est parti sans dire au revoir ». En niveau soutenu : « Il prit congé sans formule d\'adieu ». Le niveau argotique serait encore plus relâché.',
      },
    ]
  },

  '5-4': { // Ven 7 août — Lecture 3 + Dictée 6
    exercises: [
      {
        id: '5-4-1', type: 'qcm',
        question: 'Dans un texte descriptif, quel procédé crée un effet de mouvement dans la description ?',
        options: [
          'L\'usage exclusif des adjectifs',
          'L\'emploi de verbes d\'action au présent ou à l\'imparfait',
          'La multiplication des noms abstraits',
          'L\'absence de ponctuation',
        ],
        answer: 'L\'emploi de verbes d\'action au présent ou à l\'imparfait',
        explanation: 'Une description statique n\'use que d\'adjectifs. Pour la dynamiser, l\'auteur emploie des verbes d\'action (briller, courir, tournoyer…) à l\'imparfait (durée) ou au présent de description. C\'est un procédé d\'écriture à connaître pour la rédaction.',
      },
      {
        id: '5-4-2', type: 'vrai_faux',
        question: 'On écrit « quelque » (en un mot) dans « quelque difficile que soit la tâche ».',
        answer: 'vrai',
        explanation: '« Quelque… que » (= si difficile que soit) est une locution conjonctive invariable (concession). Elle s\'écrit en un seul mot. À distinguer de « quelques » (déterminant indéfini pluriel : quelques jours).',
        hint: 'Quelque + adj + que + subjonctif = concession invariable. Quelques + nom = déterminant pluriel.',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 7 — Argumentation et expression ⭐⭐⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '6-0': { // Lun 10 août — Argumentation : thèse, arguments, exemples
    exercises: [
      {
        id: '6-0-1', type: 'qcm',
        question: 'Dans un texte argumentatif, quelle est la différence entre un argument et un exemple ?',
        options: [
          'Ils sont synonymes',
          'L\'argument est une raison abstraite/logique ; l\'exemple illustre concrètement l\'argument',
          'L\'exemple vient toujours avant l\'argument',
          'L\'argument est une citation, l\'exemple un fait',
        ],
        answer: 'L\'argument est une raison abstraite/logique ; l\'exemple illustre concrètement l\'argument',
        explanation: 'Structure : THÈSE (position) → ARGUMENT (raison pour défendre la thèse) → EXEMPLE (fait concret, statistique, référence littéraire…). L\'argument répond à « Pourquoi ? », l\'exemple répond à « Par exemple… ».',
        method: 'Formule : « Parce que [argument], comme en témoigne [exemple]. »',
      },
      {
        id: '6-0-2', type: 'vrai_faux',
        question: 'Dans un texte argumentatif, la concession est une technique de faiblesse (admettre l\'argument adverse).',
        answer: 'faux',
        explanation: 'Au contraire ! La concession montre la MATURITÉ de la réflexion. « Certes, X est vrai, MAIS… » montre qu\'on a considéré l\'autre avis avant de le réfuter. Les correcteurs du brevet valorisent cette technique.',
        hint: 'Concession = stratégie rhétorique efficace, pas une faiblesse. Formule : Certes… / Il est vrai que… / On pourrait objecter que… → MAIS / Cependant / Néanmoins…',
      },
      {
        id: '6-0-3', type: 'qcm',
        question: 'Quel connecteur logique introduit une OPPOSITION (pas une concession) ?',
        options: ['certes', 'cependant', 'en revanche', 'bien que'],
        answer: 'en revanche',
        explanation: '« En revanche » introduit une opposition directe (deux réalités contraires sans lien de conséquence). « Cependant », « néanmoins » introduisent des concessions (on a admis quelque chose puis on y oppose). « Bien que » introduit une subordonnée de concession.',
        hint: 'Opposition pure → en revanche, par contre. Concession → certes…mais, cependant, néanmoins.',
      },
      {
        id: '6-0-4', type: 'completer',
        question: 'Dans la formule argumentative « [Thèse]. En effet, [Argument]. Ainsi, [Exemple]. » le connecteur « en effet » introduit ___.',
        answer: 'la cause / l\'argument',
        explanation: '« En effet » introduit une explication ou une justification. C\'est un connecteur de CAUSE/EXPLICATION. « Ainsi » introduit l\'exemple ou la conséquence. « Or » introduit une nuance ou un fait nouveau.',
        hint: 'En effet / car → explication. Ainsi / par exemple → illustration. Or → nuance/constat.',
      },
    ]
  },

  '6-1': { // Mar 11 août — Convaincre et persuader
    exercises: [
      {
        id: '6-1-1', type: 'qcm',
        question: 'Quelle est la différence entre CONVAINCRE et PERSUADER ?',
        options: [
          'Ils sont synonymes',
          'Convaincre s\'adresse à la raison (arguments logiques) ; persuader s\'adresse aux émotions',
          'Persuader s\'adresse à la raison ; convaincre s\'adresse aux émotions',
          'Persuader concerne l\'écrit, convaincre l\'oral',
        ],
        answer: 'Convaincre s\'adresse à la raison (arguments logiques) ; persuader s\'adresse aux émotions',
        explanation: 'CONVAINCRE = démonstration logique, raisonnement, preuves. PERSUADER = appel aux émotions, images, figures rhétoriques, exemples touchants. Un bon texte argumentatif combine les deux.',
        hint: 'Convaincre → logos (raison). Persuader → pathos (émotion) + ethos (crédibilité de l\'auteur).',
      },
      {
        id: '6-1-2', type: 'vrai_faux',
        question: 'Une question rhétorique (comme « Qui pourrait s\'y opposer ? ») n\'attend pas de réponse et vise à impliquer le lecteur.',
        answer: 'vrai',
        explanation: 'La question rhétorique (ou oratoire) est posée non pour obtenir une réponse, mais pour affirmer fortement une idée ou impliquer le lecteur. Effet : le lecteur est pris à témoin et forcé de réfléchir.',
        hint: 'Question rhétorique = ne demande pas de réponse, mais affirme ou implique implicitement une thèse.',
      },
      {
        id: '6-1-3', type: 'qcm',
        question: 'Dans « Comment ne pas voir que cette situation est injuste ? », quel procédé rhétorique est utilisé ?',
        options: ['Hyperbole', 'Question rhétorique', 'Anaphore', 'Métaphore'],
        answer: 'Question rhétorique',
        explanation: 'C\'est une question rhétorique : elle implique qu\'il est évident que la situation est injuste — la réponse est incluse dans la question. L\'auteur force le lecteur à partager son point de vue.',
      },
      {
        id: '6-1-4', type: 'completer',
        question: 'Dans une rédaction argumentative, le plan thèse → antithèse → synthèse s\'appelle le plan ___.',
        answer: 'dialectique',
        explanation: 'Le plan DIALECTIQUE (ou plan en trois parties) : thèse (1re idée) → antithèse (idée opposée) → synthèse (dépassement, nuance). C\'est le plan le plus attendu au brevet pour un sujet « Pensez-vous que… ».',
        hint: 'Dialectique = thèse / antithèse / synthèse. Analytique = présentation d\'aspects différents. Progressif = du moins important au plus important.',
      },
    ]
  },

  '6-2': { // Mer 12 août — Analyse d'un texte complet
    exercises: [
      {
        id: '6-2-1', type: 'qcm',
        question: 'Pour analyser le point de vue d\'un auteur sur un texte de presse, quelle question faut-il d\'abord se poser ?',
        options: [
          'Quelle est la longueur du texte ?',
          'Quelle est la thèse défendue, et quels arguments l\'auteur utilise-t-il ?',
          'Combien de paragraphes y a-t-il ?',
          'Quel est le titre ?',
        ],
        answer: 'Quelle est la thèse défendue, et quels arguments l\'auteur utilise-t-il ?',
        explanation: 'Analyser un texte argumentatif = 1) identifier la thèse (position de l\'auteur) ; 2) repérer les arguments (pourquoi ?) ; 3) analyser les exemples (comment il illustre) ; 4) identifier les procédés rhétoriques (comment il convainc/persuade).',
      },
      {
        id: '6-2-2', type: 'vrai_faux',
        question: 'Dans une analyse de texte au brevet, répondre « oui » ou « non » sans développer est toujours insuffisant.',
        answer: 'vrai',
        explanation: 'Le brevet attend des réponses développées, avec citation du texte et explication. Une réponse d\'une ligne ne rapporte jamais les points maximum. Format attendu : affirmation + citation entre guillemets avec ligne + explication.',
      },
      {
        id: '6-2-3', type: 'completer',
        question: 'Quand on répond à une question sur un texte littéraire, on doit toujours appuyer sa réponse par une ___ du texte.',
        answer: 'citation',
        explanation: 'La CITATION entre guillemets avec référence à la ligne est indispensable. Format : « Comme l\'indique le texte, "[citation exacte]" (l. X), on peut noter que… » C\'est une exigence constante du brevet.',
        hint: 'Citation = guillemets + référence ligne. Exemple : "le soleil se couchait lentement" (l. 12).',
      },
    ]
  },

  '6-3': { // Jeu 13 août — Genres et mouvements littéraires
    exercises: [
      {
        id: '6-3-1', type: 'qcm',
        question: 'Quel mouvement littéraire cherche à reproduire la réalité avec exactitude, sans l\'embellir ni la critiquer ?',
        options: ['Romantisme', 'Réalisme', 'Symbolisme', 'Surréalisme'],
        answer: 'Réalisme',
        explanation: 'Le RÉALISME (19e siècle : Flaubert, Maupassant, Zola) cherche à représenter le monde tel qu\'il est, avec précision. Le Romantisme idéalise et exalte les sentiments. Le Symbolisme utilise des symboles. Le Surréalisme explore l\'inconscient.',
        hint: 'Réalisme = reflet exact de la réalité. Romantisme = sentiments exaltés, nature comme miroir de l\'âme.',
      },
      {
        id: '6-3-2', type: 'vrai_faux',
        question: 'Une nouvelle est toujours plus courte qu\'un roman et se termine souvent par un retournement ou une chute.',
        answer: 'vrai',
        explanation: 'La NOUVELLE est un récit court, centré sur un seul événement ou personnage, avec souvent une « chute » (fin inattendue) qui donne du sens à tout le récit. Ex : Maupassant, Mérimée. À distinguer du roman (plus long, plus complexe).',
      },
      {
        id: '6-3-3', type: 'qcm',
        question: 'Dans quel type de texte trouve-t-on le plus souvent le registre FANTASTIQUE ?',
        options: [
          'Le rapport scientifique',
          'Le récit dans lequel le lecteur hésite entre une explication naturelle et surnaturelle',
          'Le poème épique',
          'L\'article de presse politique',
        ],
        answer: 'Le récit dans lequel le lecteur hésite entre une explication naturelle et surnaturelle',
        explanation: 'Le fantastique (Todorov) naît de l\'hésitation entre une explication rationnelle et une explication surnaturelle d\'un phénomène étrange. Si l\'explication surnaturelle est acceptée → merveilleux. Si elle est refusée → étrange.',
        hint: 'Fantastique = hésitation (est-ce réel ou non ?). Merveilleux = surnaturel accepté. Étrange = explication rationnelle trouvée.',
      },
    ]
  },

  '6-4': { // Ven 14 août — Rédaction 3 + Dictée 7
    exercises: [
      {
        id: '6-4-1', type: 'qcm',
        question: 'Pour introduire une rédaction sur le thème « La lecture vous paraît-elle utile ? », quelle est la meilleure accroche ?',
        options: [
          '« Je vais vous parler de la lecture dans cette rédaction. »',
          '« Victor Hugo écrivait : "Celui qui ouvre une école ferme une prison." »',
          '« Oui, la lecture est utile parce qu\'elle développe la culture. »',
          '« La lecture, c\'est bien. »',
        ],
        answer: '« Victor Hugo écrivait : "Celui qui ouvre une école ferme une prison." »',
        explanation: 'Une bonne introduction commence par une accroche (citation, question, anecdote, paradoxe). La citation de Victor Hugo est percutante et en lien avec le thème. Les autres options sont trop directes, trop banales ou insuffisantes.',
        hint: 'Accroche efficace : citation d\'auteur, question rhétorique, fait surprenant, paradoxe. Jamais commencer par « Je vais vous parler de ».',
      },
      {
        id: '6-4-2', type: 'completer',
        question: 'Dans une rédaction, la conclusion doit toujours répondre à ___ posée en introduction et ouvrir sur une ___.',
        answer: 'la question / perspective',
        explanation: 'La conclusion : 1) bilan (réponse à la question posée) ; 2) ouverture sur un sujet connexe ou plus large. Ex : si le sujet parle de lecture, ouvrir sur l\'écriture, l\'éducation ou le numérique.',
        hint: 'Conclusion = bilan + ouverture. Jamais de nouvel argument en conclusion.',
      },
    ]
  },

  // ════════════════════════════════════════════════════════════
  // SEMAINE 8 — Niveau brevet 2026 ⭐⭐⭐⭐⭐
  // ════════════════════════════════════════════════════════════

  '7-0': { // Lun 17 août — Grammaire brevet (analyse de phrase)
    exercises: [
      {
        id: '7-0-1', type: 'qcm',
        question: 'Analysez la phrase : « Malgré la pluie battante, les enfants que leurs parents attendaient jouaient encore dans la boue. » Combien de propositions ?',
        options: ['1', '2', '3', '4'],
        answer: '3',
        explanation: '3 verbes conjugués = 3 propositions : 1) « attendaient » (proposition relative « que leurs parents attendaient »). 2) « jouaient » (principale). « Malgré la pluie battante » est un groupe prépositionnel (non une proposition car pas de verbe conjugué).',
        hint: 'Compte les verbes conjugués. Les groupes prépositionnels sans verbe conjugué ne sont pas des propositions.',
      },
      {
        id: '7-0-2', type: 'qcm',
        question: 'Dans la phrase ci-dessus, quelle est la fonction du GN « Malgré la pluie battante » ?',
        options: [
          'Sujet',
          'Complément circonstanciel de concession',
          'Complément du nom',
          'COD',
        ],
        answer: 'Complément circonstanciel de concession',
        explanation: '« Malgré » introduit un CC de concession (= bien qu\'il pleuve). On peut le déplacer ou supprimer → c\'est bien un CC. La préposition « malgré » + GN exprime l\'opposition/concession.',
        hint: 'Malgré = préposition de concession. Le groupe qu\'elle introduit = CC de concession.',
      },
      {
        id: '7-0-3', type: 'completer',
        question: 'Dans « C\'est une décision que je regrettais d\'avoir prise. », le PP « prise » s\'accorde avec ___ car ___.',
        answer: 'que (= la décision, féminin) / le COD est placé avant le verbe',
        explanation: '« Que » reprend « une décision » (féminin singulier) et est COD de « avoir pris » → le COD est avant le verbe → accord : PRISE. Double piège : PP lointain + infinitif passé.',
        hint: 'Même avec un infinitif passé (avoir pris), la règle du COD avant le verbe s\'applique.',
      },
      {
        id: '7-0-4', type: 'vrai_faux',
        question: 'Dans « Je l\'ai entendu chanter. », le PP « entendu » ne s\'accorde pas car le pronom est COD de l\'infinitif.',
        answer: 'vrai',
        explanation: 'Règle spéciale des verbes de perception (entendre, voir, sentir, regarder…) + infinitif : si le pronom est sujet de l\'infinitif (il chante lui-même), le PP ne s\'accorde pas. Si le pronom est COD du PP (je l\'ai entendu = j\'ai entendu lui), il faut regarder si le pronom fait l\'action ou la subit.',
        hint: 'Entendu chanter = il est celui qui chante. Le pronom est sujet de l\'infinitif → PP invariable.',
      },
    ]
  },

  '7-1': { // Mar 18 août — Exercices style brevet
    exercises: [
      {
        id: '7-1-1', type: 'qcm',
        question: 'Lisez cet extrait : « L\'homme marchait lentement, courbé sous le poids des années. Ses mains tremblaient, ses yeux cherchaient en vain un visage familier. » Quel registre littéraire domine ?',
        options: ['Épique', 'Comique', 'Pathétique', 'Fantastique'],
        answer: 'Pathétique',
        explanation: 'Champ lexical de la souffrance et du déclin : « courbé sous le poids des années », « tremblaient », « en vain ». L\'accumulation de détails physiologiques créant la pitié → registre PATHÉTIQUE.',
      },
      {
        id: '7-1-2', type: 'qcm',
        question: 'Dans l\'extrait ci-dessus, identifiez la figure de style dans « courbé sous le poids des années ».',
        options: ['Comparaison', 'Métaphore', 'Personnification', 'Anaphore'],
        answer: 'Métaphore',
        explanation: '« Le poids des années » = MÉTAPHORE : le temps (les années) est comparé implicitement à un poids (fardeau physique), sans outil comparatif. L\'effet : visualiser le vieillissement comme un écrasement physique.',
      },
      {
        id: '7-1-3', type: 'vrai_faux',
        question: 'Dans le même extrait, « ses mains tremblaient, ses yeux cherchaient » = une anaphore du pronom possessif « ses ».',
        answer: 'vrai',
        explanation: 'L\'anaphore de « ses » (répétition en début de proposition) renforce l\'attention sur les détails physiques du personnage et crée un rythme qui insiste sur sa désolation.',
      },
      {
        id: '7-1-4', type: 'completer',
        question: 'Dans « ses yeux cherchaient en vain un visage familier », l\'adverbe « en vain » appartient au champ lexical de ___.',
        answer: 'l\'échec / la désolation',
        explanation: '« En vain » = sans résultat, inutilement. Il renforce l\'effet pathétique en soulignant l\'inutilité et la solitude du personnage. Champ lexical : perte, vide, absence, désespoir.',
      },
    ]
  },

  '7-2': { // Mer 19 août — Méthodes brevet complètes
    exercises: [
      {
        id: '7-2-1', type: 'qcm',
        question: 'Quelle réponse est la MIEUX RÉDIGÉE pour la question : « Quel sentiment le narrateur éprouve-t-il face à la mer ? » ?',
        options: [
          'Il est content.',
          'Le narrateur éprouve de l\'admiration.',
          'Le narrateur éprouve une admiration mêlée d\'effroi, comme l\'indique « cette beauté terrible » (l. 8) qui associe paradoxalement la splendeur et la menace.',
          'La mer lui fait peur, c\'est magnifique mais effrayant.',
        ],
        answer: 'Le narrateur éprouve une admiration mêlée d\'effroi, comme l\'indique « cette beauté terrible » (l. 8) qui associe paradoxalement la splendeur et la menace.',
        explanation: 'La meilleure réponse : 1) répond précisément à la question ; 2) cite le texte entre guillemets avec la ligne ; 3) analyse le procédé (oxymore, paradoxe) ; 4) explique l\'effet. C\'est le niveau attendu au brevet pour obtenir les points maximum.',
      },
      {
        id: '7-2-2', type: 'vrai_faux',
        question: 'Pour la question de grammaire « Donnez la classe et la fonction de... », il faut toujours donner les DEUX informations.',
        answer: 'vrai',
        explanation: 'Classe = nature (pronom relatif, adjectif qualificatif…). Fonction = rôle dans la phrase (sujet, COD, épithète…). Si la question demande les deux, une réponse partielle perd systématiquement la moitié des points.',
        hint: 'Classe : ce que le mot EST. Fonction : ce que le mot FAIT dans la phrase.',
      },
    ]
  },

  '7-3': { // Jeu 20 août — Entraînement final toutes compétences
    exercises: [
      {
        id: '7-3-1', type: 'qcm',
        question: 'Dans « Bien des chercheurs ont consacré leur vie à cette question. », quelle est la fonction de « Bien des chercheurs » ?',
        options: [
          'COD',
          'Sujet de « ont consacré »',
          'CC de quantité',
          'Attribut du sujet',
        ],
        answer: 'Sujet de « ont consacré »',
        explanation: '« Bien des chercheurs » est le SUJET. « Bien des » = locution déterminative (= beaucoup de). L\'accord du verbe se fait au pluriel (chercheurs = pluriel). Piège : « bien » peut sembler un adverbe mais ici c\'est une locution déterminative.',
      },
      {
        id: '7-3-2', type: 'completer',
        question: 'Dans la phrase « On ne saurait trop insister sur ce point. », le modal « ne… saurait » exprime ___.',
        answer: 'l\'impossibilité (nuance) / le conditionnel de valeur',
        explanation: '« Ne saurait + infinitif » = construction formelle signifiant « ne peut pas / ne pourrait pas ». C\'est un conditionnel à valeur modale (politesse soutenue, impossibilité nuancée). Registre : soutenu/littéraire.',
        hint: 'Savoir + infinitif = pouvoir (registre soutenu). « Je ne saurais vous dire » = je ne peux pas vous dire.',
      },
      {
        id: '7-3-3', type: 'qcm',
        question: 'Quel procédé stylistique lie : « Sa voix était douce, profonde, grave, apaisante » ?',
        options: ['Anaphore', 'Énumération / accumulation', 'Antithèse', 'Périphrase'],
        answer: 'Énumération / accumulation',
        explanation: 'L\'ÉNUMÉRATION (ou ACCUMULATION) juxtapose plusieurs termes de même nature (ici 4 adjectifs) pour créer un effet d\'abondance, d\'insistance ou de surenchère. Effet : impression que la voix a de nombreuses qualités distinctes.',
        hint: 'Accumulation = liste de termes. Anaphore = répétition en début de phrase. Antithèse = deux idées opposées.',
      },
    ]
  },

  '7-4': { // Ven 21 août — 🏆 Grand Contrôle Final — Niveau brevet
    exercises: [
      {
        id: '7-4-1', type: 'qcm',
        question: 'Analysez : « C\'est lui qui, malgré tout, avait réussi à maintenir vivante cette flamme qu\'on croyait éteinte. » — Combien de propositions ?',
        options: ['2', '3', '4', '5'],
        answer: '4',
        explanation: '4 verbes conjugués = 4 propositions : 1) « c\'est » (principale tronquée) 2) « avait réussi » (relative sujet de « c\'est lui qui ») 3) « croyait » (relative complétant « flamme ») 4) « éteinte » (= qu\'on croyait [être] éteinte, sous-entendu).',
        hint: 'Compte minutieusement : c\'est / qui avait réussi / qu\'on croyait / éteinte (participe passé adjectival).',
      },
      {
        id: '7-4-2', type: 'qcm',
        question: 'Dans la phrase ci-dessus, quelle est la valeur de l\'adverbe « malgré tout » ?',
        options: [
          'CC de manière',
          'CC de concession (= bien qu\'il soit difficile)',
          'CC de temps',
          'CC de cause',
        ],
        answer: 'CC de concession (= bien qu\'il soit difficile)',
        explanation: '« Malgré tout » = en dépit de tout, quand même → valeur de CONCESSION. Il signifie que la réussite s\'est produite malgré les obstacles. C\'est un CC de concession.',
      },
      {
        id: '7-4-3', type: 'completer',
        question: 'Dans « cette flamme qu\'on croyait éteinte », le PP « éteinte » s\'accorde avec ___ car ___.',
        answer: 'flamme (féminin singulier) / l\'adjectif participe épithète s\'accorde avec le nom qu\'il qualifie',
        explanation: '« Éteinte » est ici un participe passé utilisé comme adjectif (= épithète de « flamme »). Comme tout adjectif, il s\'accorde avec le nom qu\'il qualifie : flamme (féminin singulier) → éteinte.',
        hint: 'Participe passé adjectif = s\'accorde comme un adjectif qualificatif.',
      },
      {
        id: '7-4-4', type: 'qcm',
        question: 'Pour une rédaction sur le sujet « Selon vous, les réseaux sociaux sont-ils une chance ou un danger pour les jeunes ? », quel plan est le plus adapté ?',
        options: [
          'Plan chronologique (histoire des réseaux sociaux)',
          'Plan dialectique : thèse (chance) → antithèse (danger) → synthèse (nuance)',
          'Plan descriptif (décrire les réseaux sociaux)',
          'Plan impressionniste (ce que je ressens)',
        ],
        answer: 'Plan dialectique : thèse (chance) → antithèse (danger) → synthèse (nuance)',
        explanation: 'Le sujet demande « chance ou danger ? » → c\'est un sujet à débattre → plan DIALECTIQUE. La synthèse nuance les deux positions et propose une vision personnelle argumentée. C\'est le plan le plus valorisé au brevet pour ce type de sujet.',
        hint: 'Question « ou » / « pensez-vous que » → dialectique (pour / contre / nuance). Question descriptive → analytique.',
      },
    ]
  },
};

import { CURRICULUM_EXTRA } from './curriculumExtra.js';
// Exercices supplémentaires générés (objectif : 10 à 15 questions par jour)
for (const [k, extra] of Object.entries(CURRICULUM_EXTRA)) {
  if (CURRICULUM[k]) CURRICULUM[k].exercises.push(...extra);
}

// Fonction utilitaire pour récupérer les exercices d'une journée
export function getExercises(dayKey) {
  return CURRICULUM[dayKey]?.exercises || [];
}
