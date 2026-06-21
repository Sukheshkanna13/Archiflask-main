import { Hero } from "@/components/sections/home/Hero";
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
    <main style={{ position: "relative", zIndex: 2 }}>
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
