"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { spense, deliveryPhases, type DeliveryPhase } from "@/data/experience";
import { spenseSystems } from "@/data/caseStudies";
import { getSystemDetail } from "@/data/detailPages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { SignalTrack } from "@/components/viz/SignalTrack";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Chapter opener for the Spense production work. Establishes the "I own the
 * full lifecycle" theme with a phased delivery board (BRD -> production
 * sign-off), the cross-team stakeholders, and a grid of production systems —
 * each card links to a dedicated case-study page.
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

        {/* Delivery lifecycle — a phased board, owned end-to-end */}
        <DeliveryLifecycle />

        {/* Stakeholders */}
        <div className="mt-16">
          <p className="eyebrow mb-5">Working directly with</p>
          <div className="flex flex-wrap gap-3">
            {spense.stakeholders.map((s) => (
              <Tag key={s} tone="primary">
                {s}
              </Tag>
            ))}
          </div>
        </div>

        {/* Production systems index — each links to its own case-study page */}
        <div className="mt-20">
          <div className="hairline mb-12" />
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[var(--color-primary-soft)]">The production work</p>
            <h3 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-5xl md:text-6xl">
              Production systems I&rsquo;ve shipped
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
              Eight systems, live in production. Open any one for the full case study.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {spenseSystems.map((sys, i) => {
              const detail = getSystemDetail(sys.target);
              return (
                <motion.li
                  key={sys.target}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: easeOutExpo }}
                >
                  <Link
                    href={`/systems/${sys.target}`}
                    className="surface-card group flex h-full flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-line-strong)]"
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
                    {detail && (
                      <span className="text-xs leading-snug text-[var(--color-muted)]">
                        {detail.blurb}
                      </span>
                    )}
                    <span className="mt-auto flex items-center gap-2 pt-2">
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-faint)]">
                        {sys.theme}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Phased delivery lifecycle board. Four phases (Discover -> Build -> Validate
 * -> Ship) sit across a connecting rail; each phase stacks its stages as
 * numbered chips. A signal pulses along the rail to convey forward motion.
 */
function DeliveryLifecycle() {
  // Running start index per phase so stage numbers read 01..10 across phases,
  // computed without mutation (prefix sum of prior phases' stage counts).
  const startNumbers = deliveryPhases.reduce<number[]>((acc, phase, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + deliveryPhases[i - 1].stages.length);
    return acc;
  }, []);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="eyebrow">Delivery lifecycle · owned end-to-end</p>
        <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
          BRD → Production sign-off
        </p>
      </div>

      {/* The rail with a traveling signal, aligned above the phase columns */}
      <div className="mt-6 hidden items-center gap-3 md:flex">
        <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" aria-hidden />
        <SignalTrack speed={4.5} pulses={2} tone="teal" className="flex-1" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-teal)]" aria-hidden />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {deliveryPhases.map((phase, p) => (
          <PhaseColumn key={phase.id} phase={phase} order={p} startNo={startNumbers[p]} />
        ))}
      </div>
    </div>
  );
}

function PhaseColumn({
  phase,
  order,
  startNo,
}: {
  phase: DeliveryPhase;
  order: number;
  startNo: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ delay: order * 0.12, duration: 0.6, ease: easeOutExpo }}
      className="surface-card relative overflow-hidden p-6"
    >
      {/* Phase accent header */}
      <div className="flex items-baseline justify-between">
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
          {phase.phase}
        </span>
        <span
          className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-line-strong)]"
          aria-hidden
        >
          0{order + 1}
        </span>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)]">{phase.caption}</p>

      {/* gradient phase underline */}
      <div
        className="mt-4 h-0.5 w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-primary), var(--color-teal))",
          opacity: 0.5,
        }}
        aria-hidden
      />

      <ul className="mt-5 flex flex-col gap-2.5">
        {phase.stages.map((stage, i) => (
          <motion.li
            key={stage}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewOnce}
            transition={{
              delay: order * 0.12 + i * 0.07,
              duration: 0.4,
              ease: easeOutExpo,
            }}
            className="group flex items-center gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 transition-colors hover:border-[var(--color-line-strong)]"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] font-mono text-[0.6rem] text-[var(--color-primary-soft)]">
              {String(startNo + i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-[var(--color-ink)]">{stage}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
