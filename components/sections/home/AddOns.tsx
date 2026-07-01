import { Reveal } from "@/components/motion/Reveal";
import { ADDONS } from "@/lib/content";

export function AddOns() {
  return (
    <section
      id="af-addons"
      className="animate-on-scroll scroll-mt-20 border-t border-black/[0.06] bg-surface px-5 py-[72px] md:px-6 md:py-[110px]"
    >
      <div className="mx-auto max-w-[1260px]">
        <Reveal y={28} className="mx-auto max-w-[720px] text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">Add-ons</div>
          <h2 className="mt-3.5 text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Add power as you grow.
          </h2>
          <p className="mt-[18px] text-[18px] leading-[1.55] text-gray">
            Layer real-time, value-added features onto any plan. Each one is priced on its own, so you only pay for what your firm actually uses.
          </p>
        </Reveal>

        <div className="mt-[52px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a, i) => (
            <Reveal key={a.title} y={28} duration={0.8} delay={(i % 3) * 0.07} className="h-full">
              <div className="af-card flex h-full min-h-[112px] items-center justify-between gap-5 rounded-[18px] border border-black/[0.06] bg-white px-7 py-6">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{a.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.5] text-gray-2">{a.body}</p>
                </div>
                <div className="flex-none text-right">
                  <div className="text-[22px] font-semibold tracking-[-0.02em]">{a.price}</div>
                  {a.period && <div className="text-[12px] text-gray-3">{a.period}</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
