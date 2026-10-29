"use client";

import { motion } from "motion/react";
import {
  Database,
  Activity,
  SlidersHorizontal,
  Gauge,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { optimizations, type Optimization } from "@/data/whatIDo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignalTrack } from "@/components/viz/SignalTrack";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const iconMap: Record<Optimization["icon"], LucideIcon> = {
  storage: Database,
  observability: Activity,
  config: SlidersHorizontal,
  performance: Gauge,
  analytics: BarChart3,
};

// Bento spans (lg): the flagship storage win is wide; the rest fill two rows.
const spanClass = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

// Distinct entrance per card so they don't all animate identically.
const entrances: Record<string, number>[] = [
  { opacity: 0, x: 0, y: 0, scale: 0.95 },
  { opacity: 0, x: 36, y: 0, scale: 1 },
  { opacity: 0, x: 0, y: 36, scale: 1 },
  { opacity: 0, x: -36, y: 0, scale: 1 },
  { opacity: 0, x: 0, y: 36, scale: 1 },
];

/**
 * "What I optimize" — the optimization thesis made concrete. A bento grid of
 * transformations: each card pairs a slow/manual/bloated "before" with the
 * shipped "after" and the real metric it moved. Cards vary in size, accent,
 * icon, and entrance so the grid reads as a set of distinct wins, not a
 * repeated template.
 */
export function SystemsOptimize() {
  return (
    <section
      id="systems-optimize"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="What I optimize"
    >
      {/* Ambient accent glow */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,176,0.1), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionLabel index="04">What I optimize</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mt-8 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] md:text-6xl"
        >
          I turn bottlenecks into{" "}
          <span className="text-gradient">benchmarks</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ delay: 0.1, duration: 0.6, ease: easeOutExpo }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          Slow, manual, or bloated goes in — fast, automated, and lean comes out.
          Every one of these shipped to production with the numbers to back it.
        </motion.p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {optimizations.map((o, i) => (
            <TransformCard
              key={o.from}
              data={o}
              featured={i === 0}
              spanClass={spanClass[i]}
              entrance={entrances[i]}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformCard({
  data,
  featured,
  spanClass,
  entrance,
  delay,
}: {
  data: Optimization;
  featured: boolean;
  spanClass: string;
  entrance: Record<string, number>;
  delay: number;
}) {
  const Icon = iconMap[data.icon];
  const isTeal = data.tone === "teal";
  const accent = isTeal ? "var(--color-teal)" : "var(--color-primary)";
  const accentSoft = isTeal ? "var(--color-teal-soft)" : "var(--color-primary-soft)";

  return (
    <motion.div
      initial={entrance}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={inViewOnce}
      transition={{ delay, duration: 0.6, ease: easeOutExpo }}
      className={cn(
        "surface-card group relative flex overflow-hidden p-6 transition-all hover:-translate-y-1",
        spanClass,
        featured
          ? "flex-col justify-between border-[rgba(32,201,176,0.28)] md:flex-row md:items-center md:gap-8 md:p-8"
          : "flex-col justify-between",
      )}
      style={{ boxShadow: `inset 0 0 0 0 transparent` }}
    >
      {/* corner glow, colored per card */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        aria-hidden
      />

      <div className={cn("relative flex flex-col gap-4", featured && "md:flex-1")}>
        {/* icon + domain caption */}
        <div className="flex items-center justify-between gap-4">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: isTeal ? "rgba(32,201,176,0.35)" : "var(--color-line-strong)",
              background: isTeal ? "rgba(32,201,176,0.08)" : "rgba(79,140,255,0.06)",
              color: accentSoft,
            }}
          >
            <Icon className={featured ? "h-6 w-6" : "h-5 w-5"} aria-hidden />
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-faint)]">
            {data.domain}
          </span>
        </div>

        {/* before -> after */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-faint)] line-through decoration-[var(--color-line-strong)]">
            {data.from}
          </span>
          <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-faint)] transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>

        <p
          className={cn(
            "font-[family-name:var(--font-display)] font-semibold leading-tight text-[var(--color-ink)]",
            featured ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {data.to}
        </p>
      </div>

      {/* metric chip + accent flow */}
      <div className={cn("relative mt-5 flex flex-col gap-3", featured && "md:mt-0 md:w-48 md:flex-shrink-0")}>
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
          style={{
            borderColor: isTeal ? "rgba(32,201,176,0.3)" : "var(--color-line-strong)",
            color: accentSoft,
            background: isTeal ? "rgba(32,201,176,0.06)" : "rgba(79,140,255,0.06)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden />
          {data.note}
        </span>

        {featured ? (
          <SignalTrack speed={2} pulses={2} tone={data.tone} className="mt-1" />
        ) : (
          // Non-featured cards get a growing underline — a different motion
          // from the featured card's traveling signal.
          <span className="relative mt-1 block h-px w-full overflow-hidden bg-[var(--color-line)]">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewOnce}
              transition={{ delay: delay + 0.3, duration: 0.9, ease: easeOutExpo }}
              className="absolute inset-0 origin-left"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              aria-hidden
            />
          </span>
        )}
      </div>
    </motion.div>
  );
}
