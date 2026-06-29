import type { Metadata } from "next";
import { ImpactHero } from "@/components/sections/impact/ImpactHero";
import { Outcomes } from "@/components/sections/impact/Outcomes";
import { Stories } from "@/components/sections/impact/Stories";
import { Reviews } from "@/components/sections/impact/Reviews";
import { Domains } from "@/components/sections/impact/Domains";
import { BottomCta } from "@/components/sections/shared/BottomCta";

export const metadata: Metadata = {
  title: "ArchiFlask Impact | Real Results for Design Firms",
  description: "See what firms get back in the first weeks: fewer approval delays, visible project profitability, and field activity they can trust. Real change on real projects.",
  alternates: { canonical: "/impact" },
  openGraph: { url: "https://www.archiflask.com/impact" },
};

export default function ImpactPage() {
  return (
    <main className="relative z-[2]">
      <ImpactHero />
      <Outcomes />
      <Stories />
      <Reviews />
      <Domains />
      <BottomCta heading="See the same change on your firm." />
    </main>
  );
}
