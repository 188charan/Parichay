"use client";

import { motion } from "motion/react";
import { Aperture as ApertureIcon } from "lucide-react";
import { photography, macroShots } from "@/data/photography";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Counter } from "@/components/ui/Counter";
import { ImageTile } from "@/components/ui/ImageTile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

// Mosaic spans so the gallery feels editorial, not a uniform grid.
const spans = [
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "row-span-2",
  "",
  "",
];

/**
 * Macro photography passion. A camera "aperture" irises open on scroll-in and
 * reveals the count; a mosaic gallery of macro shots reveals with a focus-rack
 * feel (blur → sharp) and zooms subtly on hover.
 */
export function MacroPhotography() {
  const reduced = useReducedMotion();

  return (
    <section
      id="macro"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Macro photography"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          {/* Left: intro + aperture + count */}
          <div>
            <SectionLabel>{photography.eyebrow}</SectionLabel>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block text-[var(--color-ink)]">{photography.heading[0]}</span>
              <span className="block text-gradient">{photography.heading[1]}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              {photography.supporting}
            </p>

            <div className="mt-10 flex items-center gap-6">
              {/* Aperture */}
              <div className="relative h-24 w-24 flex-shrink-0">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={reduced ? false : { rotate: -60, scale: 0.7, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 1, ease: easeOutExpo }}
                >
                  <ApertureIcon className="h-24 w-24 text-[var(--color-primary)]" strokeWidth={1} aria-hidden />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 40px -8px rgba(79,140,255,0.6)" }}
                  animate={reduced ? undefined : { opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
              </div>

              <div>
                <div className="font-[family-name:var(--font-display)] text-5xl font-bold text-gradient md:text-6xl">
                  <Counter value={photography.count} suffix="+" />
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {photography.countLabel}
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-[var(--color-faint)]">
              {photography.note}
            </p>
          </div>

          {/* Right: mosaic gallery */}
          <div className="grid auto-rows-[120px] grid-cols-3 gap-3 sm:auto-rows-[140px]">
            {macroShots.map((shot, i) => (
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={inViewOnce}
                transition={{ delay: (i % 4) * 0.08, duration: 0.7, ease: easeOutExpo }}
                className={cn("group", spans[i % spans.length])}
              >
                <ImageTile
                  src={shot.src}
                  alt={shot.caption}
                  caption={shot.caption}
                  className="h-full w-full rounded-xl border border-[var(--color-line)]"
                  imgClassName="transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
