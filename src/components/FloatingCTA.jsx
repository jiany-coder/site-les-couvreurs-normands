import React from "react";
import { Phone } from "lucide-react";
import { telHref } from "../data/company";

export default function FloatingCTA() {
  return (
    <div className="fixed right-4 bottom-4 z-40" data-testid="floating-cta">
      <a href={telHref} className="w-14 h-14 rounded-full bg-[#C2500B] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" aria-label="Appeler Les Couvreurs Normands" data-testid="floating-phone">
        <Phone className="w-6 h-6 text-white" strokeWidth={2} />
      </a>
    </div>
  );
}
