import { Reveal } from "@/components/motion/Reveal";

export function Vision() {
  return (
    <section style={{ padding: "120px 24px", background: "linear-gradient(180deg,#1c1c1e,#000)", color: "#fff", textAlign: "center" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal y={24} style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
          Our vision
        </Reveal>
        <Reveal delay={0.08} y={30} style={{ marginTop: 22 }}>
          <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.18, fontWeight: 600, letterSpacing: "-0.025em", textWrap: "balance" }}>
            ArchiFlask becomes the daily operating standard, the SOP, for design, construction, and PMC firms, in India and globally.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
