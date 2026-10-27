import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "cs-cookie-notice";

export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true); } catch { setShow(true); }
  }, []);
  if (!show) return null;
  const close = () => { try { localStorage.setItem(KEY, "1"); } catch {} setShow(false); };
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-50 bg-white border border-[#E2D4B3] rounded-2xl shadow-2xl p-5" role="dialog" aria-label="Cookies" data-testid="cookie-notice">
      <p className="text-sm text-[#4B5547] leading-relaxed mb-4">Ce site n'utilise que les cookies nécessaires à son fonctionnement et ne dépose aucun traceur publicitaire. <Link to="/politique-de-confidentialite" className="text-[#2F4331] underline">Politique de confidentialité</Link></p>
      <button onClick={close} className="bg-[#2F4331] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#16221A]">J'ai compris</button>
    </div>
  );
}
