"use client";

import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * Incident-response contextual visual — alert propagation.
 *
 * A chain of nodes sits in a normal (blue) state. A warning pulse periodically
 * originates at the failed node and propagates along the chain
 * (failure → detection → escalation → voice → on-call), resolving into a teal
 * "handled" state at the end. Warning color is used sparingly — only the origin
 * node and the traveling pulse — so the section never turns red.
 */
const STAGES = ["Failure", "Detection", "Escalation", "Voice", "On-call"];

export function AlertChain({ className }: { className?: string }) {
  const { ref, active } = useVizActive<HTMLDivElement>();
  const n = STAGES.length;

  return (
    <div ref={ref} data-active={active} className={cn("w-full", className)}>
      <svg viewBox="0 0 320 60" className="h-full w-full" role="img" aria-label="Alert propagating from failure through detection, escalation, voice call, to on-call">
        {STAGES.map((_, i) => {
          if (i === n - 1) return null;
          const x1 = 24 + (i * 272) / (n - 1);
          const x2 = 24 + ((i + 1) * 272) / (n - 1);
          const len = x2 - x1;
          return (
            <g key={`line-${i}`}>
              <line x1={x1} y1={24} x2={x2} y2={24} stroke="rgba(122,168,255,0.18)" strokeWidth={1} />
              {/* warning pulse propagating stage by stage */}
              <line
                x1={x1}
                y1={24}
                x2={x2}
                y2={24}
                stroke="var(--color-warn)"
                strokeWidth={1.6}
                strokeLinecap="round"
                data-viz=""
                style={{
                  strokeDasharray: `5 ${len}`,
                  ["--viz-dash" as string]: String(len + 5),
                  animation: `viz-dash-flow 3.5s linear ${i * 0.5}s infinite`,
                }}
              />
            </g>
          );
        })}

        {STAGES.map((label, i) => {
          const x = 24 + (i * 272) / (n - 1);
          const isFail = i === 0;
          const isResolved = i === n - 1;
          const fill = isFail
            ? "var(--color-warn)"
            : isResolved
              ? "var(--color-teal)"
              : "rgba(180,205,255,0.7)";
          return (
            <g key={`node-${label}`}>
              <circle
                cx={x}
                cy={24}
                r={isFail || isResolved ? 4 : 3}
                fill={fill}
                data-viz={isFail || isResolved ? undefined : ""}
                style={
                  isFail || isResolved
                    ? undefined
                    : { animation: `viz-node-pulse ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }
                }
              />
              <text x={x} y={46} textAnchor="middle" fontSize={7.5} fontFamily="var(--font-mono)" fill="var(--color-muted)">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
