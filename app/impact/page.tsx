import { ImpactHero } from "@/components/sections/impact/ImpactHero";
import { Outcomes } from "@/components/sections/impact/Outcomes";
import { Stories } from "@/components/sections/impact/Stories";
import { Reviews } from "@/components/sections/impact/Reviews";
import { Domains } from "@/components/sections/impact/Domains";
import { BottomCta } from "@/components/sections/shared/BottomCta";

export const metadata = {
  title: "Impact — ArchiFlask",
  description: "Real change, on real projects — across residential, commercial, interiors, and infrastructure.",
};

export default function ImpactPage() {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <ImpactHero />
      <Outcomes />
      <Stories />
      <Reviews />
      <Domains />
      <BottomCta heading="See the same change on your firm." />
    </main>
  );
}
