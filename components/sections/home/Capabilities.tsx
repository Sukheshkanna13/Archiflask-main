import { Reveal } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/lib/content";
import { GRAD_PANEL } from "@/lib/tokens";

export function Capabilities() {
  return (
    <section style={{ padding: "120px 24px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal y={30}>
          <h2 style={{ margin: 0, textAlign: "center", fontSize: 48, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>
            Built for how design and construction
            <br />
            firms actually work.
          </h2>
        </Reveal>
        <div style={{ marginTop: 54, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="af-grid-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.title}
              y={28}
              duration={0.8}
              delay={(i % 4) * 0.06}
              style={{
                padding: 24,
                borderRadius: 18,
                background: c.dark ? GRAD_PANEL : "#fff",
                color: c.dark ? "#fff" : "#1d1d1f",
                border: c.dark ? "none" : "1px solid rgba(0,0,0,.05)",
                boxShadow: c.dark ? "inset 0 1px 0 rgba(255,255,255,.12)" : undefined,
              }}
            >
              <h4 style={{ margin: "0 0 7px", fontSize: 17, fontWeight: 600 }}>{c.title}</h4>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: c.dark ? "rgba(255,255,255,.66)" : "#86868b" }}>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
