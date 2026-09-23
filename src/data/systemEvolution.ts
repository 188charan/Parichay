/**
 * "From Complexity to Clarity" — the black-hole optimization engine.
 *
 * The section's metaphor: an engineering optimization engine consumes friction
 * (bottlenecks, risk, inefficiency) from a messy system and outputs a cleaner,
 * optimized system. Each problem pairs with the improved state it becomes.
 */

export type ProblemTone = "warn" | "danger" | "primary";

export interface EvolutionPair {
  id: string;
  problem: string;
  /** How the problem's particle stream reads. */
  problemBehavior: string;
  output: string;
  /** Restrained warm tone only for latency/vulnerability; blue for the rest. */
  tone: ProblemTone;
}

export const evolutionPairs: EvolutionPair[] = [
  {
    id: "latency",
    problem: "High latency",
    problemBehavior: "slow, heavy particles",
    output: "Faster performance",
    tone: "warn",
  },
  {
    id: "security",
    problem: "Vulnerabilities",
    problemBehavior: "unstable warning particles",
    output: "Stronger security",
    tone: "danger",
  },
  {
    id: "queries",
    problem: "Inefficient queries",
    problemBehavior: "tangled data paths",
    output: "Optimized queries",
    tone: "primary",
  },
  {
    id: "manual",
    problem: "Manual processes",
    problemBehavior: "repeating circular paths",
    output: "Automated workflows",
    tone: "primary",
  },
  {
    id: "storage",
    problem: "Unoptimized storage",
    problemBehavior: "dense data blocks",
    output: "Efficient storage",
    tone: "primary",
  },
  {
    id: "config",
    problem: "Fragmented configuration",
    problemBehavior: "disconnected nodes",
    output: "Unified configuration",
    tone: "primary",
  },
];

export const systemEvolutionCopy = {
  eyebrow: "System evolution",
  heading: ["FROM COMPLEXITY", "TO CLARITY"],
  supporting:
    "I turn messy, inefficient systems into optimized, safer, and scalable platforms.",
  frictionLine: "I don't just build features. I remove friction.",
  coreLabel: "Consuming bottlenecks",
  bridge: ["Less friction", "More impact"],
  closing: ["I don't just build systems.", "I make them better."],
} as const;

/**
 * Restrained metrics strip — established portfolio figures only. The black hole
 * does NOT claim these; they are separate examples of engineering impact.
 * Compression is always "average payload reduction", never DB size / disk.
 */
export const evolutionMetrics = [
  { value: "~45%", label: "Average payload reduction" },
  { value: "30%", label: "Faster API performance" },
  { value: "40%", label: "Faster partner onboarding" },
  { value: "10K+", label: "Users migrated" },
] as const;
