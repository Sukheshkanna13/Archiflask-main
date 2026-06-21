import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section style={{ padding: "130px 24px 200px", background: "#fff", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal y={30}>
          <h2 style={{ margin: 0, fontSize: 64, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.03em" }}>
            See it on your own projects.
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={24} style={{ margin: "22px auto 0", maxWidth: 520, fontSize: 20, lineHeight: 1.5, color: "#6e6e73" }}>
          Book a 20-minute demo — our team walks you through it, then you can get started free.
        </Reveal>
        <Reveal delay={0.18} y={24} style={{ marginTop: 34, display: "flex", gap: 14, justifyContent: "center" }}>
          <div style={{ position: "relative", display: "inline-flex" }}>
            <span style={{ position: "absolute", inset: -14, borderRadius: 980, border: "1.5px dashed rgba(0,0,0,.18)", pointerEvents: "none" }} />
            <Button id="af-demo-end" href="/book-demo" variant="dark" style={{ position: "relative", fontSize: 17, padding: "15px 34px", boxShadow: "0 2px 12px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.22)" }}>
              Book a Demo
            </Button>
          </div>
          <Button href="/book-demo" variant="light" style={{ fontSize: 17, padding: "15px 32px" }}>
            Get Started
          </Button>
        </Reveal>
        <div style={{ marginTop: 38, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, opacity: 0.55 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#1d1d1f" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#aeaeb2" }}>End of the line</span>
        </div>
      </div>
    </section>
  );
}
