import React from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import SEO, { buildPageSchema, buildBreadcrumbSchema } from "../components/SEO";
import { COMPANY } from "../data/company";
import { BLOG_POSTS } from "../data/blog_all";

export default function Blog() {
    return (
    <>
      <SEO
        title="Blog toiture à Deauville : conseils de couvreur"
        description="Guides pratiques d'un couvreur de Deauville : démoussage, fuites, prix, règles. Repères sourcés pour les propriétaires du Calvados."
        canonical={`${COMPANY.site}/blog`}
        jsonLd={[
          buildPageSchema("CollectionPage", "Blog toiture à Deauville", `${COMPANY.site}/blog`, "Guides pratiques sur la toiture à Deauville et dans le Calvados.", {
            mainEntity: { "@type": "ItemList", itemListElement: BLOG_POSTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${COMPANY.site}/blog/${p.slug}`, name: p.title })) },
          }),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Blog", COMPANY.site + "/blog"]]),
        ]}
      />
      <section className="pt-32 pb-12 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center reveal">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Notre blog</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#17231B] font-light leading-[1] tracking-tight mb-5">
            Conseils toiture à Deauville et dans le Calvados
          </h1>
          <p className="text-lg text-[#4B5547] max-w-2xl mx-auto">Des guides courts, avec des prix et des règles sourcés, pour décider avant de faire poser un échafaudage.</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group block premium-card p-8 reveal" data-testid={`blog-card-${p.slug}`}>
                <div className="flex items-center gap-3 text-xs font-sans text-[#4B5547] mb-3">
                  <span className="font-semibold tracking-[0.18em] uppercase text-[#2F4331]">{p.category}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" /> {p.readTime}
                </div>
                <h2 className="font-serif text-2xl text-[#17231B] leading-tight mb-3 group-hover:text-[#2F4331] transition-colors">{p.title}</h2>
                <p className="text-sm text-[#4B5547] leading-relaxed mb-4">{p.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#2F4331]">Lire l'article <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
