"use client";

import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * Partner-platform contextual visual — configuration-driven distribution.
 *
 * A single central Configuration node fans journeys out to multiple partners
 * (A/B/C); pulses travel outward from the center, communicating that one
 * configuration engine drives many tenant journeys (multi-tenant / config-
 * driven architecture) rather than hardcoded per-partner flows.
 */
const PARTNERS = ["Partner A", "Partner B", "Partner C"];

export function ConfigGraph({ className }: { className?: string }) {
  const { ref, active } = useVizActive<HTMLDivElement>();
  const cx = 160;
  const cy = 34;
  const targets = [50, 160, 270];
  const ty = 150;

  return (
    <div ref={ref} data-active={active} className={cn("w-full", className)}>
      <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="A central configuration node distributing journeys to multiple partners">
        {targets.map((tx, i) => {
          const len = Math.round(Math.hypot(tx - cx, ty - cy) * 1000) / 1000;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="rgba(122,168,255,0.18)" strokeWidth={1} />
              {/* pulse traveling outward from config to partner */}
              <line
                x1={cx}
                y1={cy}
                x2={tx}
                y2={ty}
                stroke="var(--color-teal)"
                strokeWidth={1.5}
                strokeLinecap="round"
                data-viz=""
                style={{
                  strokeDasharray: `5 ${len}`,
                  ["--viz-dash" as string]: String(len + 5),
                  animation: `viz-dash-flow 2.4s linear ${i * 0.45}s infinite`,
                }}
              />
            </g>
          );
        })}

        {/* central configuration node */}
        <circle cx={cx} cy={cy} r={6} fill="rgba(79,140,255,0.12)" stroke="var(--color-primary)" strokeWidth={1} />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={0.8}
          opacity={0.5}
          data-viz=""
          style={{ animation: "viz-node-pulse 2.6s ease-in-out infinite" }}
        />
        <text x={cx} y={cy - 12} textAnchor="middle" fontSize={8} fontFamily="var(--font-mono)" fill="var(--color-primary-soft)">
          Configuration
        </text>

        {/* partner nodes */}
        {targets.map((tx, i) => (
          <g key={`p-${i}`}>
            <rect x={tx - 34} y={ty - 2} width={68} height={20} rx={5} fill="rgba(32,201,176,0.06)" stroke="rgba(32,201,176,0.4)" strokeWidth={0.8} />
            <text x={tx} y={ty + 11} textAnchor="middle" fontSize={7.5} fontFamily="var(--font-mono)" fill="var(--color-teal-soft)">
              {PARTNERS[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
