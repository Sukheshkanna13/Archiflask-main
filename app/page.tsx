import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";

export const metadata: Metadata = {
  title: "ArchiFlask | Architecture Project Management Software India",
  description: "Run your design or construction firm on a system. ArchiFlask brings projects, drawings, teams, site activity & profitability into one platform. Book a demo.",
  alternates: { canonical: "/" },
  openGraph: { url: "https://www.archiflask.com/" },
};
import { About } from "@/components/sections/home/About";
import { Statement } from "@/components/sections/home/Statement";
import { Problem } from "@/components/sections/home/Problem";
import { Questions } from "@/components/sections/home/Questions";
import { Features } from "@/components/sections/home/Features";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ForClients } from "@/components/sections/home/ForClients";
import { Impact } from "@/components/sections/home/Impact";
import { Pricing } from "@/components/sections/home/Pricing";
import { FinalCta } from "@/components/sections/home/FinalCta";

export default function HomePage() {
  return (
    <main className="relative z-[2]">
      <Hero />
      <About />
      <Statement />
      <Problem />
      <Questions />
      <Features />
      <Capabilities />
      <ForClients />
      <Impact />
      <Pricing />
      <FinalCta />
    </main>
  );
}
