import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ICONS } from "../data/services";
import { SERVICE_IMAGES } from "../data/photos";

export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] || ICONS.House;
  return (
    <Link to={`/${service.slug}`} className="group block premium-card overflow-hidden" data-testid={`service-card-${service.slug}`}>
      <div className="relative h-48 overflow-hidden bg-[#2F4331]">
        {SERVICE_IMAGES[service.slug] && <img src={SERVICE_IMAGES[service.slug].src} alt={SERVICE_IMAGES[service.slug].alt} width="1200" height="800" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16221A]/60 to-transparent" />
        <div className="absolute bottom-0 left-6 translate-y-1/2 w-14 h-14 rounded-full bg-[#C2500B] border-4 border-white flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <div className="p-7 pt-10">
        <h3 className="font-serif text-xl text-[#17231B] font-semibold mb-2 leading-tight">{service.title}</h3>
        <p className="text-sm text-[#4B5547] mb-5 leading-relaxed">{service.short}</p>
        <span className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#2F4331] group-hover:gap-3 transition-all">
          Découvrir <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}
