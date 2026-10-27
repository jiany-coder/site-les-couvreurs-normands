import React from "react";
import SEO from "../components/SEO";
import { COMPANY, telHref } from "../data/company";

export default function MentionsLegales() {
  return (
    <>
      <SEO
        title={`Mentions légales | ${COMPANY.brand}`}
        description="Mentions légales, informations éditeur, hébergement et coordonnées légales du site Les Couvreurs Normands, couvreur à Deauville."
      />
      <section className="pt-32 pb-24 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12" data-testid="mentions-legales-page">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17231B] font-light tracking-tight mb-10">Mentions légales</h1>
        <div className="prose-blog">
          <p className="text-sm text-[#4B5547]">Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN), il est porté à la connaissance des utilisateurs du site les informations suivantes.</p>

          <h2>Éditeur du site</h2>
          <p>
            <strong>Raison sociale :</strong> {COMPANY.legal.name}<br />
            <strong>Forme juridique :</strong> {COMPANY.legal.form}<br />
            <strong>Enseigne commerciale :</strong> {COMPANY.brand}<br />
            <strong>Adresse du siège :</strong> {COMPANY.address}<br />
            <strong>SIRET :</strong> {COMPANY.legal.siret}<br />
            <strong>Numéro de TVA intracommunautaire :</strong> {COMPANY.legal.tva}<br />
            <strong>Téléphone :</strong> <a href={telHref}>{COMPANY.phone}</a><br />
            {COMPANY.email && <><strong>Email :</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></>}
          </p>

          <h2>Directeur / Responsable de la publication</h2>
          <p>
            <strong>{COMPANY.legal.publisher}</strong>, en qualité de dirigeant de l'entreprise.<br />
            Contact : {COMPANY.email ? <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> : <a href="/contact">page contact</a>}
          </p>

          <h2>Hébergeur du site</h2>
          <p>
            <strong>Cloudflare, Inc.</strong> (Cloudflare Pages)<br />
            101 Townsend St<br />
            San Francisco, CA 94107, États-Unis<br />
            Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">https://www.cloudflare.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des contenus présents sur ce site (textes, structure, images, logos, graphismes, code source, mise en page, base de données) est protégé par les dispositions du Code de la propriété intellectuelle et appartient à {COMPANY.legal.name} ou à ses partenaires. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, sans autorisation écrite préalable de l'éditeur, est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>

          <h2>Protection des données personnelles</h2>
          <p>Le traitement des données personnelles collectées via ce site est détaillé dans notre <a href="/politique-de-confidentialite">Politique de confidentialité</a>. Conformément au Règlement Général sur la Protection des Données (RGPD, UE 2016/679) et à la Loi Informatique et Libertés modifiée, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Pour exercer ces droits : {COMPANY.email ? <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> : <a href="/contact">page contact</a>}.</p>

          <h2>Cookies</h2>
          <p>Ce site n'utilise ni cookies de traçage publicitaire, ni cookies d'analyse tiers, ni outils de mesure d'audience nécessitant votre consentement. Seuls des cookies strictement techniques nécessaires au fonctionnement du site (session, préférences) peuvent être déposés, conformément à l'article 82 de la Loi Informatique et Libertés.</p>

          <h2>Litiges et droit applicable</h2>
          <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, compétence exclusive est attribuée aux tribunaux compétents du ressort de la Cour d'appel de Deauville.</p>

          <h2>Crédits</h2>
          <p>Photographies : chantiers de {COMPANY.brand}. Conception et développement du site : Next Business.</p>

          <p className="text-xs text-[#4B5547] mt-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}.</p>
        </div>
      </section>
    </>
  );
}
