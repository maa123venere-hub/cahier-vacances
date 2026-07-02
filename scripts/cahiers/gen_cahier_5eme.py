# -*- coding: utf-8 -*-
"""
Générateur du Grand Cahier de Vacances 6e -> 5e (toutes matières).
Gabarit STRICTEMENT identique aux cahiers 6e et 3e :
couverture, sommaire, mode d'emploi, planning 8 semaines,
1 page de leçon + 1 page d'exercices par journée, corrigés.
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
SEED = json.load(open(f'{SCRATCH}/seed5.json'))
OUT_PDF = '/Users/maxwellve/Desktop/Claude code/cahier-vacances 2k26/public/cahier-5eme.pdf'
OUT_MAP = f'{SCRATCH}/pagemap5.json'

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

# Identité 5e : vert émeraude (couleur du niveau dans l'appli)
INK      = colors.HexColor('#1F5440')
ACCENT   = colors.HexColor('#C2571F')
LIGHTBG  = colors.HexColor('#F1F0E8')
BOXBG    = colors.HexColor('#EDF5F0')
TIPBG    = colors.HexColor('#FBF3E2')
MAT_COLORS = {
    'français':   colors.HexColor('#4F46E5'),
    'maths':      colors.HexColor('#0891B2'),
    'anglais':    colors.HexColor('#DC2626'),
    'histoire':   colors.HexColor('#B45309'),
    'géographie': colors.HexColor('#059669'),
    'svt':        colors.HexColor('#16A34A'),
    'physique':   colors.HexColor('#7C3AED'),
    'technologie':colors.HexColor('#475569'),
    'sciences':   colors.HexColor('#0D9488'),
}
MAT_LABELS = {'français':'FRANÇAIS','maths':'MATHS','anglais':'ANGLAIS','histoire':'HISTOIRE','géographie':'GÉOGRAPHIE','svt':'SVT','physique':'PHYSIQUE-CHIMIE','technologie':'TECHNOLOGIE','sciences':'SCIENCES'}

def st(name, **kw):
    base = dict(fontName='Helvetica', fontSize=10.5, leading=15, textColor=INK)
    base.update(kw); return ParagraphStyle(name, **base)

S = {
  'body':    st('body', alignment=TA_JUSTIFY),
  'h1':      st('h1', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=INK, spaceAfter=6),
  'h2':      st('h2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=ACCENT, spaceBefore=8, spaceAfter=4),
  'lesson':  st('lesson', fontName='Helvetica-Bold', fontSize=15.5, leading=19.5, textColor=INK),
  'badge':   st('badge', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white),
  'small':   st('small', fontSize=9, leading=12.5, textColor=colors.HexColor('#5F8271')),
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
    ParagraphStyle('toc1', fontName='Helvetica', fontSize=9.5, leading=13.5, leftIndent=14, textColor=colors.HexColor('#3D7560')),
]

# ── Enrichissements pédagogiques 5e (rédigés pour ce cahier) ──────
ENRICH = {
'0-0': dict(retenir=[
  "La proposition subordonnée relative complète un nom : c'est une expansion du nom.",
  "Elle est introduite par un pronom relatif : qui, que, dont, où, lequel...",
  "Le nom complété s'appelle l'antécédent.",
  "qui = sujet ; que = COD ; dont = complément avec « de » ; où = lieu ou temps."],
 exemples=["« Le chevalier [qui porte une armure] s'avance » : la relative complète l'antécédent « chevalier ».",
  "« Le livre [que je lis] est passionnant » : que = COD de « lis »."]),
'0-1': dict(retenir=[
  "Pour additionner ou soustraire des fractions, il faut le MÊME dénominateur.",
  "Même dénominateur : on additionne les numérateurs et on garde le dénominateur.",
  "Sinon, on réduit d'abord au même dénominateur : 1/2 = 2/4.",
  "Pense à simplifier le résultat quand c'est possible."],
 exemples=["2/7 + 3/7 = 5/7.", "1/2 + 1/4 = 2/4 + 1/4 = 3/4.", "5/6 - 1/6 = 4/6 = 2/3."]),
'0-2': dict(retenir=[
  "La société féodale : le seigneur protège, le vassal jure fidélité (hommage) et doit l'aide.",
  "Trois ordres : ceux qui prient (clergé), ceux qui combattent (noblesse), ceux qui travaillent (paysans).",
  "Le château fort protège la seigneurie ; les paysans (serfs ou vilains) cultivent les terres.",
  "Le chevalier suit un code : l'adoubement, la bravoure, la loyauté, la courtoisie."],
 exemples=["Lors de l'hommage, le vassal s'agenouille devant son seigneur et reçoit un fief en échange de ses services."]),
'0-3': dict(retenir=[
  "La digestion transforme les aliments en nutriments assimilables par l'organisme.",
  "Trajet : bouche -> oesophage -> estomac -> intestin grêle -> gros intestin.",
  "Les sucs digestifs (salive, suc gastrique...) contiennent des enzymes qui découpent les aliments.",
  "L'absorption a lieu dans l'intestin grêle : les nutriments passent dans le sang."],
 exemples=["Le pain (amidon) commence à être digéré dès la bouche grâce à l'amylase de la salive."]),
'0-4': dict(retenir=[
  "Present simple = habitude, vérité générale : I play tennis every Sunday.",
  "Present continuous (be + V-ing) = action en cours : I am playing now.",
  "3e personne du present simple : + s (she plays).",
  "Mots-repères : every day, usually, often -> simple ; now, at the moment, look! -> continuous."],
 exemples=["She watches TV every evening. / She is watching TV right now."]),
'1-0': dict(retenir=[
  "Le roman de chevalerie raconte les exploits des chevaliers (quêtes, tournois, exploits).",
  "Univers : le roi Arthur, les chevaliers de la Table ronde, Lancelot, Perceval et le Graal.",
  "La description enrichit le récit : elle utilise des adjectifs, des comparaisons et un ordre logique.",
  "Pour décrire, organise ton regard : du général au détail, de haut en bas, du proche au lointain."],
 exemples=["« Son armure étincelante brillait comme mille soleils » : adjectif + comparaison au service du portrait du chevalier."]),
'1-1': dict(retenir=[
  "Les nombres relatifs : positifs (+3) et négatifs (-5), séparés par zéro.",
  "Sur une droite graduée, plus on va à gauche, plus le nombre est petit : -8 < -3.",
  "Addition : mêmes signes -> on additionne et on garde le signe ; signes contraires -> on soustrait et on prend le signe du « plus fort ».",
  "Deux nombres opposés s'annulent : (+7) + (-7) = 0."],
 exemples=["(-4) + (-6) = -10.", "(-5) + (+3) = -2.", "Température : 3 °C - 5 °C = -2 °C."]),
'1-2': dict(retenir=[
  "La lumière se propage en ligne droite (dans un milieu transparent et homogène).",
  "Réflexion : la lumière rebondit sur un miroir ; angle d'incidence = angle de réflexion.",
  "Réfraction : la lumière change de direction en changeant de milieu (air -> eau).",
  "On voit un objet quand la lumière qu'il envoie entre dans notre oeil."],
 exemples=["Une paille dans un verre d'eau semble « cassée » : c'est la réfraction."]),
'1-3': dict(retenir=[
  "Plus d'un humain sur deux vit en ville : c'est l'urbanisation.",
  "Les métropoles concentrent populations, activités et pouvoirs (Tokyo, New York, Paris, Lagos...).",
  "Les villes s'étalent : centres, banlieues, périurbain.",
  "Dans les pays en développement, la croissance urbaine rapide crée parfois des bidonvilles."],
 exemples=["Tokyo, la plus grande agglomération du monde, dépasse 37 millions d'habitants."]),
'1-4': dict(retenir=[
  "Grandes familles de matériaux : métalliques, organiques (bois, plastiques), céramiques et composites.",
  "Chaque matériau a des propriétés : dureté, densité, conductivité, résistance à la corrosion.",
  "Le choix d'un matériau dépend de l'usage, du coût et de l'impact environnemental.",
  "Recycler les matériaux économise les ressources et l'énergie."],
 exemples=["Un cadre de vélo : acier (solide, lourd), aluminium (léger) ou carbone (très léger, cher)."]),
'2-0': dict(retenir=[
  "Dans un récit au passé, imparfait et passé simple se complètent.",
  "Imparfait = décor, description, habitude (actions qui durent).",
  "Passé simple = actions ponctuelles, événements qui font avancer l'histoire.",
  "Imparfait : -ais, -ais, -ait, -ions, -iez, -aient. Passé simple (3e pers.) : il chanta, il finit, il vint."],
 exemples=["« Il pleuvait depuis des heures (imparfait, décor). Soudain, la porte claqua (passé simple, événement). »"]),
'2-1': dict(retenir=[
  "Aujourd'hui c'est le 14 juillet, la fête nationale !",
  "Elle commémore la prise de la Bastille, le 14 juillet 1789.",
  "Journée légère : un seul petit exercice, profite du feu d'artifice !"],
 exemples=["Devise de la République : Liberté, Égalité, Fraternité."]),
'2-2': dict(retenir=[
  "Deux grandeurs sont proportionnelles si on passe de l'une à l'autre en multipliant par un même nombre (le coefficient).",
  "Passage par l'unité : cherche d'abord la valeur pour 1.",
  "Appliquer t % : multiplier par t puis diviser par 100.",
  "Calculer un pourcentage : partie / total x 100."],
 exemples=["3 kg coûtent 6 EUR -> 1 kg = 2 EUR -> 5 kg = 10 EUR.", "20 % de 150 = 150 x 20 / 100 = 30."]),
'2-3': dict(retenir=[
  "À la puberté, le corps devient capable de se reproduire.",
  "Cellules reproductrices : spermatozoïdes (testicules) et ovules (ovaires).",
  "La fécondation est la rencontre d'un spermatozoïde et d'un ovule ; elle forme la cellule-oeuf.",
  "La grossesse dure environ 9 mois : l'embryon devient foetus dans l'utérus."],
 exemples=["Le cycle féminin dure environ 28 jours ; l'ovulation a lieu vers le 14e jour."]),
'2-4': dict(retenir=[
  "Le past simple raconte une action passée, datée et terminée.",
  "Verbes réguliers : base verbale + -ed (played, watched).",
  "Verbes irréguliers à apprendre : go -> went, see -> saw, have -> had, do -> did...",
  "Négation et question avec did : I didn't go. / Did you go?"],
 exemples=["Yesterday, I visited my grandparents and we watched a film."]),
'3-0': dict(retenir=[
  "Texte narratif : raconte une histoire (récit, roman, conte).",
  "Texte descriptif : peint un lieu, un personnage, un objet.",
  "Texte argumentatif : défend une opinion avec des arguments.",
  "Indices : temps du récit et actions (narratif) ; adjectifs et repères spatiaux (descriptif) ; connecteurs logiques et opinion (argumentatif)."],
 exemples=["« Il faut lire tous les jours car... » : argumentatif. « La forêt sombre s'étendait à perte de vue » : descriptif."]),
'3-1': dict(retenir=[
  "Une expression littérale contient des lettres : 3x + 5.",
  "Simplifier : 3 x a s'écrit 3a ; a x a s'écrit a2.",
  "Réduire : on regroupe les termes semblables (3x + 2x = 5x).",
  "Tester une égalité : on remplace la lettre par la valeur et on vérifie."],
 exemples=["Pour x = 4 : 2x + 1 = 9.", "5x - 2x + 7 = 3x + 7."]),
'3-2': dict(retenir=[
  "XVe-XVIe siècles : l'Humanisme place l'être humain au centre de la réflexion.",
  "L'imprimerie (Gutenberg, vers 1450) diffuse les idées et les savoirs.",
  "La Renaissance renouvelle les arts : perspective, mécènes, chefs-d'oeuvre.",
  "Grands noms : Léonard de Vinci, Michel-Ange, Érasme, Rabelais, Montaigne."],
 exemples=["François Ier invite Léonard de Vinci en France et fait construire Chambord."]),
'3-3': dict(retenir=[
  "Mélange homogène : on ne distingue plus les constituants (eau sucrée) ; hétérogène : on les distingue (eau + sable).",
  "Dissolution : le soluté (sel) se dissout dans le solvant (eau) -> solution.",
  "La masse se conserve : masse solution = masse eau + masse sel.",
  "Quand on ne peut plus dissoudre : la solution est saturée."],
 exemples=["20 g de sel dans 100 g d'eau -> 120 g de solution salée."]),
'3-4': dict(retenir=[
  "Present perfect = have/has + participe passé : I have finished.",
  "Il relie le passé au présent : bilan, expérience, résultat visible.",
  "Mots-repères : ever, never, just, already, yet.",
  "Ne l'utilise pas avec une date précise (là, c'est le past simple)."],
 exemples=["I have never been to London. / She has just arrived. / I visited London in 2024 (past simple)."]),
'4-0': dict(retenir=[
  "Comparaison : image AVEC outil (comme, tel que, pareil à).",
  "Métaphore : image SANS outil de comparaison.",
  "Hyperbole : exagération volontaire ; antithèse : opposition de deux idées.",
  "Personnification : une chose ou un animal se comporte comme un humain."],
 exemples=["« Il est rusé comme un renard » : comparaison. « Cet homme est un renard » : métaphore. « Je meurs de soif » : hyperbole."]),
'4-1': dict(retenir=[
  "La somme des angles d'un triangle vaut toujours 180°.",
  "Angle aigu < 90° ; angle droit = 90° ; angle obtus entre 90° et 180°.",
  "Triangles particuliers : isocèle (2 côtés égaux), équilatéral (3 côtés égaux, angles de 60°), rectangle (1 angle droit).",
  "Inégalité triangulaire : chaque côté est plus petit que la somme des deux autres."],
 exemples=["Deux angles de 60° et 70° -> le troisième vaut 180 - 130 = 50°."]),
'4-2': dict(retenir=[
  "Le développement durable concilie trois piliers : économie, social, environnement.",
  "Répondre aux besoins d'aujourd'hui sans compromettre ceux des générations futures.",
  "Gestes et solutions : énergies renouvelables, recyclage, transports doux, consommation responsable.",
  "Les États coopèrent : accords sur le climat, objectifs de développement durable de l'ONU."],
 exemples=["Trier ses déchets, privilégier le vélo, économiser l'eau : des actions à notre échelle."]),
'4-3': dict(retenir=[
  "Un écosystème = un milieu + les êtres vivants qui l'habitent + leurs relations.",
  "Chaîne alimentaire : producteurs (végétaux) -> consommateurs -> décomposeurs.",
  "La biodiversité est la diversité des espèces, des milieux et des gènes.",
  "L'activité humaine peut la menacer : pollution, déforestation, surpêche."],
 exemples=["Dans la mare : algues -> têtards -> poissons -> héron ; les bactéries décomposent."]),
'4-4': dict(retenir=[
  "Un programme = une suite d'instructions exécutées dans l'ordre.",
  "Les boucles répètent des instructions (répéter 10 fois...).",
  "Les conditions choisissent : si... alors... sinon...",
  "Les variables mémorisent des valeurs (score, vitesse...)."],
 exemples=["Jeu Scratch : SI le chat touche le mur ALORS score -1 SINON avancer de 10 pas."]),
'5-0': dict(retenir=[
  "Discours direct : on rapporte les paroles telles quelles, avec guillemets.",
  "Discours indirect : on rapporte avec une subordonnée (« Il dit que... »), sans guillemets.",
  "Au discours indirect : les pronoms, les temps et les repères changent.",
  "Après un verbe au passé : présent -> imparfait ; demain -> le lendemain ; je -> il/elle."],
 exemples=["Direct : Il dit : « Je pars demain. » -> Indirect : Il dit qu'il partait le lendemain."]),
'5-1': dict(retenir=[
  "Cercle : ensemble des points à égale distance (rayon) du centre.",
  "Périmètre = 2 x pi x r (ou pi x diamètre), avec pi environ 3,14.",
  "Aire du disque = pi x r2.",
  "Ne confonds pas : périmètre -> diamètre ; aire -> rayon au carré."],
 exemples=["r = 5 cm : périmètre = 2 x pi x 5 = 31,4 cm ; aire = pi x 25 = 78,5 cm2."]),
'5-2': dict(retenir=[
  "XVe-XVIe siècles : les Européens explorent le monde (caravelle, boussole, astrolabe).",
  "1492 : Christophe Colomb atteint l'Amérique en cherchant la route des Indes.",
  "1519-1522 : l'expédition de Magellan réalise le premier tour du monde.",
  "Conséquences : nouveaux échanges, empires coloniaux, mais aussi conquêtes et traites."],
 exemples=["Vasco de Gama contourne l'Afrique et atteint les Indes en 1498."]),
'5-3': dict(retenir=[
  "Un circuit électrique : générateur, fils, interrupteur, récepteurs (lampe, moteur).",
  "Circuit en série : une seule boucle ; si un élément grille, tout s'éteint.",
  "Circuit en dérivation : plusieurs boucles ; chaque récepteur est indépendant.",
  "Le courant ne passe que si le circuit est fermé ; attention aux courts-circuits !"],
 exemples=["Les prises de la maison sont en dérivation : débrancher la lampe n'éteint pas la télé."]),
'5-4': dict(retenir=[
  "will + base verbale : prédiction, décision prise sur le moment (I'll help you!).",
  "be going to + base verbale : projet, intention déjà décidée (I'm going to visit Rome).",
  "On emploie aussi going to quand des indices annoncent l'avenir (Look at the clouds! It's going to rain.).",
  "Négations : won't / isn't going to."],
 exemples=["Next summer, I am going to learn English. / Don't worry, I will help you."]),
'6-0': dict(retenir=[
  "Le subjonctif exprime le souhait, le doute, l'obligation, l'émotion.",
  "Il s'emploie après : il faut que, je veux que, bien que, avant que, pour que...",
  "Formation : que je chante, que tu chantes, qu'il chante, que nous chantions...",
  "Irréguliers : que je sois (être), que j'aie (avoir), que j'aille (aller), que je fasse (faire)."],
 exemples=["Il faut que tu fasses tes devoirs. / Je veux qu'il vienne. / Bien qu'il soit tard, il travaille."]),
'6-1': dict(retenir=[
  "Moyenne = somme des valeurs / nombre de valeurs.",
  "Médiane = valeur qui partage la série ordonnée en deux moitiés.",
  "Étendue = plus grande valeur - plus petite valeur.",
  "Ordonne TOUJOURS la série avant de chercher la médiane."],
 exemples=["Série 8, 10, 13, 15, 19 : moyenne = 13 ; médiane = 13 ; étendue = 11."]),
'6-2': dict(retenir=[
  "L'Afrique : 54 États, plus de 1,4 milliard d'habitants, une population jeune et en forte croissance.",
  "Des ressources immenses (minerais, pétrole, terres agricoles) mais inégalement réparties.",
  "Des défis : accès à l'eau et à l'éducation, urbanisation rapide, changement climatique.",
  "Des dynamiques : métropoles en essor (Lagos, Le Caire), téléphonie mobile, jeunesse entreprenante."],
 exemples=["Le Nigéria, pays le plus peuplé d'Afrique, dépasse 220 millions d'habitants."]),
'6-3': dict(retenir=[
  "La surface de la Terre est découpée en plaques tectoniques qui bougent de quelques cm par an.",
  "Aux frontières des plaques : séismes et volcans.",
  "Un séisme : rupture en profondeur (foyer), vibrations, épicentre en surface.",
  "On ne prédit pas les séismes, mais on construit des bâtiments parasismiques."],
 exemples=["La « ceinture de feu » du Pacifique concentre la majorité des volcans actifs."]),
'6-4': dict(retenir=[
  "can = capacité/permission ; could = passé de can ou politesse.",
  "must = obligation forte ; mustn't = interdiction.",
  "should = conseil ; shouldn't = déconseillé.",
  "Le modal est toujours suivi de la base verbale sans to."],
 exemples=["You must do your homework. / You shouldn't eat too much sugar. / Could you help me, please?"]),
'7-0': dict(retenir=[
  "Semaine de révision : reprends grammaire (relative, discours rapporté), conjugaison (imparfait/passé simple, subjonctif) et figures de style.",
  "Relis tes encadrés À RETENIR avant de faire les exercices.",
  "Note tes erreurs dans un carnet : c'est la meilleure façon de progresser."],
 exemples=["Auto-test : sais-tu citer les 4 pronoms relatifs principaux et 3 figures de style ?"]),
'7-1': dict(retenir=[
  "Révision maths : fractions, relatifs, proportionnalité, calcul littéral, angles, cercle, statistiques.",
  "Refais les exercices où tu as hésité pendant l'été.",
  "Vérifie tes formules : périmètre du cercle, aire du disque, somme des angles d'un triangle."],
 exemples=["Défi : calcule 1/2 + 1/4, (-5) + 8, et l'aire d'un disque de rayon 3 cm."]),
'7-2': dict(retenir=[
  "Histoire : féodalité, Humanisme et Renaissance, Grandes Découvertes - replace-les sur une frise.",
  "Géographie : urbanisation, développement durable, l'Afrique.",
  "Associe chaque période à une date ou un personnage clé pour mémoriser."],
 exemples=["1450 : imprimerie ; 1492 : Colomb ; 1519-1522 : Magellan."]),
'7-3': dict(retenir=[
  "SVT : digestion, reproduction, écosystèmes et biodiversité, géologie.",
  "Physique-chimie : lumière, mélanges et dissolution, circuits électriques.",
  "Pour chaque notion, essaie de faire un schéma légendé de mémoire."],
 exemples=["Schémas à refaire : le trajet des aliments, un circuit en dérivation, une chaîne alimentaire."]),
'7-4': dict(retenir=[
  "C'est le grand contrôle final : toutes les matières de l'été.",
  "Mets-toi en conditions : au calme, sans aide, chronomètre lancé.",
  "Corrige-toi ensuite avec les corrigés en fin de cahier et calcule ton score.",
  "Repère tes points faibles et relis les leçons correspondantes avant la rentrée."],
 exemples=["Tu as travaillé tout l'été : montre tout ce que tu sais, et bonne rentrée en 5e !"]),
}

def on_page(canv, doc):
    canv.saveState()
    if doc.page > 1:
        canv.setFont('Helvetica', 8)
        canv.setFillColor(colors.HexColor('#7FA491'))
        canv.drawString(20*mm, 285*mm, 'Grand Cahier de Vacances . 6e -> 5e')
        canv.drawRightString(190*mm, 285*mm, str(doc.page))
        canv.setStrokeColor(colors.HexColor('#D8E8DE'))
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
    items.append(Paragraph(f'<b>Exercice {n}</b> <font size="8.5" color="#7FA491">[{lab}]</font> - {q}', S['exo']))
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
           title='Grand Cahier de Vacances 6e-5e', author='Calendrier 2k26')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
doc.addPageTemplates([PageTemplate(id='p', frames=[frame], onPage=on_page)])

story = []

# Couverture
story.append(Spacer(1, 40*mm))
story.append(Paragraph('Cahier de<br/>Vacances', S['cover1']))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('Toutes matières . 6e -> 5e', S['cover2']))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('GRAND CAHIER DE VACANCES', st('c4', fontSize=10, alignment=TA_CENTER, textColor=colors.HexColor('#7FA491'))))
story.append(Paragraph('Préparation complète à l\'entrée en 5e', S['cover3']))
story.append(Spacer(1, 22*mm))
ident = Table([[Paragraph('Nom :', S['body']), ''], [Paragraph('Prénom :', S['body']), ''], [Paragraph('Classe :', S['body']), '']],
              colWidths=[28*mm, 100*mm], rowHeights=[10*mm]*3)
ident.setStyle(TableStyle([('LINEBELOW', (1,0), (1,-1), 0.7, INK), ('VALIGN', (0,0), (-1,-1), 'BOTTOM')]))
ident.hAlign = 'CENTER'
story.append(ident)
story.append(Spacer(1, 20*mm))
story.append(Paragraph('Leçons . Exercices . 9 matières . Contrôle final . Corrigés', st('c5', fontSize=11, alignment=TA_CENTER, textColor=ACCENT)))
story.append(PageBreak())

# Sommaire
story.append(HeadingTOC('Sommaire', S['h1']))
story.append(Paragraph("Huit semaines pour réviser tout le programme de 6e en neuf matières et arriver prêt(e) en 5e. À la fin du cahier : le grand contrôle final et tous les corrigés.", S['body']))
story.append(Spacer(1, 5*mm))
toc = TableOfContents(); toc.levelStyles = TOC_LEVELS; toc.dotsMinLevel = 0
story.append(toc)
story.append(PageBreak())

# Avant de commencer
story.append(HeadingTOC('Avant de commencer - mode d\'emploi', S['h1']))
for p in [
  "Bienvenue dans ton cahier de vacances ! Il est fait pour t'accompagner tout l'été, à ton rythme, et pour que ton entrée en 5e se passe en confiance.",
  "<b>Comment travailler ?</b> Un peu, mais souvent : 20 à 30 minutes par jour valent mieux que trois heures d'un coup. Chaque journée tient sur deux pages : d'abord la leçon, puis les exercices.",
  "<b>Le déroulé d'une journée :</b> 1. Lis la leçon et l'encadré À RETENIR. 2. Observe les exemples. 3. Fais les exercices sans regarder la leçon. 4. Corrige-toi avec les corrigés à la fin du cahier, au stylo vert.",
  "<b>Le matériel conseillé :</b> un crayon à papier, une gomme, un stylo bleu, un stylo vert pour corriger, et un cahier de brouillon. C'est tout !",
]:
    story.append(Paragraph(p, S['body'])); story.append(Spacer(1, 3*mm))
story.append(box('MÉTHODE - Un objectif clair', [Paragraph("À la fin de chaque semaine, fais le bilan dans l'application ou colorie tes étoiles sur le planning ci-après. Trois étoiles = semaine maîtrisée !", S['box'])], TIPBG, ACCENT))
story.append(Spacer(1, 3*mm))
story.append(box('ASTUCE', [Paragraph("Choisis un moment fixe dans la journée (par exemple après le petit-déjeuner) : la régularité fait toute la différence.", S['box'])], BOXBG, INK))
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
    labels = ' . '.join('( ) ' + clean(d['lecon']).split(' - ')[0].replace('Français','Fr').replace('Histoire-Géo','HG').replace('Histoire','Hist').replace('Géographie','Géo').replace('Physique-Chimie','PC').replace('Technologie','Techno').replace('Anglais','Ang').replace('Maths','Ma').replace('Sciences','Sci') for d in days)
    rows.append([Paragraph(f"<b>S{s['num']}</b>", S['box']), Paragraph(clean(s['theme']), S['box']), Paragraph(labels, st('pl', fontSize=8.5, leading=12))])
plan = Table(rows, colWidths=[16*mm, 52*mm, 92*mm])
plan.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.6, colors.HexColor('#C9E2D3')),
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
            exs = [Paragraph(clean(e), st('ex', fontSize=10, leading=14.5, textColor=colors.HexColor('#3D7560')))
                   for e in enrich['exemples']]
            story.append(box('EXEMPLES', exs, LIGHTBG, ACCENT))
            story.append(Spacer(1, 3.5*mm))
        if d.get('tip'):
            story.append(box('ASTUCE', [Paragraph(clean(d['tip']), S['box'])], TIPBG, ACCENT))
        story.append(PageBreak())

        exos = d.get('exercices') or []
        if exos:
            story.append(Marker(f'{did}:exercises'))
            story.append(badge(d['matiere']))
            story.append(Spacer(1, 2*mm))
            titre_exo = 'CONTRÔLE FINAL - Exercices' if d['type'] == 'controle' else 'Exercices'
            story.append(Paragraph(f"{titre_exo} - {clean(d['lecon'])[:70]}", st('exh', fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=INK)))
            story.append(Paragraph(clean(d['label']) + f" . Semaine {s['num']} . Corrigés en fin de cahier", S['small']))
            story.append(Spacer(1, 4*mm))
            if d['type'] == 'controle':
                story.append(box('CONDITIONS DE CONTRÔLE', [Paragraph("Travaille seul(e), au calme, sans regarder les leçons. Chronomètre-toi et note ton score !", S['box'])], TIPBG, ACCENT))
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
story.append(Paragraph("Tu as terminé ton cahier de vacances.<br/>Tu es prêt(e) pour la 5e : bonne rentrée !", S['cover3']))

doc.multiBuild(story)
json.dump(PAGE_MAP, open(OUT_MAP, 'w'), indent=1)
print('PDF généré. Pages:', doc.page)
print('Jours mappés:', len([k for k in PAGE_MAP if k.endswith(':lesson')]), 'leçons /', len([k for k in PAGE_MAP if k.endswith(':exercises')]), 'exercices')
