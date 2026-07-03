# -*- coding: utf-8 -*-
"""
Générateur des 4 Grands Cahiers de Vacances de MATHS (6e, 5e, 4e, 3e).
Même gabarit que les cahiers Français : couverture, sommaire, mode d'emploi,
planning 8 semaines, 1 page de leçon + pages d'exercices par journée, corrigés.
Produit un mapping JSON {niveau: {dayId: {lesson, exercises}}}.

Usage : exporter le contenu en JSON (voir scripts/cahiers/README.md), puis
python3 gen_cahier_maths.py <chemin maths-all.json> <dossier public> <pagemap out>
"""
import json, re, sys
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

SRC = sys.argv[1] if len(sys.argv) > 1 else '/private/tmp/claude-501/-Users-maxwellve-Desktop-Claude-code-cahier-vacances-2k26/eafc5201-9700-42b9-9d29-ce9e13a195da/scratchpad/maths-all.json'
PUBDIR = sys.argv[2] if len(sys.argv) > 2 else '/Users/maxwellve/Desktop/Claude code/cahier-vacances 2k26/public'
MAPOUT = sys.argv[3] if len(sys.argv) > 3 else '/private/tmp/claude-501/-Users-maxwellve-Desktop-Claude-code-cahier-vacances-2k26/eafc5201-9700-42b9-9d29-ce9e13a195da/scratchpad/pagemap-maths.json'

DATA = json.load(open(SRC))

REPL = {'→': '->', '⭐': '', '🏆': '', '🎆': '', '·': '.', '½': '1/2', '⅓': '1/3', '¼': '1/4',
        'œ': 'oe', 'Œ': 'OE', '‐': '-', '–': '-', '…': '...', '²': '2', '³': '3', '⁵': '5', '⁶': '6',
        'ⁿ': '^n', '≠': '=/=', '≈': 'env. ', '≤': '<=', '≥': '>=', '∈': 'appartient à', '∉': "n'appartient pas à",
        '⊥': 'perpendiculaire', '△': 'triangle ', '√': 'racine de ', 'π': 'pi', '×': 'x', '÷': '/', '−': '-',
        '☀': '', '😴': '', '✨': '', '⚖': '', '➖': '-', '⚡': '', '🍕': '', '🔤': '', '📈': '', '📐': '', '🎲': '', '📝': '', '🔢': '', '🌡': '', '🍰': '', '🔷': '', '📦': '', '🌳': '', '🏗': '', '🔬': '', '🌊': '', '📜': '', '✏': '', '🔍': '', '🌟': '', '📖': '', '🍯': '', '💪': ''}
def clean(s):
    if not s: return ''
    for k, v in REPL.items(): s = s.replace(k, v)
    out = []
    for ch in s:
        try:
            ch.encode('cp1252'); out.append(ch)
        except UnicodeEncodeError:
            pass
    return re.sub(r'  +', ' ', ''.join(out)).strip()

# Identité par niveau (couleurs du niveau dans l'appli)
CONFIG = {
    '6eme': dict(label='6e', titre='Mathématiques 6e', sub='CM2 -> 6e', ink='#0E4A5C', accent='#0891B2', foot='Grand Cahier de Maths . 6e'),
    '5eme': dict(label='5e', titre='Mathématiques 5e', sub='6e -> 5e', ink='#1F5440', accent='#059669', foot='Grand Cahier de Maths . 5e'),
    '4eme': dict(label='4e', titre='Mathématiques 4e', sub='5e -> 4e', ink='#5C3A0E', accent='#D97706', foot='Grand Cahier de Maths . 4e'),
    '3eme': dict(label='3e', titre='Mathématiques 3e', sub='3e -> Brevet', ink='#5C1F2E', accent='#DC2626', foot='Grand Cahier de Maths . 3e'),
}

# ── Blocs pédagogiques par domaine (rédigés pour ce cahier) ───────
ENRICH_BLOCKS = [
    [r'relatif|enchaîné|enchaine|priorité|priorite', dict(retenir=[
        'Nombres relatifs : positifs (+) et négatifs (-), séparés par zéro.',
        'Addition : mêmes signes -> on additionne et on garde le signe ; signes contraires -> on soustrait et on prend le signe du plus fort.',
        'Soustraire un nombre, c\'est ajouter son opposé : a - b = a + (-b).',
        'Multiplication et division : signes identiques -> + ; signes différents -> -.',
        'Priorités : les multiplications et divisions se calculent avant les additions et soustractions.'],
        exemples=['(-5) + (+3) = -2 ; (-4) + (-6) = -10.', '(-5) x (-2) = +10 ; (+15) / (-5) = -3.', '-2 + 3 x (-4) = -2 + (-12) = -14.'])],
    [r'fraction', dict(retenir=[
        'Une fraction, c\'est un partage : numérateur (parts prises) sur dénominateur (parts totales).',
        'Additionner ou soustraire : il faut le MÊME dénominateur (on réduit d\'abord si besoin).',
        'Multiplier : numérateurs entre eux, dénominateurs entre eux.',
        'Diviser par une fraction = multiplier par son inverse.',
        'Fraction d\'une quantité : diviser par le dénominateur puis multiplier par le numérateur.'],
        exemples=['1/2 + 1/4 = 2/4 + 1/4 = 3/4.', '2/3 x 3/4 = 6/12 = 1/2.', 'Les 3/5 de 30 : 30 / 5 x 3 = 18.'])],
    [r'puissance|scientifique', dict(retenir=[
        'a^n = a multiplié n fois par lui-même : 2^5 = 32.',
        '10^n = 1 suivi de n zéros : 10^4 = 10 000.',
        'Produit de puissances de même base : on ADDITIONNE les exposants.',
        'Écriture scientifique : a x 10^n avec un seul chiffre non nul avant la virgule (1 <= a < 10).'],
        exemples=['10^2 x 10^3 = 10^5.', '3 200 = 3,2 x 10^3 ; 0,0072 = 7,2 x 10^-3.'])],
    [r'identité|littéral|litteral|développ|develop|factoris|distributiv|réduire|reduire', dict(retenir=[
        'Réduire : on regroupe les termes semblables (3x + 2x = 5x).',
        'Développer : k(a + b) = ka + kb ; (a+b)(c+d) = ac + ad + bc + bd.',
        'Identités remarquables : (a+b)2 = a2 + 2ab + b2 ; (a-b)2 = a2 - 2ab + b2 ; (a+b)(a-b) = a2 - b2.',
        'Factoriser : repérer le facteur commun (ka + kb = k(a + b)) ou reconnaître une identité.',
        'Substituer : remplacer la lettre par sa valeur, puis appliquer les priorités.'],
        exemples=['3(x + 2) = 3x + 6.', '(x + 3)2 = x2 + 6x + 9 (ne pas oublier le double produit !).', 'x2 - 9 = (x - 3)(x + 3).'])],
    [r'équation|equation|inéquation|inequation', dict(retenir=[
        'Résoudre, c\'est trouver la valeur de l\'inconnue qui rend l\'égalité vraie.',
        'x + a = b -> x = b - a. ax = b -> x = b / a. ax + b = c -> on enlève b, puis on divise par a.',
        'Équation produit : A x B = 0 équivaut à A = 0 OU B = 0.',
        'On vérifie toujours la solution en la remplaçant dans l\'équation de départ.',
        'Inéquation : mêmes règles, mais l\'ensemble des solutions est un intervalle.'],
        exemples=['2x + 3 = 11 -> 2x = 8 -> x = 4.', '(x - 2)(x + 5) = 0 -> x = 2 ou x = -5.'])],
    [r'pythagore|thal|trigo|cosinus', dict(retenir=[
        'Pythagore (triangle rectangle) : hypoténuse2 = somme des carrés des deux autres côtés.',
        'Réciproque : si l\'égalité est vérifiée, alors le triangle est rectangle.',
        'Thalès : droites parallèles coupées par deux sécantes -> rapports de longueurs égaux (produit en croix).',
        'Trigonométrie : SOH-CAH-TOA (sin = opposé/hyp ; cos = adjacent/hyp ; tan = opposé/adjacent).'],
        exemples=['Côtés 3 et 4 : hypoténuse = racine de (9 + 16) = 5.', 'cos(60°) = 0,5.', 'AM/AB = MN/BC quand (MN) // (BC).'])],
    [r'fonction', dict(retenir=[
        'Une fonction associe à un nombre x une image f(x).',
        'Fonction linéaire : f(x) = ax -> proportionnalité, droite passant par l\'origine.',
        'Fonction affine : f(x) = ax + b -> droite ; b est l\'ordonnée à l\'origine (valeur en x = 0).',
        'Calculer une image : remplacer x. Chercher un antécédent : résoudre f(x) = valeur.'],
        exemples=['f(x) = 2x + 1 : f(3) = 7.', 'Si f(x) = ax et f(2) = 10, alors a = 5.'])],
    [r'proportionnalité|proportionnalite|pourcentage|échelle|echelle|vitesse|débit|debit|grandeur', dict(retenir=[
        'Deux grandeurs proportionnelles : on passe de l\'une à l\'autre en multipliant par un même coefficient.',
        'Passage par l\'unité : cherche d\'abord la valeur pour 1.',
        'Appliquer t % : multiplier par t puis diviser par 100.',
        'Vitesse : v = d / t ; distance : d = v x t.',
        'Quatrième proportionnelle : produit en croix.'],
        exemples=['3 kg -> 12 EUR, donc 1 kg -> 4 EUR et 5 kg -> 20 EUR.', '20 % de 150 = 30.', '240 km en 3 h -> 80 km/h.'])],
    [r'statisti|moyenne|médiane|mediane|données|donnees|quartile', dict(retenir=[
        'Moyenne = somme des valeurs / nombre de valeurs.',
        'Médiane = valeur qui partage la série ORDONNÉE en deux moitiés.',
        'Étendue = plus grande valeur - plus petite valeur.',
        'Fréquence = effectif / effectif total (entre 0 et 1, ou en %).'],
        exemples=['Série 8, 10, 13, 15, 19 : moyenne 13, médiane 13, étendue 11.'])],
    [r'probabilit|hasard|arbre', dict(retenir=[
        'Probabilité = cas favorables / cas possibles, toujours entre 0 (impossible) et 1 (certain).',
        'La somme des probabilités de toutes les issues vaut 1.',
        'Deux épreuves : un arbre permet de compter toutes les issues.'],
        exemples=['Dé équilibré : P(nombre pair) = 3/6 = 1/2.', 'Urne 3 rouges + 2 bleues : P(rouge) = 3/5.'])],
    [r'angle', dict(retenir=[
        'La somme des angles d\'un triangle vaut 180°.',
        'Angles complémentaires : somme 90° ; supplémentaires : somme 180°.',
        'Aigu < 90° ; droit = 90° ; obtus entre 90° et 180° ; plat = 180°.'],
        exemples=['Deux angles de 60° et 70° -> le troisième vaut 50°.'])],
    [r'volume|espace|prisme|cylindre|pavé|pave', dict(retenir=[
        'Volume du pavé droit : L x l x h. Volume du cube : arête au cube.',
        'Volume du cylindre : pi x r2 x h ; pyramide et cône : (base x hauteur) / 3.',
        '1 L = 1 dm3 ; 1 m3 = 1 000 L.'],
        exemples=['Pavé 2 x 3 x 4 : V = 24 cm3.'])],
    [r'aire|périmètre|perimetre|cercle|disque|figure|carré|carre|rectangle|triangle|mesure', dict(retenir=[
        'Périmètre = longueur du contour ; aire = surface (en cm2, m2...).',
        'Carré : P = 4c ; A = c x c. Rectangle : P = 2(L + l) ; A = L x l.',
        'Triangle : A = (base x hauteur) / 2.',
        'Cercle : P = 2 x pi x r ; disque : A = pi x r2.'],
        exemples=['Rectangle 6 x 4 : P = 20 cm ; A = 24 cm2.', 'r = 5 : P = 31,4 cm ; A = 78,5 cm2.'])],
    [r'division|euclidienne|partage|divisib|multiple|diviseur|pgcd|premier|arithmé|arithme|irréductible', dict(retenir=[
        'Division euclidienne : dividende = diviseur x quotient + reste, avec reste < diviseur.',
        'Critères de divisibilité : par 2 (pair), par 5 (finit par 0 ou 5), par 3 et 9 (somme des chiffres).',
        'Un nombre premier a exactement deux diviseurs : 1 et lui-même.',
        'PGCD : plus grand diviseur commun ; on l\'utilise pour rendre une fraction irréductible.'],
        exemples=['47 = 5 x 9 + 2.', 'PGCD(12 ; 18) = 6, donc 12/18 = 2/3.'])],
    [r'multipli|table|décima|decima|addition|soustra|numération|numeration|entier|nombre|comparer|ordre', dict(retenir=[
        'Chaque chiffre a une valeur selon sa position : unités, dizaines, centaines, milliers...',
        'Pour additionner ou soustraire des décimaux : on aligne les virgules.',
        'x10, x100, x1000 : la virgule se décale vers la droite ; /10, /100 : vers la gauche.',
        'Ordre de grandeur : on arrondit pour estimer un résultat rapidement.'],
        exemples=['12,50 + 3,75 = 16,25.', '3,4 x 100 = 340.', '297 x 4, c\'est environ 300 x 4 = 1 200.'])],
    [r'symétri|symetri|droite|perpendic|parallèle|parallele|quadrilat|losange|construction', dict(retenir=[
        'Symétrie axiale : par rapport à une droite (pliage) ; symétrie centrale : par rapport à un point (demi-tour).',
        'Les symétries conservent les longueurs, les angles et les aires.',
        'Parallélogramme : côtés opposés parallèles et égaux, diagonales qui se coupent en leur milieu.',
        'Rectangle : 4 angles droits ; losange : 4 côtés égaux ; carré : les deux.'],
        exemples=['Le carré possède 4 axes de symétrie.', 'Les diagonales d\'un losange sont perpendiculaires.'])],
]
DEFAULT_ENRICH = dict(retenir=[
    'Relis la leçon du jour dans l\'application avant de faire les exercices.',
    'Écris chaque calcul en entier : les étapes comptent autant que le résultat.',
    'Vérifie tes réponses : remplace, refais le calcul dans l\'autre sens, contrôle l\'ordre de grandeur.'],
    exemples=['Astuce générale : commence par les questions que tu maîtrises le mieux.'])

def enrich_for(lecon):
    for pat, block in ENRICH_BLOCKS:
        if re.search(pat, lecon, re.I): return block
    return DEFAULT_ENRICH

# ── Rendu (gabarit identique aux cahiers Français) ────────────────
def build_cahier(lvl_key):
    cfg = CONFIG[lvl_key]
    data = DATA[lvl_key]
    INK = colors.HexColor(cfg['ink']); ACCENT = colors.HexColor(cfg['accent'])
    LIGHTBG = colors.HexColor('#F4F1EA'); BOXBG = colors.HexColor('#EFF3F6'); TIPBG = colors.HexColor('#FBF3E2')

    def st(name, **kw):
        base = dict(fontName='Helvetica', fontSize=10.5, leading=15, textColor=INK)
        base.update(kw); return ParagraphStyle(name + lvl_key, **base)
    S = {
      'body': st('body', alignment=TA_JUSTIFY),
      'h1': st('h1', fontName='Helvetica-Bold', fontSize=20, leading=24, spaceAfter=6),
      'h2': st('h2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=ACCENT, spaceBefore=8, spaceAfter=4),
      'lesson': st('lesson', fontName='Helvetica-Bold', fontSize=15.5, leading=19.5),
      'badge': st('badge', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white),
      'small': st('small', fontSize=9, leading=12.5, textColor=colors.HexColor('#75828E')),
      'box': st('box', fontSize=10, leading=14.5),
      'exo': st('exo', fontSize=10.5, leading=15),
      'exoopt': st('exoopt', fontSize=10, leading=16, leftIndent=16),
      'corr': st('corr', fontSize=9, leading=12.5),
      'cover1': st('cover1', fontName='Helvetica-Bold', fontSize=34, leading=40, alignment=TA_CENTER),
      'cover2': st('cover2', fontName='Helvetica-Bold', fontSize=16, leading=20, alignment=TA_CENTER, textColor=ACCENT),
      'cover3': st('cover3', fontSize=12, leading=18, alignment=TA_CENTER),
      'weekh': st('weekh', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=colors.white),
      'weeksub': st('weeksub', fontSize=11, leading=16, textColor=colors.white),
    }
    TOCL = [ParagraphStyle('t0' + lvl_key, fontName='Helvetica-Bold', fontSize=11, leading=16, textColor=INK),
            ParagraphStyle('t1' + lvl_key, fontName='Helvetica', fontSize=9.5, leading=13.5, leftIndent=14, textColor=colors.HexColor('#5A6B7A'))]

    def on_page(canv, doc):
        canv.saveState()
        if doc.page > 1:
            canv.setFont('Helvetica', 8); canv.setFillColor(colors.HexColor('#8A9AAB'))
            canv.drawString(20*mm, 285*mm, cfg['foot'])
            canv.drawRightString(190*mm, 285*mm, str(doc.page))
            canv.setStrokeColor(colors.HexColor('#DDE4EA')); canv.setLineWidth(0.6)
            canv.line(20*mm, 283.5*mm, 190*mm, 283.5*mm)
            canv.setFont('Helvetica', 7.5); canv.drawCentredString(105*mm, 12*mm, str(doc.page))
        canv.restoreState()

    page_map = {}
    class Marker(Flowable):
        def __init__(self, key):
            super().__init__(); self.key = key; self.width = 0; self.height = 0
        def draw(self):
            page_map[self.key] = self.canv.getPageNumber()

    class HeadingTOC(Paragraph):
        def __init__(self, text, style, level=0):
            super().__init__(text, style); self._lvl = level; self._txt = re.sub('<[^>]+>', '', text)
        def draw(self):
            super().draw(); self.canv.bookmarkPage(self._txt[:40])

    class DocT(BaseDocTemplate):
        def afterFlowable(self, fl):
            if isinstance(fl, HeadingTOC):
                self.notify('TOCEntry', (fl._lvl, fl._txt, self.page))

    def box(title, items, bg, border):
        inner = [[Paragraph(f'<b>{title}</b>', st('bt', fontName='Helvetica-Bold', fontSize=9.5, textColor=border))]] + [[f] for f in items]
        t = Table(inner, colWidths=[160*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), bg), ('BOX', (0, 0), (-1, -1), 1, border),
            ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
            ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
        return t

    def badge(txt):
        t = Table([[Paragraph(txt, S['badge'])]], colWidths=[40*mm], rowHeights=[6.5*mm])
        t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), ACCENT), ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
        t.hAlign = 'LEFT'; return t

    def render_exo(n, ex):
        items = []
        lab = {'qcm': 'QCM', 'vrai_faux': 'Vrai ou Faux', 'completer': 'Compléter'}.get(ex.get('type'), 'Exercice')
        items.append(Paragraph(f'<b>Exercice {n}</b> <font size="8.5" color="#8A9AAB">[{lab}]</font> - {clean(ex.get("question", ""))}', S['exo']))
        if ex.get('type') == 'qcm':
            for opt in ex.get('options', []):
                items.append(Paragraph(f'( ) {clean(str(opt))}', S['exoopt']))
        elif ex.get('type') == 'vrai_faux':
            items.append(Paragraph('( ) Vrai&nbsp;&nbsp;&nbsp;&nbsp;( ) Faux', S['exoopt']))
        else:
            items.append(Paragraph('Réponse : ..................................................................', S['exoopt']))
        items.append(Spacer(1, 3.5*mm))
        return items

    outfile = f'{PUBDIR}/cahier-maths-{lvl_key}.pdf'
    doc = DocT(outfile, pagesize=A4, leftMargin=20*mm, rightMargin=20*mm, topMargin=22*mm, bottomMargin=18*mm,
               title=f'Grand Cahier de Maths {cfg["label"]}', author='Calendrier 2k26')
    doc.addPageTemplates([PageTemplate(id='p', frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')], onPage=on_page)])

    story = []
    weeks = data['weeks']; cur = data['curriculum']

    # Couverture
    story.append(Spacer(1, 40*mm))
    story.append(Paragraph('Cahier de<br/>Maths', S['cover1']))
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph(f'Mathématiques . {cfg["sub"]}', S['cover2']))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph('GRAND CAHIER DE VACANCES', st('c4', fontSize=10, alignment=TA_CENTER, textColor=colors.HexColor('#8A9AAB'))))
    story.append(Paragraph('Tout le programme de maths de l\'été', S['cover3']))
    story.append(Spacer(1, 22*mm))
    ident = Table([[Paragraph('Nom :', S['body']), ''], [Paragraph('Prénom :', S['body']), ''], [Paragraph('Classe :', S['body']), '']],
                  colWidths=[28*mm, 100*mm], rowHeights=[10*mm]*3)
    ident.setStyle(TableStyle([('LINEBELOW', (1, 0), (1, -1), 0.7, INK), ('VALIGN', (0, 0), (-1, -1), 'BOTTOM')]))
    ident.hAlign = 'CENTER'
    story.append(ident)
    story.append(Spacer(1, 20*mm))
    story.append(Paragraph('Leçons . 478 exercices . Corrigés complets', st('c5', fontSize=11, alignment=TA_CENTER, textColor=ACCENT)))
    story.append(PageBreak())

    # Sommaire
    story.append(HeadingTOC('Sommaire', S['h1']))
    story.append(Paragraph(f'Huit semaines pour réviser tout le programme de maths et arriver prêt(e) en {cfg["label"]}. À la fin du cahier : tous les corrigés.', S['body']))
    story.append(Spacer(1, 5*mm))
    toc = TableOfContents(); toc.levelStyles = TOCL; toc.dotsMinLevel = 0
    story.append(toc)
    story.append(PageBreak())

    # Mode d'emploi
    story.append(HeadingTOC('Avant de commencer - mode d\'emploi', S['h1']))
    for p in [
        'Bienvenue dans ton cahier de maths ! Il accompagne l\'application : mêmes leçons, mêmes exercices, pour travailler aussi sur papier.',
        '<b>Comment travailler ?</b> Un peu, mais souvent : 20 à 30 minutes par jour. Chaque journée : une page de leçon, puis 10 à 12 exercices.',
        '<b>Le déroulé d\'une journée :</b> 1. Lis la leçon et l\'encadré À RETENIR. 2. Observe les exemples. 3. Fais les exercices SANS calculatrice quand c\'est possible. 4. Corrige-toi au stylo vert avec les corrigés en fin de cahier.',
        '<b>Le matériel :</b> crayon, gomme, règle, équerre, compas, et un cahier de brouillon pour poser les calculs.',
    ]:
        story.append(Paragraph(p, S['body'])); story.append(Spacer(1, 3*mm))
    story.append(box('MÉTHODE - En maths, on rédige', [Paragraph('Écris chaque étape de calcul, pas seulement le résultat : c\'est comme ça qu\'on repère ses erreurs et qu\'on gagne des points en contrôle.', S['box'])], TIPBG, ACCENT))
    story.append(Spacer(1, 3*mm))
    story.append(box('ASTUCE', [Paragraph('Refais de tête les tables de multiplication pendant les trajets : le calcul mental rend tout le reste plus facile.', S['box'])], BOXBG, INK))
    story.append(PageBreak())

    # Planning
    story.append(HeadingTOC('Planning de travail - 8 semaines', S['h1']))
    story.append(Paragraph('Coche chaque séance terminée.', S['body']))
    story.append(Spacer(1, 4*mm))
    rows = [[Paragraph('<b>Semaine</b>', S['box']), Paragraph('<b>Thème</b>', S['box']), Paragraph('<b>Séances</b>', S['box'])]]
    for wi, w in enumerate(weeks):
        labels = ' . '.join('( ) ' + clean(d['lecon'])[:34] for d in w['days'])
        rows.append([Paragraph(f'<b>S{w["num"]}</b>', S['box']), Paragraph(clean(w['theme']), S['box']), Paragraph(labels, st('pl', fontSize=8.5, leading=12))])
    plan = Table(rows, colWidths=[16*mm, 48*mm, 96*mm])
    plan.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#C9D6E2')), ('BACKGROUND', (0, 0), (-1, 0), BOXBG),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    story.append(plan)
    story.append(PageBreak())

    # Semaines
    for wi, w in enumerate(weeks):
        wcol = colors.HexColor(w['color'])
        head = Table([[Paragraph(f'SEMAINE {w["num"]}', st('wk', fontName='Helvetica-Bold', fontSize=11, textColor=colors.white))],
                      [Paragraph(clean(w['theme']), S['weekh'])],
                      [Paragraph('Cinq séances cette semaine. Coche chaque séance terminée !', S['weeksub'])]], colWidths=[170*mm])
        head.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), wcol),
            ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (0, 0), 10), ('BOTTOMPADDING', (0, -1), (-1, -1), 10)]))
        story.append(HeadingTOC(f'Semaine {w["num"]} - {clean(w["theme"])}', st('iv', fontSize=0.5, leading=0.5, textColor=colors.white), level=0))
        story.append(head)
        story.append(Spacer(1, 5*mm))
        for d in w['days']:
            story.append(Paragraph(f'( )  <b>{clean(d["label"])}</b> - {clean(d["lecon"])}', S['body']))
            story.append(Spacer(1, 1.5*mm))
        story.append(PageBreak())

        for ji, d in enumerate(w['days']):
            day_id = f'{wi}-{ji}'
            enrich = enrich_for(d['lecon'])
            story.append(Marker(f'{day_id}:lesson'))
            story.append(HeadingTOC(f'{clean(d["label"])} - {clean(d["lecon"])[:58]}', st('iv2', fontSize=0.5, leading=0.5, textColor=colors.white), level=1))
            story.append(badge('MATHS'))
            story.append(Spacer(1, 2*mm))
            story.append(Paragraph(clean(d['lecon']), S['lesson']))
            story.append(Paragraph(clean(d['label']) + f' . Semaine {w["num"]}', S['small']))
            story.append(Spacer(1, 4*mm))
            story.append(Paragraph(clean(d['detail']), S['body']))
            story.append(Spacer(1, 4*mm))
            story.append(box('À RETENIR', [Paragraph('- ' + clean(r), S['box']) for r in enrich['retenir']], BOXBG, INK))
            story.append(Spacer(1, 3.5*mm))
            story.append(box('EXEMPLES', [Paragraph(clean(e), st('ex', fontSize=10, leading=14.5, textColor=colors.HexColor('#4A5B6A'))) for e in enrich['exemples']], LIGHTBG, ACCENT))
            if d.get('tip'):
                story.append(Spacer(1, 3.5*mm))
                story.append(box('ASTUCE', [Paragraph(clean(d['tip']), S['box'])], TIPBG, ACCENT))
            story.append(PageBreak())

            exos = cur.get(day_id, {}).get('exercises', [])
            if exos:
                story.append(Marker(f'{day_id}:exercises'))
                story.append(badge('MATHS'))
                story.append(Spacer(1, 2*mm))
                story.append(Paragraph(f'Exercices - {clean(d["lecon"])[:66]}', st('exh', fontName='Helvetica-Bold', fontSize=13, leading=17)))
                story.append(Paragraph(clean(d['label']) + f' . Semaine {w["num"]} . {len(exos)} exercices . Corrigés en fin de cahier', S['small']))
                story.append(Spacer(1, 4*mm))
                for i, ex in enumerate(exos, 1):
                    story.extend(render_exo(i, ex))
                story.append(PageBreak())

    # Corrigés
    story.append(HeadingTOC('Corrigés', S['h1']))
    story.append(Paragraph('Corrige-toi au stylo vert : la bonne réponse, puis une courte explication.', S['body']))
    story.append(Spacer(1, 4*mm))
    for wi, w in enumerate(weeks):
        story.append(Paragraph(f'Semaine {w["num"]} - {clean(w["theme"])}', S['h2']))
        for ji, d in enumerate(w['days']):
            exos = cur.get(f'{wi}-{ji}', {}).get('exercises', [])
            if not exos: continue
            story.append(Paragraph(f'<b>{clean(d["label"])} - {clean(d["lecon"])[:66]}</b>', st('cd', fontSize=9.5, leading=13, spaceBefore=3)))
            for i, ex in enumerate(exos, 1):
                story.append(Paragraph(f'{i}. <b>{clean(str(ex.get("answer", "")))}</b> - {clean(ex.get("explanation", ""))}', S['corr']))
            story.append(Spacer(1, 2*mm))
    story.append(PageBreak())

    # Fin
    story.append(Spacer(1, 60*mm))
    story.append(Paragraph('Bravo !', S['cover1']))
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph(f'Tu as terminé ton cahier de maths.<br/>Bonne rentrée en {cfg["label"]} !', S['cover3']))

    doc.multiBuild(story)
    return outfile, page_map, doc.page

ALL_MAPS = {}
for lvl in ['6eme', '5eme', '4eme', '3eme']:
    outfile, pmap, pages = build_cahier(lvl)
    ALL_MAPS[lvl] = pmap
    lessons = len([k for k in pmap if k.endswith(':lesson')])
    exos = len([k for k in pmap if k.endswith(':exercises')])
    print(f'{lvl} : {pages} pages, {lessons} leçons / {exos} pages d\'exercices mappées -> {outfile.split("/")[-1]}')

json.dump(ALL_MAPS, open(MAPOUT, 'w'), indent=1)
print('Mapping écrit :', MAPOUT)
