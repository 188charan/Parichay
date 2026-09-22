"use client";

import { motion } from "motion/react";
import { partner } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Partner onboarding — hardcoded flows replaced by a configuration-driven,
 * multi-tenant journey engine. Old vs new flows sit side by side to make the
 * architectural shift obvious.
 */
export function PartnerJourney() {
  return (
    <section
      id="partner"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Partner onboarding case study"
    >
      <div className="container-x">
        <SectionHeading
          index={partner.index}
          label="Case study — Onboarding"
          lines={[partner.headline]}
          gradient
        />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {partner.problem}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Old */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 opacity-80"
          >
            <p className="eyebrow mb-8 text-[var(--color-faint)]">Before — hardcoded</p>
            <FlowDiagram nodes={partner.oldFlow} orientation="vertical" />
          </motion.div>

          {/* New */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ delay: 0.12, duration: 0.6, ease: easeOutExpo }}
            className="surface-card p-8"
          >
            <p className="eyebrow mb-8 text-[var(--color-teal-soft)]">After — configuration-driven</p>
            <FlowDiagram nodes={partner.newFlow} orientation="vertical" />
          </motion.div>
        </div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-12 rounded-2xl border border-[var(--color-line-strong)] bg-[rgba(32,201,176,0.05)] p-8 text-center"
        >
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-teal-soft)] md:text-3xl">
            {partner.result}
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="mt-10 flex flex-wrap gap-3">
          {partner.highlights.map((h) => (
            <Tag key={h} tone="primary">
              {h}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
