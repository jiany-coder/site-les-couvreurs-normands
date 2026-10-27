// Communes desservies : liste générée par seo-data/export_json.py (données INSEE : code postal, population, distance depuis Deauville).
import list from "./cities.json";

export const CITIES = list;

export const PRIORITY_CITIES = list.filter((c) => c.priority).sort((a, b) => a.priority - b.priority);
export const AUGE_CITIES = list.filter((c) => c.auge);
const ordered = [...PRIORITY_CITIES, ...list.filter((c) => !c.priority)];
export const COVERED_TOWNS = ordered.slice(0, 45).map((c) => c.name);

export const getCity = (slug) => CITIES.find((c) => c.slug === slug);
