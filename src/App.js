import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import CityPage from "./pages/CityPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Realisations from "./pages/Realisations";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";
import ZonePage from "./pages/ZonePage";
import Tarifs from "./pages/Tarifs";
import AugePage from "./pages/AugePage";
import ServiceCityPage from "./pages/ServiceCityPage";
import { SERVICE_CITY_PAGES } from "./data/serviceCities";

import { CITIES } from "./data/cities";
import { SERVICES } from "./data/services";

export function AppRoutes() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/zone-d-intervention" element={<ZonePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />

          <Route path="/tarifs-couvreur-deauville" element={<Tarifs />} />
          <Route path="/couvreur-pays-d-auge" element={<AugePage />} />

          {/* Pages services */}
          {SERVICES.map((sv) => (
            <Route key={sv.slug} path={`/${sv.slug}`} element={<ServicePage />} />
          ))}

          {/* Pages communes (70 km autour de Deauville) */}
          {CITIES.map((c) => (
            <Route key={c.slug} path={`/couvreur-${c.slug}`} element={<CityPage />} />
          ))}

          {/* Pages activité × ville (villes principales) */}
          {SERVICE_CITY_PAGES.map((p) => (
            <Route key={p.path} path={p.path} element={<ServiceCityPage />} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
