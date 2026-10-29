/**
 * Metadata for the dedicated detail pages.
 *
 * The homepage shows compact clickable cards (production systems + projects);
 * clicking one navigates to a full page that renders the corresponding
 * in-depth section. This file is the single source of truth for both the
 * preview cards and the dynamic routes ([slug]), and contains only plain data
 * so it can be imported by server components (generateStaticParams / metadata).
 */

export interface DetailMeta {
  /** URL slug — matches the section component id. */
  slug: string;
  /** Display index, e.g. "01". */
  index: string;
  /** Full title used for the page <title> and card heading. */
  title: string;
  /** Short mono label shown above the card title. */
  theme: string;
  /** One-line summary shown on the preview card. */
  blurb: string;
  /** Optional tech tokens shown on project preview cards. */
  stack?: readonly string[];
}

/* ------------------------------------------------------------------ */
/* Production systems (Spense) — one detail page each                  */
/* ------------------------------------------------------------------ */
export const systemDetails: DetailMeta[] = [
  {
    slug: "migration",
    index: "01",
    title: "VISA → RuPay Card Migration",
    theme: "Reliability",
    blurb:
      "Zero-downtime migration of ~10,000 live VISA cardholders to RuPay — as the sole engineer, with no prior tooling.",
  },
  {
    slug: "incident",
    index: "02",
    title: "Automated Incident Response",
    theme: "Observability",
    blurb:
      "A two-tier detection + escalation pipeline (cron email → Twilio voice) that drove MTTD to near-zero.",
  },
  {
    slug: "db-optimization",
    index: "03",
    title: "Storage Optimization",
    theme: "Infrastructure efficiency",
    blurb:
      "~45% average log-payload reduction, measured across 500K records per table before any rollout.",
  },
  {
    slug: "performance",
    index: "04",
    title: "Backend Performance",
    theme: "Performance",
    blurb:
      "30% API latency reduction across high-traffic endpoints via structured routing and MySQL query design.",
  },
  {
    slug: "partner",
    index: "05",
    title: "Partner Journey Builder",
    theme: "Product architecture",
    blurb:
      "A configuration-driven, multi-tenant journey engine — 40% faster partner onboarding, no engineering per launch.",
  },
  {
    slug: "emi",
    index: "06",
    title: "EMI Conversion Module",
    theme: "Business systems",
    blurb:
      "Secured-card EMI conversion integrating M2P across user, partner, and bank, tracked live as a revenue driver.",
  },
  {
    slug: "rbac",
    index: "07",
    title: "RBAC Admin Panel",
    theme: "Security",
    blurb:
      "A granular, bank-grade role-based access-control panel built in SvelteKit for partners, users, and sensitive data.",
  },
  {
    slug: "bi",
    index: "08",
    title: "Business Intelligence Dashboard",
    theme: "Business systems",
    blurb:
      "A live SvelteKit + Chart.js analytics platform tracking the full funnel with per-tenant and time-range filters.",
  },
];

/* ------------------------------------------------------------------ */
/* Standalone projects — one detail page each                          */
/* ------------------------------------------------------------------ */
export const projectDetails: DetailMeta[] = [
  {
    slug: "ai",
    index: "01",
    title: "AI Dynamic Form Intelligence System",
    theme: "AI · Document Intelligence",
    blurb:
      "A GPT-4 Vision 4-agent pipeline that reads any banking PDF, auto-extracts every field, and writes answers back onto the original document.",
    stack: ["Node.js", "TypeScript", "GPT-4 Vision", "pdf-lib", "MongoDB", "React.js"],
  },
  {
    slug: "aadhaar",
    index: "02",
    title: "AI Aadhaar Verification System",
    theme: "AI · Biometrics",
    blurb:
      "Multimodal biometric authentication — 95% face-matching (FaceNet) and 92% voice-matching — for users who can't use fingerprint or retina scans.",
    stack: ["Python", "Flask", "React.js", "TensorFlow", "OpenCV"],
  },
  {
    slug: "annamrutha",
    index: "03",
    title: "Annamrutha — Food Donation Platform",
    theme: "Full Stack · Social Impact",
    blurb:
      "An end-to-end Django platform connecting donors, NGOs, and volunteers with live tracking, receipts, and RBAC authentication.",
    stack: ["Python", "Django", "MySQL", "JavaScript"],
  },
];

export const allDetails: DetailMeta[] = [...systemDetails, ...projectDetails];

export function getSystemDetail(slug: string): DetailMeta | undefined {
  return systemDetails.find((d) => d.slug === slug);
}

export function getProjectDetail(slug: string): DetailMeta | undefined {
  return projectDetails.find((d) => d.slug === slug);
}
