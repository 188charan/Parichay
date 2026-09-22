"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { whatIDoHeadline, whatIDoStatements } from "@/data/whatIDo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientNetwork } from "@/components/viz/AmbientNetwork";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * "I build systems." thesis section.
 * The headline pins visually while each capability statement reveals with a
 * scroll-linked stagger and a leading index + accent tick, reading like a
 * spec list rather than a marketing feature grid.
 */
export function WhatIDo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle horizontal drift of the big headline as the section scrolls through.
  const x = useTransform(scrollYProgress, [0, 1], ["-2%", "6%"]);

  return (
    <section
      id="what-i-do"
      ref={ref}
      className="section relative overflow-hidden"
      aria-label="What I build"
    >
      {/* Ambient system network behind the capabilities */}
      <AmbientNetwork nodeCount={22} seed={13} className="opacity-50" intensity={0.5} />

      <div className="container-x relative">
        <SectionLabel index="01">Thesis</SectionLabel>

        <motion.h2
          style={{ x }}
          className="mt-8 font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.9] tracking-tight text-gradient"
        >
          {whatIDoHeadline}
        </motion.h2>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {whatIDoStatements.map((statement, i) => (
            <motion.li
              key={statement}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.07, duration: 0.55, ease: easeOutExpo }}
              className={cn(
                "group relative flex items-center gap-4 bg-[var(--color-surface)] px-6 py-8",
                "transition-all duration-300 hover:bg-[var(--color-elevated)]",
                "hover:shadow-[inset_0_0_0_1px_rgba(122,168,255,0.25),0_0_30px_-10px_rgba(79,140,255,0.5)]",
              )}
            >
              <span className="font-mono text-xs text-[var(--color-primary)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-medium text-[var(--color-ink)]">
                {statement}
              </span>
              {/* accent edge that lights on hover */}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-teal)] transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
