"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { dsa } from "@/data/dsa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const difficultyColor: Record<string, string> = {
  Easy: "var(--color-teal)",
  Medium: "var(--color-warn)",
  Hard: "var(--color-danger)",
};

/**
 * DSA problem-solving. A heatmap-inspired grid (a deterministic intensity
 * pattern, NOT a real contribution graph) sets the tone, with per-platform
 * breakdowns using animated counters and difficulty bars.
 */
export function DSA() {
  return (
    <section
      id="dsa"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Data structures and algorithms"
    >
      <div className="container-x">
        <SectionHeading index="13" label="Problem solving" lines={dsa.headline} gradient />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-center">
          {/* Heatmap-inspired grid */}
          <Heatmap />

          {/* Total */}
          <div className="flex flex-col items-start gap-3">
            <span className="font-[family-name:var(--font-display)] text-7xl font-bold text-gradient md:text-8xl">
              <Counter value={1200} suffix="+" separator />
            </span>
            <span className="text-lg text-[var(--color-muted)]">
              problems solved across platforms
            </span>
          </div>
        </div>

        {/* Platform breakdowns */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {dsa.platforms.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: easeOutExpo }}
              className="surface-card flex flex-col gap-6 p-8"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                  {p.name}
                </h3>
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-primary-soft)]">
                  <Counter value={p.total} />
                </span>
              </div>

              {/* Difficulty breakdown */}
              {p.breakdown.length > 0 && (
                <div className="flex flex-col gap-3">
                  {p.breakdown.map((b) => (
                    <div key={b.label}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="text-[var(--color-muted)]">{b.label}</span>
                        <span className="font-mono text-[var(--color-ink)]">{b.value}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(b.value / p.total) * 100}%` }}
                          viewport={inViewOnce}
                          transition={{ duration: 0.9, ease: easeOutExpo }}
                          className="h-full rounded-full"
                          style={{ background: difficultyColor[b.label] ?? "var(--color-primary)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-2">
                {"codingScore" in p && p.codingScore ? (
                  <Tag tone="primary">Coding score {p.codingScore}</Tag>
                ) : null}
                {p.badge ? <Tag tone="teal">{p.badge}</Tag> : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Heatmap-inspired grid. Intensity is derived deterministically from cell
 * index (pseudo-random but stable) so it evokes an activity heatmap without
 * fabricating a real contribution graph.
 */
function Heatmap() {
  const cells = useMemo(() => {
    const cols = 26;
    const rows = 7;
    const out: number[] = [];
    for (let i = 0; i < cols * rows; i++) {
      // Stable pseudo-random intensity in 0..4.
      const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
      out.push(Math.floor((v % 1) * 5));
    }
    return out;
  }, []);

  const intensity = [
    "rgba(139,149,167,0.10)",
    "rgba(79,140,255,0.30)",
    "rgba(79,140,255,0.55)",
    "rgba(32,201,176,0.70)",
    "rgba(32,201,176,0.95)",
  ];

  return (
    <div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: "repeat(26, minmax(0, 1fr))" }}
        aria-hidden
      >
        {cells.map((level, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ delay: (i % 26) * 0.01, duration: 0.3 }}
            className={cn("aspect-square rounded-[3px]")}
            style={{ background: intensity[level] }}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-[var(--color-faint)]">
        Consistency over intensity — a stylized activity view.
      </p>
    </div>
  );
}
