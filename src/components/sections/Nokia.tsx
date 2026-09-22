"use client";

import { motion } from "motion/react";
import { nokia } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Counter } from "@/components/ui/Counter";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Nokia internship — the pre-fintech chapter. Network automation dashboard
 * work, framed as the origin of the systems mindset.
 */
export function Nokia() {
  return (
    <section
      id="nokia"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Nokia Networks experience"
    >
      <div className="container-x">
        <SectionHeading index="08" label="Before fintech" lines={nokia.headline} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          {/* Left: role + stack + contributions */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                {nokia.org}
              </p>
              <p className="mt-1 text-[var(--color-muted)]">{nokia.role}</p>
              <p className="mt-1 font-mono text-sm text-[var(--color-primary-soft)]">
                {nokia.period}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {nokia.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <ul className="flex flex-col gap-4">
              {nokia.contributions.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: easeOutExpo }}
                  className="flex gap-3 leading-relaxed text-[var(--color-ink)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: headline metric */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="surface-card flex flex-col items-center justify-center gap-3 p-12 text-center"
          >
            <span className="font-[family-name:var(--font-display)] text-7xl font-bold text-gradient md:text-8xl">
              <Counter value={nokia.metric.value} suffix={nokia.metric.suffix} />
            </span>
            <span className="max-w-[16rem] text-[var(--color-muted)]">
              {nokia.metric.label}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
