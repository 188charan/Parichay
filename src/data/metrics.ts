/**
 * Hero engineering metrics — proof points from the resume.
 * Presented as engineering outcomes, not marketing statistics.
 */

export interface Metric {
  /** Numeric target for the animated counter. */
  value: number;
  /** Prefix rendered before the number (e.g. "~"). */
  prefix?: string;
  /** Suffix rendered after the number (e.g. "K+", "%"). */
  suffix?: string;
  /** Short outcome description. */
  label: string;
  /** Whether the counter should format with a thousands separator. */
  separator?: boolean;
}

/**
 * Hero metrics — the four strongest engineering outcomes, kept to four so the
 * first screen stays scannable in ~20-30s. MTTD lives with the incident-
 * response story; the 1,200+ DSA figure lives in the DSA section.
 */
export const metrics: Metric[] = [
  {
    value: 10,
    suffix: "K+",
    label: "Live users migrated",
  },
  {
    value: 45,
    prefix: "~",
    suffix: "%",
    label: "Avg. log payload reduction",
  },
  {
    value: 30,
    suffix: "%",
    label: "API latency reduction",
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster partner onboarding",
  },
];

/**
 * Production Impact synthesis — a wider set shown as a visual summary after the
 * Spense section. Compression figures are labeled as payload reduction, never
 * as physical database-size reduction.
 */
export const productionImpact: Metric[] = [
  { value: 10, suffix: "K+", label: "Live users migrated" },
  { value: 45, prefix: "~", suffix: "%", label: "Average log payload reduction" },
  { value: 58, suffix: "%", label: "Best-case payload reduction" },
  { value: 30, suffix: "%", label: "API latency reduction" },
  { value: 40, suffix: "%", label: "Partner onboarding improvement" },
  { value: 0, prefix: "~", label: "Critical-event MTTD" },
];
