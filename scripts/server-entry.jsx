// Point d'entrée "serveur" : produit le HTML de chaque page au moment de la construction (prérendu).
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "../src/App";
import { CITIES } from "../src/data/cities";
import { SERVICES } from "../src/data/services";
import { SERVICE_CITY_PAGES } from "../src/data/serviceCities";
import { BLOG_POSTS } from "../src/data/blog_all";

export { SERVICES };
export const CITIES_COUNT = CITIES.length;

export function routes() {
  const list = [
    "/", "/a-propos", "/realisations", "/contact", "/blog",
    "/zone-d-intervention", "/couvreur-pays-d-auge", "/tarifs-couvreur-deauville", "/mentions-legales", "/politique-de-confidentialite",
    ...SERVICES.map((s) => `/${s.slug}`),
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
  ];
  for (const c of CITIES) list.push(`/couvreur-${c.slug}`);
  for (const p of SERVICE_CITY_PAGES) list.push(p.path);
  return [...new Set(list)];
}

const BASE = process.env.PUBLIC_URL || "";

export function render(url) {
  globalThis.__HEAD__ = null;
  const html = renderToString(
    <StaticRouter location={BASE + (url === "/" ? "/" : url)} basename={BASE || "/"}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html, head: globalThis.__HEAD__ };
}
