import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { COMPANY, telHref } from "../data/company";
import { SERVICES } from "../data/services";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/couvreur-pays-d-auge", label: "Pays d'Auge" },
  { to: "/zone-d-intervention", label: "Zone d'intervention" },
  { to: "/tarifs-couvreur-deauville", label: "Tarifs" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/blog", label: "Blog" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  React.useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header data-testid="site-header" className="sticky top-0 z-50 h-0">
      <div className="px-3 sm:px-6 pt-3">
        <div className="max-w-7xl mx-auto bg-white rounded-full shadow-xl flex items-center justify-between pl-4 pr-2 sm:pl-6 h-16 sm:h-[72px]">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link" aria-label={COMPANY.brand}>
            <img src={COMPANY.logos.icon} alt="Les Couvreurs Normands Deauville" width="48" height="48" className="h-11 sm:h-12 w-auto object-contain" />
            <span className="hidden md:block font-bold text-[#16221A] tracking-tight leading-tight text-sm">{COMPANY.shortBrand}<span className="block text-[10px] tracking-[0.18em] uppercase text-[#C2500B]">Couvreur à Deauville</span></span>
          </Link>

          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-[#16221A]" data-testid="desktop-nav">
            {LINKS.slice(0, 6).map((l) => (
              <Link key={l.to} to={l.to} className={`hover:text-[#C2500B] ${loc.pathname === l.to ? "text-[#C2500B]" : ""}`}>{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <a href={telHref} className="inline-flex items-center gap-2 text-[#16221A] font-bold text-xs sm:text-sm" data-testid="header-phone">
              <span className="w-2 h-2 rounded-full bg-[#C2500B] animate-pulse" aria-hidden="true" /> {COMPANY.phone}
            </a>
            <Link to="/contact" className="inline-flex items-center gap-1.5 bg-[#C2500B] text-white pl-4 pr-3.5 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-[#A34209] transition-colors" data-testid="header-cta-devis">
              Devis gratuit <ArrowUpRight className="w-4 h-4" strokeWidth={2.25} />
            </Link>
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#16221A]/15 flex items-center justify-center text-[#16221A]" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} data-testid="mobile-menu-toggle">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[-1] bg-[#16221A] text-white overflow-y-auto pt-28 pb-10 px-6" data-testid="mobile-menu">
          <nav className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2500B] mb-4">Navigation</p>
              <ul className="space-y-3 text-2xl font-bold">
                {LINKS.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-[#C2500B]">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2500B] mb-4">Nos services</p>
              <ul className="space-y-2.5 text-base text-white/85">
                {SERVICES.map((s) => <li key={s.slug}><Link to={`/${s.slug}`} className="hover:text-white">{s.title}</Link></li>)}
              </ul>
              <a href={telHref} className="mt-8 inline-flex items-center gap-2 bg-[#C2500B] px-6 py-3 rounded-full font-bold text-sm"><Phone className="w-4 h-4" /> {COMPANY.phone}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
