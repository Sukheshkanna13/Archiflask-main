import { Reveal } from "@/components/motion/Reveal";
import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING, PRICING_NOTE } from "@/lib/content";

export function Pricing() {
  return (
    <section id="af-pricing" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid rgba(0,0,0,.06)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <Reveal y={28} style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#86868b" }}>Pricing</div>
          <h2 style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Simple pricing that scales with the firm.
          </h2>
          <p style={{ margin: "18px auto 0", fontSize: 19, lineHeight: 1.55, color: "#6e6e73" }}>
            Start free with no end date. Upgrade per user when you&apos;re ready to grow — billed monthly, or yearly for a discount.
          </p>
        </Reveal>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 18, alignItems: "stretch" }} className="af-grid-4">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} y={30} duration={0.8} delay={i * 0.07} style={{ height: "100%" }}>
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: 24, textAlign: "center", fontSize: 13.5, color: "#aeaeb2" }}>{PRICING_NOTE}</p>
      </div>
    </section>
  );
}
