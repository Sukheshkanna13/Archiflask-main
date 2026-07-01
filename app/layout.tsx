import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PencilRailClient } from "@/components/three/PencilRailClient";
import { PageTransition } from "@/components/motion/PageTransition";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const BASE = 'https://www.archiflask.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'ArchiFlask | Architecture Project Management Software India',
    template: '%s · ArchiFlask',
  },
  description:
    'ArchiFlask is the operating platform for design, construction & PMC firms, bringing projects, drawings, teams, site activity, approvals and profitability into one place.',
  applicationName: 'ArchiFlask',
  alternates: {
    canonical: '/',
    languages: { 'en-IN': '/', 'x-default': '/' }
  },
  openGraph: {
    type: 'website',
    siteName: 'ArchiFlask',
    locale: 'en_IN',
    url: BASE,
    title: 'ArchiFlask | Run your firm on a system. Not on memory.',
    description:
      'The operating platform for design, construction & PMC firms. Projects, drawings, teams, site activity, approvals and profitability in one place.',
    // OG/Twitter images come from app/opengraph-image.tsx (auto-detected).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiFlask: Run your firm on a system.',
    description: 'The operating platform for design, construction & PMC firms.',
  },
  robots: { index: true, follow: true },
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArchiFlask',
  url: 'https://www.archiflask.com',
  logo: 'https://www.archiflask.com/icon',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <PencilRailClient />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}