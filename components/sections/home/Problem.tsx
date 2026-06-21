import { Reveal } from "@/components/motion/Reveal";
import { PROBLEMS } from "@/lib/content";
import { GRAD_DARK } from "@/lib/tokens";

function Icon({ kind }: { kind: "doc" | "rupee" | "ops" }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 13,
        background: GRAD_DARK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)",
      }}
    >
      {kind === "doc" && <span style={{ width: 18, height: 14, border: "2px solid #fff", borderRadius: 3 }} />}
      {kind === "rupee" && <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>₹</span>}
      {kind === "ops" && <span style={{ width: 16, height: 16, border: "2px solid #fff", borderRadius: "50%" }} />}
    </div>
  );
}

export function Problem() {
  return (
    <section style={{ padding: "120px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <Reveal y={30} style={{ margin: 0, textAlign: "center", maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ margin: 0, fontSize: 52, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em", textWrap: "balance" }}>
            Most firms don&apos;t have a problem with talent.
            <br />
            <span style={{ color: "#86868b" }}>They have a problem with system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={24} style={{ margin: "24px auto 0", maxWidth: 640, textAlign: "center", fontSize: 19, lineHeight: 1.55, color: "#6e6e73" }}>
          As a firm grows, the cracks show up in the same three places every time. ArchiFlask closes those gaps so you can take on more without breaking.
        </Reveal>
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="af-grid-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} y={30} delay={i * 0.1} style={{ padding: 30, borderRadius: 22, background: "#f5f5f7" }}>
              <Icon kind={p.icon} />
              <h3 style={{ margin: "20px 0 8px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#6e6e73" }}>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
