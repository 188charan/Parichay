"use client";

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Users, Building2, Lock, Check, Minus } from "lucide-react";
import { rbac } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const purposeIcons = [Building2, Users, Lock];

/** Permission model driving the interactive matrix. */
const PERMISSIONS = ["Read", "Write", "Delete", "Manage"] as const;
const ROLES: { name: string; grants: boolean[] }[] = [
  { name: "Admin", grants: [true, true, true, true] },
  { name: "Operator", grants: [true, true, false, false] },
  { name: "Viewer", grants: [true, false, false, false] },
];

/**
 * RBAC admin panel — rendered as a miniature admin dashboard inside the
 * portfolio, reinforcing "access should be designed, not assumed".
 */
export function RBACPanel() {
  // Which role row is currently focused (hover/tap). Default: Admin.
  const [activeRole, setActiveRole] = useState(0);

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

              {/* Interactive permission matrix — hover a role to see its
                  grants illuminate; denied permissions stay muted. */}
              <div className="mt-6 overflow-hidden rounded-lg border border-[var(--color-line)]">
                {/* column header */}
                <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-2">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
                    role
                  </span>
                  <div className="flex gap-3">
                    {PERMISSIONS.map((p) => (
                      <span
                        key={p}
                        className="w-12 text-center font-mono text-[0.6rem] uppercase tracking-wide text-[var(--color-faint)]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {ROLES.map((role, r) => {
                  const isActive = r === activeRole;
                  return (
                    <button
                      key={role.name}
                      type="button"
                      onMouseEnter={() => setActiveRole(r)}
                      onFocus={() => setActiveRole(r)}
                      onClick={() => setActiveRole(r)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-center justify-between border-b border-[var(--color-line)] px-4 py-3 text-left transition-colors last:border-b-0",
                        isActive ? "bg-[rgba(79,140,255,0.06)]" : "hover:bg-[var(--color-elevated)]",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors",
                          isActive ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]",
                        )}
                      >
                        {role.name}
                      </span>
                      <div className="flex gap-3">
                        {role.grants.map((granted, c) => (
                          <span
                            key={c}
                            className={cn(
                              "flex h-5 w-12 items-center justify-center rounded-full transition-all duration-300",
                              granted
                                ? isActive
                                  ? "bg-[rgba(32,201,176,0.18)] text-[var(--color-teal-soft)]"
                                  : "bg-[rgba(32,201,176,0.08)] text-[var(--color-teal)]"
                                : "bg-[rgba(139,149,167,0.08)] text-[var(--color-faint)]",
                            )}
                          >
                            {granted ? (
                              <Check className="h-3 w-3" aria-hidden />
                            ) : (
                              <Minus className="h-3 w-3" aria-hidden />
                            )}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[0.65rem] text-[var(--color-faint)]">
                Hover a role to inspect its permissions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
