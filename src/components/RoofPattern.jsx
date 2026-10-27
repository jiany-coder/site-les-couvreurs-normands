import React from "react";

// Motif de tuiles inspiré du logo, utilisé comme fond (aucune fausse photo de chantier).
export default function RoofPattern({ className = "", opacity = 0.12, light = true }) {
  const stroke = light ? "#EADFC4" : "#2F4331";
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <pattern id={`roof-${light ? "l" : "d"}`} width="72" height="48" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)">
          <path d="M0 0H72M0 24H72M0 48H72" stroke={stroke} strokeWidth="1.5" fill="none" />
          <path d="M18 0V24M54 0V24M0 24V48M36 24V48M72 24V48" stroke={stroke} strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#roof-${light ? "l" : "d"})`} />
    </svg>
  );
}
