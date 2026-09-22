"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { setLenis } from "@/lib/lenisInstance";

/**
 * Provides app-wide smooth scrolling via Lenis and keeps GSAP's ScrollTrigger
 * in sync by driving Lenis from the GSAP ticker (a single rAF loop).
 *
 * When the user prefers reduced motion, Lenis is not initialized at all — the
 * browser's native (instant) scrolling is used, and ScrollTrigger still works.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    // Keep ScrollTrigger aware of Lenis-driven scroll positions.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  return <>{children}</>;
}
