import { cn } from "@/lib/cn";

/**
 * Small pill used for tech tokens, highlights, and metadata.
 */
export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "primary" | "teal";
  className?: string;
}) {
  const tones = {
    default:
      "border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-surface)]",
    primary:
      "border-[var(--color-line-strong)] text-[var(--color-primary-soft)] bg-[rgba(79,140,255,0.08)]",
    teal: "border-[rgba(32,201,176,0.3)] text-[var(--color-teal-soft)] bg-[rgba(32,201,176,0.07)]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
