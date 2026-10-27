import React from "react";
import { Link } from "react-router-dom";
import SEO, { buildPageSchema, buildBreadcrumbSchema, buildFAQSchema, buildLocalBusinessSchema } from "../components/SEO";
import { COMPANY } from "../data/company";
import { PRICE_GROUPS, PRICE_FACTORS } from "../data/prices";
import { PAGE_UPDATED } from "../data/services";
import CTASection from "../components/CTASection";
import FAQAccordion from "../components/FAQAccordion";

const FAQ = [
  { q: "Combien coûte un couvreur à Deauville ?", a: "Cela dépend du type de travaux : une réparation de fuite coûte en général de 400 à 2 500 €, un démoussage de 25 à 35 € le m² et une couverture neuve de 90 à 200 € le m² selon le matériau, d'après les guides publics cités sur cette page. Le prix exact est donné par un devis gratuit." },
  { q: "Pourquoi les prix varient-ils autant ?", a: "L'accès, la hauteur, la surface, la pente, le matériau, l'état du support et l'évacuation des déchets font varier le prix d'un même type de travaux. Un examen de la toiture est nécessaire pour chiffrer correctement." },
  { q: "Les prix de cette page sont-ils ceux des Couvreurs Normands ?", a: "Non. Ce sont des repères publiés dans des guides de prix français (sources citées sous chaque tableau). Le devis gratuit des Couvreurs Normands donne le prix de votre chantier." },
  { q: "Le devis est-il gratuit ?", a: "Oui. Il est établi après examen de la toiture et détaille les travaux prévus." },
];

export default function Tarifs() {
  const url = `${COMPANY.site}/tarifs-couvreur-deauville`;
  return (
    <>
      <SEO
        title={`Prix d'un couvreur à Deauville : tarifs toiture | ${COMPANY.shortBrand}`.length <= 60 ? `Prix d'un couvreur à Deauville : tarifs toiture | ${COMPANY.shortBrand}` : "Prix d'un couvreur à Deauville : tarifs toiture"}
        description="Repères de prix pour une toiture : réparation de fuite, démoussage, hydrofuge, couverture neuve, gouttières, Velux. Sources citées. Devis gratuit à Deauville."
        canonical={url}
        jsonLd={[
          buildLocalBusinessSchema(),
          buildPageSchema("WebPage", "Prix d'un couvreur à Deauville", url, "Repères de prix des travaux de toiture, avec sources.", { dateModified: PAGE_UPDATED.iso }),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Tarifs", url]]),
          buildFAQSchema(FAQ),
        ]}
      />

      <section className="pt-28 pb-12 bg-[#FBF7EE]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 reveal">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Tarifs</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-[1.1] tracking-tight mb-6">Prix d'un couvreur à Deauville : repères de tarifs pour votre toiture</h1>
          <p className="text-lg text-[#4B5547] leading-relaxed mb-4">
            Une réparation de fuite de toiture coûte en général de 400 à 2 500 €, un démoussage de 25 à 35 € le m², et une couverture neuve fournie et posée de 90 à 200 € le m² selon le matériau. Ces repères viennent de guides publics français ; le devis gratuit de {COMPANY.brand} donne le prix de votre chantier.
          </p>
          <p className="text-sm text-[#4B5547]">Page mise à jour le <time dateTime={PAGE_UPDATED.iso}>{PAGE_UPDATED.label}</time>.</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-14">
          {PRICE_GROUPS.map((g) => (
            <div key={g.title} className="reveal">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-5">{g.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden">
                  <thead><tr className="bg-[#EADFC4] text-[#17231B]"><th className="p-4">Prestation</th><th className="p-4">Repère de prix</th></tr></thead>
                  <tbody>
                    {g.rows.map(([a, b]) => (
                      <tr key={a} className="border-b border-[#E2D4B3]"><td className="p-4">{a}</td><td className="p-4 font-medium text-[#17231B]">{b}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#4B5547] mt-3">Source : {g.source}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#F5EEDD]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-6">Qu'est-ce qui fait varier le prix d'une toiture ?</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRICE_FACTORS.map(([t, d]) => (
              <div key={t} className="bg-white border border-[#E2D4B3] rounded-2xl p-6">
                <dt className="font-serif text-lg font-semibold text-[#17231B] mb-2">{t}</dt>
                <dd className="text-sm text-[#4B5547] leading-relaxed">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[#4B5547] mt-8">Le détail de chaque prestation est sur sa page : <Link to="/reparation-toiture-deauville" className="text-[#2F4331] underline">réparation de toiture</Link>, <Link to="/renovation-toiture-deauville" className="text-[#2F4331] underline">rénovation</Link>, <Link to="/demoussage-toiture-deauville" className="text-[#2F4331] underline">démoussage</Link>, <Link to="/gouttieres-deauville" className="text-[#2F4331] underline">gouttières</Link>.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light tracking-tight mb-8">Questions sur les prix</h2>
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <CTASection title="Obtenez le prix de votre toiture" subtitle="Le devis est gratuit : nous examinons la toiture puis détaillons les travaux poste par poste." />
    </>
  );
}
