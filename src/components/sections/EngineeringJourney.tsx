"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { journey, type JourneyStop } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const kindMeta: Record<
  JourneyStop["kind"],
  { tag: string; tone: string; dot: string }
> = {
  education: {
    tag: "Education",
    tone: "text-[var(--color-muted)]",
    dot: "bg-[var(--color-muted)]",
  },
  internship: {
    tag: "Internship",
    tone: "text-[var(--color-primary-soft)]",
    dot: "bg-[var(--color-primary)]",
  },
  engineering: {
    tag: "Production Engineering",
    tone: "text-[var(--color-teal-soft)]",
    dot: "bg-[var(--color-teal)]",
  },
};

/**
 * Engineering journey timeline.
 *
 * Desktop: a GSAP-pinned horizontal scroll — the section pins and the track of
 * journey stops translates left as the user scrolls, so the story literally
 * moves forward from education to production engineering.
 *
 * Mobile / reduced-motion: a conventional vertical timeline (no pin, no
 * horizontal translation) so it degrades gracefully.
 */
export function EngineeringJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    // Only run the pinned horizontal scroll on wider screens.
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={cn(
        "relative",
        // Only clip + full-height when the pinned horizontal scroll is active.
        // Under reduced motion the section flows normally (no clipping).
        !reduced && "md:h-screen md:overflow-hidden",
      )}
      aria-label="Engineering journey"
    >
      {/* Header — floats over the track in the pinned layout, flows normally
          under reduced motion. */}
      <div
        className={cn(
          "container-x pt-20",
          !reduced && "md:absolute md:top-12 md:left-0 md:right-0 md:z-10 md:pt-0",
        )}
      >
        <SectionLabel index="03">Engineering journey</SectionLabel>
        <p className="mt-4 max-w-md text-sm text-[var(--color-muted)]">
          Education → Internship → Production Engineering.
        </p>
      </div>

      {/* Desktop horizontal track / Mobile vertical stack */}
      <div
        ref={trackRef}
        className={cn(
          "grid-bg",
          "flex flex-col gap-8 px-6 py-16",
          // Horizontal pinned track layout only when motion is enabled.
          !reduced &&
            "md:h-screen md:flex-row md:items-center md:gap-0 md:px-0 md:py-0 md:pl-[8vw] md:w-max md:will-change-transform",
        )}
      >
        {/* Connecting spine */}
        {journey.map((stop, i) => (
          <JourneyCard key={stop.id} stop={stop} index={i} last={i === journey.length - 1} />
        ))}
      </div>
    </section>
  );
}

function JourneyCard({
  stop,
  index,
  last,
}: {
  stop: JourneyStop;
  index: number;
  last: boolean;
}) {
  const meta = kindMeta[stop.kind];
  return (
    <div className="relative flex items-stretch md:w-[70vw] md:max-w-[520px] md:items-center">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="surface-card relative w-full p-8 md:mx-8 md:p-10"
      >
        <div className="flex items-center gap-3">
          <span className={cn("h-2.5 w-2.5 rounded-full", meta.dot)} aria-hidden />
          <span className={cn("eyebrow", meta.tone)}>{meta.tag}</span>
        </div>

        <p className="mt-6 font-mono text-sm text-[var(--color-primary-soft)]">
          {stop.period}
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[var(--color-ink)] md:text-3xl">
          {stop.title}
        </h3>
        <p className="mt-2 text-[var(--color-muted)]">{stop.org}</p>
        {stop.detail ? (
          <p className="mt-4 inline-block rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-1 font-mono text-sm text-[var(--color-teal-soft)]">
            {stop.detail}
          </p>
        ) : null}

        {/* stage index */}
        <span
          className="absolute right-6 top-6 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--color-line-strong)]"
          aria-hidden
        >
          0{index + 1}
        </span>
      </motion.article>

      {/* Horizontal connector between cards (desktop only) */}
      {!last && (
        <div className="relative hidden w-16 items-center md:flex" aria-hidden>
          <div className="h-px w-full bg-[var(--color-line-strong)]" />
          <span className="absolute right-0 text-[var(--color-primary)]">→</span>
        </div>
      )}
    </div>
  );
}
