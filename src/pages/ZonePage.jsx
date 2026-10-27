import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import SEO, { buildPageSchema, buildBreadcrumbSchema, buildLocalBusinessSchema } from "../components/SEO";
import { COMPANY } from "../data/company";
import { CITIES, PRIORITY_CITIES } from "../data/cities";
import CTASection from "../components/CTASection";

const ORDER = ["littoral normand", "Pays d'Auge et alentours", "agglomération caennaise", "plaine de Caen", "bocage normand", "sud du Calvados", "campagne calvadosienne"];
const INTRO = {
  "littoral normand": "Deauville, notre base, et toute la côte : Côte Fleurie, côte de Nacre, plages du Débarquement. Toitures exposées aux embruns et au vent.",
  "Pays d'Auge et alentours": "Pont-l'Évêque, Lisieux, Cambremer, Orbec, Livarot, Vimoutiers : le Pays d'Auge, proche de Deauville.",
  "agglomération caennaise": "Caen et les communes de son agglomération.",
  "plaine de Caen": "Les bourgs et villages de la plaine autour de Caen.",
  "bocage normand": "Bayeux, Vire, Villers-Bocage et le bocage : grandes toitures, pierre et ardoise.",
  "sud du Calvados": "Falaise et le sud du Calvados, jusqu'à Thury-Harcourt-le-Hom.",
  "campagne calvadosienne": "Bourgs et villages des autres secteurs du Calvados.",
};

export default function ZonePage() {
  const all = [{ slug: "deauville", name: "Deauville", code: "14800", sector: "littoral normand", home: true }, ...CITIES];
  const groups = ORDER.map((s) => ({ s, list: all.filter((c) => c.sector === s) })).filter((g) => g.list.length);
  const url = `${COMPANY.site}/zone-d-intervention`;
  return (
    <>
      <SEO
        title={`Zone d'intervention couvreur Deauville | ${COMPANY.shortBrand}`}
        description={`Couvreur à Deauville et dans ${all.length - 1} communes du Calvados : liste complète avec codes postaux. Devis gratuit.`}
        canonical={url}
        jsonLd={[
          buildLocalBusinessSchema(),
          buildPageSchema("CollectionPage", "Zone d'intervention des Couvreurs Normands", url, `Communes desservies par ${COMPANY.brand}, dans tout le Calvados, depuis Deauville.`),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Zone d'intervention", url]]),
        ]}
      />
      <section className="pt-28 pb-16 bg-[#FBF7EE]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-5">Zone d'intervention</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-tight tracking-tight mb-6">
            Couvreur à Deauville et dans tout le Calvados
          </h1>
          <p className="text-lg text-[#4B5547] leading-relaxed mb-4">
            {COMPANY.brand} sont basés à Deauville, au {COMPANY.address}, et intervient dans les {all.length} communes situées dans tout le Calvados. Cette page les recense avec leur code postal et renvoie vers la page de chaque commune.
          </p>
          <p className="text-lg text-[#4B5547] leading-relaxed">
            Votre commune n'apparaît pas ou se trouve juste au-delà du rayon ? Appelez le {COMPANY.phone} : nous vous indiquons si le déplacement est possible.
          </p>
        </div>
      </section>

      <section className="pb-12 bg-[#FBF7EE]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-5">Nos secteurs prioritaires</h2>
          <ul className="flex flex-wrap gap-3">
            {PRIORITY_CITIES.map((c) => (
              <li key={c.slug}><Link to={`/couvreur-${c.slug}`} className="inline-block rounded-full bg-[#2F4331] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#C2500B] transition-colors">Couvreur {c.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 bg-[#FBF7EE]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          {groups.map(({ s, list }) => (
            <div key={s}>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-2 capitalize">{s}</h2>
              <p className="text-[#4B5547] mb-5">{INTRO[s]}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {list.map((c) => (
                  <li key={c.slug} className="rounded-xl border border-[#2F4331]/10 bg-white p-4">
                    <Link to={c.home ? "/" : `/couvreur-${c.slug}`} className="font-semibold text-[#17231B] hover:text-[#2F4331] flex items-center gap-2">
                      <MapPin size={16} className="text-[#2F4331]" /> Couvreur {c.name} <span className="font-normal text-[#4B5547]">({c.code})</span>
                    </Link>
                    {c.distance && <p className="text-sm text-[#4B5547] mt-1">{c.distance}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
