import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Origin } from "@/components/sections/about/Origin";
import { Product } from "@/components/sections/about/Product";
import { Founders } from "@/components/sections/about/Founders";
import { Vision } from "@/components/sections/about/Vision";
import { BottomCta } from "@/components/sections/shared/BottomCta";

export const metadata: Metadata = {
  title: "About ArchiFlask — Built by Architects & Engineers",
  description: "Two founders — an architect and a solution architect — built ArchiFlask after 15+ years running real projects. The operating standard for design & build firms.",
  alternates: { canonical: "/about" },
  openGraph: { url: "https://www.archiflask.com/about" },
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
