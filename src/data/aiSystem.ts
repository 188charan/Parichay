/**
 * AI Dynamic Form Intelligence System — agents, guardrails, architecture.
 */

export const aiSystem = {
  headline: ["BUILDING AI THAT", "ACTUALLY DOES SOMETHING."],
  name: "AI Dynamic Form Intelligence System",
  problem: "Banking PDFs are difficult to process manually.",
  summary:
    "The system reads a banking PDF, automatically identifies fields, extracts and validates them, presents an editable web form, and writes answers back onto the original PDF.",
  pipeline: [
    "PDF",
    "GPT-4 Vision",
    "Parallel AI Agents",
    "Field Extraction",
    "Validation",
    "Editable Web Form",
    "Write Answers Back to PDF",
  ],
} as const;

export interface Agent {
  id: string;
  name: string;
  role: string;
}

export const agents: Agent[] = [
  { id: "text", name: "TEXT AGENT", role: "Extract text fields" },
  {
    id: "checkbox",
    name: "CHECKBOX AGENT",
    role: "Extract checkbox / radio fields",
  },
  {
    id: "date-sign",
    name: "DATE + SIGNATURE AGENT",
    role: "Identify dates and signatures",
  },
  { id: "validator", name: "VALIDATOR AGENT", role: "Validate and clean results" },
];

export interface Guardrail {
  title: string;
  detail: string;
}

export const guardrails: Guardrail[] = [
  {
    title: "SHA-256 Caching",
    detail: "Avoid unnecessary repeated AI processing.",
  },
  {
    title: "Confidence Filtering",
    detail: "Reject uncertain results.",
  },
  {
    title: "Levenshtein Deduplication",
    detail: "Reduce duplicate field extraction.",
  },
  {
    title: "HTML Sanitization",
    detail: "Protect generated output.",
  },
  {
    title: "Coordinate-Aware PDF Writing",
    detail: "Write user answers back onto the original PDF using AI-detected coordinates.",
  },
];

export const guardrailsTagline = "AI ENGINEERING ≠ JUST API CALLS.";

/** Full architecture diagram, top to bottom. */
export const aiArchitecture = {
  linear: [
    "User",
    "React Frontend",
    "Node.js Backend",
    "PDF Processing",
    "GPT-4 Vision",
  ],
  agents: ["Text Agent", "Checkbox Agent", "Date/Sign. Agent"],
  postAgents: [
    "Validator",
    "Confidence Filtering",
    "Deduplication",
    "Sanitization",
    "Editable Form",
    "pdf-lib",
    "Original PDF",
  ],
  supporting: ["MongoDB", "SHA-256 Cache"],
} as const;
