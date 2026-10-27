import React from "react";
import { asset } from "../data/company";

// Grande photo de toiture en fond de bandeau, assombrie par un dégradé vert sapin pour garder le texte lisible.
export default function HeroBg({ src = "/hero-toiture.webp", strength = 0.78 }) {
  return (
    <>
      <img src={asset(src)} alt="" aria-hidden="true" width="1920" height="1080" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, rgba(22,34,26,${strength}) 0%, rgba(22,34,26,${strength - 0.12}) 55%, rgba(22,34,26,${Math.max(strength - 0.3, 0.45)}) 100%)` }} />
    </>
  );
}
