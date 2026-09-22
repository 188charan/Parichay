"use client";

import { motion } from "motion/react";
import {
  FileText,
  CheckSquare,
  PenLine,
  ShieldCheck,
  Hash,
  Filter,
  Copy,
  Code2,
  MapPin,
} from "lucide-react";
import {
  aiSystem,
  agents,
  guardrails,
  guardrailsTagline,
  aiArchitecture,
} from "@/data/aiSystem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";
import { cn } from "@/lib/cn";

const agentIcons = [FileText, CheckSquare, PenLine, ShieldCheck];
const guardrailIcons = [Hash, Filter, Copy, Code2, MapPin];

/**
 * AI Dynamic Form Intelligence System.
 * Four connected parts: the thesis + pipeline, the four-agent architecture,
 * the engineering guardrails, and the full top-to-bottom system diagram.
 * Communicates "AI engineering ≠ just API calls".
 */
export function AISystem() {
  return (
    <section
      id="ai"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="AI Dynamic Form Intelligence System"
    >
      {/* Ambient teal glow — this is the AI "laboratory" act */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,176,0.12), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading index="09" label="AI systems" lines={aiSystem.headline} gradient />

        <div className="mt-10 max-w-2xl">
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            <span className="font-medium text-[var(--color-ink)]">{aiSystem.name}.</span>{" "}
            {aiSystem.problem} {aiSystem.summary}
          </p>
        </div>

        {/* High-level pipeline */}
        <div className="mt-14">
          <p className="eyebrow mb-6">Pipeline</p>
          <FlowDiagram
            nodes={aiSystem.pipeline.map((label, i) => ({
              label,
              emphasis:
                i === 0
                  ? "start"
                  : i === aiSystem.pipeline.length - 1
                    ? "success"
                    : "process",
            }))}
            orientation="horizontal"
          />
        </div>

        {/* Four-agent architecture */}
        <div className="mt-24">
          <p className="eyebrow mb-8">Four-agent architecture — parallel where appropriate</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent, i) => {
              const Icon = agentIcons[i] ?? FileText;
              const isValidator = agent.id === "validator";
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: easeOutExpo }}
                  className={cn(
                    "surface-card relative flex flex-col gap-4 p-6",
                    isValidator && "border-[rgba(32,201,176,0.35)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border",
                      isValidator
                        ? "border-[rgba(32,201,176,0.4)] bg-[rgba(32,201,176,0.08)] text-[var(--color-teal-soft)]"
                        : "border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] text-[var(--color-primary-soft)]",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-wider text-[var(--color-faint)]">
                      Agent {i + 1}
                    </p>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                      {agent.name}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{agent.role}</p>
                  </div>

                  {/* animated parallel-processing indicator on the 3 extractors */}
                  {!isValidator && (
                    <div className="mt-auto flex gap-1" aria-hidden>
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1 w-1 rounded-full bg-[var(--color-primary)]"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: d * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Guardrails */}
        <div className="mt-24">
          <p className="eyebrow mb-2">Engineering guardrails</p>
          <p className="mb-8 font-[family-name:var(--font-display)] text-2xl font-semibold text-gradient md:text-3xl">
            {guardrailsTagline}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guardrails.map((g, i) => {
              const Icon = guardrailIcons[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: easeOutExpo }}
                  className="flex gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-line-strong)]"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-[var(--color-teal)]" aria-hidden />
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)]">{g.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                      {g.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full system architecture diagram */}
        <AIArchitectureDiagram />
      </div>
    </section>
  );
}

/**
 * Full architecture: linear intake -> parallel agents -> post-processing chain,
 * with MongoDB + SHA-256 cache shown as supporting infrastructure.
 */
function AIArchitectureDiagram() {
  return (
    <div className="mt-24">
      <p className="eyebrow mb-8">System architecture</p>
      <div className="surface-card grid gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-col gap-8">
          {/* Linear intake */}
          <FlowDiagram
            nodes={aiArchitecture.linear.map((label, i) => ({
              label,
              emphasis: i === 0 ? "start" : "process",
            }))}
            orientation="vertical"
          />

          {/* Parallel agents row */}
          <div>
            <p className="mb-3 font-mono text-xs text-[var(--color-faint)]">
              parallel agents
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {aiArchitecture.agents.map((a) => (
                <div
                  key={a}
                  className="rounded-lg border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] px-4 py-3 text-center text-sm text-[var(--color-ink)]"
                >
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Post-processing chain */}
          <FlowDiagram
            nodes={aiArchitecture.postAgents.map((label, i) => ({
              label,
              emphasis: i === aiArchitecture.postAgents.length - 1 ? "success" : "process",
            }))}
            orientation="vertical"
          />
        </div>

        {/* Supporting infrastructure */}
        <aside className="flex flex-row gap-4 lg:flex-col lg:border-l lg:border-[var(--color-line)] lg:pl-8">
          <p className="hidden font-mono text-xs text-[var(--color-faint)] lg:block">
            supporting infra
          </p>
          {aiArchitecture.supporting.map((s) => (
            <div
              key={s}
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-6 text-center font-mono text-sm text-[var(--color-teal-soft)] lg:flex-none"
            >
              {s}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
