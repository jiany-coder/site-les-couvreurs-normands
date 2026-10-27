import React from "react";
import SEO, { buildPageSchema, buildBreadcrumbSchema } from "../components/SEO";
import { COMPANY, logoUrl } from "../data/company";
import { PHOTOS, HAS_PHOTOS, ILLUSTRATIONS } from "../data/photos";
import CTASection from "../components/CTASection";
import PhotoSlot from "../components/PhotoSlot";

export default function Realisations() {
  const url = `${COMPANY.site}/realisations`;
  return (
    <>
      <SEO
        title={`Réalisations toiture à Deauville | ${COMPANY.shortBrand}`}
        description={`Photos de chantiers de toiture à Deauville et dans le Calvados : réparation, rénovation, démoussage, zinguerie. Devis gratuit. Tél. ${COMPANY.phone}`}
        canonical={url}
        noindex={!HAS_PHOTOS}
        jsonLd={[
          buildPageSchema("CollectionPage", "Réalisations des Couvreurs Normands", url, "Photos de chantiers de toiture à Deauville et dans le Calvados.", HAS_PHOTOS ? {
            mainEntity: { "@type": "ImageGallery", name: "Chantiers de toiture à Deauville", image: PHOTOS.map((p) => ({ "@type": "ImageObject", contentUrl: logoUrl(p.src), description: p.alt })) },
          } : {}),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Réalisations", url]]),
        ]}
      />

      <section className="pt-28 pb-12 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center reveal">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Réalisations</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-[1.1] tracking-tight mb-5">Nos chantiers de toiture à Deauville et dans le Calvados</h1>
          <p className="text-lg text-[#4B5547] max-w-2xl mx-auto">{HAS_PHOTOS ? "Réparation, rénovation, démoussage, zinguerie : des chantiers réels, avec leur commune et leur type de travaux." : "Réparation, rénovation, démoussage, zinguerie : exemples de toitures en images. Les photos de nos propres chantiers arrivent bientôt."}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HAS_PHOTOS
              ? PHOTOS.map((p) => (
                  <figure key={p.src} className="reveal">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    {(p.title || p.desc) && (
                      <figcaption className="mt-3">
                        {p.title && <p className="font-serif text-lg font-semibold text-[#17231B]">{p.title}</p>}
                        {p.desc && <p className="text-sm text-[#4B5547]">{p.desc}</p>}
                      </figcaption>
                    )}
                  </figure>
                ))
              : ILLUSTRATIONS.slice(0, 9).map((p) => (
                  <figure key={p.src} className="reveal">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </figure>
                ))}
          </div>
        </div>
      </section>

      <CTASection title="Et si votre toiture était le prochain chantier ?" />
    </>
  );
}
