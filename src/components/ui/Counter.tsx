"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Animated number counter that runs once when scrolled into view.
 * Honors reduced-motion by rendering the final value immediately.
 *
 * State holds animation `progress` (0..1) driven purely by requestAnimationFrame
 * — never set synchronously inside the effect body — so there are no cascading
 * renders. The displayed number is derived during render.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  separator = false,
  duration = 1.8,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Animate only when the element enters view and motion is allowed.
  const shouldAnimate = inView && !reduced && duration > 0;

  useEffect(() => {
    if (!shouldAnimate) return;

    let raf = 0;
    const start = performance.now();
    // easeOutExpo for a decelerating count that feels engineered, not linear.
    const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      setProgress(ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldAnimate, duration]);

  // If we're not animating (reduced motion, or already in view instantly),
  // show the final value; otherwise interpolate by progress.
  const current =
    reduced || duration <= 0 ? value : inView ? value * progress : 0;
  const rounded = Math.round(current);
  const formatted = separator ? rounded.toLocaleString("en-IN") : String(rounded);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
