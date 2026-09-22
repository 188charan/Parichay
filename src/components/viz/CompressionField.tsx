"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { jitter } from "@/lib/vizGeometry";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Database signature visual — compression.
 *
 * A field of data particles begins spread across a wide area (large payload)
 * and, when the panel enters view, converges into a dense central block
 * (compressed payload). Communicates LARGE PAYLOAD -> COMPRESSION -> SMALLER
 * PAYLOAD without any table/field names. One-shot Motion animation; reduced
 * motion shows the converged state.
 */
export function CompressionField() {
  const reduced = useReducedMotion();

  // Each particle has a spread (start) position and a compact (end) position
  // clustered into a central band.
  const particles = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => {
        const spreadX = jitter(i, 2) * 100;
        const spreadY = jitter(i, 5) * 100;
        // compact cluster: central 30% band
        const compactX = 35 + jitter(i, 7) * 30;
        const compactY = 20 + jitter(i, 11) * 60;
        const teal = jitter(i, 13) > 0.55;
        return { spreadX, spreadY, compactX, compactY, teal, delay: jitter(i, 3) * 0.4 };
      }),
    [],
  );

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
      {/* labels */}
      <span className="absolute left-4 top-4 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
        large payload
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-teal-soft)]">
        compressed
      </span>

      {/* particle field */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: p.teal ? "var(--color-teal)" : "var(--color-primary)",
              left: 0,
              top: 0,
            }}
            initial={
              reduced
                ? { left: `${p.compactX}%`, top: `${p.compactY}%`, opacity: 0.9 }
                : { left: `${p.spreadX}%`, top: `${p.spreadY}%`, opacity: 0.5 }
            }
            whileInView={{
              left: `${p.compactX}%`,
              top: `${p.compactY}%`,
              opacity: 0.9,
            }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: p.delay }}
          />
        ))}
      </div>

      {/* compressed-zone frame that fades in as particles converge */}
      <motion.div
        className="absolute left-[35%] top-[20%] h-[60%] w-[30%] rounded-lg border border-[rgba(32,201,176,0.35)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: reduced ? 1 : [0, 0, 1] }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.6, times: [0, 0.6, 1] }}
        aria-hidden
      />

      {/* reduction reveal */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ delay: reduced ? 0 : 1.5, duration: 0.6 }}
      >
        <div className="rounded-xl bg-[var(--color-bg)]/70 px-5 py-3 text-center backdrop-blur-sm">
          <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-gradient">
            ~45%
          </div>
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-muted)]">
            avg payload reduction
          </div>
        </div>
      </motion.div>
    </div>
  );
}
