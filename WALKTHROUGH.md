# Parichay — Full Walkthrough

A complete, section-by-section description of the portfolio: what the visitor
sees, what content appears, and exactly how each part animates. This follows the
site top to bottom, in the same order a visitor scrolls through it. It reflects
the second-pass refinement (database optimization flagship, restructured Spense
narrative, hero CTAs, production-impact synthesis, and visual-hierarchy tiers).

> **Site-wide behavior (applies everywhere)**
>
> - **Smooth scrolling (Lenis):** the whole page scrolls with a soft, weighted
>   easing. Clicking a nav item or a hero button smooth-scrolls to that section.
> - **Progress rail (navigation):** fixed. Desktop = vertical rail on the right;
>   mobile = slim top bar + compact act counter. Details at the end.
> - **Reduced motion:** if "reduce motion" is enabled, heavy animations become
>   instant/static — nothing is lost.
> - **Theme:** dark midnight (`#080B12`), off-white text, blue (`#4F8CFF`)
>   primary, teal (`#20C9B0`) for flow/success/results only. Space Grotesk for
>   display, Inter for body, monospace for technical labels.
> - **Entrance pattern:** most blocks fade + rise into place the first time they
>   enter the viewport (once only).
> - **Visual hierarchy tiers:** sections are spaced by importance —
>   **flagship** (Migration, Database Optimization, AI) get the most room;
>   **core** (Incident, Performance, Partner) medium; **supporting** (EMI, RBAC,
>   BI, Nokia, Aadhaar, Annamrutha) are more compact. This paces the story so the
>   strongest work dominates.

The narrative is layered on purpose:
**Level 1** who I am → **Level 2** headline achievements → **Level 3** how I
engineer → **Level 4** deep case studies → synthesis → supporting story.

---

## 0. Hero — "Intro" (Levels 1 & 2)

**What you see:** A full-screen opening designed so a recruiter understands you
in 20–30 seconds without scrolling. Location label at top, then the stacked
headline:

- **CHARAN N N**
- **FULL STACK DEVELOPER** (muted)
- **FINTECH × AI × SYSTEMS** (blue→teal gradient)

Supporting line: *"Full Stack Developer building production fintech systems, AI
workflows, and infrastructure that scale beyond the prototype."*

Then two **call-to-action buttons**:

- **View engineering work** (solid blue) — smooth-scrolls to the Spense section.
- **Resume ↗** (outline) — opens your resume (from `public/resume.pdf`).

Then a **compact achievement strip** — four headline metrics right on the first
screen: **10K+** users migrated · **~40%** log payload reduction · **30%** API
latency reduction · **40%** faster onboarding.

Background: the live 2D canvas node-network (grid, drifting particles, blue
connection lines, teal data pulses, mouse parallax).

**How it animates:**

- Headline lines slide up from behind masks, one after another.
- Tagline fades/rises in, then the CTA buttons, then the metric strip (staggered).
- Buttons animate their arrows on hover (down-arrow nudges down, up-right arrow
  nudges up-right).
- Scroll indicator arrow bobs on a loop; canvas drifts + parallaxes and pauses
  off-screen.

---

## 1. What I Do — "Thesis" (index 01, Level 3)

**What you see:** Giant gradient headline **"I BUILD SYSTEMS."** and a grid of
eight capabilities: Production Backends · Fintech Integrations · AI-Powered
Systems · Database & Storage Optimization · Performance Engineering · Automation
& Observability · Multi-Tenant Architecture · Data-Driven Systems. Each numbered.

**How it animates:** the headline drifts sideways on scroll; the eight cards
stagger in; hovering a card sweeps a blue→teal underline across it.

---

## 2. Systems I Optimize — "What I optimize" (index 02)

**What you see:** A **FROM → TO** transformation table:

- High-volume logs → Compressed payloads
- Large JSON payloads → Automated detection
- Manual monitoring → Configuration-driven journeys
- Hardcoded journeys → Optimized queries
- Slow queries → Production observability

Left column (muted "before") and right column (teal "after"), with arrows.

**How it animates:** each "before" slides in from the left, its arrow pops, and
the "after" slides in from the right — so each row visibly transforms. On mobile
the arrow rotates to point downward and the columns stack.

---

## 3. Engineering Journey — "Journey" (index 03)

Your three career stops (Education → Nokia internship → Spense) as color-coded
cards. **Desktop:** the section pins and the cards scroll horizontally as you
scroll down (you move forward through time). **Mobile / reduced motion:** a
normal vertical stack, no clipping.

---

## 4. Spense Intro — "Production fintech" (index 04, Level 4 opener)

**What you see:** Gradient headline **"BUILDING PRODUCTION FINTECH SYSTEMS"** and
the lifecycle line. Then the ten-stage delivery lifecycle chain (BRD → … →
Post-production validation), the stakeholder pills (Bank partners, M2P
engineering, Clients, Internal stakeholders), and — new — a
**"Production systems I've worked on"** index: a numbered grid (01–08) of the
Spense systems (Migration, Observability, Storage Optimization, Performance,
Partner Platform, Payments/EMI, Access Control, Analytics), each labeled with its
engineering theme (Reliability, Observability, Infrastructure efficiency, etc.).

**How it animates:** headline word-reveal; lifecycle stages pop in with arrows;
the systems index cards stagger in and each is **clickable** — clicking jumps you
to that case study. This frames the whole Spense chapter as one narrative.

The Spense case studies then run in a deliberate progression:
**Reliability → Observability → Infrastructure efficiency → Performance →
Product architecture → Business systems → Security → Analytics.**

---

## 5. Migration Case Study — flagship (case study 01)

The largest section. Giant **"10,000 USERS. / ZERO DOWNTIME."**, subtitle
**VISA → RuPay Card Migration**, the problem, the engineering context (profiles
recovered via bank APIs using CIF numbers/entity IDs/FD account numbers; M2P
identifiers; fault-tolerant cron pipeline), the **M2P ↔ Bank ↔ Spense**
coordination, the nine-step **vertical pipeline** (with data pulses flowing down
the connectors), and result cards (~10,000 migrated, Zero downtime).

---

## 6. Incident Response (case study 02)

**"WHEN PRODUCTION BREAKS, / THE SYSTEM RESPONDS."** Two tiers side by side —
Tier 1 automated detection (threshold 10%), Tier 2 critical escalation (Twilio →
voice call → 5-person on-call). Closes on the large gradient **MTTD → NEAR ZERO**
(this is where the near-zero MTTD metric now lives, moved out of the hero).

**How it animates:** headline word-reveal; the two tier cards rise in; flow nodes
stagger with connector pulses (a branching architecture rather than one line);
the outcome scales up.

---

## 7. Database Storage Optimization — flagship (case study 03) — NEW

**What you see:** Giant **"~45% AVERAGE / PAYLOAD REDUCTION."** and the subtitle
*"Compressing high-volume log payloads without changing their business meaning."*
Right below, an **average summary**: **~45%** average logical payload reduction
and **~1.8×** average compression ratio. Then the problem (high-volume log
tables; exploring JSON/text → compressed LONGBLOB via MySQL `COMPRESS()` across
several high-traffic log categories).

> Note: log categories are anonymized (Category A/B/C). No partner, vendor, or
> internal system names are exposed anywhere in this section.

A **testing-scale row**: 500K records/table · 3 log categories · ~45% average
reduction · ~1.8× average ratio · ~58% best-case.

Then the **compression transformation** — three cards (Log Category A/B/C). Each
shows the original payload (KB), the compressed payload (KB), and the saving:

- **Category A** 7.19 KB → 3.04 KB — **57.71% saved**
- **Category B** ~4.40 KB → ~2.66 KB — **~39.5% saved**
- **Category C** ~3.93 KB → ~2.40 KB — **~38.9% saved**

Then **column-level breakdowns** (generic field names):

- **Where did the savings come from?** small payload field (−0.29%), request body
  (20.99%), **response payload (46.38%, highlighted)** — with the note that the
  reduction was driven mainly by larger response payloads, and an honest
  explanation that very small payloads can see negligible/slightly negative
  benefit because compression overhead offsets savings.
- **A second category:** request payload (59.74%), request body (43.41%),
  response payload (28.73%).

Then the **optimization process** as a vertical flow (log payloads → identify
storage-heavy fields → evaluate strategy → sample 500K/table → compress via
MySQL COMPRESS() → compare → measure → validate trade-offs → begin rollout), a
**storage strategy** mini-diagram (JSON/Text Payload → Compressed LONGBLOB →
MySQL COMPRESS()), an **engineering insight** ("The important part wasn't just
compression" + the factors that mattered + a judgment statement), and a subtle
monospace **accuracy note** clarifying these are logical payload-size reductions,
not physical database savings.

**How it animates (the signature moment):** for each table, the **original bar
fills to full width, then visibly compresses down** to the smaller compressed
width; the compressed bar then grows and the saving percentage counts into view.
The animation *communicates* compression rather than just printing a number. In
the column breakdowns, the compressed portion animates over a faint original
bar, and the prominent `response` row is ringed in teal. The −0.29% is shown in
amber, deliberately not hidden — it signals engineering honesty.

---

## 8. Performance (case study 04)

Gradient **"30% FASTER."** with animated **before/after comparison bars** (the
"after" bar grows visibly shorter) and the optimization flow. A note clarifies
the bars are a relative comparison with no fabricated millisecond values.

---

## 9. Partner Journey (case study 05)

**"40% FASTER PARTNER ONBOARDING"** with the old (dimmed) vs new (bright)
configuration-driven flows side by side, a result band, and highlight pills.

---

## 10. EMI (case study 06 — supporting, compact)

**"EMI CONVERSION"** and the four-party transaction chain (User ↔ Partner ↔ M2P
↔ Bank; ↕ on mobile), plus two implementation notes. More compact spacing.

---

## 11. RBAC Panel (case study 07 — supporting, compact)

**"ACCESS SHOULD BE DESIGNED, / NOT ASSUMED."** SvelteKit tag, highlights, and a
miniature admin-dashboard mock (window chrome, managed resources, a
granted/denied permission matrix).

---

## 12. BI Dashboard (case study 08 — supporting, compact)

**"FROM DATA TO DECISIONS"** with a dashboard mock (Tenant / Last-30d filters, a
pulsing "Live" badge) and an animated conversion funnel (FD Deposits → Card
Issuance → EMI Conversion), tech tags, capabilities, and the outcome.

---

## 13. Production Impact — "Synthesis" (id: impact) — NEW

**What you see:** A concise, numbers-only synthesis right after the Spense
chapter — six metrics: **10K+** live users migrated · **~45%** average log
payload reduction · **58%** best-case payload reduction · **30%** API latency
reduction · **40%** partner onboarding improvement · **~0** critical-event MTTD.
Each is a large counter with a hairline tick and label. Compression figures are
labeled as payload reduction (never physical DB size).

**How it animates:** the six numbers stagger in and **count up** when in view.

---

## 14. Nokia (supporting, compact)

**"BEFORE FINTECH, / THERE WAS NETWORK AUTOMATION."** Role, stack, contributions,
and a large **25%** counter (faster dashboard reports).

---

## 15. AI System — flagship (id: ai)

The AI Dynamic Form Intelligence System in four parts: intro + horizontal
pipeline; the four-agent architecture (Text / Checkbox / Date+Signature /
Validator, with pulsing parallel-processing indicators); the five guardrails
(SHA-256 caching, confidence filtering, Levenshtein dedup, HTML sanitization,
coordinate-aware PDF writing) under **"AI ENGINEERING ≠ JUST API CALLS."**; and
the full top-to-bottom system architecture with MongoDB + SHA-256 cache as
supporting infrastructure. Flagship spacing.

---

## 16. Aadhaar Project (supporting, compact)

**"MULTIMODAL IDENTITY VERIFICATION"** — parallel FACE (FaceNet, ~95%) and VOICE
(MFCC + Cosine Similarity, ~92%) flows converging into FACE + VOICE →
VERIFICATION. Stack tags.

---

## 17. Annamrutha Project (supporting, compact)

**"FOOD. PEOPLE. IMPACT."** — a Donor → Delivery journey, features, and stack.

---

## 18. Tech Stack — "Craft" (index 12)

**What you see:** Headline **"THE STACK."** Now led by a **featured MySQL depth
card** — MySQL presented as a database-engineering capability with dimensions
(Query Optimization, Indexing, Payload Compression, Storage Optimization,
Production Logging) rather than a single tool pill. Below it, the interactive
tabbed category explorer (ten categories; selecting/hovering swaps the pills on
the right with a staggered entrance).

**How it animates:** the MySQL card rises in and its capability pills scale in
staggered; the category panel cross-fades on selection.

---

## 19. DSA (index 13)

**"1,200+ PROBLEMS. / STILL SOLVING."** A heatmap-inspired activity grid (a
stylized view, explicitly not a real contribution graph), the **1,200+** counter
(this is where that metric lives, moved out of the hero), and two platform cards
(LeetCode with Easy/Medium/Hard bars + 100-day badge; GeeksforGeeks with coding
score 2500).

---

## 20. Philosophy — "Principles" (index 14)

Six principles revealed one at a time, then the crescendo **I BUILD. / I
OPTIMIZE. / I AUTOMATE. / I SHIP.** ending on the large gradient **I OWN THE
SYSTEM.**

---

## 21. About (index 15)

Concise, engineering-focused. Name, short intro, and a spec sheet (Role,
Location, Degree, Institute, Years, CGPA 9.03/10).

---

## 22. Contact (index 16)

**"HAVE A SYSTEM / WORTH BUILDING?"** with direct-link cards (Email, GitHub,
LinkedIn, LeetCode, Resume). Configured links are interactive; unconfigured ones
(GitHub/LinkedIn/LeetCode until you add URLs) show a dimmed "link coming soon"
state. Email spelled out below for quick copy.

---

## 23. Footer

Minimal: name/title/location, email, understated phone, copyright.

---

## Progress Rail (navigation — visible throughout)

**Desktop:** a vertical rail on the right with a blue→teal progress line and ten
act markers (Intro, Thesis, Journey, Production, Storage, Impact, AI Systems,
Projects, Craft, Contact). The current section's marker enlarges and shows its
label; clicking any marker smooth-scrolls there.

**Mobile:** a slim top progress bar plus a top-right pill showing the current act
number and name.

**Accessibility:** skip-to-content link on tab, `aria-current` on the active
marker, labeled `nav`.

---

## Content integrity

Every number, employer, technology, and outcome comes from the provided material
— nothing invented. Compression results are stated as **logical payload-size
reduction** (original/decompressed bytes → compressed bytes), never as physical
database/disk savings, with a subtle accuracy note. Visual-only representations
(performance bars, BI funnel, DSA heatmap, compression bars) are relative or
stylized and labeled as such. The honest −0.29% column result is shown, not
hidden. Unprovided social links are clearly-marked placeholders.
