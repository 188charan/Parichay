import { SectionLabel } from "./SectionLabel";
import { RevealText } from "./Reveal";
import { cn } from "@/lib/cn";

/**
 * Large section headline with an optional engineering label above it.
 * Supports single- or multi-line headlines. Headlines use the display font.
 */
export function SectionHeading({
  index,
  label,
  lines,
  className,
  gradient = false,
}: {
  index?: string;
  label?: string;
  lines: readonly string[];
  className?: string;
  gradient?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {label ? <SectionLabel index={index}>{label}</SectionLabel> : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-display)] font-semibold leading-[1.02] tracking-tight",
          "text-4xl sm:text-5xl md:text-6xl",
          gradient && "text-gradient",
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <RevealText text={line} stagger={0.05} />
          </span>
        ))}
      </h2>
    </div>
  );
}
