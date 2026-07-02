import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ImpactHero() {
  return (
    <section className="bg-[radial-gradient(120%_70%_at_50%_0%,#f5f5f7,#fff_62%)] px-5 pb-24 pt-[114px] text-center md:px-6 md:pt-[150px]">
      <div className="mx-auto max-w-[920px]">
        <Reveal y={24}>
          <SectionLabel>Impact</SectionLabel>
        </Reveal>
        <Reveal delay={0.06} y={28}>
          <h1 className="mt-4 text-[clamp(42px,8vw,66px)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
            Real change, on real projects.
          </h1>
        </Reveal>
        <Reveal delay={0.14} y={24} className="mx-auto mt-[26px] max-w-[660px] text-[20px] leading-[1.5] text-gray">
          ArchiFlask works the same way across residential, commercial, interiors, and infrastructure, because the way a firm runs is the thing it fixes.
        </Reveal>
      </div>
    </section>
  );
}
