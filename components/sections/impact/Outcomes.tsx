import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_OUTCOMES } from "@/lib/content";
import { GRAD_PANEL } from "@/lib/tokens";

export function Outcomes() {
  return (
    <section style={{ padding: "104px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal y={28}>
          <h2 style={{ margin: "0 0 48px", fontSize: 40, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 560 }}>
            What firms get back, in the first weeks.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }} className="af-grid-5">
          {IMPACT_OUTCOMES.map((o, i) => (
            <Reveal
              key={o.num}
              y={30}
              duration={0.8}
              delay={i * 0.07}
              style={{
                padding: 26,
                borderRadius: 20,
                background: o.dark ? GRAD_PANEL : "#f5f5f7",
                color: o.dark ? "#fff" : "#1d1d1f",
                boxShadow: o.dark ? "inset 0 1px 0 rgba(255,255,255,.1)" : undefined,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: o.dark ? "rgba(255,255,255,.55)" : "#86868b" }}>{o.num}</div>
              <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.45, fontWeight: 500 }}>{o.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
