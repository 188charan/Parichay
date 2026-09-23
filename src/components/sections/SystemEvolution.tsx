"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  evolutionPairs,
  systemEvolutionCopy as copy,
  evolutionMetrics,
  type ProblemTone,
} from "@/data/systemEvolution";
import { BlackHoleEngine } from "@/components/viz/BlackHoleEngine";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const toneDot: Record<ProblemTone, string> = {
  warn: "bg-[var(--color-warn)]",
  danger: "bg-[var(--color-danger)]",
  primary: "bg-[var(--color-primary)]",
};

interface Pt {
  x: number;
  y: number;
}

/** Center of an element relative to a container. */
function centerOf(el: HTMLElement, container: HTMLElement): Pt {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
}

/** Quadratic Bézier point. */
function bezier(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

/**
 * "From Complexity to Clarity" — the transformation machine.
 *
 * A calm realistic black hole sits center stage. One at a time, a problem word
 * detaches from the left list, is dragged along a curved gravitational path
 * into the event horizon (accelerating, shrinking, distorting, vanishing), and
 * the paired optimized word emerges from the far side and settles into the
 * right list. Sequential, looping, cinematic. Text stays real DOM (crisp,
 * accessible); the hole is canvas. Reduced motion falls back to simple fades.
 */
export function SystemEvolution() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const problemWordRef = useRef<HTMLDivElement>(null);
  const outputWordRef = useRef<HTMLDivElement>(null);

  const [consuming, setConsuming] = useState<number | null>(null);
  const [emerged, setEmerged] = useState<number | null>(null);
  const [inView, setInView] = useState(false);

  // Observe the section so the sequence only runs while visible.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced-motion fallback: quietly cycle the pairing highlights.
  useEffect(() => {
    if (!reduced || !inView) return;
    let i = 0;
    const tick = () => {
      setConsuming(i);
      setEmerged(i);
    };
    tick();
    const id = setInterval(() => {
      i = (i + 1) % evolutionPairs.length;
      tick();
    }, 2400);
    return () => clearInterval(id);
  }, [reduced, inView]);

  // Full animated sequence.
  useEffect(() => {
    if (reduced || !inView) return;
    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    const runTween = (
      duration: number,
      ease: (t: number) => number,
      onUpdate: (e: number) => void,
    ) =>
      new Promise<void>((res) => {
        const start = performance.now();
        const frame = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          onUpdate(ease(t));
          if (t < 1 && !cancelled) requestAnimationFrame(frame);
          else res();
        };
        requestAnimationFrame(frame);
      });

    const easeIn = (t: number) => t * t * t; // accelerate toward the hole
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = async () => {
      // brief settle so refs/layout are ready
      await wait(400);
      while (!cancelled) {
        for (let i = 0; i < evolutionPairs.length && !cancelled; i++) {
          const container = containerRef.current;
          const left = leftRefs.current[i];
          const right = rightRefs.current[i];
          const pw = problemWordRef.current;
          const ow = outputWordRef.current;
          if (!container || !left || !right || !pw || !ow) {
            await wait(300);
            continue;
          }

          const start = centerOf(left, container);
          const center: Pt = {
            x: container.clientWidth / 2,
            y: container.clientHeight / 2,
          };
          const end = centerOf(right, container);

          // ---- consume the problem word ----
          setConsuming(i);
          setEmerged(null);
          pw.textContent = evolutionPairs[i].problem;
          const bow = Math.min(90, container.clientHeight * 0.14);
          const ctrlIn: Pt = {
            x: (start.x + center.x) / 2,
            y: (start.y + center.y) / 2 - bow,
          };
          await wait(260); // let the left card dim ("word leaving")
          if (cancelled) break;
          await runTween(1500, easeIn, (e) => {
            const p = bezier(start, ctrlIn, center, e);
            pw.style.left = `${p.x}px`;
            pw.style.top = `${p.y}px`;
            const scale = 1 - 0.92 * e;
            const rot = -18 * e;
            const blur = e > 0.6 ? (e - 0.6) * 6 : 0;
            pw.style.transform = `translate(-50%,-50%) scale(${scale}) rotate(${rot}deg)`;
            pw.style.filter = blur ? `blur(${blur}px)` : "none";
            pw.style.opacity = String(e < 0.75 ? 1 : 1 - (e - 0.75) / 0.25);
          });
          if (cancelled) break;
          pw.style.opacity = "0";

          // ---- optimized word emerges from the far side ----
          setEmerged(i);
          ow.textContent = evolutionPairs[i].output;
          const ctrlOut: Pt = {
            x: (center.x + end.x) / 2,
            y: (center.y + end.y) / 2 - bow * 0.7,
          };
          await runTween(1200, easeOut, (e) => {
            const p = bezier(center, ctrlOut, end, e);
            ow.style.left = `${p.x}px`;
            ow.style.top = `${p.y}px`;
            const scale = 0.1 + 0.9 * e;
            ow.style.transform = `translate(-50%,-50%) scale(${scale})`;
            ow.style.opacity = String(Math.min(1, e * 1.6));
          });
          if (cancelled) break;
          // fade the flying output as the right card "receives" it
          await runTween(360, easeOut, (e) => {
            ow.style.opacity = String(1 - e);
          });

          await wait(650);
          if (cancelled) break;
          setConsuming(null);
        }
        // brief pause before the loop restarts
        setEmerged(null);
        await wait(500);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, inView]);

  return (
    <section
      id="evolution"
      data-tier="flagship"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="From complexity to clarity"
    >
      <div className="container-x relative">
        {/* Header */}
        <SectionLabel>{copy.eyebrow}</SectionLabel>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <span className="block text-[var(--color-ink)]">{copy.heading[0]}</span>
          <span className="block text-gradient">{copy.heading[1]}</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {copy.supporting}
        </p>
        <p className="mt-2 font-mono text-sm text-[var(--color-faint)]">
          {copy.frictionLine}
        </p>

        {/* Visualization */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 1, ease: easeOutExpo }}
          className="relative mt-14 h-[640px] w-full overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg)] lg:h-[600px]"
        >
          <BlackHoleEngine className="absolute inset-0 h-full w-full" />

          {/* Flying words (animated imperatively) */}
          <div
            ref={problemWordRef}
            className="pointer-events-none absolute z-20 whitespace-nowrap font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)] opacity-0 md:text-base"
            style={{ left: 0, top: 0, transform: "translate(-50%,-50%)", willChange: "left, top, transform, opacity" }}
          />
          <div
            ref={outputWordRef}
            className="pointer-events-none absolute z-20 whitespace-nowrap font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-teal-soft)] opacity-0 md:text-base"
            style={{
              left: 0,
              top: 0,
              transform: "translate(-50%,-50%)",
              textShadow: "0 0 18px rgba(32,201,176,0.6)",
              willChange: "left, top, transform, opacity",
            }}
          />

          {/* Core label */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-[calc(50%+3.5rem)] text-center">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#f5b06a]">
              {copy.coreLabel}
            </span>
          </div>

          {/* Overlay: problem list (left/top) + output list (right/bottom) */}
          <div className="pointer-events-none absolute inset-0 z-10 grid grid-rows-[auto_1fr_auto] gap-4 p-5 lg:grid-cols-3 lg:grid-rows-1 lg:items-center lg:p-8">
            {/* Complexity */}
            <div className="flex flex-col gap-2">
              <p className="mb-1 font-mono text-[0.6rem] uppercase tracking-widest text-[var(--color-faint)]">
                Complexity
              </p>
              {evolutionPairs.map((pair, i) => {
                const isConsuming = consuming === i;
                return (
                  <div
                    key={pair.id}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all duration-500",
                      isConsuming
                        ? "border-[var(--color-line-strong)] bg-[var(--color-elevated)]"
                        : "border-[var(--color-line)] bg-[var(--color-surface)]/70",
                    )}
                  >
                    <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", toneDot[pair.tone])} aria-hidden />
                    <span
                      ref={(el) => {
                        leftRefs.current[i] = el;
                      }}
                      className={cn(
                        "font-mono text-xs transition-opacity duration-300",
                        isConsuming ? "text-[var(--color-ink)] opacity-15" : "text-[var(--color-muted)]",
                      )}
                    >
                      {pair.problem}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block" aria-hidden />

            {/* Clarity */}
            <div className="flex flex-col gap-2 lg:items-end">
              <p className="mb-1 font-mono text-[0.6rem] uppercase tracking-widest text-[var(--color-faint)] lg:text-right">
                Clarity
              </p>
              {evolutionPairs.map((pair, i) => {
                const isEmerged = emerged === i;
                return (
                  <div
                    key={pair.id}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all duration-500 lg:flex-row-reverse",
                      isEmerged
                        ? "border-[rgba(32,201,176,0.45)] bg-[rgba(32,201,176,0.1)]"
                        : "border-[var(--color-line)] bg-[var(--color-surface)]/70",
                    )}
                    style={
                      isEmerged
                        ? { boxShadow: "0 0 24px -6px rgba(32,201,176,0.5)" }
                        : undefined
                    }
                  >
                    <span
                      className={cn(
                        "h-2 w-2 flex-shrink-0 rounded-full transition-colors",
                        isEmerged ? "bg-[var(--color-teal)]" : "bg-[var(--color-faint)]",
                      )}
                      aria-hidden
                    />
                    <span
                      ref={(el) => {
                        rightRefs.current[i] = el;
                      }}
                      className={cn(
                        "font-mono text-xs transition-colors duration-300",
                        isEmerged ? "text-[var(--color-teal-soft)]" : "text-[var(--color-muted)]",
                      )}
                    >
                      {pair.output}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bridge */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-muted)] md:text-2xl">
            {copy.bridge[0]}
          </span>
          <ArrowRight className="h-5 w-5 text-[var(--color-primary)]" aria-hidden />
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-gradient md:text-2xl">
            {copy.bridge[1]}
          </span>
        </div>

        {/* Metrics */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[var(--color-line)] py-10 md:grid-cols-4">
          {evolutionMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ delay: i * 0.08, duration: 0.5, ease: easeOutExpo }}
              className="flex flex-col gap-2"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-ink)] md:text-4xl">
                {m.value}
              </span>
              <span className="text-xs leading-snug text-[var(--color-muted)]">{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-14">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[var(--color-ink)] md:text-3xl">
            {copy.closing[0]}
          </p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-gradient md:text-3xl">
            {copy.closing[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
