"use client";

import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { StepsSection } from "./components/StepsSection";
import { TemplatesSection } from "./components/TemplatesSection";

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Header />
      <HeroSection />
      <TemplatesSection />
      <FeaturesSection />
      <StepsSection />
      <Footer />
    </div>
  );
}
