import { Reveal } from "@/components/motion/Reveal";
import { REVIEWS } from "@/lib/content";
import { GRAD_PANEL } from "@/lib/tokens";

export function Reviews() {
  return (
    <section style={{ padding: "114px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>Reviews</div>
          <h2 style={{ margin: "14px 0 0", fontSize: 46, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.028em" }}>What firm owners say.</h2>
        </Reveal>
        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="af-grid-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={i}
              y={30}
              duration={0.8}
              delay={(i % 3) * 0.07}
              style={{
                padding: 30,
                borderRadius: 22,
                background: r.dark ? GRAD_PANEL : "#f5f5f7",
                color: r.dark ? "#fff" : "#1d1d1f",
                border: r.dark ? "none" : "1px solid rgba(0,0,0,.05)",
                boxShadow: r.dark ? "inset 0 1px 0 rgba(255,255,255,.1)" : undefined,
              }}
            >
              <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.55, fontWeight: 500, letterSpacing: "-0.01em" }}>&quot;{r.quote}&quot;</p>
              <div style={{ marginTop: 20, fontSize: 14, color: r.dark ? "rgba(255,255,255,.6)" : "#86868b" }}>{r.who}</div>
            </Reveal>
          ))}
        </div>
        <Reveal y={18} delay={0.12} style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "#aeaeb2" }}>
          Representative of feedback from firms using ArchiFlask. Named case studies coming soon.
        </Reveal>
      </div>
    </section>
  );
}
