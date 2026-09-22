"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP configuration. Registers ScrollTrigger exactly once, even under
 * React 19 strict-mode double effects. Import `gsap` and `ScrollTrigger` from
 * here rather than the raw package so registration is guaranteed.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger };
