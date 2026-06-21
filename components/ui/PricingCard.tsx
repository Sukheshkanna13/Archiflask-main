import { Button } from "@/components/ui/Button";
import { GRAD_PANEL } from "@/lib/tokens";
import type { PricingTier } from "@/lib/content";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/book-demo";

export function PricingCard({ tier }: { tier: PricingTier }) {
  const dark = tier.variant === "dark";
  const muted = dark ? "rgba(255,255,255,.6)" : "#86868b";
  const strikeColor = dark ? "rgba(255,255,255,.4)" : "#aeaeb2";
  const divider = dark ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.08)";
  const href = tier.ctaHref === "SIGNUP" ? SIGNUP_URL : tier.ctaHref;

  const cardStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: dark ? "34px 26px 30px" : "30px 26px",
    borderRadius: 24,
    background: tier.variant === "outline" ? "#fff" : dark ? GRAD_PANEL : "#f5f5f7",
    color: dark ? "#fff" : "#1d1d1f",
    border:
      tier.variant === "outline"
        ? "1px solid rgba(0,0,0,.12)"
        : dark
          ? "none"
          : "1px solid rgba(0,0,0,.05)",
    boxShadow:
      tier.variant === "outline"
        ? "0 18px 44px rgba(0,0,0,.05)"
        : dark
          ? "0 30px 70px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.1)"
          : undefined,
  };

  return (
    <div style={cardStyle}>
      {tier.popular && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 980,
            background: "#fff",
            color: "#1d1d1f",
            boxShadow: "0 6px 18px rgba(0,0,0,.25)",
          }}
        >
          Most Popular
        </div>
      )}

      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: muted }}>
        {tier.name}
      </div>

      {/* price line */}
      {tier.price === "Custom" ? (
        <div style={{ margin: "14px 0 4px", fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em" }}>Custom</div>
      ) : tier.priceCurrency ? (
        <div style={{ margin: "14px 0 4px", display: "flex", alignItems: "baseline", gap: 3 }}>
          <span style={{ fontSize: 22, fontWeight: 600 }}>₹</span>
          <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em" }}>{tier.price}</span>
          {tier.pricePeriod && <span style={{ fontSize: 15, color: muted, marginLeft: 4 }}>{tier.pricePeriod}</span>}
        </div>
      ) : (
        <div style={{ margin: "14px 0 4px", display: "flex", alignItems: "baseline", gap: 6 }}>
          {tier.priceStrike && (
            <span style={{ fontSize: 18, color: strikeColor, textDecoration: "line-through" }}>{tier.priceStrike}</span>
          )}
          <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em" }}>{tier.price}</span>
        </div>
      )}

      {tier.subline && <div style={{ fontSize: 13.5, color: muted }}>{tier.subline}</div>}
      {tier.blurb && <div style={{ fontSize: 14, color: muted, lineHeight: 1.4 }}>{tier.blurb}</div>}
      {tier.yearly && (
        <div style={{ marginTop: 8, fontSize: 13, color: dark ? "rgba(255,255,255,.7)" : "#6e6e73" }}>
          <span style={{ textDecoration: "line-through", color: strikeColor }}>{tier.yearly.strike}</span>{" "}
          <span style={{ fontWeight: 600, color: dark ? "#fff" : "#1d1d1f" }}>{tier.yearly.now}</span> {tier.yearly.suffix}
        </div>
      )}

      <div style={{ margin: "22px 0 22px", height: 1, background: divider }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 13, flex: 1 }}>
        {tier.features.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 9,
              alignItems: "flex-start",
              fontSize: 14.5,
              lineHeight: 1.4,
              color: f.muted ? "#c2c2c9" : dark ? "#fff" : "#1d1d1f",
            }}
          >
            <span style={{ flex: "none", fontWeight: f.muted ? 400 : 700 }}>{f.muted ? "—" : "✓"}</span>
            <span style={f.muted ? { textDecoration: "line-through" } : undefined}>{f.text}</span>
          </div>
        ))}
        {tier.addon && <div style={{ marginTop: 2, fontSize: 13, color: dark ? "rgba(255,255,255,.5)" : "#aeaeb2" }}>{tier.addon}</div>}
      </div>

      <Button
        href={href}
        variant={tier.variant === "dark" ? "white" : tier.variant === "outline" ? "dark" : "light"}
        style={{
          marginTop: 24,
          width: "100%",
          fontSize: 15,
          fontWeight: 600,
          padding: "13px",
          borderRadius: 980,
          boxShadow: tier.variant === "dark" ? "0 2px 12px rgba(0,0,0,.3)" : undefined,
        }}
      >
        {tier.cta}
      </Button>
    </div>
  );
}
