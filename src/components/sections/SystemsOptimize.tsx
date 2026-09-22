"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { systemsFromTo } from "@/data/whatIDo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignalTrack } from "@/components/viz/SignalTrack";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * "Systems I optimize" — a compact From -> To transformation summary that
 * frames the engineering work before the deep case studies. Each row animates
 * from the "before" state on the left to the "after" state on the right.
 */
export function SystemsOptimize() {
  return (
    <section
      id="systems-optimize"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Systems I optimize"
    >
      <div className="container-x">
        <SectionLabel index="02">What I optimize</SectionLabel>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10">
          {/* FROM column header */}
          <div className="hidden md:block">
            <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--color-faint)]">
              FROM
            </p>
          </div>
          <div className="hidden md:block" aria-hidden />
          <div className="hidden md:block">
            <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-gradient">
              TO
            </p>
          </div>

          {/* Rows */}
          {systemsFromTo.from.map((fromItem, i) => (
            <Row
              key={fromItem}
              from={fromItem}
              to={systemsFromTo.to[i]}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ from, to, delay }: { from: string; to: string; delay: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewOnce}
        transition={{ delay, duration: 0.5, ease: easeOutExpo }}
        className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-[var(--color-muted)] md:col-start-1"
      >
        {from}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={inViewOnce}
        transition={{ delay: delay + 0.15, duration: 0.4 }}
        className="flex items-center justify-center gap-2 py-1 md:col-start-2 md:py-4"
      >
        {/* data traveling across the transformation */}
        <SignalTrack speed={1.8} tone="teal" className="hidden w-10 md:block" />
        <ArrowRight className="h-5 w-5 rotate-90 text-[var(--color-primary)] md:rotate-0" aria-hidden />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewOnce}
        transition={{ delay: delay + 0.2, duration: 0.5, ease: easeOutExpo }}
        className="rounded-xl border border-[var(--color-line-strong)] bg-[rgba(32,201,176,0.05)] px-5 py-4 font-medium text-[var(--color-ink)] md:col-start-3"
      >
        {to}
      </motion.div>
    </>
  );
}
