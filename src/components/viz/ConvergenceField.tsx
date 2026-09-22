"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { jitter } from "@/lib/vizGeometry";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Philosophy signature visual — network convergence.
 *
 * Many scattered nodes begin disconnected and, as the visitor scrolls through
 * the principles, the whole field scales inward toward a single central node —
 * the system converging into one stable core by the final statement
 * ("I OWN THE SYSTEM"). A single transform drives it, so it's cheap.
 *
 * Under reduced motion the field renders statically in its converged state.
 */
export function ConvergenceField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scatter -> converge: the field scales toward its center as it scrolls.
  const scale = useTransform(scrollYProgress, [0.1, 0.75], [1, 0.08]);
  const nodesOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0.5, 0]);
  const coreOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const coreGlow = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);

  const nodes = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        x: 8 + jitter(i, 2) * 84,
        y: 8 + jitter(i, 5) * 84,
        r: 0.6 + jitter(i, 8) * 1.4,
      })),
    [],
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[min(70vh,42rem)] w-[min(70vh,42rem)] -translate-x-1/2 -translate-y-1/2">
        {/* Converging node field */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={reduced ? { scale: 0.08, opacity: 0 } : { scale, opacity: nodesOpacity }}
        >
          {nodes.map((n, i) => (
            <line
              key={`l-${i}`}
              x1={n.x}
              y1={n.y}
              x2={50}
              y2={50}
              stroke="rgba(122,168,255,0.12)"
              strokeWidth={0.15}
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`c-${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="rgba(180,205,255,0.6)"
            />
          ))}
        </motion.svg>

        {/* Central stable core that emerges at convergence */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: reduced ? 1 : coreOpacity }}
        >
          <motion.div
            className="h-3 w-3 rounded-full bg-[var(--color-teal)]"
            style={{
              boxShadow: "0 0 40px 8px rgba(32,201,176,0.5)",
              scale: reduced ? 1 : coreGlow,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
