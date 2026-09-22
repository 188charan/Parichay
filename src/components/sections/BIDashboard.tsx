"use client";

import { motion } from "motion/react";
import { biDashboard } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

// Relative funnel proportions — conceptual only, no fabricated absolute values.
const funnelWidths = [100, 68, 42];

/**
 * Business intelligence dashboard — a conceptual, interactive-looking preview
 * of the SvelteKit + Chart.js reporting surface. The funnel widths are a
 * conceptual visualization only (no invented business numbers).
 */
export function BIDashboard() {
  return (
    <section
      id="bi"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Business intelligence dashboard case study"
    >
      <div className="container-x">
        <SectionHeading
          index={biDashboard.index}
          label="Case study — Analytics"
          lines={[biDashboard.headline]}
          gradient
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="surface-card overflow-hidden"
          >
            {/* toolbar with filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-line)] px-5 py-4">
              <span className="mr-auto font-mono text-xs text-[var(--color-faint)]">
                analytics · overview
              </span>
              <span className="rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--color-muted)]">
                Tenant ▾
              </span>
              <span className="rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--color-muted)]">
                Last 30d ▾
              </span>
              <span className="flex items-center gap-1.5 rounded-md border border-[rgba(32,201,176,0.3)] bg-[rgba(32,201,176,0.07)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--color-teal-soft)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-teal)]" />
                Live
              </span>
            </div>

            {/* funnel */}
            <div className="p-6">
              <p className="eyebrow mb-6">Conversion funnel</p>
              <div className="flex flex-col gap-4">
                {biDashboard.funnel.map((stage, i) => (
                  <div key={stage} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--color-ink)]">{stage}</span>
                      <span className="font-mono text-xs text-[var(--color-faint)]">
                        stage {i + 1}
                      </span>
                    </div>
                    <div className="h-8 w-full overflow-hidden rounded-lg bg-[var(--color-bg)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${funnelWidths[i]}%` }}
                        viewport={inViewOnce}
                        transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: easeOutExpo }}
                        className="h-full rounded-lg"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-primary), var(--color-teal))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: tech + features + outcome */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2">
              {biDashboard.tech.map((t) => (
                <Tag key={t} tone="primary">
                  {t}
                </Tag>
              ))}
            </div>

            <div>
              <p className="eyebrow mb-4">Capabilities</p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {biDashboard.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inViewOnce}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: easeOutExpo }}
                    className="flex items-center gap-2 text-sm text-[var(--color-ink)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" aria-hidden />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 leading-relaxed text-[var(--color-muted)]">
              {biDashboard.outcome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
