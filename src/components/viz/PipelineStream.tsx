"use client";

import { useMemo } from "react";
import { jitter } from "@/lib/vizGeometry";
import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * Migration signature visual — representative data/users flowing down a
 * production pipeline. Uses ~40 lightweight particles (NOT 10,000) falling
 * along a vertical band; the lower portion tints teal to signal the pipeline
 * settling into a successful, stable end state.
 *
 * Pure CSS motion, gated by [data-active] so it pauses off-screen.
 */
export function PipelineStream({
  count = 40,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const { ref, active } = useVizActive<HTMLDivElement>();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: jitter(i, 2) * 100,
        delay: jitter(i, 4) * 6,
        duration: 4 + jitter(i, 6) * 4,
        size: 1.5 + jitter(i, 8) * 2,
        teal: jitter(i, 10) > 0.6, // a minority arrive as "settled/success"
      })),
    [count],
  );

  return (
    <div
      ref={ref}
      data-active={active}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* teal "success" glow pooling at the base of the pipeline */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(32,201,176,0.08), transparent)",
        }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          data-viz=""
          className="absolute top-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.teal ? "var(--color-teal)" : "var(--color-primary)",
            boxShadow: p.teal
              ? "0 0 6px rgba(32,201,176,0.6)"
              : "0 0 6px rgba(79,140,255,0.5)",
            animation: `viz-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
