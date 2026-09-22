"use client";

import { motion } from "motion/react";
import { performance } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { SignalTrack } from "@/components/viz/SignalTrack";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Performance case study — 30% latency reduction.
 * The before/after bars are a RELATIVE visual only (100 vs 70); no absolute
 * millisecond values are shown, matching the resume.
 */
export function PerformanceCaseStudy() {
  return (
    <section
      id="performance"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Performance optimization case study"
    >
      <div className="container-x">
        <SectionHeading
          index={performance.index}
          label="Case study — Performance"
          lines={[performance.headline]}
          gradient
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Before / after bars + request→response latency signal */}
          <div className="flex flex-col gap-8">
            <LatencyTrack label="Before" speed={2.8} tone="primary" />
            <LatencyTrack label="After" speed={1.1} tone="teal" />
            <div className="hairline" />
            <Bar label="Before" value={performance.before} max={100} tone="muted" delay={0.1} />
            <Bar label="After" value={performance.after} max={100} tone="teal" delay={0.35} />
            <p className="text-sm leading-relaxed text-[var(--color-faint)]">
              {performance.note}
            </p>
          </div>

          {/* Optimization flow */}
          <div>
            <p className="eyebrow mb-6">Optimization path</p>
            <div className="surface-card p-6 md:p-8">
              <FlowDiagram nodes={performance.steps} orientation="vertical" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Request → Response latency demo. The pulse traverses faster in the optimized
 * ("After") state, communicating reduced latency without any millisecond claim.
 */
function LatencyTrack({
  label,
  speed,
  tone,
}: {
  label: string;
  speed: number;
  tone: "primary" | "teal";
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </span>
      <span className="font-mono text-[0.65rem] text-[var(--color-faint)]">req</span>
      <SignalTrack speed={speed} tone={tone} className="flex-1" />
      <span className="font-mono text-[0.65rem] text-[var(--color-faint)]">res</span>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
  tone,
  delay,
}: {
  label: string;
  value: number;
  max: number;
  tone: "muted" | "teal";
  delay: number;
}) {
  const pct = (value / max) * 100;
  const fill =
    tone === "teal"
      ? "linear-gradient(90deg, var(--color-primary), var(--color-teal))"
      : "rgba(139,149,167,0.35)";

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-muted)]">
          {label}
        </span>
      </div>
      <div className="h-10 w-full overflow-hidden rounded-lg bg-[var(--color-surface)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={inViewOnce}
          transition={{ delay, duration: 1, ease: easeOutExpo }}
          className="h-full rounded-lg"
          style={{ background: fill }}
        />
      </div>
    </div>
  );
}
