"use client";

import { motion } from "motion/react";
import { metrics } from "@/data/metrics";
import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Engineering outcomes as animated counters. Presented as proof points, not
 * marketing statistics — mono labels, hairline separators, restrained accents.
 */
export function Metrics() {
  return (
    <section id="metrics" className="section" aria-label="Engineering outcomes">
      <div className="container-x">
        <SectionLabel index="00">Engineering outcomes</SectionLabel>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.08, duration: 0.6, ease: easeOutExpo }}
              className="flex flex-col gap-3"
            >
              <div className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
                <Counter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  separator={m.separator}
                />
              </div>
              <div className="h-px w-8 bg-[var(--color-line-strong)]" aria-hidden />
              <p className="text-sm leading-snug text-[var(--color-muted)]">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
