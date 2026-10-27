import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin, CheckCircle2 } from "lucide-react";
import SEO, { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema, buildServiceSchema } from "../components/SEO";
import HeroBg from "../components/HeroBg";
import PhotoBand from "../components/PhotoBand";
import { COMPANY, telHref } from "../data/company";
import { PAGE_UPDATED } from "../data/services";
import CONTENT from "../data/communes_content.json";
import FAQAccordion from "../components/FAQAccordion";
import { HAS_PHOTOS, pickIllustrations, seedOf } from "../data/photos";
import ContactForm from "../components/ContactForm";
import CTASection from "../components/CTASection";
import RoofPattern from "../components/RoofPattern";
import { SERVICES } from "../data/services";
import { getCity } from "../data/cities";
import { svcLabel, svcCityPath } from "../data/serviceCities";

export default function CityPage() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\//, "").replace(/\/$/, "");
  const d = CONTENT[key];
  if (!d) return <Navigate to="/" replace />;

  const url = `${COMPANY.site}/${key}`;
  const ld = [
    buildLocalBusinessSchema(),
    buildServiceSchema({ title: d.h1, description: d.desc }, url, d.nom),
    buildBreadcrumbSchema([
      ["Accueil", COMPANY.site + "/"],
      ["Zone d'intervention", `${COMPANY.site}/zone-d-intervention`],
      [d.h1, url],
    ]),
    buildFAQSchema(d.faq.map(([q, a]) => ({ q, a }))),
  ];

  return (
    <>
      <SEO title={d.title} description={d.desc} canonical={url} jsonLd={ld} />

      <section className="relative bg-[#16221A] overflow-hidden">
        <HeroBg src="/toiture-tuiles-rouges.webp" strength={0.82} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
          <nav aria-label="Fil d'Ariane" className="text-sm text-[#EADFC4]/80 font-sans">
            <Link to="/" className="hover:text-[#EADFC4]">Accueil</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/zone-d-intervention" className="hover:text-[#EADFC4]">Zone d'intervention</Link> <span aria-hidden="true">/</span> <span>{d.nom}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#EADFC4]/12 backdrop-blur-md border border-[#EADFC4]/30 px-4 py-2 rounded-full mt-6 mb-6">
            <MapPin className="w-4 h-4 text-[#EADFC4]" strokeWidth={1.75} />
            <span className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#EADFC4]">{d.cp} · {d.km} km de Deauville</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-[#FBF7EE] max-w-4xl">{d.h1}</h1>
          <p className="text-lg sm:text-xl text-white font-medium max-w-3xl mt-7 leading-relaxed bg-[#16221A]/70 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]">{d.intro}</p>
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

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 prose-blog">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-5">Couvreur à {d.nom} : comment nous intervenons</h2>
          <p className="text-lg leading-[1.75]">{d.geo}</p>
          {d.special && <p className="text-lg leading-[1.75]">{d.special}</p>}
          <p className="text-lg leading-[1.75]">{d.popNote}</p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Quels travaux de toiture à {d.nom} ?</h2>
          <p className="text-lg leading-[1.75]">Voici trois des {SERVICES.length} prestations de {COMPANY.brand}, que nous réalisons à {d.nom} comme dans les communes voisines :</p>
          <ul className="space-y-3 list-none ml-0">
            {d.services.map(([slug, t, p]) => (
              <li key={slug} className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F4331] mt-1 shrink-0" strokeWidth={1.75} />
                <span className="text-lg text-[#4B5547]"><Link to={`/${slug}`} className="font-semibold text-[#2F4331] underline">{t}</Link> : {p}</span>
              </li>
            ))}
          </ul>
          {getCity(d.slug)?.priority > 0 && (
            <>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Toutes nos prestations à {d.nom}</h2>
              <ul className="flex flex-wrap gap-3 list-none ml-0">
                {SERVICES.map((s) => (
                  <li key={s.slug}><Link to={svcCityPath(s, getCity(d.slug))} className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#2F4331] hover:border-[#2F4331]">{svcLabel(s)}</Link></li>
                ))}
              </ul>
            </>
          )}

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Démoussage et nettoyage de toiture à {d.nom}</h2>
          {d.demoussage.map((p, i) => <p key={i} className="text-lg leading-[1.75]">{p}</p>)}
          <p className="text-lg leading-[1.75]">Détails de la méthode et des prix sur la page <Link to="/demoussage-toiture-deauville" className="text-[#2F4331] underline">démoussage et nettoyage de toiture</Link>.</p>
          <p className="text-lg leading-[1.75]">Retrouvez aussi toutes nos prestations sur la page <Link to="/" className="text-[#2F4331] underline">couvreur à Deauville</Link>.</p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Les toitures de {d.nom} : ce qu'il faut savoir</h2>
          {d.roof.map((p, i) => <p key={i} className="text-lg leading-[1.75]">{p}</p>)}
          <p className="text-lg leading-[1.75] bg-[#EADFC4] rounded-2xl p-5"><strong>Conseil.</strong> {d.tip}</p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Comment demander un devis à {d.nom} ?</h2>
          <p className="text-lg leading-[1.75]">{d.how}</p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Combien coûtent les travaux de toiture à {d.nom} ?</h2>
          <p className="text-lg leading-[1.75]">Quelques repères de prix publiés en France pour ces travaux. Chaque toiture est différente : le devis est gratuit.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden">
              <thead><tr className="bg-[#EADFC4] text-[#17231B]"><th className="p-4">Prestation</th><th className="p-4">Repère de prix</th></tr></thead>
              <tbody>
                {d.prices.map(([a, b]) => (
                  <tr key={a} className="border-b border-[#E2D4B3]"><td className="p-4">{a}</td><td className="p-4 font-medium text-[#17231B]">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#4B5547] mt-3">Prix indicatifs publiés par La Maison Saint-Gobain et MesDépanneurs (2025 et 2026). <Link to="/tarifs-couvreur-deauville" className="text-[#2F4331] underline">Voir tous les repères de prix</Link></p>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Fiche pratique : {d.nom}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden">
              <tbody>
                {d.fiche.map(([a, b]) => (
                  <tr key={a} className="border-b border-[#E2D4B3]"><th className="p-4 font-semibold text-[#17231B] w-1/3">{a}</th><td className="p-4">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mt-12 mb-5">Communes voisines de {d.nom}</h2>
          <ul className="flex flex-wrap gap-3 list-none ml-0">
            {d.near.map((n) => (
              <li key={n.slug}><Link to={`/couvreur-${n.slug}`} className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#17231B] hover:border-[#2F4331]">Couvreur {n.nom} ({n.km} km)</Link></li>
            ))}
            <li><Link to="/" className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#17231B] hover:border-[#2F4331]">Couvreur Deauville</Link></li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-[#F5EEDD]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light tracking-tight mb-8">Questions fréquentes à {d.nom}</h2>
          <FAQAccordion items={d.faq.map(([q, a]) => ({ q, a }))} />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-light tracking-tight mb-3">Demander un devis gratuit à {d.nom}</h2>
          <p className="text-[#4B5547] mb-8">Décrivez la situation : nous examinons la toiture et vous remettons un devis gratuit.</p>
          <div className="premium-card p-6 sm:p-8"><ContactForm defaultCity={d.nom} /></div>
        </div>
      </section>

      {HAS_PHOTOS && (
<section className="py-14 bg-[#F5EEDD]" data-testid="city-photos">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-8">Toitures à {d.nom} et aux alentours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pickIllustrations(3, seedOf(d.nom)).map((p) => (
              <div key={p.src} className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
)}
      <PhotoBand src="/toiture-ardoise.webp" title={`Votre toiture à ${d.nom}`} text="Réparation, rénovation, démoussage, zinguerie : nous examinons la toiture puis remettons un devis gratuit." />
      <CTASection title={`Un couvreur à ${d.nom} ? Appelez-nous`} />
    </>
  );
}
