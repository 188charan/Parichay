"use client";

import { motion } from "motion/react";
import { fadeUp, inViewOnce } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * Generic scroll-reveal wrapper. Fades + rises its children into view once.
 * `delay` staggers manually-placed reveals.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word reveal for headlines. Splits on spaces and staggers each word
 * upward. Preserves line structure when `lines` (array) is passed.
 */
export function RevealText({
  text,
  className,
  wordClassName,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            aria-hidden
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
