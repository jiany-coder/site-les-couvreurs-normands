import React from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { COMPANY, telHref, asset } from "../data/company";

// Grande bande photo pleine largeur, avec un message et deux boutons.
export default function PhotoBand({ src = "/toiture-tuiles-rouges.webp", title, text }) {
  return (
    <section className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center" data-testid="photo-band">
      <img src={asset(src)} alt="" aria-hidden="true" width="1920" height="1080" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(22,34,26,0.88) 0%, rgba(22,34,26,0.6) 60%, rgba(22,34,26,0.25) 100%)" }} />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 w-full">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white max-w-2xl mb-5">{title}</h2>
        <p className="text-lg text-white/85 max-w-xl mb-8 leading-relaxed">{text}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-sans font-semibold hover:bg-[#A34209] transition-colors">Devis gratuit <ArrowRight className="w-5 h-5" /></Link>
          <a href={telHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-8 py-4 rounded-full font-sans font-semibold hover:bg-white hover:text-[#2F4331] transition-colors"><Phone className="w-5 h-5" /> {COMPANY.phone}</a>
        </div>
      </div>
    </section>
  );
}
