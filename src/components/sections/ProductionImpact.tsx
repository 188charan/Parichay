"use client";

import { motion } from "motion/react";
import { productionImpact } from "@/data/metrics";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Production Impact — a concise visual synthesis after the Spense section.
 * Pure numbers, no paragraphs. Compression figures are labeled as payload
 * reduction (never physical DB size) for accuracy.
 */
export function ProductionImpact() {
  return (
    <section
      id="impact"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Production impact summary"
    >
      {/* Ambient glow to mark the synthesis */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,176,0.10), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading label="Synthesis" lines={["PRODUCTION IMPACT"]} gradient />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {productionImpact.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.07, duration: 0.6, ease: easeOutExpo }}
              className="flex flex-col gap-3"
            >
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
                <Counter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  separator={m.separator}
                />
              </div>
              <div className="h-px w-8 bg-[var(--color-line-strong)]" aria-hidden />
              <p className="text-sm leading-snug text-[var(--color-muted)]">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
