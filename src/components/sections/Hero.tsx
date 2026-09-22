"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile, contact } from "@/data/profile";
import { metrics } from "@/data/metrics";
import { easeOutExpo } from "@/lib/motionPresets";
import { scrollToId } from "@/lib/lenisInstance";

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
  const resumeHref =
    contact.links.find((l) => l.key === "resume")?.href || "/resume.pdf";

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

        {/* CTAs — let recruiters act immediately */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: easeOutExpo }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => scrollToId("spense")}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-soft)]"
          >
            View engineering work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </button>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-soft)]"
          >
            Resume
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </motion.div>

        {/* Compact achievement strip — understood in seconds, no scroll needed */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6, ease: easeOutExpo }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                {m.prefix}
                {m.value}
                {m.suffix}
              </dt>
              <dd className="mt-1 max-w-[9rem] text-xs leading-snug text-[var(--color-muted)]">
                {m.label}
              </dd>
            </div>
          ))}
        </motion.dl>
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
