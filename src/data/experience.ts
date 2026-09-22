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

/** The full delivery lifecycle Charan owns at Spense. */
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
