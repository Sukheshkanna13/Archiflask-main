import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PencilRailClient } from "@/components/three/PencilRailClient";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "ArchiFlask — Run your firm on a system",
  description:
    "The operating platform for design, construction & PMC firms — projects, drawings, teams, site activity, approvals and profitability, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <PencilRailClient />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
