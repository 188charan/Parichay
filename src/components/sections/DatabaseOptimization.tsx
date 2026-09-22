"use client";

import { motion } from "motion/react";
import { Database, HardDrive, ArrowDown } from "lucide-react";
import { dbOptimization as db } from "@/data/caseStudies";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * Database storage optimization — FLAGSHIP.
 *
 * The signature moment is the compression transformation: for each table, the
 * original payload bar fills first, then visibly compresses down into the
 * smaller compressed bar, so the animation *communicates* compression rather
 * than just printing a percentage. Blue = original/transform, teal = saving.
 *
 * All figures are labeled as logical payload reduction, never physical DB size.
 */
export function DatabaseOptimization() {
  return (
    <section
      id="db-optimization"
      data-tier="flagship"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Database storage optimization case study"
    >
      {/* Ambient glow — flagship weight */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.13), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionLabel index={db.index}>Case study — Storage optimization</SectionLabel>

        {/* Giant headline */}
        <h2 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight">
          {db.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.12 }}
                className={i === 0 ? "block text-[var(--color-ink)]" : "block text-gradient"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {db.subtitle}
        </motion.p>

        {/* Average summary — the headline result at a glance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ delay: 0.4, duration: 0.6, ease: easeOutExpo }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <div className="surface-card flex items-baseline gap-3 px-6 py-4">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-gradient">
              {db.summary.avgReduction}
            </span>
            <span className="text-sm text-[var(--color-muted)]">{db.summary.avgLabel}</span>
          </div>
          <div className="surface-card flex items-baseline gap-3 px-6 py-4">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-teal-soft)]">
              {db.summary.ratio}
            </span>
            <span className="text-sm text-[var(--color-muted)]">{db.summary.ratioLabel}</span>
          </div>
        </motion.div>

        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--color-muted)]">
          {db.problem}
        </p>

        {/* Testing scale */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[var(--color-line)] py-10 md:grid-cols-5">
          {db.scale.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.07, duration: 0.5, ease: easeOutExpo }}
              className="flex flex-col gap-2"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-ink)] md:text-4xl">
                {s.value}
              </span>
              <span className="text-xs leading-snug text-[var(--color-muted)]">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Compression transformation — the signature viz */}
        <div className="mt-16">
          <p className="eyebrow mb-8">Logical payload compression per category</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {db.tables.map((t, i) => (
              <CompressionCard
                key={t.id}
                name={t.name}
                original={t.original}
                compressed={t.compressed}
                reduction={t.reduction}
                approx={"approx" in t && t.approx === true}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>

        {/* Column-level stories */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <ColumnBreakdown
            title={db.categoryOneColumns.title}
            columns={db.categoryOneColumns.columns}
            note={db.categoryOneColumns.note}
            overheadNote={db.categoryOneColumns.overheadNote}
          />
          <ColumnBreakdown
            title={db.categoryTwoColumns.title}
            columns={db.categoryTwoColumns.columns}
          />
        </div>

        {/* Engineering flow + storage strategy */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div>
            <p className="eyebrow mb-6">Optimization process</p>
            <div className="surface-card p-6 md:p-8">
              <FlowDiagram nodes={db.flow} orientation="vertical" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Storage strategy */}
            <div className="surface-card p-6">
              <p className="eyebrow mb-6">Storage strategy</p>
              <div className="flex flex-col gap-3">
                {db.strategy.map((s, i) => (
                  <div key={s} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-lg border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] px-4 py-3">
                      {i === 0 ? (
                        <Database className="h-4 w-4 text-[var(--color-primary-soft)]" aria-hidden />
                      ) : i === db.strategy.length - 1 ? (
                        <HardDrive className="h-4 w-4 text-[var(--color-teal-soft)]" aria-hidden />
                      ) : (
                        <HardDrive className="h-4 w-4 text-[var(--color-primary-soft)]" aria-hidden />
                      )}
                      <span className="font-mono text-sm text-[var(--color-ink)]">{s}</span>
                    </div>
                    {i < db.strategy.length - 1 && (
                      <ArrowDown className="mx-auto h-4 w-4 text-[var(--color-faint)]" aria-hidden />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engineering insight */}
        <div className="mt-16">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            {db.insightHeadline}
          </h3>
          <p className="mt-4 text-[var(--color-muted)]">It was understanding:</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {db.insight.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-ink)]"
              >
                {item}
              </span>
            ))}
          </div>
          <blockquote className="mt-8 border-l-2 border-[var(--color-primary)] pl-6 text-lg leading-relaxed text-[var(--color-ink)]">
            {db.insightStatement}
          </blockquote>
        </div>

        {/* Subtle accuracy disclaimer */}
        <p className="mt-10 max-w-3xl font-mono text-xs leading-relaxed text-[var(--color-faint)]">
          {db.disclaimer}
        </p>
      </div>
    </section>
  );
}

/**
 * A single table's compression: the original bar fills, then compresses down
 * to the compressed width; the saving is revealed after.
 */
function CompressionCard({
  name,
  original,
  compressed,
  reduction,
  approx,
  delay,
}: {
  name: string;
  original: number;
  compressed: number;
  reduction: string;
  approx: boolean;
  delay: number;
}) {
  const compressedPct = (compressed / original) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
      className="surface-card flex flex-col gap-5 p-6"
    >
      <div className="flex items-baseline justify-between">
        <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
          {name}
        </h4>
        <span className="font-mono text-xs text-[var(--color-faint)]">
          {approx ? "~" : ""}
          {original} KB → {approx ? "~" : ""}
          {compressed} KB
        </span>
      </div>

      {/* Original bar (fills, then shrinks to compressed width) */}
      <div>
        <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
          original
        </p>
        <div className="h-6 w-full overflow-hidden rounded-md bg-[var(--color-bg)]">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: ["0%", "100%", `${compressedPct}%`] }}
            viewport={inViewOnce}
            transition={{
              delay: delay + 0.2,
              duration: 1.8,
              times: [0, 0.5, 1],
              ease: easeOutExpo,
            }}
            className="h-full rounded-md"
            style={{ background: "rgba(122,168,255,0.4)" }}
          />
        </div>
      </div>

      {/* Compressed bar (grows to compressed width) */}
      <div>
        <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-teal-soft)]">
          compressed
        </p>
        <div className="h-6 w-full overflow-hidden rounded-md bg-[var(--color-bg)]">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: `${compressedPct}%` }}
            viewport={inViewOnce}
            transition={{ delay: delay + 1.6, duration: 0.8, ease: easeOutExpo }}
            className="h-full rounded-md"
            style={{
              background: "linear-gradient(90deg, var(--color-primary), var(--color-teal))",
            }}
          />
        </div>
      </div>

      {/* Saving */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ delay: delay + 2, duration: 0.5 }}
        className="mt-1 flex items-baseline gap-2"
      >
        <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-gradient">
          {reduction}
        </span>
        <span className="text-sm text-[var(--color-muted)]">saved</span>
      </motion.div>
    </motion.div>
  );
}

interface Col {
  name: string;
  original: number;
  compressed: number;
  reduction: string;
  negative?: boolean;
  prominent?: boolean;
}

/**
 * Column-level breakdown as an animated bar comparison. Prominent columns are
 * emphasized; negative/near-zero results are shown honestly (not hidden).
 */
function ColumnBreakdown({
  title,
  columns,
  note,
  overheadNote,
}: {
  title: string;
  columns: readonly Col[];
  note?: string;
  overheadNote?: string;
}) {
  const max = Math.max(...columns.map((c) => c.original));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="surface-card p-8"
    >
      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
        {title}
      </h4>

      <div className="mt-6 flex flex-col gap-6">
        {columns.map((c, i) => (
          <div
            key={c.name}
            className={cn(
              "rounded-lg p-3 transition-colors",
              c.prominent && "bg-[rgba(32,201,176,0.05)] ring-1 ring-[rgba(32,201,176,0.25)]",
            )}
          >
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  "font-mono text-sm",
                  c.prominent ? "text-[var(--color-teal-soft)]" : "text-[var(--color-ink)]",
                )}
              >
                {c.name}
              </span>
              <span
                className={cn(
                  "font-[family-name:var(--font-display)] text-lg font-bold",
                  c.negative ? "text-[var(--color-warn)]" : "text-[var(--color-primary-soft)]",
                )}
              >
                {c.reduction}
              </span>
            </div>
            {/* stacked bars: original (faint) vs compressed (accent) */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${(c.original / max) * 100}%`, background: "rgba(122,168,255,0.22)" }}
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(c.compressed / max) * 100}%` }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.1, duration: 0.9, ease: easeOutExpo }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: c.prominent
                    ? "linear-gradient(90deg, var(--color-primary), var(--color-teal))"
                    : "var(--color-primary)",
                }}
              />
            </div>
            <div className="mt-1.5 font-mono text-[0.65rem] text-[var(--color-faint)]">
              {c.original} KB → {c.compressed} KB
            </div>
          </div>
        ))}
      </div>

      {note && <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">{note}</p>}
      {overheadNote && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-faint)]">{overheadNote}</p>
      )}
    </motion.div>
  );
}
