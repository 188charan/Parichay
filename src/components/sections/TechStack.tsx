"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Database,
  CodeXml,
  MonitorSmartphone,
  Server,
  Sparkles,
  Cpu,
  Container,
  Landmark,
  Wrench,
  CircuitBoard,
  type LucideIcon,
} from "lucide-react";
import { skillCategories, mysqlDepth } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { AmbientNetwork } from "@/components/viz/AmbientNetwork";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * THE STACK — a bento capability grid.
 *
 * Every skill is always visible (no hover-to-reveal panel that made content
 * jump to the top). Each category is a self-labelled card with an icon, an
 * index and its own tools; MySQL leads as an integrated hero tile. Motion is
 * kept tasteful: staggered card reveals, per-pill hover lift, and an accent
 * that lights on hover — echoing the site's living-systems language.
 */

/** Per-category icon. */
const ICONS: Record<string, LucideIcon> = {
  languages: CodeXml,
  frontend: MonitorSmartphone,
  backend: Server,
  databases: Database,
  ai: Sparkles,
  systems: Cpu,
  devops: Container,
  fintech: Landmark,
  tools: Wrench,
  "core-cs": CircuitBoard,
};

/** Two accents alternate down the grid for visual rhythm. */
type Accent = {
  ring: string;
  soft: string;
  glow: string;
  tintBg: string;
};
const ACCENTS: Accent[] = [
  {
    ring: "var(--color-primary)",
    soft: "var(--color-primary-soft)",
    glow: "rgba(79,140,255,0.55)",
    tintBg: "rgba(79,140,255,0.10)",
  },
  {
    ring: "var(--color-teal)",
    soft: "var(--color-teal-soft)",
    glow: "rgba(32,201,176,0.5)",
    tintBg: "rgba(32,201,176,0.10)",
  },
];

const TEAL = ACCENTS[1];

const TOTAL_SKILLS = skillCategories.reduce((n, c) => n + c.items.length, 0);

/** CSS custom properties consumed by the card + pills for hover accents. */
function accentVars(a: Accent): CSSProperties {
  return {
    ["--acc" as string]: a.ring,
    ["--acc-soft" as string]: a.soft,
    ["--acc-bg" as string]: a.tintBg,
    ["--acc-glow" as string]: a.glow,
  };
}

/** A single skill pill with a hover lift + a staggered group-hover ripple. */
function Pill({ label, index }: { label: string; index: number }) {
  return (
    <span
      style={{ transitionDelay: `${index * 28}ms` }}
      className={cn(
        "rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5",
        "text-sm text-[var(--color-muted)] transition-all duration-300 ease-out",
        // whole card hovered → subtle brighten + tiny rise (ripples via delay)
        "group-hover:-translate-y-0.5 group-hover:border-[var(--color-line-strong)] group-hover:text-[var(--color-ink)]",
        // this specific pill hovered → full accent
        "hover:!translate-y-[-3px] hover:!border-[color:var(--acc)] hover:!bg-[var(--acc-bg)] hover:!text-[var(--color-ink)]",
        "hover:shadow-[0_8px_24px_-12px_var(--acc-glow)]",
      )}
    >
      {label}
    </span>
  );
}

/** A category tile in the bento grid. */
function CategoryCard({
  icon: Icon,
  title,
  items,
  index,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
  index: number;
  accent: Accent;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ delay: index * 0.05, duration: 0.55, ease: easeOutExpo }}
      style={accentVars(accent)}
      className={cn(
        "group surface-card relative flex flex-col gap-5 overflow-hidden p-6",
        "transition-[transform,border-color,box-shadow] duration-300",
        "hover:-translate-y-1 hover:border-[color:var(--acc)]",
        "hover:shadow-[0_24px_60px_-30px_var(--acc-glow)]",
      )}
    >
      {/* corner glow that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accent.glow }}
      />

      <div className="flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300"
          style={{ borderColor: "var(--color-line-strong)", background: accent.tintBg, color: accent.soft }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="font-mono text-xs text-[var(--color-faint)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          {title}
        </h3>
        <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-[var(--color-faint)]">
          {items.length} {items.length === 1 ? "tool" : "tools"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Pill key={item} label={item} index={i} />
        ))}
      </div>

      {/* accent underline lights on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(to right, ${accent.ring}, transparent)` }}
      />
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section
      id="skills"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Tech stack"
    >
      {/* ambient system network behind the grid */}
      <AmbientNetwork nodeCount={20} seed={31} className="opacity-40" intensity={0.45} />

      <div className="container-x relative">
        <SectionHeading index="12" label="Craft" lines={["THE STACK."]} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          Not a checklist. These are the tools I reach for to ship and keep
          production systems alive.
        </motion.p>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <div className="flex items-baseline gap-2">
            <Counter
              value={TOTAL_SKILLS}
              className="font-[family-name:var(--font-display)] text-4xl font-bold text-gradient"
            />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
              technologies
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <Counter
              value={skillCategories.length}
              className="font-[family-name:var(--font-display)] text-4xl font-bold text-gradient"
            />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
              domains
            </span>
          </div>
        </motion.div>

        {/* bento grid: MySQL hero (spans 2) + 10 category cards = balanced 3-col */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured database depth — MySQL as a capability, not a pill */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            style={accentVars(TEAL)}
            className={cn(
              "group surface-card relative flex flex-col justify-between gap-6 overflow-hidden p-8 sm:col-span-2",
              "transition-[transform,border-color,box-shadow] duration-300",
              "hover:-translate-y-1 hover:border-[color:var(--acc)]",
              "hover:shadow-[0_24px_60px_-30px_var(--acc-glow)]",
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
              style={{ background: TEAL.glow }}
            />
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{ borderColor: "var(--color-line-strong)", background: TEAL.tintBg, color: TEAL.soft }}
              >
                <Database className="h-7 w-7" aria-hidden />
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                    {mysqlDepth.name}
                  </h3>
                  <span className="rounded-full border border-[var(--color-line-strong)] px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-teal-soft)]">
                    Deep dive
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
                  database engineering
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {mysqlDepth.capabilities.map((c, i) => (
                <Pill key={c} label={c} index={i} />
              ))}
            </div>

            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: `linear-gradient(to right, ${TEAL.ring}, transparent)` }}
            />
          </motion.div>

          {skillCategories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              icon={ICONS[cat.id] ?? CodeXml}
              title={cat.title}
              items={cat.items}
              index={i}
              accent={ACCENTS[i % 2]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
