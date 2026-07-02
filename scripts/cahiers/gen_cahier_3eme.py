# -*- coding: utf-8 -*-
"""
Générateur du Grand Cahier de Vacances 3e -> Brevet (toutes matières).
Même gabarit que le cahier 6e : couverture, sommaire, mode d'emploi,
planning 8 semaines, 1 page de leçon + exercices par journée, corrigés.
Produit un mapping JSON dayId -> {lesson, exercises} pages.
"""
import json, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Flowable
)
from reportlab.platypus.tableofcontents import TableOfContents

SCRATCH = '/private/tmp/claude-501/-Users-maxwellve-Desktop-Claude-code-cahier-vacances-2k26/eafc5201-9700-42b9-9d29-ce9e13a195da/scratchpad'
SEED = json.load(open(f'{SCRATCH}/seed3.json'))
OUT_PDF = '/Users/maxwellve/Desktop/Claude code/cahier-vacances 2k26/public/cahier-3eme.pdf'
OUT_MAP = f'{SCRATCH}/pagemap3.json'

REPL = {'→': '->', '⭐': '', '🏆': '', '🎆': '', '·': '.', '½': '1/2', '⅓': '1/3', '¼': '1/4', 'œ': 'oe', 'Œ': 'OE', '‐': '-', '–': '-', '…': '...', '²': '2', '³': '3'}
def clean(s):
    if not s: return ''
    for k, v in REPL.items(): s = s.replace(k, v)
    out = []
    for ch in s:
        try:
            ch.encode('cp1252'); out.append(ch)
        except UnicodeEncodeError:
            pass
    return ''.join(out).strip()

INK      = colors.HexColor('#3A1F54')
ACCENT   = colors.HexColor('#C21F4E')
LIGHTBG  = colors.HexColor('#F6F0EA')
BOXBG    = colors.HexColor('#F2EEF7')
TIPBG    = colors.HexColor('#FBEAE2')
MAT_COLORS = {
    'français':   colors.HexColor('#4F46E5'),
    'maths':      colors.HexColor('#0891B2'),
    'anglais':    colors.HexColor('#DC2626'),
    'histoire':   colors.HexColor('#B45309'),
    'géographie': colors.HexColor('#059669'),
    'svt':        colors.HexColor('#16A34A'),
    'physique':   colors.HexColor('#7C3AED'),
    'technologie':colors.HexColor('#475569'),
    'emc':        colors.HexColor('#BE185D'),
}
MAT_LABELS = {'français':'FRANÇAIS','maths':'MATHS','anglais':'ANGLAIS','histoire':'HISTOIRE','géographie':'GÉOGRAPHIE','svt':'SVT','physique':'PHYSIQUE-CHIMIE','technologie':'TECHNOLOGIE','emc':'EMC'}

def st(name, **kw):
    base = dict(fontName='Helvetica', fontSize=10.5, leading=15, textColor=INK)
    base.update(kw); return ParagraphStyle(name, **base)

S = {
  'body':    st('body', alignment=TA_JUSTIFY),
  'h1':      st('h1', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=INK, spaceAfter=6),
  'h2':      st('h2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=ACCENT, spaceBefore=8, spaceAfter=4),
  'lesson':  st('lesson', fontName='Helvetica-Bold', fontSize=15.5, leading=19.5, textColor=INK),
  'badge':   st('badge', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white),
  'small':   st('small', fontSize=9, leading=12.5, textColor=colors.HexColor('#71618A')),
  'box':     st('box', fontSize=10, leading=14.5),
  'exo':     st('exo', fontSize=10.5, leading=15),
  'exoopt':  st('exoopt', fontSize=10, leading=16, leftIndent=16),
  'corr':    st('corr', fontSize=9, leading=12.5),
  'cover1':  st('cover1', fontName='Helvetica-Bold', fontSize=34, leading=40, alignment=TA_CENTER, textColor=INK),
  'cover2':  st('cover2', fontName='Helvetica-Bold', fontSize=16, leading=20, alignment=TA_CENTER, textColor=ACCENT),
  'cover3':  st('cover3', fontSize=12, leading=18, alignment=TA_CENTER, textColor=INK),
  'weekh':   st('weekh', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=colors.white),
  'weeksub': st('weeksub', fontSize=11, leading=16, textColor=colors.white),
}
TOC_LEVELS = [
    ParagraphStyle('toc0', fontName='Helvetica-Bold', fontSize=11, leading=16, textColor=INK),
    ParagraphStyle('toc1', fontName='Helvetica', fontSize=9.5, leading=13.5, leftIndent=14, textColor=colors.HexColor('#5A4A75')),
]

# ── Enrichissements pédagogiques 3e (rédigés pour ce cahier) ──────
ENRICH = {
'0-0': dict(retenir=[
  "Trois registres de langue : familier (on bosse), courant (on travaille), soutenu (on oeuvre).",
  "Comparaison = image AVEC outil (comme, tel que) ; métaphore = image SANS outil.",
  "Personnification : prêter un comportement humain à une chose ; hyperbole : exagération.",
  "Anaphore : répétition en tête de phrase ; antithèse : opposition de deux idées."],
 exemples=["« La mer est un miroir » : métaphore. « Il est fort comme un lion » : comparaison.",
  "« Je meurs de faim » : hyperbole. Au brevet, cite toujours le mot précis du texte."]),
'0-1': dict(retenir=[
  "Développer : k(a + b) = ka + kb ; double distributivité : (a+b)(c+d) = ac + ad + bc + bd.",
  "Identités remarquables : (a+b)2 = a2 + 2ab + b2 ; (a-b)2 = a2 - 2ab + b2 ; (a+b)(a-b) = a2 - b2.",
  "Résoudre ax + b = c : isoler x étape par étape (on enlève b, puis on divise par a).",
  "Équation produit : A x B = 0 équivaut à A = 0 ou B = 0."],
 exemples=["3x + 5 = 20 -> 3x = 15 -> x = 5.", "(x-2)(x+7) = 0 -> x = 2 ou x = -7."]),
'0-2': dict(retenir=[
  "1914-1918 : guerre mondiale, longue et totale. Déclenchée après l'attentat de Sarajevo (28 juin 1914).",
  "1916 : Verdun, bataille symbole de la guerre des tranchées.",
  "Guerre totale : toute la société est mobilisée (soldats, usines, femmes, colonies, propagande).",
  "11 novembre 1918 : armistice. Bilan : environ 10 millions de morts, l'Europe affaiblie."],
 exemples=["Les « poilus » vivent dans les tranchées ; à l'arrière, les femmes travaillent dans les usines d'armement."]),
'0-3': dict(retenir=[
  "L'information héréditaire est portée par l'ADN, contenu dans les chromosomes du noyau.",
  "L'être humain possède 23 paires de chromosomes (dont 1 paire de chromosomes sexuels XX ou XY).",
  "Un gène est une portion d'ADN qui détermine un caractère ; ses versions s'appellent des allèles.",
  "Lors de la fécondation, chaque parent transmet la moitié des chromosomes."],
 exemples=["Le groupe sanguin dépend d'un gène à plusieurs allèles (A, B, O)."]),
'0-4': dict(retenir=[
  "Prétérit simple = action datée et terminée : I visited London last year.",
  "Present perfect = lien avec le présent, bilan : I have visited London (three times).",
  "Prétérit : verbes réguliers en -ed ; irréguliers à connaître (go -> went, see -> saw...).",
  "Mots-repères : yesterday, ago, last... -> prétérit ; ever, never, just, yet -> present perfect."],
 exemples=["She watched a film yesterday. / She has never watched this film."]),
'1-0': dict(retenir=[
  "Argumenter = défendre une thèse à l'aide d'arguments illustrés par des exemples.",
  "Raisonnement déductif : du général au particulier ; inductif : de l'exemple à la règle.",
  "Connecteurs logiques : d'abord, ensuite, en outre (addition) ; mais, cependant (opposition) ; donc, ainsi (conséquence).",
  "Au brevet : structure ton texte en paragraphes, un argument par paragraphe."],
 exemples=["Thèse : « La lecture est essentielle. » Argument : elle enrichit le vocabulaire. Exemple : les lecteurs réguliers maîtrisent mieux l'orthographe."]),
'1-1': dict(retenir=[
  "a puissance n = a multiplié n fois par lui-même : 2^4 = 16.",
  "10^n = 1 suivi de n zéros ; 10^-n = 0,00...1 (n rangs après la virgule).",
  "Produit de puissances de même base : on additionne les exposants.",
  "Notation scientifique : a x 10^n avec 1 <= a < 10 : 3 400 = 3,4 x 10^3."],
 exemples=["10^2 x 10^3 = 10^5.", "0,0072 = 7,2 x 10^-3."]),
'1-2': dict(retenir=[
  "La mondialisation met en relation les territoires par des flux : marchandises, capitaux, informations, personnes.",
  "Les conteneurs et les grands ports (Shanghai, Rotterdam) sont au coeur des échanges.",
  "Les FTN (firmes transnationales) organisent la production à l'échelle mondiale.",
  "Des territoires inégalement intégrés : métropoles connectées / espaces à l'écart."],
 exemples=["Un smartphone : conçu aux États-Unis, assemblé en Asie, vendu dans le monde entier."]),
'1-3': dict(retenir=[
  "La matière est faite d'atomes ; une centaine d'éléments classés dans le tableau périodique (Mendeleïev).",
  "Un atome : noyau (protons + neutrons) entouré d'électrons ; il est électriquement neutre.",
  "Une molécule est un assemblage d'atomes : H2O (eau), CO2 (dioxyde de carbone).",
  "Symboles à connaître : H, O, C, N, Fe, Cu, Cl, Na."],
 exemples=["La molécule d'eau H2O contient 2 atomes d'hydrogène et 1 atome d'oxygène."]),
'1-4': dict(retenir=[
  "can = capacité / permission ; must = obligation ; should = conseil ; would = conditionnel / politesse.",
  "Le modal est suivi de la base verbale sans to : She can swim.",
  "Négations : can't, mustn't (interdiction), shouldn't.",
  "Would you like...? = formule de politesse pour proposer."],
 exemples=["You should revise every day. / You mustn't cheat. / I would like some water, please."]),
'2-0': dict(retenir=[
  "Identifier d'abord : genre du texte, narrateur (interne / externe / omniscient), époque, lieu.",
  "Relever les champs lexicaux pour dégager l'atmosphère et les thèmes.",
  "Toujours justifier par une citation précise entre guillemets, avec la ligne.",
  "Interpréter = expliquer l'effet produit sur le lecteur, pas seulement décrire."],
 exemples=["« Comme l'indique la ligne 12, le narrateur exprime sa peur : citation entre guillemets + numéro de ligne. »"]),
'2-1': dict(retenir=[
  "Fonction linéaire : f(x) = ax - proportionnalité, droite passant par l'origine.",
  "Fonction affine : f(x) = ax + b - droite ne passant pas forcément par l'origine.",
  "a = coefficient directeur (pente) ; b = ordonnée à l'origine (valeur en x = 0).",
  "Image : f(3) se calcule en remplaçant x par 3 ; antécédent : on résout f(x) = valeur."],
 exemples=["f(x) = 2x + 1 : f(3) = 7 ; l'antécédent de 9 est x = 4 (2x + 1 = 9)."]),
'2-2': dict(retenir=[
  "1939-1945 : guerre mondiale d'anéantissement, déclenchée par l'invasion de la Pologne (1er sept. 1939).",
  "La Shoah : génocide de près de 6 millions de Juifs d'Europe par l'Allemagne nazie (camps, Einsatzgruppen).",
  "En France : défaite de 1940, régime de Vichy et collaboration ; Résistance autour de De Gaulle et Jean Moulin.",
  "8 mai 1945 : capitulation allemande ; 6 et 9 août 1945 : bombes atomiques sur Hiroshima et Nagasaki."],
 exemples=["Auschwitz-Birkenau est le symbole des camps d'extermination ; le procès de Nuremberg juge les crimes nazis."]),
'2-3': dict(retenir=[
  "Le corps se défend grâce au système immunitaire : réaction rapide (phagocytose) et lente (lymphocytes).",
  "Les lymphocytes B produisent des anticorps ; les lymphocytes T détruisent les cellules infectées.",
  "La vaccination entraîne une mémoire immunitaire : protection avant l'infection.",
  "Les antibiotiques agissent contre les bactéries, PAS contre les virus."],
 exemples=["Grâce au vaccin, l'organisme reconnaît le microbe et réagit plus vite lors d'un vrai contact."]),
'2-4': dict(retenir=[
  "Un système embarqué = capteurs (entrées) + programme + actionneurs (sorties).",
  "Un algorithme est une suite d'instructions ; en programmation par blocs : boucles, conditions (si... alors... sinon).",
  "Une boucle répète des instructions ; une condition choisit selon un test.",
  "Exemples de systèmes : robot aspirateur, alarme, montre connectée, feux tricolores."],
 exemples=["SI la température > 25 °C ALORS allumer le ventilateur SINON l'éteindre."]),
'3-0': dict(retenir=[
  "Sujet de réflexion du brevet : introduction (reformuler le sujet + annoncer le plan), 2-3 paragraphes d'arguments, conclusion.",
  "Un paragraphe = une idée : argument + exemple précis + petite conclusion.",
  "Utilise des connecteurs logiques pour enchaîner ; évite le langage familier.",
  "Relis-toi deux fois : une fois pour le sens, une fois pour l'orthographe."],
 exemples=["Sujet type : « Selon vous, les réseaux sociaux rapprochent-ils les gens ? » -> thèse, arguments, exemples."]),
'3-1': dict(retenir=[
  "Volume du pavé droit : L x l x h ; du cylindre : pi x r2 x h.",
  "Volume de la pyramide et du cône : (aire de la base x hauteur) / 3 ; de la boule : (4/3) x pi x r3.",
  "1 L = 1 dm3 ; 1 m3 = 1 000 L.",
  "Dans un agrandissement/réduction de rapport k, les aires sont multipliées par k2, les volumes par k3."],
 exemples=["Cylindre r = 3 cm, h = 10 cm : V = pi x 9 x 10 = 90 pi (environ 283 cm3)."]),
'3-2': dict(retenir=[
  "Les inégalités de développement se mesurent avec l'IDH (santé, éducation, niveau de vie).",
  "Pays développés / pays émergents (Chine, Brésil, Inde) / PMA (pays les moins avancés).",
  "Les inégalités existent AUSSI à l'intérieur des pays (quartiers riches / bidonvilles).",
  "Le développement durable cherche à concilier économie, social et environnement."],
 exemples=["L'espérance de vie dépasse 80 ans en Europe de l'Ouest ; elle est inférieure à 60 ans dans certains PMA."]),
'3-3': dict(retenir=[
  "La France est une République : indivisible, laïque, démocratique et sociale.",
  "Pouvoir exécutif : président + gouvernement ; législatif : Parlement (Assemblée nationale + Sénat) ; judiciaire : juges indépendants.",
  "Le président est élu pour 5 ans au suffrage universel direct.",
  "Valeurs : Liberté, Égalité, Fraternité ; principes : laïcité, souveraineté nationale."],
 exemples=["Une loi : proposée, discutée et votée par le Parlement, promulguée par le président."]),
'3-4': dict(retenir=[
  "Avant de lire : observe titre, source, images pour anticiper le sens.",
  "Repère les mots transparents (music, important...) et déduis les mots inconnus grâce au contexte.",
  "Vocabulaire thématique du brevet : école, environnement, technologie, voyages, sentiments.",
  "Réponds aux questions avec des éléments précis du texte (cite-le)."],
 exemples=["environment = environnement ; improve = améliorer ; however = cependant ; because of = à cause de."]),
'4-0': dict(retenir=[
  "Phrase complexe = plusieurs verbes conjugués, donc plusieurs propositions.",
  "Juxtaposition (virgule), coordination (mais, ou, et, donc, or, ni, car), subordination (que, quand, parce que...).",
  "Subordonnée relative : complète un nom (introduite par qui, que, dont, où).",
  "Subordonnée conjonctive : complète le verbe (complétive) ou la phrase (circonstancielle)."],
 exemples=["« Je pense [que tu réussiras] » : complétive COD. « Le livre [que tu lis] est passionnant » : relative."]),
'4-1': dict(retenir=[
  "Moyenne = somme des valeurs / effectif total ; médiane = valeur qui partage la série en deux moitiés.",
  "Étendue = maximum - minimum.",
  "Probabilité = cas favorables / cas possibles ; toujours comprise entre 0 et 1.",
  "La somme des probabilités de toutes les issues vaut 1."],
 exemples=["Dé équilibré : P(nombre pair) = 3/6 = 1/2.", "Série 8, 10, 13, 15, 19 : médiane = 13, étendue = 11."]),
'4-2': dict(retenir=[
  "Après 1945, les colonies accèdent à l'indépendance : négociation (Inde, 1947) ou guerre (Algérie, 1954-1962).",
  "Guerre froide (1947-1991) : monde bipolaire, États-Unis contre URSS, sans affrontement direct.",
  "Crises et symboles : blocus de Berlin (1948), mur de Berlin (1961-1989), crise de Cuba (1962).",
  "1991 : dislocation de l'URSS, fin de la Guerre froide."],
 exemples=["La chute du mur de Berlin le 9 novembre 1989 annonce la fin du monde bipolaire."]),
'4-3': dict(retenir=[
  "Loi d'Ohm : U = R x I (tension = résistance x intensité).",
  "En série : la tension s'ajoute, l'intensité est la même partout.",
  "En dérivation : la tension est la même sur chaque branche, les intensités s'ajoutent.",
  "Puissance : P = U x I (watts) ; énergie : E = P x t."],
 exemples=["R = 100 ohms, I = 0,05 A -> U = 100 x 0,05 = 5 V."]),
'4-4': dict(retenir=[
  "Éco-conception : penser l'impact environnemental d'un objet sur TOUT son cycle de vie.",
  "Cycle de vie : extraction des matériaux -> fabrication -> transport -> usage -> fin de vie (recyclage).",
  "Les 3 R : Réduire, Réutiliser, Recycler.",
  "Critères de choix d'un matériau : masse, résistance, coût, impact environnemental."],
 exemples=["Une gourde réutilisable évite des centaines de bouteilles en plastique jetables."]),
'5-0': dict(retenir=[
  "Participe passé avec être : accord avec le sujet ; avec avoir : accord avec le COD seulement s'il est placé AVANT.",
  "Verbes pronominaux : accord si le pronom est COD (elle s'est lavée) mais pas s'il est COI (elle s'est lavé les mains).",
  "Homophones pièges : a/à, et/est, son/sont, ce/se, ces/ses, la/là/l'a, quel(le)/qu'elle.",
  "En dictée : traque d'abord les accords sujet-verbe, puis les participes, puis les homophones."],
 exemples=["« Les fleurs que j'ai cueillies » (COD avant -> accord). « J'ai cueilli des fleurs » (COD après -> pas d'accord)."]),
'5-1': dict(retenir=[
  "Pythagore (triangle rectangle) : hypoténuse2 = somme des carrés des deux autres côtés.",
  "Réciproque : si BC2 = AB2 + AC2, alors le triangle est rectangle en A.",
  "Thalès : droites parallèles coupées par deux sécantes -> rapports de longueurs égaux.",
  "Trigonométrie : SOH-CAH-TOA (sin = opposé/hyp ; cos = adjacent/hyp ; tan = opposé/adjacent)."],
 exemples=["Côtés 6 et 8 : hypoténuse = racine de (36+64) = 10.", "cos(60°) = 0,5."]),
'5-2': dict(retenir=[
  "L'Union européenne : 27 États membres, marché unique, euro pour une partie d'entre eux.",
  "La France, puissance européenne et mondiale : territoires ultramarins, 2e ZEE mondiale, francophonie.",
  "Paris, ville mondiale ; grandes métropoles régionales : Lyon, Marseille, Lille, Toulouse...",
  "L'UE réduit les écarts entre régions grâce à des fonds de développement."],
 exemples=["Airbus, construit à Toulouse avec des pièces de toute l'Europe, illustre la coopération européenne."]),
'5-3': dict(retenir=[
  "Un écosystème = milieu + êtres vivants + relations entre eux.",
  "L'être humain modifie les écosystèmes : déforestation, pollution, urbanisation, réchauffement.",
  "Conséquences : effondrement de la biodiversité, espèces menacées ou disparues.",
  "Solutions : aires protégées, corridors écologiques, consommation responsable."],
 exemples=["La disparition des abeilles menace la pollinisation, donc notre alimentation."]),
'5-4': dict(retenir=[
  "Structure ton texte anglais : introduction, arguments avec connecteurs, conclusion.",
  "Connecteurs : first, then, moreover (de plus), however (cependant), finally, to conclude.",
  "Donne ton opinion : I think that..., in my opinion..., I agree / disagree because...",
  "Relis-toi : -s à la 3e personne, temps cohérents, orthographe."],
 exemples=["In my opinion, school uniforms are a good idea because they reduce inequalities. However, ..."]),
'6-0': dict(retenir=[
  "Épreuve de français (3h) : compréhension + grammaire (1h10), dictée (20 min), rédaction (1h30).",
  "Compréhension : cite le texte, précise les lignes, explique les effets.",
  "Rédaction : au choix sujet d'imagination ou de réflexion - structure et soigne la langue.",
  "Gestion du temps : garde 10 minutes de relecture pour la rédaction."],
 exemples=["Barème indicatif : compréhension 50 pts, dictée 10 pts, rédaction 40 pts (sur 100)."]),
'6-1': dict(retenir=[
  "Épreuve de maths (2h, sur 100) : 6 à 8 exercices indépendants, dont un exercice de programmation (Scratch).",
  "Commence par les exercices que tu maîtrises ; ne reste pas bloqué.",
  "Rédige : une phrase de conclusion par question, unités et justifications.",
  "Vérifie tes calculs et l'ordre de grandeur des résultats."],
 exemples=["Toujours écrire « donc » avec une phrase : « L'échelle mesure donc 5 m. »"]),
'6-2': dict(retenir=[
  "Épreuve d'histoire-géo-EMC (2h, sur 50) : analyse de documents, développement construit, repères, EMC.",
  "Étude de document : présenter (nature, auteur, date), décrire, expliquer avec ses connaissances.",
  "Développement construit : 20-30 lignes organisées (intro, 2-3 paragraphes, conclusion).",
  "Apprends tes repères chronologiques et spatiaux : ils rapportent des points faciles."],
 exemples=["Présenter un document : « Cette affiche de propagande, publiée en 1917 par le gouvernement français... »"]),
'6-3': dict(retenir=[
  "Chimie : atomes, molécules, réactions (réactifs -> produits), masse conservée.",
  "Électricité : U = RI, P = UI, séries et dérivations.",
  "Mécanique : vitesse v = d/t ; poids P = m x g (poids en newtons, masse en kg).",
  "Signaux : lumière (300 000 km/s) et son (340 m/s dans l'air)."],
 exemples=["Un éclair vu puis entendu 3 s plus tard a frappé à environ 1 km (340 x 3)."]),
'6-4': dict(retenir=[
  "La Déclaration des droits de l'homme et du citoyen (1789) fonde nos libertés.",
  "Libertés fondamentales : expression, conscience, réunion, presse... encadrées par la loi.",
  "S'engager : voter, adhérer à une association, être délégué de classe, service civique.",
  "La laïcité garantit la liberté de croire ou de ne pas croire, et la neutralité de l'État."],
 exemples=["Article 1er (1789) : « Les hommes naissent et demeurent libres et égaux en droits. »"]),
'7-0': dict(retenir=[
  "Conditions réelles : 3 heures, sans aide, au calme, avec brouillon.",
  "Lis le texte DEUX fois avant les questions ; souligne les indices.",
  "Dictée : fais-toi dicter le texte par un adulte, sans relire avant.",
  "Rédaction : 5 minutes de plan au brouillon avant d'écrire."],
 exemples=["Coche le temps prévu : compréhension 1h10, dictée 20 min, rédaction 1h30."]),
'7-1': dict(retenir=[
  "Conditions réelles : 2 heures, calculatrice autorisée mais raisonnements rédigés.",
  "Traite tous les exercices : commence par ceux que tu maîtrises le mieux.",
  "Chaque réponse mérite une phrase de conclusion avec l'unité.",
  "Garde 10 minutes pour vérifier calculs et cohérence."],
 exemples=["Pense aux théorèmes stars : Pythagore, Thalès, trigonométrie, fonctions, probabilités."]),
'7-2': dict(retenir=[
  "Conditions réelles : 2 heures - histoire, géographie et EMC.",
  "Analyse de document : présenter, décrire, expliquer, critiquer si demandé.",
  "Développement construit : organise tes connaissances en paragraphes.",
  "N'oublie pas les repères : dates clés, cartes, acteurs majeurs."],
 exemples=["Dates stars : 1914-1918, 1939-1945, 1957 (traité de Rome), 1989 (chute du mur)."]),
'7-3': dict(retenir=[
  "Conditions réelles : 1h30 - SVT et physique-chimie.",
  "Analyse d'expérience : hypothèse, protocole, résultats, conclusion.",
  "Justifie avec le vocabulaire scientifique précis (gène, anticorps, molécule, tension...).",
  "Les schémas clairs et légendés rapportent des points."],
 exemples=["Une conclusion type : « Les résultats confirment l'hypothèse car... »"]),
'7-4': dict(retenir=[
  "Bravo, tu as terminé ton brevet blanc complet !",
  "Corrige chaque épreuve avec les corrigés et calcule ta note sur 100.",
  "Repère tes points faibles et relis les leçons correspondantes avant la rentrée.",
  "Estimation DNB : 16+ = mention Très bien ; 14+ = Bien ; 12+ = Assez bien ; 10+ = admis."],
 exemples=["Quelle que soit ta note : tu as travaillé tout l'été, tu pars avec une vraie avance. Bonne rentrée en 3e... et vise le brevet !"]),
}

def on_page(canv, doc):
    canv.saveState()
    if doc.page > 1:
        canv.setFont('Helvetica', 8)
        canv.setFillColor(colors.HexColor('#9A8AB4'))
        canv.drawString(20*mm, 285*mm, 'Grand Cahier de Vacances . 3e -> Brevet')
        canv.drawRightString(190*mm, 285*mm, str(doc.page))
        canv.setStrokeColor(colors.HexColor('#E0D8E8'))
        canv.setLineWidth(0.6)
        canv.line(20*mm, 283.5*mm, 190*mm, 283.5*mm)
        canv.setFont('Helvetica', 7.5)
        canv.drawCentredString(105*mm, 12*mm, str(doc.page))
    canv.restoreState()

PAGE_MAP = {}
class Marker(Flowable):
    def __init__(self, key):
        super().__init__(); self.key = key; self.width = 0; self.height = 0
    def draw(self):
        PAGE_MAP[self.key] = self.canv.getPageNumber()

class HeadingTOC(Paragraph):
    def __init__(self, text, style, level=0):
        super().__init__(text, style); self._toc_level = level; self._toc_text = re.sub('<[^>]+>', '', text)
    def draw(self):
        super().draw()
        self.canv.bookmarkPage(self._toc_text[:40])

class DocT(BaseDocTemplate):
    def afterFlowable(self, fl):
        if isinstance(fl, HeadingTOC):
            self.notify('TOCEntry', (fl._toc_level, fl._toc_text, self.page))

def box(title, flow_items, bg, border):
    inner = [[Paragraph(f'<b>{title}</b>', st('bt', fontName='Helvetica-Bold', fontSize=9.5, textColor=border))]] + [[f] for f in flow_items]
    t = Table(inner, colWidths=[160*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('BOX', (0,0), (-1,-1), 1, border),
        ('LEFTPADDING', (0,0), (-1,-1), 9), ('RIGHTPADDING', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    return t

def badge(matiere):
    c = MAT_COLORS.get(matiere, INK)
    t = Table([[Paragraph(MAT_LABELS.get(matiere, matiere.upper()), S['badge'])]], colWidths=[40*mm], rowHeights=[6.5*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c), ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    t.hAlign = 'LEFT'
    return t

def render_exo(n, ex):
    items = []
    q = clean(ex.get('question', ''))
    typ = ex.get('type')
    lab = {'qcm': 'QCM', 'vrai_faux': 'Vrai ou Faux', 'completer': 'Compléter'}.get(typ, 'Exercice')
    items.append(Paragraph(f'<b>Exercice {n}</b> <font size="8.5" color="#9A8AB4">[{lab}]</font> - {q}', S['exo']))
    if typ == 'qcm':
        for opt in ex.get('options', []):
            items.append(Paragraph(f'( ) {clean(opt)}', S['exoopt']))
    elif typ == 'vrai_faux':
        items.append(Paragraph('( ) Vrai&nbsp;&nbsp;&nbsp;&nbsp;( ) Faux', S['exoopt']))
    else:
        items.append(Paragraph('Réponse : ..................................................................', S['exoopt']))
    items.append(Spacer(1, 3.5*mm))
    return items

doc = DocT(OUT_PDF, pagesize=A4,
           leftMargin=20*mm, rightMargin=20*mm, topMargin=22*mm, bottomMargin=18*mm,
           title='Grand Cahier de Vacances 3e - Brevet', author='Calendrier 2k26')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
doc.addPageTemplates([PageTemplate(id='p', frames=[frame], onPage=on_page)])

story = []

# Couverture
story.append(Spacer(1, 40*mm))
story.append(Paragraph('Cahier de<br/>Vacances', S['cover1']))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('Toutes matières . 3e -> Brevet', S['cover2']))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('GRAND CAHIER DE VACANCES', st('c4', fontSize=10, alignment=TA_CENTER, textColor=colors.HexColor('#9A8AB4'))))
story.append(Paragraph('Préparation complète au Diplôme National du Brevet', S['cover3']))
story.append(Spacer(1, 22*mm))
ident = Table([[Paragraph('Nom :', S['body']), ''], [Paragraph('Prénom :', S['body']), ''], [Paragraph('Classe :', S['body']), '']],
              colWidths=[28*mm, 100*mm], rowHeights=[10*mm]*3)
ident.setStyle(TableStyle([('LINEBELOW', (1,0), (1,-1), 0.7, INK), ('VALIGN', (0,0), (-1,-1), 'BOTTOM')]))
ident.hAlign = 'CENTER'
story.append(ident)
story.append(Spacer(1, 20*mm))
story.append(Paragraph('Leçons . Exercices . Méthodes brevet . Brevet blanc complet . Corrigés', st('c5', fontSize=11, alignment=TA_CENTER, textColor=ACCENT)))
story.append(PageBreak())

# Sommaire
story.append(HeadingTOC('Sommaire', S['h1']))
story.append(Paragraph("Huit semaines pour réviser tout le programme de 3e en neuf matières et arriver prêt(e) au brevet. Semaine 8 : un brevet blanc complet en conditions réelles. À la fin : tous les corrigés.", S['body']))
story.append(Spacer(1, 5*mm))
toc = TableOfContents(); toc.levelStyles = TOC_LEVELS; toc.dotsMinLevel = 0
story.append(toc)
story.append(PageBreak())

# Avant de commencer
story.append(HeadingTOC('Avant de commencer - mode d\'emploi', S['h1']))
for p in [
  "Bienvenue dans ton cahier de vacances spécial brevet ! Il t'accompagne tout l'été pour arriver en confiance le jour du DNB.",
  "<b>Comment travailler ?</b> Un peu, mais souvent : 30 à 40 minutes par jour valent mieux que des heures la veille de la rentrée. Chaque journée tient sur deux pages : la leçon, puis les exercices.",
  "<b>Le déroulé d'une journée :</b> 1. Lis la leçon et l'encadré À RETENIR. 2. Observe les exemples. 3. Fais les exercices sans regarder la leçon. 4. Corrige-toi au stylo vert avec les corrigés en fin de cahier.",
  "<b>La semaine 8</b> est un brevet blanc complet : mets-toi en conditions d'examen (au calme, chronomètre lancé, sans aide). C'est le meilleur entraînement possible.",
]:
    story.append(Paragraph(p, S['body'])); story.append(Spacer(1, 3*mm))
story.append(box('MÉTHODE - Objectif brevet', [Paragraph("À la fin de chaque semaine, fais le bilan dans l'application : tes notes estimées /20 et tes points à retravailler y sont calculés automatiquement.", S['box'])], TIPBG, ACCENT))
story.append(Spacer(1, 3*mm))
story.append(box('ASTUCE', [Paragraph("Travaille à heure fixe, téléphone en mode avion. La régularité et la concentration font la différence au brevet.", S['box'])], BOXBG, INK))
story.append(PageBreak())

# Planning
story.append(HeadingTOC('Planning de travail - 8 semaines', S['h1']))
story.append(Paragraph("Ce planning découpe le cahier en huit semaines équilibrées. Coche chaque séance terminée.", S['body']))
story.append(Spacer(1, 4*mm))
jours_by_week = {}
for j in SEED['jours']:
    jours_by_week.setdefault(j['semaineIndex'], []).append(j)
rows = [[Paragraph('<b>Semaine</b>', S['box']), Paragraph('<b>Thème</b>', S['box']), Paragraph('<b>Séances</b>', S['box'])]]
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    labels = ' . '.join('( ) ' + clean(d['lecon']).split(' - ')[0].replace('Français','Fr').replace('Histoire-Géo','HG').replace('Histoire','Hist').replace('Géographie','Géo').replace('Physique-Chimie','PC').replace('Technologie','Techno').replace('Anglais','Ang').replace('Maths','Ma').replace('Grand Brevet Blanc','BB') for d in days)
    rows.append([Paragraph(f"<b>S{s['num']}</b>", S['box']), Paragraph(clean(s['theme']), S['box']), Paragraph(labels, st('pl', fontSize=8.5, leading=12))])
plan = Table(rows, colWidths=[16*mm, 52*mm, 92*mm])
plan.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.6, colors.HexColor('#D6C9E2')),
    ('BACKGROUND', (0,0), (-1,0), BOXBG),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 5), ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(plan)
story.append(PageBreak())

# Semaines
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    wcol = colors.HexColor(s['color'])
    head = Table([[Paragraph(f"SEMAINE {s['num']}", st('wk', fontName='Helvetica-Bold', fontSize=11, textColor=colors.white)),],
                  [Paragraph(clean(s['theme']), S['weekh'])],
                  [Paragraph("Cinq séances cette semaine. Coche chaque séance terminée !", S['weeksub'])]],
                 colWidths=[170*mm])
    head.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), wcol),
        ('LEFTPADDING', (0,0), (-1,-1), 12), ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (0,0), 10), ('BOTTOMPADDING', (0,-1), (-1,-1), 10),
    ]))
    story.append(HeadingTOC(f"Semaine {s['num']} - {clean(s['theme'])}", st('invis', fontSize=0.5, leading=0.5, textColor=colors.white), level=0))
    story.append(head)
    story.append(Spacer(1, 5*mm))
    for d in days:
        story.append(Paragraph(f"( )  <b>{clean(d['label'])}</b> - {clean(d['lecon'])}", S['body']))
        story.append(Spacer(1, 1.5*mm))
    story.append(PageBreak())

    for d in days:
        did = d['id']
        enrich = ENRICH.get(did, dict(retenir=[], exemples=[]))
        story.append(Marker(f'{did}:lesson'))
        story.append(HeadingTOC(f"{clean(d['label'])} - {clean(d['lecon'])[:60]}", st('invis2', fontSize=0.5, leading=0.5, textColor=colors.white), level=1))
        story.append(badge(d['matiere']))
        story.append(Spacer(1, 2*mm))
        story.append(Paragraph(clean(d['lecon']), S['lesson']))
        story.append(Paragraph(clean(d['label']) + f" . Semaine {s['num']}", S['small']))
        story.append(Spacer(1, 4*mm))
        story.append(Paragraph(clean(d['detail']), S['body']))
        story.append(Spacer(1, 4*mm))
        if enrich['retenir']:
            bullets = [Paragraph('- ' + clean(r), S['box']) for r in enrich['retenir']]
            story.append(box('À RETENIR', bullets, BOXBG, INK))
            story.append(Spacer(1, 3.5*mm))
        if enrich['exemples']:
            exs = [Paragraph(clean(e), st('ex', fontSize=10, leading=14.5, textColor=colors.HexColor('#5A4A75'))) for e in enrich['exemples']]
            story.append(box('EXEMPLES', exs, LIGHTBG, ACCENT))
            story.append(Spacer(1, 3.5*mm))
        if d.get('tip'):
            story.append(box('CONSEIL BREVET', [Paragraph(clean(d['tip']), S['box'])], TIPBG, ACCENT))
        story.append(PageBreak())

        exos = d.get('exercices') or []
        if exos:
            story.append(Marker(f'{did}:exercises'))
            story.append(badge(d['matiere']))
            story.append(Spacer(1, 2*mm))
            is_bb = s['index'] == 7
            titre_exo = 'BREVET BLANC - Exercices' if is_bb else 'Exercices'
            story.append(Paragraph(f"{titre_exo} - {clean(d['lecon'])[:70]}", st('exh', fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=INK)))
            story.append(Paragraph(clean(d['label']) + f" . Semaine {s['num']} . Corrigés en fin de cahier", S['small']))
            story.append(Spacer(1, 4*mm))
            if is_bb:
                story.append(box('CONDITIONS D\'EXAMEN', [Paragraph("Travaille seul(e), au calme, sans regarder les leçons. Chronomètre-toi et note ton score pour calculer ta note de brevet blanc.", S['box'])], TIPBG, ACCENT))
                story.append(Spacer(1, 4*mm))
            for i, ex in enumerate(exos, 1):
                story.extend(render_exo(i, ex))
            story.append(PageBreak())

# Corrigés
story.append(HeadingTOC('Corrigés', S['h1']))
story.append(Paragraph("Corrige-toi au stylo vert. Pour chaque exercice : la bonne réponse, puis une courte explication.", S['body']))
story.append(Spacer(1, 4*mm))
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    story.append(Paragraph(f"Semaine {s['num']} - {clean(s['theme'])}", S['h2']))
    for d in days:
        exos = d.get('exercices') or []
        if not exos: continue
        story.append(Paragraph(f"<b>{clean(d['label'])} - {clean(d['lecon'])[:70]}</b>", st('cd', fontSize=9.5, leading=13, spaceBefore=3)))
        for i, ex in enumerate(exos, 1):
            rep = clean(str(ex.get('answer', '')))
            expl = clean(ex.get('explanation', ''))
            story.append(Paragraph(f"{i}. <b>{rep}</b> - {expl}", S['corr']))
        story.append(Spacer(1, 2*mm))
story.append(PageBreak())

# Dernière page
story.append(Spacer(1, 60*mm))
story.append(Paragraph('Bravo !', S['cover1']))
story.append(Spacer(1, 6*mm))
story.append(Paragraph("Tu as terminé ton cahier de vacances et ton brevet blanc.<br/>Tu es prêt(e) pour la 3e : bonne rentrée, et vise la mention au brevet !", S['cover3']))

doc.multiBuild(story)
json.dump(PAGE_MAP, open(OUT_MAP, 'w'), indent=1)
print('PDF généré. Pages:', doc.page)
print('Jours mappés:', len([k for k in PAGE_MAP if k.endswith(':lesson')]), 'leçons /', len([k for k in PAGE_MAP if k.endswith(':exercises')]), 'exercices')
