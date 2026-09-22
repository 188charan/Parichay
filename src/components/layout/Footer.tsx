import { profile, contact } from "@/data/profile";

/**
 * Footer — minimal. Carries the understated phone number and a quiet closing
 * signature. No heavy chrome.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] py-12">
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {profile.title} · {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm md:items-end">
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-soft)]"
          >
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="font-mono text-[var(--color-faint)] transition-colors hover:text-[var(--color-muted)]"
          >
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="container-x mt-10">
        <div className="hairline" />
        <p className="mt-6 font-mono text-xs text-[var(--color-faint)]">
          © {year} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
