import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { SERVICES } from "../data/services";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export default function ContactForm({ defaultService = "", defaultCity = "" }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: defaultCity, service: defaultService, message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      setDone(true);
      toast.success("Demande envoyée ! Nous vous recontactons rapidement.");
      setForm({ name: "", email: "", phone: "", city: "", service: "", message: "" });
      setTimeout(() => setDone(false), 8000);
    } catch (err) {
      toast.error(err?.response?.data?.detail?.[0]?.msg || "Une erreur est survenue. Réessayez ou appelez-nous directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Nom complet *</label>
          <input
            required name="name" value={form.name} onChange={onChange}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition"
            data-testid="contact-input-name"
          />
        </div>
        <div>
          <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Téléphone *</label>
          <input
            required name="phone" value={form.phone} onChange={onChange} type="tel"
            placeholder="06 12 34 56 78"
            className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition"
            data-testid="contact-input-phone"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Email *</label>
        <input
          required name="email" value={form.email} onChange={onChange} type="email"
          placeholder="vous@email.com"
          className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition"
          data-testid="contact-input-email"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Ville</label>
          <input
            name="city" value={form.city} onChange={onChange}
            placeholder="Deauville, Trouville-sur-Mer, Honfleur..."
            className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition"
            data-testid="contact-input-city"
          />
        </div>
        <div>
          <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Service souhaité</label>
          <select
            name="service" value={form.service} onChange={onChange}
            className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition appearance-none"
            data-testid="contact-input-service"
          >
            <option value="">Sélectionnez un service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Autre">Autre / Plusieurs travaux</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#2F4331] mb-2">Votre demande *</label>
        <textarea
          required name="message" value={form.message} onChange={onChange}
          rows={5}
          placeholder="Décrivez le problème ou le projet : fuite, tuiles cassées, mousse, gouttière, rénovation..."
          className="w-full px-4 py-3.5 rounded-xl bg-[#FBF7EE] border border-[#E2D4B3] focus:outline-none focus:border-[#2F4331] focus:ring-2 focus:ring-[#2F4331]/20 transition resize-none"
          data-testid="contact-input-message"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-8 py-4 rounded-full font-sans font-semibold text-base transition-all duration-300 hover:bg-[#16221A] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        data-testid="contact-submit"
      >
        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</> : <><Send className="w-5 h-5" /> Recevoir mon devis gratuit</>}
      </button>

      <p className="text-xs text-[#4B5547]/80 text-center">Devis gratuit après examen de la toiture.</p>
    </form>
  );
}
