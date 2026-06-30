# ArchiFlask — Full Architectural Audit Report

> **Scope**: Every source file in the project, deployment config, asset pipeline, API security, error handling, testing, SEO, and production readiness.
> **Codebase stats**: ~2,700 lines of source across 43 TypeScript/CSS files.

---

## Summary Score Card

| Category | Severity | Status |
|----------|----------|--------|
| 1. Styling Architecture (Inline CSS / Tailwind Bypass) | 🔴 Critical | Blocks scalability |
| 2. Responsive Design (`!important` Overrides) | 🔴 Critical | Fragile, breaks cascade |
| 3. WebGL Canvas Proliferation | 🟠 High | GPU exhaustion risk |
| 4. Image Asset Pipeline | 🟠 High | ~6.6 MB unoptimized PNGs |
| 5. Static Export vs. API Route Conflict | 🔴 Critical | **Book-a-Demo form is broken in production** |
| 6. Missing Error Boundaries & 404 Page | 🟠 High | Blank screen on crash |
| 7. Zero Test Coverage | 🟠 High | No safety net for changes |
| 8. Split/Duplicated Design Tokens | 🟡 Medium | Drift risk between CSS/JS |
| 9. Duplicate Build Artifacts in `out/` | 🟡 Medium | Repo bloat, confusion |
| 10. CSP Header Blocks Google Fonts | 🟠 High | Font may fail in production |
| 11. No Rate-Limiting or CSRF on API | 🟡 Medium | Spam risk on demo form |
| 12. Hardcoded Demo Calendar (June 2026) | 🟡 Medium | Stale within weeks |
| 13. SEO: Missing OG Image, favicon | 🟡 Medium | Broken social previews |
| 14. Accessibility Gaps | 🟡 Medium | Keyboard/screen-reader issues |
| 15. Client-Side `PageTransition` with App Router | 🟡 Medium | Conflicts with RSC model |
| 16. `three.js` Bundle Size | 🟡 Medium | ~150 KB+ gzipped JS overhead |

---

## 1. 🔴 Styling Architecture — Tailwind CSS Installed But Completely Bypassed

### The Numbers

| Metric | Count |
|--------|-------|
| `style={{ ... }}` occurrences | **381** |
| `className=` occurrences | **40** |
| Tailwind utility classes used | **~0** (classNames are only grid collapse helpers like `af-grid-2`) |

**Tailwind v4 is installed, configured, imported — and then completely ignored.** Every component writes raw `React.CSSProperties` objects with hardcoded px values, hex colors, and animation timings.

### Example — [Nav.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/layout/Nav.tsx)
The navigation bar alone has **20+ inline style blocks**, each with 5–10 properties. A single link:
```tsx
style={{ padding: "8px 14px", borderRadius: 980, color: on ? "#1d1d1f" : "#6e6e73",
         background: on ? "#f5f5f7" : "transparent", fontWeight: on ? 700 : 500,
         transition: "color .2s ease, background .2s ease" }}
```

### Impact
- **No style reuse** — identical patterns (section padding, card radius, eyebrow label styling) are copy-pasted across 30+ components.
- **Impossible to theme** — switching to dark mode or adjusting the brand palette means editing hundreds of inline objects.
- **Bundle overhead** — inline styles cannot be extracted to static CSS, increasing HTML payload.
- **Hover/focus/active states impossible** — React inline styles don't support `:hover`, `:focus`, `::before`, etc., so interactive feedback is missing on most clickable elements.

### Remediation
Migrate all 381 `style={{}}` instances to Tailwind utility classes (or CSS Module classes for complex states). Use the defined `@theme` tokens in [globals.css](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/globals.css#L3-L18):
```tsx
// Before:
<section style={{ padding: "120px 24px", background: "#fff" }}>

// After:
<section className="py-[120px] px-6 bg-white">
```

---

## 2. 🔴 Responsive Design — `!important` Cascade Override War

Because inline `style={{}}` has the **highest CSS specificity**, the only way to make components responsive is to override everything with `!important` in a global media query block.

### Current approach — [globals.css L105–188](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/globals.css#L105-L188)
```css
@media (max-width: 760px) {
  #af-nav { padding: 12px 16px !important; }
  .af-nav-links { display: none !important; }
  h1 { font-size: 42px !important; line-height: 1.05 !important; }
  h2 { font-size: 32px !important; }
  .af-grid-2, .af-grid-3, .af-grid-4, .af-grid-5 {
    grid-template-columns: 1fr !important;
  }
  .af-card { position: static !important; transform: none !important; ... }
}
```

### Impact
- **Only one breakpoint** (760px). No tablet, no large-desktop, no landscape handling.
- **Every responsive property needs `!important`** — impossible to fine-tune per-component.
- **Debugging hell** — DevTools shows every computed property as `!important`-overridden, making layout debugging extremely slow.
- **Adding new sections** means manually adding more `!important` rules.

### Remediation
Once inline styles are migrated to Tailwind classes, responsive design becomes trivial:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```
The entire 84-line `@media` block in `globals.css` can be deleted.

---

## 3. 🟠 WebGL Canvas Proliferation — Up to 7 Simultaneous Contexts

| Component | Canvas Count | Used By |
|-----------|-------------|---------|
| [PencilRail.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/three/PencilRail.tsx#L177) | 1 (global, always-on) | Every page |
| [HeroSkeleton.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/three/HeroSkeleton.tsx#L105) | 1 | Home hero |
| [MiniShape.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/three/MiniShape.tsx#L74) | 1 **per instance** | 4 stat cards on Home; 4 on About |

On the homepage, this means **6 WebGL contexts** running simultaneously (1 PencilRail + 1 HeroSkeleton + 4 MiniShapes). The About page adds 4 more MiniShapes.

### Impact
- Browsers cap WebGL contexts at ~8–16. Exceeding this silently kills the earliest contexts — the PencilRail or HeroSkeleton may go blank.
- Each R3F `<Canvas>` initializes its own `WebGLRenderer`, scene graph, and animation loop. 6 concurrent `requestAnimationFrame` loops are running.
- Mobile devices may lag, heat up, or drain battery visibly.

### Remediation
- **Option A (recommended)**: Replace MiniShape canvases with CSS 3D transforms or SVG animations — simple wireframe rotation doesn't need WebGL.
- **Option B**: Use R3F's `createPortal` / `Viewport` to render all mini shapes inside a single shared canvas.
- Add `frameloop="demand"` and IntersectionObserver to pause canvases when offscreen.

---

## 4. 🟠 Image Asset Pipeline — 6.6 MB of Unoptimized PNGs

| File | Size | Format |
|------|------|--------|
| [blog-5.png](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/public/images/blog-5.png) | **2.1 MB** | PNG |
| [blog-feat.png](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/public/images/blog-feat.png) | 990 KB | PNG |
| [client-app.png](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/public/images/client-app.png) | 765 KB | PNG |
| [about-story.png](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/public/images/about-story.png) | 669 KB | PNG |
| feature-drawings.webp | 22 KB | WebP ✅ |
| feature-effort.webp | 19 KB | WebP ✅ |

9 out of 11 images are uncompressed PNGs. The two feature images that **are** WebP are 30–50× smaller.

### Why it's worse than it looks
[next.config.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/next.config.ts#L4-L5) has:
```ts
output: "export",
images: { unoptimized: true },
```
With `images: { unoptimized: true }`, Next.js's automatic image optimization (format conversion, resizing, lazy loading via `<Image>`) is **completely disabled**. Every user downloads the full 2.1 MB `blog-5.png` at original resolution, regardless of screen size.

### Impact
- Blog page alone downloads ~5 MB of images — catastrophic on Indian mobile networks (3G/4G).
- Core Web Vitals (LCP, FID) will score poorly.
- Google Page Speed will flag this as the #1 issue.

### Remediation
1. Convert all PNGs to WebP/AVIF at appropriate resolutions (640px, 1024px, 1440px variants).
2. If staying on static export: use a build-time image optimization script (e.g., `sharp`).
3. If moving to server deployment (Vercel/Azure): remove `output: "export"` and `images: { unoptimized: true }` to re-enable Next.js automatic optimization.

---

## 5. 🔴 Static Export vs. API Route — **The Demo Form Is Broken in Production**

This is the **most critical deployment bug**.

### The conflict
- [next.config.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/next.config.ts): `output: "export"` → generates a fully static site (HTML files only, no server).
- [app/api/book-demo/route.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/api/book-demo/route.ts) → a Next.js API route that requires a **running Node.js server**.
- [book-demo/page.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/book-demo/page.tsx#L31) → `fetch("/api/book-demo", ...)` — calls the API route.

**In a static export, API routes do not exist.** The `/api/book-demo` endpoint simply returns a 404. The demo booking form — the primary business conversion point — **silently fails** in production.

The form's error handling makes this worse:
```tsx
try {
  await fetch("/api/book-demo", { ... });
} catch {
  // network failure: still show confirmation
}
setSubmitted(true); // Always shows "You're booked" even if API 404'd
```
The form **always shows success** regardless of whether the booking was received. Leads are lost silently.

### Remediation
Pick one:
- **Option A**: Remove `output: "export"` and deploy with a Node.js runtime (Vercel, Azure App Service, Docker). This re-enables API routes.
- **Option B**: Keep static export but replace the API route with a third-party form backend (Formspree, Resend webhook, Google Forms endpoint) that the client-side can POST to directly.

---

## 6. 🟠 Missing Error Boundaries, 404 Page, and Loading States

| File | Exists? |
|------|---------|
| `app/error.tsx` (global error boundary) | ❌ Missing |
| `app/not-found.tsx` (custom 404 page) | ❌ Missing |
| `app/loading.tsx` (route-level loading) | ❌ Missing |
| Any per-route `error.tsx` | ❌ Missing |

### Impact
- If any component throws (e.g., a 3D component fails to initialize WebGL), the **entire page goes blank** — no recovery, no "try again" option.
- Visiting any undefined URL (e.g., `/pricing`, `/team`) shows the Next.js default 404, not an ArchiFlask-branded page.
- The client `PageTransition` has no loading fallback — navigation between routes shows no visual feedback.

### Remediation
Create `app/error.tsx`, `app/not-found.tsx`, and `app/loading.tsx` with branded UI and recovery options.

---

## 7. 🟠 Zero Test Coverage

| Test type | Count |
|-----------|-------|
| Unit tests | 0 |
| Integration tests | 0 |
| E2E tests | 0 |
| Test config files | 0 |
| `test` script in `package.json` | ❌ Not defined |

**No testing framework is installed.** No Jest, Vitest, Playwright, Cypress, or React Testing Library.

### Impact
- Every code change (styling migration, component refactor, content update) has **zero automated validation**.
- Regression bugs ship invisibly.
- The API route's validation logic (name+email required, JSON parsing) has no unit tests.

### Remediation
At minimum:
1. Install Vitest + React Testing Library.
2. Unit test the API route's validation logic.
3. Smoke test each route renders without crashing.
4. For deployment confidence: Playwright E2E test for the demo booking flow.

---

## 8. 🟡 Split/Duplicated Design Tokens — Three Sources of Truth

| Location | What it defines |
|----------|----------------|
| [globals.css `@theme`](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/globals.css#L3-L18) | Tailwind v4 tokens (colors, radius, easing, font) |
| [globals.css `:root`](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/globals.css#L20-L27) | CSS variables (gradients, shadows) |
| [lib/tokens.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/lib/tokens.ts) | JS string exports (same gradients, same shadows) |

The same gradient `linear-gradient(135deg,#48484a,#1c1c1e)` is defined in:
1. `globals.css:21` as `--grad-dark`
2. `lib/tokens.ts:2` as `GRAD_DARK`
3. Dozens of component inline styles that don't reference either token

If you update the gradient angle in CSS but not in `tokens.ts`, the Nav/Footer (which import from `tokens.ts`) and the rest of the page (which uses inline hex values) will render **three different gradients**.

### Remediation
Consolidate everything into the CSS `@theme`/`:root` layer. Components reference `var(--grad-dark)` via Tailwind classes. Eliminate `lib/tokens.ts` for anything that CSS can handle. Keep only the 3D color hex constants in `tokens.ts` since Three.js needs raw numbers.

---

## 9. 🟡 Duplicate/Stale Build Output Committed — `out/` Directory

The [out/](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/out) directory (10 MB) contains **duplicate files** (`index.html` + `index 2.html`, `about.html` + `about 2.html`, `_next/` + `_next 3/`). This appears to be left from multiple builds.

### Impact
- **Not in .gitignore** — if committed to Git, it bloats the repo by 10 MB.
- Confusing for anyone reviewing — which `about.html` is the real one?
- Static hosting (Azure SWA) may serve stale versions.

### Remediation
Add `out/` to [.gitignore](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/.gitignore). Build output should be generated by CI/CD, not checked in.

---

## 10. 🟠 CSP Header Blocks Google Fonts Loading

[staticwebapp.config.json](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/staticwebapp.config.json#L3):
```json
"Content-Security-Policy": "... font-src 'self' data:; ..."
```

But [layout.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/layout.tsx#L3-L14) loads **Nunito from Google Fonts**:
```tsx
import { Nunito } from "next/font/google";
```

Next.js's `next/font/google` downloads the font at **build time** and self-hosts it — so this may work if the font CSS is inlined. However, the CSP `style-src 'self' 'unsafe-inline'` combined with `font-src 'self' data:` means any runtime font fetch to `fonts.googleapis.com` or `fonts.gstatic.com` would be blocked.

> [!WARNING]
> If the Next.js font optimization is working correctly (self-hosting the woff2), this is fine. But if it falls back to a CDN fetch for any reason, the font silently fails and the page renders in system fallback — which may look different than intended.

### Remediation
Verify with a production build that fonts are self-hosted. If they are, this is fine. If not, add `fonts.googleapis.com` and `fonts.gstatic.com` to the CSP `font-src` and `style-src` directives.

---

## 11. 🟡 No Rate-Limiting or CSRF Protection on the API Route

[app/api/book-demo/route.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/api/book-demo/route.ts) is a public POST endpoint with:
- No rate limiting.
- No CSRF token.
- No CAPTCHA.
- No email format validation beyond `!body.email?.trim()`.
- No input length limits (a malicious payload could send 10 MB of data in the `firm` field).

### Impact
Bots can spam the endpoint at scale, filling the inbox (if Resend is configured) or the server logs (if not) with garbage.

### Remediation
1. Add a honeypot field or reCAPTCHA v3 on the client form.
2. Add request body size limits and email regex validation on the server.
3. Add rate limiting (e.g., via Vercel Edge Middleware or a simple in-memory counter).

> [!NOTE]
> This is moot in the current static-export deployment since the API route doesn't run. But it must be fixed before enabling a server deployment.

---

## 12. 🟡 Hardcoded Demo Calendar — June 2026 Only

[book-demo/page.tsx L100](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/book-demo/page.tsx#L100):
```tsx
<p style={{ ... }}>June 2026 · IST</p>
```
[lib/content.ts](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/lib/content.ts) exports `DEMO_DAYS` with hardcoded dates (23–30 June).

### Impact
In July 2026 (next week!), the calendar shows past dates. Users see "June 2026" and either assume the site is abandoned or pick dates that have already passed.

### Remediation
Generate calendar days dynamically based on `Date.now()`, or use a date-picker library. At minimum, make the month/year a configuration constant that's easy to update.

---

## 13. 🟡 SEO: Missing OG Image, Favicon, and Structured Data Gaps

### OG Image
[layout.tsx L39](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/layout.tsx#L39) references `/og/archiflask-og.png`, but:
```
public/
  images/    ← exists
  llms.txt   ← exists
  og/        ← DOES NOT EXIST
```
Social shares (LinkedIn, Twitter, WhatsApp) will show **no preview image** — a blank card.

### Favicon
No `favicon.ico`, `apple-touch-icon.png`, or `app/icon.tsx` exists. Browsers show the default blank tab icon.

### Structured Data
[layout.tsx L55](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/layout.tsx#L55) references `https://www.archiflask.com/logo.png` — this file doesn't exist in `public/`. Google's structured data validator will flag this as an error.

### Remediation
1. Create and place an OG image at `public/og/archiflask-og.png` (1200×630px).
2. Add `favicon.ico` and `apple-touch-icon.png` to `public/`.
3. Add `logo.png` to `public/` or update the structured data URL.

---

## 14. 🟡 Accessibility Gaps

| Issue | Location |
|-------|----------|
| Logo is not an `<img>` or SVG with alt text — it's two `<span>` elements | [Nav.tsx L47-50](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/layout/Nav.tsx#L47-L50) |
| No `aria-label` on nav links container | Nav.tsx |
| Form inputs have `placeholder` but no visible `<label>` | [book-demo/page.tsx L161-164](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/app/book-demo/page.tsx#L161-L164) |
| Calendar buttons have no `aria-selected` or `aria-label` for dates | book-demo/page.tsx L113-131 |
| No skip-navigation link | layout.tsx |
| Color contrast: `#86868b` on `#fff` = 4.08:1 (fails WCAG AA for body text at 14px) | Used across all eyebrow labels |
| No focus-visible styles — inline styles can't define `:focus-visible` | All interactive elements |
| Marquee has no `aria-hidden` or pause mechanism | [Marquee.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/motion/Marquee.tsx) |

### Remediation
Add proper ARIA attributes, visible labels, skip-nav links, and focus-visible ring styles via Tailwind's `focus-visible:ring-2` utility.

---

## 15. 🟡 `PageTransition` AnimatePresence Conflicts with App Router

[PageTransition.tsx](file:///Users/sukheshkannasaravanan/Documents/GitHub/Archiflask-main/components/motion/PageTransition.tsx) wraps `{children}` in `AnimatePresence mode="wait"`, keyed by `pathname`.

### The problem
In Next.js App Router, the `children` prop in a layout is a React Server Component tree managed by the framework's streaming/suspense mechanism. Wrapping it in `AnimatePresence mode="wait"` forces the **exiting page to remain mounted** until the exit animation completes, which:
- Delays the new page's RSC payload from hydrating.
- Can cause hydration mismatches if the exiting page held client state.
- `window.scrollTo(0, 0)` fires on every pathname change, including hash navigations (e.g., `/#af-pricing`).

### Remediation
Use Next.js's built-in View Transitions API (available in Next.js 15+) or the `useViewTransition` hook from `motion/react` for a framework-compatible approach.

---

## 16. 🟡 Three.js Bundle Size Overhead

`three` + `@react-three/fiber` + `@react-three/drei` together add **~150–200 KB gzipped** to the JavaScript bundle. The project uses only:
- `LineSegments`, `EdgesGeometry`, `SphereGeometry`, `ConeGeometry`, `CylinderGeometry`, `MeshBasicMaterial`, `LineBasicMaterial`
- No lighting, no textures, no post-processing, no physics

This is a small fraction of Three.js's capabilities, but the entire library ships.

### Remediation
- The `PencilRailClient` already uses dynamic import with `ssr: false` — good.
- Ensure `HeroSkeleton` and `MiniShape` are also dynamically imported.
- Consider tree-shaking Three.js imports or using a lighter alternative for wireframe rendering.

---

## Priority Matrix — Deployment Readiness

### 🚨 Must Fix Before Production Launch

| # | Issue | Effort |
|---|-------|--------|
| 5 | **Static export + API route conflict** (demo form broken) | Small — pick a deployment model |
| 13 | **Missing OG image, favicon, logo** (broken social sharing) | Small — create and place assets |
| 12 | **Hardcoded calendar dates** (stale in July) | Small — dynamic date generation |

### 🔧 Fix Before Scaling / Iterating

| # | Issue | Effort |
|---|-------|--------|
| 1 | **Migrate inline styles → Tailwind** | Large — 381 style blocks across 30+ files |
| 2 | **Remove `!important` responsive overrides** | Included in #1 |
| 4 | **Optimize images** (PNG → WebP, add srcsets) | Medium |
| 6 | **Add error.tsx, not-found.tsx, loading.tsx** | Small |
| 8 | **Consolidate design tokens** | Medium |

### 📋 Fix For Quality / Long-Term

| # | Issue | Effort |
|---|-------|--------|
| 3 | **Reduce WebGL canvases** | Medium |
| 7 | **Add test coverage** | Medium |
| 9 | **Clean up `out/` directory** | Trivial |
| 10 | **Verify CSP + Google Fonts** | Small |
| 11 | **API rate-limiting / CAPTCHA** | Small |
| 14 | **Accessibility fixes** | Medium |
| 15 | **Fix PageTransition for App Router** | Small |
| 16 | **Three.js bundle optimization** | Small |

---

## Recommended Deployment Architecture Decision

The current project sits in an impossible middle ground:

```
output: "export" (static)  ←→  API route + Resend email (needs server)
Azure Static Web Apps       ←→  Node.js runtime required
```

### Two viable paths:

**Path A — Static Site (Azure SWA / Netlify / Cloudflare Pages)**
- Remove `app/api/book-demo/route.ts`
- Replace with a third-party form backend (Formspree, Tally, Resend Webhooks)
- Keep `output: "export"`
- Pre-optimize all images at build time

**Path B — Server Deployment (Vercel / Azure App Service / Docker)**
- Remove `output: "export"` and `images: { unoptimized: true }`
- API route works natively
- Next.js Image Optimization works natively
- Add `error.tsx` and middleware for rate-limiting
- Slightly higher hosting cost, but much more capable

> [!IMPORTANT]
> **Path B is recommended** for a SaaS product marketing site that needs a working booking form, dynamic calendar dates, image optimization, and future CMS integration.
