import { cn } from "@/lib/cn";

/**
 * Monospace engineering label, e.g. "01 / MIGRATION".
 * Includes a short accent tick to reinforce the technical, diagram-like motif.
 */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-[var(--color-line-strong)]" aria-hidden />
      <span className="eyebrow">
        {index ? <span className="text-[var(--color-primary)]">{index} / </span> : null}
        {children}
      </span>
    </div>
  );
}
