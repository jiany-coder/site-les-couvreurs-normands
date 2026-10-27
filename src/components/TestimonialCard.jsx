import React from "react";
import { Star } from "lucide-react";

export default function TestimonialCard({ t }) {
  return (
    <article className="premium-card p-8 flex flex-col h-full" data-testid="testimonial-card">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#E5671B] text-[#E5671B]" strokeWidth={1} />
        ))}
      </div>
      <p className="font-serif text-xl leading-snug text-[#17231B] mb-6 flex-1">« {t.text} »</p>
      <div className="flex items-center justify-between pt-4 border-t border-[#E2D4B3]">
        <div>
          <p className="font-sans font-semibold text-[#2F4331] text-sm">{t.name}</p>
          <p className="font-sans text-xs text-[#4B5547]">{t.city}</p>
        </div>
        <p className="text-xs text-[#4B5547]/70 font-sans">{t.date}</p>
      </div>
    </article>
  );
}
