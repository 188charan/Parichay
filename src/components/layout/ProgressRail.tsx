"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { navItems } from "@/data/nav";
import { scrollToId } from "@/lib/lenisInstance";
import { cn } from "@/lib/cn";

/**
 * Fixed progress rail.
 *
 * Desktop (lg+): a vertical rail on the right edge. A spring-smoothed line
 * tracks overall scroll progress; each act has a tick + label that reveals on
 * hover and highlights when its section is active. Clicking scrolls there.
 *
 * Mobile: a slim top progress bar plus a compact "act counter" so the rail
 * never crowds a small screen.
 */
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const [active, setActive] = useState(navItems[0].id);

  // Track which act section is currently in view.
  useEffect(() => {
    const targets = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry closest to the top of the viewport that's visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    navItems.findIndex((n) => n.id === active),
  );

  return (
    <>
      {/* Mobile: top progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent lg:hidden">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-teal)]"
          style={{ scaleX: progress }}
        />
      </div>
      {/* Mobile: compact act indicator */}
      <div className="fixed right-4 top-4 z-50 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/80 px-3 py-1.5 font-mono text-xs text-[var(--color-muted)] backdrop-blur lg:hidden">
        <span className="text-[var(--color-primary-soft)]">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-[var(--color-faint)]">
          {" "}
          / {String(navItems.length).padStart(2, "0")}
        </span>
        <span className="ml-2 text-[var(--color-ink)]">{navItems[activeIndex].label}</span>
      </div>

      {/* Desktop: vertical rail */}
      <nav
        aria-label="Section navigation"
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        {/* progress track behind the ticks */}
        <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--color-line)]" aria-hidden />
        <motion.div
          className="absolute left-[5px] top-0 w-px origin-top bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-teal)]"
          style={{ height: "100%", scaleY: progress }}
          aria-hidden
        />

        <ul className="relative flex flex-col gap-5">
          {navItems.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} className="group flex items-center">
                <button
                  onClick={() => scrollToId(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full border transition-all duration-300",
                      isActive
                        ? "scale-125 border-[var(--color-primary)] bg-[var(--color-primary)]"
                        : "border-[var(--color-faint)] bg-transparent group-hover:border-[var(--color-primary-soft)]",
                    )}
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap font-mono text-xs tracking-wide transition-all duration-300",
                      isActive
                        ? "text-[var(--color-ink)] opacity-100"
                        : "text-[var(--color-muted)] opacity-0 group-hover:opacity-100",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
