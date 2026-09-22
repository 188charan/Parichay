"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { easeOutExpo } from "@/lib/motionPresets";

// Canvas is client-only and non-critical: load it after hydration so it never
// blocks first paint or the headline animation.
const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const line = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo, delay: 0.15 + i * 0.12 },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated environment */}
      <HeroCanvas />

      {/* Depth gradient so text stays legible over the node field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 30% 40%, rgba(8,11,18,0) 0%, rgba(8,11,18,0.55) 70%, rgba(8,11,18,0.85) 100%)",
        }}
        aria-hidden
      />

      <div className="container-x relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="eyebrow mb-6"
        >
          {profile.location}
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] font-bold tracking-tight">
          <span className="block overflow-hidden">
            <motion.span
              custom={0}
              variants={line}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] text-[var(--color-ink)]"
            >
              {profile.name.toUpperCase()}
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              custom={1}
              variants={line}
              initial="hidden"
              animate="visible"
              className="mt-2 block text-[clamp(1.5rem,4.5vw,3rem)] font-semibold leading-[1.05] text-[var(--color-muted)]"
            >
              {profile.title.toUpperCase()}
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              custom={2}
              variants={line}
              initial="hidden"
              animate="visible"
              className="mt-3 block text-[clamp(1rem,2.6vw,1.6rem)] font-medium tracking-[0.12em] text-gradient"
            >
              FINTECH × AI × SYSTEMS
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: easeOutExpo }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {profile.tagline}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-[0.65rem]">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--color-primary)]"
            aria-hidden
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
