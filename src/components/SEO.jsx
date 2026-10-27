import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { COMPANY, logoUrl } from "../data/company";
import { SERVICES } from "../data/services";

// Phrase de définition unique, reprise telle quelle sur le site (accueil, à propos, schéma).
export const DESCRIPTION = `${COMPANY.brand} sont des couvreurs basés à Deauville qui réparent, rénovent et entretiennent les toitures dans tout le Calvados.`;

const SEO = ({ title, description, canonical, image, type = "website", jsonLd, noindex = false }) => {
  const location = useLocation();
  const fullTitle = title || `Couvreur à Deauville | ${COMPANY.brand}`;
  const desc = description || `Couvreur à Deauville : réparation, rénovation et entretien de toiture dans tout le Calvados. Devis gratuit. Tél. ${COMPANY.phone}`;
  const path = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
  const url = canonical || `${COMPANY.site}${path}`;
  const img = image || logoUrl(COMPANY.logos.og);

  // Prérendu (build) : on mémorise les balises de la page pour les écrire dans le HTML statique.
  if (typeof window === "undefined") {
    globalThis.__HEAD__ = { title: fullTitle, desc, url, img, type, noindex, jsonLd };
    return null;
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <meta name="author" content={COMPANY.brand} />
      <meta name="geo.region" content="FR-14" />
      <meta name="geo.placename" content="Deauville, Calvados, Normandie" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={COMPANY.brand} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

const AREA = ["Deauville", "Trouville-sur-Mer", "Honfleur", "Cabourg", "Lisieux", "Pont-l'Évêque", "Caen", "Bayeux", "Vire", "Falaise"];

export const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": `${COMPANY.site}/#business`,
  name: COMPANY.brand,
  description: DESCRIPTION,
  image: logoUrl(),
  logo: logoUrl(),
  url: COMPANY.site,
  telephone: COMPANY.phoneRaw,
  ...(COMPANY.email ? { email: COMPANY.email } : {}),
  address: {
    "@type": "PostalAddress",
    ...(COMPANY.streetAddress ? { streetAddress: COMPANY.streetAddress } : {}),
    addressLocality: COMPANY.city,
    postalCode: COMPANY.postalCode,
    addressRegion: COMPANY.region,
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.latitude, longitude: COMPANY.geo.longitude },
  areaServed: [
    ...AREA.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: "Calvados" },
  ],
  ...(COMPANY.social.gbp ? { sameAs: [COMPANY.social.gbp] } : {}),
  knowsAbout: ["Couverture", "Réparation de toiture", "Rénovation de toiture", "Démoussage de toiture", "Zinguerie", "Gouttières", "Traitement hydrofuge", "Charpente", "Fenêtres de toit"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Travaux de couverture à Deauville",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      url: `${COMPANY.site}/${s.slug}`,
      itemOffered: { "@type": "Service", name: s.title, areaServed: "Deauville, Calvados" },
    })),
  },
  ...(/\d/.test(COMPANY.legal.siret) ? { taxID: COMPANY.legal.siret } : {}),
});

export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${COMPANY.site}/#website`,
  url: COMPANY.site,
  name: COMPANY.brand,
  inLanguage: "fr-FR",
  publisher: { "@id": `${COMPANY.site}/#business` },
});

export const buildBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
});

export const buildPageSchema = (type, name, url, description, extra = {}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name,
  url,
  description,
  inLanguage: "fr-FR",
  isPartOf: { "@type": "WebSite", name: COMPANY.brand, url: COMPANY.site },
  about: { "@id": `${COMPANY.site}/#business` },
  ...extra,
});

export const buildServiceSchema = (service, url, areaName = "Deauville") => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title || service.name,
  serviceType: service.title || service.name,
  description: service.answer || service.description,
  url,
  areaServed: { "@type": "City", name: areaName },
  provider: { "@id": `${COMPANY.site}/#business` },
});

export const buildFAQSchema = (faq) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const buildArticleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  author: { "@type": "Organization", name: COMPANY.brand, url: COMPANY.site },
  publisher: { "@type": "Organization", name: COMPANY.brand, logo: { "@type": "ImageObject", url: logoUrl() } },
  image: [logoUrl()],
  description: post.excerpt,
  mainEntityOfPage: `${COMPANY.site}/blog/${post.slug}`,
  inLanguage: "fr-FR",
  articleSection: post.category,
});

export default SEO;
