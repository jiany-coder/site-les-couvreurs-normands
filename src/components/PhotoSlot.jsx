import React from "react";
import { Camera } from "lucide-react";
import RoofPattern from "./RoofPattern";

// Encadré réservé pour une vraie photo de chantier du client (ajoutée plus tard dans src/data/photos.js).
export default function PhotoSlot({ label = "Photo de chantier à ajouter", className = "aspect-[4/3]" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#F5EEDD] border border-dashed border-[#2F4331]/25 flex items-center justify-center ${className}`}
      data-testid="photo-slot"
      role="img"
      aria-label={label}
    >
      <RoofPattern light={false} opacity={0.08} />
      <div className="relative flex flex-col items-center gap-2 text-[#2F4331]/60 px-4 text-center">
        <Camera className="w-7 h-7" strokeWidth={1.5} />
        <span className="text-xs font-sans font-semibold tracking-[0.12em] uppercase">{label}</span>
      </div>
    </div>
  );
}
