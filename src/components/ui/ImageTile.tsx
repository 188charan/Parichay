"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * An image that degrades gracefully. If the file isn't present yet (or fails to
 * load), it shows an elegant placeholder tile with the caption instead of a
 * broken image — so galleries look intentional before real photos are added.
 *
 * Uses a plain lazy <img> (not next/image) so unconfigured/missing local files
 * never throw; onError swaps to the placeholder.
 */
export function ImageTile({
  src,
  alt,
  caption,
  className,
  imgClassName,
  placeholderLabel,
}: {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  placeholderLabel?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-[var(--color-elevated)]", className)}>
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          {/* subtle technical grid so the placeholder feels designed */}
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
          <ImageOff className="relative h-5 w-5 text-[var(--color-faint)]" aria-hidden />
          <span className="relative font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-faint)]">
            {placeholderLabel ?? caption ?? "photo coming soon"}
          </span>
        </div>
      )}

      {caption && show && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-ink)]">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}
