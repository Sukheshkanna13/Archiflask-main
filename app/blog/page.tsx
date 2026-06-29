import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { Featured } from "@/components/sections/blog/Featured";
import { Grid } from "@/components/sections/blog/Grid";
import { BlogCta } from "@/components/sections/blog/BlogCta";

export const metadata: Metadata = {
  title: "ArchiFlask Blog | Scaling & Systematising a Firm",
  description: "Practical writing for firm owners on running, scaling and systematising a design or construction practice, covering everything from drawing control to project profitability.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "https://www.archiflask.com/blog" },
};

export default function BlogPage() {
  return (
    <main className="relative z-[2]">
      <BlogHero />
      <Featured />
      <Grid />
      <BlogCta />
    </main>
  );
}
