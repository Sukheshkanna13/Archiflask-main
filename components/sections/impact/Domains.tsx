import { Reveal } from "@/components/motion/Reveal";
import { DOMAINS } from "@/lib/content";

export function Domains() {
  return (
    <section style={{ padding: "90px 24px", background: "#f5f5f7", borderTop: "1px solid rgba(0,0,0,.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Reveal y={24} style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>
          Works across every domain
        </Reveal>
        <Reveal delay={0.08} y={24} style={{ marginTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
          {DOMAINS.map((d) => (
            <span key={d} style={{ padding: "12px 26px", borderRadius: 980, background: "#fff", border: "1px solid rgba(0,0,0,.08)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {d}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
