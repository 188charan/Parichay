"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Living Systems gating hook.
 *
 * Returns a ref to attach to an animation host and a boolean indicating whether
 * that host is currently on-screen. Ambient CSS animations are paused unless the
 * host carries `data-active="true"`, so no off-screen animation loops run.
 *
 * Usage:
 *   const { ref, active } = useVizActive();
 *   <div ref={ref} data-active={active}> ...[data-viz] children... </div>
 */
export function useVizActive<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px",
) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, active };
}
