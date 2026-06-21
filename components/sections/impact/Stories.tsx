import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_STORIES } from "@/lib/content";

export function Stories() {
  return (
    <section style={{ padding: "114px 24px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>
          Field stories
        </Reveal>
        <Reveal delay={0.08} y={30} style={{ margin: "14px 0 48px", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 46, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>
            The way a firm runs is the thing it fixes.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="af-grid-2">
          {IMPACT_STORIES.map((s, i) => (
            <Reveal key={s.kicker} y={30} delay={i * 0.1} style={{ padding: 38, borderRadius: 24, background: "#fff", border: "1px solid rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".06em", color: "#86868b" }}>{s.kicker}</div>
              <p style={{ margin: "18px 0 0", fontSize: 18, lineHeight: 1.6, color: "#1d1d1f" }}>{s.body}</p>
              <div style={{ marginTop: 18, fontSize: 13, color: "#aeaeb2" }}>Anonymised</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
