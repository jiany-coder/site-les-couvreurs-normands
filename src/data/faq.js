import { COMPANY } from "./company";

// Questions générales (accueil, contact, schéma FAQPage). Réponses factuelles : rien qui ne vienne du client ou d'une source publique.
export const GLOBAL_FAQ = [
  {
    q: "Quelle est la zone d'intervention des Couvreurs Normands ?",
    a: "Les Couvreurs Normands sont basés à Deauville, et intervient dans tout le Calvados : Trouville-sur-Mer, Honfleur, Cabourg, Pont-l'Évêque, Lisieux, Caen, Bayeux, Vire et toutes les communes du département.",
  },
  {
    q: "Le devis est-il gratuit ?",
    a: "Oui, le devis est gratuit. Il est établi après examen de la toiture et détaille les travaux prévus avant que vous ne preniez votre décision.",
  },
  {
    q: "Quels travaux de toiture réalisez-vous ?",
    a: "Réparation de toiture et de fuite, rénovation, remplacement de tuiles et d'ardoises, réparation de faîtage, démoussage et nettoyage, traitement hydrofuge, zinguerie, gouttières, étanchéité, traitement de charpente, pose et remplacement de fenêtres de toit.",
  },
  {
    q: "Faut-il une autorisation pour refaire ou réparer une toiture ?",
    a: "Une réparation ou un remplacement à l'identique (mêmes matériaux, mêmes couleurs, même pente) ne demande en général aucune autorisation d'urbanisme. Un changement d'aspect, comme un autre modèle de tuiles ou de gouttières, demande une déclaration préalable en mairie, d'après service-public.fr. Le plan local d'urbanisme de votre commune peut aussi imposer des règles.",
  },
  {
    q: "Combien coûte la réparation d'une fuite de toiture ?",
    a: "Selon MesDépanneurs (mise à jour du 30 décembre 2025), une réparation de fuite coûte généralement de 400 à 2 500 €, avec une moyenne autour de 750 € pour une intervention légère à modérée. Le prix exact dépend de la cause, de l'accès et de la hauteur : le devis est gratuit.",
  },
  {
    q: "Quand faire démousser sa toiture ?",
    a: "En général au printemps ou à l'automne, par temps sec et hors période de gel. Le démoussage coûte de 25 à 35 € le m² selon La Maison Saint-Gobain (mars 2026). La méthode se choisit selon le matériau et son état.",
  },
  {
    q: "Réparer ou rénover : comment choisir ?",
    a: "Si le désordre est localisé et le reste de la toiture sain, une réparation ciblée suffit souvent. Si les fuites se répètent sur plusieurs zones ou si la couverture arrive en fin de vie, la rénovation devient plus cohérente. L'examen de la toiture permet de trancher.",
  },
  {
    q: "Comment demander un devis ?",
    a: `Appelez le ${COMPANY.phone}${COMPANY.email ? `, écrivez à ${COMPANY.email}` : ""} ou remplissez le formulaire de contact du site.`,
  },
];
