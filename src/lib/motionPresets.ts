import type { Variants, Transition } from "motion/react";

/**
 * Shared Motion presets so entrance animations feel consistent across sections.
 * All presets are safe to use with `whileInView` + `viewport={{ once: true }}`.
 */

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
};

/** Parent that staggers its children on entrance. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Default viewport config for scroll-triggered reveals. */
export const inViewOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
