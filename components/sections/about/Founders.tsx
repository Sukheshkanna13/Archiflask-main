import { Reveal } from "@/components/motion/Reveal";
import { FOUNDERS } from "@/lib/content";

export function Founders() {
  return (
    <section className="animate-on-scroll bg-white px-5 py-[72px] md:px-6 md:py-[114px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={28} className="text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">The founders</div>
          <h2 className="mt-3.5 text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.028em]">
            Fifteen years of real projects, behind one platform.
          </h2>
        </Reveal>
        <div className="mt-[54px] grid grid-cols-1 gap-[22px] md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal
              key={f.slotId}
              y={30}
              delay={i * 0.1}
              className="af-card rounded-[24px] border border-black/[0.05] bg-surface p-[34px]"
            >
              <div className="flex items-center gap-[18px]">
                <div>
                  <div className="text-[22px] font-semibold tracking-[-0.01em]">{f.name}</div>
                  <div className="mt-[3px] text-[14.5px] font-semibold text-gray-2">{f.role}</div>
                </div>
              </div>
              <p className="mt-[22px] text-[16.5px] leading-[1.6] text-ink-2">{f.bio}</p>
            </Reveal>
          ))}
        </div>
        <Reveal y={20} delay={0.15} className="mt-[26px] text-center text-[14.5px] text-gray-2">
          A product of Wallzehn Technologies Pvt. Ltd.
        </Reveal>
      </div>
    </section>
  );
}