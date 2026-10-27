import React from "react";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import SEO, { buildLocalBusinessSchema, buildPageSchema, buildBreadcrumbSchema } from "../components/SEO";
import { COMPANY, telHref } from "../data/company";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const url = `${COMPANY.site}/contact`;
  const rows = [
    { Icon: Phone, label: "Téléphone", node: <a href={telHref} className="text-lg font-serif text-[#17231B] hover:text-[#2F4331]" data-testid="contact-phone-link">{COMPANY.phone}</a> },
    ...(COMPANY.email ? [{ Icon: Mail, label: "E-mail", node: <a href={`mailto:${COMPANY.email}`} className="text-lg font-serif text-[#17231B] hover:text-[#2F4331] break-all">{COMPANY.email}</a> }] : []),
    { Icon: MapPin, label: "Adresse", node: <p className="text-lg font-serif text-[#17231B]">{COMPANY.address}</p> },
    ...(COMPANY.hours ? [{ Icon: Clock, label: "Horaires", node: <p className="text-lg font-serif text-[#17231B]">{COMPANY.hours}</p> }] : []),
  ];
  return (
    <>
      <SEO
        title={`Devis gratuit couvreur Deauville | ${COMPANY.shortBrand}`}
        description={`Demandez un devis gratuit pour une réparation, une rénovation ou un entretien de toiture à Deauville et dans tout le Calvados. Tél. ${COMPANY.phone}`}
        canonical={url}
        jsonLd={[
          buildLocalBusinessSchema(),
          buildPageSchema("ContactPage", `Contacter ${COMPANY.brand}`, url, "Coordonnées et formulaire de demande de devis gratuit."),
          buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Contact", url]]),
        ]}
      />

      <section className="pt-28 pb-14 bg-[#FBF7EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 reveal">
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">Contact</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-[1.1] tracking-tight max-w-4xl">Demander un devis gratuit à un couvreur de Deauville</h1>
          <p className="text-lg text-[#4B5547] max-w-2xl mt-6">Décrivez le problème ou le projet : nous examinons la toiture puis vous remettons un devis gratuit. Vous pouvez aussi appeler directement.</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <div className="premium-card p-8 mb-6">
              <h2 className="font-serif text-2xl font-semibold text-[#17231B] mb-6">Nos coordonnées</h2>
              <ul className="space-y-5">
                {rows.map(({ Icon, label, node }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#EADFC4] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2F4331]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#2F4331] mb-1">{label}</p>
                      {node}
                    </div>
                  </li>
                ))}
              </ul>
              {COMPANY.social.gbp && <a href={COMPANY.social.gbp} target="_blank" rel="noopener noreferrer" className="mt-7 w-full inline-flex items-center justify-center gap-2 border-2 border-[#2F4331] text-[#2F4331] px-6 py-3.5 rounded-full font-sans font-semibold text-sm hover:bg-[#2F4331] hover:text-[#FBF7EE] transition-colors">
                Voir notre fiche Google <ExternalLink className="w-4 h-4" />
              </a>}
            </div>
            <div className="premium-card p-8">
              <h2 className="font-serif text-xl font-semibold text-[#17231B] mb-4">Zone d'intervention</h2>
              <p className="text-sm text-[#4B5547] leading-relaxed">
                {COMPANY.brand} interviennent à Deauville et dans tout le Calvados : Trouville-sur-Mer, Honfleur, Cabourg, Pont-l'Évêque, Lisieux, Caen, Bayeux, Vire et toutes les communes du département.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="premium-card p-8 sm:p-10">
              <h2 className="font-serif text-2xl font-semibold text-[#17231B] mb-2">Votre demande de devis</h2>
              <p className="text-sm text-[#4B5547] mb-6">Les champs marqués d'une étoile sont obligatoires.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
