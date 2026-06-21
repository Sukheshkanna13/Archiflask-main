import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_CARDS } from "@/lib/content";

export function Impact() {
  return (
    <section style={{ padding: "120px 24px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#86868b" }}>
          Impact
        </Reveal>
        <Reveal delay={0.08} y={30} style={{ margin: "14px 0 48px", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 46, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>
            The way a firm runs is the thing it fixes.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="af-grid-2">
          {IMPACT_CARDS.map((c, i) => (
            <Reveal key={c.kicker} y={30} delay={i * 0.1} style={{ padding: 34, borderRadius: 22, background: "#fff", border: "1px solid rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#86868b" }}>{c.kicker}</div>
              <p style={{ margin: "16px 0 0", fontSize: 18, lineHeight: 1.55, color: "#1d1d1f" }}>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
