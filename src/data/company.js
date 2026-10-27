// Source unique des informations de l'entreprise. Tout ce qui est marqué [À COMPLÉTER] ou [TÉLÉPHONE] est à confirmer avec le client avant mise en ligne.
export const COMPANY = {
  brand: "Les Couvreurs Normands",
  shortBrand: "Couvreurs Normands",
  tagline: "Couvreur à Deauville",
  phone: "[TÉLÉPHONE]", // [À COMPLÉTER] numéro à fournir par l'agence
  phoneRaw: "+33000000000",
  email: null, // [À COMPLÉTER] adresse e-mail professionnelle
  address: "Deauville (14800)", // [À COMPLÉTER] adresse postale exacte si le client souhaite l'afficher
  streetAddress: null,
  city: "Deauville",
  postalCode: "14800",
  region: "Normandie",
  department: "Calvados (14)",
  hours: null, // [À COMPLÉTER] horaires de la fiche Google
  geo: { latitude: 49.3585, longitude: 0.0752 }, // centre de Deauville
  radiusKm: null, // tout le Calvados
  logos: {
    og: `${process.env.PUBLIC_URL || ""}/og-couvreurs-normands.jpg`,
    main: `${process.env.PUBLIC_URL || ""}/logo-couvreurs-normands-512.webp`,
    icon: `${process.env.PUBLIC_URL || ""}/logo-couvreurs-normands-192.webp`,
  },
  social: {
    gbp: null, // [À COMPLÉTER] lien de la fiche Google Business Profile
    reviewLink: null,
  },
  rating: null, // { value, count, asOf } à renseigner avec les vrais avis de la fiche Google
  site: process.env.REACT_APP_SITE_URL || "https://[DOMAINE]", // [À COMPLÉTER] domaine définitif
  promo: { enabled: false, text: "", until: "" },
  labels: [],
  decennale: false, // [À COMPLÉTER] passer à true seulement si le client le confirme
  experienceYears: null, // [À COMPLÉTER] seulement si le client le confirme
  urgence: null,
  legal: {
    name: "Les Couvreurs Normands",
    form: "[À COMPLÉTER]",
    siret: "[À COMPLÉTER]",
    tva: "[À COMPLÉTER]",
    publisher: "[À COMPLÉTER]",
  },
};

export const asset = (p) => `${process.env.PUBLIC_URL || ""}${p}`;
export const telHref = `tel:${COMPANY.phoneRaw}`;
export const logoUrl = (path = COMPANY.logos.main) => `${COMPANY.site}${path.replace(process.env.PUBLIC_URL || "", "")}`;
