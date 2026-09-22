"use client";

import { motion } from "motion/react";
import { emi } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * EMI conversion module — a four-party transaction chain
 * (User <-> Partner <-> M2P <-> Bank) with a full-stack implementation note.
 */
export function EMICaseStudy() {
  return (
    <section
      id="emi"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="EMI conversion case study"
    >
      <div className="container-x">
        <SectionHeading
          index={emi.index}
          label="Case study — Payments"
          lines={[emi.headline]}
        />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {emi.problem}
        </p>

        {/* Transaction chain — bidirectional links between parties */}
        <div className="mt-16">
          <p className="eyebrow mb-8">Transaction flow</p>
          <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-center md:justify-between">
            {emi.chain.map((party, i) => (
              <div key={party} className="flex flex-col items-center md:flex-1 md:flex-row">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: easeOutExpo }}
                  className="surface-card w-full px-6 py-6 text-center md:w-auto md:flex-1"
                >
                  <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                    {party}
                  </span>
                </motion.div>
                {i < emi.chain.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={inViewOnce}
                    transition={{ delay: i * 0.12 + 0.2 }}
                    className="my-2 text-xl text-[var(--color-teal)] md:mx-4 md:my-0"
                    aria-hidden
                  >
                    <span className="md:hidden">↕</span>
                    <span className="hidden md:inline">↔</span>
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {emi.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.1, duration: 0.5, ease: easeOutExpo }}
              className="flex gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden />
              <p className="leading-relaxed text-[var(--color-ink)]">{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
