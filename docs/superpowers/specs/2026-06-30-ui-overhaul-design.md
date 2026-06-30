# ArchiFlask UI Overhaul — Design Spec

Date: 2026-06-30
Branch base: `main`

A bundle of 11 visual/behavioral fixes across the marketing site. No backend/data-model
changes except the booking-endpoint indirection. Desktop layout must not regress; several
items are mobile-only or shared.

---

## 1. Remove green/purple — go fully greyscale

Replace every neon green (`#b5ff00`, `#a3e600`) and purple (`#be03fd`) accent with the
existing neutral token palette (`#1d1d1f` ink, `#9a9aa0` line, `#cfcfd4` node-dim, white).

Touch points:
- **`components/three/MiniShape.tsx`** — the 4 `idx` branches currently assign neon
  line/node colors. Replace with a tonal-grey scheme:
  - idx 0 → lines `#9a9aa0`, nodes `#cfcfd4`
  - idx 1 → lines `#6e6e73`, nodes `#9a9aa0`
  - idx 2 → lines `#aeaeb2`, nodes `#1d1d1f`
  - idx 3 (dark cards) → white (unchanged)
- **`components/sections/home/About.tsx`** — `dotStyles` green/purple variants removed.
  All orbit dots use one neutral style: `bg-ink` + `shadow-[0_0_0_5px_rgba(29,29,31,0.10)]`.
  The `colorType` switch collapses to a single style.
- **`lib/content.ts`** — drop the `colorType` field from `ORBIT_NODES` (see item 3).

## 2. Comment out the "One firm, fully modelled" floating caption

In **`components/sections/home/Hero.tsx`** the caption is the `absolute bottom-[120px]
right-10` block (lines ~44–53). Wrap it in `{/* ... */}` JSX comments (keep the markup
intact for later reuse). Note: it sits bottom-**right**, not bottom-left, but it is the
element described.

## 3. Orbit circle — 4 evenly-aligned nodes

In **`lib/content.ts`** `ORBIT_NODES`: remove `Client Portal` and `Site Visits`. Keep
**Documentation, Profitability, Operations, Collaboration** and re-space them evenly at
roughly the four diagonal points around the ring so the labels stay balanced and inside
the circle:
- Documentation → top-right
- Collaboration → top-left
- Profitability → bottom-left
- Operations → bottom-right

Drop the `colorType` field (now neutral per item 1). `About.tsx` render loop simplifies to
the single neutral dot style.

## 4. Remove colored/transition shadows → neutral grey shadows

Everywhere a hover shadow is tinted, swap to a neutral black-alpha shadow and drop the
tinted border-color change:
- **`StatCard.tsx`** — `shadowType` green/purple branches removed; all non-dark cards use
  `hover:shadow-[0_20px_40px_rgba(29,29,31,0.08)] hover:border-black/15`; dark card keeps
  its subtle white inset.
- **`Capabilities.tsx`** — same: collapse the green/purple `hoverClass` branches to the
  neutral one.
- **`Problem.tsx`** — same.

Keep card lift (`hover:-translate-y-1.5`) and the existing default grey
`--shadow-card`/`--shadow-soft`. Only the *colored* shadows go.

## 5. Remove the home "Impact" section entirely

Remove `<Impact />` usage and its import from **`app/page.tsx`**. Delete
**`components/sections/home/Impact.tsx`** and the now-unused `IMPACT_CARDS`
(type + data) from `lib/content.ts`. The standalone `/impact` route page is untouched.

## 6. New "Add-ons" section below Pricing

New component **`components/sections/home/AddOns.tsx`**, rendered in `app/page.tsx`
immediately after `<Pricing />`. Design: **low-height, wide rectangular cards** in a grid
(1 col mobile / 2 col `sm` / 3 col `lg`), matching the site's card style (white bg, subtle
border, neutral hover lift). Each card is a horizontal layout: title + one-line description
on the left, price pinned on the right.

New `ADDONS` data in `lib/content.ts` (ops-focused demo values):
| Add-on | Price |
|---|---|
| Extra Cloud Storage — 10GB | ₹275 / mo |
| Extra Users | ₹500 / user / mo |
| AI Drawing Compare | ₹999 / mo |
| Client Portal Seats | ₹300 / seat / mo |
| On-Site Support | Custom |
| WhatsApp Alerts | ₹499 / mo |

Section gets an eyebrow ("Add-ons") + heading ("Add power as you grow.") consistent with
Pricing's typography. Reuses neutral tokens; no new colors.

## 7. Remove dotted ring around the home Book-a-Demo button

In **`components/sections/home/FinalCta.tsx`** delete the dashed
`<span ... border-dashed ...>` (line ~18) and its wrapping `relative inline-flex` div, so
the `Book a Demo` `<Button>` renders as the standard dark pill — consistent with every
other Book-a-Demo button. Keep `id="af-demo-end"` on the button (the pencil rail targets
it).

## 8. Book-a-Demo: 8 time slots + configurable POST endpoint

**Slots** — `DEMO_SLOTS` in `lib/content.ts` becomes 8 one-hour ranges, 10AM–7PM, lunch
(1–2PM) omitted:
`10–11, 11–12, 12–1, 2–3, 3–4, 4–5, 5–6, 6–7`.
Each: `{ label: "10:00", value: "10:00–11:00 AM" }` style (label short, value = full range
sent on submit). In **`app/book-demo/page.tsx`** the slot grid becomes `grid-cols-4`
(2 rows of 4) so 8 pills lay out cleanly on desktop and `grid-cols-2`/`3` on small screens.

**POST endpoint** — submit reads `NEXT_PUBLIC_BOOKING_ENDPOINT`; if unset it falls back to
the existing internal `/api/book-demo` route, so the form keeps working today. Add
`NEXT_PUBLIC_BOOKING_ENDPOINT=` (empty, with a comment) to `.env.example`. No URL is
hardcoded. All existing validation/honeypot/error handling on the page is preserved.

## 9. Nav bar — bigger, always-solid, larger logo

In **`components/layout/Nav.tsx`**:
- **Always-solid**: nav always shows the white/blur background + bottom border (remove the
  transparent-at-top state). The scroll listener / `scrolled` state for chrome is no longer
  needed for background; mobile-open state still drives the dropdown. Nav stays `fixed`.
- **Bigger**: increase vertical padding (`py-3 md:py-4` → `py-4 md:py-5`).
- **Logo +50%**: `h-8` → `h-12`.

## 10. Pencil 3D start point anchored just below the nav

In **`components/three/PencilRail.tsx`**, the pencil path's start (`topY`, currently
`vh * 0.06`) moves to sit right at the nav: the pencil's top ~half tucks behind the fixed
nav (nav is `z-300`, pencil canvas `z-250`, so it already renders behind) and ~30% pokes
out below as a visible start anchor.
- Set `topY` ≈ nav height (≈ `72px` desktop, a bit lower on mobile) measured from the top
  of the viewport, instead of `vh * 0.06`.
- Establish the start anchor as **visible from the top of the page**: floor the visibility
  so the pencil shows at its start point under the nav even at scroll 0 (today it only
  appears after the hero is scrolled past). The travel-along-path behavior on scroll is
  otherwise unchanged.

## 11. Mobile hero polish (mobile only — desktop unchanged)

In **`Hero.tsx`** / **`globals.css`**:
- **3D hero more transparent**: `#af-skel` mobile opacity `0.12` → ~`0.06` (desktop stays
  `opacity-100`). Content-first.
- **Blueprint grid more transparent on mobile**: add a `max-width:760px` rule lowering
  `.af-blueprint-grid` opacity (e.g. wrap lines at ~50% of current alpha or set the layer
  `opacity` lower on small screens).
- **Kill excess vertical padding**: on mobile the headline block is vertically centered in
  a full-screen pin, leaving large empty top/bottom. Align content toward the top with a
  nav-aware top offset and trim the section height on mobile (e.g. `h-[150vh]` → tighter)
  so there isn't dead scroll space. Reduce the scroll-hint bottom gap on mobile.
- **Pencil start nudged below nav on mobile**: per item 10, use a slightly larger top
  offset on small screens so the rotating pencil reads as an appealing anchor below the
  nav.
- Desktop hero (`md:` and up) layout, spacing, and 3D opacity stay exactly as they are now.

---

## Testing / verification

- `npm run typecheck` and `npm run lint` clean.
- `npm test` (vitest) — `lib/content.test.ts` exists; update any assertions tied to
  `DEMO_SLOTS` length / `ORBIT_NODES` / removed `IMPACT_CARDS`.
- Manual: home (no green/purple, no caption, 4 orbit dots, neutral shadows, no Impact
  section, Add-ons grid present, plain Book-a-Demo button), book-demo (8 slots, submit
  posts via env-or-fallback), nav (solid + bigger + bigger logo), pencil anchored under
  nav, mobile hero (fainter 3D/grid, tighter padding).

## Out of scope

- The standalone `/impact` route page.
- Problem-section cards & pricing features still naming "Client Portal"/"Site Visits"
  (only the orbit circle loses those two nodes).
- Real booking API URL (provided later via env).
