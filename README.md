# Parichay — Charan N N Portfolio

A cinematic, scroll-driven engineering portfolio built around real production
fintech and AI systems. Dark midnight theme, interactive architecture diagrams,
smooth-scroll storytelling.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · GSAP + ScrollTrigger · Lenis · lucide-react. Static site, no backend.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm run lint
```

## Adding your links (important)

Social/profile URLs are intentionally left as placeholders so no fake links
ship. Edit **`src/data/profile.ts`** → `contact.links` and fill in the `href`
for GitHub, LinkedIn, and LeetCode. Any link with an empty `href` renders as a
visible "link coming soon" placeholder until you add the URL.

Drop your CV at **`public/resume.pdf`** to activate the Resume link.

## Content

All copy lives in typed data files under `src/data/` — update those to change
content without touching components:

- `profile.ts` — identity, contact, links
- `metrics.ts` — hero engineering outcomes
- `experience.ts` — journey timeline, Spense, Nokia
- `caseStudies.ts` — the seven Spense case studies
- `aiSystem.ts` — AI form-intelligence system, agents, guardrails
- `projects.ts` — Aadhaar verification, Annamrutha
- `skills.ts` · `dsa.ts` · `philosophy.ts` · `nav.ts`

## Structure

```
src/
  app/            layout, page, sitemap, robots, global styles
  components/
    sections/     one component per portfolio section (the acts)
    layout/       smooth scroll, progress rail, footer
    ui/           reusable primitives (FlowDiagram, Counter, etc.)
    hero/         2D canvas hero background
  data/           all content (typed)
  lib/            gsap setup, motion presets, hooks, helpers
```

## Notes

- Fully static — deploy on Vercel (or any static host). HTTPS + security
  headers are configured in `next.config.ts`.
- Respects `prefers-reduced-motion`: heavy animations degrade to static.
- The hero uses a 2D canvas node field; the architecture is modular so a
  Three.js / React Three Fiber hero can be added later if desired.
