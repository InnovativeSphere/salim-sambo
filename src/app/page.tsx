// ============================================================
// src/app/page.tsx
// Home page — complete assembly
// ============================================================

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Demo from "@/components/sections/Demo";
import CaseStudies from "@/components/sections/CaseStudies";
import AlsoAvailable from "@/components/sections/AlsoAvailable";
import CrossStackPills from "@/components/sections/CrossStackPills";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Demo />
        <CaseStudies />
        <AlsoAvailable />
        <CrossStackPills />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}