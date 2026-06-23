import { AboutHero } from "@/components/sections/about/AboutHero";
import { Origin } from "@/components/sections/about/Origin";
import { Product } from "@/components/sections/about/Product";
import { Founders } from "@/components/sections/about/Founders";
import { Vision } from "@/components/sections/about/Vision";
import { BottomCta } from "@/components/sections/shared/BottomCta";

export const metadata = {
  title: "About, ArchiFlask",
  description: "Built by people who have actually run the projects. The story behind ArchiFlask and Wallzehn Technologies.",
};

export default function AboutPage() {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <AboutHero />
      <Origin />
      <Product />
      <Founders />
      <Vision />
      <BottomCta heading="See ArchiFlask on your projects." />
    </main>
  );
}
