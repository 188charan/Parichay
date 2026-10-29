/**
 * "I build systems" — thesis statements revealed on scroll.
 */

export const whatIDoHeadline = "I BUILD SYSTEMS.";

export const whatIDoStatements: string[] = [
  "Production Backends",
  "Fintech Integrations",
  "AI-Powered Systems",
  "Database & Storage Optimization",
  "Performance Engineering",
  "Automation & Observability",
  "Multi-Tenant Architecture",
  "Data-Driven Systems",
];

/**
 * "What I optimize" — concrete before -> after transformations, each tied to a
 * real production outcome and a representative system. The icon/tone fields let
 * the UI differentiate the cards instead of rendering five identical boxes.
 */
export interface Optimization {
  from: string;
  to: string;
  /** Short real-world result shown as a metric chip. */
  note: string;
  /** Which system this maps to (shown as a quiet caption). */
  domain: string;
  /** Icon key resolved in the component. */
  icon: "storage" | "observability" | "config" | "performance" | "analytics";
  tone: "primary" | "teal";
}

export const optimizations: Optimization[] = [
  {
    from: "High-volume logs",
    to: "Compressed payloads",
    note: "~45% payload reduction",
    domain: "Storage optimization",
    icon: "storage",
    tone: "teal",
  },
  {
    from: "Manual monitoring",
    to: "Automated detection",
    note: "MTTD → near-zero",
    domain: "Incident response",
    icon: "observability",
    tone: "primary",
  },
  {
    from: "Hardcoded journeys",
    to: "Configuration-driven journeys",
    note: "40% faster onboarding",
    domain: "Partner platform",
    icon: "config",
    tone: "primary",
  },
  {
    from: "Slow queries",
    to: "Optimized queries",
    note: "30% lower latency",
    domain: "Backend performance",
    icon: "performance",
    tone: "teal",
  },
  {
    from: "Manual reporting",
    to: "Live dashboards",
    note: "Zero manual reports",
    domain: "Business intelligence",
    icon: "analytics",
    tone: "primary",
  },
];
