// Photos de chantiers des Couvreurs Normands (fournies par le client).
// Pour en ajouter : déposer le fichier .webp dans /public/photos/ puis ajouter une ligne dans PHOTOS.
import { asset } from "./company";

const p = (f, cat, title, alt, w, h) => ({ src: asset(`/photos/${f}.webp`), cat, title, alt, w, h });

const RAW = [
  p("ardoise-velux-pierre", "Velux", "Couverture en ardoises et fenêtre de toit", "Toiture en ardoises naturelles avec fenêtre de toit et gouttière zinc sur une maison en pierre", 1600, 1200),
  p("ardoise-lucarnes-colombage", "Couverture", "Couverture en ardoises, lucarnes à colombages", "Couverture en ardoises avec deux lucarnes sur une maison à colombages", 1600, 1200),
  p("tuiles-terre-cuite-velux", "Velux", "Tuiles terre cuite et fenêtres de toit", "Toiture en tuiles plates terre cuite avec fenêtres de toit et gouttières zinc sur une maison en bardage bois", 1200, 1500),
  p("depose-couverture-chantier", "Couverture", "Dépose de la couverture et pose de l'écran sous-toiture", "Chantier de rénovation de toiture : dépose des tuiles, écran sous-toiture et liteaux posés", 1536, 1152),
  p("renov-velux-apres", "Couverture", "Rénovation de toiture : après", "Toiture rénovée en tuiles avec fenêtres de toit et gouttière zinc", 1179, 594),
  p("ardoise-lucarnes-pierre", "Couverture", "Ardoises et lucarnes sur maison en pierre", "Toiture en ardoises avec lucarnes et souche de cheminée en brique", 1600, 1200),
  p("etancheite-toit-terrasse-apres-1", "Étanchéité", "Étanchéité de toit-terrasse", "Toit-terrasse avec étanchéité bitumineuse posée et relevés d'étanchéité", 1080, 675),
  p("reparation-arete-ouverte", "Couverture", "Réparation d'un arêtier de toiture", "Couvreur au travail sur un arêtier de toiture en tuiles, dépose des éléments pour réparation", 946, 1264),
  p("ardoise-velux-colombage", "Couverture", "Toiture en ardoises, maison à colombages", "Toiture en ardoises naturelles avec fenêtre de toit au-dessus d'une façade à colombages", 1600, 1200),
  p("zinc-bac-acier-avant-1", "Zinguerie", "Zinguerie et bac acier : avant travaux", "Raccord de zinguerie et couverture en bac acier avant intervention", 1080, 675),
  p("etancheite-acrotere", "Étanchéité", "Étanchéité d'un acrotère", "Étanchéité d'un acrotère avec platines d'évacuation, vue du dessus, après travaux", 1080, 1350),
  p("egout-ardoise-gouttiere-zinc", "Zinguerie", "Égout en ardoise et gouttière zinc", "Détail d'un égout de toit en ardoises avec gouttière zinc sur une charpente en chêne", 1536, 2048),
  p("tuiles-maison-pierre", "Couverture", "Couverture en tuiles sur maison en pierre", "Toiture en tuiles plates rouges sur une maison en pierre avec gouttières", 1179, 1153),
  p("renov-pierre-apres", "Couverture", "Changement de couverture : après", "Maison en pierre avec toiture neuve en tuiles et bandeau bois, après travaux", 1179, 609),
  p("toiture-tuiles-vue-aerienne", "Couverture", "Réparation de faîtage en tuiles", "Vue aérienne d'une toiture en tuiles avec arêtiers et faîtage en cours de réparation", 1000, 750),
  p("souche-cheminee-tuiles", "Couverture", "Intervention sur souche de cheminée", "Couvreur sur une toiture en tuiles à proximité de souches de cheminée", 640, 480),
  p("tuiles-brunes-pavillon", "Couverture", "Toiture en tuiles brunes", "Pavillon avec toiture en tuiles brunes et gouttières", 946, 712),
  p("ardoise-deux-velux", "Velux", "Ardoises, deux fenêtres de toit", "Toiture en ardoises avec deux fenêtres de toit et faîtières en terre cuite", 768, 575),
  p("ardoise-faitieres-tuiles", "Couverture", "Ardoises et faîtières en terre cuite", "Toiture en ardoises avec faîtage en tuiles faîtières en terre cuite", 768, 487),
  p("charpente-colombage-pignon", "Charpente", "Charpente colombage, pignon couvert", "Pignon d'une charpente à colombages en chêne avec couverture en ardoises", 1536, 2048),
  p("etancheite-toit-terrasse-apres-2", "Étanchéité", "Toit-terrasse : étanchéité terminée", "Toit-terrasse après pose de l'étanchéité, avec sorties de ventilation et relevés", 1080, 675),
  p("renov-pierre-avant", "Couverture", "Changement de couverture : avant", "Maison en pierre avec ancienne toiture en tuiles foncées, avant travaux", 1179, 609),
  p("renov-velux-avant", "Démoussage", "Toiture envahie par la mousse : avant", "Ancienne toiture en tuiles couverte de mousse avec fenêtres de toit, avant rénovation", 1179, 595),
  p("facade-ravalement-echafaudage", "Façade", "Ravalement de façade : pignon enduit", "Pignon d'une maison après ravalement, façade enduite blanche avec échafaudage de pied", 1600, 1145),
  p("zinc-bac-acier-avant-2", "Zinguerie", "Bac acier et faîtière : avant travaux", "Couverture en bac acier et faîtière avec joints à reprendre, avant intervention", 1080, 675),
];
// Villes prioritaires du client, réparties dans un ordre mélangé (fixe) sur les photos.
// Elles servent uniquement à l'attribut alt (« couvreur à <ville> ») : ce n'est pas le lieu de prise de vue.
// À remplacer par la vraie commune de chaque chantier dès qu'elle est connue (champ `ville` de p()).
const VILLES = ["Trouville-sur-Mer", "Touques", "Tourgéville", "Villers-sur-Mer", "Houlgate", "Cabourg", "Dives-sur-Mer", "Honfleur", "Pont-l'Évêque", "Lisieux", "Caen", "Bayeux"];
const ORDRE = [3, 10, 0, 7, 5, 11, 1, 8, 4, 2, 9, 6, 8, 2, 11, 5, 0, 9, 3, 6, 10, 1, 7, 4];
export const PHOTOS = RAW.map((x, i) => {
  const ville = VILLES[ORDRE[i % ORDRE.length] % VILLES.length];
  return { ...x, ville, alt: `${x.alt}, couvreur à ${ville}` };
});
export const HAS_PHOTOS = PHOTOS.length > 0;

const by = (f) => PHOTOS.find((x) => x.src.endsWith(`/${f}.webp`));
export const ILLUSTRATIONS = PHOTOS; // ancien nom, conservé pour les composants existants

export const SERVICE_IMAGES = {
  "reparation-toiture-deauville": by("toiture-tuiles-vue-aerienne"),
  "renovation-toiture-deauville": by("renov-velux-apres"),
  "remplacement-tuiles-ardoises-deauville": by("ardoise-lucarnes-colombage"),
  "reparation-faitage-deauville": by("reparation-arete-ouverte"),
  "demoussage-toiture-deauville": by("renov-velux-avant"),
  "hydrofuge-toiture-deauville": by("tuiles-maison-pierre"),
  "couvreur-zingueur-deauville": by("egout-ardoise-gouttiere-zinc"),
  "gouttieres-deauville": by("tuiles-terre-cuite-velux"),
  "etancheite-toiture-deauville": by("etancheite-toit-terrasse-apres-1"),
  "traitement-charpente-deauville": by("charpente-colombage-pignon"),
  "pose-velux-deauville": by("ardoise-velux-pierre"),
  "ravalement-facade-deauville": by("facade-ravalement-echafaudage"),
  "peinture-exterieure-deauville": by("charpente-colombage-pignon"),
  "nettoyage-facade-deauville": by("tuiles-maison-pierre"),
};

// Montages avant/après réels, utilisés dans le curseur.
export const PAIRS = {
  renovation: { before: by("renov-velux-avant"), after: by("renov-velux-apres"), title: "Rénovation de toiture" },
  remplacement: { before: by("renov-pierre-avant"), after: by("renov-pierre-apres"), title: "Changement de couverture" },
};
export const PAIR_BY_SERVICE = {
  "renovation-toiture-deauville": PAIRS.renovation,
  "remplacement-tuiles-ardoises-deauville": PAIRS.remplacement,
};
export const DEMOUSSAGE = PAIRS.renovation;

// Photos par catégorie, pour les pages services et communes.
const MAIN = PHOTOS.filter((x) => !/avant/.test(x.src));
export const pickIllustrations = (n, seed = 0) => Array.from({ length: n }, (_, i) => MAIN[(seed + i * 3) % MAIN.length]);
export const seedOf = (str = "") => Array.from(str).reduce((a, c) => a + c.charCodeAt(0), 0);
