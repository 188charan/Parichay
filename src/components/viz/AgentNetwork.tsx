"use client";

import { useVizActive } from "@/lib/useVizActive";
import { cn } from "@/lib/cn";

/**
 * AI signature visual — agent network.
 *
 * PDF fans out to parallel extraction agents (blue pulses travel each path in
 * parallel), which converge into the validator; the validator + output read
 * teal to signal successful convergence. No brain/neural cliché — this is an
 * engineering data-flow graph. Pure SVG + CSS, gated off-screen.
 */
const AGENTS = [
  { label: "Text", x: 55 },
  { label: "Checkbox", x: 160 },
  { label: "Date / Sign", x: 265 },
];

function Node({
  x,
  y,
  label,
  tone = "primary",
}: {
  x: number;
  y: number;
  label: string;
  tone?: "primary" | "teal" | "muted";
}) {
  const w = 74;
  const h = 22;
  const stroke =
    tone === "teal"
      ? "rgba(32,201,176,0.5)"
      : tone === "muted"
        ? "var(--color-line-strong)"
        : "rgba(79,140,255,0.5)";
  const fill =
    tone === "teal" ? "rgba(32,201,176,0.08)" : "rgba(79,140,255,0.06)";
  const text =
    tone === "teal" ? "var(--color-teal-soft)" : "var(--color-primary-soft)";
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={0.8} />
      <text x={x} y={y + 2.5} textAnchor="middle" fontSize={8} fontFamily="var(--font-mono)" fill={text}>
        {label}
      </text>
    </g>
  );
}

function PulseLine({
  x1,
  y1,
  x2,
  y2,
  delay,
  tone = "primary",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  tone?: "primary" | "teal";
}) {
  const color = tone === "teal" ? "var(--color-teal)" : "var(--color-primary)";
  const len = Math.round(Math.hypot(x2 - x1, y2 - y1) * 1000) / 1000;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(122,168,255,0.16)" strokeWidth={0.8} />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        data-viz=""
        style={{
          strokeDasharray: `6 ${len}`,
          ["--viz-dash" as string]: String(len + 6),
          animation: `viz-dash-flow 2.2s linear ${delay}s infinite`,
        }}
      />
    </g>
  );
}

export function AgentNetwork({ className }: { className?: string }) {
  const { ref, active } = useVizActive<HTMLDivElement>();
  const pdf = { x: 160, y: 22 };
  const agentY = 92;
  const validator = { x: 160, y: 150 };
  const output = { x: 160, y: 188 };

  return (
    <div ref={ref} data-active={active} className={cn("w-full", className)}>
      <svg viewBox="0 0 320 210" className="h-full w-full" role="img" aria-label="AI agent data-flow: PDF to parallel agents to validator to output">
        {/* PDF -> agents (parallel, same timing) */}
        {AGENTS.map((a) => (
          <PulseLine key={`in-${a.label}`} x1={pdf.x} y1={pdf.y + 11} x2={a.x} y2={agentY - 11} delay={0} />
        ))}
        {/* agents -> validator (converge, slightly later) */}
        {AGENTS.map((a) => (
          <PulseLine key={`out-${a.label}`} x1={a.x} y1={agentY + 11} x2={validator.x} y2={validator.y - 11} delay={1} tone="teal" />
        ))}
        {/* validator -> output */}
        <PulseLine x1={validator.x} y1={validator.y + 11} x2={output.x} y2={output.y - 11} delay={1.6} tone="teal" />

        {/* nodes */}
        <Node x={pdf.x} y={pdf.y} label="PDF" tone="muted" />
        {AGENTS.map((a) => (
          <Node key={a.label} x={a.x} y={agentY} label={a.label} />
        ))}
        <Node x={validator.x} y={validator.y} label="Validator" tone="teal" />
        <Node x={output.x} y={output.y} label="Output" tone="teal" />
      </svg>
    </div>
  );
}
