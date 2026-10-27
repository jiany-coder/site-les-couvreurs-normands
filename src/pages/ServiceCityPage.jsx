import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone, MapPin } from "lucide-react";
import SEO, { buildLocalBusinessSchema, buildFAQSchema, buildServiceSchema, buildBreadcrumbSchema } from "../components/SEO";
import HeroBg from "../components/HeroBg";
import PhotoBand from "../components/PhotoBand";
import FAQAccordion from "../components/FAQAccordion";
import ContactForm from "../components/ContactForm";
import CTASection from "../components/CTASection";
import BeforeAfter from "../components/BeforeAfter";
import { COMPANY, telHref } from "../data/company";
import { SERVICES, PRICE_SOURCE, PAGE_UPDATED } from "../data/services";
import { PRIORITY_CITIES } from "../data/cities";
import CONTENT from "../data/communes_content.json";
import { PAIR_BY_SERVICE, SERVICE_IMAGES, pickIllustrations, seedOf } from "../data/photos";
import { findServiceCity, svcLabel, svcCityPath, aPrep } from "../data/serviceCities";

const SHORT_TITLE = {
  "demoussage-toiture-deauville": "Démoussage de toiture",
  "remplacement-tuiles-ardoises-deauville": "Remplacement de tuiles",
  "traitement-charpente-deauville": "Traitement de charpente",
  "pose-velux-deauville": "Pose de Velux",
  "etancheite-toiture-deauville": "Étanchéité de toiture",
  "hydrofuge-toiture-deauville": "Traitement hydrofuge toiture",
  "renovation-toiture-deauville": "Rénovation de toiture",
  "reparation-toiture-deauville": "Réparation de toiture",
  "reparation-faitage-deauville": "Réparation de faîtage",
};
const hash = (s) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
const cut = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,;:.]+\S*$/, "") + "…");

export default function ServiceCityPage() {
  const { pathname } = useLocation();
  const path = "/" + pathname.replace(/^\//, "").replace(/\/$/, "");
  const hit = findServiceCity(path);
  if (!hit) return <Navigate to="/" replace />;
  const { service, city } = hit;
  const d = CONTENT[`couvreur-${city.slug}`];
  if (!d) return <Navigate to="/" replace />;

  const label = svcLabel(service);
  const a = aPrep(d.nom);
  const url = `${COMPANY.site}${path}`;
  const h = hash(path);
  const minutes = Math.max(5, Math.round((d.km * 1.35 / 55) * 60));
  const short = SHORT_TITLE[service.slug] || svcLabel(service);

  let title = `${short} ${a} | ${COMPANY.brand}`;
  if (title.length > 60) title = `${short} ${a} | Les Couvreurs Normands`;
  if (title.length > 60) title = `${short} ${a}`;
  let desc = `${label} ${a} (${d.cp}) : ${service.short} Devis gratuit. Tél. ${COMPANY.phone}.`;
  if (desc.length > 160) desc = `${label} ${a} (${d.cp}) par les Couvreurs Normands. Devis gratuit. Tél. ${COMPANY.phone}.`;
  desc = cut(desc, 160);

  const intro = `${label} ${a} : ${COMPANY.brand}, couvreur basé à Deauville, intervient à ${d.nom} (${d.cp}, ${d.pop.toLocaleString("fr-FR")} habitants), à environ ${d.km} km de Deauville, soit ${minutes} minutes de route. ${service.short} Devis gratuit après examen de la toiture, au ${COMPANY.phone}.`;

  // deux paragraphes de la page service, choisis selon la ville pour varier le contenu
  const i0 = h % service.sections.length;
  const secs = [service.sections[i0], service.sections[(i0 + 1) % service.sections.length]];
  const roof = d.roof[h % d.roof.length];

  const faq = [
    { q: `Intervenez-vous pour ${label.toLowerCase()} ${a} ?`, a: `Oui. ${COMPANY.brand} réalisent cette prestation à ${d.nom} (${d.cp}) et dans les communes voisines. L'entreprise est basée à Deauville, à environ ${d.km} km, soit ${minutes} minutes de route. Appelez le ${COMPANY.phone} pour décrire votre situation.` },
    { q: `Combien coûte ${label.toLowerCase()} ${a} ?`, a: `Le prix dépend de la surface, de l'accès et de l'état de la toiture. Repères publiés en France : ${service.table.rows.slice(0, 2).map(([x, y]) => `${x.toLowerCase()} : ${y}`).join(" ; ")}. Le devis est gratuit et détaille chaque poste.` },
    ...(d.faq && d.faq[1] ? [{ q: d.faq[1][0], a: d.faq[1][1] }] : []),
    ...service.faq.slice(0, 2).map((f) => ({ q: f.q.replace(/ à Deauville/g, ` ${a}`), a: f.a })),
  ];
  const near = (d.near || []).filter((n) => CONTENT[`couvreur-${n.slug}`]);

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const sisters = PRIORITY_CITIES.filter((c) => c.slug !== city.slug);
  const pair = PAIR_BY_SERVICE[service.slug];
  const feature = SERVICE_IMAGES[service.slug];
  const photos = [feature, ...pickIllustrations(4, seedOf(path)).filter((x) => x !== feature)].filter(Boolean).slice(0, 3);

  const jsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema({ title: `${label} ${a}`, description: desc }, url, d.nom),
    buildBreadcrumbSchema([
      ["Accueil", COMPANY.site + "/"],
      [`Couvreur ${d.nom}`, `${COMPANY.site}/couvreur-${city.slug}`],
      [`${label} ${a}`, url],
    ]),
    buildFAQSchema(faq),
  ];

  return (
    <>
      <SEO title={title} description={desc} canonical={url} jsonLd={jsonLd} />

      <section className="relative bg-[#16221A] overflow-hidden">
        <HeroBg src="/toiture-ardoise.webp" strength={0.82} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
          <nav aria-label="Fil d'Ariane" className="text-sm text-[#EADFC4]/80 font-sans">
            <Link to="/" className="hover:text-[#EADFC4]">Accueil</Link> <span aria-hidden="true">/</span>{" "}
            <Link to={`/couvreur-${city.slug}`} className="hover:text-[#EADFC4]">Couvreur {d.nom}</Link> <span aria-hidden="true">/</span> <span>{label}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#EADFC4]/12 backdrop-blur-md border border-[#EADFC4]/30 px-4 py-2 rounded-full mt-6 mb-6">
            <MapPin className="w-4 h-4 text-[#EADFC4]" strokeWidth={1.75} />
            <span className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#EADFC4]">{d.cp} · {d.km} km de Deauville</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-[#FBF7EE] max-w-4xl">{label} {a} ({d.cp})</h1>
          <p className="text-lg sm:text-xl text-white font-medium max-w-3xl mt-7 leading-relaxed bg-[#16221A]/70 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]">{intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-sans font-semibold text-base hover:bg-[#A34209] hover:-translate-y-1 hover:shadow-xl transition-all">
              Devis gratuit <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={telHref} className="inline-flex items-center justify-center gap-2 bg-transparent text-[#FBF7EE] px-8 py-4 rounded-full font-sans font-semibold text-base border-2 border-[#EADFC4]/40 hover:bg-[#EADFC4] hover:text-[#2F4331] transition-all">
              <Phone className="w-5 h-5" /> {COMPANY.phone}
            </a>
          </div>
          <p className="text-xs text-[#FBF7EE]/60 mt-8 font-sans">Page mise à jour le <time dateTime={PAGE_UPDATED.iso}>{PAGE_UPDATED.label}</time></p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Notre intervention</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light leading-tight tracking-tight">Ce que comprend notre prestation {a}</h2>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {service.benefits.map((b) => (
              <div key={b} className="bg-white border border-[#E2D4B3] p-6 rounded-2xl flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#2F4331] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-[#17231B] font-sans font-medium leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 prose-blog">
          {secs.map((s) => (
            <article key={s.h} className="mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-4 leading-tight">{s.h}</h2>
              <p className="text-lg text-[#4B5547] leading-[1.75]">{s.p}</p>
            </article>
          ))}

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Les toitures de {d.nom} : ce qu'il faut savoir</h2>
          <p className="text-lg leading-[1.75]">{d.geo}</p>
          {d.special && <p className="text-lg leading-[1.75]">{d.special}</p>}
          <p className="text-lg leading-[1.75]">{roof}</p>
          {d.popNote && <p className="text-lg leading-[1.75]">{d.popNote}</p>}
          <p className="text-lg leading-[1.75] bg-[#EADFC4] rounded-2xl p-5"><strong>Conseil.</strong> {d.tip}</p>

          {d.fiche && (
            <>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">{label} {a} en bref</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {d.fiche.map(([k, v]) => (
                  <div key={k} className="bg-white border border-[#E2D4B3] rounded-2xl p-4"><dt className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#2F4331]">{k}</dt><dd className="mt-1 text-[#17231B]">{v}</dd></div>
                ))}
              </dl>
              {d.how && <p className="text-lg leading-[1.75] mt-5">{d.how}</p>}
            </>
          )}
          {near.length > 0 && (
            <p className="text-lg leading-[1.75]">
              Autour de {d.nom}, nous intervenons aussi à{" "}
              {near.map((n, i) => (
                <React.Fragment key={n.slug}>{i > 0 && (i === near.length - 1 ? " et " : ", ")}<Link to={`/couvreur-${n.slug}`} className="text-[#2F4331] underline">{n.nom}</Link> ({n.km} km)</React.Fragment>
              ))}
              .
            </p>
          )}

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">{service.table.caption} {a}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden">
              <thead><tr className="bg-[#EADFC4] text-[#17231B]"><th className="p-4">Prestation</th><th className="p-4">Repère de prix</th></tr></thead>
              <tbody>
                {service.table.rows.map(([x, y]) => (
                  <tr key={x} className="border-b border-[#E2D4B3]"><td className="p-4">{x}</td><td className="p-4 font-medium text-[#17231B]">{y}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#4B5547] mt-3">{service.priceSource || PRICE_SOURCE} <Link to="/tarifs-couvreur-deauville" className="text-[#2F4331] underline">Voir tous les repères de prix</Link></p>
        </div>
      </section>

      {photos.length > 0 && (
<section className="py-16 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-8">Nos chantiers : {label.toLowerCase()}</h2>
          {pair && <div className="mb-6 max-w-3xl mx-auto"><BeforeAfter before={pair.before.src} after={pair.after.src} /><p className="text-sm text-[#4B5547] mt-3 text-center">{pair.title} : faites glisser pour comparer.</p></div>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {photos.map((p) => (
              <div key={p.src} className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
)}

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Questions fréquentes</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light leading-tight tracking-tight mb-8">{label} {a} : vos questions</h2>
          <FAQAccordion items={faq} />
        </div>
      </section>

      <section className="py-20 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-6">Nos autres prestations {a}</h2>
          <ul className="flex flex-wrap gap-3 mb-12">
            {others.map((s) => (
              <li key={s.slug}><Link to={svcCityPath(s, city)} className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#17231B] hover:border-[#2F4331] hover:text-[#2F4331]">{svcLabel(s)} {a}</Link></li>
            ))}
            <li><Link to={`/couvreur-${city.slug}`} className="inline-block rounded-full bg-[#2F4331] px-4 py-2 text-sm text-[#FBF7EE]">Couvreur {d.nom}</Link></li>
          </ul>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-6">{label} dans les villes voisines</h2>
          <ul className="flex flex-wrap gap-3">
            {sisters.map((c) => (
              <li key={c.slug}><Link to={svcCityPath(service, c)} className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#17231B] hover:border-[#2F4331] hover:text-[#2F4331]">{label} {aPrep(c.name)}</Link></li>
            ))}
            <li><Link to={`/${service.slug}`} className="inline-block rounded-full bg-[#2F4331] px-4 py-2 text-sm text-[#FBF7EE]">{service.title}</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-light leading-tight tracking-tight mb-3">Demander un devis gratuit {a}</h2>
          <p className="text-[#4B5547] mb-8">Décrivez la situation : nous examinons la toiture et vous remettons un devis gratuit.</p>
          <div className="premium-card p-6 sm:p-8"><ContactForm defaultService={label} /></div>
        </div>
      </section>

      <PhotoBand src="/toiture-tuiles-rouges.webp" title={`${label} ${a} : on s'en occupe`} text={`Examen de la toiture, devis gratuit et détaillé, intervention à ${d.nom} et dans les communes voisines.`} />
      <CTASection />
    </>
  );
}
