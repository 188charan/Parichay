"use client";

import { jitter } from "@/lib/vizGeometry";
import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * A horizontal track carrying one or more traveling signal pulses. Used to
 * express latency (slow vs fast) and transaction flow. Pure CSS motion; the
 * component self-gates via useVizActive so its pulses pause when off-screen.
 *
 * `speed` seconds per traversal (lower = faster). `tone` picks the pulse color.
 */
export function SignalTrack({
  speed = 2.4,
  pulses = 1,
  tone = "primary",
  className,
}: {
  speed?: number;
  pulses?: number;
  tone?: "primary" | "teal";
  className?: string;
}) {
  const { ref, active } = useVizActive<HTMLDivElement>();
  const color = tone === "teal" ? "var(--color-teal)" : "var(--color-primary)";

  return (
    <div
      ref={ref}
      data-active={active}
      className={cn(
        "relative h-1 w-full overflow-hidden rounded-full bg-[var(--color-line)]",
        className,
      )}
    >
      {Array.from({ length: pulses }).map((_, i) => (
        <span
          key={i}
          data-viz=""
          className="absolute inset-y-0 left-0 w-1/4 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: `viz-signal ${speed}s linear ${(i / pulses) * speed + jitter(i) * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
