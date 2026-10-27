import React, { useRef, useState } from "react";
import { Move } from "lucide-react";

export default function BeforeAfter({ before, after, labelBefore = "Avant", labelAfter = "Après", className = "" }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const update = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-[2rem] overflow-hidden select-none aspect-[4/3] bg-[#17231B] ${className}`}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => dragging.current && update(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
      data-testid="before-after-slider"
    >
      <img loading="lazy" decoding="async" src={after} alt={labelAfter} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img loading="lazy" decoding="async" src={before} alt={labelBefore} className="absolute inset-0 h-full object-cover" style={{ width: `${ref.current?.getBoundingClientRect().width || 0}px` }} />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#EADFC4] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EADFC4] flex items-center justify-center cmp-handle">
          <Move className="w-5 h-5 text-[#2F4331]" strokeWidth={1.75} />
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-[#17231B]/75 backdrop-blur text-[#EADFC4] px-3 py-1.5 rounded-full text-xs font-sans font-semibold tracking-[0.18em] uppercase">{labelBefore}</span>
      <span className="absolute top-4 right-4 bg-[#EADFC4]/95 text-[#2F4331] px-3 py-1.5 rounded-full text-xs font-sans font-semibold tracking-[0.18em] uppercase">{labelAfter}</span>
    </div>
  );
}
