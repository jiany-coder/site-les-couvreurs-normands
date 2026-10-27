// Pages « activité × ville » : une page par prestation et par ville principale (villes prioritaires du client).
import { SERVICES } from "./services";
import { PRIORITY_CITIES } from "./cities";

export const svcBase = (s) => s.slug.replace(/-deauville$/, "");
export const svcLabel = (s) => s.title.replace(/ à Deauville$/, "");
export const svcCityPath = (s, c) => `/${svcBase(s)}-${c.slug}`;

export const SERVICE_CITY_PAGES = SERVICES.flatMap((s) => PRIORITY_CITIES.map((c) => ({ service: s, city: c, path: svcCityPath(s, c) })));

export const findServiceCity = (path) => SERVICE_CITY_PAGES.find((p) => p.path === path);

// « à Lisieux », « au Mans », « aux Loges »
export const aPrep = (n) => (n.startsWith("Les ") ? "aux " + n.slice(4) : n.startsWith("Le ") ? "au " + n.slice(3) : "à " + n);
