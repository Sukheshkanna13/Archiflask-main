import { Button } from "@/components/ui/Button";
import type { PricingTier } from "@/lib/content";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

export function PricingCard({ tier }: { tier: PricingTier }) {
  const dark = tier.variant === "dark";
  const muted = dark ? "text-white/60" : "text-gray-2";
  const strike = dark ? "text-white/40" : "text-gray-3";
  const divider = dark ? "bg-white/[0.16]" : "bg-black/[0.08]";
  const href = tier.ctaHref === "SIGNUP" ? SIGNUP_URL : tier.ctaHref;

  const surface =
    tier.variant === "outline"
      ? "bg-white border border-black/[0.12] shadow-[0_18px_44px_rgba(0,0,0,.05)] text-ink"
      : dark
        ? "bg-[image:var(--grad-panel)] text-white shadow-[0_30px_70px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.1)]"
        : "bg-surface text-ink border border-black/[0.05]";

  return (
    <div
      className={`relative flex h-full flex-col rounded-[24px] ${
        dark ? "px-[26px] pb-[30px] pt-[34px]" : "px-[26px] py-[30px]"
      } ${surface}`}
    >
      {tier.popular && (
        <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-pill bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink shadow-[0_6px_18px_rgba(0,0,0,.25)]">
          Most Popular
        </div>
      )}

      <div className={`text-[13px] font-bold uppercase tracking-[0.08em] ${muted}`}>{tier.name}</div>

      {/* price line */}
      {tier.price === "Custom" ? (
        <div className="mb-1 mt-3.5 text-[44px] font-semibold tracking-[-0.03em]">Custom</div>
      ) : tier.priceCurrency ? (
        <div className="mb-1 mt-3.5 flex items-baseline gap-[3px]">
          <span className="text-[22px] font-semibold">₹</span>
          <span className="text-[48px] font-semibold tracking-[-0.03em]">{tier.price}</span>
          {tier.pricePeriod && <span className={`ml-1 text-[15px] ${muted}`}>{tier.pricePeriod}</span>}
        </div>
      ) : (
        <div className="mb-1 mt-3.5 flex items-baseline gap-1.5">
          {tier.priceStrike && <span className={`text-[18px] line-through ${strike}`}>{tier.priceStrike}</span>}
          <span className="text-[48px] font-semibold tracking-[-0.03em]">{tier.price}</span>
        </div>
      )}

      {tier.subline && <div className={`text-[13.5px] ${muted}`}>{tier.subline}</div>}
      {tier.blurb && <div className={`text-[14px] leading-[1.4] ${muted}`}>{tier.blurb}</div>}
      {tier.yearly && (
        <div className={`mt-2 text-[13px] ${dark ? "text-white/70" : "text-gray"}`}>
          <span className={`line-through ${strike}`}>{tier.yearly.strike}</span>{" "}
          <span className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{tier.yearly.now}</span>{" "}
          {tier.yearly.suffix}
        </div>
      )}

      <div className={`my-[22px] h-px ${divider}`} />

      <div className="flex flex-1 flex-col gap-[13px]">
        {tier.features.map((f, i) => (
          <div
            key={i}
            className={`flex items-start gap-[9px] text-[14.5px] leading-[1.4] ${
              f.muted ? "text-gray-4" : dark ? "text-white" : "text-ink"
            }`}
          >
            <span className={`flex-none ${f.muted ? "font-normal" : "font-bold"}`}>{f.muted ? "—" : "✓"}</span>
            <span className={f.muted ? "line-through" : undefined}>{f.text}</span>
          </div>
        ))}
        {tier.addon && <div className={`mt-0.5 text-[13px] ${dark ? "text-white/50" : "text-gray-3"}`}>{tier.addon}</div>}
      </div>

      <Button
        href={href}
        variant={tier.variant === "dark" ? "white" : tier.variant === "outline" ? "dark" : "light"}
        className={`mt-6 w-full px-[13px] py-[13px] text-[15px] font-semibold ${
          tier.variant === "dark" ? "shadow-[0_2px_12px_rgba(0,0,0,.3)]" : ""
        }`}
      >
        {tier.cta}
      </Button>
    </div>
  );
}
