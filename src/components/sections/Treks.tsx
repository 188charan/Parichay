"use client";

import { motion } from "motion/react";
import { Mountain, MapPin } from "lucide-react";
import { treks, treksIntro, treksMore, type Trek } from "@/data/treks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Counter } from "@/components/ui/Counter";
import { ImageTile } from "@/components/ui/ImageTile";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/** A hand-drawn-feeling mountain ridge that draws itself in on scroll. */
function MountainRidge() {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-40"
      aria-hidden
    >
      <motion.path
        d="M0 150 L120 90 L210 120 L340 40 L460 110 L560 70 L700 130 L820 50 L960 100 L1080 60 L1200 120"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={1.2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={inViewOnce}
        transition={{ duration: 2.2, ease: easeOutExpo }}
      />
      <motion.path
        d="M0 155 L160 110 L300 135 L440 80 L600 125 L760 95 L900 140 L1040 100 L1200 135"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.4 }}
        viewport={inViewOnce}
        transition={{ duration: 2.4, ease: easeOutExpo, delay: 0.2 }}
      />
    </svg>
  );
}

function TrekCard({ trek, aspect }: { trek: Trek; aspect: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="group relative"
    >
      <ImageTile
        src={trek.image}
        alt={trek.name}
        className={cn(
          "w-full rounded-2xl border transition-colors",
          aspect,
          trek.flagship
            ? "border-[var(--color-line-strong)]"
            : "border-[var(--color-line)] group-hover:border-[var(--color-line-strong)]",
        )}
        imgClassName="transition-transform duration-700 group-hover:scale-105"
        placeholderLabel={`${trek.name} — add poster`}
      />

      {/* gradient + label overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-[var(--color-teal-soft)]" aria-hidden />
          {trek.tag && (
            <span className="rounded-full border border-[rgba(32,201,176,0.4)] bg-[rgba(32,201,176,0.1)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-teal-soft)]">
              {trek.tag}
            </span>
          )}
        </div>
        <h3
          className={cn(
            "mt-2 font-[family-name:var(--font-display)] font-bold leading-tight text-[var(--color-ink)]",
            trek.flagship ? "text-3xl md:text-5xl" : "text-xl",
          )}
        >
          {trek.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{trek.note}</p>
      </div>
    </motion.div>
  );
}

/**
 * Trekking passion. An animated mountain ridge draws in behind the heading; the
 * flagship (Kumara Parvatha — South India's toughest) gets a large poster, with
 * the other named treks in a grid. Posters zoom subtly on hover.
 */
export function Treks() {
  const flagship = treks.find((t) => t.flagship) ?? treks[0];
  const rest = treks.filter((t) => t.id !== flagship.id);

  return (
    <section
      id="treks"
      data-tier="flagship"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Trekking and nature"
    >
      <MountainRidge />

      <div className="container-x relative">
        <SectionLabel>{treksIntro.eyebrow}</SectionLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight">
            <span className="block text-[var(--color-ink)]">{treksIntro.heading[0]}</span>
            <span className="block text-gradient">{treksIntro.heading[1]}</span>
          </h2>
          <div className="flex items-center gap-3">
            <Mountain className="h-8 w-8 text-[var(--color-primary)]" strokeWidth={1.2} aria-hidden />
            <div>
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-gradient md:text-5xl">
                <Counter value={treksIntro.count} suffix="+" />
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                {treksIntro.countLabel}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {treksIntro.supporting}
        </p>

        {/* Flagship poster */}
        <div className="mt-14">
          <TrekCard trek={flagship} aspect="aspect-[16/10] md:aspect-[21/9]" />
        </div>

        {/* Other treks */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <TrekCard key={t.id} trek={t} aspect="aspect-[4/5]" />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-sm text-[var(--color-faint)]">
          {treksMore}
        </p>

        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {treksIntro.bridge}
        </p>
      </div>
    </section>
  );
}
