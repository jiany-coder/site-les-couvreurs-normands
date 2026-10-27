import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";
import PromoBar from "./PromoBar";
import CookieNotice from "./CookieNotice";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.classList.add("reveal-on");
    // Reveal on scroll
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <div className="App">
      <PromoBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieNotice />
    </div>
  );
}
