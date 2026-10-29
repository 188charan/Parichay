"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Footer } from "@/components/layout/Footer";
import { DetailRenderer } from "@/components/detail/DetailRenderer";
import { systemDetails, projectDetails, type DetailMeta } from "@/data/detailPages";
import { profile } from "@/data/profile";
import { easeOutExpo } from "@/lib/motionPresets";

interface DetailShellProps {
  kind: "systems" | "projects";
  slug: string;
}

/**
 * Chrome around a single detail page: a slim top bar with a "back" control,
 * the full section (via DetailRenderer), and a "more" rail linking to the
 * sibling detail pages so visitors can keep exploring without returning home.
 */
export function DetailShell({ kind, slug }: DetailShellProps) {
  const siblings = kind === "systems" ? systemDetails : projectDetails;
  const current = siblings.find((d) => d.slug === slug);
  const others = siblings.filter((d) => d.slug !== slug);

  const backHref = kind === "systems" ? "/#spense" : "/#projects";
  const backLabel = kind === "systems" ? "Production systems" : "Projects";
  const kindLabel = kind === "systems" ? "Production system" : "Project";

  return (
    <SmoothScrollProvider>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[rgba(8,11,18,0.72)] backdrop-blur-md">
        <div className="container-x flex items-center justify-between py-4">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-soft)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            Back to {backLabel.toLowerCase()}
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[var(--color-ink)]"
          >
            {profile.name}
          </Link>
        </div>
      </header>

      <main id="main">
        {/* Breadcrumb header — context without repeating the section's headline */}
        <div className="container-x pt-14 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider"
          >
            <span className="text-[var(--color-primary)]">{current?.index}</span>
            <span className="h-px w-8 bg-[var(--color-line-strong)]" aria-hidden />
            <span className="text-[var(--color-faint)]">
              {kindLabel} · {current?.theme}
            </span>
          </motion.div>
        </div>

        {/* The full section */}
        <DetailRenderer slug={slug} />

        {/* More from this collection */}
        {others.length > 0 && (
          <section className="section border-t border-[var(--color-line)]">
            <div className="container-x">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
                More {backLabel.toLowerCase()}
              </h2>
              <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
                {others.map((d: DetailMeta) => (
                  <li key={d.slug}>
                    <Link
                      href={`/${kind}/${d.slug}`}
                      className="group flex h-full flex-col gap-3 bg-[var(--color-surface)] p-6 transition-colors hover:bg-[var(--color-elevated)]"
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[var(--color-primary)]">
                          {d.index}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[var(--color-faint)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-primary)]" aria-hidden />
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
                        {d.title}
                      </span>
                      <span className="mt-auto text-sm leading-snug text-[var(--color-muted)]">
                        {d.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
