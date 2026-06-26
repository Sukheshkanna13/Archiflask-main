import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_CARDS } from "@/lib/content";

export function Impact() {
  return (
    <section className="bg-surface px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1040px]">
        <Reveal y={28} className="text-center text-[13px] font-bold uppercase tracking-[0.12em] text-gray-2">
          Impact
        </Reveal>
        <Reveal delay={0.08} y={30} className="mb-12 mt-3.5 text-center">
          <h2 className="text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            The way a firm runs is the thing it fixes.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {IMPACT_CARDS.map((c, i) => (
            <Reveal
              key={c.kicker}
              y={30}
              delay={i * 0.1}
              className="rounded-[22px] border border-black/[0.06] bg-white p-[34px]"
            >
              <div className="text-[13px] font-bold text-gray-2">{c.kicker}</div>
              <p className="mt-4 text-[18px] leading-[1.55] text-ink">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
