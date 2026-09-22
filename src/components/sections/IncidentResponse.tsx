"use client";

import { motion } from "motion/react";
import { incident } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Automated incident response — a two-tier observability system.
 * Tier 1 (automated detection) and Tier 2 (critical escalation) sit side by
 * side as animated flows; the shared outcome (MTTD -> near zero) closes it.
 */
export function IncidentResponse() {
  return (
    <section
      id="incident"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Automated incident response case study"
    >
      <div className="container-x">
        <SectionHeading
          index={incident.index}
          label="Case study — Observability"
          lines={incident.headline}
        />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {incident.summary}
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Tier 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="surface-card flex flex-col p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" aria-hidden />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                {incident.tier1.title}
              </h3>
            </div>
            <div className="mt-8">
              <FlowDiagram nodes={incident.tier1.steps} orientation="vertical" />
            </div>
            <p className="mt-8 inline-flex w-fit items-center rounded-md border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] px-3 py-1.5 font-mono text-sm text-[var(--color-primary-soft)]">
              {incident.tier1.note}
            </p>
          </motion.div>

          {/* Tier 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ delay: 0.12, duration: 0.6, ease: easeOutExpo }}
            className="surface-card flex flex-col p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-danger)]" aria-hidden />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                {incident.tier2.title}
              </h3>
            </div>
            <div className="mt-8">
              <FlowDiagram nodes={incident.tier2.steps} orientation="vertical" />
            </div>
          </motion.div>
        </div>

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="eyebrow">Outcome</p>
          <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tight text-gradient">
            {incident.outcome}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
