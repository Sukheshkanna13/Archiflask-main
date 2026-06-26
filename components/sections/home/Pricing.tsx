import { Reveal } from "@/components/motion/Reveal";
import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING, PRICING_NOTE } from "@/lib/content";

export function Pricing() {
  return (
    <section
      id="af-pricing"
      className="scroll-mt-20 border-t border-black/[0.06] bg-white px-5 py-[72px] md:px-6 md:py-[120px]"
    >
      <div className="mx-auto max-w-[1260px]">
        <Reveal y={28} className="mx-auto max-w-[720px] text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">Pricing</div>
          <h2 className="mt-3.5 text-[clamp(32px,5.2vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Simple pricing that scales with the firm.
          </h2>
          <p className="mt-[18px] text-[19px] leading-[1.55] text-gray">
            Start free with no end date. Upgrade per user when you&apos;re ready to grow, billed monthly, or yearly for a discount.
          </p>
        </Reveal>

        <div className="mt-[60px] grid grid-cols-1 items-stretch gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} y={30} duration={0.8} delay={i * 0.07} className="h-full">
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-gray-3">{PRICING_NOTE}</p>
      </div>
    </section>
  );
}
