import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { BLOG_POSTS } from "@/lib/content";
import { BLOG_IMAGES } from "@/lib/images";

export function Grid() {
  return (
    <section style={{ padding: "30px 24px 120px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="af-grid-3">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.slotId} y={30} duration={0.8} delay={(i % 3) * 0.07} style={{ display: "flex" }}>
            <Link
              href="/blog"
              style={{ display: "flex", flexDirection: "column", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(0,0,0,.07)", background: "#fff", width: "100%" }}
            >
              <ImageSlot src={BLOG_IMAGES[p.slotId]} alt={`${p.category} cover`} style={{ height: 200 }} />
              <div style={{ padding: "26px 24px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#86868b" }}>{p.category}</div>
                <h3 style={{ margin: "12px 0 0", fontSize: 21, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.015em" }}>{p.title}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.55, color: "#6e6e73", flex: 1 }}>{p.body}</p>
                <div style={{ marginTop: 20, fontSize: 13, color: "#aeaeb2" }}>{p.read}</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
