"use client";

import { useMemo } from "react";
import { jitter } from "@/lib/vizGeometry";
import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * Contact signature visual — the reverse of the hero.
 *
 * Where the hero radiates one identity into many systems, this converges many
 * source connections back toward a single central point (the identity). Pulses
 * travel inward along each line. Lightweight SVG + CSS, gated off-screen.
 */
export function ConvergenceLines({ className }: { className?: string }) {
  const { ref, active } = useVizActive<HTMLDivElement>();

  // Perimeter source points around the edges, all pointing at the center.
  const sources = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 + jitter(i) * 0.3;
        const radius = 44 + jitter(i, 3) * 6;
        // Round so server/client SVG coordinates match exactly (no hydration mismatch).
        const round = (n: number) => Math.round(n * 1000) / 1000;
        return {
          x: round(50 + Math.cos(angle) * radius),
          y: round(50 + Math.sin(angle) * radius),
          delay: jitter(i, 7) * 3,
          dur: 2.6 + jitter(i, 9) * 2,
        };
      }),
    [],
  );

  return (
    <div
      ref={ref}
      data-active={active}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {sources.map((s, i) => (
          <g key={i}>
            <line
              x1={s.x}
              y1={s.y}
              x2={50}
              y2={50}
              stroke="rgba(122,168,255,0.12)"
              strokeWidth={0.15}
            />
            {/* inward-traveling pulse */}
            <line
              x1={s.x}
              y1={s.y}
              x2={50}
              y2={50}
              stroke="var(--color-primary)"
              strokeWidth={0.35}
              strokeLinecap="round"
              data-viz=""
              style={{
                strokeDasharray: "3 40",
                ["--viz-dash" as string]: "43",
                animation: `viz-converge-flow ${s.dur}s linear ${s.delay}s infinite`,
              }}
            />
            <circle cx={s.x} cy={s.y} r={0.9} fill="rgba(180,205,255,0.5)" />
          </g>
        ))}
        {/* central identity node */}
        <circle cx={50} cy={50} r={2.2} fill="var(--color-teal)">
        </circle>
        <circle
          cx={50}
          cy={50}
          r={2.2}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth={0.4}
          opacity={0.5}
          data-viz=""
          style={{ animation: "viz-node-pulse 3s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}
