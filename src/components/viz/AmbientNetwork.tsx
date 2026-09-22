"use client";

import { useMemo } from "react";
import { buildNetwork, jitter } from "@/lib/vizGeometry";
import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * Level 1 — Ambient network background.
 *
 * A lightweight, deterministic SVG node network echoing the hero's visual
 * language. Nodes breathe and a few connections carry a slow pulse — all via
 * CSS keyframes that are paused unless the section is on-screen (data-active),
 * so it is effectively free when scrolled away. No canvas, no JS animation loop.
 *
 * `intensity` scales how many connections animate; keep it subtle behind content.
 */
export function AmbientNetwork({
  nodeCount = 26,
  seed = 7,
  className,
  intensity = 0.4,
}: {
  nodeCount?: number;
  seed?: number;
  className?: string;
  intensity?: number;
}) {
  const W = 100;
  const H = 60;
  const { nodes, edges } = useMemo(
    () => buildNetwork(nodeCount, W, H, seed, 26),
    [nodeCount, seed],
  );
  const { ref, active } = useVizActive<HTMLDivElement>();

  // A subset of edges carry a flowing pulse.
  const flowCount = Math.max(1, Math.floor(edges.length * intensity * 0.25));

  return (
    <div
      ref={ref}
      data-active={active}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {/* connections */}
        {edges.map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          const flows = i % Math.max(1, Math.floor(edges.length / flowCount)) === 0;
          return (
            <line
              key={`e-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={flows ? "var(--color-primary)" : "rgba(122,168,255,0.14)"}
              strokeWidth={0.18}
              opacity={0.14 + e.w * 0.22}
              data-viz={flows ? "" : undefined}
              style={
                flows
                  ? {
                      strokeDasharray: 6,
                      // travel a pulse along the line
                      ["--viz-dash" as string]: "12",
                      animation: `viz-dash-flow ${3 + jitter(i) * 3}s linear ${jitter(i, 3) * 2}s infinite`,
                    }
                  : undefined
              }
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n, i) => (
          <circle
            key={`n-${n.id}`}
            cx={n.x}
            cy={n.y}
            r={n.r * 0.5}
            fill="rgba(180,205,255,0.5)"
            data-viz=""
            style={{
              animation: `viz-node-pulse ${2.5 + jitter(i, 5) * 2.5}s ease-in-out ${jitter(i, 9) * 3}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
