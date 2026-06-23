import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ABOUT_STORY_IMAGE } from "@/lib/images";

export function Origin() {
  return (
    <section style={{ padding: "104px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 64, alignItems: "center" }} className="af-grid-2">
        <Reveal y={28}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>Our story</div>
          <h2 style={{ margin: "14px 0 22px", fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.028em" }}>
            A friendship that goes back to childhood.
          </h2>
          <p style={{ margin: "0 0 18px", fontSize: 18, lineHeight: 1.6, color: "#3a3a3c" }}>
            One of us built software; the other designed and delivered residential villas. After collaborating on several projects, including our own homes and family developments, we ran straight into the same wall over and over: managing communication, approvals, site updates, documents, and coordination.
          </p>
          <p style={{ margin: "0 0 18px", fontSize: 18, lineHeight: 1.6, color: "#3a3a3c" }}>
            The turning point was realising these frustrations weren&apos;t ours alone. They were everywhere in architecture and construction. So we set out to solve them with technology.
          </p>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#1d1d1f", fontWeight: 500 }}>
            That conviction became ArchiFlask, a platform built to bring clarity, collaboration, and control to every project.
          </p>
        </Reveal>
        <Reveal y={28} duration={1} delay={0.1} style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 24px 60px rgba(0,0,0,.08)", background: "#fff" }}>
          <ImageSlot src={ABOUT_STORY_IMAGE} alt="Founders / studio / early project photo" style={{ height: 440 }} />
        </Reveal>
      </div>
    </section>
  );
}
