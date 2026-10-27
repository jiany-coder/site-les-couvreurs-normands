import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ArrowUpRight, Phone, Star, ShieldCheck, MapPin, Clock } from "lucide-react";
import SEO, { buildWebSiteSchema, buildLocalBusinessSchema, buildFAQSchema, DESCRIPTION } from "../components/SEO";
import { COMPANY, telHref } from "../data/company";
import { SERVICES } from "../data/services";
import { CITIES, PRIORITY_CITIES } from "../data/cities";
import { PRICE_GROUPS } from "../data/prices";
import { GLOBAL_FAQ } from "../data/faq";
import { BLOG_POSTS } from "../data/blog_all";
import { PHOTOS, HAS_PHOTOS, SERVICE_IMAGES, PAIRS } from "../data/photos";
import BeforeAfter from "../components/BeforeAfter";
import FAQAccordion from "../components/FAQAccordion";
import ContactForm from "../components/ContactForm";
import HeroBg from "../components/HeroBg";

const eyebrow = "text-xs font-bold tracking-[0.25em] uppercase text-[#C2500B]";
const h2 = "text-inherit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]";

const svc = (slug) => SERVICES.find((s) => s.slug === slug);

const FILTERS = ["Tout voir", "Couverture", "Zinguerie", "Velux", "Étanchéité", "Façade", "Charpente"];
const CHANTIERS = [
  { cat: "Couverture", img: SERVICE_IMAGES["reparation-toiture-deauville"], t: "Réparation de toiture en tuiles", to: "/reparation-toiture-deauville" },
  { cat: "Couverture", img: SERVICE_IMAGES["remplacement-tuiles-ardoises-deauville"], t: "Couverture en ardoises", to: "/remplacement-tuiles-ardoises-deauville" },
  { cat: "Couverture", img: SERVICE_IMAGES["renovation-toiture-deauville"], t: "Rénovation de toiture", to: "/renovation-toiture-deauville" },
  { cat: "Couverture", img: SERVICE_IMAGES["reparation-faitage-deauville"], t: "Réparation de faîtage", to: "/reparation-faitage-deauville" },
  { cat: "Zinguerie", img: SERVICE_IMAGES["couvreur-zingueur-deauville"], t: "Couverture et zinguerie en zinc", to: "/couvreur-zingueur-deauville" },
  { cat: "Zinguerie", img: SERVICE_IMAGES["gouttieres-deauville"], t: "Gouttières zinc", to: "/gouttieres-deauville" },
  { cat: "Démoussage", img: SERVICE_IMAGES["demoussage-toiture-deauville"], t: "Démoussage de toiture", to: "/demoussage-toiture-deauville" },
  { cat: "Démoussage", img: SERVICE_IMAGES["hydrofuge-toiture-deauville"], t: "Traitement hydrofuge", to: "/hydrofuge-toiture-deauville" },
  { cat: "Velux", img: SERVICE_IMAGES["pose-velux-deauville"], t: "Pose de fenêtre de toit", to: "/pose-velux-deauville" },
  { cat: "Étanchéité", img: SERVICE_IMAGES["etancheite-toiture-deauville"], t: "Étanchéité de toiture", to: "/etancheite-toiture-deauville" },
];

const METIERS = [
  { id: "Couverture", intro: "Réparation, rénovation et entretien de tous types de toitures : tuiles, ardoises, faîtage, démoussage, hydrofuge.", slugs: ["reparation-toiture-deauville", "renovation-toiture-deauville", "remplacement-tuiles-ardoises-deauville", "reparation-faitage-deauville", "demoussage-toiture-deauville", "hydrofuge-toiture-deauville"] },
  { id: "Zinguerie", intro: "Solins, noues, rives, abergements, gouttières et descentes : les éléments qui guident l'eau loin des murs.", slugs: ["couvreur-zingueur-deauville", "gouttieres-deauville"] },
  { id: "Étanchéité", intro: "Traitement des points singuliers (raccords, cheminées, jonctions) quand une fuite revient au même endroit.", slugs: ["etancheite-toiture-deauville"] },
  { id: "Charpente", intro: "Contrôle des bois sous la couverture et traitement adapté à leur état : humidité, insectes xylophages.", slugs: ["traitement-charpente-deauville"] },
  { id: "Façade", intro: "Ravalement, peinture extérieure et nettoyage de façade : remise en état des murs, boiseries, volets et ferronneries.", slugs: ["ravalement-facade-deauville", "peinture-exterieure-deauville", "nettoyage-facade-deauville"] },
  { id: "Velux", intro: "Pose ou remplacement de fenêtres de toit, avec reprise soignée de l'étanchéité autour du châssis.", slugs: ["pose-velux-deauville"] },
];

const STEPS = [
  ["Premier contact", `Un appel au ${COMPANY.phone} ou le formulaire, avec quelques photos si possible : nous vous rappelons rapidement.`],
  ["Visite du toit", "Nous examinons la couverture, les raccords et les gouttières pour identifier la cause réelle du problème."],
  ["Devis détaillé", "Vous recevez un devis gratuit, poste par poste, sans engagement, avant de décider."],
  ["Réalisation", "Les travaux sont réalisés selon le devis accepté, avec la méthode adaptée au matériau de votre toiture."],
];

const TRUST = [
  ["Examen avant devis", "Nous regardons la toiture avant de chiffrer, pour que le devis corresponde au chantier réel."],
  ["Devis clair et gratuit", "Le détail des postes, du matériau à la main-d'œuvre, pour décider en connaissance de cause."],
  ["Entreprise de proximité", `Basée à Deauville, ${COMPANY.brand} se déplacent de la Côte Fleurie à tout le Calvados.`],
  ["Réparation ciblée", "Quand le désordre est localisé et le reste sain, nous réparons plutôt que de refaire le toit."],
];

export default function Home() {
  const jsonLd = [buildLocalBusinessSchema(), buildWebSiteSchema(), buildFAQSchema(GLOBAL_FAQ)];
  const [filter, setFilter] = useState("Tout voir");
  const rail = useRef(null);
  const [tab, setTab] = useState("Couverture");
  const items = HAS_PHOTOS
    ? PHOTOS.map((p) => ({ cat: p.cat || "Couverture", img: p, t: p.title || p.alt, to: "/realisations" }))
    : CHANTIERS;
  const shown = items.filter((c) => filter === "Tout voir" || c.cat === filter);
  const scroll = (d) => rail.current && rail.current.scrollBy({ left: d * 340, behavior: "smooth" });
  const metier = METIERS.find((m) => m.id === tab);
  const priceRows = [PRICE_GROUPS[1].rows[0], PRICE_GROUPS[0].rows[0], PRICE_GROUPS[0].rows[1], PRICE_GROUPS[1].rows[1], PRICE_GROUPS[2].rows[2], PRICE_GROUPS[2].rows[3]];

  return (
    <div className="font-sans text-[#16221A]">
      <SEO
        title="Couvreur Deauville et Calvados | Les Couvreurs Normands"
        description={`Couvreur à Deauville et dans tout le Calvados : réparation, rénovation, démoussage de toiture, zinguerie. Devis gratuit. Tél. ${COMPANY.phone}`}
        canonical={`${COMPANY.site}/`}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end bg-[#16221A] overflow-hidden" data-testid="hero-section">
        <HeroBg src="/hero-chantier.webp" strength={0.62} />
        <img src={COMPANY.logos.main} alt="Logo Les Couvreurs Normands, experts toiture à Deauville" width="512" height="512" fetchPriority="high" className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-60 xl:w-72 h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-40 pb-20 w-full">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-white mb-6 inline-block bg-[#C2500B] px-4 py-2 rounded-full">Couvreur à Deauville et dans tout le Calvados</p>
          <h1 className="text-inherit text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-white max-w-4xl mb-7">
            Couvreur à Deauville et dans tout le Calvados : <span className="italic font-medium text-white/80">un toit qui tient</span>
          </h1>
          <p className="text-lg sm:text-xl text-white font-medium max-w-2xl mb-10 leading-relaxed bg-[#16221A]/70 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]">{DESCRIPTION}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#A34209] transition-colors" data-testid="hero-cta-devis">Demander mon devis <ArrowUpRight className="w-5 h-5" /></Link>
            <a href="#services" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">Découvrir nos services</a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85 font-semibold">
            {COMPANY.rating && <li className="inline-flex items-center gap-2"><Star className="w-4 h-4 fill-[#E5671B] text-[#E5671B]" strokeWidth={1} /> {COMPANY.rating.value}/5 · {COMPANY.rating.count} avis Google</li>}
            <li className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Devis gratuit et détaillé</li>
            {COMPANY.decennale && <li className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Garantie décennale</li>}
            {COMPANY.experienceYears && <li className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> {COMPANY.experienceYears} ans d'expérience</li>}
            {COMPANY.hours && <li className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> {COMPANY.hours}</li>}
            <li className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> {CITIES.length + 1} communes desservies</li>
          </ul>
        </div>
      </section>

      {/* CHANTIERS */}
      {HAS_PHOTOS && (
<section className="py-20 sm:py-24 bg-[#16221A] text-white" data-testid="chantiers-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className={`${eyebrow} mb-3`}>{HAS_PHOTOS ? "Nos chantiers" : "Nos toitures en images"}</p>
              <h2 className={h2}>{HAS_PHOTOS ? "Nos dernières toitures" : "Les toitures que nous traitons"}</h2>
            </div>
            <div className="hidden sm:flex gap-3">
              <button onClick={() => scroll(-1)} className="w-12 h-12 rounded-full bg-white text-[#16221A] flex items-center justify-center" aria-label="Précédent"><ArrowLeft className="w-5 h-5" /></button>
              <button onClick={() => scroll(1)} className="w-12 h-12 rounded-full bg-white text-[#16221A] flex items-center justify-center" aria-label="Suivant"><ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${filter === f ? "bg-[#C2500B] border-[#C2500B] text-white" : "border-white/30 text-white hover:bg-white/10"}`}>{f}</button>
            ))}
          </div>
          <div ref={rail} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:mx-0 sm:px-0" style={{ scrollbarWidth: "none" }}>
            {shown.map((c) => (
              <Link key={c.t} to={c.to} className="group snap-start shrink-0 w-[78vw] sm:w-[320px]">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#2F4331]">
                  <img src={c.img.src} alt={c.img.alt} width="1200" height="800" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16221A]/85 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/55 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">{c.cat}</span>
                  <p className="absolute bottom-5 left-5 right-5 font-bold text-lg leading-tight">{c.t}</p>
                </div>
              </Link>
            ))}
          </div>
          {!HAS_PHOTOS && <p className="text-xs text-white/60 mt-4">Images d'illustration : les photos de nos propres chantiers arrivent bientôt.</p>}
          <p className="mt-8"><Link to="/realisations" className="inline-flex items-center gap-2 font-bold text-sm border-b-2 border-[#C2500B] pb-1">Parcourir tous nos chantiers <ArrowRight className="w-4 h-4" /></Link></p>
        </div>
      </section>
)}

      {/* AVANT / APRES */}
      <section className="py-20 sm:py-24 bg-[#FBF7EE]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className={`${eyebrow} mb-3`}>Avant / après</p>
          <h2 className={`${h2} mb-10`}>Des toits remis à neuf</h2>
          <div className="max-w-3xl mx-auto"><BeforeAfter before={PAIRS.renovation.before.src} after={PAIRS.renovation.after.src} /></div>
          <p className="text-[#4B5547] mt-5 text-sm">Rénovation de toiture : avant et après. <Link to="/renovation-toiture-deauville" className="underline text-[#2F4331] font-semibold">En savoir plus sur la rénovation</Link></p>
        </div>
      </section>

      {/* METIERS */}
      <section id="services" className="py-20 sm:py-24 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Nos travaux</p>
          <h2 className={`${h2} mb-4`}>Nos métiers de la toiture</h2>
          <p className="text-lg text-[#4B5547] max-w-2xl mb-10">Avec {COMPANY.brand}, à Deauville : couverture, zinguerie, charpente, Velux et entretien de toiture.</p>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {METIERS.map((m) => (
              <button key={m.id} role="tab" aria-selected={tab === m.id} onClick={() => setTab(m.id)} className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-colors ${tab === m.id ? "bg-[#16221A] border-[#16221A] text-white" : "border-[#16221A]/20 hover:bg-[#FBF7EE]"}`}>{m.id}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-inherit text-2xl font-bold mb-3">{metier.id}</h3>
              <p className="text-[#4B5547] leading-relaxed mb-6">{metier.intro}</p>
              <ul className="space-y-2.5 mb-8">
                {metier.slugs.map((s) => (
                  <li key={s}><Link to={`/${s}`} className="inline-flex items-center gap-2 font-semibold text-[#2F4331] hover:text-[#C2500B]"><ArrowRight className="w-4 h-4 text-[#C2500B]" /> {svc(s).title}</Link></li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#C2500B] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#A34209]">Demander un devis <ArrowUpRight className="w-4 h-4" /></Link>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#2F4331]">
              <img src={SERVICE_IMAGES[metier.slugs[0]].src} alt={SERVICE_IMAGES[metier.slugs[0]].alt} width="1200" height="800" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ETAPES */}
      <section className="py-20 sm:py-24 bg-[#16221A] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Comment nous travaillons</p>
          <h2 className={`${h2} mb-3`}>Votre chantier en 4 étapes</h2>
          <p className="text-white/75 max-w-2xl mb-12">Du premier coup de fil à la réalisation des travaux, vous gardez le même interlocuteur.</p>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-3xl bg-white/[0.06] border border-white/10 p-7">
                <span className="text-5xl font-bold text-[#C2500B]">0{i + 1}</span>
                <h3 className="text-inherit text-xl font-bold mt-4 mb-2">{t}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#A34209]">Lancer mon projet <ArrowUpRight className="w-5 h-5" /></Link>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="py-20 sm:py-24 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Pourquoi nous faire confiance</p>
          <h2 className={`${h2} mb-12`}>Ce qui distingue {COMPANY.shortBrand}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST.map(([t, d], i) => (
              <div key={t} className="bg-white rounded-3xl p-7 border border-[#16221A]/5">
                <span className="text-sm font-bold text-[#C2500B]">0{i + 1}</span>
                <h3 className="text-inherit text-xl font-bold mt-2 mb-2">{t}</h3>
                <p className="text-sm text-[#4B5547] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-20 sm:py-24 bg-white" data-testid="prices-section">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Repères de prix</p>
          <h2 className={`${h2} mb-5`}>Combien coûtent les travaux de toiture ?</h2>
          <p className="text-lg text-[#4B5547] leading-relaxed mb-8">Une réparation de fuite coûte en général de 400 à 2 500 €, un démoussage de 25 à 35 € le m² et une couverture neuve de 90 à 200 € le m² selon le matériau. Ces repères viennent de guides publics, cités sur la page tarifs.</p>
          <div className="overflow-x-auto rounded-2xl border border-[#16221A]/10">
            <table className="w-full text-left border-collapse">
              <thead><tr className="bg-[#16221A] text-white"><th className="p-4">Prestation</th><th className="p-4">Repère de prix</th></tr></thead>
              <tbody>{priceRows.map(([a, b]) => (<tr key={a} className="border-b border-[#16221A]/10"><td className="p-4">{a}</td><td className="p-4 font-bold">{b}</td></tr>))}</tbody>
            </table>
          </div>
          <p className="mt-5"><Link to="/tarifs-couvreur-deauville" className="inline-flex items-center gap-2 text-sm font-bold text-[#C2500B]">Voir tous les repères de prix <ArrowRight className="w-4 h-4" /></Link></p>
        </div>
      </section>

      {/* ZONE */}
      <section className="py-20 sm:py-24 bg-[#16221A] text-white" data-testid="zone-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Zone d'intervention</p>
          <h2 className={`${h2} mb-5 max-w-3xl`}>Deauville, la côte, le Pays d'Auge et tout le Calvados</h2>
          <p className="text-white/80 text-lg max-w-3xl mb-10">Basés à Deauville, nous intervenons dans tout le Calvados : {CITIES.length + 1} communes, de la Côte Fleurie à Vire, en passant par Lisieux, Caen, Bayeux et Falaise. Chaque commune a sa page.</p>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-3">Secteurs prioritaires</p>
          <ul className="flex flex-wrap gap-3 mb-8">
            {PRIORITY_CITIES.map((c) => (
              <li key={c.slug}><Link to={`/couvreur-${c.slug}`} className="inline-block rounded-2xl bg-[#C2500B] px-5 py-3 font-bold text-sm hover:bg-white hover:text-[#C2500B] transition-colors">{c.name}<span className="block text-[11px] font-medium opacity-80">{c.code}</span></Link></li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {CITIES.filter((c) => !c.priority).slice(0, 18).map((c) => (
              <li key={c.slug}><Link to={`/couvreur-${c.slug}`} className="block rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3 text-sm hover:bg-white/15">{c.name}<span className="block text-[11px] text-white/60">{c.code}</span></Link></li>
            ))}
          </ul>
          <p className="text-white/80">Votre commune n'apparaît pas ? <a href={telHref} className="font-bold underline">Appelez-nous</a> · <Link to="/zone-d-intervention" className="font-bold underline">Toutes les communes</Link> · <Link to="/couvreur-pays-d-auge" className="font-bold underline">Couvreur dans le Pays d'Auge</Link></p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 sm:py-24 bg-[#FBF7EE]" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className={`${eyebrow} mb-3`}>Contact</p>
            <h2 className={`${h2} mb-5`}>Parlons de votre toiture</h2>
            <p className="text-lg text-[#4B5547] mb-8">Une fuite au plafond, des tuiles tombées dans le jardin, une toiture à refaire ? Expliquez-nous la situation, nous vous répondons vite.</p>
            <dl className="space-y-5">
              <div><dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2500B]">Téléphone</dt><dd><a href={telHref} className="text-2xl font-bold">{COMPANY.phone}</a></dd></div>
              {COMPANY.hours && <div><dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2500B]">Horaires</dt><dd className="font-semibold">{COMPANY.hours}</dd></div>}
              <div><dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2500B]">Adresse</dt><dd className="font-semibold">{COMPANY.address}</dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="text-inherit text-2xl font-bold mb-6">Votre devis toiture gratuit</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24 bg-white" data-testid="faq-section">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className={`${eyebrow} mb-3`}>Vos questions</p>
          <h2 className={`${h2} mb-10`}>Les réponses à vos questions</h2>
          <FAQAccordion items={GLOBAL_FAQ} />
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 sm:py-24 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div><p className={`${eyebrow} mb-3`}>Conseils</p><h2 className={h2}>Nos conseils et actualités</h2></div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 font-bold text-sm border-b-2 border-[#C2500B] pb-1">Tout voir <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BLOG_POSTS.slice(0, 6).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-white rounded-3xl p-7 border border-[#16221A]/5 hover:shadow-xl transition-shadow">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2500B] mb-3">{p.category}</p>
                <h3 className="text-inherit text-lg font-bold leading-snug mb-3">{p.title}</h3>
                <p className="text-sm text-[#4B5547] leading-relaxed mb-4">{p.excerpt}</p>
                <span className="text-sm font-bold text-[#2F4331]">Lire la suite →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-[#C2500B] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-inherit text-3xl sm:text-5xl font-bold tracking-tight mb-5">Et si vous remettiez votre toiture à neuf cette année ?</h2>
          <p className="text-lg text-white/90 mb-8">Dites-nous ce qui ne va pas sur votre toit : nous passons voir et vous répondons rapidement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-[#C2500B] px-8 py-4 rounded-full font-bold">Demander un devis gratuit <ArrowUpRight className="w-5 h-5" /></Link>
            <a href={telHref} className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-full font-bold"><Phone className="w-5 h-5" /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
