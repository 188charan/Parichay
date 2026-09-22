/**
 * Spense production engineering case studies.
 * Each case study drives an animated section. Flow steps power the shared
 * FlowDiagram primitive. Nothing here is invented beyond the provided spec.
 */

export interface FlowStep {
  label: string;
  /** Optional emphasis for terminal / result nodes. */
  emphasis?: "start" | "process" | "success" | "danger" | "decision";
}

/* ------------------------------------------------------------------ */
/* 1. VISA -> RuPay migration (flagship)                               */
/* ------------------------------------------------------------------ */
export const migration = {
  id: "migration",
  index: "01",
  bigStat: ["10,000 USERS.", "ZERO DOWNTIME."],
  subtitle: "VISA → RuPay Card Migration",
  problem:
    "Approximately 10,000 live VISA cardholders needed to be migrated to RuPay. There was no prior migration tooling or template, and the system had to preserve each user's experience and FD details.",
  workflow: [
    { label: "User consent", emphasis: "start" },
    { label: "Identify user" },
    { label: "Retrieve missing profile information" },
    { label: "Bank API queries" },
    { label: "Block VISA card" },
    { label: "Close existing account" },
    { label: "Provision RuPay card" },
    { label: "Preserve FD details" },
    { label: "Validate migration", emphasis: "success" },
  ] as FlowStep[],
  technical: [
    "User profiles missing from the internal database were retrieved via bank APIs using CIF numbers, entity IDs, and FD account numbers.",
    "M2P supplied the relevant identifiers.",
    "The migration was implemented as a fault-tolerant multi-step cron pipeline.",
  ],
  coordination: ["M2P", "Bank", "Spense"],
  results: [
    { value: "~10,000", label: "Live users migrated" },
    { value: "Zero", label: "Downtime" },
  ],
  outcome:
    "The user experience remained consistent with fresh onboarding throughout the migration.",
} as const;

/* ------------------------------------------------------------------ */
/* 2. Automated incident response                                      */
/* ------------------------------------------------------------------ */
export const incident = {
  id: "incident",
  index: "02",
  headline: ["WHEN PRODUCTION BREAKS,", "THE SYSTEM RESPONDS."],
  tier1: {
    title: "Tier 1 — Automated Detection",
    steps: [
      { label: "Cron job", emphasis: "start" },
      { label: "Mail logs + failures table" },
      { label: "Calculate live API failure rate" },
      { label: "Threshold breached?", emphasis: "decision" },
      { label: "Dispatch logs to POC", emphasis: "success" },
    ] as FlowStep[],
    note: "Default threshold: 10%",
  },
  tier2: {
    title: "Tier 2 — Critical Escalation",
    steps: [
      { label: "Critical DB failure", emphasis: "danger" },
      { label: "Twilio" },
      { label: "Voice call" },
      { label: "5-person on-call rotation", emphasis: "success" },
    ] as FlowStep[],
  },
  outcome: "MTTD → NEAR ZERO",
  summary:
    "An observability and incident-response system: automated detection escalating to critical voice alerts.",
} as const;

/* ------------------------------------------------------------------ */
/* 3. Performance                                                      */
/* ------------------------------------------------------------------ */
export const performance = {
  id: "performance",
  index: "03",
  headline: "30% FASTER.",
  steps: [
    { label: "High-traffic API endpoints", emphasis: "start" },
    { label: "Structured routing" },
    { label: "MySQL query optimization" },
    { label: "Improved API performance" },
    { label: "30% latency reduction", emphasis: "success" },
  ] as FlowStep[],
  /** Relative visual comparison only — no fabricated absolute values. */
  before: 100,
  after: 70,
  note: "Relative comparison. The resume specifies a 30% latency reduction; no absolute millisecond values are claimed.",
} as const;

/* ------------------------------------------------------------------ */
/* 4. Partner onboarding                                               */
/* ------------------------------------------------------------------ */
export const partner = {
  id: "partner",
  index: "04",
  headline: "40% FASTER PARTNER ONBOARDING",
  problem:
    "The previous system relied on hardcoded partner flows. Charan helped build a configuration-driven, multi-tenant journey engine.",
  oldFlow: [
    { label: "Partner", emphasis: "start" },
    { label: "Engineering change" },
    { label: "Deployment" },
    { label: "New journey" },
  ] as FlowStep[],
  newFlow: [
    { label: "Partner", emphasis: "start" },
    { label: "Configuration" },
    { label: "Journey" },
    { label: "Launch", emphasis: "success" },
  ] as FlowStep[],
  result: "40% reduction in partner time-to-launch",
  highlights: [
    "Configuration-driven architecture",
    "Multi-tenancy",
    "Self-service partner journeys",
    "Reduced engineering dependency",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 5. EMI module                                                       */
/* ------------------------------------------------------------------ */
export const emi = {
  id: "emi",
  index: "05",
  headline: "EMI CONVERSION",
  problem: "Built an EMI module for secured credit card transactions.",
  chain: ["User", "Partner", "M2P", "Bank"],
  notes: [
    "The user-facing frontend and backend pipeline were implemented together.",
    "Adoption was tracked using partner analytics.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 6. RBAC admin panel                                                 */
/* ------------------------------------------------------------------ */
export const rbac = {
  id: "rbac",
  index: "06",
  headline: ["ACCESS SHOULD BE DESIGNED,", "NOT ASSUMED."],
  tech: "SvelteKit",
  purpose: ["Partners", "Users", "Sensitive banking data"],
  highlights: [
    "Granular access control",
    "Bank-grade security requirements",
    "Role-based permissions",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 7. BI dashboard                                                     */
/* ------------------------------------------------------------------ */
export const biDashboard = {
  id: "bi",
  index: "07",
  headline: "FROM DATA TO DECISIONS",
  tech: ["SvelteKit", "Chart.js"],
  funnel: ["FD Deposits", "Card Issuance", "EMI Conversion"],
  features: [
    "Tenant filters",
    "Time-range filters",
    "Live tracking",
    "Partner analytics",
    "Internal reporting",
  ],
  outcome:
    "Eliminated manual reporting for bank partners and internal leadership.",
} as const;
