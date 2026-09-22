"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { inViewOnce } from "@/lib/motionPresets";

export interface FlowNode {
  label: string;
  emphasis?: "start" | "process" | "success" | "danger" | "decision";
}

const emphasisStyles: Record<string, string> = {
  start:
    "border-[var(--color-line-strong)] text-[var(--color-ink)] bg-[rgba(79,140,255,0.06)]",
  process: "border-[var(--color-line)] text-[var(--color-ink)] bg-[var(--color-elevated)]",
  success:
    "border-[rgba(32,201,176,0.4)] text-[var(--color-teal-soft)] bg-[rgba(32,201,176,0.08)]",
  danger:
    "border-[rgba(255,107,107,0.4)] text-[var(--color-danger)] bg-[rgba(255,107,107,0.07)]",
  decision:
    "border-[rgba(245,166,35,0.4)] text-[var(--color-warn)] bg-[rgba(245,166,35,0.07)]",
};

/**
 * Animated flow of nodes connected by lines — the shared visual engine behind
 * every case-study pipeline. On scroll-in, nodes stagger in and a data pulse
 * travels along each connector to convey directional flow.
 *
 * Layout: `vertical` (default) stacks nodes; `horizontal` lays them in a row
 * on medium+ screens and gracefully falls back to vertical on mobile.
 */
export function FlowDiagram({
  nodes,
  orientation = "vertical",
  className,
}: {
  nodes: FlowNode[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const isHorizontal = orientation === "horizontal";

  return (
    <motion.ol
      className={cn(
        "flex",
        isHorizontal
          ? "flex-col md:flex-row md:items-stretch md:flex-wrap md:gap-y-6"
          : "flex-col",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ staggerChildren: 0.12 }}
    >
      {nodes.map((node, i) => {
        const last = i === nodes.length - 1;
        return (
          <li
            key={`${node.label}-${i}`}
            className={cn(
              "flex",
              isHorizontal
                ? "flex-col md:flex-row md:items-center"
                : "flex-col items-start",
            )}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={cn(
                "relative rounded-xl border px-4 py-3 text-sm font-medium",
                "min-w-[10rem] text-center md:text-left",
                emphasisStyles[node.emphasis ?? "process"],
              )}
            >
              {node.label}
            </motion.div>

            {!last && <Connector horizontal={isHorizontal} />}
          </li>
        );
      })}
    </motion.ol>
  );
}

/**
 * Directional connector with an animated pulse. Renders as a horizontal or
 * vertical segment depending on layout.
 */
function Connector({ horizontal }: { horizontal: boolean }) {
  if (horizontal) {
    return (
      <div className="relative mx-2 hidden h-px w-8 flex-shrink-0 self-center overflow-hidden bg-[var(--color-line)] md:block">
        <motion.span
          className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
          variants={{
            hidden: { x: "-100%", opacity: 0 },
            visible: {
              x: "300%",
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut", delay: 0.2 },
            },
          }}
        />
        {/* Vertical fallback shown on mobile where the row wraps to a column */}
      </div>
    );
  }

  return (
    <div className="relative my-1 ml-6 h-6 w-px overflow-hidden bg-[var(--color-line)] md:ml-8">
      <motion.span
        className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent"
        variants={{
          hidden: { y: "-100%", opacity: 0 },
          visible: {
            y: "300%",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.15 },
          },
        }}
      />
    </div>
  );
}

/** Small connector shown on mobile for horizontal flows that wrap vertically. */
export function MobileConnector() {
  return (
    <div className="my-1 ml-6 h-5 w-px bg-[var(--color-line)] md:hidden" aria-hidden />
  );
}
