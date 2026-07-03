// Banques d'exercices de français (contenu original rédigé pour l'appli).
// Deux sources : des banques d'items rédigés (tagués par niveaux) et un
// générateur de conjugaison piloté par des tables de formes correctes.
import { makeRng } from './templates-maths.mjs';

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function qcm(rng, answer, wrongs) {
  return shuffle(rng, [answer, ...[...new Set(wrongs)].filter((w) => w !== answer).slice(0, 3)]);
}

// ── Tables de conjugaison (formes correctes écrites à la main) ────
// pres: 6 formes ; fut1: 1re pers. futur ; ps3: 3e sing. passé simple ; pp: participe passé
const VERBES = [
  { inf: 'être', pres: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], impStem: 'ét', fut1: 'serai', ps3: 'fut', pp: 'été', subj: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'] },
  { inf: 'avoir', pres: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], fut1: 'aurai', ps3: 'eut', pp: 'eu', subj: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'] },
  { inf: 'aller', pres: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], fut1: 'irai', ps3: 'alla', pp: 'allé', subj: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'] },
  { inf: 'faire', pres: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], fut1: 'ferai', ps3: 'fit', pp: 'fait', subj: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'] },
  { inf: 'venir', pres: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], fut1: 'viendrai', ps3: 'vint', pp: 'venu', subj: ['vienne', 'viennes', 'vienne', 'venions', 'veniez', 'viennent'] },
  { inf: 'prendre', pres: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], fut1: 'prendrai', ps3: 'prit', pp: 'pris' },
  { inf: 'voir', pres: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], fut1: 'verrai', ps3: 'vit', pp: 'vu' },
  { inf: 'dire', pres: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], fut1: 'dirai', ps3: 'dit', pp: 'dit' },
  { inf: 'pouvoir', pres: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], fut1: 'pourrai', ps3: 'put', pp: 'pu' },
  { inf: 'vouloir', pres: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], fut1: 'voudrai', ps3: 'voulut', pp: 'voulu' },
  { inf: 'savoir', pres: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], fut1: 'saurai', ps3: 'sut', pp: 'su' },
  { inf: 'mettre', pres: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], fut1: 'mettrai', ps3: 'mit', pp: 'mis' },
  { inf: 'écrire', pres: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'], fut1: 'écrirai', ps3: 'écrivit', pp: 'écrit' },
  { inf: 'lire', pres: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], fut1: 'lirai', ps3: 'lut', pp: 'lu' },
  { inf: 'partir', pres: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], fut1: 'partirai', ps3: 'partit', pp: 'parti' },
  { inf: 'finir', pres: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'], fut1: 'finirai', ps3: 'finit', pp: 'fini' },
  { inf: 'grandir', pres: ['grandis', 'grandis', 'grandit', 'grandissons', 'grandissez', 'grandissent'], fut1: 'grandirai', ps3: 'grandit', pp: 'grandi' },
  { inf: 'chanter', pres: ['chante', 'chantes', 'chante', 'chantons', 'chantez', 'chantent'], fut1: 'chanterai', ps3: 'chanta', pp: 'chanté' },
  { inf: 'manger', pres: ['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'], fut1: 'mangerai', ps3: 'mangea', pp: 'mangé' },
  { inf: 'jouer', pres: ['joue', 'joues', 'joue', 'jouons', 'jouez', 'jouent'], fut1: 'jouerai', ps3: 'joua', pp: 'joué' },
];

const PRONOMS = ['je', 'tu', 'il', 'nous', 'vous', 'elles'];
const IMP_END = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FUT_END = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const COND_END = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];

function imparfaitForm(v, p) {
  let stem = v.impStem || v.pres[3].replace(/ons$/, '');
  if (/ge$/.test(stem) && IMP_END[p].startsWith('i')) stem = stem.slice(0, -1);
  return stem + IMP_END[p];
}
function futurForm(v, p) { return v.fut1.replace(/ai$/, '') + FUT_END[p]; }
function condForm(v, p) { return v.fut1.replace(/ai$/, '') + COND_END[p]; }
function pronomFor(form, p) {
  if (p === 0) return /^[aeiouéèêh]/i.test(form) ? "j'" : 'je ';
  return PRONOMS[p] + ' ';
}

// tense: present | imparfait | futur | conditionnel | passeSimple | subjonctif | pp
export function conjugaisonItem(rng, tense) {
  const v = pick(rng, VERBES);
  const p = Math.floor(rng() * 6);
  const names = { present: 'présent', imparfait: 'imparfait', futur: 'futur simple', conditionnel: 'conditionnel présent', passeSimple: 'passé simple', subjonctif: 'subjonctif présent', pp: 'participe passé' };
  if (tense === 'pp') {
    const wrongPPs = VERBES.filter((x) => x.pp !== v.pp).map((x) => x.pp);
    return { type: 'qcm', question: `Quel est le participe passé du verbe « ${v.inf} » ?`,
      options: qcm(rng, v.pp, shuffle(rng, wrongPPs).slice(0, 3)),
      answer: v.pp, explanation: `Le participe passé de « ${v.inf} » est « ${v.pp} » (ex. : il a/est ${v.pp}).`,
      hint: 'Pense au passé composé : j\'ai / je suis ___.' };
  }
  if (tense === 'passeSimple') {
    const wrongs = VERBES.filter((x) => x.ps3 !== v.ps3).map((x) => x.ps3);
    return { type: 'qcm', question: `Conjugue « ${v.inf} » au passé simple, 3e personne du singulier : il ___.`,
      options: qcm(rng, v.ps3, shuffle(rng, wrongs).slice(0, 3)),
      answer: v.ps3, explanation: `« ${v.inf} » au passé simple : il ${v.ps3}. Le passé simple est le temps des actions ponctuelles du récit écrit.`,
      hint: 'Temps du récit littéraire écrit.' };
  }
  if (tense === 'subjonctif') {
    const withSubj = VERBES.filter((x) => x.subj);
    const vv = pick(rng, withSubj);
    const pp2 = Math.floor(rng() * 6);
    const form = vv.subj[pp2];
    return { type: 'completer', question: `Conjugue « ${vv.inf} » au subjonctif présent : il faut que ${['je', 'tu', 'il', 'nous', 'vous', 'elles'][pp2]} ___.`,
      answer: form, explanation: `Après « il faut que », on emploie le subjonctif : que ${['je', 'tu', 'il', 'nous', 'vous', 'elles'][pp2]} ${form}.`,
      hint: '« Il faut que » impose le subjonctif.' };
  }
  const form = tense === 'present' ? v.pres[p] : tense === 'imparfait' ? imparfaitForm(v, p) : tense === 'futur' ? futurForm(v, p) : condForm(v, p);
  return { type: 'completer', question: `Conjugue « ${v.inf} » au ${names[tense]} : ${pronomFor(form, p)}___.`,
    answer: form, explanation: `« ${v.inf} » au ${names[tense]} : ${pronomFor(form, p)}${form}.`,
    hint: tense === 'futur' ? 'Terminaisons : -rai, -ras, -ra, -rons, -rez, -ront.' : tense === 'imparfait' ? 'Terminaisons : -ais, -ais, -ait, -ions, -iez, -aient.' : tense === 'conditionnel' ? 'Radical du futur + terminaisons de l\'imparfait.' : 'Pense au groupe du verbe.' };
}

// ── Banques rédigées ──────────────────────────────────────────────
// lv : niveaux auxquels l'item convient (6, 5, 4, 3)
export const BANKS = {

classes: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Le vent souffle fort ce soir. », quelle est la classe de « vent » ?', options: ['Nom commun', 'Verbe', 'Adjectif', 'Adverbe'], answer: 'Nom commun', explanation: '« Vent » désigne une chose : c\'est un nom commun, précédé du déterminant « le ».', hint: 'Il est précédé d\'un déterminant.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Elle porte une robe magnifique. », quelle est la classe de « magnifique » ?', options: ['Adjectif qualificatif', 'Nom', 'Adverbe', 'Verbe'], answer: 'Adjectif qualificatif', explanation: '« Magnifique » précise le nom « robe » : c\'est un adjectif qualificatif.', hint: 'Il donne une qualité au nom.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Nous partirons demain matin. », quelle est la classe de « demain » ?', options: ['Adverbe', 'Nom', 'Préposition', 'Conjonction'], answer: 'Adverbe', explanation: '« Demain » précise le moment de l\'action et est invariable : c\'est un adverbe de temps.', hint: 'Mot invariable qui répond à « quand ? ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Il travaille avec sérieux. », quelle est la classe de « avec » ?', options: ['Préposition', 'Adverbe', 'Conjonction de coordination', 'Pronom'], answer: 'Préposition', explanation: '« Avec » introduit le groupe « avec sérieux » : c\'est une préposition.', hint: 'Petit mot invariable qui introduit un complément.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Marie et Paul arrivent. », quelle est la classe de « et » ?', options: ['Conjonction de coordination', 'Préposition', 'Adverbe', 'Déterminant'], answer: 'Conjonction de coordination', explanation: '« Et » relie deux mots de même nature : c\'est une conjonction de coordination (mais, ou, et, donc, or, ni, car).', hint: 'Mais, ou, et, donc, or, ni, car.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Celui-ci me plaît beaucoup. », quelle est la classe de « celui-ci » ?', options: ['Pronom démonstratif', 'Déterminant', 'Nom', 'Adjectif'], answer: 'Pronom démonstratif', explanation: '« Celui-ci » remplace un nom en le désignant : c\'est un pronom démonstratif.', hint: 'Il remplace un nom.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'Dans « Ces fleurs sentent bon. », « ces » est un déterminant démonstratif.', answer: 'vrai', explanation: '« Ces » accompagne le nom « fleurs » et le désigne : déterminant démonstratif.', hint: 'Il est placé devant un nom.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Le chien dort paisiblement. », quelle est la classe de « paisiblement » ?', options: ['Adverbe de manière', 'Adjectif', 'Nom', 'Participe'], answer: 'Adverbe de manière', explanation: 'Formé sur l\'adjectif « paisible » + -ment, il modifie le verbe « dort » : adverbe de manière.', hint: 'Les mots en -ment qui modifient un verbe.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'Un pronom remplace généralement un nom ou un groupe nominal.', answer: 'vrai', explanation: 'C\'est le rôle du pronom : « Léa lit. Elle adore ça. » — « elle » remplace « Léa ».', hint: 'Pro-nom = « à la place du nom ».' },
  { lv: [6,5], type: 'qcm', question: 'Dans « Une pluie fine tombe sur la ville. », quel mot est un déterminant ?', options: ['Une', 'pluie', 'fine', 'tombe'], answer: 'Une', explanation: '« Une » est un article indéfini : il introduit le nom « pluie ».', hint: 'Le petit mot placé devant le nom.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Hélas, tout est fini ! », quelle est la classe de « hélas » ?', options: ['Interjection', 'Adverbe', 'Conjonction', 'Nom'], answer: 'Interjection', explanation: '« Hélas » exprime une émotion et reste isolé : c\'est une interjection.', hint: 'Mot-exclamation qui exprime une émotion.' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans « Je me demande si tu viendras. », quelle est la classe de « si » ?', options: ['Conjonction de subordination', 'Adverbe', 'Pronom', 'Préposition'], answer: 'Conjonction de subordination', explanation: '« Si » introduit ici une interrogation indirecte : conjonction de subordination.', hint: 'Il introduit une proposition subordonnée.' },
  { lv: [4,3], type: 'qcm', question: 'Dans « Il a agi en professionnel. », quelle est la classe de « en » ?', options: ['Préposition', 'Pronom', 'Adverbe', 'Déterminant'], answer: 'Préposition', explanation: 'Ici « en » introduit le complément « en professionnel » : préposition. (Attention : « en » peut aussi être pronom : « j\'en veux ».)', hint: 'Compare : « J\'en veux » (pronom) / « en voiture » (préposition).' },
  { lv: [4,3], type: 'vrai_faux', question: 'La classe grammaticale d\'un mot change selon sa place dans la phrase.', answer: 'faux', explanation: 'La classe (nature) est fixe, inscrite au dictionnaire ; c\'est la FONCTION qui dépend de la phrase.', hint: 'Ne confonds pas classe et fonction.' },
  { lv: [6,5], type: 'qcm', question: 'Quel mot de la liste est un verbe ?', options: ['courir', 'course', 'coureur', 'courageux'], answer: 'courir', explanation: '« Courir » exprime une action et peut se conjuguer : c\'est un verbe (les autres : nom, nom, adjectif).', hint: 'Il peut se conjuguer : je cours, tu cours…' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Mon frère aîné me protège. », quelle est la classe de « mon » ?', options: ['Déterminant possessif', 'Pronom possessif', 'Adjectif', 'Article'], answer: 'Déterminant possessif', explanation: '« Mon » indique la possession et accompagne le nom « frère » : déterminant possessif.', hint: 'Mon, ton, son, notre, votre, leur…' },
],

fonctions: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Le facteur distribue le courrier. », quelle est la fonction de « le courrier » ?', options: ['COD', 'Sujet', 'COI', 'CC de lieu'], answer: 'COD', explanation: '« Distribue quoi ? → le courrier » : complément d\'objet direct, sans préposition.', hint: 'Pose la question « quoi ? » après le verbe.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Sous le vieux chêne dormait un berger. », quel est le sujet de « dormait » ?', options: ['un berger', 'le vieux chêne', 'Sous le vieux chêne', 'berger'], answer: 'un berger', explanation: 'Sujet inversé : « Qui est-ce qui dormait ? → un berger », placé après le verbe.', hint: 'Le sujet n\'est pas toujours avant le verbe.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Elle téléphone à sa cousine. », quelle est la fonction de « à sa cousine » ?', options: ['COI', 'COD', 'CC de manière', 'Attribut du sujet'], answer: 'COI', explanation: '« Téléphone à qui ? → à sa cousine » : complément d\'objet indirect (introduit par « à »).', hint: 'La préposition « à » signale un COI.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Ce matin, les élèves révisent. », quelle est la fonction de « ce matin » ?', options: ['CC de temps', 'Sujet', 'COD', 'CC de lieu'], answer: 'CC de temps', explanation: '« Ce matin » indique quand se passe l\'action : complément circonstanciel de temps, déplaçable et supprimable.', hint: 'Réponds à la question « quand ? ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Mon voisin semble fatigué. », quelle est la fonction de « fatigué » ?', options: ['Attribut du sujet', 'COD', 'Épithète', 'CC de manière'], answer: 'Attribut du sujet', explanation: '« Sembler » est un verbe d\'état : « fatigué » qualifie le sujet à travers le verbe → attribut du sujet.', hint: 'Être, paraître, sembler, devenir, rester… = verbes d\'état.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'Dans « Nous mangeons à la cantine. », « à la cantine » est un CC de lieu.', answer: 'vrai', explanation: '« À la cantine » indique où se passe l\'action : CC de lieu (déplaçable : « À la cantine, nous mangeons »).', hint: 'Réponds à la question « où ? ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « Le jardinier arrose les tomates chaque soir. », quelle est la fonction de « chaque soir » ?', options: ['CC de temps', 'COD', 'COI', 'Sujet'], answer: 'CC de temps', explanation: '« Chaque soir » précise la fréquence : CC de temps. Le COD est « les tomates ».', hint: 'Deux compléments : trouve celui qui répond à « quand ? ».' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans « Il parle de son voyage à ses amis. », combien y a-t-il de COI ?', options: ['2', '1', '0', '3'], answer: '2', explanation: '« Parle de quoi ? → de son voyage » et « parle à qui ? → à ses amis » : deux COI.', hint: 'Cherche les groupes introduits par « de » et « à ».' },
  { lv: [5,4,3], type: 'vrai_faux', question: 'Un complément circonstanciel peut généralement être déplacé ou supprimé.', answer: 'vrai', explanation: 'C\'est le test du CC : « Je lis le soir » → « Le soir, je lis » → « Je lis ». La phrase reste correcte.', hint: 'Essaie de le déplacer en tête de phrase.' },
  { lv: [4,3], type: 'qcm', question: 'Dans « La tempête a arraché plusieurs arbres. », quelle est la fonction de « la tempête » ?', options: ['Sujet', 'COD', 'CC de cause', 'Complément d\'agent'], answer: 'Sujet', explanation: '« Qui est-ce qui a arraché ? → la tempête » : sujet du verbe.', hint: 'Qui fait l\'action ?' },
  { lv: [4,3], type: 'qcm', question: 'Dans « Le château a été détruit par un incendie. », quelle est la fonction de « par un incendie » ?', options: ['Complément d\'agent', 'COI', 'CC de cause', 'Sujet'], answer: 'Complément d\'agent', explanation: 'À la voix passive, celui qui fait l\'action est le complément d\'agent, introduit par « par ».', hint: 'Voix passive + « par » = complément d\'agent.' },
  { lv: [6,5], type: 'completer', question: 'Dans « Les enfants construisent une cabane. », le COD est « une ___ ».', answer: 'cabane', explanation: '« Construisent quoi ? → une cabane » : COD.', hint: 'Pose la question « quoi ? ».' },
  { lv: [4,3], type: 'vrai_faux', question: 'Dans « Elle devient médecin. », « médecin » est un COD.', answer: 'faux', explanation: '« Devenir » est un verbe d\'état : « médecin » est attribut du sujet, pas COD.', hint: 'Devenir = verbe d\'état.' },
],

gn: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans le GN « une histoire passionnante », quel est le noyau ?', options: ['histoire', 'une', 'passionnante', 'aucun'], answer: 'histoire', explanation: 'Le nom « histoire » est le noyau : le déterminant et l\'adjectif s\'organisent autour de lui.', hint: 'C\'est le nom principal du groupe.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « le chalet de montagne », quelle est la nature de « de montagne » ?', options: ['Complément du nom', 'Adjectif épithète', 'Proposition relative', 'COD'], answer: 'Complément du nom', explanation: 'Introduit par la préposition « de », il complète le nom « chalet » : complément du nom.', hint: 'Préposition + nom qui complète un autre nom.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans « un roman que tout le monde adore », quelle est la nature de « que tout le monde adore » ?', options: ['Proposition subordonnée relative', 'Complément du nom', 'Adjectif', 'COD'], answer: 'Proposition subordonnée relative', explanation: 'Introduite par le pronom relatif « que » et contenant un verbe conjugué, elle complète « roman ».', hint: 'Elle contient un verbe conjugué.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'Dans « une eau claire et fraîche », les adjectifs « claire » et « fraîche » sont épithètes.', answer: 'vrai', explanation: 'Accolés au nom sans verbe d\'état, ils sont épithètes du nom « eau ».', hint: 'Directement à côté du nom = épithète.' },
  { lv: [6,5,4,3], type: 'completer', question: 'Enrichis le GN « un chien » avec un adjectif épithète de ton choix placé après le nom : « un chien ___ ». (ex : noir)', answer: 'noir', explanation: 'Exemples : un chien noir, fidèle, joueur… L\'adjectif épithète enrichit le nom directement. (Réponse attendue : noir)', hint: 'Un adjectif de couleur fonctionne très bien.' },
  { lv: [5,4,3], type: 'qcm', question: 'Quelle expansion trouve-t-on dans « la maison où je suis né » ?', options: ['Une proposition relative', 'Un complément du nom', 'Une apposition', 'Un adjectif épithète'], answer: 'Une proposition relative', explanation: '« Où je suis né » : pronom relatif « où » + verbe conjugué → relative qui complète « maison ».', hint: '« Où » est ici un pronom relatif.' },
  { lv: [4,3], type: 'qcm', question: 'Dans « Paris, capitale de la France, attire les visiteurs. », quelle est la nature de « capitale de la France » ?', options: ['Apposition', 'Complément du nom', 'Relative', 'Attribut'], answer: 'Apposition', explanation: 'Encadrée par des virgules et désignant la même réalité que « Paris » : c\'est une apposition.', hint: 'Les virgules sont un indice.' },
  { lv: [4,3], type: 'vrai_faux', question: 'Supprimer une expansion du nom rend la phrase grammaticalement incorrecte.', answer: 'faux', explanation: 'L\'expansion enrichit mais n\'est pas indispensable : « Le chat (noir) dort » reste correct sans elle.', hint: 'Teste en la supprimant.' },
],

accords: [
  { lv: [6,5,4,3], type: 'completer', question: 'Accorde l\'adjectif : « des chansons (joyeux) » → des chansons ___.', answer: 'joyeuses', explanation: '« Chansons » est féminin pluriel : joyeux → joyeuses.', hint: 'Féminin pluriel.' },
  { lv: [6,5,4,3], type: 'completer', question: 'Accorde : « un cheval » → des ___.', answer: 'chevaux', explanation: 'Les noms en -al font souvent leur pluriel en -aux : cheval → chevaux.', hint: 'Pluriel en -aux.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Choisis la bonne forme : « Les élèves de la classe ___ en sortie. »', options: ['partent', 'part', 'partes', 'parte'], answer: 'partent', explanation: 'Le sujet est « les élèves » (pluriel) : le verbe s\'accorde → partent. « De la classe » complète le nom.', hint: 'Qui est-ce qui part ? Les élèves.' },
  { lv: [6,5,4,3], type: 'completer', question: 'Accorde : « une revue (mensuel) » → une revue ___.', answer: 'mensuelle', explanation: '« Revue » est féminin singulier : mensuel → mensuelle.', hint: 'Féminin : double la consonne + e.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'On écrit : « Des travaux importants ». ', answer: 'vrai', explanation: '« Travail » fait « travaux » au pluriel, et « importants » s\'accorde au masculin pluriel.', hint: 'Pluriel en -aux.' },
  { lv: [5,4,3], type: 'qcm', question: 'Choisis la bonne forme : « Elles sont ___ tôt ce matin. »', options: ['parties', 'partie', 'partis', 'parti'], answer: 'parties', explanation: 'Avec l\'auxiliaire « être », le participe passé s\'accorde avec le sujet « elles » : parties.', hint: 'Auxiliaire être → accord avec le sujet.' },
  { lv: [5,4,3], type: 'qcm', question: 'Choisis la bonne forme : « Ils ont ___ leurs affaires. »', options: ['rangé', 'rangés', 'rangée', 'rangées'], answer: 'rangé', explanation: 'Avec « avoir », pas d\'accord avec le sujet ; le COD « leurs affaires » est APRÈS le verbe → pas d\'accord.', hint: 'Avoir + COD après = pas d\'accord.' },
  { lv: [4,3], type: 'qcm', question: 'Choisis la bonne forme : « Les photos que j\'ai ___ sont réussies. »', options: ['prises', 'pris', 'prise', 'prit'], answer: 'prises', explanation: 'Avec « avoir », accord avec le COD placé AVANT : « que » (= les photos, fém. pluriel) → prises.', hint: 'Le COD « que » est avant le verbe.' },
  { lv: [4,3], type: 'vrai_faux', question: 'Dans « Elle s\'est lavé les mains. », « lavé » reste invariable.', answer: 'vrai', explanation: 'Le COD « les mains » est après le verbe ; « s\' » est COI → pas d\'accord.', hint: 'Cherche le COD et sa place.' },
  { lv: [6,5], type: 'completer', question: 'Accorde : « un bijou » → des ___.', answer: 'bijoux', explanation: 'Bijou, caillou, chou, genou, hibou, joujou, pou prennent un -x au pluriel.', hint: 'Un des 7 mots en -ou → -oux.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Choisis la bonne forme : « C\'est toi qui ___ la meilleure idée. »', options: ['as', 'a', 'ont', 'avez'], answer: 'as', explanation: 'Après « c\'est toi qui », le verbe s\'accorde avec « toi » (2e pers. sing.) : tu as → qui as.', hint: '« Qui » reprend « toi ».' },
  { lv: [3], type: 'qcm', question: 'Choisis la bonne forme : « Ils se sont ___ hier soir. »', options: ['téléphoné', 'téléphonés', 'téléphonée', 'téléphonées'], answer: 'téléphoné', explanation: '« Téléphoner À quelqu\'un » : « se » est COI → participe invariable.', hint: 'On téléphone À quelqu\'un.' },
],

homophones: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Il va ___ la plage avec son frère. »', options: ['à', 'a', 'as', 'ah'], answer: 'à', explanation: 'On ne peut pas dire « il va AVAIT la plage » : c\'est la préposition « à ».', hint: 'Remplace par « avait » : si ça marche, c\'est « a ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Elle ___ gagné le tournoi. »', options: ['a', 'à', 'as', 'ha'], answer: 'a', explanation: '« Elle AVAIT gagné » fonctionne : c\'est le verbe avoir → a.', hint: 'Test : remplace par « avait ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Mon frère ___ ses copains jouent dehors. »', options: ['et', 'est', 'es', 'ai'], answer: 'et', explanation: 'On peut dire « mon frère ET PUIS ses copains » : conjonction « et ».', hint: 'Test : remplace par « et puis ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Le film ___ vraiment réussi. »', options: ['est', 'et', 'es', 'ait'], answer: 'est', explanation: '« Le film ÉTAIT réussi » fonctionne : verbe être → est.', hint: 'Test : remplace par « était ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ parents sont fiers de lui. »', options: ['Ses', 'Ces', 'S\'est', 'C\'est'], answer: 'Ses', explanation: 'Ce sont les parents « à lui » : possessif → ses (les siens).', hint: 'Possession → ses.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Regarde ___ nuages à l\'horizon ! »', options: ['ces', 'ses', 's\'est', 'sait'], answer: 'ces', explanation: 'On montre les nuages « là-bas » : démonstratif → ces (ceux-là).', hint: 'On peut ajouter « -là » : ces nuages-là.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ chien aboie toute la nuit. »', options: ['Son', 'Sont', 'Sons', 'S\'ont'], answer: 'Son', explanation: 'Le chien « à lui » : déterminant possessif → son.', hint: 'Test : remplace par « le sien ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Les magasins ___ fermés le dimanche. »', options: ['sont', 'son', 'sons', 'çont'], answer: 'sont', explanation: '« Les magasins ÉTAIENT fermés » fonctionne : verbe être → sont.', hint: 'Test : remplace par « étaient ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ soir, nous mangeons des crêpes. »', options: ['Ce', 'Se', 'Ceux', 'Seu'], answer: 'Ce', explanation: 'Démonstratif devant le nom « soir » → ce.', hint: 'Devant un nom → ce.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Il ___ prépare pour le match. »', options: ['se', 'ce', 'ceux', 'sœu'], answer: 'se', explanation: 'Pronom du verbe pronominal « se préparer » → se.', hint: 'Devant un verbe → se.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Tu viens ___ tu restes ? »', options: ['ou', 'où', 'houx', 'août'], answer: 'ou', explanation: 'Choix entre deux options (« ou bien ») → ou, sans accent.', hint: 'Test : remplace par « ou bien ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « La ville ___ j\'habite est calme. »', options: ['où', 'ou', 'hou', 'houx'], answer: 'où', explanation: 'Indique le lieu → où, avec accent.', hint: 'Lieu → accent.' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « ___ demain que nous partons. »', options: ['C\'est', 'S\'est', 'Ces', 'Ses'], answer: 'C\'est', explanation: '« Cela est demain » → c\'est.', hint: 'Test : remplace par « cela est ».' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « Il ___ blessé en tombant. »', options: ['s\'est', 'c\'est', 'ses', 'ces'], answer: 's\'est', explanation: 'Verbe pronominal « se blesser » au passé composé → s\'est.', hint: 'Il S\'EST blessé = se blesser.' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « Ils ont donné ___ avis aux élèves. »', options: ['leur', 'leurs', 'l\'heure', 'leurre'], answer: 'leur', explanation: '« Leur avis » : un seul avis par groupe, et devant un nom singulier → leur.', hint: 'Le nom qui suit est singulier.' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « ___ idées sont excellentes. »', options: ['Leurs', 'Leur', 'Leurre', 'L\'heure'], answer: 'Leurs', explanation: 'Devant le nom pluriel « idées » → leurs.', hint: 'Le nom qui suit est pluriel.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Pose ton sac ___ , près de la porte. »', options: ['là', 'la', 'l\'a', 'las'], answer: 'là', explanation: 'Indique un lieu → là, avec accent.', hint: 'Lieu → accent.' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « Cette chanson, il ___ apprise en une soirée. »', options: ['l\'a', 'la', 'là', 'las'], answer: 'l\'a', explanation: '« Il L\'AVAIT apprise » fonctionne : pronom l\' + verbe avoir → l\'a.', hint: 'Test : remplace par « l\'avait ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ heure est-il ? »', options: ['Quelle', 'Quel', 'Qu\'elle', 'Quels'], answer: 'Quelle', explanation: '« Heure » est féminin singulier → quelle.', hint: 'Accord avec « heure » (féminin).' },
  { lv: [5,4,3], type: 'qcm', question: 'Complète : « Je crois ___ viendra demain. »', options: ['qu\'elle', 'quelle', 'quel', 'quels'], answer: 'qu\'elle', explanation: 'On peut dire « que Léa viendra » : que + elle → qu\'elle.', hint: 'Test : remplace par « que Léa ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ vont au stade ce soir. »', options: ['Ils', 'Il', 'Île', 'Ile'], answer: 'Ils', explanation: 'Le verbe « vont » est au pluriel → ils.', hint: 'Regarde la terminaison du verbe.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « ___ a encore oublié ses clés. »', options: ['On', 'Ont', 'Om', 'Hon'], answer: 'On', explanation: '« IL a oublié » fonctionne : pronom → on.', hint: 'Test : remplace par « il ».' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Complète : « Elles ___ terminé leurs devoirs. »', options: ['ont', 'on', 'onze', 'hont'], answer: 'ont', explanation: '« Elles AVAIENT terminé » fonctionne : verbe avoir → ont.', hint: 'Test : remplace par « avaient ».' },
],

vocabulaire: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel mot est un synonyme de « content » ?', options: ['heureux', 'triste', 'fatigué', 'inquiet'], answer: 'heureux', explanation: '« Content » et « heureux » ont un sens très proche : ce sont des synonymes.', hint: 'Sens proche = synonyme.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel mot est un antonyme de « courageux » ?', options: ['peureux', 'brave', 'hardi', 'vaillant'], answer: 'peureux', explanation: '« Peureux » a le sens contraire de « courageux » : c\'est un antonyme (les trois autres sont des synonymes !).', hint: 'Sens contraire = antonyme.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel mot n\'appartient PAS à la famille de « terre » ?', options: ['terrible', 'terrain', 'terrestre', 'enterrer'], answer: 'terrible', explanation: '« Terrible » vient du latin terrere (effrayer), pas de « terre ». Terrain, terrestre, enterrer partagent le radical « terr- » (sol).', hint: 'Attention aux ressemblances trompeuses.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Que signifie le préfixe « re- » dans « refaire » ?', options: ['de nouveau', 'avant', 'contre', 'à moitié'], answer: 'de nouveau', explanation: '« Re- » exprime la répétition : refaire = faire de nouveau.', hint: 'Relire, recommencer, revenir…' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Que signifie le préfixe « in- » dans « invisible » ?', options: ['la négation', 'l\'intérieur', 'la répétition', 'l\'excès'], answer: 'la négation', explanation: '« In- » (ou im-, ir-, il-) marque le contraire : invisible = qu\'on ne peut pas voir.', hint: 'Inconnu, impossible, irréel…' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel suffixe transforme « chant » en nom de métier ?', options: ['-eur (chanteur)', '-ette', '-age', '-ment'], answer: '-eur (chanteur)', explanation: 'Le suffixe -eur forme des noms de métier ou d\'agent : chanteur, coiffeur, vendeur.', hint: 'Comme dans danseur, nageur…' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Dans quelle phrase « glacé » est-il employé au sens FIGURÉ ?', options: ['Son accueil m\'a glacé.', 'Ce thé glacé est délicieux.', 'Le lac est glacé en hiver.', 'Mes mains sont glacées.'], answer: 'Son accueil m\'a glacé.', explanation: 'Un accueil ne gèle pas vraiment : « glacé » signifie ici « froid, hostile » → sens figuré (image).', hint: 'Le sens figuré est une image.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel mot appartient au champ lexical de la mer ?', options: ['vague', 'montagne', 'forêt', 'désert'], answer: 'vague', explanation: 'Vague, marée, écume, rivage… appartiennent au champ lexical de la mer.', hint: 'Tous les mots liés au même thème.' },
  { lv: [5,4,3], type: 'qcm', question: 'Quel est le niveau de langue de « se marrer » ?', options: ['familier', 'courant', 'soutenu', 'littéraire'], answer: 'familier', explanation: '« Se marrer » (familier) = « rire » (courant) = « s\'esclaffer » (soutenu).', hint: 'L\'emploierais-tu dans une rédaction ?' },
  { lv: [5,4,3], type: 'qcm', question: 'Quel mot est du registre SOUTENU pour « voiture » ?', options: ['automobile', 'bagnole', 'caisse', 'tacot'], answer: 'automobile', explanation: 'Bagnole, caisse, tacot sont familiers ; « automobile » est soutenu ; « voiture » est courant.', hint: 'Le mot le plus formel.' },
  { lv: [6,5,4,3], type: 'completer', question: 'Donne l\'antonyme de « monter » : ___.', answer: 'descendre', explanation: 'Monter / descendre expriment des mouvements opposés : antonymes.', hint: 'Le mouvement inverse.' },
  { lv: [6,5,4,3], type: 'completer', question: 'Complète la famille de mots : dent, dentiste, denti___ (produit pour se laver les dents).', answer: 'frice', explanation: 'Dentifrice appartient à la famille de « dent » (radical dent-).', hint: 'Le tube dans la salle de bains.' },
  { lv: [4,3], type: 'qcm', question: 'Que signifie le préfixe « anti- » dans « antivol » ?', options: ['contre', 'avant', 'avec', 'loin'], answer: 'contre', explanation: '« Anti- » = contre : un antivol protège contre le vol.', hint: 'Antigel, antibrouillard…' },
  { lv: [4,3], type: 'qcm', question: 'Quel mot signifie « qui ne peut pas être lu » ?', options: ['illisible', 'illettré', 'délavé', 'relié'], answer: 'illisible', explanation: 'Préfixe négatif il- + lisible : illisible = impossible à lire.', hint: 'Préfixe il- + adjectif.' },
  { lv: [6,5], type: 'qcm', question: 'Quel est le synonyme de « minuscule » ?', options: ['très petit', 'très grand', 'moyen', 'large'], answer: 'très petit', explanation: 'Minuscule = extrêmement petit (contraire : immense).', hint: 'Pense à une fourmi.' },
  { lv: [5,4,3], type: 'completer', question: 'Trouve le nom formé à partir du verbe « livrer » avec le suffixe -aison : la ___.', answer: 'livraison', explanation: 'Livrer + -aison → livraison. Le suffixe fabrique un nom d\'action.', hint: 'Le colis arrive : c\'est la…' },
],

figures: [
  { lv: [5,4,3], type: 'qcm', question: 'Quelle figure de style dans : « Ses cheveux sont un soleil d\'or » ?', options: ['Métaphore', 'Comparaison', 'Hyperbole', 'Anaphore'], answer: 'Métaphore', explanation: 'Image sans outil de comparaison (pas de « comme ») : métaphore.', hint: 'Pas de mot-outil de comparaison.' },
  { lv: [5,4,3], type: 'qcm', question: 'Quelle figure de style dans : « Il est rusé comme un renard » ?', options: ['Comparaison', 'Métaphore', 'Personnification', 'Litote'], answer: 'Comparaison', explanation: 'L\'outil « comme » relie le comparé et le comparant : comparaison.', hint: 'Repère le mot-outil.' },
  { lv: [5,4,3], type: 'qcm', question: 'Quelle figure de style dans : « Le vent hurle sa colère dans la nuit » ?', options: ['Personnification', 'Comparaison', 'Euphémisme', 'Gradation'], answer: 'Personnification', explanation: 'Le vent reçoit un comportement humain (hurler sa colère) : personnification.', hint: 'Une chose se comporte comme un humain.' },
  { lv: [5,4,3], type: 'qcm', question: 'Quelle figure de style dans : « Je te l\'ai répété mille fois ! » ?', options: ['Hyperbole', 'Métaphore', 'Antithèse', 'Comparaison'], answer: 'Hyperbole', explanation: 'Exagération volontaire (mille fois !) pour insister : hyperbole.', hint: 'Exagération.' },
  { lv: [4,3], type: 'qcm', question: 'Quelle figure de style dans : « Cette obscure clarté qui tombe des étoiles » ?', options: ['Antithèse (oxymore)', 'Hyperbole', 'Comparaison', 'Anaphore'], answer: 'Antithèse (oxymore)', explanation: '« Obscure » et « clarté » s\'opposent dans le même groupe : oxymore (forme d\'antithèse).', hint: 'Deux mots contraires côte à côte.' },
  { lv: [4,3], type: 'qcm', question: 'Quelle figure dans : « Paris ! Paris outragé ! Paris brisé ! Paris martyrisé ! » ?', options: ['Anaphore', 'Métaphore', 'Euphémisme', 'Comparaison'], answer: 'Anaphore', explanation: 'La répétition du même mot en tête de groupes successifs est une anaphore.', hint: 'Répétition en début de phrase.' },
  { lv: [4,3], type: 'qcm', question: 'Quelle figure dans : « Il nous a quittés » (pour dire qu\'il est mort) ?', options: ['Euphémisme', 'Hyperbole', 'Personnification', 'Gradation'], answer: 'Euphémisme', explanation: 'On atténue une réalité brutale : euphémisme.', hint: 'On adoucit la réalité.' },
  { lv: [4,3], type: 'qcm', question: 'Quelle figure dans : « Je suis ému, bouleversé, anéanti » ?', options: ['Gradation', 'Anaphore', 'Antithèse', 'Litote'], answer: 'Gradation', explanation: 'Les termes sont de plus en plus forts : gradation ascendante.', hint: 'Intensité croissante.' },
  { lv: [5,4,3], type: 'vrai_faux', question: 'La seule différence entre comparaison et métaphore est la présence d\'un outil de comparaison.', answer: 'vrai', explanation: 'Comparaison = avec outil (comme, tel que…) ; métaphore = sans outil.', hint: '« Comme » ou pas « comme ».' },
  { lv: [3], type: 'qcm', question: 'Quelle figure dans : « Ce n\'est pas mauvais » (pour dire que c\'est très bon) ?', options: ['Litote', 'Hyperbole', 'Oxymore', 'Métaphore'], answer: 'Litote', explanation: 'On dit moins pour suggérer plus : litote.', hint: 'Dire moins pour suggérer plus.' },
],

phrase: [
  { lv: [6,5,4,3], type: 'qcm', question: 'Combien de propositions dans : « Le soleil se couche et les lampadaires s\'allument. » ?', options: ['2', '1', '3', '4'], answer: '2', explanation: 'Deux verbes conjugués (se couche, s\'allument) = deux propositions, coordonnées par « et ».', hint: 'Compte les verbes conjugués.' },
  { lv: [6,5,4,3], type: 'vrai_faux', question: 'Une phrase simple contient un seul verbe conjugué.', answer: 'vrai', explanation: 'Phrase simple = une seule proposition = un seul verbe conjugué.', hint: 'C\'est la définition.' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans « Je pense que tu as raison. », la subordonnée « que tu as raison » est :', options: ['une complétive COD', 'une relative', 'une circonstancielle', 'une principale'], answer: 'une complétive COD', explanation: '« Je pense quoi ? → que tu as raison » : subordonnée conjonctive complétive, COD de « pense ».', hint: 'Elle complète le verbe « penser ».' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans « Quand la nuit tombe, les chauves-souris sortent. », la subordonnée exprime :', options: ['le temps', 'la cause', 'le but', 'la conséquence'], answer: 'le temps', explanation: '« Quand » introduit une circonstancielle de temps.', hint: '« Quand » = moment.' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans « Il reste chez lui parce qu\'il pleut. », la subordonnée exprime :', options: ['la cause', 'le temps', 'le but', 'la comparaison'], answer: 'la cause', explanation: '« Parce que » introduit une circonstancielle de cause.', hint: '« Parce que » = pourquoi.' },
  { lv: [4,3], type: 'qcm', question: 'Dans « Range ta chambre pour que tout soit prêt. », la subordonnée exprime :', options: ['le but', 'la cause', 'le temps', 'la condition'], answer: 'le but', explanation: '« Pour que » (+ subjonctif) introduit une circonstancielle de but.', hint: '« Pour que » = objectif.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel est le type de la phrase : « Range immédiatement tes affaires ! » ?', options: ['Injonctif (impératif)', 'Déclaratif', 'Interrogatif', 'Exclamatif'], answer: 'Injonctif (impératif)', explanation: 'Elle donne un ordre : phrase injonctive, verbe à l\'impératif.', hint: 'Ordre ou conseil.' },
  { lv: [6,5,4,3], type: 'qcm', question: 'Quel est le type de la phrase : « Où as-tu rangé le dictionnaire ? » ?', options: ['Interrogatif', 'Déclaratif', 'Injonctif', 'Exclamatif'], answer: 'Interrogatif', explanation: 'Elle pose une question (point d\'interrogation, sujet inversé) : interrogative.', hint: 'Regarde la ponctuation.' },
  { lv: [4,3], type: 'qcm', question: 'Transforme à la voix passive : « Le jury félicite les lauréats. »', options: ['Les lauréats sont félicités par le jury.', 'Les lauréats félicitent le jury.', 'Le jury est félicité par les lauréats.', 'Les lauréats ont félicité le jury.'], answer: 'Les lauréats sont félicités par le jury.', explanation: 'Le COD devient sujet, être au même temps + participe accordé, agent introduit par « par ».', hint: 'Le COD devient sujet.' },
  { lv: [4,3], type: 'vrai_faux', question: 'Dans une phrase à la voix passive, le sujet subit l\'action.', answer: 'vrai', explanation: 'Voix passive : le sujet subit (« La souris est chassée par le chat »).', hint: 'Il ne fait pas l\'action.' },
  { lv: [6,5], type: 'qcm', question: 'Quelle phrase est correcte ?', options: ['Les hirondelles reviennent au printemps.', 'Les hirondelles reviennent au printemps', 'les hirondelles reviennent au printemps.', 'Les hirondelles reviennent, au printemps'], answer: 'Les hirondelles reviennent au printemps.', explanation: 'Une phrase commence par une majuscule et se termine par un point.', hint: 'Majuscule + point.' },
  { lv: [3], type: 'qcm', question: 'Dans « Bien qu\'il soit épuisé, il continue. », la subordonnée exprime :', options: ['la concession', 'la cause', 'le but', 'le temps'], answer: 'la concession', explanation: '« Bien que » (+ subjonctif) introduit une concession : le fait aurait dû empêcher l\'action.', hint: '« Bien que » = pourtant.' },
],

recit: [
  { lv: [5,4,3], type: 'qcm', question: 'Dans un récit au passé, à quoi sert l\'imparfait ?', options: ['Décrire le décor et les habitudes', 'Raconter les actions soudaines', 'Exprimer le futur', 'Donner un ordre'], answer: 'Décrire le décor et les habitudes', explanation: 'Imparfait = décor, description, durée ; passé simple = actions ponctuelles qui font avancer l\'histoire.', hint: 'Le duo imparfait / passé simple.' },
  { lv: [5,4,3], type: 'qcm', question: 'Transforme au discours indirect : « Elle dit : "Je suis fatiguée." »', options: ['Elle dit qu\'elle est fatiguée.', 'Elle dit que je suis fatiguée.', 'Elle dit : qu\'elle est fatiguée.', 'Elle a dit je suis fatiguée.'], answer: 'Elle dit qu\'elle est fatiguée.', explanation: 'Au discours indirect : plus de guillemets, subordonnée en « que », et le pronom s\'adapte (je → elle).', hint: 'Les pronoms changent.' },
  { lv: [4,3], type: 'qcm', question: 'Quel point de vue quand le narrateur dit « je » et raconte ce qu\'il ressent ?', options: ['Interne', 'Externe', 'Omniscient', 'Neutre'], answer: 'Interne', explanation: 'Le narrateur-personnage ne livre que ce qu\'il perçoit : point de vue (focalisation) interne.', hint: 'On est « dans la tête » du personnage.' },
  { lv: [4,3], type: 'qcm', question: 'Quel registre vise à faire rire le lecteur ?', options: ['Comique', 'Tragique', 'Lyrique', 'Fantastique'], answer: 'Comique', explanation: 'Le registre comique cherche le rire (quiproquos, exagérations, jeux de mots…).', hint: 'Le contraire du tragique.' },
  { lv: [4,3], type: 'qcm', question: 'Quel registre exprime les sentiments personnels du poète (amour, nostalgie…) ?', options: ['Lyrique', 'Épique', 'Comique', 'Réaliste'], answer: 'Lyrique', explanation: 'Le registre lyrique exprime les émotions intimes, souvent à la 1re personne.', hint: 'La lyre du poète.' },
  { lv: [5,4,3], type: 'qcm', question: 'Dans le schéma narratif, comment s\'appelle l\'événement qui bouleverse la situation initiale ?', options: ['L\'élément déclencheur', 'Le dénouement', 'La situation finale', 'La péripétie finale'], answer: 'L\'élément déclencheur', explanation: 'L\'élément déclencheur (ou perturbateur) lance l\'action du récit.', hint: 'Il « déclenche » l\'histoire.' },
  { lv: [5,4,3], type: 'vrai_faux', question: 'Au brevet comme en contrôle, il faut citer le texte entre guillemets pour justifier sa réponse.', answer: 'vrai', explanation: 'Une réponse justifiée s\'appuie sur une citation précise, avec le numéro de ligne.', hint: 'Citation + ligne = réponse solide.' },
  { lv: [3], type: 'qcm', question: 'Dans un texte argumentatif, qu\'est-ce que la thèse ?', options: ['L\'idée défendue par l\'auteur', 'Un exemple', 'La conclusion', 'Une citation'], answer: 'L\'idée défendue par l\'auteur', explanation: 'La thèse est l\'opinion que l\'auteur défend à l\'aide d\'arguments et d\'exemples.', hint: 'L\'opinion générale du texte.' },
  { lv: [3], type: 'qcm', question: 'Quel connecteur logique introduit une CONSÉQUENCE ?', options: ['donc', 'mais', 'car', 'ou'], answer: 'donc', explanation: '« Donc » introduit la conséquence ; « car » la cause ; « mais » l\'opposition.', hint: 'Il pleut, DONC je prends un parapluie.' },
  { lv: [3], type: 'qcm', question: 'Quel connecteur exprime une OPPOSITION ?', options: ['cependant', 'ainsi', 'ensuite', 'de plus'], answer: 'cependant', explanation: '« Cependant », « toutefois », « néanmoins », « pourtant » expriment l\'opposition ou la concession.', hint: 'Synonyme de « pourtant ».' },
  { lv: [6,5], type: 'qcm', question: 'Dans un conte, quelle formule marque souvent le début ?', options: ['Il était une fois', 'Tout à coup', 'Enfin', 'C\'est pourquoi'], answer: 'Il était une fois', explanation: '« Il était une fois » ouvre traditionnellement les contes (situation initiale à l\'imparfait).', hint: 'La formule magique des contes.' },
  { lv: [4,3], type: 'vrai_faux', question: 'Un narrateur omniscient connaît les pensées de tous les personnages.', answer: 'vrai', explanation: 'Omniscient = « qui sait tout » : il entre dans toutes les consciences.', hint: 'Omni = tout, scient = savoir.' },
],
};

// ── Routeur français : mots-clés du titre -> catégories de banques ─
const F_ROUTES = [
  [/homophone|dictée|dictee|orthographe/i, ['homophones', 'accords']],
  [/accord|participe passé|participe passe/i, ['accords', 'homophones']],
  [/classe|nature des mots|mots/i, ['classes', 'fonctions']],
  [/fonction|sujet|complément|complement/i, ['fonctions', 'classes']],
  [/groupe nominal|gn|expansion/i, ['gn', 'classes']],
  [/figure|style|registre|poésie|poesie|littéra|littera/i, ['figures', 'recit']],
  [/vocabulaire|synonyme|antonyme|famille|préfixe|prefixe|suffixe|champ lexical|niveaux de langue|sens propre/i, ['vocabulaire']],
  [/phrase|subordonn|proposition|type|forme|voix|passive|coordination|juxtaposition/i, ['phrase', 'fonctions']],
  [/récit|recit|narrat|lecture|texte|roman|conte|chevalerie|description|point de vue|discours|argument|rédaction|redaction|brevet|méthode|methode/i, ['recit', 'figures']],
];

const CONJ_ROUTES = [
  [/présent|present/i, 'present'],
  [/imparfait/i, 'imparfait'],
  [/passé simple|passe simple/i, 'passeSimple'],
  [/futur/i, 'futur'],
  [/conditionnel/i, 'conditionnel'],
  [/subjonctif/i, 'subjonctif'],
  [/passé composé|passe compose|participe/i, 'pp'],
];

// Tenses de conjugaison adaptés par niveau (pour le remplissage)
const LEVEL_TENSES = {
  6: ['present', 'futur', 'imparfait', 'pp'],
  5: ['present', 'imparfait', 'passeSimple', 'futur', 'pp'],
  4: ['present', 'imparfait', 'passeSimple', 'futur', 'conditionnel', 'subjonctif', 'pp'],
  3: ['imparfait', 'passeSimple', 'futur', 'conditionnel', 'subjonctif', 'pp'],
};

export function generateFrancaisExercises(dayId, lecon, lvl, count, idPrefix, usedTracker) {
  const rng = makeRng(`${idPrefix}-${dayId}-fr`);
  const out = [];
  const seen = new Set();

  // 1. Conjugaison ciblée si la leçon porte sur un temps précis
  let conjTense = null;
  for (const [re, tense] of CONJ_ROUTES) {
    if (re.test(lecon)) { conjTense = tense; break; }
  }

  // 2. Catégories de banques selon la leçon
  let cats = null;
  for (const [re, c] of F_ROUTES) {
    if (re.test(lecon)) { cats = c; break; }
  }
  if (!cats) cats = ['classes', 'fonctions', 'homophones', 'vocabulaire'];

  // Items de banque disponibles pour ce niveau, non encore utilisés dans ce niveau
  const pool = [];
  for (const cat of cats) {
    for (let i = 0; i < BANKS[cat].length; i++) {
      const item = BANKS[cat][i];
      const key = `${cat}#${i}`;
      if (item.lv.includes(lvl) && !usedTracker.has(key)) pool.push({ key, item });
    }
  }
  const shuffled = shuffle(rng, pool);

  // Mélange : si leçon de conjugaison → moitié conjugaison ciblée, moitié banque
  const conjCount = conjTense ? Math.ceil(count * 0.6) : Math.max(0, count - shuffled.length);
  const bankCount = count - conjCount;

  for (let i = 0; i < bankCount && i < shuffled.length; i++) {
    usedTracker.add(shuffled[i].key);
    const { lv, ...ex } = shuffled[i].item;
    out.push({ id: `${idPrefix}-${dayId}-x${out.length + 1}`, ...ex });
    seen.add(ex.question);
  }

  // Remplissage conjugaison (inépuisable, questions uniques garanties)
  const tenses = conjTense ? [conjTense] : LEVEL_TENSES[lvl];
  let guard = 0;
  while (out.length < count && guard < count * 40) {
    guard++;
    const ex = conjugaisonItem(rng, tenses[guard % tenses.length]);
    if (seen.has(ex.question)) continue;
    seen.add(ex.question);
    out.push({ id: `${idPrefix}-${dayId}-x${out.length + 1}`, ...ex });
  }
  return out;
}
