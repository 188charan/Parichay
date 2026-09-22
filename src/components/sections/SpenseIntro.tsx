"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { spense, deliveryLifecycle } from "@/data/experience";
import { spenseSystems } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { scrollToId } from "@/lib/lenisInstance";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Chapter opener for the Spense production work. Establishes the "I own the
 * full lifecycle" theme with the BRD -> production sign-off delivery chain and
 * the cross-team stakeholders Charan works with.
 */
export function SpenseIntro() {
  return (
    <section
      id="spense"
      className="section relative overflow-hidden"
      aria-label="Spense production systems"
    >
      {/* Ambient accent glow to mark the start of the most important act */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.14), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          index="04"
          label="Production fintech"
          lines={[spense.headline]}
          gradient
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {spense.intro}
        </motion.p>

        {/* Delivery lifecycle — the full chain Charan owns */}
        <div className="mt-14">
          <p className="eyebrow mb-5">Delivery lifecycle owned end-to-end</p>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
            {deliveryLifecycle.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.05, duration: 0.4, ease: easeOutExpo }}
                className="flex items-center gap-1"
              >
                <span className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-xs text-[var(--color-ink)]">
                  {stage}
                </span>
                {i < deliveryLifecycle.length - 1 && (
                  <span className="text-[var(--color-primary)]" aria-hidden>
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="mt-14">
          <p className="eyebrow mb-5">Working directly with</p>
          <div className="flex flex-wrap gap-3">
            {spense.stakeholders.map((s) => (
              <Tag key={s} tone="primary">
                {s}
              </Tag>
            ))}
          </div>
        </div>

        {/* Production systems index — frames the case studies as one narrative */}
        <div className="mt-20">
          <div className="hairline mb-10" />
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
            Production systems I&rsquo;ve worked on
          </h3>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {spenseSystems.map((sys, i) => (
              <motion.li
                key={sys.target}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.05, duration: 0.45, ease: easeOutExpo }}
              >
                <button
                  onClick={() => scrollToId(sys.target)}
                  className="group flex h-full w-full flex-col gap-3 bg-[var(--color-surface)] p-5 text-left transition-colors hover:bg-[var(--color-elevated)]"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--color-primary)]">
                      {sys.index}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--color-faint)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-primary)]" aria-hidden />
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
                    {sys.label}
                  </span>
                  <span className="mt-auto font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
                    {sys.theme}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
