import { Reveal } from "@/components/motion/Reveal";
import { ABOUT_PRODUCT } from "@/lib/content";
import { GRAD_DARK } from "@/lib/tokens";

function Icon({ kind }: { kind: "circle" | "doc" | "rupee" }) {
  return (
    <div style={{ width: 44, height: 44, borderRadius: 13, background: GRAD_DARK, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)" }}>
      {kind === "circle" && <span style={{ width: 16, height: 16, border: "2px solid #fff", borderRadius: "50%" }} />}
      {kind === "doc" && <span style={{ width: 18, height: 14, border: "2px solid #fff", borderRadius: 3 }} />}
      {kind === "rupee" && <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>₹</span>}
    </div>
  );
}

export function Product() {
  return (
    <section style={{ padding: "114px 24px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>The product</div>
          <h2 style={{ margin: "14px 0 0", fontSize: 46, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.028em" }}>One platform for the whole firm.</h2>
          <p style={{ margin: "18px auto 0", fontSize: 19, lineHeight: 1.55, color: "#6e6e73" }}>
            ArchiFlask is the architecture firm management software that brings projects, clients, teams, drawings, site activity, approvals and profitability into one place — so a growing firm runs on a system instead of memory. It&apos;s the Standard Operating Procedure for design and construction practices.
          </p>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="af-grid-3">
          {ABOUT_PRODUCT.map((p, i) => (
            <Reveal key={p.title} y={30} delay={i * 0.1} style={{ padding: 32, borderRadius: 22, background: "#fff", border: "1px solid rgba(0,0,0,.05)" }}>
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
