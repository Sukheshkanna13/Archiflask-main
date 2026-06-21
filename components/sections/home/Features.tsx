import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FEATURES_SPLIT, FEATURES_CARDS } from "@/lib/content";
import { FEATURE_IMAGES } from "@/lib/images";

function SplitText({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#86868b" }}>{eyebrow}</div>
      <h3 style={{ margin: "14px 0 12px", fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "#6e6e73" }}>{body}</p>
    </div>
  );
}

export function Features() {
  return (
    <section style={{ padding: "120px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal y={30}>
          <h2 style={{ margin: 0, fontSize: 48, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 680 }}>
            Everything a project needs, from enquiry to handover.
          </h2>
        </Reveal>

        {FEATURES_SPLIT.map((f, i) => {
          const text = (
            <Reveal key="t" y={30} delay={f.reverse ? 0 : 0}>
              <SplitText eyebrow={f.eyebrow} title={f.title} body={f.body} />
            </Reveal>
          );
          const image = (
            <Reveal
              key="i"
              y={30}
              delay={0.1}
              style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 24px 60px rgba(0,0,0,.08)", background: "#fff" }}
            >
              <ImageSlot src={FEATURE_IMAGES[f.slotId]} alt={f.placeholder} style={{ height: 360 }} />
            </Reveal>
          );
          return (
            <div
              key={f.slotId}
              className="af-grid-2"
              style={{
                marginTop: i === 0 ? 64 : 48,
                display: "grid",
                gridTemplateColumns: f.reverse ? "1.05fr 1fr" : "1fr 1.05fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              {f.reverse ? (
                <>
                  {image}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {image}
                </>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="af-grid-3">
          {FEATURES_CARDS.map((c, i) => (
            <Reveal key={c.num} y={30} delay={i * 0.1} style={{ padding: 28, borderRadius: 22, background: "#f5f5f7" }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#86868b" }}>{c.num}</div>
              <h3 style={{ margin: "12px 0 8px", fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, color: "#6e6e73" }}>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
