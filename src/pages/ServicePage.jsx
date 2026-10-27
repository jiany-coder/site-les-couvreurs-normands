import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import SEO, { buildLocalBusinessSchema, buildFAQSchema, buildServiceSchema, buildBreadcrumbSchema } from "../components/SEO";
import HeroBg from "../components/HeroBg";
import PhotoBand from "../components/PhotoBand";
import { COMPANY, telHref } from "../data/company";
import { SERVICES, getService, ICONS, PRICE_SOURCE, PAGE_UPDATED } from "../data/services";
import { PRIORITY_CITIES } from "../data/cities";
import { svcCityPath, aPrep, svcLabel } from "../data/serviceCities";
import { PHOTOS, HAS_PHOTOS, SERVICE_IMAGES, PAIR_BY_SERVICE, pickIllustrations, seedOf } from "../data/photos";
import BeforeAfter from "../components/BeforeAfter";
import FAQAccordion from "../components/FAQAccordion";
import ContactForm from "../components/ContactForm";
import CTASection from "../components/CTASection";
import RoofPattern from "../components/RoofPattern";
import PhotoSlot from "../components/PhotoSlot";
import ServiceCard from "../components/ServiceCard";

export default function ServicePage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "").replace(/\/$/, "");
  const service = getService(slug);
  if (!service) return <Navigate to="/" replace />;

  const Icon = ICONS[service.icon] || ICONS.House;
  const url = `${COMPANY.site}/${slug}`;
  const related = service.related.map(getService).filter(Boolean);
  const pair = PAIR_BY_SERVICE[service.slug];
  const feature = SERVICE_IMAGES[service.slug];
  const photos = [feature, ...pickIllustrations(4, seedOf(service.slug) + 1).filter((x) => x !== feature)].filter(Boolean).slice(0, 3);

  const jsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema(service, url),
    buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], [service.title, url]]),
    buildFAQSchema(service.faq),
  ];

  return (
    <>
      <SEO title={service.metaTitle} description={service.metaDescription} canonical={url} jsonLd={jsonLd} />

      {/* HERO */}
      <section className="relative bg-[#16221A] overflow-hidden" data-testid="service-hero">
        <HeroBg src="/toiture-ardoise.webp" strength={0.82} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-20 w-full">
          <nav aria-label="Fil d'Ariane" className="text-sm text-[#EADFC4]/80 font-sans">
            <Link to="/" className="hover:text-[#EADFC4]">Accueil</Link> <span aria-hidden="true">/</span> <span>{service.title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#EADFC4]/12 backdrop-blur-md border border-[#EADFC4]/30 px-4 py-2 rounded-full mt-6 mb-6">
            <Icon className="w-4 h-4 text-[#EADFC4]" strokeWidth={1.75} />
            <span className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#EADFC4]">{COMPANY.shortBrand} · Deauville</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-[#FBF7EE] max-w-4xl">{service.h1}</h1>
          <p className="text-lg sm:text-xl text-white font-medium max-w-3xl mt-7 leading-relaxed bg-[#16221A]/70 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]" data-testid="service-answer">{service.answer}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-sans font-semibold text-base transition-all hover:bg-[#A34209] hover:-translate-y-1 hover:shadow-xl"
              data-testid="service-hero-cta"
            >
              Devis gratuit <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
            </Link>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-[#FBF7EE] px-8 py-4 rounded-full font-sans font-semibold text-base border-2 border-[#EADFC4]/40 transition-all hover:bg-[#EADFC4] hover:text-[#2F4331]"
            >
              <Phone className="w-5 h-5" strokeWidth={1.75} /> {COMPANY.phone}
            </a>
          </div>
          <p className="text-xs text-[#FBF7EE]/60 mt-8 font-sans">Page mise à jour le <time dateTime={PAGE_UPDATED.iso}>{PAGE_UPDATED.label}</time></p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 sm:py-20 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Notre intervention</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light leading-tight tracking-tight">
              Ce que comprend notre prestation : {service.title.toLowerCase()}
            </h2>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {service.benefits.map((b) => (
              <div key={b} className="bg-white border border-[#E2D4B3] p-6 rounded-2xl flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#2F4331] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-[#17231B] font-sans font-medium leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 prose-blog">
          {service.sections.map((s) => (
            <article key={s.h} className="mb-12 reveal">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-4 leading-tight">{s.h}</h2>
              <p className="text-lg text-[#4B5547] leading-[1.75]">{s.p}</p>
            </article>
          ))}

          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold tracking-tight mb-4 leading-tight">{service.table.caption}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-[#EADFC4] text-[#17231B]"><th className="p-4">Prestation</th><th className="p-4">Repère de prix</th></tr>
              </thead>
              <tbody>
                {service.table.rows.map(([a, b]) => (
                  <tr key={a} className="border-b border-[#E2D4B3]"><td className="p-4">{a}</td><td className="p-4 font-medium text-[#17231B]">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#4B5547] mt-3">{service.priceSource || PRICE_SOURCE} <Link to="/tarifs-couvreur-deauville" className="text-[#2F4331] underline">Voir tous les repères de prix</Link></p>
        </div>
      </section>

      {/* PHOTOS */}
      {photos.length > 0 && (
<section className="py-16 bg-[#F5EEDD]" data-testid="service-photos">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-8">{HAS_PHOTOS ? `Nos chantiers : ${service.title.toLowerCase()}` : `${service.title} : exemples de toitures`}</h2>
          {pair ? (
            <div className="mb-6 max-w-3xl mx-auto"><BeforeAfter before={pair.before.src} after={pair.after.src} /><p className="text-sm text-[#4B5547] mt-3 text-center">{pair.title} : faites glisser pour comparer.</p></div>
          ) : feature && !HAS_PHOTOS ? (
            <div className="relative overflow-hidden rounded-3xl aspect-[21/9] mb-6">
              <img src={feature.src} alt={feature.alt} width="1200" height="800" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {photos.map((p) => (
              <div key={p.src} className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {!HAS_PHOTOS && <p className="text-xs text-[#4B5547] mt-4">Images d'illustration : les photos de nos chantiers arrivent bientôt.</p>}
        </div>
      </section>
)}

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Questions fréquentes</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17231B] font-light leading-tight tracking-tight mb-8">
            Vos questions sur : {service.title.toLowerCase()}
          </h2>
          <FAQAccordion items={service.faq} />
        </div>
      </section>

      {/* RELATED + ZONE */}
      <section className="py-20 bg-[#F5EEDD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-8">À lire aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-4">{service.title.replace(" à Deauville", "")} près de chez vous</h2>
          <p className="text-[#4B5547] mb-5">{COMPANY.brand} interviennent dans tout le Calvados. Retrouvez la page de votre commune :</p>
          <ul className="flex flex-wrap gap-3">
            {PRIORITY_CITIES.map((c) => (
              <li key={c.slug}><Link to={svcCityPath(service, c)} className="inline-block rounded-full bg-white border border-[#E2D4B3] px-4 py-2 text-sm text-[#17231B] hover:border-[#2F4331] hover:text-[#2F4331]">{svcLabel(service)} {aPrep(c.name)}</Link></li>
            ))}
            <li><Link to="/zone-d-intervention" className="inline-block rounded-full bg-[#2F4331] px-4 py-2 text-sm text-[#FBF7EE]">Toutes les communes</Link></li>
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-light leading-tight tracking-tight mb-3">Demander un devis gratuit</h2>
          <p className="text-[#4B5547] mb-8">Décrivez la situation : nous examinons la toiture et vous remettons un devis gratuit.</p>
          <div className="premium-card p-6 sm:p-8"><ContactForm defaultService={service.title} /></div>
        </div>
      </section>

      <PhotoBand src="/toiture-tuiles-rouges.webp" title={`${service.title} : on s'en occupe`} text="Examen de la toiture, devis gratuit et détaillé, intervention dans un rayon de 30 km autour de Deauville." />
      <CTASection />
    </>
  );
}
