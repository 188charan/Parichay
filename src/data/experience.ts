/**
 * Engineering journey timeline + experience details.
 * Education -> Internship -> Production Engineering.
 */

export interface JourneyStop {
  id: string;
  period: string;
  title: string;
  org: string;
  detail?: string;
  kind: "education" | "internship" | "engineering";
}

export const journey: JourneyStop[] = [
  {
    id: "education",
    period: "2021 – 2025",
    title: "B.E. — Information Science & Engineering",
    org: "Siddaganga Institute of Technology",
    detail: "CGPA: 9.03 / 10",
    kind: "education",
  },
  {
    id: "nokia",
    period: "Aug 2024 – Feb 2025",
    title: "Intern — Full Stack Developer",
    org: "Nokia Networks",
    kind: "internship",
  },
  {
    id: "spense",
    period: "Mar 2025 – Present",
    title: "Software Engineer",
    org: "Spense Reliable Fintech Solutions",
    kind: "engineering",
  },
];

/** The full delivery lifecycle Charan owns at Spense (flat list). */
export const deliveryLifecycle: string[] = [
  "BRD",
  "Feasibility",
  "Architecture",
  "Backend",
  "Frontend",
  "Database",
  "QA",
  "UAT",
  "Production",
  "Post-production validation",
];

/**
 * The same lifecycle grouped into the four phases Charan owns end-to-end.
 * Drives the phased lifecycle board in the Spense intro.
 */
export interface DeliveryPhase {
  id: string;
  phase: string;
  caption: string;
  stages: string[];
}

export const deliveryPhases: DeliveryPhase[] = [
  {
    id: "discover",
    phase: "Discover",
    caption: "Understand the requirement",
    stages: ["BRD", "Feasibility", "Architecture"],
  },
  {
    id: "build",
    phase: "Build",
    caption: "Design and implement",
    stages: ["Backend", "Frontend", "Database"],
  },
  {
    id: "validate",
    phase: "Validate",
    caption: "Prove it works",
    stages: ["QA", "UAT"],
  },
  {
    id: "ship",
    phase: "Ship",
    caption: "Release and verify in production",
    stages: ["Production", "Post-production validation"],
  },
];

export const spense = {
  headline: "BUILDING PRODUCTION FINTECH SYSTEMS",
  intro:
    "At Spense, I work across the complete delivery lifecycle — from BRD analysis to production sign-off.",
  stakeholders: ["Bank partners", "M2P engineering", "Clients", "Internal stakeholders"],
} as const;

export const nokia = {
  headline: ["BEFORE FINTECH,", "THERE WAS NETWORK AUTOMATION."],
  org: "Nokia Networks",
  role: "Intern — Full Stack Developer",
  period: "Aug 2024 – Feb 2025",
  stack: ["React.js", "Node.js", "MongoDB", "Chart.js", "Tailwind CSS"],
  contributions: [
    "Improved network automation dashboard report loading speed by 25% through API-level caching and error handling.",
    "Collaborated with Nokia network engineers to map test-execution workflows into structured dashboard views.",
  ],
  metric: { value: 25, suffix: "%", label: "Faster dashboard report loading" },
} as const;
