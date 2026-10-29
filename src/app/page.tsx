import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { EngineeringJourney } from "@/components/sections/EngineeringJourney";
import { SpenseIntro } from "@/components/sections/SpenseIntro";
import { ProductionImpact } from "@/components/sections/ProductionImpact";
import { SystemsOptimize } from "@/components/sections/SystemsOptimize";
import { SystemEvolution } from "@/components/sections/SystemEvolution";
import { Nokia } from "@/components/sections/Nokia";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { DSA } from "@/components/sections/DSA";
import { Philosophy } from "@/components/sections/Philosophy";
import { About } from "@/components/sections/About";
import { MacroPhotography } from "@/components/sections/MacroPhotography";
import { Treks } from "@/components/sections/Treks";
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
        <EngineeringJourney />

        {/* Level 4 — Spense production systems. The index grid links out to a
            dedicated case-study page per system, keeping the homepage tight. */}
        <SpenseIntro />

        {/* Synthesis — the production numbers at a glance */}
        <ProductionImpact />

        {/* The optimization thesis, then the cinematic philosophy */}
        <SystemsOptimize />
        <SystemEvolution />

        {/* Supporting story */}
        <Nokia />

        {/* Projects — compact previews that open full project pages */}
        <ProjectsShowcase />

        <TechStack />
        <DSA />
        <Philosophy />
        <About />

        {/* Beyond the code — personal passions */}
        <MacroPhotography />
        <Treks />

        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
