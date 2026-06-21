import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { BLOG_FEATURED } from "@/lib/content";
import { BLOG_IMAGES } from "@/lib/images";

export function Featured() {
  const f = BLOG_FEATURED;
  return (
    <section style={{ padding: "60px 24px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal y={30}>
          <Link
            href="/blog"
            className="af-grid-2"
            style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", borderRadius: 26, overflow: "hidden", border: "1px solid rgba(0,0,0,.08)", boxShadow: "0 24px 60px rgba(0,0,0,.07)", background: "#fff" }}
          >
            <ImageSlot src={BLOG_IMAGES[f.slotId]} alt="Featured article cover" style={{ height: 420 }} />
            <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#86868b" }}>{f.category}</div>
              <h2 style={{ margin: "16px 0 0", fontSize: 38, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>{f.title}</h2>
              <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.6, color: "#6e6e73" }}>{f.body}</p>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: "#aeaeb2" }}>
                <span>{f.meta[0]}</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#c2c2c9" }} />
                <span>{f.meta[1]}</span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
