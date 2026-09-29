"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const ORBIT_DOTS = 8;

/**
 * Premium avatar sticker for the Contact section.
 *
 * A soft ambient glow, a slow ring of orbiting particles (the site's network
 * motif), a thin blue→teal gradient frame, a gentle float, and a subtle 3D tilt
 * that follows the cursor. Falls back to an initials monogram if the image
 * isn't present. Motion is disabled under prefers-reduced-motion.
 */
export function AvatarSticker({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor-driven 3D tilt (springed for smoothness).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 15,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative aspect-square w-52 sm:w-60", className)}
      style={{ perspective: 900 }}
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.28), transparent 70%)" }}
        aria-hidden
      />

      {/* orbiting particles */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        {Array.from({ length: ORBIT_DOTS }).map((_, i) => {
          const angle = (i / ORBIT_DOTS) * 360;
          const teal = i % 3 === 0;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
              style={{
                background: teal ? "var(--color-teal)" : "var(--color-primary)",
                boxShadow: teal
                  ? "0 0 8px rgba(32,201,176,0.8)"
                  : "0 0 8px rgba(79,140,255,0.8)",
                transform: `rotate(${angle}deg) translateY(-${52}%) translateY(-6px)`,
                transformOrigin: "0 0",
              }}
            />
          );
        })}
      </motion.div>

      {/* tilting portrait */}
      <motion.div
        className="absolute inset-3"
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* gradient frame */}
          <div
            className="h-full w-full rounded-full p-[2px]"
            style={{
              background:
                "linear-gradient(140deg, rgba(79,140,255,0.9), rgba(32,201,176,0.8) 60%, rgba(79,140,255,0.3))",
              boxShadow: "0 0 50px -10px rgba(79,140,255,0.55)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[var(--color-elevated)]">
              {!failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  onError={() => setFailed(true)}
                  className="h-full w-full object-cover"
                  style={{ transform: "translateZ(30px)" }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
                  <span className="relative font-[family-name:var(--font-display)] text-5xl font-bold text-gradient">
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
