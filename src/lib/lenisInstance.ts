import type Lenis from "lenis";

/**
 * Tiny shared holder for the active Lenis instance so non-provider components
 * (e.g. the nav rail) can trigger smooth scroll-to without prop drilling.
 * Falls back to native scrolling when Lenis isn't active (reduced motion).
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
