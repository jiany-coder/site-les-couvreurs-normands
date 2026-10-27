import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "../data/company";

export default function PromoBar() {
  const p = COMPANY.promo;
  if (!p || !p.enabled) return null;
  if (p.until && new Date() > new Date(`${p.until}T23:59:59`)) return null;
  return (
    <div className="bg-[#C2500B] text-white text-center text-xs sm:text-sm font-sans font-semibold px-4 py-2" data-testid="promo-bar">
      <Link to="/contact" className="hover:underline">{p.text}</Link>
    </div>
  );
}
