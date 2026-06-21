import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ImpactHero() {
  return (
    <section style={{ padding: "178px 24px 96px", background: "radial-gradient(120% 70% at 50% 0%,#f5f5f7,#fff 62%)", textAlign: "center" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <Reveal y={24}>
          <SectionLabel>Impact</SectionLabel>
        </Reveal>
        <Reveal delay={0.06} y={28}>
          <h1 style={{ margin: "16px 0 0", fontSize: 66, lineHeight: 1.02, fontWeight: 600, letterSpacing: "-0.035em", textWrap: "balance" }}>
            Real change, on real projects.
          </h1>
        </Reveal>
        <Reveal delay={0.14} y={24} style={{ margin: "26px auto 0", maxWidth: 660, fontSize: 20, lineHeight: 1.5, color: "#6e6e73" }}>
          ArchiFlask works the same way across residential, commercial, interiors, and infrastructure — because the way a firm runs is the thing it fixes.
        </Reveal>
      </div>
    </section>
  );
}
