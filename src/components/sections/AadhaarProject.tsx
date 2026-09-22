"use client";

import { motion } from "motion/react";
import { ScanFace, AudioLines } from "lucide-react";
import { aadhaar } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { Tag } from "@/components/ui/Tag";
import { inViewOnce, easeOutExpo } from "@/lib/motionPresets";

/**
 * Multimodal identity verification — two parallel biometric pipelines (face +
 * voice) converging into a single verification decision.
 */
export function AadhaarProject() {
  return (
    <section
      id="aadhaar"
      data-tier="supporting"
      className="section relative overflow-hidden border-t border-[var(--color-line)]"
      aria-label="AI Aadhaar verification project"
    >
      <div className="container-x">
        <SectionHeading index="10" label="Project — Identity" lines={[aadhaar.title]} gradient />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">{aadhaar.project}.</span>{" "}
          {aadhaar.summary}
        </p>

        {/* Two parallel modalities */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <ModalityColumn
            icon={<ScanFace className="h-5 w-5" aria-hidden />}
            label={aadhaar.face.label}
            tech={aadhaar.face.tech}
            match={aadhaar.face.match}
            flow={aadhaar.face.flow}
          />
          <ModalityColumn
            icon={<AudioLines className="h-5 w-5" aria-hidden />}
            label={aadhaar.voice.label}
            tech={aadhaar.voice.tech}
            match={aadhaar.voice.match}
            flow={aadhaar.voice.flow}
          />
        </div>

        {/* Convergence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-10 rounded-2xl border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.05)] p-8 text-center"
        >
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide text-gradient md:text-2xl">
            {aadhaar.combined}
          </p>
        </motion.div>

        {/* Stack */}
        <div className="mt-10 flex flex-wrap gap-2">
          {aadhaar.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModalityColumn({
  icon,
  label,
  tech,
  match,
  flow,
}: {
  icon: React.ReactNode;
  label: string;
  tech: string;
  match: string;
  flow: readonly string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="surface-card flex flex-col gap-6 p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line-strong)] bg-[rgba(79,140,255,0.06)] text-[var(--color-primary-soft)]">
            {icon}
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide text-[var(--color-ink)]">
            {label}
          </span>
        </div>
        <div className="text-right">
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-teal-soft)]">
            ~{match}
          </div>
          <div className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
            reported match
          </div>
        </div>
      </div>

      <Tag tone="primary" className="w-fit">
        {tech}
      </Tag>

      <FlowDiagram
        nodes={flow.map((label, i) => ({
          label,
          emphasis: i === 0 ? "start" : i === flow.length - 1 ? "success" : "process",
        }))}
        orientation="vertical"
      />
    </motion.div>
  );
}
