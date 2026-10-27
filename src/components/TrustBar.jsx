import React from "react";
import { BadgeCheck, MapPin, Radius, Star, Clock, Layers, Award, ShieldCheck, Siren } from "lucide-react";
import { COMPANY } from "../data/company";
import { CITIES } from "../data/cities";
import { SERVICES } from "../data/services";

// Uniquement des éléments vérifiés (fiche Google, données du client). Labels, ancienneté et urgence n'apparaissent que s'ils sont renseignés dans company.js.
export default function TrustBar() {
  const items = [
    { Icon: BadgeCheck, label: "Devis gratuit", desc: "Après examen de la toiture" },
    { Icon: MapPin, label: "Basé à Deauville", desc: COMPANY.address },
    { Icon: Radius, label: "Tout le Calvados", desc: `${CITIES.length} communes desservies` },
    ...(COMPANY.rating ? [{ Icon: Star, label: `${COMPANY.rating.value}/5 sur Google`, desc: `${COMPANY.rating.count} avis clients` }] : []),
    { Icon: Layers, label: `${SERVICES.length} prestations`, desc: "Couverture, zinguerie, gouttières, entretien" },
  ];
  if (COMPANY.labels && COMPANY.labels.length) items.push({ Icon: ShieldCheck, label: COMPANY.labels.join(", "), desc: "Qualifications de l'entreprise" });
  if (COMPANY.decennale) items.push({ Icon: ShieldCheck, label: "Garantie décennale", desc: "Assurance des travaux de couverture" });
  if (COMPANY.experienceYears) items.push({ Icon: Award, label: `${COMPANY.experienceYears} ans d'expérience`, desc: "Métier de la couverture" });
  if (COMPANY.urgence) items.push({ Icon: Siren, label: "Urgences", desc: COMPANY.urgence });

  return (
    <section className="py-14 bg-[#F5EEDD] border-y border-[#E2D4B3]" data-testid="trust-bar">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {items.map(({ Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-start reveal">
              <Icon className="w-8 h-8 text-[#2F4331] mb-3" strokeWidth={1.5} />
              <p className="font-sans font-semibold text-[#17231B] text-sm mb-1">{label}</p>
              <p className="text-xs text-[#4B5547] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
