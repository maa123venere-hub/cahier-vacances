# -*- coding: utf-8 -*-
"""
Générateur du Grand Cahier de Vacances CM2 -> 6e (toutes matières).
Même structure que le cahier 4e : couverture, sommaire, mode d'emploi,
planning 8 semaines, 1 page de leçon + exercices par journée, corrigés.
Produit aussi un mapping JSON dayId -> {lesson, exercises} pages.
"""
import json, re, unicodedata
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Flowable, KeepTogether
)
from reportlab.platypus.tableofcontents import TableOfContents

SEED = json.load(open('/private/tmp/claude-501/-Users-maxwellve-Desktop-Claude-code-cahier-vacances-2k26/eafc5201-9700-42b9-9d29-ce9e13a195da/scratchpad/seed6.json'))
OUT_PDF = '/Users/maxwellve/Desktop/Claude code/cahier-vacances 2k26/public/cahier-6eme.pdf'
OUT_MAP = '/private/tmp/claude-501/-Users-maxwellve-Desktop-Claude-code-cahier-vacances-2k26/eafc5201-9700-42b9-9d29-ce9e13a195da/scratchpad/pagemap6.json'

# ── Nettoyage texte (polices standard = WinAnsi : pas d'emoji ni de flèches) ──
REPL = {'→': '->', '⭐': '', '🏆': '', '🎆': '', '·': '.', '½': '1/2', '⅓': '1/3', '¼': '1/4', 'œ': 'oe', 'Œ': 'OE', '‐': '-', '–': '-', '…': '...'}
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

# ── Couleurs ──────────────────────────────────────────────────────
INK      = colors.HexColor('#1F3A54')
ACCENT   = colors.HexColor('#C2571F')
LIGHTBG  = colors.HexColor('#F4F0E8')
BOXBG    = colors.HexColor('#EEF3F7')
TIPBG    = colors.HexColor('#FBF3E2')
MAT_COLORS = {
    'français':  colors.HexColor('#4F46E5'),
    'maths':     colors.HexColor('#0891B2'),
    'anglais':   colors.HexColor('#DC2626'),
    'histoire':  colors.HexColor('#B45309'),
    'géographie':colors.HexColor('#059669'),
    'sciences':  colors.HexColor('#7C3AED'),
}
MAT_LABELS = {'français':'FRANÇAIS','maths':'MATHS','anglais':'ANGLAIS','histoire':'HISTOIRE','géographie':'GÉOGRAPHIE','sciences':'SCIENCES'}

# ── Styles ────────────────────────────────────────────────────────
def st(name, **kw):
    base = dict(fontName='Helvetica', fontSize=10.5, leading=15, textColor=INK)
    base.update(kw); return ParagraphStyle(name, **base)

S = {
  'body':    st('body', alignment=TA_JUSTIFY),
  'h1':      st('h1', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=INK, spaceAfter=6),
  'h2':      st('h2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=ACCENT, spaceBefore=8, spaceAfter=4),
  'lesson':  st('lesson', fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=INK),
  'badge':   st('badge', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white),
  'small':   st('small', fontSize=9, leading=12.5, textColor=colors.HexColor('#5B7186')),
  'box':     st('box', fontSize=10, leading=14.5),
  'exo':     st('exo', fontSize=10.5, leading=15),
  'exoopt':  st('exoopt', fontSize=10, leading=16, leftIndent=16),
  'corr':    st('corr', fontSize=9, leading=12.5),
  'cover1':  st('cover1', fontName='Helvetica-Bold', fontSize=34, leading=40, alignment=TA_CENTER, textColor=INK),
  'cover2':  st('cover2', fontName='Helvetica-Bold', fontSize=16, leading=20, alignment=TA_CENTER, textColor=ACCENT),
  'cover3':  st('cover3', fontSize=12, leading=18, alignment=TA_CENTER, textColor=INK),
  'weekh':   st('weekh', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=colors.white),
  'weeksub': st('weeksub', fontSize=11, leading=16, textColor=colors.white),
  'toch':    st('toch', fontName='Helvetica-Bold', fontSize=13, leading=18, textColor=INK),
}
TOC_LEVELS = [
    ParagraphStyle('toc0', fontName='Helvetica-Bold', fontSize=11, leading=16, textColor=INK),
    ParagraphStyle('toc1', fontName='Helvetica', fontSize=9.5, leading=13.5, leftIndent=14, textColor=colors.HexColor('#3D5A75')),
]

# ── Enrichissements pédagogiques (rédigés pour ce cahier) ─────────
# id -> { retenir: [...], exemples: [...] }
ENRICH = {
'0-0': dict(retenir=[
  "Chaque mot appartient à une classe grammaticale (sa « famille »).",
  "Le nom désigne une personne, un animal, une chose ou une idée : chien, Julie, courage.",
  "Le verbe exprime une action ou un état : courir, dormir, être, sembler.",
  "L'adjectif précise le nom : une <b>grande</b> maison. Le déterminant le précède : <b>le</b>, <b>une</b>, <b>mes</b>.",
  "L'adverbe est invariable et modifie le verbe : il court <b>vite</b>."],
 exemples=["« Le petit chat dort. » -> le = déterminant, petit = adjectif, chat = nom, dort = verbe.",
  "« Elle chante joliment. » -> elle = pronom, chante = verbe, joliment = adverbe."]),
'0-1': dict(retenir=[
  "Dans un nombre entier, chaque chiffre a une valeur selon sa position : unités, dizaines, centaines, milliers.",
  "Pour lire un grand nombre, regroupe les chiffres par 3 en partant de la droite : 2 530.",
  "Pour comparer deux nombres : celui qui a le plus de chiffres est le plus grand ; sinon compare de gauche à droite."],
 exemples=["4 372 = 4 milliers + 3 centaines + 7 dizaines + 2 unités.",
  "10 000 > 9 999 (5 chiffres contre 4)."]),
'0-2': dict(retenir=[
  "Hello / Hi = Bonjour / Salut.",
  "My name is Tom. = Je m'appelle Tom.",
  "I am 11 years old. = J'ai 11 ans (en anglais on utilise le verbe être : <i>to be</i>).",
  "I like football. = J'aime le foot. Le pronom « I » prend toujours une majuscule."],
 exemples=["Hello! My name is Lisa. I am 11 years old. I am French. I like music."]),
'0-3': dict(retenir=[
  "La Préhistoire commence avec les premiers hommes (il y a environ 3 millions d'années).",
  "Elle se termine avec l'invention de l'écriture (il y a environ 5 000 ans).",
  "Les hommes préhistoriques taillaient le silex, maîtrisaient le feu et peignaient dans les grottes (Lascaux)."],
 exemples=["Frise : Préhistoire -> Antiquité -> Moyen Âge -> Temps modernes -> Époque contemporaine."]),
'0-4': dict(retenir=[
  "Un être vivant naît, se nourrit, grandit, se reproduit et meurt.",
  "Les végétaux fabriquent leur nourriture grâce à la lumière ; les animaux se nourrissent d'autres êtres vivants.",
  "On classe les êtres vivants selon leurs caractères communs (vertébrés / invertébrés...)."],
 exemples=["Le chêne, la mouche et l'être humain sont des êtres vivants ; le rocher et l'eau ne le sont pas."]),
'1-0': dict(retenir=[
  "Le groupe nominal (GN) est construit autour d'un nom : son noyau.",
  "GN minimal = déterminant + nom : « la mer ».",
  "On peut l'enrichir avec un adjectif ou un complément du nom : « la mer <b>bleue</b> », « la mer <b>du Nord</b> »."],
 exemples=["« Un vieux bateau rouge » : bateau = noyau ; un = déterminant ; vieux, rouge = adjectifs."]),
'1-1': dict(retenir=[
  "Pour additionner ou soustraire des nombres décimaux, on aligne les virgules l'une sous l'autre.",
  "On complète avec des zéros si besoin : 12,5 = 12,50.",
  "On calcule ensuite comme avec des entiers, en plaçant la virgule au résultat."],
 exemples=["12,50 + 3,75 = 16,25", "8,3 - 2,15 = 6,15"]),
'1-2': dict(retenir=[
  "La Grèce antique (vers 800 av. J.-C.) : cités comme Athènes et Sparte.",
  "Athènes a inventé la démocratie : les citoyens votent les lois.",
  "Les Grecs croyaient en plusieurs dieux (Zeus, Athéna, Poséidon) : ils étaient polythéistes.",
  "Les jeux Olympiques sont nés à Olympie, en l'honneur de Zeus."],
 exemples=["Le Parthénon, temple d'Athéna, domine encore Athènes aujourd'hui."]),
'1-3': dict(retenir=[
  "La matière existe sous trois états : solide, liquide, gazeux.",
  "Le solide a une forme propre ; le liquide prend la forme du récipient ; le gaz occupe tout l'espace.",
  "L'eau change d'état : fusion (glace -> eau), solidification, évaporation, condensation."],
 exemples=["À 0 °C l'eau gèle ; à 100 °C elle bout."]),
'1-4': dict(retenir=[
  "Les couleurs : red (rouge), blue (bleu), green (vert), yellow (jaune), black (noir), white (blanc).",
  "Les nombres : one, two, three, four, five, six, seven, eight, nine, ten.",
  "On dit : « The car is red. » (La voiture est rouge.)"],
 exemples=["I have two blue pens. = J'ai deux stylos bleus. (L'adjectif est AVANT le nom en anglais.)"]),
'2-0': dict(retenir=[
  "Une phrase simple contient un seul verbe conjugué.",
  "Le sujet fait l'action : on le trouve avec « Qui est-ce qui...? ».",
  "Le complément complète le verbe ou la phrase (COD, CC de lieu, de temps...).",
  "Une phrase commence par une majuscule et finit par un point."],
 exemples=["« Le chat mange la souris. » -> sujet = le chat ; verbe = mange ; COD = la souris."]),
'2-1': dict(retenir=[
  "Aujourd'hui c'est le 14 juillet : la fête nationale française !",
  "Elle rappelle la prise de la Bastille, le 14 juillet 1789, au début de la Révolution française.",
  "Journée légère : un seul petit exercice, profite du feu d'artifice !"],
 exemples=["Devise de la France : Liberté, Égalité, Fraternité."]),
'2-2': dict(retenir=[
  "La multiplication est une addition répétée : 4 x 3 = 4 + 4 + 4 = 12.",
  "L'ordre des facteurs ne change pas le produit : 7 x 5 = 5 x 7.",
  "Pour multiplier par 10, 100, 1000 : on décale les chiffres (36 x 100 = 3 600).",
  "Connais tes tables par coeur : c'est la clé du calcul rapide !"],
 exemples=["25 x 6 = (20 x 6) + (5 x 6) = 120 + 30 = 150."]),
'2-3': dict(retenir=[
  "Rome, fondée selon la légende par Romulus en 753 av. J.-C.",
  "Rome fut d'abord une royauté, puis une république, puis un empire (Auguste, 1er empereur).",
  "Les Romains ont construit routes, aqueducs, thermes et amphithéâtres (le Colisée).",
  "Jules César a conquis la Gaule (victoire d'Alésia sur Vercingétorix en 52 av. J.-C.)."],
 exemples=["Beaucoup de villes françaises sont d'origine romaine : Lyon (Lugdunum), Nîmes, Arles..."]),
'2-4': dict(retenir=[
  "La famille : mother (mère), father (père), sister (soeur), brother (frère).",
  "grandmother / grandfather = grand-mère / grand-père ; parents = les parents.",
  "« This is my brother. » = Voici mon frère."],
 exemples=["I have one sister and two brothers. = J'ai une soeur et deux frères."]),
'3-0': dict(retenir=[
  "Des synonymes ont un sens proche : content / heureux / joyeux.",
  "Des antonymes ont un sens contraire : grand / petit, monter / descendre.",
  "Une famille de mots partage le même radical : dent, dentiste, dentaire, dentifrice."],
 exemples=["Synonymes de « beau » : joli, magnifique, splendide. Antonyme : laid."]),
'3-1': dict(retenir=[
  "Une fraction représente un partage : 3/4 = 3 parts sur 4 parts égales.",
  "Le nombre du haut = numérateur (parts prises) ; celui du bas = dénominateur (parts totales).",
  "Si numérateur = dénominateur, la fraction vaut 1 : 4/4 = 1.",
  "1/2 = la moitié ; 1/4 = le quart ; 3/4 = les trois quarts."],
 exemples=["La moitié d'une pizza de 8 parts = 4 parts = 4/8 = 1/2."]),
'3-2': dict(retenir=[
  "Il y a 6 continents : Afrique, Amérique, Antarctique, Asie, Europe, Océanie.",
  "Et 5 océans : Pacifique (le plus grand), Atlantique, Indien, Arctique, Austral.",
  "Les océans couvrent environ 70 % de la surface de la Terre."],
 exemples=["La France se trouve en Europe, bordée par l'océan Atlantique et la mer Méditerranée."]),
'3-3': dict(retenir=[
  "Le squelette soutient le corps : environ 206 os chez l'adulte.",
  "Les muscles permettent le mouvement en tirant sur les os.",
  "Le coeur est un muscle qui pompe le sang ; les poumons assurent la respiration.",
  "Une bonne hygiène de vie : sommeil, alimentation équilibrée, sport."],
 exemples=["Le fémur, dans la cuisse, est l'os le plus long du corps humain."]),
'3-4': dict(retenir=[
  "La maison : house (maison), kitchen (cuisine), bedroom (chambre), bathroom (salle de bains), living room (salon), garden (jardin).",
  "« Where is the cat? It is in the kitchen. » = Où est le chat ? Il est dans la cuisine.",
  "in = dans ; on = sur ; under = sous."],
 exemples=["My bedroom is small but my garden is big."]),
'4-0': dict(retenir=[
  "Le présent de l'indicatif exprime ce qui se passe maintenant ou une habitude.",
  "1er groupe (-er) : je chante, tu chantes, il chante, nous chantons, vous chantez, ils chantent.",
  "2e groupe (-ir, -issons) : je finis, nous finissons.",
  "Verbes fréquents irréguliers : être (je suis), avoir (j'ai), aller (je vais), faire (je fais)."],
 exemples=["Tous les matins, je prends mon petit-déjeuner puis je pars à l'école."]),
'4-1': dict(retenir=[
  "Le carré : 4 côtés égaux et 4 angles droits.",
  "Le rectangle : côtés opposés égaux et 4 angles droits.",
  "Le triangle : 3 côtés (équilatéral, isocèle ou rectangle).",
  "Le cercle : tous ses points sont à égale distance du centre (le rayon)."],
 exemples=["Périmètre du carré = 4 x côté. Périmètre du rectangle = 2 x (longueur + largeur)."]),
'4-2': dict(retenir=[
  "La France métropolitaine compte 13 régions (18 avec l'outre-mer).",
  "Principaux massifs : Alpes (Mont Blanc, 4 806 m), Pyrénées, Massif central, Jura, Vosges.",
  "Grands fleuves : Loire (le plus long), Seine, Rhône, Garonne, Rhin."],
 exemples=["Paris est traversée par la Seine ; Lyon par le Rhône et la Saône."]),
'4-3': dict(retenir=[
  "Chaque animal vit dans un milieu adapté à ses besoins : forêt, rivière, océan, désert...",
  "Régimes alimentaires : herbivore, carnivore, omnivore.",
  "Une chaîne alimentaire relie les êtres vivants : plante -> criquet -> oiseau -> renard."],
 exemples=["Le dauphin vit dans l'océan et respire avec des poumons : c'est un mammifère marin."]),
'4-4': dict(retenir=[
  "Les animaux : dog (chien), cat (chat), bird (oiseau), fish (poisson), horse (cheval), rabbit (lapin).",
  "« I have a dog. » = J'ai un chien. « It is black. » = Il est noir.",
  "Pluriel régulier : on ajoute un -s : two cats, three birds."],
 exemples=["My rabbit is white and my two cats are grey."]),
'5-0': dict(retenir=[
  "Dans le GN, le déterminant et l'adjectif s'accordent avec le nom en genre et en nombre.",
  "Féminin : souvent + e (grand -> grande). Pluriel : souvent + s (petit -> petits).",
  "Attention aux pluriels en -aux : un cheval -> des chevaux ; un journal -> des journaux."],
 exemples=["« une fleur blanche », « des fleurs blanches », « de beaux jardins »."]),
'5-1': dict(retenir=[
  "L'aire mesure la surface d'une figure ; elle s'exprime en cm², m²...",
  "Aire du carré = côté x côté.",
  "Aire du rectangle = longueur x largeur.",
  "Ne confonds pas aire (surface) et périmètre (contour) !"],
 exemples=["Un rectangle de 6 cm sur 4 cm : aire = 24 cm² ; périmètre = 20 cm."]),
'5-2': dict(retenir=[
  "Le Moyen Âge dure environ 1 000 ans (de 476 à 1492).",
  "La société : ceux qui prient (clergé), ceux qui combattent (seigneurs, chevaliers), ceux qui travaillent (paysans).",
  "Les châteaux forts protègent ; les cathédrales témoignent de la foi.",
  "Personnages : Charlemagne (couronné en 800), Jeanne d'Arc."],
 exemples=["1492 : Christophe Colomb traverse l'Atlantique, fin du Moyen Âge."]),
'5-3': dict(retenir=[
  "Un mélange homogène : on ne distingue plus les constituants (eau + sucre).",
  "Un mélange hétérogène : on les distingue (eau + sable).",
  "Pour séparer : décantation, filtration, évaporation.",
  "Certains solides se dissolvent dans l'eau (sel, sucre) : ils sont solubles."],
 exemples=["L'eau salée est un mélange homogène ; en s'évaporant, l'eau laisse le sel."]),
'5-4': dict(retenir=[
  "Les sports : football, swimming (natation), tennis, basketball, riding (équitation).",
  "« I play tennis. » (jeux de balle) mais « I go swimming. »",
  "« Do you like...? Yes, I do. / No, I don't. » = Aimes-tu... ? Oui / Non."],
 exemples=["On Saturdays, I play football with my friends."]),
'6-0': dict(retenir=[
  "Le passé composé raconte une action passée et terminée.",
  "Formation : avoir ou être au présent + participe passé : j'ai mangé, je suis venu(e).",
  "Avec être, le participe s'accorde avec le sujet : elle est partie, ils sont partis.",
  "Participes : -er -> é (mangé) ; finir -> fini ; prendre -> pris ; faire -> fait."],
 exemples=["Hier, nous avons visité le château et nous sommes rentrés tard."]),
'6-1': dict(retenir=[
  "Deux grandeurs sont proportionnelles quand on multiplie l'une par un même nombre pour obtenir l'autre.",
  "Prix proportionnel à la quantité : 1 kg -> 2 EUR, donc 3 kg -> 6 EUR.",
  "Passage par l'unité : cherche d'abord la valeur pour 1."],
 exemples=["5 cahiers coûtent 10 EUR -> 1 cahier coûte 2 EUR -> 8 cahiers coûtent 16 EUR."]),
'6-2': dict(retenir=[
  "Une carte a toujours : un titre, une légende, une échelle et l'orientation (le nord).",
  "La légende explique les couleurs et les symboles.",
  "L'échelle donne les distances réelles : 1 cm sur la carte = 1 km en vrai (échelle 1/100 000)."],
 exemples=["Sur une carte au 1/25 000 (carte de randonnée), 4 cm représentent 1 km."]),
'6-3': dict(retenir=[
  "Sources d'énergie renouvelables : soleil, vent, eau, biomasse.",
  "Sources non renouvelables : pétrole, charbon, gaz (elles s'épuisent et polluent).",
  "Économiser l'énergie : éteindre les lumières, trier ses déchets, privilégier vélo et marche."],
 exemples=["Une éolienne transforme la force du vent en électricité."]),
'6-4': dict(retenir=[
  "La météo : sunny (ensoleillé), rainy (pluvieux), cloudy (nuageux), windy (venteux), snowy (neigeux).",
  "Les saisons : spring (printemps), summer (été), autumn (automne), winter (hiver).",
  "« What's the weather like? It is sunny. » = Quel temps fait-il ? Il fait beau."],
 exemples=["In winter, it is cold and sometimes snowy."]),
'7-0': dict(retenir=[
  "Semaine de révision : reprends tes leçons de grammaire et de conjugaison des semaines 1 à 7.",
  "Classes de mots, groupe nominal, accords, présent et passé composé : tout doit être solide.",
  "Refais les exercices où tu as hésité : c'est comme ça qu'on progresse."],
 exemples=["Relis tes encadrés « À RETENIR » avant de faire les exercices."]),
'7-1': dict(retenir=[
  "Révision maths : numération, opérations, fractions, figures, aires et proportionnalité.",
  "Vérifie tes tables de multiplication : elles doivent être automatiques.",
  "Relis bien chaque énoncé deux fois avant de répondre."],
 exemples=["Petit défi : calcule de tête 25 x 4, 12,5 + 7,5 et l'aire d'un carré de 9 cm de côté."]),
'7-2': dict(retenir=[
  "Histoire : Préhistoire, Grèce, Rome, Moyen Âge - replace-les sur une frise.",
  "Géographie : continents, océans, régions et fleuves de France, lecture de carte.",
  "Associe chaque période à un personnage ou un monument pour mieux mémoriser."],
 exemples=["Préhistoire -> Lascaux ; Grèce -> Parthénon ; Rome -> Colisée ; Moyen Âge -> château fort."]),
'7-3': dict(retenir=[
  "Sciences : êtres vivants, états de la matière, corps humain, mélanges, énergie.",
  "Anglais : se présenter, couleurs et nombres, famille, maison, animaux, sports, météo.",
  "Essaie de te présenter en anglais en 5 phrases sans regarder la leçon !"],
 exemples=["Hello! My name is... I am 11. I like... My favourite animal is..."]),
'7-4': dict(retenir=[
  "C'est le grand bilan de l'été : toutes les matières, tout le programme.",
  "Fais-le en conditions de contrôle : au calme, sans aide, en te chronométrant.",
  "Corrige-toi ensuite avec les corrigés à la fin du cahier, et colorie tes étoiles !"],
 exemples=["Tu as travaillé tout l'été : montre tout ce que tu sais, et bonne rentrée en 6e !"]),
}

# ── En-tête / pied de page ────────────────────────────────────────
def on_page(canv, doc):
    canv.saveState()
    if doc.page > 1:
        canv.setFont('Helvetica', 8)
        canv.setFillColor(colors.HexColor('#8AA0B4'))
        canv.drawString(20*mm, 285*mm, 'Grand Cahier de Vacances . CM2 -> 6e')
        canv.drawRightString(190*mm, 285*mm, str(doc.page))
        canv.setStrokeColor(colors.HexColor('#D8E0E8'))
        canv.setLineWidth(0.6)
        canv.line(20*mm, 283.5*mm, 190*mm, 283.5*mm)
        canv.setFont('Helvetica', 7.5)
        canv.drawCentredString(105*mm, 12*mm, str(doc.page))
    canv.restoreState()

# ── Marqueur de page (pour le mapping app -> PDF) ─────────────────
PAGE_MAP = {}
class Marker(Flowable):
    def __init__(self, key):
        super().__init__(); self.key = key; self.width = 0; self.height = 0
    def draw(self):
        PAGE_MAP[self.key] = self.canv.getPageNumber()

class HeadingTOC(Paragraph):
    """Titre qui s'enregistre dans le sommaire."""
    def __init__(self, text, style, level=0):
        super().__init__(text, style); self._toc_level = level; self._toc_text = re.sub('<[^>]+>', '', text)
    def draw(self):
        super().draw()
        self.canv.bookmarkPage(self._toc_text[:40])
    def wrap(self, aw, ah):
        return super().wrap(aw, ah)

class DocT(BaseDocTemplate):
    def afterFlowable(self, fl):
        if isinstance(fl, HeadingTOC):
            self.notify('TOCEntry', (fl._toc_level, fl._toc_text, self.page))

# ── Boîtes stylées ────────────────────────────────────────────────
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
    t = Table([[Paragraph(MAT_LABELS.get(matiere, matiere.upper()), S['badge'])]], colWidths=[34*mm], rowHeights=[6.5*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c), ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    t.hAlign = 'LEFT'
    return t

# ── Rendu d'un exercice ───────────────────────────────────────────
def render_exo(n, ex):
    items = []
    q = clean(ex.get('question', ''))
    typ = ex.get('type')
    lab = {'qcm': 'QCM', 'vrai_faux': 'Vrai ou Faux', 'completer': 'Compléter'}.get(typ, 'Exercice')
    items.append(Paragraph(f'<b>Exercice {n}</b> <font size="8.5" color="#8AA0B4">[{lab}]</font> - {q}', S['exo']))
    if typ == 'qcm':
        for opt in ex.get('options', []):
            items.append(Paragraph(f'( ) {clean(opt)}', S['exoopt']))
    elif typ == 'vrai_faux':
        items.append(Paragraph('( ) Vrai&nbsp;&nbsp;&nbsp;&nbsp;( ) Faux', S['exoopt']))
    else:
        items.append(Paragraph('Réponse : ..................................................................', S['exoopt']))
    items.append(Spacer(1, 3.5*mm))
    return items

# ── Construction du document ──────────────────────────────────────
doc = DocT(OUT_PDF, pagesize=A4,
           leftMargin=20*mm, rightMargin=20*mm, topMargin=22*mm, bottomMargin=18*mm,
           title='Grand Cahier de Vacances CM2-6e', author='Calendrier 2k26')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
doc.addPageTemplates([PageTemplate(id='p', frames=[frame], onPage=on_page)])

story = []

# ── Couverture ──
story.append(Spacer(1, 40*mm))
story.append(Paragraph('Cahier de<br/>Vacances', S['cover1']))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('Toutes matières . CM2 -> 6e', S['cover2']))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('GRAND CAHIER DE VACANCES', st('c4', fontSize=10, alignment=TA_CENTER, textColor=colors.HexColor('#8AA0B4'))))
story.append(Paragraph('Préparation complète à l\'entrée au collège', S['cover3']))
story.append(Spacer(1, 22*mm))
ident = Table([[Paragraph('Nom :', S['body']), ''], [Paragraph('Prénom :', S['body']), ''], [Paragraph('Classe :', S['body']), '']],
              colWidths=[28*mm, 100*mm], rowHeights=[10*mm]*3)
ident.setStyle(TableStyle([('LINEBELOW', (1,0), (1,-1), 0.7, INK), ('VALIGN', (0,0), (-1,-1), 'BOTTOM')]))
ident.hAlign = 'CENTER'
story.append(ident)
story.append(Spacer(1, 20*mm))
story.append(Paragraph('Leçons . Exercices . 5 matières . Bilan final . Corrigés', st('c5', fontSize=11, alignment=TA_CENTER, textColor=ACCENT)))
story.append(PageBreak())

# ── Sommaire ──
story.append(HeadingTOC('Sommaire', S['h1']))
story.append(Paragraph("Huit semaines pour réviser tout le programme de CM2 en cinq matières et arriver prêt(e) en 6e. À la fin du cahier : le bilan final de l'été et tous les corrigés.", S['body']))
story.append(Spacer(1, 5*mm))
toc = TableOfContents(); toc.levelStyles = TOC_LEVELS; toc.dotsMinLevel = 0
story.append(toc)
story.append(PageBreak())

# ── Avant de commencer ──
story.append(HeadingTOC('Avant de commencer - mode d\'emploi', S['h1']))
for p in [
  "Bienvenue dans ton cahier de vacances ! Il est fait pour t'accompagner tout l'été, à ton rythme, et pour que ton entrée en 6e se passe en confiance.",
  "<b>Comment travailler ?</b> Un peu, mais souvent : 20 à 30 minutes par jour valent mieux que trois heures d'un coup. Chaque journée tient sur deux pages : d'abord la leçon, puis les exercices.",
  "<b>Le déroulé d'une journée :</b> 1. Lis la leçon et l'encadré À RETENIR. 2. Observe les exemples. 3. Fais les exercices sans regarder la leçon. 4. Corrige-toi avec les corrigés à la fin du cahier, au stylo vert.",
  "<b>Le matériel conseillé :</b> un crayon à papier, une gomme, un stylo bleu, un stylo vert pour corriger, et un cahier de brouillon. C'est tout !",
]:
    story.append(Paragraph(p, S['body'])); story.append(Spacer(1, 3*mm))
story.append(box('MÉTHODE - Un objectif clair', [Paragraph("À la fin de chaque semaine, colorie les étoiles de ton auto-évaluation dans l'application ou sur le planning ci-après. Trois étoiles = semaine maîtrisée !", S['box'])], TIPBG, ACCENT))
story.append(Spacer(1, 3*mm))
story.append(box('ASTUCE', [Paragraph("Choisis un moment fixe dans la journée (par exemple après le petit-déjeuner) : la régularité fait toute la différence.", S['box'])], BOXBG, INK))
story.append(PageBreak())

# ── Planning 8 semaines ──
story.append(HeadingTOC('Planning de travail - 8 semaines', S['h1']))
story.append(Paragraph("Ce planning découpe le cahier en huit semaines équilibrées. Coche chaque séance terminée.", S['body']))
story.append(Spacer(1, 4*mm))
jours_by_week = {}
for j in SEED['jours']:
    jours_by_week.setdefault(j['semaineIndex'], []).append(j)
rows = [[Paragraph('<b>Semaine</b>', S['box']), Paragraph('<b>Thème</b>', S['box']), Paragraph('<b>Séances</b>', S['box'])]]
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    labels = ' . '.join('( ) ' + clean(d['lecon']).split(' - ')[0].replace('Français','Fr').replace('Histoire-Géographie','Hist-Géo').replace('Histoire','Hist').replace('Géographie','Géo').replace('Sciences & Anglais','Sci+Ang').replace('Sciences','Sci').replace('Anglais','Ang').replace('Maths','Ma') for d in days)
    rows.append([Paragraph(f"<b>S{s['num']}</b>", S['box']), Paragraph(clean(s['theme']), S['box']), Paragraph(labels, st('pl', fontSize=8.5, leading=12))])
plan = Table(rows, colWidths=[16*mm, 52*mm, 92*mm])
plan.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.6, colors.HexColor('#C9D6E2')),
    ('BACKGROUND', (0,0), (-1,0), BOXBG),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 5), ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(plan)
story.append(PageBreak())

# ── Les 8 semaines ──
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    wcol = colors.HexColor(s['color'])
    head = Table([[Paragraph(f"SEMAINE {s['num']}", st('wk', fontName='Helvetica-Bold', fontSize=11, textColor=colors.white)),],
                  [Paragraph(clean(s['theme']), S['weekh'])],
                  [Paragraph("Cinq séances cette semaine - une matière par jour. Coche chaque séance terminée !", S['weeksub'])]],
                 colWidths=[170*mm])
    head.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), wcol),
        ('LEFTPADDING', (0,0), (-1,-1), 12), ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (0,0), 10), ('BOTTOMPADDING', (0,-1), (-1,-1), 10),
    ]))
    story.append(HeadingTOC(f"Semaine {s['num']} - {clean(s['theme'])}", st('invis', fontSize=0.5, leading=0.5, textColor=colors.white), level=0))
    story.append(head)
    story.append(Spacer(1, 5*mm))
    # Liste des jours de la semaine
    for d in days:
        story.append(Paragraph(f"( )  <b>{clean(d['label'])}</b> - {clean(d['lecon'])}", S['body']))
        story.append(Spacer(1, 1.5*mm))
    story.append(PageBreak())

    # Pages leçon + exercices de chaque jour
    for d in days:
        did = d['id']
        enrich = ENRICH.get(did, dict(retenir=[], exemples=[]))
        story.append(Marker(f'{did}:lesson'))
        story.append(HeadingTOC(f"{clean(d['label'])} - {clean(d['lecon'])}", st('invis2', fontSize=0.5, leading=0.5, textColor=colors.white), level=1))
        story.append(badge(d['matiere']))
        story.append(Spacer(1, 2*mm))
        story.append(Paragraph(clean(d['lecon']), S['lesson']))
        story.append(Paragraph(clean(d['label']) + f" . Semaine {s['num']}", S['small']))
        story.append(Spacer(1, 4*mm))
        story.append(Paragraph(clean(d['detail']), S['body']))
        story.append(Spacer(1, 4*mm))
        if enrich['retenir']:
            bullets = [Paragraph('- ' + clean(r) if not r.startswith('<') else '- ' + r, S['box']) for r in enrich['retenir']]
            story.append(box('À RETENIR', bullets, BOXBG, INK))
            story.append(Spacer(1, 3.5*mm))
        if enrich['exemples']:
            exs = [Paragraph(clean(e), st('ex', fontSize=10, leading=14.5, textColor=colors.HexColor('#3D5A75'))) for e in enrich['exemples']]
            story.append(box('EXEMPLES', exs, LIGHTBG, ACCENT))
            story.append(Spacer(1, 3.5*mm))
        if d.get('tip'):
            story.append(box('ASTUCE', [Paragraph(clean(d['tip']), S['box'])], TIPBG, ACCENT))
        story.append(PageBreak())

        # Page exercices
        exos = d.get('exercices') or []
        if exos:
            story.append(Marker(f'{did}:exercises'))
            story.append(badge(d['matiere']))
            story.append(Spacer(1, 2*mm))
            titre_exo = 'BILAN FINAL - Exercices' if d['type'] == 'controle' else 'Exercices'
            story.append(Paragraph(f"{titre_exo} - {clean(d['lecon'])}", st('exh', fontName='Helvetica-Bold', fontSize=13.5, leading=17, textColor=INK)))
            story.append(Paragraph(clean(d['label']) + f" . Semaine {s['num']} . Corrigés en fin de cahier", S['small']))
            story.append(Spacer(1, 4*mm))
            for i, ex in enumerate(exos, 1):
                story.extend(render_exo(i, ex))
            story.append(PageBreak())

# ── Corrigés ──
story.append(HeadingTOC('Corrigés', S['h1']))
story.append(Paragraph("Corrige-toi au stylo vert. Pour chaque exercice : la bonne réponse, puis une courte explication.", S['body']))
story.append(Spacer(1, 4*mm))
for s in SEED['semaines']:
    days = jours_by_week.get(s['index'], [])
    story.append(Paragraph(f"Semaine {s['num']} - {clean(s['theme'])}", S['h2']))
    for d in days:
        exos = d.get('exercices') or []
        if not exos: continue
        story.append(Paragraph(f"<b>{clean(d['label'])} - {clean(d['lecon'])}</b>", st('cd', fontSize=9.5, leading=13, spaceBefore=3)))
        for i, ex in enumerate(exos, 1):
            rep = clean(str(ex.get('answer', '')))
            expl = clean(ex.get('explanation', ''))
            story.append(Paragraph(f"{i}. <b>{rep}</b> - {expl}", S['corr']))
        story.append(Spacer(1, 2*mm))
story.append(PageBreak())

# ── Dernière page ──
story.append(Spacer(1, 60*mm))
story.append(Paragraph('Bravo !', S['cover1']))
story.append(Spacer(1, 6*mm))
story.append(Paragraph("Tu as terminé ton cahier de vacances.<br/>Tu es prêt(e) pour la 6e : bonne rentrée !", S['cover3']))

doc.multiBuild(story)
json.dump(PAGE_MAP, open(OUT_MAP, 'w'), indent=1)
print('PDF généré. Pages:', doc.page)
print('Jours mappés:', len([k for k in PAGE_MAP if k.endswith(':lesson')]), 'leçons /', len([k for k in PAGE_MAP if k.endswith(':exercises')]), 'exercices')
