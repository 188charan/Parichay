import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { EngineeringJourney } from "@/components/sections/EngineeringJourney";
import { SpenseIntro } from "@/components/sections/SpenseIntro";
import { MigrationCaseStudy } from "@/components/sections/MigrationCaseStudy";
import { IncidentResponse } from "@/components/sections/IncidentResponse";
import { PerformanceCaseStudy } from "@/components/sections/PerformanceCaseStudy";
import { PartnerJourney } from "@/components/sections/PartnerJourney";
import { EMICaseStudy } from "@/components/sections/EMICaseStudy";
import { RBACPanel } from "@/components/sections/RBACPanel";
import { BIDashboard } from "@/components/sections/BIDashboard";
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
        <Hero />
        <Metrics />
        <WhatIDo />
        <EngineeringJourney />
        <SpenseIntro />
        <MigrationCaseStudy />
        <IncidentResponse />
        <PerformanceCaseStudy />
        <PartnerJourney />
        <EMICaseStudy />
        <RBACPanel />
        <BIDashboard />
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
