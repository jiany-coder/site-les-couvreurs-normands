// Prérendu : après `craco build`, écrit un fichier HTML complet par page dans build/.
// Le design est celui de l'application React (mêmes composants) ; seul le HTML initial change.
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const tmp = path.join(root, ".prerender");
fs.mkdirSync(tmp, { recursive: true });

// Résolution de l'alias "@/..." (comme jsconfig.json) vers src/
const aliasPlugin = {
  name: "alias-at",
  setup(b) {
    b.onResolve({ filter: /^@\// }, (args) => {
      const base = path.join(root, "src", args.path.slice(2));
      for (const c of [base, base + ".js", base + ".jsx", base + ".json", path.join(base, "index.js"), path.join(base, "index.jsx")]) {
        if (fs.existsSync(c) && fs.statSync(c).isFile()) return { path: c };
      }
      return { errors: [{ text: `Introuvable : ${args.path}` }] };
    });
  },
};

await build({
  entryPoints: [path.join(root, "scripts/server-entry.jsx")],
  outfile: path.join(tmp, "server.cjs"),
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  loader: { ".js": "jsx", ".css": "empty", ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl" },
  plugins: [aliasPlugin],
  define: { "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL || ""), "process.env.REACT_APP_SITE_URL": process.env.REACT_APP_SITE_URL ? JSON.stringify(process.env.REACT_APP_SITE_URL) : "undefined", "process.env.NODE_ENV": '"production"', "process.env.REACT_APP_BACKEND_URL": '""' },
  logLevel: "error",
});

const require = createRequire(import.meta.url);
const { render, routes } = require(path.join(tmp, "server.cjs"));

// Domaine : une seule source de vérité, src/data/company.js (champ site).
const companySrc = fs.readFileSync(path.join(root, "src/data/company.js"), "utf8");
const SITE = (process.env.SITE_URL || (process.env.REACT_APP_SITE_URL || (companySrc.match(/site:[^\n]*?"(https?:[^"]+)"/) || [])[1]) || "").replace(/\/$/, "");
if (!SITE) throw new Error("Domaine introuvable (champ site de company.js)");
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ld = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function headTags(h) {
  if (!h) throw new Error("balises de page absentes");
  const robots = h.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const lds = (Array.isArray(h.jsonLd) ? h.jsonLd : h.jsonLd ? [h.jsonLd] : [])
    .map((o) => `<script type="application/ld+json" data-rh="true">${ld(o)}</script>`).join("");
  return [
    `<title data-rh="true">${esc(h.title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" name="robots" content="${robots}">`,
    `<meta data-rh="true" name="author" content="Les Couvreurs Normands">`,
    `<meta data-rh="true" name="geo.region" content="FR-14">`,
    `<meta data-rh="true" name="geo.placename" content="Deauville, Calvados, Normandie">`,
    h.noindex ? "" : `<link data-rh="true" rel="canonical" href="${esc(h.url)}">`,
    `<meta data-rh="true" property="og:type" content="${esc(h.type)}">`,
    `<meta data-rh="true" property="og:title" content="${esc(h.title)}">`,
    `<meta data-rh="true" property="og:description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" property="og:url" content="${esc(h.url)}">`,
    `<meta data-rh="true" property="og:image" content="${esc(h.img)}">`,
    `<meta data-rh="true" property="og:locale" content="fr_FR">`,
    `<meta data-rh="true" property="og:site_name" content="Les Couvreurs Normands">`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
    `<meta data-rh="true" name="twitter:title" content="${esc(h.title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" name="twitter:image" content="${esc(h.img)}">`,
    lds,
  ].join("");
}

const BASEP = process.env.PUBLIC_URL || "";
const prefix = (h) => BASEP ? h.replace(new RegExp('(\\s(?:src|href)=")/(?!/)(?!' + BASEP.slice(1) + '/)', "g"), "$1" + BASEP + "/") : h;

function page(url) {
  const { html, head } = render(url);
  const out = template
    .replace(/<title>.*?<\/title>/s, "")
    .replace("</head>", headTags(head) + "</head>")
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return { out, html, head };
}

const stripTags = (s) => s.replace(/<script.*?<\/script>|<style.*?<\/style>/gs, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
const report = [];
const noindexed = new Set();
const problems = [];
const titles = new Map();
const list = routes();
const { SERVICES, CITIES_COUNT } = require(path.join(tmp, "server.cjs"));

for (const url of list) {
  const { out, html, head } = page(url);
  // /page -> build/page.html : Cloudflare Pages sert cette page à /page (sans barre finale),
  // ce qui correspond au canonical et au sitemap. (page/index.html redirigerait vers /page/.)
  const file = url === "/" ? path.join(buildDir, "index.html") : path.join(buildDir, url.slice(1) + ".html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, prefix(out));
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${url}: ${h1} balise(s) h1`);
  if (!head || !head.title || !head.desc) problems.push(`${url}: titre ou description manquant`);
  if (head && head.url !== SITE + (url === "/" ? "/" : url)) problems.push(`${url}: canonical inattendu ${head.url}`);
  if (head) {
    if (titles.has(head.title)) problems.push(`${url}: titre identique à ${titles.get(head.title)}`);
    titles.set(head.title, url);
  }
  if (head && head.noindex) noindexed.add(url);
  report.push({ url, words });
}

// 404 : vrai code 404 (Cloudflare Pages sert 404.html pour toute adresse inconnue)
const nf = page("/page-introuvable-404");
fs.writeFileSync(path.join(buildDir, "404.html"), prefix(nf.out));

// sitemap, robots, llms.txt, redirections, en-têtes
const today = new Date().toISOString().slice(0, 10);
const SERVICE_SLUGS = new Set(SERVICES.map((x) => `/${x.slug}`));
const prio = (u) => (u === "/" ? "1.0" : SERVICE_SLUGS.has(u) || u === "/tarifs-couvreur-deauville" ? "0.9" : u.startsWith("/couvreur-") ? "0.6" : "0.7");
const indexable = list.filter((u) => !noindexed.has(u));
fs.writeFileSync(path.join(buildDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexable.map((u) => `<url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod><priority>${prio(u)}</priority></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(buildDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(buildDir, "llms.txt"), [
  "# Les Couvreurs Normands", "",
  `> Couvreur à Deauville (14800) : réparation, rénovation, démoussage, zinguerie et entretien de toiture dans tout le Calvados, de la Côte Fleurie (Deauville, Trouville-sur-Mer, Cabourg, Honfleur) à Lisieux, Caen, Bayeux, Falaise et Vire. Devis gratuit. Tél. [TÉLÉPHONE].`, "",
  "## Pages principales",
  ...["/", ...SERVICES.map((x) => `/${x.slug}`), "/tarifs-couvreur-deauville", "/zone-d-intervention", "/a-propos", "/blog", "/contact"].map((u) => `- ${SITE}${u}`), "",
  "## Pages communes", `- ${SITE}/zone-d-intervention (liste des ${CITIES_COUNT} communes, une page /couvreur-<commune> par commune)`,
  `- Pages prestation x ville : /<prestation>-<ville> pour les villes principales (Trouville-sur-Mer, Touques, Villers-sur-Mer, Houlgate, Cabourg, Honfleur, Pont-l'Évêque, Lisieux, Caen, Bayeux, Falaise, Vire…)`, "",
].join("\n"));

fs.writeFileSync(path.join(buildDir, "_redirects"), "");
fs.writeFileSync(path.join(buildDir, "_headers"),
  "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/static/*\n  Cache-Control: public, max-age=31536000, immutable\n");

// rapport
const wc = report.map((r) => r.words).sort((a, b) => a - b);
console.log(`Prérendu : ${list.length} pages, mots/page min ${wc[0]} · médiane ${wc[wc.length >> 1]} · max ${wc[wc.length - 1]}`);
const thin = report.filter((r) => r.words < 250);
if (thin.length) problems.push(`${thin.length} page(s) sous 250 mots, ex. ${thin.slice(0, 5).map((r) => r.url + " (" + r.words + ")").join(", ")}`);
fs.rmSync(tmp, { recursive: true, force: true });
if (problems.length) {
  console.error("PROBLÈMES :\n" + problems.slice(0, 40).join("\n"));
  if (process.env.STRICT) process.exit(1);
} else {
  console.log("Contrôles OK : un h1, titre/description/canonical uniques, 404 réel, sitemap généré.");
}
