import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page introuvable" noindex />
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-32 text-center">
        <div>
          <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#2F4331] mb-4">404</p>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17231B] font-light tracking-tight mb-6">Cette page n'existe pas</h1>
          <p className="text-lg text-[#4B5547] mb-8 max-w-xl mx-auto">Revenez à l'accueil ou appelez-nous pour un devis gratuit de toiture à Deauville.</p>
          <Link to="/" className="inline-flex items-center bg-[#2F4331] text-[#FBF7EE] px-8 py-4 rounded-full font-sans font-semibold hover:bg-[#16221A] transition-colors" data-testid="404-home-link">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </>
  );
}
