"use client";

import { motion } from "motion/react";
import { migration } from "@/data/caseStudies";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Flagship case study: VISA -> RuPay migration.
 * Largest treatment on the site — a giant outcome statement, the problem, the
 * fault-tolerant pipeline as an animated flow, the identifier-based profile
 * recovery, the three-party coordination, and the zero-downtime result.
 */
export function MigrationCaseStudy() {
  return (
    <section
      id="migration"
      data-tier="flagship"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="VISA to RuPay migration case study"
    >
      <div className="container-x">
        <SectionLabel index={migration.index}>Case study — Migration</SectionLabel>

        {/* Giant outcome statement */}
        <h2 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight">
          {migration.bigStat.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.12 }}
                className={i === 0 ? "block text-[var(--color-ink)]" : "block text-gradient"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-primary-soft)]"
        >
          {migration.subtitle}
        </motion.p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Left: problem + technical context + coordination */}
          <div className="flex flex-col gap-12">
            <div>
              <p className="eyebrow mb-4">The problem</p>
              <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                {migration.problem}
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Engineering context</p>
              <ul className="flex flex-col gap-4">
                {migration.technical.map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={inViewOnce}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: easeOutExpo }}
                    className="flex gap-3 text-[var(--color-ink)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-teal)]" aria-hidden />
                    <span className="leading-relaxed">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <CoordinationTriangle parties={migration.coordination} />
          </div>

          {/* Right: the animated pipeline */}
          <div>
            <p className="eyebrow mb-6">Fault-tolerant migration pipeline</p>
            <div className="surface-card p-6 md:p-8">
              <FlowDiagram nodes={migration.workflow} orientation="vertical" />
            </div>
          </div>
        </div>

        {/* Results band */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {migration.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.1, duration: 0.6, ease: easeOutExpo }}
              className="surface-card flex flex-col gap-2 p-8"
            >
              <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-gradient">
                {r.value}
              </span>
              <span className="text-[var(--color-muted)]">{r.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6 }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {migration.outcome}
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Three-party coordination shown as a connected triangle: M2P <-> Bank <-> Spense.
 */
function CoordinationTriangle({ parties }: { parties: readonly string[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">Cross-team coordination</p>
      <div className="flex flex-wrap items-center gap-3">
        {parties.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ delay: i * 0.12, duration: 0.5, ease: easeOutExpo }}
            className="flex items-center gap-3"
          >
            <span className="rounded-xl border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] px-5 py-3 font-medium text-[var(--color-ink)]">
              {p}
            </span>
            {i < parties.length - 1 && (
              <span className="text-[var(--color-teal)]" aria-hidden>
                ↔
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
