# ArchiFlask — Next.js Rebuild Design Spec

**Date:** 2026-06-21
**Status:** Approved (design), pending implementation plan
**Source of truth:** `drafts/ArchiFlask Site.dc.html` (the Claude design)

## Goal

Rebuild the existing ArchiFlask marketing site — currently a single `.dc.html`
design file driven by a custom runtime (`x-dc`, `sc-if`, `{{ }}` bindings) — as a
production Next.js application that faithfully reproduces the visual design,
motion, and live 3D, while turning the SPA page-switching into real routed pages.

The `.dc.html` design is the canonical reference for all layout, copy, color,
spacing, animation timing, and 3D behavior. Every section, string, and number is
ported verbatim unless noted.

## Decisions (locked with user)

| Area | Decision |
|------|----------|
| Routing | Real Next.js routes via App Router (`/`, `/about`, `/impact`, `/blog`, `/book-demo`) |
| Styling | Tailwind v4 + design tokens (CSS variables + `@theme`) |
| Images | Wire real screenshots from `drafts/uploads` where they fit; styled branded placeholders elsewhere |
| Demo form | Real submit → Next.js API route → email (Resend, env-configured, graceful fallback) |
| Get Started CTA | `NEXT_PUBLIC_SIGNUP_URL` if set, else fall back to `/book-demo` (real URL configured later) |
| 3D | React Three Fiber (`@react-three/fiber` + `drei`), real-time |
| Transitions | Framer Motion (`motion` package), incl. `AnimatePresence` route transitions |

## Stack

- Next.js (latest, App Router) + TypeScript
- Tailwind CSS v4
- `@react-three/fiber`, `@react-three/drei`, `three`
- `motion` (Framer Motion)
- `resend` (email; optional at runtime)

## Project structure

```
app/
  layout.tsx              # <html>, system font, global chrome (Nav, Footer, PencilRail), PageTransition
  page.tsx                # Home
  about/page.tsx
  impact/page.tsx
  blog/page.tsx
  book-demo/page.tsx
  api/book-demo/route.ts  # POST handler → email (Resend) with logging fallback
  globals.css             # Tailwind import + design tokens (@theme + :root CSS vars)
components/
  layout/    Nav.tsx, Footer.tsx
  three/     HeroSkeleton.tsx, MiniShape.tsx, PencilRail.tsx
  motion/    Reveal.tsx, CountUp.tsx, PageTransition.tsx, Marquee.tsx, CardDeck.tsx
  ui/        Button.tsx, ImageSlot.tsx, StatCard.tsx, PricingCard.tsx, SectionLabel.tsx
  sections/  home/*, about/*, impact/*, blog/*  (one component per design section)
lib/         tokens.ts (TS mirror of tokens where needed), content.ts (all copy/data)
public/images/  real screenshots copied from drafts/uploads
drafts/      all original/non-app artifacts (preserved, not built)
docs/superpowers/specs/  this spec
```

## Design tokens

Extract the design's implicit system into `globals.css` (`:root` CSS variables +
Tailwind v4 `@theme`). Components reference tokens only — no scattered hex/px.

- **Color:** `--ink:#1d1d1f`, `--ink-2:#3a3a3c`, `--gray:#6e6e73`,
  `--gray-2:#86868b`, `--gray-3:#aeaeb2`, `--gray-4:#c2c2c9`,
  `--line:#9a9aa0`, `--node-dim:#cfcfd4`, `--surface:#f5f5f7`, `--white:#fff`,
  `--black:#000`.
- **Gradients:** `--grad-dark:linear-gradient(135deg,#48484a,#1c1c1e)`;
  dark-panel `linear-gradient(135deg,#2c2c2e,#1c1c1e)`; text gradient
  `linear-gradient(120deg,#9a9aa0,#1d1d1f 65%)`.
- **Radius:** `--r-pill:980px`, plus 24 / 22 / 20 / 18 / 14 / 13 / 12 / 11.
- **Easing:** `--ease-out:cubic-bezier(.16,1,.3,1)`.
- **Shadows:** card `0 16px 40px rgba(0,0,0,.10)`, soft `0 24px 60px rgba(0,0,0,.08)`,
  dark-cta inset highlight `inset 0 1px 0 rgba(255,255,255,.2)`.
- **Section padding:** `--pad-section:120px` (with the design's per-section variants).
- **Font:** system SF stack
  (`-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",...`) — exact
  match to original; no web-font fetch.
- **Type scale:** map the design's recurring sizes (hero 72, h2 60/56/52/48/46/44,
  h3 32/22/21, body 20/19/18/16/15/14/13) to named utilities/tokens.

## 3D components (React Three Fiber)

All are client components (`"use client"`), `dpr={[1,2]}`, `frameloop` paused when
offscreen, and honor `prefers-reduced-motion` → the original's "calm" mode
(reduced spin/parallax). Geometry/positions ported exactly from the design's JS.

### HeroSkeleton (`components/three/HeroSkeleton.tsx`)
- Orthographic camera in pixel space, wireframe **neural brain**: 5 layers of
  nodes (4-5-6-5-4) with full inter-layer `LineSegments` mesh; middle-layer nodes
  dark (`--ink`), outer nodes dim (`--node-dim`).
- Auto-spin (slow) + scroll-driven: shrink, rotate (x/y/z), drift; node colors
  light up progressively with hero scroll progress.
- Source: `_buildSkeleton`, `_heroFrame`, `items` config (single brain item).
- Renders into the hero's right ~58% region; pointer-events none.

### MiniShape (`components/three/MiniShape.tsx`)
- Small spinning wireframe solid + vertex node spheres. `shape` prop:
  `octa | box | tetra | ico`; `light` variant for the dark stat card.
- Perspective camera, continuous `rotation.y/x` loop.
- Source: `_initMini`. Used in the four "numbers" stat cards on Home/About-numbers.

### PencilRail (`components/three/PencilRail.tsx`) — global
- Fixed full-viewport overlay. A 3D hexagonal **pencil** (barrel + sharpened cone +
  ferrule + eraser cap + graphite lead + hex-corner nodes) rides the leading edge
  of an SVG sine-wave path that "draws in" on scroll.
- Enters after the hero is scrolled past; **ends exactly at the element with id
  `af-demo-end`** (the final "Book a Demo" button on each page). Path dash-offset,
  pencil position/rotation smoothing, barrel spin all ported from `_railFrame`.
- Behind content there's a faint drawn SVG line (`af-rail-path`); pencil canvas
  rides above content, below nav (z-index: line=1, content=2, pencil=250, nav=300).
- Runs on every page; the `af-demo-end` target exists on every page's final CTA.

## Motion / interaction

- **Reveal** — wraps content; IntersectionObserver-driven fade + translateY up
  (replaces `data-reveal`), optional `delay` for the design's staggered timings.
- **CountUp** — cubic ease-out counter for 100+, 30+, 15+ (and static "4").
- **Marquee** — infinite logo track, linear loop (Studio·Co, BuildWorks, Atelier 9,
  PMC Group, Vastu Labs, Form & Co), masked edges.
- **CardDeck** — "five things before 9 a.m." deck: stacked/rotated at rest,
  fans out on hover with the hovered card lifted. Ported from `_initDeck`.
- **Nav** — sticky; transparent → `rgba(255,255,255,.72)` + backdrop blur after
  18px scroll; active-page link highlighted (color/bg/weight). Mobile: collapses
  secondary links per the design's media query.
- **PageTransition** — `AnimatePresence` fade/translate between real routes,
  keyed on pathname; scroll resets to top on navigation.

## Pages & content

All copy/data extracted verbatim into `lib/content.ts` (typed) and rendered via
section components. No lorem; the design's exact strings/numbers/prices.

- **Home:** Hero (pencil/skeleton) → About/Numbers (stat cards + orbit diagram +
  logo marquee) → Statement (inline image-pills) → Problem (3 cards) →
  5 Questions (card deck) → Features (2 split rows + 3 cards) → Capabilities
  (4×2 grid) → For Clients (dark, phone mock) → Impact (2 cards) →
  **Pricing** (Free / Architect / Builder-PMC / Enterprise, exact ₹ values, GST
  note) → Final CTA (`af-demo-end`).
- **About:** Hero → Origin story (+ image) → The product (3 cards) →
  Founders (Sivaraman Arunachalam, Hari Kumaravelu — exact bios + photos) →
  Vision (dark) → CTA (`af-demo-end`).
- **Impact:** Hero → Outcome strip (5) → Field stories (2) → Reviews (6) →
  Domains (4 pills) → CTA (`af-demo-end`).
- **Blog:** Hero → Featured post → 6-post grid (exact titles/categories/read
  times) → dark CTA card (`af-demo-end`). Post links are placeholder (route to
  `/blog`), matching the design (no individual article pages exist in the design).
- **Book-a-Demo:** "What to expect" panel + calendar (June 2026, IST; days 23-27
  & 30 selectable, others disabled) + time slots (10:00 / 11:30 / 2:00 / 4:30) +
  fields (name, firm, email, phone). On submit → API → success state
  "You're booked, {firstName}." with "← Back to home".

Global **Footer** (links to all pages + Book a Demo / Get Started / Pricing;
copyright + "A product of Wallzehn Technologies Pvt. Ltd.").

## Demo form + API + env

- `book-demo/page.tsx` (client): selected day/slot stored in local state and sent
  with the form. Client-side validation (name + email required). POSTs JSON to
  `/api/book-demo`; on success renders success state.
- `app/api/book-demo/route.ts`: validates payload; if `RESEND_API_KEY` and
  `BOOKING_TO_EMAIL` are set, emails the booking via Resend; otherwise logs the
  booking server-side and returns success (so the app works out of the box). Clear
  `TODO` marking where production email config plugs in.
- **Env** (`.env.example`, documented):
  - `RESEND_API_KEY` — email provider key (optional; fallback to log).
  - `BOOKING_TO_EMAIL` — destination inbox for bookings.
  - `NEXT_PUBLIC_SIGNUP_URL` — external Get Started URL (optional; fallback `/book-demo`).

## Images & cleanup

- Copy usable screenshots from `drafts/uploads` into `public/images/` and wire
  into matching slots (feature drawings/effort, client app, founders, blog
  covers, about story) per the design's `image-slot` ids and the filled slots in
  `.image-slots.state.json` (`af-feat-drawings`, `af-feat-effort`, `af-obj1`).
- **ImageSlot** component: renders a real image when provided, else a branded
  placeholder block matching the design's surface/border look (no drag-drop
  runtime needed — that was a design-tool feature).
- Move all original artifacts into `drafts/`: `ArchiFlask Site.dc.html`,
  `image-slot.js`, `support.js`, `.image-slots.state.json`, `.thumbnail`.

## Accessibility & quality

- `prefers-reduced-motion` disables/relaxes 3D spin, parallax, marquee, reveals.
- Semantic landmarks (`nav`, `main`, `footer`, headings order), focusable CTAs,
  alt text on images, labeled form fields.
- Mobile responsive per the design's media query (single-column grids, smaller
  type, static card deck, skeleton full-width at reduced opacity).

## Out of scope

- Individual blog article pages (design has none; cards link to `/blog`).
- CMS / dynamic content (copy is static in `lib/content.ts`).
- Auth / the actual ArchiFlask product app (Get Started points outward).
- The `.dc.html` drag-drop image runtime, PPTX export, sidecar persistence.

## Verification

- `next build` succeeds with no type errors.
- Each route renders; nav + footer links navigate correctly; active state correct.
- Hero skeleton, mini shapes, and pencil rail animate; pencil terminates at
  `af-demo-end` on every page.
- Reveals, count-up, marquee, card-deck behave as in the design.
- Demo form validates, submits, shows success; API logs/emails booking.
- Reduced-motion path verified.
