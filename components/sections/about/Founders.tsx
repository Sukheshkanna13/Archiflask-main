import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FOUNDERS } from "@/lib/content";
import { FOUNDER_IMAGES } from "@/lib/images";

export function Founders() {
  return (
    <section style={{ padding: "114px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>The founders</div>
          <h2 style={{ margin: "14px 0 0", fontSize: 46, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.028em" }}>
            Fifteen years of real projects, behind one platform.
          </h2>
        </Reveal>
        <div style={{ marginTop: 54, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="af-grid-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.slotId} y={30} delay={i * 0.1} style={{ padding: 34, borderRadius: 24, background: "#f5f5f7", border: "1px solid rgba(0,0,0,.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <ImageSlot src={FOUNDER_IMAGES[f.slotId]} alt={f.alt} rounded="circle" style={{ width: 84, height: 84, flex: "none" }} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>{f.name}</div>
                  <div style={{ marginTop: 3, fontSize: 14.5, fontWeight: 600, color: "#86868b" }}>{f.role}</div>
                </div>
              </div>
              <p style={{ margin: "22px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#3a3a3c" }}>{f.bio}</p>
            </Reveal>
          ))}
        </div>
        <Reveal y={20} delay={0.15} style={{ marginTop: 26, textAlign: "center", fontSize: 14.5, color: "#86868b" }}>
          A product of Wallzehn Technologies Pvt. Ltd.
        </Reveal>
      </div>
    </section>
  );
}
