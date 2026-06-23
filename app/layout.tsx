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

export const metadata: Metadata = {
  title: "ArchiFlask, run your firm on a system",
  description:
    "The operating platform for design, construction & PMC firms: projects, drawings, teams, site activity, approvals and profitability, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <Nav />
        <PencilRailClient />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
