"use client";

import { motion } from "motion/react";
import { philosophy, narrativeClose } from "@/data/philosophy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Engineering philosophy. Statements reveal one at a time as the reader
 * scrolls, each large and declarative. Closes with the narrative crescendo
 * (I build / optimize / automate / ship / own the system).
 */
export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Engineering philosophy"
    >
      <div className="container-x">
        <SectionLabel index="14">Principles</SectionLabel>

        <ul className="mt-16 flex flex-col">
          {philosophy.map((statement, i) => (
            <motion.li
              key={statement}
              initial={{ opacity: 0.15, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="group flex items-baseline gap-6 border-b border-[var(--color-line)] py-8"
            >
              <span className="font-mono text-sm text-[var(--color-primary)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-gradient">
                {statement}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Narrative crescendo */}
        <div className="mt-24 flex flex-col items-center gap-3 text-center">
          {narrativeClose.map((line, i) => {
            const isLast = i === narrativeClose.length - 1;
            return (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.12, duration: 0.6, ease: easeOutExpo }}
                className={
                  isLast
                    ? "font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-gradient"
                    : "font-[family-name:var(--font-display)] text-[clamp(1.5rem,5vw,3rem)] font-bold leading-[1] tracking-tight text-[var(--color-ink)]"
                }
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
