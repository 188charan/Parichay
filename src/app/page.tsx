import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SystemsOptimize } from "@/components/sections/SystemsOptimize";
import { EngineeringJourney } from "@/components/sections/EngineeringJourney";
import { SpenseIntro } from "@/components/sections/SpenseIntro";
import { MigrationCaseStudy } from "@/components/sections/MigrationCaseStudy";
import { IncidentResponse } from "@/components/sections/IncidentResponse";
import { DatabaseOptimization } from "@/components/sections/DatabaseOptimization";
import { PerformanceCaseStudy } from "@/components/sections/PerformanceCaseStudy";
import { PartnerJourney } from "@/components/sections/PartnerJourney";
import { EMICaseStudy } from "@/components/sections/EMICaseStudy";
import { RBACPanel } from "@/components/sections/RBACPanel";
import { BIDashboard } from "@/components/sections/BIDashboard";
import { ProductionImpact } from "@/components/sections/ProductionImpact";
import { Nokia } from "@/components/sections/Nokia";
import { AISystem } from "@/components/sections/AISystem";
import { AadhaarProject } from "@/components/sections/AadhaarProject";
import { AnnamruthaProject } from "@/components/sections/AnnamruthaProject";
import { TechStack } from "@/components/sections/TechStack";
import { DSA } from "@/components/sections/DSA";
import { Philosophy } from "@/components/sections/Philosophy";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { ProgressRail } from "@/components/layout/ProgressRail";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <ProgressRail />
      <main id="main">
        {/* Level 1 & 2 — who I am + headline achievements (in the hero) */}
        <Hero />

        {/* Level 3 — how I engineer */}
        <WhatIDo />
        <SystemsOptimize />
        <EngineeringJourney />

        {/* Level 4 — Spense production systems, one narrative */}
        <SpenseIntro />
        <MigrationCaseStudy />
        <IncidentResponse />
        <DatabaseOptimization />
        <PerformanceCaseStudy />
        <PartnerJourney />
        <EMICaseStudy />
        <RBACPanel />
        <BIDashboard />

        {/* Synthesis */}
        <ProductionImpact />

        {/* Supporting story */}
        <Nokia />
        <AISystem />
        <AadhaarProject />
        <AnnamruthaProject />
        <TechStack />
        <DSA />
        <Philosophy />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
