# ArchiFlask Next.js Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the ArchiFlask marketing site (currently the `.dc.html` design) as a production Next.js App Router app with real routes, faithful Apple-style visuals, Framer Motion, and live React-Three-Fiber 3D.

**Architecture:** Next.js (App Router, TS) + Tailwind v4 design tokens. Global chrome (Nav, Footer, scroll-driven 3D PencilRail, page transitions) lives in `layout.tsx`. Each design section is a focused component fed verbatim copy from `lib/content.ts`. Three live 3D pieces (hero skeleton, mini wireframe shapes, pencil rail) are R3F client components. The demo form posts to an API route that emails via Resend with a logging fallback.

**Tech Stack:** Next.js (latest), TypeScript, Tailwind CSS v4, `motion` (Framer Motion), `three` + `@react-three/fiber` + `@react-three/drei`, `resend`.

## Global Constraints

- **Source of truth:** `drafts/ArchiFlask Site.dc.html` — port layout/copy/numbers/timing verbatim. (Moved into `drafts/` in Task 1.)
- **Spec:** `docs/superpowers/specs/2026-06-21-archiflask-nextjs-design.md`.
- **Routes:** `/`, `/about`, `/impact`, `/blog`, `/book-demo` (App Router).
- **No magic values:** every color/radius/gradient/easing comes from a token (CSS var or Tailwind theme); never inline raw hex except inside the token definitions and inside 3D component geometry (which the design also hardcodes).
- **Exact copy:** all marketing strings, prices (₹0 / ₹600 / ₹999 / Custom, GST notes), founder bios, reviews, blog titles, read-times copied verbatim from the design.
- **3D color hexes** in R3F components match the design JS exactly (`0x1d1d1f`, `0x9a9aa0`, `0xcfcfd4`, `0x48484a`, `0x111113`, etc.).
- **Accessibility:** honor `prefers-reduced-motion` (the design's "calm" mode); semantic landmarks; labeled inputs; alt text.
- **Every page's final CTA "Book a Demo" button carries `id="af-demo-end"`** — the PencilRail terminates there.
- **Node:** v24 available; use `npm`.
- **Commit** after each task with the shown message.

---

## File structure (locked)

```
app/layout.tsx, app/page.tsx, app/globals.css
app/about/page.tsx, app/impact/page.tsx, app/blog/page.tsx, app/book-demo/page.tsx
app/api/book-demo/route.ts
components/layout/{Nav,Footer}.tsx
components/three/{HeroSkeleton,MiniShape,PencilRail}.tsx
components/motion/{Reveal,CountUp,Marquee,CardDeck,PageTransition}.tsx
components/ui/{Button,ImageSlot,SectionLabel,StatCard,PricingCard}.tsx
components/sections/home/*.tsx, .../about/*.tsx, .../impact/*.tsx, .../blog/*.tsx
lib/{content.ts,tokens.ts,useReducedMotion.ts}
public/images/*
```

---

## Task 1: Scaffold project + move artifacts to drafts

**Files:**
- Move into `drafts/`: `ArchiFlask Site.dc.html`, `image-slot.js`, `support.js`, `.image-slots.state.json`, `.thumbnail`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts`, `app/layout.tsx` (temporary), `app/page.tsx` (temporary), `app/globals.css` (temporary)

**Interfaces:**
- Produces: a runnable Next.js app (`npm run dev`, `npm run build`), Tailwind v4 wired.

- [ ] **Step 1: Move original artifacts into drafts (keep a readable copy for reference)**

```bash
cp "ArchiFlask Site.dc.html" "drafts/ArchiFlask Site.dc.html"
mv image-slot.js support.js .image-slots.state.json .thumbnail drafts/ 2>/dev/null || true
mv "ArchiFlask Site.dc.html" drafts/ 2>/dev/null || true
ls drafts/
```
Expected: the five artifacts now live under `drafts/`. (We keep `drafts/ArchiFlask Site.dc.html` as the porting reference and `drafts/.image-slots.state.json` for image wiring.)

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "archiflask",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "motion": "^11.18.0",
    "three": "^0.169.0",
    "@react-three/fiber": "^9.1.0",
    "@react-three/drei": "^10.0.0",
    "resend": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.169.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.5.0"
  }
}
```

- [ ] **Step 3: Create config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "drafts"]
}
```

`next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

`postcss.config.mjs`:
```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

`next-env.d.ts`:
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 4: Temporary `app/globals.css`, `app/layout.tsx`, `app/page.tsx`**

`app/globals.css`:
```css
@import "tailwindcss";
```

`app/layout.tsx`:
```tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArchiFlask — Run your firm on a system",
  description:
    "The operating platform for design, construction & PMC firms — projects, drawings, teams, site activity, approvals and profitability, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>ArchiFlask</main>;
}
```

- [ ] **Step 5: Install and verify build**

Run:
```bash
npm install
npm run build
```
Expected: install succeeds; `next build` completes with no errors and lists route `/`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app, move design artifacts to drafts"
```

---

## Task 2: Design tokens

**Files:**
- Modify: `app/globals.css`
- Create: `lib/tokens.ts`

**Interfaces:**
- Produces: CSS variables (`--ink`, `--gray`, `--surface`, `--grad-dark`, `--r-pill`, `--ease-out`, …) usable as `var(--x)` and Tailwind theme tokens (`bg-surface`, `text-ink`, `rounded-pill`, `ease-out`); `tokens.ts` exports `EASE_OUT = [0.16, 1, 0.3, 1]` and `GRAD_DARK`, `GRAD_PANEL`, `GRAD_TEXT` strings for use in TSX/motion.

- [ ] **Step 1: Write `app/globals.css` with tokens**

```css
@import "tailwindcss";

@theme {
  --color-ink: #1d1d1f;
  --color-ink-2: #3a3a3c;
  --color-gray: #6e6e73;
  --color-gray-2: #86868b;
  --color-gray-3: #aeaeb2;
  --color-gray-4: #c2c2c9;
  --color-line: #9a9aa0;
  --color-node-dim: #cfcfd4;
  --color-surface: #f5f5f7;
  --radius-pill: 980px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

:root {
  --grad-dark: linear-gradient(135deg, #48484a, #1c1c1e);
  --grad-panel: linear-gradient(135deg, #2c2c2e, #1c1c1e);
  --grad-text: linear-gradient(120deg, #9a9aa0, #1d1d1f 65%);
  --shadow-card: 0 16px 40px rgba(0, 0, 0, 0.1);
  --shadow-soft: 0 24px 60px rgba(0, 0, 0, 0.08);
  --inset-hi: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; }
body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: var(--color-ink);
  overflow-x: clip;
}
::selection { background: #1d1d1f; color: #fff; }
a { color: inherit; text-decoration: none; }
input, button { font-family: inherit; }

@keyframes afRise { 0% { transform: translateY(26px); } 100% { transform: translateY(0); } }
@keyframes afPing { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(2.4); opacity: 0; } }
@keyframes afSpin { to { transform: rotate(360deg); } }
@keyframes afSpinR { to { transform: rotate(-360deg); } }
@keyframes afHint { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(6px); opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
}
```

Note: also port the design's `@media (max-width:760px)` rules (design lines 29-52) into this file, adapting selectors to component classNames as sections are built (revisit in each section task).

- [ ] **Step 2: Create `lib/tokens.ts`**

```ts
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const GRAD_DARK = "linear-gradient(135deg,#48484a,#1c1c1e)";
export const GRAD_PANEL = "linear-gradient(135deg,#2c2c2e,#1c1c1e)";
export const GRAD_TEXT = "linear-gradient(120deg,#9a9aa0,#1d1d1f 65%)";
export const INSET_HI = "inset 0 1px 0 rgba(255,255,255,.2)";

// 3D color constants (match design JS hexes exactly)
export const C = {
  ink: 0x1d1d1f,
  line: 0x9a9aa0,
  nodeDim: 0xcfcfd4,
  barrel: 0x48484a,
  lead: 0x111113,
  litLight: 0xb8b8bf,
  nodeLight: 0xf2f2f4,
} as const;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS, no CSS errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css lib/tokens.ts
git commit -m "feat: design tokens (css vars + tailwind theme + 3d constants)"
```

---

## Task 3: Reduced-motion hook + content data

**Files:**
- Create: `lib/useReducedMotion.ts`, `lib/content.ts`

**Interfaces:**
- Produces:
  - `useCalm(): boolean` — true when `prefers-reduced-motion: reduce`.
  - Typed content exports consumed by section components (names below are the contract):
    `STATS`, `PROBLEMS`, `QUESTIONS`, `FEATURES_SPLIT`, `FEATURES_CARDS`, `CAPABILITIES`, `IMPACT_CARDS`, `PRICING`, `LOGOS`, `NAV_LINKS`, `ABOUT_PRODUCT`, `FOUNDERS`, `IMPACT_OUTCOMES`, `IMPACT_STORIES`, `REVIEWS`, `DOMAINS`, `BLOG_FEATURED`, `BLOG_POSTS`, `DEMO_DAYS`, `DEMO_SLOTS`, `DEMO_EXPECT`.

- [ ] **Step 1: `lib/useReducedMotion.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export function useCalm(): boolean {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setCalm(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return calm;
}
```

- [ ] **Step 2: `lib/content.ts` — extract ALL copy/data verbatim from the design**

Populate each export from the design file (cite the section). Use exact strings/numbers. Shape:

```ts
export type NavLink = { label: string; href: string };
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Blog", href: "/blog" },
];

export const LOGOS = ["Studio·Co","BuildWorks","Atelier 9","PMC Group","Vastu Labs","Form & Co"];

export type Stat = { value: number | null; display: string; suffix?: string; label: string; shape: "octa"|"box"|"tetra"|"ico"; dark?: boolean };
export const STATS: Stat[] = [
  { value: 100, display: "100+", suffix: "+", label: "Firms & teams running on ArchiFlask across India.", shape: "octa" },
  { value: 30, display: "30+", suffix: "+", label: "Live projects a single firm runs at once.", shape: "box" },
  { value: 15, display: "15+", suffix: "+", label: "Years our founders have run real projects.", shape: "tetra" },
  { value: null, display: "4", label: "Domains: residential, commercial, interiors, infrastructure.", shape: "ico", dark: true },
];
// ...PROBLEMS (design 236-250), QUESTIONS (262-266), FEATURES_SPLIT (277-296),
// FEATURES_CARDS (299-313), CAPABILITIES (323-330), IMPACT_CARDS (360-372),
// PRICING (386-462) incl. tier name/price/strike/period/features[]/cta/popular,
// ABOUT_PRODUCT (603-617), FOUNDERS (630-649), IMPACT_OUTCOMES (695-699),
// IMPACT_STORIES (710-719), REVIEWS (732-755), DOMAINS (766-769),
// BLOG_FEATURED (804-812), BLOG_POSTS (820-878), DEMO_EXPECT (505-511),
// DEMO_DAYS (519-531), DEMO_SLOTS (535-538).
```

Define a small TS type for each export. Copy text exactly; do not paraphrase. Reviewer must diff each array against the cited design lines.

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add lib/useReducedMotion.ts lib/content.ts
git commit -m "feat: content data + reduced-motion hook"
```

---

## Task 4: UI primitives — Button, SectionLabel, ImageSlot

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/ImageSlot.tsx`

**Interfaces:**
- Consumes: tokens.
- Produces:
  - `Button({ variant, href, onClick, id, children })` — variants `"dark" | "light" | "ghost" | "darkOnDark"`; renders `next/link` when `href` is internal, `<a>` when external/absolute, `<button>` otherwise; forwards `id` (for `af-demo-end`).
  - `SectionLabel({ children, light? })` — the uppercase tracked eyebrow text.
  - `ImageSlot({ src?, alt, className, rounded? })` — renders `next/image` when `src`, else a branded placeholder block (surface bg, dashed/soft border, centered tiny "AF" mark).

- [ ] **Step 1: `Button.tsx`**

```tsx
import Link from "next/link";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

type Variant = "dark" | "light" | "ghost" | "darkOnDark";
type Props = {
  variant?: Variant;
  href?: string;
  id?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
};

const styleFor = (v: Variant): React.CSSProperties => {
  switch (v) {
    case "dark":
      return { color: "#fff", background: GRAD_DARK, boxShadow: `0 2px 10px rgba(0,0,0,.22), ${INSET_HI}` };
    case "light":
      return { color: "#1d1d1f", background: "#fff", border: "1px solid rgba(0,0,0,.12)" };
    case "ghost":
      return { color: "#1d1d1f", background: "#f5f5f7", border: "1px solid rgba(0,0,0,.14)" };
    case "darkOnDark":
      return { color: "#fff", background: "transparent", border: "1px solid rgba(255,255,255,.3)" };
  }
};

export function Button({ variant = "dark", href, id, onClick, type = "button", className, children }: Props) {
  const base: React.CSSProperties = {
    cursor: "pointer", fontSize: 16, fontWeight: 500, padding: "14px 30px",
    borderRadius: 980, display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 8, border: 0, ...styleFor(variant),
  };
  const isInternal = href && href.startsWith("/");
  if (isInternal) return <Link id={id} href={href!} style={base} className={className}>{children}</Link>;
  if (href) return <a id={id} href={href} style={base} className={className}>{children}</a>;
  return <button id={id} type={type} onClick={onClick} style={base} className={className}>{children}</button>;
}
```

- [ ] **Step 2: `SectionLabel.tsx`**

```tsx
export function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: light ? "rgba(255,255,255,.5)" : "#86868b" }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: `ImageSlot.tsx`**

```tsx
import Image from "next/image";

type Props = { src?: string; alt: string; className?: string; radius?: number; rounded?: "rect" | "rounded" | "circle" | "pill" };

export function ImageSlot({ src, alt, className, radius = 0, rounded = "rect" }: Props) {
  const br = rounded === "circle" || rounded === "pill" ? 9999 : radius;
  if (src) {
    return (
      <div className={className} style={{ position: "relative", borderRadius: br, overflow: "hidden", width: "100%", height: "100%" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width:760px) 100vw, 50vw" />
      </div>
    );
  }
  return (
    <div className={className} aria-label={alt} role="img"
      style={{ width: "100%", height: "100%", borderRadius: br, background: "#f5f5f7",
        border: "1px dashed rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-.01em", color: "#c2c2c9" }}>AF</span>
    </div>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Button.tsx components/ui/SectionLabel.tsx components/ui/ImageSlot.tsx
git commit -m "feat: ui primitives (Button, SectionLabel, ImageSlot)"
```

---

## Task 5: Motion components — Reveal, CountUp

**Files:**
- Create: `components/motion/Reveal.tsx`, `components/motion/CountUp.tsx`

**Interfaces:**
- Consumes: `useCalm`.
- Produces:
  - `Reveal({ children, delay?, y?, as?, className?, style? })` — fades + slides up on first intersection; if calm, renders visible immediately.
  - `CountUp({ to, suffix?, className?, style? })` — cubic ease-out counter from 0 → `to` (1200ms) when scrolled into view; if calm, shows final value instantly.

- [ ] **Step 1: `Reveal.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/lib/useReducedMotion";

type Props = { children: React.ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties };

export function Reveal({ children, delay = 0, y = 28, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const calm = useCalm();
  useEffect(() => {
    if (calm) { setShown(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);
  return (
    <div ref={ref} className={className}
      style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: `CountUp.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/lib/useReducedMotion";

export function CountUp({ to, suffix = "", className, style }: { to: number; suffix?: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const calm = useCalm();
  useEffect(() => {
    if (calm) { setVal(to); return; }
    const el = ref.current; if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const start = performance.now(), dur = 1200;
        const step = (now: number) => {
          let p = Math.min(1, (now - start) / dur);
          p = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * p));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, calm]);
  return <div ref={ref} className={className} style={style}>{val}{suffix}</div>;
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/motion/Reveal.tsx components/motion/CountUp.tsx
git commit -m "feat: Reveal + CountUp motion components"
```

---

## Task 6: Motion components — Marquee, CardDeck, PageTransition

**Files:**
- Create: `components/motion/Marquee.tsx`, `components/motion/CardDeck.tsx`, `components/motion/PageTransition.tsx`

**Interfaces:**
- Consumes: `useCalm`, `LOGOS`, `QUESTIONS`.
- Produces:
  - `Marquee()` — infinite horizontal logo loop (renders `LOGOS` twice), masked edges; paused when calm.
  - `CardDeck()` — the five-question fan-out-on-hover deck.
  - `PageTransition({ children })` — `AnimatePresence` keyed on `usePathname()`, fade/translate.

- [ ] **Step 1: `Marquee.tsx`**

```tsx
"use client";
import { motion } from "motion/react";
import { LOGOS } from "@/lib/content";
import { useCalm } from "@/lib/useReducedMotion";

export function Marquee() {
  const calm = useCalm();
  const items = [...LOGOS, ...LOGOS];
  return (
    <div style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 18, overflow: "hidden",
      WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
      maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)" }}>
      <motion.div style={{ display: "flex", width: "max-content" }}
        animate={calm ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}>
        {items.map((l, i) => (
          <div key={i} style={{ flex: "none", padding: "30px 56px", fontSize: 18, fontWeight: 700, color: "#c2c2c9" }}>{l}</div>
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: `CardDeck.tsx`** — port `_initDeck` (design 1339-1368) and the card markup (design 261-267). Stacked rest transform `x:(i-2)*132, y:|i-2|*20, rotate:(i-2)*6`; hover spread `x:(i-2)*188, y:0`, hovered card `y:-32, scale:1.06`. Use `motion.div` with `whileHover` on the container controlling per-card animate via state.

```tsx
"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { QUESTIONS } from "@/lib/content";
import { EASE_OUT, GRAD_PANEL, INSET_HI } from "@/lib/tokens";

export function CardDeck() {
  const [hovered, setHovered] = useState(-1);
  return (
    <div onMouseLeave={() => setHovered(-1)}
      style={{ position: "relative", height: 330, maxWidth: 1000, margin: "30px auto 0" }}>
      {QUESTIONS.map((q, i) => {
        const rest = { x: (i - 2) * 132, y: Math.abs(i - 2) * 20, rotate: (i - 2) * 6, scale: 1 };
        const spread = { x: (i - 2) * 188, y: i === hovered ? -32 : 0, rotate: 0, scale: i === hovered ? 1.06 : 1 };
        const t = hovered < 0 ? rest : spread;
        const dark = i === QUESTIONS.length - 1;
        return (
          <motion.div key={i} onMouseEnter={() => setHovered(i)} animate={t}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            style={{ position: "absolute", left: "50%", top: 46, marginLeft: -110, width: 220, height: 204,
              zIndex: i === hovered ? 50 : hovered < 0 ? 10 - Math.abs(i - 2) : 10,
              cursor: "pointer", padding: 24, borderRadius: 20, boxSizing: "border-box",
              background: dark ? GRAD_PANEL : "#fff", color: dark ? "#fff" : "#1d1d1f",
              boxShadow: dark ? `0 22px 50px rgba(0,0,0,.28), ${INSET_HI}` : "0 16px 40px rgba(0,0,0,.10)",
              border: dark ? "none" : "1px solid rgba(0,0,0,.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{q.num}</div>
            <div style={{ marginTop: 14, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{q.title}</div>
            <div style={{ marginTop: 8, fontSize: 14, color: dark ? "rgba(255,255,255,.65)" : "#86868b" }}>{q.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
```
(Ensure `QUESTIONS` items have `{ num, title, sub }`.)

- [ ] **Step 3: `PageTransition.tsx`**

```tsx
"use client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/motion/Marquee.tsx components/motion/CardDeck.tsx components/motion/PageTransition.tsx
git commit -m "feat: Marquee, CardDeck, PageTransition"
```

---

## Task 7: 3D — MiniShape

**Files:**
- Create: `components/three/MiniShape.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, `three`, `C` tokens, `useCalm`.
- Produces: `MiniShape({ shape, light?, className? })` where `shape: "octa"|"box"|"tetra"|"ico"`.

- [ ] **Step 1: Implement** (port `_initMini`, design 1276-1323) — a `<Canvas>` with a wireframe edges geometry + vertex node spheres, continuous rotation.

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

type Shape = "octa" | "box" | "tetra" | "ico";

function makeGeo(shape: Shape): THREE.BufferGeometry {
  if (shape === "box") return new THREE.BoxGeometry(1.5, 1.5, 1.5);
  if (shape === "tetra") return new THREE.TetrahedronGeometry(1.4);
  if (shape === "ico") return new THREE.IcosahedronGeometry(1.3, 0);
  return new THREE.OctahedronGeometry(1.3);
}

function Solid({ shape, light, calm }: { shape: Shape; light: boolean; calm: boolean }) {
  const grp = useRef<THREE.Group>(null);
  const { edges, nodes } = useMemo(() => {
    const geo = makeGeo(shape);
    const edges = new THREE.EdgesGeometry(geo);
    const pos = geo.attributes.position; const seen = new Set<string>(); const nodes: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
      const x = +pos.getX(i).toFixed(2), y = +pos.getY(i).toFixed(2), z = +pos.getZ(i).toFixed(2);
      const k = `${x},${y},${z}`; if (seen.has(k)) continue; seen.add(k); nodes.push([x, y, z]);
    }
    return { edges, nodes };
  }, [shape]);
  const lcol = light ? 0xb8b8bf : 0x9a9aa0;
  const ncol = light ? 0xf2f2f4 : 0x1d1d1f;
  useFrame((_, dt) => { if (grp.current && !calm) { grp.current.rotation.y += dt * 0.5; grp.current.rotation.x = Math.sin(performance.now() / 2500) * 0.3 + 0.35; } });
  return (
    <group ref={grp}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={lcol} transparent opacity={0.85} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshBasicMaterial color={ncol} />
        </mesh>
      ))}
    </group>
  );
}

export function MiniShape({ shape, light = false, className }: { shape: Shape; light?: boolean; className?: string }) {
  const calm = useCalm();
  return (
    <div className={className} style={{ pointerEvents: "none" }}>
      <Canvas camera={{ fov: 42, position: [0, 0, 4.4] }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Solid shape={shape} light={light} calm={calm} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/three/MiniShape.tsx
git commit -m "feat: MiniShape 3D wireframe solids"
```

---

## Task 8: 3D — HeroSkeleton

**Files:**
- Create: `components/three/HeroSkeleton.tsx`

**Interfaces:**
- Consumes: `three`, `@react-three/fiber`, `useCalm`.
- Produces: `HeroSkeleton({ progressRef })` — fills its parent; reads a scroll-progress ref (0..1) each frame. `progressRef: React.MutableRefObject<number>`.

- [ ] **Step 1: Implement** — port `_buildSkeleton` brain layers (design 1228-1256) + `_heroFrame` transform math (design 1087-1115). Use an orthographic camera in pixel space sized to the canvas; auto-spin + scroll shrink/rotate; progressive node lighting. Provide a `progressRef` updated by the hero section (Task 12). Use R3F `<Canvas orthographic>` with a resize-aware camera via `useThree`.

```tsx
"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function Brain({ progressRef, calm }: { progressRef: MutableRefObject<number>; calm: boolean }) {
  const grp = useRef<THREE.Group>(null);
  const { size } = useThree();
  const t0 = useRef(performance.now());

  const { segGeo, nodes } = useMemo(() => {
    const layers = [
      [V(-150,72,12),V(-150,18,40),V(-150,-36,-22),V(-150,-90,26)],
      [V(-74,108,-26),V(-74,54,36),V(-74,2,-46),V(-74,-52,30),V(-74,-104,-8)],
      [V(0,124,20),V(0,66,-36),V(0,10,42),V(0,-46,-32),V(0,-104,24),V(0,-150,-6)],
      [V(74,108,-22),V(74,54,34),V(74,2,-42),V(74,-52,28),V(74,-104,-10)],
      [V(150,72,14),V(150,18,-38),V(150,-36,24),V(150,-90,-18)],
    ];
    const bseg: THREE.Vector3[] = [];
    for (let l = 0; l < layers.length - 1; l++) layers[l].forEach((a) => layers[l + 1].forEach((b) => bseg.push(a, b)));
    const segGeo = new THREE.BufferGeometry().setFromPoints(bseg);
    const nodes: { v: THREE.Vector3; mid: boolean }[] = [];
    layers.forEach((ly, li) => ly.forEach((v) => nodes.push({ v, mid: li >= 1 && li <= 3 })));
    return { segGeo, nodes };
  }, []);

  const nodeRefs = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(() => {
    const g = grp.current; if (!g) return;
    const p = Math.max(0, Math.min(1, progressRef.current));
    const tm = (performance.now() - t0.current) / 1000;
    const cf = calm ? 0.4 : 1;
    const W = size.width, H = size.height;
    const it = { fx: 0.5, fy: 0.46, base: 1.16, start: 1.18, shrink: 0.5, spin: 0.12, rx: -0.18, ry0: -0.35, rySpan: 1.3, rz0: 0, rzSpan: 0.16, dx: 0, dy: -0.02 };
    const sc = it.base * (it.start - p * it.shrink);
    g.scale.set(sc, sc, sc);
    g.position.set(W * (it.fx + it.dx * p), H * (it.fy + it.dy * p), 0);
    g.rotation.x = it.rx;
    g.rotation.y = it.ry0 + p * it.rySpan + tm * it.spin * cf;
    g.rotation.z = it.rz0 + p * it.rzSpan;
    const lit = Math.round(p * (nodes.length - 1));
    nodeRefs.current.forEach((m, i) => { if (m) m.color.setHex(i <= lit ? 0x1d1d1f : 0xcfcfd4); });
  });

  return (
    <group ref={grp}>
      <lineSegments geometry={segGeo}>
        <lineBasicMaterial color={0x9a9aa0} transparent opacity={0.26} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.v}>
          <sphereGeometry args={[4.4, 14, 14]} />
          <meshBasicMaterial ref={(m) => { if (m) nodeRefs.current[i] = m; }} color={n.mid ? 0x1d1d1f : 0xcfcfd4} />
        </mesh>
      ))}
    </group>
  );
}

function OrthoCam() {
  const { size, camera } = useThree();
  const cam = camera as THREE.OrthographicCamera;
  cam.left = 0; cam.right = size.width; cam.top = 0; cam.bottom = size.height;
  cam.near = -4000; cam.far = 4000; cam.position.z = 1200; cam.updateProjectionMatrix();
  return null;
}

export function HeroSkeleton({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const calm = useCalm();
  return (
    <Canvas orthographic dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <OrthoCam />
      <Brain progressRef={progressRef} calm={calm} />
    </Canvas>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/three/HeroSkeleton.tsx
git commit -m "feat: HeroSkeleton 3D neural brain"
```

---

## Task 9: 3D — PencilRail (global)

**Files:**
- Create: `components/three/PencilRail.tsx`

**Interfaces:**
- Consumes: `three`, `@react-three/fiber`, `useCalm`.
- Produces: `PencilRail()` — a fixed full-viewport overlay (SVG drawn line behind via portal-free fixed div + a `<Canvas>` pencil above). Self-contained; reads scroll + locates `#af-demo-end` each frame.

- [ ] **Step 1: Implement** — port `_initRail`/`_buildRailPencil`/`_railFrame` (design 1370-1523). Render two fixed layers: an SVG path (`z-index:1`) and the pencil Canvas (`z-index:250`). Compute path + dash-offset + pencil position/rotation per frame in a `useFrame`; gate entry after hero, end at `#af-demo-end`.

```tsx
"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

function buildPencil(): THREE.Group {
  const inner = new THREE.Group();
  const LEN = 225, R = 14;
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x48484a, transparent: true, opacity: 1 });
  inner.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R, R, LEN, 6)), edgeMat));
  const cone = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.ConeGeometry(R, 52, 6)), edgeMat);
  cone.rotation.x = Math.PI; cone.position.y = -(LEN / 2) - 26; inner.add(cone);
  const ferrule = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R, R, 14, 6)), edgeMat);
  ferrule.position.y = LEN / 2 + 7; inner.add(ferrule);
  const cap = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R * 0.92, R * 0.92, 18, 12)), edgeMat);
  cap.position.y = LEN / 2 + 23; inner.add(cap);
  const lead = new THREE.Mesh(new THREE.ConeGeometry(R * 0.34, 24, 10), new THREE.MeshBasicMaterial({ color: 0x111113 }));
  lead.rotation.x = Math.PI; lead.position.y = -(LEN / 2) - 42; inner.add(lead);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x1d1d1f });
  const ng = new THREE.SphereGeometry(3.4, 10, 10);
  for (let s = 0; s < 6; s++) { const a = (s / 6) * Math.PI * 2; [LEN / 2, -LEN / 2].forEach((yy) => { const sp = new THREE.Mesh(ng, nodeMat); sp.position.set(Math.cos(a) * R, yy, Math.sin(a) * R); inner.add(sp); }); }
  inner.position.y = LEN / 2 + 53; inner.rotation.x = 0.5;
  const pencil = new THREE.Group(); pencil.add(inner);
  return pencil;
}

function Pencil({ pathEl, calm }: { pathEl: React.RefObject<SVGPathElement | null>; calm: boolean }) {
  const { size, camera } = useThree();
  const pencilRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group | null>(null);
  const st = useRef({ px: NaN, py: NaN, pa: NaN, spin: 0 });
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.left = 0; cam.right = size.width; cam.top = 0; cam.bottom = size.height; cam.near = -5000; cam.far = 5000; cam.position.z = 2000; cam.updateProjectionMatrix();
  }, [size, camera]);
  useFrame(() => {
    const grp = pencilRef.current, path = pathEl.current; if (!grp || !path) return;
    if (!innerRef.current) innerRef.current = grp.children[0] as THREE.Group;
    const vw = size.width, vh = size.height;
    const sy = window.scrollY || 0;
    const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const hero = document.getElementById("af-hero");
    const gate = hero ? Math.max(0, hero.offsetTop + hero.offsetHeight - vh * 1.05) : 0;
    const btn = document.getElementById("af-demo-end");
    let btnDocY = docH;
    if (btn) { const b = btn.getBoundingClientRect(); btnDocY = b.top + sy + b.height * 0.5; }
    let endScroll = Math.min(btnDocY - vh * 0.62, docH - vh); endScroll = Math.max(endScroll, gate + 1);
    const p = Math.max(0, Math.min(1, (sy - gate) / (endScroll - gate)));
    const vis = Math.max(0, Math.min(1, (sy - gate) / Math.max(1, vh * 0.5)));
    const btnViewY = btnDocY - sy;
    const topY = vh * 0.06;
    const endY = Math.max(topY + 60, Math.min(btnViewY, vh * 0.94));
    const span = endY - topY;
    const cx = vw * 0.5, amp = Math.min(vw * 0.14, 170), freq = 1.7, N = 90;
    const pts: [number, number][] = []; let d = "", tot = 0, prev: [number, number] | null = null;
    for (let i = 0; i <= N; i++) {
      const t = i / N; const x = cx + amp * Math.cos(t * Math.PI * freq); const y = topY + t * span;
      pts.push([x, y]); d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      if (prev) tot += Math.hypot(x - prev[0], y - prev[1]); prev = [x, y];
    }
    path.setAttribute("d", d); path.style.strokeDasharray = String(tot); path.style.strokeDashoffset = (tot * (1 - p)).toFixed(1);
    path.style.opacity = (0.12 * vis).toFixed(3);
    const idx = p * N, i0 = Math.floor(idx), i1 = Math.min(N, i0 + 1), fr = idx - i0;
    const tx = pts[i0][0] + (pts[i1][0] - pts[i0][0]) * fr;
    const ty = pts[i0][1] + (pts[i1][1] - pts[i0][1]) * fr;
    const s = st.current;
    if (Number.isNaN(s.px)) { s.px = tx; s.py = ty; }
    s.px += (tx - s.px) * 0.16; s.py += (ty - s.py) * 0.16;
    grp.position.set(s.px, s.py, 0);
    const dx = pts[i1][0] - pts[i0][0], dy = (pts[i1][1] - pts[i0][1]) || 1;
    let ang = Math.atan2(-dy, -dx) - Math.PI / 2 + 0.22;
    if (Number.isNaN(s.pa)) s.pa = ang;
    let da = ang - s.pa; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
    s.pa += da * 0.12; grp.rotation.z = s.pa;
    if (!calm) { s.spin += 0.014; if (innerRef.current) innerRef.current.rotation.y = s.spin; }
    grp.parent!.parent!.children; // no-op
    (grp as THREE.Group).visible = vis > 0;
    const canvasEl = (document.getElementById("af-pencil-canvas") as HTMLCanvasElement | null);
    if (canvasEl) canvasEl.style.opacity = (0.55 * vis).toFixed(3);
  });
  const grp = useRef<THREE.Group>(null);
  // build once
  useEffect(() => { if (pencilRef.current && pencilRef.current.children.length === 0) pencilRef.current.add(buildPencil().children[0]); }, []);
  return <group ref={pencilRef} />;
}

export function PencilRail() {
  const pathRef = useRef<SVGPathElement>(null);
  const calm = useCalm();
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <svg preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          <path ref={pathRef} d="" fill="none" stroke="#9a9aa0" strokeWidth={2.5} strokeLinecap="round" style={{ opacity: 0.12 }} />
        </svg>
      </div>
      <div style={{ position: "fixed", inset: 0, zIndex: 250, pointerEvents: "none" }}>
        <Canvas id="af-pencil-canvas" orthographic dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ position: "absolute", inset: 0, transition: "opacity .25s ease" }}>
          <Pencil pathEl={pathRef} calm={calm} />
        </Canvas>
      </div>
    </>
  );
}
```

Note for implementer: the `buildPencil().children[0]` re-parent trick attaches the prebuilt `inner` group; verify the pencil renders and `innerRef` resolves. If the `grp.parent!.parent!` no-op line causes a lint error, delete it. Confirm the canvas `id="af-pencil-canvas"` ends up on the actual `<canvas>` (R3F forwards unknown props to the canvas DOM node).

- [ ] **Step 2: Verify typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/three/PencilRail.tsx
git commit -m "feat: global scroll-driven PencilRail 3D"
```

---

## Task 10: Layout chrome — Nav, Footer, layout wiring

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `Button`, `PencilRail`, `PageTransition`, `NEXT_PUBLIC_SIGNUP_URL`.
- Produces: global Nav (sticky, blur-on-scroll, active link), Footer, and a layout that wraps `children` in `PageTransition` and renders `PencilRail` once.

- [ ] **Step 1: `Nav.tsx`** — port design 70-86. Sticky; transparent → `rgba(255,255,255,.72)` + blur after 18px scroll (scroll listener + state); active link via `usePathname()`. Logo links to `/`. "Book a Demo" → `/book-demo`; "Get Started" → `SIGNUP_URL`.

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/book-demo";

export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 18);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav id="af-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px",
      borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,.08)" : "rgba(0,0,0,0)"}`,
      background: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
      backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
      transition: "background .35s ease, backdrop-filter .35s ease, border-color .35s ease" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span style={{ position: "relative", display: "inline-block", width: 26, height: 26 }}>
          <span style={{ position: "absolute", left: 0, top: 2, width: 18, height: 18, borderRadius: 6, border: "2px solid #1d1d1f" }} />
          <span style={{ position: "absolute", left: 7, top: 7, width: 18, height: 18, borderRadius: 6, background: GRAD_DARK, boxShadow: "inset 0 1px 0 rgba(255,255,255,.22)" }} />
        </span>
        <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>ArchiFlask</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 14.5, fontWeight: 500 }}>
        {NAV_LINKS.map((l) => {
          const on = path === l.href;
          return (
            <Link key={l.href} href={l.href} className="af-navlink"
              style={{ padding: "8px 14px", borderRadius: 980, color: on ? "#1d1d1f" : "#6e6e73", background: on ? "#f5f5f7" : "transparent", fontWeight: on ? 600 : 500, transition: "color .2s ease, background .2s ease" }}>
              {l.label}
            </Link>
          );
        })}
        <Link href="/book-demo" style={{ marginLeft: 6, padding: "8px 16px", borderRadius: 980, color: "#1d1d1f", border: "1px solid rgba(0,0,0,.14)", background: "#fff" }}>Book a Demo</Link>
        <a href={SIGNUP_URL} style={{ marginLeft: 4, padding: "9px 20px", borderRadius: 980, color: "#fff", fontWeight: 500, background: GRAD_DARK, boxShadow: `0 1px 2px rgba(0,0,0,.28), ${INSET_HI}` }}>Get Started</a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: `Footer.tsx`** — port design 899-931 (link columns to all routes + Book a Demo / Get Started / Pricing; copyright + Wallzehn line). Use `Link` for internal routes.

- [ ] **Step 3: Wire `app/layout.tsx`**

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PencilRail } from "@/components/three/PencilRail";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "ArchiFlask — Run your firm on a system",
  description: "The operating platform for design, construction & PMC firms — projects, drawings, teams, site activity, approvals and profitability, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <PencilRail />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build + dev render**

Run: `npm run build`
Expected: PASS. Then `npm run dev`, open `/`, confirm nav (blur on scroll), footer, pencil canvas present (no crash).

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: global Nav, Footer, layout wiring"
```

---

## Task 11: Home — non-hero sections

**Files:**
- Create: `components/sections/home/{About,Statement,Problem,Questions,Features,Capabilities,ForClients,Impact,Pricing,FinalCta}.tsx`
- Create: `components/ui/{StatCard,PricingCard}.tsx`

**Interfaces:**
- Consumes: content exports, `Reveal`, `CountUp`, `MiniShape`, `Marquee`, `CardDeck`, `Button`, `ImageSlot`, `SectionLabel`.
- Produces: section components rendered by `app/page.tsx` (Task 12). `FinalCta` renders the `id="af-demo-end"` Book-a-Demo button.

- [ ] **Step 1: `StatCard.tsx`** — port design 159-178: a stat card with `CountUp` (or static), label, and a `MiniShape` in the corner; dark variant.

- [ ] **Step 2: `PricingCard.tsx`** — port design 386-462: tier label, price (with strike/period), feature list with ✓/—, CTA button, "Most Popular" badge, dark variant. Driven by `PRICING` items.

- [ ] **Step 3: Build each section component** porting the cited design ranges, swapping raw values for tokens and `data-reveal` for `<Reveal>`:
  - `About.tsx` — design 139-216 (heading row, copy, stat-card grid via `StatCard`, orbit diagram 183-195, `<Marquee/>`).
  - `Statement.tsx` — design 218-228 (inline image-pills via `ImageSlot` pill shape).
  - `Problem.tsx` — design 230-253 (3 cards).
  - `Questions.tsx` — design 255-269 (label, heading, `<CardDeck/>`).
  - `Features.tsx` — design 271-316 (2 split rows w/ `ImageSlot`, 3 cards).
  - `Capabilities.tsx` — design 318-333 (4×2 grid; last card dark).
  - `ForClients.tsx` — design 335-352 (dark gradient, phone mock w/ `ImageSlot`).
  - `Impact.tsx` — design 354-372 (2 cards).
  - `Pricing.tsx` — design 374-467 (`PricingCard` grid + GST note).
  - `FinalCta.tsx` — design 469-486; the primary button gets `id="af-demo-end"` (use `Button id="af-demo-end" href="/book-demo"`).

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/home components/ui/StatCard.tsx components/ui/PricingCard.tsx
git commit -m "feat: home non-hero sections + StatCard/PricingCard"
```

---

## Task 12: Home — Hero + page assembly

**Files:**
- Create: `components/sections/home/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `HeroSkeleton`, `Reveal`, `Button`, all home sections.
- Produces: `Hero` (client) owning a `progressRef` updated on scroll and passed to `HeroSkeleton`; `app/page.tsx` composing the full home page.

- [ ] **Step 1: `Hero.tsx`** — port design 103-137. Section `id="af-hero"`, height `215vh`, sticky inner pinned 100vh. Blueprint grid backdrop, `HeroSkeleton` canvas in the right 58%, floating caption, headline (with gradient text + `afRise`), CTA buttons, scroll hint. A scroll listener computes hero progress (`(-rect.top)/(height-innerHeight)` clamped 0..1) into `progressRef.current`.

```tsx
"use client";
import { useEffect, useRef } from "react";
import { HeroSkeleton } from "@/components/three/HeroSkeleton";
import { Button } from "@/components/ui/Button";
import { GRAD_TEXT } from "@/lib/tokens";

export function Hero() {
  const progressRef = useRef(0);
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const on = () => {
      const el = secRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const scrollable = Math.max(1, r.height - window.innerHeight);
      progressRef.current = Math.max(0, Math.min(1, -r.top / scrollable));
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section ref={secRef} id="af-hero" style={{ position: "relative", height: "215vh", background: "transparent" }}>
      <div id="af-hero-pin" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* blueprint grid backdrop — port design 108 */}
        {/* skeleton canvas region */}
        <div id="af-skel" style={{ position: "absolute", right: 0, top: 0, width: "58%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
          <HeroSkeleton progressRef={progressRef} />
        </div>
        {/* floating caption — port design 112-115 */}
        {/* headline + CTAs — port design 117-128, using GRAD_TEXT for the gradient span and Button */}
        {/* scroll hint — port design 131-134 */}
      </div>
    </section>
  );
}
```
Implementer: fill the commented blocks verbatim from the design (grid backdrop, caption with ping dot, headline with `background:GRAD_TEXT;backgroundClip:text;color:transparent`, two `Button`s → `/book-demo`, scroll hint with `afHint` animation).

- [ ] **Step 2: `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/home/Hero";
import { About } from "@/components/sections/home/About";
import { Statement } from "@/components/sections/home/Statement";
import { Problem } from "@/components/sections/home/Problem";
import { Questions } from "@/components/sections/home/Questions";
import { Features } from "@/components/sections/home/Features";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ForClients } from "@/components/sections/home/ForClients";
import { Impact } from "@/components/sections/home/Impact";
import { Pricing } from "@/components/sections/home/Pricing";
import { FinalCta } from "@/components/sections/home/FinalCta";

export default function HomePage() {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <Hero /><About /><Statement /><Problem /><Questions /><Features />
      <Capabilities /><ForClients /><Impact /><Pricing /><FinalCta />
    </main>
  );
}
```

- [ ] **Step 3: Verify build + visual**

Run: `npm run build` then `npm run dev`. Open `/`. Confirm: hero brain animates and reacts to scroll; pencil enters after hero and ends at the final CTA; marquee + card deck + reveals + count-up all work.
Expected: no console errors; behaviors match design.

- [ ] **Step 4: Commit**

```bash
git add components/sections/home/Hero.tsx app/page.tsx
git commit -m "feat: home hero + full home page assembly"
```

---

## Task 13: About page

**Files:**
- Create: `components/sections/about/{Hero,Origin,Product,Founders,Vision,Cta}.tsx`, `app/about/page.tsx`

**Interfaces:**
- Consumes: `ABOUT_PRODUCT`, `FOUNDERS`, `Reveal`, `Button`, `ImageSlot`, `SectionLabel`.
- Produces: `/about` route; `Cta` button carries `id="af-demo-end"`.

- [ ] **Step 1: Build sections** porting design 565-674: Hero (570-576), Origin story + image (579-592), Product 3 cards (595-620), Founders (623-653, exact bios + circle `ImageSlot`s), Vision dark (656-661), CTA (664-672, button `id="af-demo-end"`).

- [ ] **Step 2: `app/about/page.tsx`** composes them in a `<main style={{position:'relative',zIndex:2}}>`.

- [ ] **Step 3: Verify build + visual**

Run: `npm run build`; open `/about`. Confirm content matches design, pencil ends at CTA.

- [ ] **Step 4: Commit**

```bash
git add components/sections/about app/about/page.tsx
git commit -m "feat: about page"
```

---

## Task 14: Impact page

**Files:**
- Create: `components/sections/impact/{Hero,Outcomes,Stories,Reviews,Domains,Cta}.tsx`, `app/impact/page.tsx`

**Interfaces:**
- Consumes: `IMPACT_OUTCOMES`, `IMPACT_STORIES`, `REVIEWS`, `DOMAINS`, `Reveal`, `Button`, `SectionLabel`.
- Produces: `/impact` route; `Cta` button `id="af-demo-end"`.

- [ ] **Step 1: Build sections** porting design 677-783: Hero (682-688), Outcomes 5-grid (691-701), Stories 2 cards (705-722), Reviews 6-grid w/ dark card (725-759), Domains 4 pills (762-772), CTA (775-783, `id="af-demo-end"`).

- [ ] **Step 2: `app/impact/page.tsx`** composes them.

- [ ] **Step 3: Verify build + visual**

Run: `npm run build`; open `/impact`. Confirm matches design.

- [ ] **Step 4: Commit**

```bash
git add components/sections/impact app/impact/page.tsx
git commit -m "feat: impact page"
```

---

## Task 15: Blog page

**Files:**
- Create: `components/sections/blog/{Hero,Featured,Grid,Cta}.tsx`, `app/blog/page.tsx`

**Interfaces:**
- Consumes: `BLOG_FEATURED`, `BLOG_POSTS`, `Reveal`, `Button`, `ImageSlot`, `SectionLabel`.
- Produces: `/blog` route. Post cards link to `/blog` (design has no article pages). `Cta` button `id="af-demo-end"`.

- [ ] **Step 1: Build sections** porting design 788-893: Hero (793-799), Featured (802-814 w/ `ImageSlot`), 6-post Grid (817-881), dark CTA card (884-893, button `id="af-demo-end"`).

- [ ] **Step 2: `app/blog/page.tsx`** composes them.

- [ ] **Step 3: Verify build + visual**

Run: `npm run build`; open `/blog`. Confirm matches design.

- [ ] **Step 4: Commit**

```bash
git add components/sections/blog app/blog/page.tsx
git commit -m "feat: blog page"
```

---

## Task 16: Book-a-Demo page + API route

**Files:**
- Create: `app/book-demo/page.tsx`, `app/api/book-demo/route.ts`, `.env.example`

**Interfaces:**
- Consumes: `DEMO_EXPECT`, `DEMO_DAYS`, `DEMO_SLOTS`, `Button`.
- Produces: `/book-demo` route (client form) + `POST /api/book-demo`.

- [ ] **Step 1: `app/api/book-demo/route.ts`**

```ts
import { NextResponse } from "next/server";

type Booking = { name: string; firm?: string; email: string; phone?: string; day?: string; slot?: string };

export async function POST(req: Request) {
  let body: Booking;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 422 });
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const summary = `Demo booking\nName: ${body.name}\nFirm: ${body.firm || "-"}\nEmail: ${body.email}\nPhone: ${body.phone || "-"}\nDay: ${body.day || "-"}\nSlot: ${body.slot || "-"}`;
  if (key && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({ from: "ArchiFlask <onboarding@resend.dev>", to, subject: `New demo booking — ${body.name}`, text: summary });
    } catch (e) {
      console.error("[book-demo] email failed, logging instead:", e, summary);
    }
  } else {
    // TODO: configure RESEND_API_KEY + BOOKING_TO_EMAIL in .env.local for production email.
    console.log("[book-demo] (no email configured) ", summary);
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: `.env.example`**

```bash
# Email provider for demo bookings (optional — without these, bookings are logged server-side)
RESEND_API_KEY=
BOOKING_TO_EMAIL=
# External sign-up URL for the "Get Started" CTA (optional — falls back to /book-demo)
NEXT_PUBLIC_SIGNUP_URL=
```

- [ ] **Step 3: `app/book-demo/page.tsx`** — port design 491-563. Client component: state for `submitted`, `who`, `day`, `slot`, and the four fields. Calendar grid (June 2026, IST; selectable days `DEMO_DAYS`, others disabled), time-slot buttons (`DEMO_SLOTS`), inputs. On submit: validate, `fetch("/api/book-demo",{method:"POST",body:JSON.stringify(...)})`, set `submitted`, scroll top. Success state renders "You're booked{who}." (design 552-559).

```tsx
"use client";
import { useState } from "react";
import { DEMO_EXPECT, DEMO_DAYS, DEMO_SLOTS } from "@/lib/content";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

export default function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [who, setWho] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !email) return;
    const payload = { name, email, firm: String(fd.get("firm") || ""), phone: String(fd.get("phone") || ""), day: day || "", slot: slot || "" };
    try { await fetch("/api/book-demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); } catch {}
    setWho(name.split(" ")[0]); setSubmitted(true); window.scrollTo(0, 0);
  };
  // ...render: notSubmitted → expect panel (DEMO_EXPECT) + form (calendar/slots/fields);
  //            submitted → success card "You're booked{who ? ', '+who : ''}."
  return <main style={{ position: "relative", zIndex: 2, padding: "150px 24px 100px", background: "radial-gradient(120% 70% at 50% 0%,#f5f5f7,#fff 60%)", minHeight: "100vh" }}>{/* port design 493-562 */}</main>;
}
```
Implementer: fill the render verbatim from design 493-562; bind day/slot buttons to `setDay`/`setSlot` with the selected style (`background:GRAD_DARK;color:#fff`).

- [ ] **Step 4: Verify build + behavior**

Run: `npm run build` then `npm run dev`. Open `/book-demo`: pick day+slot, fill name+email, submit → success state shows; server console logs the booking. Pencil ends at... note: book-demo's primary CTA is the submit button; there is no `af-demo-end` here, so the pencil ends near page bottom (matches design behavior where demo page has no `af-demo-end`).

- [ ] **Step 5: Commit**

```bash
git add app/book-demo/page.tsx app/api/book-demo/route.ts .env.example
git commit -m "feat: book-a-demo page + email API route"
```

---

## Task 17: Wire real images + responsive polish

**Files:**
- Create: `public/images/*` (copied from `drafts/uploads`)
- Modify: section components that use `ImageSlot` (Features, ForClients, About Origin, Blog); `app/globals.css` (mobile rules)

**Interfaces:**
- Consumes: `drafts/.image-slots.state.json` (which slots had real images: `af-feat-drawings`, `af-feat-effort`, `af-obj1`), `drafts/uploads/*`.

- [ ] **Step 1: Inspect filled slots + pick assets**

Run:
```bash
cat drafts/.image-slots.state.json | python3 -m json.tool | head -60
ls -la drafts/uploads
```
Identify which upload maps to `af-feat-drawings` / `af-feat-effort` (the product screenshots) and choose sensible images for client app, founders, about story, blog covers.

- [ ] **Step 2: Copy chosen images**

```bash
mkdir -p public/images
# copy + rename the chosen screenshots, e.g.:
cp "drafts/uploads/<chosen-drawings>.png" public/images/feature-drawings.png
cp "drafts/uploads/<chosen-effort>.png" public/images/feature-effort.png
# ...client-app.png, about-story.png, founder-1.jpg, founder-2.jpg, blog-*.png as chosen
ls public/images
```

- [ ] **Step 3: Pass `src` to the matching `ImageSlot`s** in Features/ForClients/About-Origin/Founders/Blog. Slots without a chosen asset keep the placeholder.

- [ ] **Step 4: Port mobile media query** from design 29-52 into `app/globals.css`, adapting selectors to the component classNames (hero height, single-column grids, static card deck, skeleton full-width @ .26 opacity, nav secondary links hidden).

- [ ] **Step 5: Verify build + responsive**

Run: `npm run build` then `npm run dev`. Check `/` at 375px and 1280px widths: images load, layouts collapse to single column on mobile, no overflow.

- [ ] **Step 6: Commit**

```bash
git add public/images components app/globals.css
git commit -m "feat: wire real screenshots + responsive polish"
```

---

## Task 18: Final verification + docs

**Files:**
- Create: `README.md`
- Modify: none (verification pass)

- [ ] **Step 1: Full typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: both PASS, all 5 routes + `/api/book-demo` listed.

- [ ] **Step 2: Manual route + behavior checklist** (dev server)

Verify each: `/`, `/about`, `/impact`, `/blog`, `/book-demo` render; nav active state correct; all nav/footer/CTA links navigate; page transitions animate; hero brain + mini shapes + pencil rail animate; pencil terminates at `af-demo-end` on `/`, `/about`, `/impact`, `/blog`; reveals/count-up/marquee/deck work; demo form submits + success; reduced-motion (OS setting) relaxes animations.

- [ ] **Step 3: `README.md`** — short: stack, `npm install`, `npm run dev`, env vars (link `.env.example`), note that `drafts/` holds the original design + assets, and that the design source of truth is `drafts/ArchiFlask Site.dc.html`.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: README + final verification"
```

---

## Self-review (completed against spec)

- **Spec coverage:** routing (Tasks 10,12-16) ✓; tokens (2) ✓; content (3) ✓; 3D hero/mini/pencil (7,8,9) ✓; motion reveal/countup/marquee/deck/transition (5,6) ✓; nav/footer (10) ✓; all 5 pages + pricing (11-16) ✓; demo form + email API + env (16) ✓; Get Started env CTA (10) ✓; images + cleanup (1,17) ✓; a11y/reduced-motion (3,5,6,7,8,9,17) ✓; verification (18) ✓.
- **Placeholder scan:** section tasks reference exact design line ranges + provide full code for all novel/infra components; the `{/* port design N-M */}` markers are deliberate verbatim-copy instructions tied to specific lines, not vague TODOs.
- **Type consistency:** `progressRef: MutableRefObject<number>` consistent (Tasks 8,12); content export names consistent (Task 3 ↔ consumers); `Button` variants consistent; `af-demo-end` id placement consistent across pages.
