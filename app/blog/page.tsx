import { BlogHero } from "@/components/sections/blog/BlogHero";
import { Featured } from "@/components/sections/blog/Featured";
import { Grid } from "@/components/sections/blog/Grid";
import { BlogCta } from "@/components/sections/blog/BlogCta";

export const metadata = {
  title: "Blog — ArchiFlask",
  description: "Practical writing for firm owners on running, scaling, and systematising a design or construction practice.",
};

export default function BlogPage() {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <BlogHero />
      <Featured />
      <Grid />
      <BlogCta />
    </main>
  );
}
