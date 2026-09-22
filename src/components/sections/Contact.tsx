"use client";

import { motion } from "motion/react";
import { Mail, Code2, FileText, ArrowUpRight } from "lucide-react";
import { contact } from "@/data/profile";
import { contactSection } from "@/data/philosophy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ConvergenceLines } from "@/components/viz/ConvergenceLines";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

// Icons accept a className; both lucide icons and the inline brand glyphs match.
type IconComponent = React.ComponentType<{ className?: string }>;

const linkIcons: Record<string, IconComponent> = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  leetcode: Code2,
  resume: FileText,
};

/**
 * Contact — direct links only (no form). Any link whose href is an empty
 * placeholder is skipped so unconfigured social URLs never render as dead
 * links. The phone number lives only in the footer, kept understated.
 */
export function Contact() {
  // All channels are shown. Links with a real href are interactive; those left
  // as placeholders render in a clearly inactive state (so unconfigured social
  // URLs are visibly "add later" rather than dead or hidden).
  const links = contact.links;

  return (
    <section
      id="contact"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="Contact"
    >
      {/* Closing ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.12), transparent 70%)" }}
        aria-hidden
      />

      {/* Reverse of the hero: many connections converge to one identity */}
      <ConvergenceLines className="opacity-60" />

      <div className="container-x relative">
        <SectionHeading index="16" label="Get in touch" lines={contactSection.headline} gradient />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--color-muted)]"
        >
          {contactSection.supporting}
        </motion.p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, i) => {
            const Icon = linkIcons[link.key] ?? ArrowUpRight;
            const hasHref = link.href.trim().length > 0;
            const external = link.href.startsWith("http") || link.key === "resume";

            const inner = (
              <>
                <span className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-lg border transition-colors",
                      hasHref
                        ? "border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] text-[var(--color-primary-soft)] group-hover:text-[var(--color-teal-soft)]"
                        : "border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-faint)]",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={cn(
                        "font-[family-name:var(--font-display)] text-lg font-medium",
                        hasHref ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]",
                      )}
                    >
                      {link.label}
                    </span>
                    {!hasHref && (
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
                        link coming soon
                      </span>
                    )}
                  </span>
                </span>
                {hasHref && (
                  <ArrowUpRight
                    className="h-5 w-5 text-[var(--color-faint)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-primary)]"
                    aria-hidden
                  />
                )}
              </>
            );

            const commonMotion = {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: inViewOnce,
              transition: { delay: i * 0.08, duration: 0.5, ease: easeOutExpo },
            };

            // Interactive link vs. inactive placeholder.
            return hasHref ? (
              <motion.a
                key={link.key}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                {...commonMotion}
                className="surface-card group flex items-center justify-between p-6 transition-colors hover:border-[var(--color-line-strong)]"
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={link.key}
                {...commonMotion}
                aria-disabled="true"
                className="surface-card group flex items-center justify-between p-6 opacity-60"
              >
                {inner}
              </motion.div>
            );
          })}
        </div>

        {/* Direct email, spelled out for quick copy */}
        <motion.a
          href={`mailto:${contact.email}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6 }}
          className="mt-12 inline-block font-mono text-sm text-[var(--color-muted)] underline decoration-[var(--color-line-strong)] underline-offset-4 transition-colors hover:text-[var(--color-primary-soft)]"
        >
          {contact.email}
        </motion.a>
      </div>
    </section>
  );
}
