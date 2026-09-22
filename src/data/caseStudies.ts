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
  index: "04",
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
  index: "05",
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
  index: "06",
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
  index: "07",
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
  index: "08",
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

/* ------------------------------------------------------------------ */
/* 8. Database storage optimization (flagship)                         */
/* ------------------------------------------------------------------ */
export const dbOptimization = {
  id: "db-optimization",
  index: "03",
  headline: ["~45% AVERAGE", "PAYLOAD REDUCTION."],
  subtitle:
    "Compressing high-volume log payloads without changing their business meaning.",
  problem:
    "High-volume log tables were consuming significant storage. The work explored migrating JSON/text payload data into compressed LONGBLOB storage using MySQL's COMPRESS(), measuring whether payload compression could materially reduce storage across several high-traffic log categories.",

  /** Headline summary — average across the analyzed tables. */
  summary: {
    avgReduction: "~45%",
    avgLabel: "average logical payload reduction",
    ratio: "~1.8×",
    ratioLabel: "average compression ratio",
  },

  /** Prominent testing-scale stats. */
  scale: [
    { value: "500K", label: "records tested per table" },
    { value: "3", label: "log categories analyzed" },
    { value: "~45%", label: "average payload reduction" },
    { value: "~1.8×", label: "average compression ratio" },
    { value: "~58%", label: "best-case reduction" },
  ],

  /** Per-table before/after (KB) — drives the compression transformation viz.
   *  Categories are anonymized; no partner/vendor names are exposed. */
  tables: [
    {
      id: "cat-a",
      name: "Log Category A",
      original: 7.19,
      compressed: 3.04,
      reduction: "57.71%",
    },
    {
      id: "cat-b",
      name: "Log Category B",
      original: 4.4,
      compressed: 2.66,
      reduction: "~39.5%",
      approx: true,
    },
    {
      id: "cat-c",
      name: "Log Category C",
      original: 3.93,
      compressed: 2.4,
      reduction: "~38.9%",
      approx: true,
    },
  ],

  /** Column-level breakdown for one representative category — the large
   *  response field drove most of the meaningful saving. */
  categoryOneColumns: {
    title: "Where did the savings come from?",
    note: "Reduction was primarily driven by larger response payloads.",
    overheadNote:
      "Very small payloads can see negligible or slightly negative benefit — compression metadata/overhead can offset the savings.",
    columns: [
      { name: "small payload field", original: 0.06, compressed: 0.06, reduction: "-0.29%", negative: true },
      { name: "request body", original: 1.08, compressed: 0.85, reduction: "20.99%" },
      { name: "response payload", original: 3.26, compressed: 1.75, reduction: "46.38%", prominent: true },
    ],
  },

  /** Column-level breakdown for a second representative category. */
  categoryTwoColumns: {
    title: "A second category — column-level breakdown",
    columns: [
      { name: "request payload", original: 0.81, compressed: 0.33, reduction: "59.74%" },
      { name: "request body", original: 1.04, compressed: 0.59, reduction: "43.41%" },
      { name: "response payload", original: 2.08, compressed: 1.48, reduction: "28.73%" },
    ],
  },

  /** Optimization process as a system flow. */
  flow: [
    { label: "High-volume log payloads", emphasis: "start" },
    { label: "Identify storage-heavy JSON/text fields" },
    { label: "Evaluate compression strategy" },
    { label: "Sample 500K records/table" },
    { label: "Compress using MySQL COMPRESS()" },
    { label: "Compare original vs compressed payload" },
    { label: "Measure savings", emphasis: "decision" },
    { label: "Validate trade-offs" },
    { label: "Begin storage optimization rollout", emphasis: "success" },
  ] as FlowStep[],

  /** Storage strategy mini-diagram. */
  strategy: ["JSON / Text Payload", "Compressed LONGBLOB", "MySQL COMPRESS()"],

  /** Engineering insight. */
  insightHeadline: "The important part wasn't just compression.",
  insight: [
    "payload characteristics",
    "compression overhead",
    "column-level behavior",
    "storage trade-offs",
    "high-volume logging patterns",
    "measurement before rollout",
  ],
  insightStatement:
    "Large payloads benefited significantly more from compression than very small payloads, making measurement essential before applying the strategy broadly.",

  /** Subtle technical accuracy note (not visually dominant). */
  disclaimer:
    "Results represent logical payload-size reduction from original/decompressed bytes to compressed bytes. Actual physical database savings may differ depending on indexes, row metadata, page utilization, partitioning, and other storage overhead.",
} as const;

/* ------------------------------------------------------------------ */
/* Spense chapter framing — the production systems as one narrative    */
/* ------------------------------------------------------------------ */
export const spenseSystems = [
  { index: "01", label: "Migration", theme: "Reliability", target: "migration" },
  { index: "02", label: "Observability", theme: "Observability", target: "incident" },
  { index: "03", label: "Storage Optimization", theme: "Infrastructure efficiency", target: "db-optimization" },
  { index: "04", label: "Performance", theme: "Performance", target: "performance" },
  { index: "05", label: "Partner Platform", theme: "Product architecture", target: "partner" },
  { index: "06", label: "Payments / EMI", theme: "Business systems", target: "emi" },
  { index: "07", label: "Access Control", theme: "Security", target: "rbac" },
  { index: "08", label: "Analytics", theme: "Business systems", target: "bi" },
] as const;
