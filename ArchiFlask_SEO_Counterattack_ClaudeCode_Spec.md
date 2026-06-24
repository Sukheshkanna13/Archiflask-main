# ArchiFlask — SEO Counterattack & Technical Remediation Spec
### Claude Code Task File · Promotizar Digital · June 2026
> **Target:** the new Next.js rebuild (currently `http://localhost:3000`, baseline **62/100**).
> **Not** the live `archiflask.com` SPA (baseline **9/100`) — that is being replaced by this build.
> **Mode:** task-gated. Do one PHASE at a time. Run its acceptance check. Do not start the next PHASE until the current one passes.

---

## 0 · Why this file exists (read before touching code)

The rebuild already has strong *content* — the localhost audit scored On-Page SEO **90**, Readability **100**, Content Uniqueness **100**. Content is **not** the problem.

The problem is the build ships with the **infrastructure layer missing entirely**. These categories scored **zero** and are what keep the site from competing:

| Category | Score | What's wrong |
|---|---|---|
| Security Headers | 0/100 | 6 headers absent |
| Social Meta (OG/Twitter) | 0/100 | no `og:*`, no `twitter:card` |
| Entity SEO (JSON-LD) | 0/100 | no Organization/SoftwareApplication schema |
| AI Search (`llms.txt`) | 0/100 | no machine-readable guidance |
| Hreflang | 0/100 | no language/region signal |
| Performance / CWV | 0 | not measurable (no PageSpeed key) |
| Robots & Crawlers | 20/100 | no `robots.txt` / sitemap wiring |

**This file fixes the zeros first (PHASES 1–7), then maps keywords onto the six existing pages (PHASE 8).** Do not reorder. A perfectly keyworded page that ships no OG tags and no schema still loses.

---

## 1 · Hard guardrails (do not violate — these are client constraints, not preferences)

1. **Hosting is Azure static.** This build is expected to deploy as a **static export** (`output: 'export'`) to Azure Static Web Apps. That has two consequences Claude Code MUST respect:
   - `next.config.js` **`headers()` does nothing on a static export** (no Node server runs). Security headers go in **`staticwebapp.config.json`**, not `next.config.js`. (The audit tool's advice to use `headers()` is wrong for this deployment target.)
   - No SSR. No server-only runtime APIs. `ISR` is **not** available on pure static export — if a page relies on it, flag it, don't assume it works.
2. **Repo-only handover.** No CI/CD, no deploy step, no secrets committed. Everything is source changes + config files the client deploys manually.
3. **Motion is an enhancement layer.** Real HTML/text renders first; Framer Motion animates after. Never gate content behind JS. No heavy 3D/WebGL.
4. **Do not invent content.** No fabricated metrics, testimonials, client names, or AURA / "AI-SOP" copy. Where a real value is missing, leave a `TODO(client)` marker — never a plausible-sounding fake.
5. **No absolute claims.** Never write "the only platform in India," "no competition," etc. Differentiators are phrased as concrete capabilities. (Named Indian competitor exists: iARCH CRM by Amika Software.)
6. **Keep the palette/brand.** Navy / blueprint-blue. No stock human photos. Product UI is the imagery.

---

## 2 · Pre-flight — establish ground truth (PHASE 0)

**Goal:** know exactly what you're working in before changing anything. The remediation paths differ for App Router vs Pages Router and for static-export vs server.

**Tasks:**
```
0.1  Print next.config.js / next.config.mjs. Record:
       - is `output: 'export'` set? (determines header + sitemap strategy)
       - basePath / assetPrefix / trailingSlash values
0.2  Detect router: does `app/` exist (App Router) or `pages/` (Pages Router)?
       All snippets below default to App Router — switch to the pages/ equivalent if needed.
0.3  List the route files for the six known pages:
       /  /about  /impact  /blog  /book-demo  /get-started   (pricing is an anchor: /#af-pricing)
0.4  Confirm there is NO existing robots.ts/sitemap.ts/middleware that already half-handles this.
0.5  Note the deploy target file if present: staticwebapp.config.json OR web.config.
```
**Acceptance:** a 6-line summary printed to the console stating router type, export mode, and which of robots/sitemap/schema/OG already exist (expected: none).
**Gate:** do not proceed until export mode is known — PHASES 1 and 4 branch on it.

---

## 3 · PHASE 1 — Crawlability: robots.txt + sitemap.xml  *(fixes Robots 20→100)*

**Goal:** give Googlebot a valid robots.txt and a real XML sitemap. Both must be **static files emitted at build** (export-safe).

**App Router (preferred) — `app/robots.ts`:**
```ts
import type { MetadataRoute } from 'next'

const BASE = 'https://www.archiflask.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
```

**App Router — `app/sitemap.ts`:**
```ts
import type { MetadataRoute } from 'next'

const BASE = 'https://www.archiflask.com'
const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/impact', '/blog', '/book-demo', '/get-started']
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
```
> If `output: 'export'` is set, `app/robots.ts` and `app/sitemap.ts` still work — they emit `robots.txt` and `sitemap.xml` as static files at build. If the project is Pages Router, generate `public/robots.txt` by hand and use `next-sitemap` postbuild instead.

**Acceptance:**
```
- Build, then confirm /robots.txt returns text (not the JS shell) and references /sitemap.xml
- Confirm /sitemap.xml lists all six URLs with the production domain (not localhost)
```
**Gate:** both files validate as their correct MIME type before moving on.

---

## 4 · PHASE 2 — Metadata + Social tags (OG/Twitter)  *(fixes Social Meta 0→100, lifts On-Page)*

**Goal:** every page gets a unique, keyword-mapped `<title>`, meta description, canonical, and full OG + Twitter card set. Use the Next.js **Metadata API** (build-time, export-safe).

**Root defaults — `app/layout.tsx` (export `metadata`):**
```ts
import type { Metadata } from 'next'

const BASE = 'https://www.archiflask.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'ArchiFlask — Architecture Project Management Software India',
    template: '%s · ArchiFlask',
  },
  description:
    'ArchiFlask is the operating platform for design, construction & PMC firms — projects, drawings, teams, site activity, approvals and profitability in one place.',
  applicationName: 'ArchiFlask',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'ArchiFlask',
    locale: 'en_IN',
    url: BASE,
    title: 'ArchiFlask — Run your firm on a system. Not on memory.',
    description:
      'The operating platform for design, construction & PMC firms. Projects, drawings, teams, site activity, approvals and profitability in one place.',
    images: [{ url: '/og/archiflask-og.png', width: 1200, height: 630, alt: 'ArchiFlask' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiFlask — Run your firm on a system.',
    description: 'The operating platform for design, construction & PMC firms.',
    images: ['/og/archiflask-og.png'],
  },
  robots: { index: true, follow: true },
}
```

**Per-page metadata — paste the mapped values from the table in §9 into each route's `export const metadata`.** Each page overrides `title`, `description`, `alternates.canonical`, and `openGraph.url`.

**OG image asset:** one 1200×630 PNG at `public/og/archiflask-og.png`, navy/blueprint, ArchiFlask wordmark + tagline, product-UI motif. **No stock human photo.** If the asset doesn't exist yet: `TODO(design): produce archiflask-og.png` — but still wire the path so it resolves the moment the file lands.

**Acceptance:**
```
- View source on each of the six pages: unique <title> + meta description present
- og:title, og:description, og:image, og:url, og:type ALL present (the five the audit flagged)
- twitter:card present
- Run one URL through an OG preview/validator; card renders
```
**Gate:** all five required OG tags present on all six pages. This was a hard 0 — verify, don't assume.

---

## 5 · PHASE 3 — Structured data (JSON-LD)  *(fixes Entity SEO 0→100)*

**Goal:** emit `Organization` + `SoftwareApplication` JSON-LD. Static `<script type="application/ld+json">` in the layout is export-safe.

**`app/layout.tsx` — inside `<body>`, before children:**
```tsx
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArchiFlask',
  url: 'https://www.archiflask.com',
  logo: 'https://www.archiflask.com/logo.png',
  description: 'The operating platform for design, construction & PMC firms.',
  parentOrganization: { '@type': 'Organization', name: 'Wallzehn Technologies Pvt. Ltd.' },
  sameAs: [
    // TODO(client): paste real profile URLs once live. Do NOT invent.
    // 'https://www.linkedin.com/company/archiflask',
    // 'https://www.instagram.com/archiflask',
  ],
}

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ArchiFlask',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS',
  offers: { '@type': 'Offer', price: '600', priceCurrency: 'INR' }, // ₹600/user/mo ex-GST
  description:
    'Architecture & construction project management: drawings & revision tracking, effort & profitability, geo-tagged site activity, and a client app.',
}
```
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
```
> `sameAs` is the audit's repeated "missing KG signal." Leave it commented with real URLs only — an empty array is fine; fake profiles are not. Add LinkedIn/Instagram/X the moment the agency creates them.

**Acceptance:**
```
- View source: both JSON-LD blocks present and valid JSON
- Paste into Google Rich Results Test → Organization + SoftwareApplication detected, no errors
```
**Gate:** Rich Results Test passes clean.

---

## 6 · PHASE 4 — Security headers  *(fixes Security Headers 0→100)*  ⚠️ Azure-static path

**Goal:** ship the 6 missing headers. **Because this is a static export, this goes in the Azure config file, not `next.config.js`.**

**`staticwebapp.config.json` at repo root (Azure Static Web Apps):**
```json
{
  "globalHeaders": {
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https:",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)"
  },
  "mimeTypes": { ".json": "application/json" }
}
```
> **CSP caveat:** Framer Motion injects inline styles, hence `'unsafe-inline'` in `style-src`. If the team later adopts nonces, tighten it. Tune `connect-src` to the real product/app API origin (e.g. `app.archiflask.com`) — don't leave it broader than needed.
>
> **If the deploy is actually Azure App Service / IIS (not Static Web Apps):** use `web.config` `<httpProtocol><customHeaders>` with the same six headers instead. Confirm the target from PHASE 0 before choosing.
>
> **Only if a Node server is genuinely in play (not static export):** then and only then use `next.config.js headers()`.

**Acceptance:**
```
- After deploy (or local Azure SWA CLI emulation), curl -I the homepage
- All six headers present in the response
- HTTPS confirmed (HSTS only meaningful over TLS)
```
**Gate:** six headers verified on an actual HTTP response, not just in the config file.

---

## 7 · PHASE 5 — llms.txt / AI-search surface  *(fixes AI Search 0→100)*

**Goal:** serve `/llms.txt` so AI crawlers get curated guidance to the key pages.

**`public/llms.txt`:**
```
# ArchiFlask
> The operating platform (SOP) for design, construction, and PMC firms in India —
> projects, drawings, teams, site activity, approvals, and profitability in one place.

## Core pages
- [Home](https://www.archiflask.com/): what ArchiFlask is and the five things a firm owner sees before 9 a.m.
- [About](https://www.archiflask.com/about): the founders and the firm-runs-on-a-system thesis.
- [Impact](https://www.archiflask.com/impact): outcomes design & construction firms get in the first weeks.
- [Blog](https://www.archiflask.com/blog): running, scaling, and systematising a practice.
- [Book a Demo](https://www.archiflask.com/book-demo): 20-minute walkthrough, then start free.

## Notes
- Pricing: ₹600/user/month (ex-GST). Free plan, no end date.
- A product of Wallzehn Technologies Pvt. Ltd.
```
**Acceptance:** `/llms.txt` returns plain text with the five links resolving to live routes.
**Gate:** none beyond the check; this is low-risk.

---

## 8 · PHASE 6 — Performance / CWV measurement  *(unblocks the 0 that was "not measured")*

The localhost audit didn't fail performance — it **couldn't measure it** (PageSpeed API rate-limited / no key). Two tasks:

```
6.1  Set PAGESPEED_API_KEY in the audit tool's .env, re-run against the DEPLOYED url
     (not localhost — CWV from localhost is meaningless).
6.2  Enforce these build-time guardrails so the real numbers come back green:
     - next/image for all raster images; explicit width/height to kill CLS
     - next/font for fonts (no layout-shifting webfont swap)
     - Framer Motion: animate transform/opacity only; never animate layout properties
     - Lazy-load below-the-fold motion sections; keep hero text in static HTML
     - No render-blocking 3rd-party scripts in <head>
```
**Acceptance:** re-run audit returns a real LCP/INP/CLS triple; target LCP < 2.5s, CLS < 0.1, INP < 200ms on the deployed URL.
**Gate:** soft — record the numbers; don't block ship on a 0.05 CLS miss, but log it.

---

## 9 · PHASE 7 — hreflang + canonical  *(fixes Hreflang 0→100, cheap)*

Single-language (English), pan-India. Add to root `metadata`:
```ts
alternates: {
  canonical: '/',
  languages: { 'en-IN': '/', 'x-default': '/' },
}
```
Per page, set `alternates.canonical` to that page's path (already covered in §4). 
**Acceptance:** each page emits a self-referencing canonical + `hreflang="en-IN"` and `x-default`.
**Gate:** none.

---

## 10 · PHASE 8 — Keyword → existing-page map (on-page only, no net-new pages)

Map the audit's keyword clusters onto the **six pages that already exist**. No new routes in this pass (city / comparison / builder pages are a **deferred** phase, noted in §12). Paste these into each page's `metadata` and align the on-page H1/H2 to match — without rewriting the already-strong body copy.

| Page | Primary keyword | Secondary | `<title>` (≤60 chars) | Meta description (150–160 chars) |
|---|---|---|---|---|
| `/` | architecture project management software India | architect CRM software India; AEC software India | `ArchiFlask — Architecture Project Management Software India` | `Run your design or construction firm on a system. ArchiFlask brings projects, drawings, teams, site activity & profitability into one platform. Book a demo.` |
| `/about` | architecture firm management software | built by architects; SOP for firms | `About ArchiFlask — Built by Architects & Engineers` | `Two founders — an architect and a solution architect — built ArchiFlask after 15+ years running real projects. The operating standard for design & build firms.` |
| `/impact` | architect client communication problems | project profitability; rework cost | `ArchiFlask Impact — Real Results for Design Firms` | `See what firms get back in the first weeks: fewer approval delays, visible project profitability, and field activity they can trust. Real change on real projects.` |
| `/blog` | how to manage architecture projects efficiently | scale an architecture firm; SOP mindset | `ArchiFlask Blog — Scaling & Systematising a Firm` | `Practical writing for firm owners on running, scaling and systematising a design or construction practice — from drawing control to project profitability.` |
| `/book-demo` | architect project management software demo | book a demo | `Book a Demo — ArchiFlask for Architecture Firms` | `Book a 20-minute ArchiFlask demo on your own kind of projects, then start free with no end date. We walk your firm through it and set up a project the same day.` |
| `/get-started` | free architecture project management tool India | start free; architect app | `Get Started Free — ArchiFlask for Design Firms` | `Start running your firm on a system. Book a demo and we set up a free project the same day — drawings, tasks and effort in one place. Free plan, no end date.` |

**On-page alignment rules (do NOT rewrite the good copy, just align signals):**
```
- Each page's single H1 should contain the primary keyword's intent, kept in the
  existing brand voice. (e.g. Home H1 stays "Run your firm on a system. Not on memory."
  — the keyword lives in <title>/description/H2, not by forcing it into the hero.)
- Ensure one H1 per page; demote any duplicate H1s to H2.
- Feature section headings on Home/Product can absorb cluster terms naturally:
  "Drawings & change-request documentation" already maps to
  'architect drawing version control software' — leave as is.
- Internal links: from /blog posts and /impact, link to /book-demo and /get-started
  with descriptive anchor text (not "click here").
```
**Source for any feature-depth expansion:** use `R1 CONTENT FOR NEW BROCHURE & WEBSITE DESIGN.docx` (the revised feature specs) — but only the architect-version features that already match shipped UI. Do **not** surface builder-only features (Material Inventory, BOQ, Labour Wage, etc.) on the main pages yet; the contractor expansion is audience-sensitive and capped.

**Acceptance:** each page's title/description matches the table; exactly one H1 per page; no keyword stuffing (density stays natural — Readability must remain ~100).
**Gate:** spot-check three pages in view-source.

---

## 11 · PHASE 9 — Re-audit & verify (the closing gate)

```
9.1  Re-run the same audit tool against the DEPLOYED URL with PAGESPEED_API_KEY set.
9.2  Confirm every former 0 is now non-zero:
       Security Headers, Social Meta, Entity SEO, AI Search, Hreflang.
9.3  Confirm Robots moved off 20 toward 100.
9.4  Target overall: 62 → 85+ . Anything still red gets logged with a reason.
9.5  Submit the deployed sitemap in Google Search Console; request indexing for all six URLs.
```
**Acceptance:** a short delta report — category-by-category, before vs after — saved next to this file.

---

## 12 · Deferred (NOT in this pass — separate brief)

These are real, but out of scope for this file per the agreed plan. Don't start them here.
- **Net-new pages:** `/chennai`, `/madurai`, Tamil Nadu state page, `ArchiFlask vs Monograph` / `Procore alternative` comparison pages, builder/contractor vertical landing page. (Local + comparison clusters from the keyword sheet live here.)
- **Blog post production** (the 6 posts already stubbed on `/blog` need real bodies).
- **AURA / AI-SOP:** omitted entirely until separately briefed — no scaffold, no placeholder route.

## 13 · Open items blocking *content* truth (carry from master doc — do not fabricate)
```
TODO(client): one measurable result for /impact strongest line (e.g. "approvals 4 days → same-day")
TODO(client): 2+ real testimonials (the /impact quotes are placeholders until confirmed)
TODO(client): real LinkedIn / Instagram / X URLs for JSON-LD sameAs + llms.txt
TODO(design): public/og/archiflask-og.png (1200×630, navy/blueprint, no stock human photo)
TODO(client): confirm demo-booking destination (embedded calendar vs form) for /book-demo wiring
```

---

### Execution order (one line)
`PHASE 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9` — gated, verify each before the next.

*Prepared by Promotizar Digital · promotizardigital@gmail.com · Confidential — Internal & Client Review*
