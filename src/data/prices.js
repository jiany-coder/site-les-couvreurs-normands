// Repères de prix publiés (France). Aucun prix n'est inventé : chaque ligne vient d'un guide public cité dans PRICE_GROUPS[].source.
export const PRICE_GROUPS = [
  {
    title: "Entretien de la toiture",
    source: "La Maison Saint-Gobain, guide « Prix d'un nettoyage de toiture au m² », mis à jour le 10 mars 2026",
    rows: [
      ["Démoussage / nettoyage, au m²", "25 à 35 €"],
      ["Traitement hydrofuge seul, au m²", "15 à 35 € (1 500 à 3 500 € pour 100 m²)"],
      ["Nettoyage, démoussage et hydrofuge, au m²", "35 à 45 €"],
    ],
  },
  {
    title: "Réparations de toiture",
    source: "MesDépanneurs, guide « Fuite de toiture ? Les prix de réparation », mis à jour le 30 décembre 2025",
    rows: [
      ["Réparation d'une fuite de toiture", "400 à 2 500 € (environ 750 € en moyenne)"],
      ["Remplacement d'une ou deux tuiles, déplacement compris", "150 à 250 € TTC"],
      ["Remplacement de plusieurs tuiles ou accès complexe, au m²", "70 à 150 € TTC"],
      ["Réparation de faîtage, au mètre linéaire", "50 à 150 € TTC"],
      ["Réparation d'un solin", "300 à 1 000 €"],
      ["Reprise ou remplacement d'un solin de cheminée", "250 à 600 €"],
      ["Nettoyage de gouttière, au mètre linéaire", "12 à 25 € TTC"],
      ["Réparation courante de gouttière", "150 à 225 €"],
    ],
  },
  {
    title: "Rénovation, charpente et fenêtres de toit",
    source: "La Maison Saint-Gobain, guide « Quel prix pour votre rénovation de toiture ? », mis à jour le 16 avril 2026 (prix TTC)",
    rows: [
      ["Couverture en tuiles béton, fournie et posée, au m²", "environ 90 €"],
      ["Couverture en zinc, fournie et posée, au m²", "environ 125 €"],
      ["Couverture en tuiles terre cuite, fournie et posée, au m²", "environ 130 €"],
      ["Couverture en ardoises naturelles, fournie et posée, au m²", "environ 200 €"],
      ["Dépose de l'ancienne couverture, au m²", "environ 15 €"],
      ["Traitement de charpente contre les xylophages, au mètre linéaire", "30 à 50 €"],
      ["Réparation de charpente, au m²", "environ 60 €"],
      ["Pose seule d'une fenêtre de toit", "environ 300 €"],
      ["Fenêtre de toit (fourniture), selon taille et performance", "240 à 1 300 €"],
    ],
  },
];

export const PRICE_FACTORS = [
  ["L'accès", "Hauteur du bâtiment, présence d'un échafaudage ou d'une nacelle, accès pour le matériel et l'évacuation."],
  ["La surface et la pente", "Plus la toiture est grande ou pentue, plus la durée du chantier et le matériel nécessaire augmentent."],
  ["Le matériau", "Tuiles béton, terre cuite, ardoises naturelles ou zinc n'ont ni le même prix ni la même mise en œuvre."],
  ["L'état du support", "Liteaux, voligeage, écran sous toiture ou charpente abîmés ajoutent des reprises à prévoir."],
  ["L'évacuation des déchets", "Selon La Maison Saint-Gobain, la dépose peut coûter jusqu'au double avec évacuation et bâchage inclus."],
];
