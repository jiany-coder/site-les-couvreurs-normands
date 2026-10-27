import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import SEO, { buildPageSchema, buildBreadcrumbSchema, buildLocalBusinessSchema, buildFAQSchema } from "../components/SEO";
import { COMPANY } from "../data/company";
import { AUGE_CITIES } from "../data/cities";
import { SERVICES } from "../data/services";
import CTASection from "../components/CTASection";
import FAQAccordion from "../components/FAQAccordion";
import HeroBg from "../components/HeroBg";

const FAQ = [
  { q: "Intervenez-vous dans tout le Pays d'Auge ?", a: `Oui. ${COMPANY.brand} sont basés à Deauville et se déplace dans le Pays d'Auge, notamment à Lisieux, Orbec, Livarot, Vimoutiers, Pont-l'Évêque, Mézidon et Cambremer, ainsi qu'à Bernay. Appelez le ${COMPANY.phone} pour confirmer votre adresse.` },
  { q: "Quelles toitures rencontre-t-on dans le Pays d'Auge ?", a: "Maisons à pans de bois, longères et dépendances ont souvent des toitures à forte pente, avec lucarnes, noues et souches de cheminée. La zinguerie y joue un rôle important, et les interventions ciblées respectueuses du matériau en place sont à privilégier." },
  { q: "Le devis est-il gratuit dans le Pays d'Auge ?", a: "Oui. Le devis est gratuit et détaille les travaux après examen de la toiture. Vous pouvez aussi envoyer des photos pour préparer la visite." },
  { q: "Combien de temps faut-il pour venir de Deauville ?", a: "Comptez environ une heure de route pour Lisieux, un peu plus pour Orbec, Livarot, Vimoutiers ou Bernay. Nous regroupons si possible les rendez-vous d'un même secteur." },
];

export default function AugePage() {
  const url = `${COMPANY.site}/couvreur-pays-d-auge`;
  const list = [...AUGE_CITIES].sort((a, b) => (a.priority || 99) - (b.priority || 99) || a.km - b.km);
  return (
    <>
      <SEO
        title="Couvreur Pays d'Auge : Lisieux, Orbec, Livarot"
        description={`Couvreur dans le Pays d'Auge : Lisieux, Bernay, Orbec, Livarot, Vimoutiers, Mézidon. Réparation, démoussage, zinguerie. Devis gratuit. Tél. ${COMPANY.phone}`}
        canonical={url}
        jsonLd={[
          buildLocalBusinessSchema(),
          buildPageSchema("WebPage", "Couvreur dans le Pays d'Auge", url, "Intervention des Couvreurs Normands dans le Pays d'Auge."),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Pays d'Auge", url]]),
          buildFAQSchema(FAQ),
        ]}
      />
      <section className="relative pt-32 pb-20 bg-[#16221A] overflow-hidden">
        <HeroBg src="/toiture-ardoise.webp" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#EADFC4] mb-5">Secteur prioritaire</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight tracking-tight mb-6">Couvreur dans le Pays d'Auge : Lisieux, Orbec, Livarot, Vimoutiers</h1>
          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed mb-8 max-w-3xl bg-[#16221A]/70 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]">
            {COMPANY.brand} interviennent dans tout le Pays d'Auge pour la réparation de fuite, le démoussage, la zinguerie, les gouttières et la rénovation de toiture. L'examen de la toiture et le devis sont gratuits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex bg-[#C2500B] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#A34209]">Demander un devis gratuit</Link>
            <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex bg-white/10 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm">{COMPANY.phone}</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FBF7EE]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-4">Quels travaux de toiture dans le Pays d'Auge ?</h2>
          <p className="text-lg text-[#4B5547] leading-relaxed mb-6">Toitures à forte pente, noues, lucarnes et grandes dépendances : voici les prestations les plus demandées dans le secteur.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to={`/${s.slug}`} className="block rounded-xl bg-white border border-[#E2D4B3] px-4 py-3 text-sm font-semibold text-[#2F4331] hover:border-[#2F4331]">{s.title}</Link></li>
            ))}
          </ul>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-5">Dans quelles communes du Pays d'Auge intervenez-vous ?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {list.map((c) => (
              <li key={c.slug} className="rounded-xl border border-[#2F4331]/10 bg-white p-4">
                <Link to={`/couvreur-${c.slug}`} className="font-semibold text-[#17231B] hover:text-[#2F4331] flex items-center gap-2">
                  <MapPin size={16} className="text-[#2F4331]" /> Couvreur {c.name} <span className="font-normal text-[#4B5547]">({c.code})</span>
                </Link>
                <p className="text-sm text-[#4B5547] mt-1">{c.distance}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-[#F5EEDD]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-8">Questions sur nos interventions dans le Pays d'Auge</h2>
          <FAQAccordion items={FAQ} />
        </div>
      </section>
      <CTASection title="Une toiture à faire examiner dans le Pays d'Auge ?" />
    </>
  );
}
