"use client";

import { motion } from "motion/react";
import { about } from "@/data/philosophy";
import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Concise about section — engineering-focused, not a biography. Presents the
 * key facts as a clean spec sheet.
 */
export function About() {
  const rows: Array<[string, string]> = [
    ["Role", about.title],
    ["Location", about.location],
    ["Degree", about.degree],
    ["Institute", about.institute],
    ["Years", about.years],
    ["CGPA", about.cgpa],
  ];

  return (
    <section
      id="about"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="About"
    >
      <div className="container-x">
        <SectionLabel index="15">About</SectionLabel>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--color-ink)] md:text-6xl">
              {about.name}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              {profile.intro}
            </p>
          </div>

          {/* Spec sheet */}
          <dl className="flex flex-col">
            {rows.map(([label, value], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.05, duration: 0.45, ease: easeOutExpo }}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--color-line)] py-4"
              >
                <dt className="eyebrow">{label}</dt>
                <dd className="text-right text-[var(--color-ink)]">{value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
