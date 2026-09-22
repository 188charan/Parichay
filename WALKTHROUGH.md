# Parichay — Full Walkthrough

A complete, section-by-section description of the portfolio: what the visitor
sees, what content appears, and exactly how each part animates. This follows the
site top to bottom, in the same order a visitor scrolls through it.

> **Site-wide behavior (applies everywhere)**
>
> - **Smooth scrolling (Lenis):** the whole page scrolls with a soft, weighted
>   easing rather than the browser's default jumpy scroll. This makes every
>   scroll-linked animation feel cinematic.
> - **Progress rail (navigation):** a fixed navigation that tracks your position.
>   On desktop it's a vertical rail on the right edge; on mobile it's a slim top
>   bar plus a compact "act counter". Details in the last section below.
> - **Reduced motion:** if your device/OS has "reduce motion" enabled, all heavy
>   animations are replaced with instant, static versions — nothing is lost, it
>   just appears without movement.
> - **Theme:** dark midnight background (`#080B12`), off-white text, blue
>   (`#4F8CFF`) as the primary accent, teal (`#20C9B0`) used sparingly for
>   "flow / success / positive" states. Display font is Space Grotesk; body font
>   is Inter; small technical labels are monospace.
> - **Entrance pattern:** most blocks start slightly faded and shifted down, then
>   fade + rise into place the first time they enter the viewport (once only).

---

## 0. Hero — "Intro"

**What you see:** A full-screen opening. Your location ("Bengaluru, India") sits
as a small mono label at the top. Below it, the headline stacks in three lines:

- **CHARAN N N** (largest)
- **FULL STACK DEVELOPER** (muted)
- **FINTECH × AI × SYSTEMS** (blue→teal gradient text)

Under that, the tagline: *"Building production systems that move data, money, and
decisions."* At the bottom-center, a "Scroll to explore ↓" indicator.

**Background:** a live 2D canvas "engineering environment" — a faint technical
grid, softly drifting particle nodes, thin blue lines connecting nearby nodes,
and occasional teal pulses that travel along the connections like data moving
through a network. A subtle radial darkening keeps the text readable.

**How it animates:**

- On load, each headline line slides up from behind an invisible mask, one after
  another (name → title → positioning), so the identity "builds" in.
- The tagline fades and rises in after the headline.
- The scroll indicator's arrow gently bobs up and down on a loop.
- The background nodes drift continuously; lines fade in/out based on distance
  between nodes; the whole field parallaxes slightly toward your mouse.
- The canvas pauses itself when scrolled out of view (performance) and renders a
  single static frame under reduced motion.

---

## 1. Metrics — "Outcomes" (index 00)

**What you see:** A row of five engineering outcomes, presented as proof points
(not marketing stats). Each is a large number with a short label:

- **10K+** — Live cardholders migrated
- **~0** — MTTD for critical production incidents
- **30%** — API latency reduction
- **40%** — Faster partner onboarding
- **1,200+** — DSA problems solved

Each number sits above a short accent tick and its description.

**How it animates:**

- The section is introduced by a mono label ("Engineering outcomes").
- As the row scrolls into view, the five items stagger in one by one (fade +
  rise).
- Each number **counts up** from zero to its final value with a decelerating
  ease, so it feels like a readout settling. The "1,200+" uses a thousands
  separator. Under reduced motion the final numbers appear instantly.

---

## 2. What I Do — "Thesis" (index 01)

**What you see:** A giant gradient headline **"I BUILD SYSTEMS."** followed by a
grid of six capability statements:

- Production Backends
- Fintech Integrations
- AI-Powered Systems
- Performance-Optimized APIs
- Data-Driven Dashboards
- Automation & Observability

Each is numbered (01–06) in mono, like a spec list.

**How it animates:**

- The big headline drifts slowly sideways as you scroll through the section
  (scroll-linked parallax), giving it a cinematic sense of motion.
- The six statements stagger in as the grid enters view.
- Hovering a statement lights up a blue→teal underline that sweeps across it.

---

## 3. Engineering Journey — "Journey" (index 02)

**What you see:** Your career arc as three stops:

- **2021–2025** — B.E. Information Science & Engineering, Siddaganga Institute of
  Technology (CGPA 9.03/10) — tagged *Education*
- **Aug 2024–Feb 2025** — Intern, Full Stack Developer, Nokia Networks — tagged
  *Internship*
- **Mar 2025–Present** — Software Engineer, Spense Reliable Fintech Solutions —
  tagged *Production Engineering*

Each stop is a card with a color-coded dot (grey → blue → teal), the period, the
role, the org, and a large faded stage number (01/02/03).

**How it animates:**

- **Desktop:** this is a signature moment. The section *pins* (sticks) to the
  screen and the three cards scroll **horizontally** as you scroll down — you
  literally move forward through time from education to production engineering,
  with arrow connectors between cards. Driven by GSAP ScrollTrigger.
- **Mobile / reduced motion:** it gracefully becomes a normal vertical stack of
  the same cards (no pinning, no horizontal scroll, no clipping).
- Each card fades + rises as it appears.

---

## 4. Spense Intro — "Production" (index 03)

**What you see:** The opener for the most important act. A gradient headline
**"BUILDING PRODUCTION FINTECH SYSTEMS"** and the line *"At Spense, I work across
the complete delivery lifecycle — from BRD analysis to production sign-off."*

Then the **delivery lifecycle** as a connected chain of ten stages:
BRD → Feasibility → Architecture → Backend → Frontend → Database → QA → UAT →
Production → Post-production validation.

Then **stakeholders** you work with as pills: Bank partners, M2P engineering,
Clients, Internal stakeholders.

**How it animates:**

- A soft blue glow sits behind the section to mark the start of the core act.
- The headline reveals word-by-word (each word rises from behind a mask).
- The ten lifecycle stages pop in one after another with arrows between them.
- The stakeholder pills fade in.

---

## 5. Migration Case Study — flagship (index 01 of case studies)

**What you see:** The largest section on the site. A giant two-line statement:

- **10,000 USERS.** (white)
- **ZERO DOWNTIME.** (gradient)

Subtitle: **VISA → RuPay Card Migration**. Then a two-column layout:

- **Left:** the problem (≈10,000 live VISA cardholders migrated to RuPay, no
  prior tooling, had to preserve experience + FD details); the engineering
  context (profiles recovered via bank APIs using CIF numbers, entity IDs, FD
  account numbers; M2P supplied identifiers; fault-tolerant multi-step cron
  pipeline); and a **coordination row** showing M2P ↔ Bank ↔ Spense.
- **Right:** the **migration pipeline** as a vertical flow of nine steps —
  User consent → Identify user → Retrieve missing profile info → Bank API
  queries → Block VISA card → Close existing account → Provision RuPay card →
  Preserve FD details → Validate migration (last step highlighted teal).

Below: two result cards — **~10,000** live users migrated, **Zero** downtime —
and the closing note that the experience stayed consistent with fresh onboarding.

**How it animates:**

- The two headline lines slide up from behind masks.
- The subtitle fades in after.
- Left-column context bullets slide in from the left, staggered.
- The coordination nodes (M2P/Bank/Spense) pop in with ↔ links.
- The pipeline: each node fades + scales in top to bottom, and a blue pulse
  travels down each connector to show data flowing through the pipeline.
- The two result cards rise in.

---

## 6. Incident Response (index 02)

**What you see:** Headline **"WHEN PRODUCTION BREAKS, / THE SYSTEM RESPONDS."**
and a short summary. Then two side-by-side tiers:

- **Tier 1 — Automated Detection** (blue dot): Cron job → Mail logs + failures
  table → Calculate live API failure rate → Threshold breached? → Dispatch logs
  to POC. Note: *Default threshold: 10%*.
- **Tier 2 — Critical Escalation** (red dot): Critical DB failure → Twilio →
  Voice call → 5-person on-call rotation.

Closes with a large gradient outcome: **MTTD → NEAR ZERO**.

**How it animates:**

- Headline reveals word-by-word.
- The two tier cards rise in (Tier 2 slightly after Tier 1).
- Inside each card, the flow nodes stagger in with pulses traveling along the
  connectors.
- The final "MTTD → NEAR ZERO" scales up into place.

---

## 7. Performance Case Study (index 03)

**What you see:** Gradient headline **"30% FASTER."** and a two-column layout:

- **Left:** two comparison bars — **Before** (full width, muted) and **After**
  (shorter, blue→teal gradient) — with a note clarifying this is a relative
  comparison and no absolute millisecond values are claimed.
- **Right:** the optimization path as a vertical flow — High-traffic API
  endpoints → Structured routing → MySQL query optimization → Improved API
  performance → 30% latency reduction (last highlighted teal).

**How it animates:**

- The bars grow from zero width to their respective widths (the "After" bar
  visibly shorter), making the improvement obvious at a glance.
- The optimization flow nodes stagger in with connector pulses.

---

## 8. Partner Journey (index 04)

**What you see:** Gradient headline **"40% FASTER PARTNER ONBOARDING"** and the
problem (hardcoded partner flows replaced by a configuration-driven, multi-tenant
journey engine). Two side-by-side flows:

- **Before — hardcoded** (dimmed): Partner → Engineering change → Deployment →
  New journey.
- **After — configuration-driven** (bright card): Partner → Configuration →
  Journey → Launch (highlighted teal).

A result band: **40% reduction in partner time-to-launch**, then highlight pills
(Configuration-driven architecture, Multi-tenancy, Self-service partner journeys,
Reduced engineering dependency).

**How it animates:**

- The two flow cards rise in (old dimmed, new full-strength) so the contrast
  reads immediately.
- Flow nodes stagger with connector pulses.
- The result band and highlight pills fade in.

---

## 9. EMI Case Study (index 05)

**What you see:** Headline **"EMI CONVERSION"** and the note that it's an EMI
module for secured credit card transactions. A four-party transaction chain:
**User ↔ Partner ↔ M2P ↔ Bank** (horizontal on desktop with ↔, vertical with ↕
on mobile). Then two notes: the frontend + backend pipeline were built together,
and adoption was tracked via partner analytics.

**How it animates:**

- Headline reveals word-by-word.
- The four party cards scale in one by one, with the connector symbols fading in
  between them.
- The two note cards stagger in.

---

## 10. RBAC Panel (index 06)

**What you see:** Headline **"ACCESS SHOULD BE DESIGNED, / NOT ASSUMED."** Left
side: a SvelteKit tag and highlights (Granular access control, Bank-grade
security requirements, Role-based permissions). Right side: a **miniature admin
dashboard mock** — a window with colored traffic-light dots and an
"admin · access-control" title, a "Managing" row (Partners / Users / Sensitive
banking data with icons), and a **permission matrix** showing three roles (Admin,
Partner, Support) with rows of granted/denied permission pills.

**How it animates:**

- Headline reveals word-by-word.
- Highlights slide in from the left, staggered.
- The dashboard mock rises in as a unit; the permission pills read as a clean
  granted/denied pattern (teal = granted, grey = denied).

---

## 11. BI Dashboard (index 07)

**What you see:** Gradient headline **"FROM DATA TO DECISIONS"**. Left: a
**dashboard mock** with a toolbar (Tenant ▾, Last 30d ▾, and a pulsing "Live"
badge) and a **conversion funnel** — FD Deposits → Card Issuance → EMI Conversion
— drawn as progressively narrower bars. Right: tech tags (SvelteKit, Chart.js),
a capabilities list (Tenant filters, Time-range filters, Live tracking, Partner
analytics, Internal reporting), and the outcome (eliminated manual reporting for
bank partners and internal leadership).

**How it animates:**

- The "Live" badge dot pulses continuously.
- The funnel bars grow from zero to their widths in sequence, so the funnel
  "fills" top to bottom.
- Capability items stagger in.

---

## 12. Nokia (index 08)

**What you see:** Headline **"BEFORE FINTECH, / THERE WAS NETWORK AUTOMATION."**
Left: Nokia Networks, Intern — Full Stack Developer, Aug 2024–Feb 2025; the tech
stack as tags (React.js, Node.js, MongoDB, Chart.js, Tailwind CSS); and two
contributions (25% faster dashboard reports via API-level caching + error
handling; collaboration with Nokia network engineers to map test-execution
workflows into dashboard views). Right: a large **25%** metric card.

**How it animates:**

- Headline reveals word-by-word.
- Contributions slide in from the left, staggered.
- The **25%** counts up from zero when the metric card scales into view.

---

## 13. AI System (index 09)

The other major highlight. It has four connected parts, with a teal ambient glow
marking this as the "AI laboratory" act.

**Part 1 — Intro + pipeline.** Gradient headline **"BUILDING AI THAT / ACTUALLY
DOES SOMETHING."** with the system name (AI Dynamic Form Intelligence System),
the problem (banking PDFs are hard to process manually), and a summary. Below, a
**horizontal pipeline**: PDF → GPT-4 Vision → Parallel AI Agents → Field
Extraction → Validation → Editable Web Form → Write Answers Back to PDF.

**Part 2 — Four-agent architecture.** Four cards:

- **Text Agent** — extract text fields
- **Checkbox Agent** — extract checkbox / radio fields
- **Date + Signature Agent** — identify dates and signatures
- **Validator Agent** — validate and clean results (styled in teal to set it
  apart)

**Part 3 — Guardrails.** The tagline **"AI ENGINEERING ≠ JUST API CALLS."** and
five cards: SHA-256 Caching, Confidence Filtering, Levenshtein Deduplication,
HTML Sanitization, Coordinate-Aware PDF Writing.

**Part 4 — System architecture.** A full top-to-bottom diagram: the linear
intake (User → React Frontend → Node.js Backend → PDF Processing → GPT-4 Vision),
the three parallel agents row, then the post-processing chain (Validator →
Confidence Filtering → Deduplication → Sanitization → Editable Form → pdf-lib →
Original PDF), with MongoDB and SHA-256 Cache shown as supporting infrastructure
in a side panel.

**How it animates:**

- Headline reveals word-by-word; pipeline nodes stagger horizontally with pulses.
- The four agent cards stagger in. The three extractor agents each show tiny
  **pulsing dots** that indicate parallel processing; the Validator is visually
  distinct.
- Guardrail cards stagger in and highlight their border on hover.
- The architecture diagram assembles top to bottom with connector pulses.

---

## 14. Aadhaar Project — "Projects" (index 10)

**What you see:** Gradient headline **"MULTIMODAL IDENTITY VERIFICATION"** and the
project summary (AI-Based Aadhaar Verification System — biometric auth for users
who can't use fingerprint/retina). Two parallel modality columns:

- **FACE** — FaceNet, ~95% reported match — flow: Camera → OpenCV → FaceNet →
  Face similarity.
- **VOICE** — MFCC + Cosine Similarity, ~92% reported match — flow: Microphone →
  MFCC → Cosine Similarity → Voice verification.

They converge into a highlighted band: **FACE + VOICE → VERIFICATION**. Stack
tags below (Python, Flask, React.js, TensorFlow, OpenCV).

**How it animates:**

- Headline reveals word-by-word.
- The two columns rise in side by side; each has its own vertical flow with node
  stagger + connector pulses.
- The convergence band fades/rises in beneath them.

---

## 15. Annamrutha Project (index 11)

**What you see:** Headline **"FOOD. PEOPLE. IMPACT."** and the summary
(Annamrutha — an end-to-end Django app connecting donors, NGOs, volunteers). A
horizontal journey: Donor → Food Donation → NGO → Volunteer → Delivery. Then
features (Live tracking, Receipts, RBAC authentication) and stack tags (Python,
Django, MySQL, JavaScript).

**How it animates:**

- Headline reveals word-by-word.
- The journey nodes stagger horizontally with connector pulses.
- Features slide in from the left, staggered.

---

## 16. Tech Stack — "Craft" (index 12)

**What you see:** Headline **"THE STACK."** and an **interactive** two-panel
layout instead of a flat grid. On the left, a list of ten categories (Languages,
Frontend, Backend, Databases, AI & LLM, Systems, DevOps, Fintech, Developer
Tools, Core CS), each numbered. On the right, the items of the currently-selected
category shown as pills.

**How it animates:**

- Selecting (or hovering) a category on the left instantly swaps the right panel
  — the outgoing items fade out, the incoming items fade in and each pill scales
  in with a small stagger.
- The active category is highlighted with a blue index and an arrow; inactive
  ones reveal their arrow on hover.
- Fully keyboard-accessible (tabs/panels are wired with proper roles).

---

## 17. DSA (index 13)

**What you see:** Gradient headline **"1,200+ PROBLEMS. / STILL SOLVING."** A
**heatmap-inspired grid** (a stylized activity view, explicitly *not* a real
contribution graph) sits alongside a large **1,200+** total. Below, two platform
cards:

- **LeetCode** — 368 total, with Easy (151) / Medium (198) / Hard (19) shown as
  colored bars (teal / amber / red), plus a "100-Day Streak Badge".
- **GeeksforGeeks** — 844 total, with a "Coding score 2500" tag.

**How it animates:**

- The heatmap cells fade + scale in, rippling column by column.
- The **1,200+** and each platform total count up when in view.
- The LeetCode difficulty bars grow from zero to their proportions.

---

## 18. Philosophy — "Principles" (index 14)

**What you see:** A list of six engineering principles, each large:

- BUILD FOR PRODUCTION.
- AUTOMATE WHAT SHOULD NOT BE MANUAL.
- MEASURE BEFORE OPTIMIZING.
- DESIGN FOR FAILURE.
- AI NEEDS GUARDRAILS.
- OWN THE FULL LIFECYCLE.

Then a narrative crescendo: **I BUILD. / I OPTIMIZE. / I AUTOMATE. / I SHIP.** and
finally, largest and in gradient, **I OWN THE SYSTEM.**

**How it animates:**

- Each principle reveals one at a time as it reaches the center of the screen
  (they start dim and settle to full brightness), so they land like statements.
- Hovering a principle shifts it to the gradient color.
- The closing lines stagger upward, ending on the big gradient "I OWN THE
  SYSTEM."

---

## 19. About (index 15)

**What you see:** A concise, engineering-focused about — no long biography. Your
name as a large headline, a short intro line, and a **spec sheet** of facts:
Role, Location, Degree, Institute, Years, CGPA (9.03/10).

**How it animates:**

- The spec-sheet rows fade + rise in, staggered, each on its own hairline row.

---

## 20. Contact (index 16)

**What you see:** Gradient headline **"HAVE A SYSTEM / WORTH BUILDING?"** and the
line *"Let's build something meaningful."* A grid of link cards — Email, GitHub,
LinkedIn, LeetCode, Resume — each with an icon and an arrow. Your email is also
spelled out below as a mono, copyable link.

- Links that are configured (currently Email, and Resume once you add the PDF)
  are fully interactive and open in a new tab where appropriate.
- Links without a URL yet (GitHub, LinkedIn, LeetCode) appear in a dimmed
  "link coming soon" state — visible but clearly inactive — until you add the
  real URLs in `src/data/profile.ts`.

**How it animates:**

- A soft blue glow marks the closing section.
- Headline reveals word-by-word; the supporting line fades in.
- The link cards stagger in; on hover, an active card's arrow nudges up-right and
  the icon shifts toward teal.

---

## 21. Footer

**What you see:** Minimal. Your name, title, and location on the left; your email
and (understated) phone number on the right; a hairline divider; and a small
copyright line with the current year.

**How it animates:** Static — a quiet close after the journey.

---

## Progress Rail (navigation — visible throughout)

**Desktop (large screens):** a vertical rail fixed to the right edge, centered
vertically. A thin line behind it fills blue→teal as you scroll to show overall
progress. Ten act markers (Intro, Outcomes, Thesis, Journey, Production, AI
Systems, Projects, Craft, Principles, Contact) sit along it. The marker for the
section you're currently in is enlarged and blue, and its label is shown; other
labels appear on hover. Clicking any marker smooth-scrolls you to that act.

**Mobile / small screens:** the rail is replaced by a slim progress bar across the
very top (filling blue→teal as you scroll) and a small pill in the top-right
showing the current act number and name (e.g. "03 / Production"), so it never
crowds a small screen.

**Accessibility:** a "Skip to content" link appears when you tab into the page;
the current section is announced via `aria-current`; the rail is a labeled `nav`.

---

## A note on content integrity

Every number, employer, technology, and outcome shown comes directly from the
provided material — nothing is invented. Where a value is a visual only (the
performance bars, the BI funnel proportions, the DSA heatmap), it's a relative or
stylized representation and is labeled as such, with no fabricated absolute
figures. Social links you haven't provided are shown as clearly-marked
placeholders rather than guessed URLs.
