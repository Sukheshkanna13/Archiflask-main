import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | ArchiFlask for Architecture Firms",
  description: "Book a 20-minute ArchiFlask demo on your own kind of projects, then start free with no end date. We walk your firm through it and set up a project the same day.",
  alternates: { canonical: "/book-demo" },
  openGraph: { url: "https://www.archiflask.com/book-demo" },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
