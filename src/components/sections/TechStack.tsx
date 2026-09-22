"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * Interactive tech stack. Categories act as tabs (desktop) / accordion
 * (mobile); selecting one reveals its items with a staggered entrance. Avoids
 * a single giant flat grid.
 */
export function TechStack() {
  const [active, setActive] = useState(skillCategories[0].id);
  const activeCategory =
    skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section
      id="skills"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Tech stack"
    >
      <div className="container-x">
        <SectionHeading index="12" label="Craft" lines={["THE STACK."]} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
          {/* Category list */}
          <div
            className="flex flex-col"
            role="tablist"
            aria-label="Skill categories"
          >
            {skillCategories.map((cat, i) => {
              const isActive = cat.id === active;
              return (
                <motion.button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  id={`tab-${cat.id}`}
                  onClick={() => setActive(cat.id)}
                  onMouseEnter={() => setActive(cat.id)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: easeOutExpo }}
                  className={cn(
                    "group flex items-center justify-between border-b border-[var(--color-line)] py-4 text-left transition-colors",
                    isActive ? "text-[var(--color-ink)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        isActive ? "text-[var(--color-primary)]" : "text-[var(--color-faint)]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-medium">
                      {cat.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-[var(--color-primary)] transition-all",
                      isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-60",
                    )}
                    aria-hidden
                  >
                    →
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active category items */}
          <div
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            className="min-h-[16rem]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="flex flex-wrap gap-3"
              >
                {activeCategory.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.3, ease: easeOutExpo }}
                    className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-line-strong)] hover:bg-[var(--color-elevated)]"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
