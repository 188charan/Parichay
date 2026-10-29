"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectDetails } from "@/data/detailPages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

/**
 * Projects showcase — compact, clickable previews. The first project (the AI
 * Dynamic Form Intelligence System) is featured larger; each card links to a
 * dedicated page with the full breakdown. Keeps the homepage scannable while
 * preserving every detail one click away.
 */
export function ProjectsShowcase() {
  return (
    <section
      id="projects"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Projects"
    >
      {/* Ambient teal glow — the AI/projects laboratory act */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,176,0.1), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading index="06" label="Projects" lines={["THINGS I'VE BUILT"]} gradient />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          A selection of systems built outside production work — from AI document
          intelligence to biometric verification. Open any project for the full
          architecture and walkthrough.
        </motion.p>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projectDetails.map((p, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: i * 0.1, duration: 0.6, ease: easeOutExpo }}
                className={cn(featured && "lg:col-span-3")}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className={cn(
                    "surface-card group relative flex h-full flex-col overflow-hidden p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--color-line-strong)]",
                    featured &&
                      "border-[rgba(32,201,176,0.25)] lg:flex-row lg:items-center lg:gap-10 lg:p-10",
                  )}
                >
                  {featured && (
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-[90px]"
                      style={{ background: "radial-gradient(circle, rgba(32,201,176,0.14), transparent 70%)" }}
                      aria-hidden
                    />
                  )}

                  <div className={cn("relative flex flex-col gap-4", featured && "lg:flex-1")}>
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider">
                        <span className="text-[var(--color-primary)]">{p.index}</span>
                        <span className="text-[var(--color-faint)]">{p.theme}</span>
                      </span>
                      {featured && (
                        <span className="rounded-full border border-[rgba(32,201,176,0.3)] bg-[rgba(32,201,176,0.07)] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-teal-soft)]">
                          Featured
                        </span>
                      )}
                    </span>

                    <h3
                      className={cn(
                        "font-[family-name:var(--font-display)] font-semibold leading-tight text-[var(--color-ink)]",
                        featured ? "text-2xl md:text-3xl" : "text-xl",
                      )}
                    >
                      {p.title}
                    </h3>

                    <p
                      className={cn(
                        "leading-relaxed text-[var(--color-muted)]",
                        featured ? "max-w-xl text-base" : "text-sm",
                      )}
                    >
                      {p.blurb}
                    </p>

                    {p.stack && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-primary-soft)] transition-colors group-hover:text-[var(--color-teal-soft)]",
                      featured && "lg:mt-0 lg:shrink-0",
                    )}
                  >
                    View project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
