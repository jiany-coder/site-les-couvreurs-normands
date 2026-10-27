import React from "react";
import { Link } from "react-router-dom";
import { Search, Wrench, FileText, MapPin } from "lucide-react";
import SEO, { buildPageSchema, buildBreadcrumbSchema, buildLocalBusinessSchema, DESCRIPTION } from "../components/SEO";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";
import CTASection from "../components/CTASection";
import StatsBar from "../components/StatsBar";

const VALUES = [
  { Icon: Search, t: "Examen avant devis", d: "Nous regardons la toiture avant de chiffrer, pour que le devis corresponde à la réalité du chantier." },
  { Icon: Wrench, t: "Réparation ciblée", d: "Quand un désordre est localisé et le reste de la couverture sain, nous réparons ce qui est abîmé plutôt que de refaire le toit." },
  { Icon: FileText, t: "Devis gratuit et détaillé", d: "Le devis est gratuit et détaille les travaux, pour que vous puissiez décider en connaissance de cause." },
  { Icon: MapPin, t: "Entreprise de proximité", d: `Basée à Deauville, ${COMPANY.brand} interviennent dans tout le Calvados, sur la côte, dans la plaine et jusqu'au bocage.` },
];

export default function About() {
  const url = `${COMPANY.site}/a-propos`;
  return (
    <>
      <SEO
        title={`À propos | ${COMPANY.brand}, couvreur à Deauville`}
        description={`${COMPANY.brand} : entreprise de couverture basée à Deauville, ${SERVICES.length} prestations de toiture, intervention dans tout le Calvados. Devis gratuit.`}
        canonical={url}
        jsonLd={[
          buildLocalBusinessSchema(),
          buildPageSchema("AboutPage", `À propos de ${COMPANY.brand}`, url, DESCRIPTION),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["À propos", url]]),
        ]}
      />

      <section className="pt-28 pb-20 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 reveal">
            <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-5">À propos</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-[1.1] tracking-tight mb-7">
              {COMPANY.brand}, couvreur à Deauville
            </h1>
            <p className="text-lg text-[#4B5547] leading-relaxed mb-5">{DESCRIPTION}</p>
            <p className="text-lg text-[#4B5547] leading-relaxed">
              L'entreprise traite la couverture, la zinguerie, les gouttières et l'entretien des toits pour les particuliers de Deauville et de ses environs. Chaque intervention commence par l'examen de la toiture et un devis gratuit.
            </p>
          </div>
          <div className="lg:col-span-5 reveal flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#E2D4B3]">
              <img src={COMPANY.logos.main} alt="Logo Les Couvreurs Normands, experts toiture à Deauville" width="512" height="512" className="w-48 h-auto object-contain" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14 reveal">
            <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Notre approche</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#17231B] font-light leading-tight tracking-tight">Comment nous travaillons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ Icon, t, d }) => (
              <div key={t} className="premium-card p-7 reveal">
                <Icon className="w-9 h-9 text-[#2F4331] mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold text-[#17231B] mb-3">{t}</h3>
                <p className="text-sm text-[#4B5547] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 prose-blog">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17231B] font-light leading-tight tracking-tight mb-6">Quels travaux réalise {COMPANY.brand} ?</h2>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="text-lg text-[#4B5547]"><Link to={`/${s.slug}`} className="text-[#2F4331] underline font-semibold">{s.title}</Link> : {s.short}</li>
            ))}
          </ul>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17231B] font-light leading-tight tracking-tight mt-12 mb-6">Où nous trouver ?</h2>
          <p className="text-lg leading-[1.75]">
            {COMPANY.brand} sont installés au {COMPANY.address}. Vous pouvez appeler le {COMPANY.phone} ou demander un devis depuis la <Link to="/contact" className="text-[#2F4331] underline">page contact</Link>.
          </p>
          {COMPANY.social.gbp && COMPANY.rating && (
            <p className="text-lg leading-[1.75]">
              Les avis de nos clients sont publiés sur <a href={COMPANY.social.gbp} target="_blank" rel="noopener noreferrer" className="text-[#2F4331] underline">notre fiche Google</a> : {COMPANY.rating.value}/5 sur {COMPANY.rating.count} avis en {COMPANY.rating.asOf}.
            </p>
          )}
        </div>
      </section>

      <CTASection title="Confiez-nous l'examen de votre toiture" />
    </>
  );
}
