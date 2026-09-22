"use client";

import { motion } from "motion/react";
import { annamrutha } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Annamrutha — food donation & management platform. A smaller, warmer project
 * shown as a donor -> delivery journey.
 */
export function AnnamruthaProject() {
  return (
    <section
      id="annamrutha"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Annamrutha project"
    >
      <div className="container-x">
        <SectionHeading index="11" label="Project — Impact" lines={[annamrutha.title]} />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">{annamrutha.project}.</span>{" "}
          {annamrutha.summary}
        </p>

        {/* Journey */}
        <div className="mt-14">
          <p className="eyebrow mb-6">The journey</p>
          <FlowDiagram
            nodes={annamrutha.journey.map((label, i) => ({
              label,
              emphasis:
                i === 0
                  ? "start"
                  : i === annamrutha.journey.length - 1
                    ? "success"
                    : "process",
            }))}
            orientation="horizontal"
          />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {/* Features */}
          <div>
            <p className="eyebrow mb-4">Features</p>
            <ul className="flex flex-col gap-3">
              {annamrutha.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: easeOutExpo }}
                  className="flex items-center gap-3 text-[var(--color-ink)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" aria-hidden />
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="eyebrow mb-4">Stack</p>
            <div className="flex flex-wrap gap-2">
              {annamrutha.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
