import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { STATS, ORBIT_NODES } from "@/lib/content";

export function About() {
  return (
    <section id="af-about" style={{ padding: "110px 40px", background: "#fff", borderTop: "1px solid rgba(0,0,0,.06)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#86868b" }}>02, About ArchiFlask</div>
            <h2 style={{ margin: "14px 0 0", fontSize: 60, lineHeight: 1.0, fontWeight: 600, letterSpacing: "-0.03em" }}>
              We give firms control.
            </h2>
          </div>
          <Button href="/book-demo" variant="ghost" style={{ fontSize: 15, padding: "12px 22px" }}>
            Become a Client <span style={{ fontSize: 17 }}>→</span>
          </Button>
        </Reveal>
        <div style={{ marginTop: 22, height: 1, background: "rgba(0,0,0,.1)" }} />

        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "start" }} className="af-grid-2">
          <div>
            <Reveal style={{ margin: 0, maxWidth: 560, fontSize: 26, lineHeight: 1.35, fontWeight: 500, letterSpacing: "-0.01em" }}>
              <span style={{ color: "#1d1d1f" }}>A solid system</span>{" "}
              <span style={{ color: "#aeaeb2" }}>
                aligned with how design and construction firms actually work is what lets a practice scale, without losing
                control of a single project.
              </span>
            </Reveal>

            <Reveal delay={0.08} style={{ margin: "40px 0 16px", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", color: "#86868b" }}>
              SOME NUMBERS ABOUT US
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="af-grid-2">
              {STATS.map((s, i) => (
                <Reveal key={i} y={28} duration={0.8} delay={i * 0.07}>
                  <StatCard stat={s} index={i} delay={0} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* orbit diagram */}
          <Reveal duration={1}>
            <div style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto", aspectRatio: "1/1" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%,#fafafa,#ececef 70%)", boxShadow: "inset 0 0 60px rgba(0,0,0,.04)" }} />
              <div style={{ position: "absolute", inset: "16%", borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#ffffff,#e4e4e9)", boxShadow: "0 30px 60px rgba(0,0,0,.06)" }} />
              <div style={{ position: "absolute", inset: "6%", borderRadius: "50%", border: "1px dashed rgba(0,0,0,.12)", animation: "afSpin 60s linear infinite" }} />
              <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", border: "1px dashed rgba(0,0,0,.10)", animation: "afSpinR 45s linear infinite" }} />
              {ORBIT_NODES.map((n) => (
                <div key={n.label} style={{ position: "absolute", left: n.left, top: n.top, display: "flex", alignItems: "center", gap: 8 }}>
                  {n.labelFirst && <span style={{ fontSize: 14, fontWeight: 600 }}>{n.label}</span>}
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#1d1d1f", boxShadow: "0 0 0 5px rgba(29,29,31,.10)" }} />
                  {!n.labelFirst && <span style={{ fontSize: 14, fontWeight: 600 }}>{n.label}</span>}
                </div>
              ))}
              <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".04em", color: "#86868b" }}>ONE SYSTEM</div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>ArchiFlask</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal y={20} style={{ marginTop: 72 }}>
          <Marquee />
        </Reveal>
      </div>
    </section>
  );
}
