import React from "react";
import { COMPANY } from "../data/company";
import { CITIES } from "../data/cities";
import { SERVICES } from "../data/services";

export default function StatsBar() {
  const stats = [
    ...(COMPANY.rating ? [{ value: `${COMPANY.rating.value}/5`, label: "Note Google", sub: `${COMPANY.rating.count} avis clients, relevés en ${COMPANY.rating.asOf}` }] : []),
    { value: String(CITIES.length), label: "Communes desservies", sub: "Deauville et tout le Calvados" },
    { value: String(SERVICES.length), label: "Prestations de couverture", sub: "Réparation, rénovation, entretien" },
    { value: "0 €", label: "Devis", sub: "Gratuit, après examen de la toiture" },
  ];
  return (
    <section className="py-16 sm:py-20 bg-[#2F4331] text-[#FBF7EE]" data-testid="stats-bar">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-left">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-[#EADFC4]/30 pl-5 reveal">
              <p className="font-serif text-4xl md:text-5xl font-light leading-none text-[#EADFC4]">{s.value}</p>
              <p className="mt-3 font-sans font-semibold text-sm tracking-wide">{s.label}</p>
              <p className="text-xs text-[#FBF7EE]/60 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
