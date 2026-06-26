import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_STORIES } from "@/lib/content";

export function Stories() {
  return (
    <section className="bg-surface px-5 py-[72px] md:px-6 md:py-[114px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={28} className="text-center text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">
          Field stories
        </Reveal>
        <Reveal delay={0.08} y={30} className="mb-12 mt-3.5 text-center">
          <h2 className="text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            The way a firm runs is the thing it fixes.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {IMPACT_STORIES.map((s, i) => (
            <Reveal
              key={s.kicker}
              y={30}
              delay={i * 0.1}
              className="rounded-[24px] border border-black/[0.06] bg-white p-[38px]"
            >
              <div className="text-[13px] font-bold tracking-[0.06em] text-gray-2">{s.kicker}</div>
              <p className="mt-[18px] text-[18px] leading-[1.6] text-ink">{s.body}</p>
              <div className="mt-[18px] text-[13px] text-gray-3">Anonymised</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
