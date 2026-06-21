import { Reveal } from "@/components/motion/Reveal";
import { CardDeck } from "@/components/motion/CardDeck";

export function Questions() {
  return (
    <section style={{ padding: "120px 24px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center" }}>
        <Reveal y={24} style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>
          The morning check
        </Reveal>
        <Reveal delay={0.08} y={30} style={{ marginTop: 14 }}>
          <h2 style={{ margin: 0, fontSize: 48, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>
            The five things you need to know
            <br />
            before 9 a.m. — on one screen.
          </h2>
        </Reveal>
        <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: "#aeaeb2" }}>Hover the deck to fan it out →</div>
        <CardDeck />
      </div>
    </section>
  );
}
