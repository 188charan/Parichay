"use client";

import type { ComponentType } from "react";

import { MigrationCaseStudy } from "@/components/sections/MigrationCaseStudy";
import { IncidentResponse } from "@/components/sections/IncidentResponse";
import { DatabaseOptimization } from "@/components/sections/DatabaseOptimization";
import { PerformanceCaseStudy } from "@/components/sections/PerformanceCaseStudy";
import { PartnerJourney } from "@/components/sections/PartnerJourney";
import { EMICaseStudy } from "@/components/sections/EMICaseStudy";
import { RBACPanel } from "@/components/sections/RBACPanel";
import { BIDashboard } from "@/components/sections/BIDashboard";
import { AISystem } from "@/components/sections/AISystem";
import { AadhaarProject } from "@/components/sections/AadhaarProject";
import { AnnamruthaProject } from "@/components/sections/AnnamruthaProject";

/**
 * Maps a detail slug to the full section component it renders. Every section
 * is already self-contained (own heading, visuals, and spacing), so each
 * detail page simply mounts the matching one — nothing is duplicated.
 */
const registry: Record<string, ComponentType> = {
  // Production systems
  migration: MigrationCaseStudy,
  incident: IncidentResponse,
  "db-optimization": DatabaseOptimization,
  performance: PerformanceCaseStudy,
  partner: PartnerJourney,
  emi: EMICaseStudy,
  rbac: RBACPanel,
  bi: BIDashboard,
  // Projects
  ai: AISystem,
  aadhaar: AadhaarProject,
  annamrutha: AnnamruthaProject,
};

export function DetailRenderer({ slug }: { slug: string }) {
  const Section = registry[slug];
  if (!Section) return null;
  return <Section />;
}
