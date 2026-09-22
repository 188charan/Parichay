"use client";

import { motion } from "motion/react";
import { ShieldCheck, Users, Building2, Lock } from "lucide-react";
import { rbac } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

const purposeIcons = [Building2, Users, Lock];

/**
 * RBAC admin panel — rendered as a miniature admin dashboard inside the
 * portfolio, reinforcing "access should be designed, not assumed".
 */
export function RBACPanel() {
  return (
    <section
      id="rbac"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="RBAC admin panel case study"
    >
      <div className="container-x">
        <SectionHeading
          index={rbac.index}
          label="Case study — Access control"
          lines={rbac.headline}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          {/* Left: description */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[var(--color-teal)]" aria-hidden />
              <Tag tone="teal">{rbac.tech}</Tag>
            </div>
            <div>
              <p className="eyebrow mb-4">Highlights</p>
              <ul className="flex flex-col gap-4">
                {rbac.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={inViewOnce}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: easeOutExpo }}
                    className="flex items-center gap-3 text-[var(--color-ink)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" aria-hidden />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: mini admin dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="surface-card overflow-hidden"
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-danger)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-warn)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-teal)]" />
              <span className="ml-3 font-mono text-xs text-[var(--color-faint)]">
                admin · access-control
              </span>
            </div>

            {/* body: managed resources + permission matrix */}
            <div className="p-6">
              <p className="eyebrow mb-4">Managing</p>
              <div className="grid grid-cols-3 gap-3">
                {rbac.purpose.map((p, i) => {
                  const Icon = purposeIcons[i] ?? Lock;
                  return (
                    <div
                      key={p}
                      className="flex flex-col items-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-4 text-center"
                    >
                      <Icon className="h-4 w-4 text-[var(--color-primary-soft)]" aria-hidden />
                      <span className="text-xs text-[var(--color-muted)]">{p}</span>
                    </div>
                  );
                })}
              </div>

              {/* permission matrix mock */}
              <div className="mt-6 overflow-hidden rounded-lg border border-[var(--color-line)]">
                {["Admin", "Partner", "Support"].map((role, r) => (
                  <div
                    key={role}
                    className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3 last:border-b-0"
                  >
                    <span className="font-mono text-xs text-[var(--color-ink)]">{role}</span>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((c) => {
                        // Deterministic granted/denied pattern per role.
                        const granted = (r + c) % 3 !== 0;
                        return (
                          <span
                            key={c}
                            className="h-2.5 w-6 rounded-full"
                            style={{
                              background: granted
                                ? "var(--color-teal)"
                                : "rgba(139,149,167,0.2)",
                            }}
                            aria-hidden
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
