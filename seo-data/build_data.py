# -*- coding: utf-8 -*-
"""Génère les données des pages communes des Couvreurs Normands (base : Deauville, zone : tout le Calvados).

Sortie : src/data/cities.json (liste des communes) et src/data/communes_content.json (contenu de chaque page /couvreur-<commune>).
Règle : rien n'est affirmé qui ne vienne du client, d'une fiche Google publique ou de données publiques (INSEE pour les habitants,
calcul de distance à vol d'oiseau). Aucune information inventée sur une commune précise.

Usage : python3 seo-data/build_data.py src/data
"""
import csv, json, math, os, re, sys, unicodedata, zlib

ROOT = os.path.dirname(os.path.abspath(__file__))
BRAND = "Les Couvreurs Normands"
PHONE = "[TÉLÉPHONE]"
RADIUS_KM = None  # tout le Calvados : aucune limite de distance
BASE = (0.0752, 49.3585)  # centre de Deauville


def slugify(n):
    n = unicodedata.normalize("NFKD", n).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", n.lower()).strip("-")


def km(a, b):
    R = 6371
    la1, la2 = math.radians(a[1]), math.radians(b[1])
    dl, dp = math.radians(b[0] - a[0]), la2 - la1
    h = math.sin(dp / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def direction(a, b):
    dx = (b[0] - a[0]) * math.cos(math.radians(a[1]))
    dy = b[1] - a[1]
    ang = (math.degrees(math.atan2(dx, dy)) + 360) % 360
    names = ["au nord", "au nord-est", "à l'est", "au sud-est", "au sud", "au sud-ouest", "à l'ouest", "au nord-ouest"]
    return names[int((ang + 22.5) // 45) % 8]


def fr(n):
    return f"{n:,}".replace(",", " ")


def a_(n):
    if n.startswith("Les "): return "aux " + n[4:]
    if n.startswith("Le "): return "au " + n[3:]
    return "à " + n


def pop_class(p):
    if p < 2500: return "petite commune"
    if p < 6000: return "bourg"
    if p < 15000: return "ville moyenne"
    return "grande ville"


COASTAL = {"Ouistreham", "Colleville-Montgomery", "Hermanville-sur-Mer", "Lion-sur-Mer", "Luc-sur-Mer", "Langrune-sur-Mer",
           "Saint-Aubin-sur-Mer", "Bernières-sur-Mer", "Courseulles-sur-Mer", "Merville-Franceville-Plage", "Cabourg",
           "Dives-sur-Mer", "Houlgate", "Blonville-sur-Mer", "Villers-sur-Mer", "Auberville", "Gonneville-sur-Mer", "Varaville",
           "Deauville", "Benerville-sur-Mer", "Pennedepie", "Cricqueboeuf", "Dives-sur-Mer", "Gonneville-en-Auge", "Graye-sur-Mer", "Ver-sur-Mer", "Asnelles", "Arromanches-les-Bains", "Longues-sur-Mer", "Commes", "Colleville-sur-Mer", "Vierville-sur-Mer", "Saint-Laurent-sur-Mer", "Trouville-sur-Mer", "Touques", "Tourgéville", "Saint-Arnoult", "Villerville", "Honfleur", "Équemauville", "Genneville",
           "Gonneville-sur-Honfleur", "La Rivière-Saint-Sauveur", "Ablon", "Port-en-Bessin-Huppain", "Isigny-sur-Mer", "Grandcamp-Maisy"}
AUGE = {"Mézidon Vallée d'Auge", "Cambremer", "Saint-Pierre-en-Auge", "Dozulé", "Vimont", "Valorbiquet", "Le Pré-d'Auge", "Lisieux", "Pont-l'Évêque",
        "Le Breuil-en-Auge", "Livarot-Pays-d'Auge", "Orbec", "Vimoutiers", "Bernay", "Saint-Désir", "Ouilly-le-Vicomte", "Saint-Germain-de-Livet",
        "Saint-Martin-de-la-Lieue", "Beuvillers", "Glos", "Hermival-les-Vaux", "Courtonne-la-Meurdrac", "Courtonne-les-Deux-Églises", "Marolles",
        "Saint-Martin-de-Mailloc", "Bonnebosq", "Coquainvilliers", "Saint-Hymer", "Blangy-le-Château", "Saint-Philbert-des-Champs",
        "Bonneville-la-Louvet", "La Vespière-Friardel", "Le Pin", "Moyaux", "Saint-Gatien-des-Bois"}
BOCAGE = {"Villers-Bocage", "Aurseulles", "Les Monts d'Aunay", "Val d'Arry", "Creully sur Seulles", "Bayeux", "Saint-Vigor-le-Grand",
          "Souleuvre en Bocage", "Condé-sur-Noireau", "Tilly-sur-Seulles", "Vire Normandie", "Condé-en-Normandie", "Valdallière", "Noues de Sienne",
          "Caumont-sur-Aure", "Le Molay-Littry"}
SUD = {"Argentan", "Falaise", "Potigny", "Thury-Harcourt-le-Hom", "Bretteville-sur-Laize", "Laize-Clinchamps", "Valambray"}
URBAN = {"Hérouville-Saint-Clair", "Mondeville", "Ifs", "Colombelles", "Fleury-sur-Orne", "Cormelles-le-Royal", "Giberville", "Louvigny",
         "Épron", "Blainville-sur-Orne", "Carpiquet", "Bretteville-sur-Odon", "Saint-Germain-la-Blanche-Herbe", "Biéville-Beuville",
         "Authie", "Saint-Contest"}

REGION_LABEL = {"ville": "agglomération caennaise", "plaine": "plaine de Caen", "littoral": "littoral normand",
                "auge": "Pays d'Auge et alentours", "bocage": "bocage normand", "sud": "sud du Calvados", "campagne": "campagne calvadosienne"}


CAEN = (-0.3705, 49.1829)


def region(n, pos=None):
    for name, s in (("littoral", COASTAL), ("auge", AUGE), ("bocage", BOCAGE), ("sud", SUD), ("ville", URBAN)):
        if n in s: return name
    if pos is not None:
        lon, lat = pos
        if lat <= 48.97 and -0.5 < lon < 0.0: return "sud"
        if lon >= -0.08 and 49.0 <= lat <= 49.34: return "auge"
        if lon <= -0.62 and lat < 49.25: return "bocage"
        if km(CAEN, pos) <= 22: return "plaine"
    return "campagne"


# Services : (slug, libellé court, phrase d'explication)
SERVICES = [
    ("reparation-toiture-deauville", "Réparation de toiture et de fuite", "Recherche de l'origine de l'infiltration (tuile, faîtage, solin, noue, gouttière) puis reprise ciblée."),
    ("renovation-toiture-deauville", "Rénovation de toiture", "Réfection partielle ou complète de la couverture quand les réparations ponctuelles ne suffisent plus."),
    ("remplacement-tuiles-ardoises-deauville", "Remplacement de tuiles et d'ardoises", "Remplacement des éléments cassés, déplacés ou fissurés, en respectant le matériau existant."),
    ("reparation-faitage-deauville", "Réparation de faîtage", "Contrôle et reprise des tuiles faîtières et de leurs scellements, point sensible après le vent."),
    ("demoussage-toiture-deauville", "Démoussage et nettoyage de toiture", "Nettoyage adapté au matériau et traitement anti-mousse pour préserver la couverture."),
    ("hydrofuge-toiture-deauville", "Traitement hydrofuge", "Protection appliquée sur une couverture saine et propre, jamais pour masquer un défaut d'étanchéité."),
    ("couvreur-zingueur-deauville", "Zinguerie", "Solins, noues, rives et abergements : les raccords qui guident l'eau loin des murs."),
    ("gouttieres-deauville", "Gouttières", "Pose, remplacement, réparation et nettoyage des gouttières et descentes d'eaux pluviales."),
    ("etancheite-toiture-deauville", "Étanchéité de toiture", "Traitement des points singuliers : raccords, souches de cheminée, jonctions et zones qui laissent passer l'eau."),
    ("traitement-charpente-deauville", "Traitement de charpente", "Contrôle des bois et traitement adapté à leur état (humidité, insectes xylophages)."),
    ("ravalement-facade-deauville", "Ravalement de façade", "Nettoyage, réparation des fissures et des fonds, puis enduit ou peinture selon l'état du mur."),
    ("peinture-exterieure-deauville", "Peinture extérieure", "Façades, boiseries, volets et fer forgé, avec une préparation adaptée au support."),
    ("nettoyage-facade-deauville", "Nettoyage de façade", "Retrait des mousses et salissures par une méthode adaptée : haute pression douce, hydrogommage, anti-mousse."),
    ("pose-velux-deauville", "Pose et remplacement de Velux", "Pose ou remplacement de fenêtres de toit avec reprise soignée de l'étanchéité autour du châssis."),
]

# Repères de prix publiés (France). Sources : La Maison Saint-Gobain (guides de prix, mis à jour le 10/03/2026 et le 16/04/2026),
# MesDépanneurs (mis à jour le 30/12/2025). Prix indicatifs, hors cas particuliers : seul le devis fait foi.
PRICES = [
    ("Démoussage de toiture, au m²", "25 à 35 €"),
    ("Traitement hydrofuge seul, au m²", "15 à 35 €"),
    ("Réparation d'une fuite de toiture", "400 à 2 500 € (environ 750 € en moyenne)"),
    ("Remplacement d'une ou deux tuiles", "150 à 250 € TTC"),
    ("Réparation de faîtage, au mètre linéaire", "50 à 150 € TTC"),
    ("Nettoyage de gouttière, au mètre linéaire", "12 à 25 € TTC"),
    ("Couverture en tuiles terre cuite, fourni posé, au m²", "environ 130 € TTC"),
    ("Couverture en ardoises naturelles, fourni posé, au m²", "environ 200 € TTC"),
    ("Pose d'une fenêtre de toit (pose seule)", "environ 300 €"),
]

# Banques de textes par zone, vraies à l'échelle de la zone (aucun détail inventé sur une commune précise).
CONTEXT = {
    "ville": {
        "roof": "Dans l'agglomération caennaise, on rencontre aussi bien des toitures en ardoise sur des bâtiments anciens que des tuiles sur les pavillons plus récents. Cheminées, murs mitoyens et fenêtres de toit multiplient les raccords, qui sont souvent les premiers points de fuite.",
        "weather": "Le climat océanique apporte de la pluie fréquente et une humidité qui favorise la mousse, surtout sur les versants peu ensoleillés. En zone arborée, les gouttières se remplissent de feuilles et débordent sur les façades.",
        "care": "Un contrôle visuel de la toiture et des gouttières une fois par an, de préférence à l'automne, permet de repérer une tuile déplacée ou un raccord fatigué avant qu'ils ne laissent passer l'eau.",
        "tip": "En lotissement ou en copropriété, vérifiez le règlement avant de changer l'aspect de la toiture : modèle de tuiles, couleur ou gouttières peuvent être encadrés.",
    },
    "plaine": {
        "roof": "Autour de Caen, la plaine est occupée par des pavillons de lotissement et des maisons de bourg dont les couvertures ont souvent plusieurs décennies. C'est l'âge où le faîtage, les rives et les solins méritent un contrôle sérieux.",
        "weather": "En terrain ouvert, la toiture prend le vent de plein fouet. Après une tempête, les éléments de rive et de faîtage sont les premiers à bouger, et une tuile déplacée peut laisser passer l'eau sans qu'on le voie depuis le sol.",
        "care": "Après un épisode venteux, un coup d'œil depuis le jardin (tuile au sol, élément décalé, gouttière affaissée) suffit souvent à décider s'il faut faire examiner la toiture.",
        "tip": "Un défaut repéré tôt se règle par une reprise ciblée ; laissé tel quel, il peut abîmer l'isolant et les plafonds. N'hésitez pas à demander un avis avant que la fuite n'apparaisse.",
    },
    "littoral": {
        "roof": "Sur la côte, les toitures sont exposées aux embruns, au vent et au sel. Ces conditions vieillissent plus vite les éléments métalliques (zinc, fixations) et favorisent les mousses et les lichens sur les tuiles et les ardoises.",
        "weather": "Le vent marin soulève les éléments mal fixés et pousse la pluie sous les tuiles : les rives, le faîtage et les raccords de zinguerie sont les points à surveiller en priorité.",
        "care": "Pour une résidence secondaire, un contrôle de la toiture avant l'été puis après l'hiver évite de découvrir une fuite à l'ouverture de la maison.",
        "tip": "Près de la mer, demandez un contrôle des fixations et de la zinguerie après chaque tempête marquée, même en l'absence de fuite visible.",
    },
    "auge": {
        "roof": "Dans le Pays d'Auge, maisons à pans de bois, longères et dépendances présentent souvent des toitures à forte pente, avec lucarnes, noues et souches de cheminée nombreuses : la zinguerie y joue un rôle important.",
        "weather": "Le climat humide et la végétation proche des bâtiments favorisent la mousse et l'encombrement des gouttières. Sur les grandes toitures, l'eau d'un versant peut se concentrer dans une noue et la solliciter fortement.",
        "care": "Sur un bâti ancien, mieux vaut privilégier des interventions ciblées et respectueuses du matériau en place plutôt qu'une réfection systématique.",
        "tip": "Sur une maison ancienne, vérifiez auprès de la mairie les règles applicables avant de modifier l'aspect de la couverture.",
    },
    "bocage": {
        "roof": "Dans le bocage, maisons de pierre, longères et dépendances présentent souvent de grandes surfaces de toiture, en ardoise ou en tuiles. L'accès au toit et la hauteur des bâtiments conditionnent la méthode d'intervention.",
        "weather": "Haies, arbres et humidité au plus près des bâtiments favorisent la mousse et l'encombrement des gouttières. Les versants à l'ombre restent humides plus longtemps et demandent un entretien plus régulier.",
        "care": "Sur une grande toiture, un entretien régulier (nettoyage des gouttières, contrôle des raccords) coûte généralement moins cher que des reprises importantes après des infiltrations.",
        "tip": "Pour une dépendance ou un bâtiment éloigné de la route, signalez l'accès dès le premier appel : il influence le matériel et la durée du chantier.",
    },
    "sud": {
        "roof": "Entre la campagne de Falaise et la Suisse normande, le bâti mêle maisons de pierre, longères et dépendances. Les toitures y sont souvent de grande surface et exposées au vent sur les plateaux.",
        "weather": "Sur les plateaux, le vent sollicite le faîtage et les rives ; dans les vallées plus abritées, l'humidité favorise la mousse. Les deux situations demandent un contrôle régulier.",
        "care": "Regrouper plusieurs travaux (démoussage, gouttières, petites reprises) sur une même visite limite les déplacements et simplifie le chiffrage.",
        "tip": "Si votre bien est éloigné, décrivez-nous la toiture au téléphone ou envoyez des photos : cela permet de préparer le devis avant la visite.",
    },
}

CONTEXT["campagne"] = {
    "roof": "Dans la campagne calvadosienne, maisons de pierre, longères, dépendances et pavillons se partagent des toitures de tailles et d'âges très variés, en tuiles, en ardoises ou parfois en zinc. L'accès au toit et la hauteur du bâtiment conditionnent la méthode d'intervention.",
    "weather": "Le climat océanique apporte une pluie régulière et une humidité qui favorise la mousse, surtout sur les versants à l'ombre ou proches des arbres. Le vent sollicite le faîtage et les rives après les coups de vent.",
    "care": "Nettoyer les gouttières à l'automne et contrôler la couverture après une tempête suffit souvent à éviter qu'une petite fuite ne devienne un chantier lourd.",
    "tip": "Si votre bien est éloigné d'une route principale, signalez l'accès dès le premier appel et envoyez des photos : cela permet de préparer le devis avant la visite.",
}

CONTEXT_ALT = {
    "ville": {
        "roof": "Entre bâtiments anciens couverts d'ardoise et maisons plus récentes en tuiles, les toitures de l'agglomération ont en commun leurs points singuliers : cheminées, jonctions avec les murs voisins, lucarnes et fenêtres de toit.",
        "weather": "Pluie régulière, humidité et feuillage des arbres de ville : mousses et gouttières bouchées sont les deux problèmes les plus fréquents sur les toitures de l'agglomération.",
        "care": "Faire nettoyer les gouttières à l'automne et contrôler la couverture après un coup de vent suffit souvent à éviter les infiltrations.",
    },
    "plaine": {
        "roof": "Les maisons de la plaine de Caen ont souvent été construites à l'époque des lotissements. Leurs couvertures atteignent l'âge où l'on contrôle les faîtages, les rives et les raccords autour des cheminées.",
        "weather": "En plaine, le vent circule sans obstacle et la pluie est poussée sous les tuiles de rive : un défaut minime peut devenir une infiltration au premier épisode venteux.",
        "care": "Un contrôle visuel après chaque tempête, depuis le sol ou les combles, permet de repérer une trace d'humidité avant qu'elle ne s'étende.",
    },
    "littoral": {
        "roof": "Face à la mer, la toiture subit le sel, le vent et l'humidité. Le zinc, les fixations et les scellements de faîtage vieillissent plus vite que dans les terres.",
        "weather": "Les embruns se déposent sur la couverture et entretiennent mousses et lichens. Les tempêtes d'automne et d'hiver testent la tenue des tuiles de rive et du faîtage.",
        "care": "Un nettoyage adapté au matériau et un contrôle de la zinguerie tous les ans ou tous les deux ans conservent une toiture saine en bord de mer.",
    },
    "auge": {
        "roof": "Les toitures du Pays d'Auge, souvent très pentues et percées de lucarnes, comptent de nombreuses noues et jonctions : autant d'endroits où l'étanchéité se joue au détail près.",
        "weather": "Dans un pays de bocage et d'herbages, l'humidité persistante entretient la mousse. Les gouttières de grandes toitures évacuent beaucoup d'eau et s'encombrent vite.",
        "care": "Sur de grandes toitures anciennes, un contrôle régulier de la zinguerie et des noues est plus utile qu'un traitement systématique de toute la couverture.",
    },
    "bocage": {
        "roof": "Pierre, ardoise et grandes dépendances : les toitures du bocage sont souvent vastes, et leur entretien se planifie en fonction de l'accès et de la hauteur.",
        "weather": "Entre haies, talus et arbres, la lumière et le vent circulent moins : les toitures sèchent plus lentement et se couvrent de mousse plus facilement.",
        "care": "Nettoyer les gouttières au bon moment et surveiller les raccords évite de transformer une petite fuite en chantier lourd.",
    },
    "campagne": {
        "roof": "Entre bourgs, hameaux et fermes isolées, les toitures du Calvados rural sont souvent grandes, anciennes et en ardoise ou en tuiles : leur entretien se planifie selon l'accès et la hauteur.",
        "weather": "Pluie fréquente, vent d'ouest et humidité des herbages : mousses, gouttières encombrées et éléments de rive déplacés sont les désordres les plus courants.",
        "care": "Un contrôle visuel de la toiture et des gouttières une fois par an permet de traiter un défaut avant qu'il n'abîme l'isolant ou les plafonds.",
    },
    "sud": {
        "roof": "Dans le sud du Calvados, les toitures de pierre et d'ardoise ou de tuiles couvrent souvent de belles surfaces, parfois sur des bâtiments peu abrités du vent.",
        "weather": "Exposition au vent sur les plateaux, humidité dans les vallées : la toiture subit des contraintes différentes selon l'emplacement exact du bâtiment.",
        "care": "Un diagnostic de l'ensemble de la couverture permet de distinguer ce qui relève d'une simple reprise de ce qui justifie une rénovation plus large.",
    },
}

INTRO_T = [
    "Vous cherchez un couvreur {a} ? {B}, couvreurs basés à Deauville, interviennent à {nom} ({cp}) pour la réparation, la rénovation et l'entretien de toiture : fuites, tuiles et ardoises, faîtage, zinguerie, gouttières et démoussage.",
    "Une fuite, des tuiles déplacées ou une toiture couverte de mousse {a} ? {B} se déplacent à {nom} ({cp}) depuis Deauville pour examiner la toiture et vous remettre un devis gratuit.",
    "{B} mettent à votre service un couvreur {a} pour la couverture, la zinguerie et l'entretien des toits. Basés à Deauville, ils interviennent à {nom} ({cp}) et dans tout le Calvados.",
]

POP_NOTE = {
    "petite commune": "À {nom}, les maisons sont de construction très variée, du pavillon récent à la longère. Chaque toiture est examinée pour ce qu'elle est : aucune solution toute faite n'est proposée avant d'avoir compris l'origine du problème.",
    "bourg": "Dans un bourg comme {nom}, on trouve des maisons de ville anciennes et des pavillons plus récents. La méthode, les matériaux et l'accès au toit sont adaptés à chaque bâtiment.",
    "ville moyenne": "{nom} compte de nombreuses maisons individuelles et plusieurs types de couverture. Nous examinons chaque toiture et proposons une intervention proportionnée à son état réel.",
    "grande ville": "Dans une ville de la taille de {nom}, les toitures sont très diverses et les contraintes (voisinage, stationnement, accès) sont à anticiper : chaque chantier est préparé avant l'intervention.",
}

LOCAL = {
    "lisieux": "Lisieux a été détruite à 75 % par les bombardements de 1944 puis reconstruite sur plus de dix ans, avec une accélération à partir de 1950-1952 (source : Wikipédia). Une partie du bâti de la ville date donc de cette reconstruction, à côté de quelques maisons anciennes à pans de bois : à cet âge, le faîtage, les rives et la zinguerie méritent un contrôle. Avec environ 881 mm de pluie par an (moyenne 1991-2020), la mousse et les gouttières encombrées sont des sujets fréquents.",
    "bernay": "Bernay conserve environ 350 maisons à pans de bois, dont certaines sont classées monuments historiques, et un centre ancien épargné par les bombardements de juin 1944 (source : Wikipédia). Sur ce bâti ancien, nous privilégions des interventions ciblées et respectueuses du matériau en place, et la zinguerie des noues et des solins fait l'objet d'une attention particulière.",
    "orbec": "Orbec est décrite comme riche en maisons à pans de bois, dont le Vieux Manoir du XVIe siècle, classé monument historique, et sa vieille ville est inscrite parmi les sites protégés depuis 1976 (source : Wikipédia). Avant de modifier l'aspect d'une couverture dans le centre, renseignez-vous en mairie sur les règles applicables : nous pouvons ensuite réparer ou remplacer à l'identique.",
    "vimoutiers": "Vimoutiers a été presque entièrement détruite par un bombardement en juin 1944 : seule l'église est restée debout (source : Wikipédia). La majorité des maisons du centre ont donc été reconstruites après-guerre ; avec environ 826 mm de pluie par an (moyenne 1991-2020), un contrôle régulier de la couverture et des gouttières évite les infiltrations sur ces toitures désormais anciennes.",
    "argentan": "Argentan a été détruite à 80 % après les combats de l'été 1944, et son hôtel de ville, achevé en 1957, est classé patrimoine du XXe siècle (source : Wikipédia). Beaucoup de maisons de la ville datent de la reconstruction ; à côté, le quartier Saint-Martin, épargné, compte encore de nombreux hôtels particuliers dont les toitures demandent une approche plus soignée.",
    "falaise": "Falaise, bâtie autour de son château du XIIe-XIIIe siècle et de son enceinte de 1123, a subi les bombardements de 1944 (source : Wikipédia). Le bâti y mêle maisons anciennes et constructions plus récentes : nous examinons chaque toiture pour ce qu'elle est, sans solution toute faite.",
    "livarot-pays-d-auge": "Livarot-Pays-d'Auge est une commune nouvelle née en 2015 de la fusion de 22 communes (source : Wikipédia), ce qui explique l'étendue du territoire, ses manoirs, ses châteaux et ses nombreuses dépendances. Avec environ 677 mm de pluie par an (moyenne 1991-2020) et des étés frais et ventés, les grandes toitures demandent un entretien régulier des gouttières et des raccords.",
    "mezidon-vallee-d-auge": "Mézidon Vallée d'Auge est une commune nouvelle créée en 2017 ; sa commune déléguée Mézidon-Canon comptait 4 780 habitants en 2021, avec le château de Canon, classé monument historique (source : Wikipédia). Entre bâti ancien et pavillons plus récents, nous adaptons la méthode au matériau de chaque toiture.",
    "conde-sur-noireau": "À Condé-sur-Noireau (commune de Condé-en-Normandie, 14110), la ville a été détruite à 95 % par les bombardements de 1944 et sa reconstruction s'est achevée en 1963 (source : Wikipédia) : une grande partie du bâti date donc de l'après-guerre. Le climat océanique apporte environ 900 mm de pluie par an, ce qui rend utiles le contrôle de la couverture, des gouttières et l'entretien contre les mousses.",
    "argences": "À Argences, l'église Saint-Jean, détruite par les bombardements de 1944, a été reconstruite en 1961, et la tuilerie du Fresne puis les Tuileries de Beauvais font partie de son histoire industrielle (source : Wikipédia). Avec environ 743 mm de pluie par an (moyenne 1991-2020) et des étés ventés, les éléments de rive et de faîtage sont à surveiller après chaque tempête.",
    "ouistreham": "Ouistreham, en bord de mer, expose les toitures aux embruns et au vent : la zinguerie, les fixations et le faîtage y méritent un contrôle régulier.",
    "courseulles-sur-mer": "À Courseulles-sur-Mer, face à la Manche, les toitures subissent le sel et le vent : un nettoyage adapté et un contrôle de la zinguerie prolongent la vie de la couverture.",
    "cabourg": "Station balnéaire, Cabourg compte de nombreuses résidences secondaires et villas anciennes : un contrôle de la toiture après une tempête évite les mauvaises surprises à l'ouverture de la maison.",
    "bayeux": "À Bayeux, ville historique du Bessin, toute modification de l'aspect d'une toiture peut être soumise à des règles particulières (secteur protégé, avis de l'architecte des Bâtiments de France) : renseignez-vous en mairie avant les travaux.",
    "douvres-la-delivrande": "À Douvres-la-Délivrande, à quelques kilomètres de la côte, les toitures sont déjà exposées au vent marin : les éléments de rive et de faîtage méritent un contrôle après les tempêtes.",
    "pont-l-eveque": "Pont-l'Évêque (5 116 habitants en 2022) est connue pour ses maisons à pans de bois, comme l'auberge de l'Aigle d'Or de 1520 rue de Vaucelles, et la ville a été détruite à 65 % en 1944 (source : Wikipédia). Avec environ 920 mm de pluie par an sur 1991-2020 (station de Saint-Gatien-des-Bois, à 7 km) et des vents fréquents, la couverture, les gouttières et la zinguerie demandent un contrôle régulier.",
    "saint-pierre-en-auge": "Saint-Pierre-en-Auge est une commune nouvelle créée le 1er janvier 2017 à partir de 13 communes, avec Saint-Pierre-sur-Dives pour chef-lieu et 7 265 habitants en 2022 ; on y trouve des halles bâties du XIe au XVIe siècle, des maisons à pans de bois et un clocher couvert d'environ 43 000 lamelles de châtaignier à Ouville-la-Bien-Tournée (source : Wikipédia). Sur ce bâti ancien et avec environ 677 mm de pluie par an (1991-2020), nous adaptons la méthode au matériau de chaque toiture.",
    "cambremer": "Cambremer (1 307 habitants en 2022) se trouve sur la route du cidre, avec l'église Saint-Denis dont le clocher est classé et plusieurs manoirs dont les toitures sont protégées, comme le manoir du Montargis (source : Wikipédia). Avec environ 782 mm de pluie par an sur 1991-2020 (station de Mézidon-Canon, à 12 km), ce bâti rural ancien gagne à une vérification régulière de la couverture et des gouttières.",
    "soliers": "Soliers (2 190 habitants en 2022) est une commune de la plaine agricole de Caen à Falaise, avec l'église Saint-Vigor du XIIIe siècle, inscrite aux monuments historiques (source : Wikipédia). Le climat océanique, avec un été frais et venté et environ 743 mm de pluie par an (station d'Argences, à 9 km), invite à surveiller les éléments de rive et de faîtage après les tempêtes.",
    "bourguebus": "Bourguébus (2 561 habitants en 2022) est implantée sur une crête, la crête de Bourguébus, théâtre de combats en juillet 1944 : son église Saint-Vigor du XIIIe siècle a été détruite en 1944 puis reconstruite, et le bourg s'est étendu à l'ouest après la guerre (source : Wikipédia). Le village étant sur une hauteur, la toiture y est plus exposée au vent, avec environ 743 mm de pluie par an (station d'Argences, à 9 km).",
    "louvigny": "Louvigny (2 627 habitants en 2022), au sud-ouest de Caen entre l'Orne et l'Odon, compte un château du XVIIIe siècle inscrit, dont le parc est un site classé, et un clocher du XIVe siècle à l'église Saint-Vigor (source : Wikipédia). À faible altitude (2 à 48 m), près des rivières et avec environ 740 mm de pluie par an (station de Carpiquet, à 5 km), l'humidité favorise les mousses : démoussage et gouttières y sont à surveiller.",
}

FAQ_COMMON = [
    ("Le devis est-il gratuit ?", "Oui, le devis est gratuit. Il est établi après examen de la toiture et détaille les travaux prévus avant que vous ne décidiez."),
    ("Faut-il une autorisation pour des travaux de toiture à {nom} ?", "Une réparation ou un remplacement à l'identique (mêmes matériaux, mêmes couleurs, même pente) ne demande en général aucune autorisation d'urbanisme. Un changement d'aspect, comme un autre modèle de tuiles ou de gouttières, demande une déclaration préalable en mairie, d'après service-public.fr. Renseignez-vous aussi sur les règles du plan local d'urbanisme de {nom}."),
    ("Quand faire démousser une toiture ?", "En général au printemps ou à l'automne, par temps sec et hors période de gel. Le nettoyage et le traitement anti-mousse se choisissent selon le matériau et son état : un nettoyage trop agressif peut abîmer tuiles et ardoises."),
    ("Réparer ou rénover : comment choisir ?", "Si le désordre est localisé et le reste de la toiture sain, une réparation ciblée suffit souvent. Si les fuites se répètent sur plusieurs zones ou si la couverture arrive en fin de vie, la rénovation devient plus cohérente. L'examen de la toiture permet de trancher."),
]

LQ = [
    lambda nom, a, cp: (f"Intervenez-vous {a} pour une fuite de toiture ?",
        f"Oui. {BRAND} interviennent {a} ({cp}) pour rechercher l'origine d'une infiltration (tuile, faîtage, solin, noue, gouttière) et la réparer. Appelez le {PHONE} pour décrire le problème."),
    lambda nom, a, cp: (f"Faites-vous le démoussage de toiture {a} ?",
        f"Oui. Le nettoyage, le démoussage et le traitement hydrofuge se pratiquent {a} ({cp}) après examen de la couverture, avec une méthode adaptée au matériau."),
    lambda nom, a, cp: (f"Réalisez-vous une rénovation complète de toiture {a} ?",
        f"Oui. {BRAND} réalisent des rénovations de toiture {a} ({cp}), partielles ou complètes, après un examen de l'existant et un devis gratuit."),
]


PRIORITY = ["Trouville-sur-Mer", "Touques", "Tourgéville", "Benerville-sur-Mer", "Blonville-sur-Mer", "Villers-sur-Mer", "Houlgate", "Cabourg",
            "Dives-sur-Mer", "Honfleur", "Pont-l'Évêque", "Lisieux", "Caen", "Bayeux", "Falaise", "Vire Normandie"]


def main(out_dir):
    communes = []
    with open(os.path.join(ROOT, "data", "communes.csv"), encoding="utf-8") as f:
        seen = set()
        for n, cp, pop, lon, lat in csv.reader(f, delimiter="|"):
            s = slugify(n)
            if s in seen or s == "deauville": continue
            seen.add(s)
            pos = (float(lon), float(lat))
            d = km(BASE, pos)
            if RADIUS_KM and round(d) > RADIUS_KM: continue
            communes.append(dict(nom=n, slug=s, cp=cp, pop=int(pop), pos=pos, km=max(1, round(d)), dir=direction(BASE, pos), reg=region(n, pos)))
    communes.sort(key=lambda c: (c["km"], c["nom"]))
    for c in communes:
        others = sorted((o for o in communes if o is not c), key=lambda o: km(c["pos"], o["pos"]))
        c["near"] = others[:5]

    out = {}
    for c in communes:
        nom, slug = c["nom"], c["slug"]
        ctx, alt = CONTEXT[c["reg"]], CONTEXT_ALT[c["reg"]]
        k = zlib.crc32(slug.encode())
        a = a_(nom)
        intro = INTRO_T[k % 3].format(a=a, nom=nom, cp=c["cp"], B=BRAND, R=RADIUS_KM)
        trajet = "Le déplacement est simple à organiser." if c["km"] <= 15 else "Nous nous déplaçons dans tout le Calvados : appelez-nous pour convenir d'une date de visite."
        geo = (f"{nom} ({c['cp']}), {pop_class(c['pop'])} de {fr(c['pop'])} habitants, se situe à environ {c['km']} km {c['dir']} de notre base de Deauville, "
               f"dans le secteur {REGION_LABEL[c['reg']]}. {trajet}")
        minutes = max(5, round(c["km"] * 1.35 / 55 * 60))
        how = (f"Appelez le {PHONE} ou envoyez votre demande en ligne : nous examinons la situation, puis nous vous remettons un devis gratuit détaillant les travaux. "
               f"Depuis Deauville, comptez environ {minutes} minutes de route pour rejoindre {nom}.")
        roof = [ctx["roof"] if (k >> 3) & 1 == 0 else alt["roof"],
                ctx["weather"] if (k >> 4) & 1 == 0 else alt["weather"],
                ctx["care"] if (k >> 5) & 1 == 0 else alt["care"]]
        picks = sorted({(k + i * 3) % len(SERVICES) for i in range(6)})[:3]
        if len(picks) < 3:
            picks = [(k % len(SERVICES)), ((k + 4) % len(SERVICES)), ((k + 7) % len(SERVICES))]
        picks = [4] + [i for i in picks if i != 4][:2]
        rows = [PRICES[0]] + [PRICES[(k + i * 2) % len(PRICES)] for i in range(4)]
        rows = list(dict.fromkeys(rows))[:4]
        while len(rows) < 4:
            rows.append(PRICES[(k + len(rows) * 5 + 1) % len(PRICES)]); rows = list(dict.fromkeys(rows))
        rows.sort(key=PRICES.index)
        fq = [LQ[(k >> 2) % 3](nom, a, c["cp"]),
              (f"À quelle distance de Deauville se trouve {nom} ?",
               f"{nom} est à environ {c['km']} km de Deauville, {c['dir']}, soit environ {minutes} minutes de route. Elle fait partie du secteur {REGION_LABEL[c['reg']]}, dans la zone desservie depuis Deauville : tout le Calvados."),
              [FAQ_COMMON[(k >> 6) % 4][0].format(nom=nom), FAQ_COMMON[(k >> 6) % 4][1].format(nom=nom)],
              (f"Faites-vous le démoussage et le nettoyage de toiture {a} ?",
               f"Oui. Nous nettoyons et démoussons les toitures {a} : contrôle de la couverture, retrait des mousses, traitement anti-mousse, puis contrôle final. La méthode est adaptée au matériau. Repère de prix publié en France : 25 à 35 € le m². Devis gratuit au {PHONE}.")]
        h1 = f"Couvreur {a} ({c['cp']})"
        title = f"{h1} | {BRAND}"
        if len(title) > 60: title = f"Couvreur {a} | {BRAND}"
        if len(title) > 60: title = f"Couvreur {a} | Couvreurs Normands"
        if len(title) > 60: title = f"Couvreur {a}"[:60].rstrip()
        desc = f"Couvreur {a} ({c['cp']}) : réparation, rénovation, démoussage et nettoyage de toiture, zinguerie. Devis gratuit. Tél. {PHONE}."
        if len(desc) > 160: desc = f"Couvreur {a} : réparation, rénovation, démoussage et nettoyage de toiture, zinguerie. Devis gratuit. Tél. {PHONE}."
        if len(desc) > 160: desc = f"Couvreur {a} : réparation, rénovation, démoussage de toiture, zinguerie. Devis gratuit. Tél. {PHONE}."
        nbtxt = ", ".join(f"{o['nom']} ({round(km(c['pos'], o['pos']))} km)" for o in c["near"][:4])
        out[f"couvreur-{slug}"] = dict(
            slug=slug, nom=nom, cp=c["cp"], pop=c["pop"], km=c["km"], dir=c["dir"], region=REGION_LABEL[c["reg"]],
            title=title, desc=desc, h1=h1, intro=intro, geo=geo, special=LOCAL.get(slug, ""),
            popNote=POP_NOTE[pop_class(c["pop"])].format(nom=nom),
            services=[[SERVICES[i][0], SERVICES[i][1], SERVICES[i][2]] for i in picks],
            roof=roof, tip=ctx["tip"], prices=[list(r) for r in rows],
            fiche=[["Commune", f"{nom} ({c['cp']})"], ["Habitants", fr(c["pop"])], ["Secteur", REGION_LABEL[c["reg"]]],
                   ["Distance de Deauville", f"{c['km']} km, {c['dir']}"], ["Communes voisines", nbtxt], ["Devis", "Gratuit, après examen de la toiture"]],
            demoussage=[f"Mousses et lichens s'installent surtout sur les versants peu exposés au soleil et sous les arbres. {a[0].upper()+a[1:]}, nous assurons le nettoyage et le démoussage de votre toiture : contrôle préalable de la couverture, retrait des mousses par brossage ou nettoyage à pression maîtrisée, traitement anti-mousse, rinçage et contrôle final.",
                        "La méthode est adaptée au matériau (tuiles, ardoises) pour ne pas l'abîmer, et un nettoyage ne sert jamais à masquer un défaut d'étanchéité. Repère de prix publié en France : 25 à 35 € le m² pour un démoussage."],
            how=how, faq=[list(x) for x in fq],
            near=[dict(slug=o["slug"], nom=o["nom"], cp=o["cp"], km=round(km(c["pos"], o["pos"]))) for o in c["near"]],
        )

    cities = [dict(slug=c["slug"], name=c["nom"], code=c["cp"], distance=f"{c['km']} km de Deauville", population=f"{fr(c['pop'])} habitants",
                   sector=REGION_LABEL[c["reg"]], intro=out[f"couvreur-{c['slug']}"]["geo"], km=c["km"],
                   priority=PRIORITY.index(c["nom"]) + 1 if c["nom"] in PRIORITY else 0, auge=c["reg"] == "auge") for c in communes]
    os.makedirs(out_dir, exist_ok=True)
    json.dump(out, open(os.path.join(out_dir, "communes_content.json"), "w", encoding="utf-8"), ensure_ascii=False)
    json.dump(cities, open(os.path.join(out_dir, "cities.json"), "w", encoding="utf-8"), ensure_ascii=False)
    print(len(out), "pages communes,", len(cities), "communes dans le Calvados")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
