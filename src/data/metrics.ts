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

export const metrics: Metric[] = [
  {
    value: 10,
    suffix: "K+",
    label: "Live cardholders migrated",
  },
  {
    value: 0,
    prefix: "~",
    label: "MTTD for critical production incidents",
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
  {
    value: 1200,
    suffix: "+",
    separator: true,
    label: "DSA problems solved",
  },
];
