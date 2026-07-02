import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function BlogHero() {
  return (
    <section className="bg-[radial-gradient(120%_70%_at_50%_0%,#f5f5f7,#fff_62%)] px-5 pb-[70px] pt-[114px] text-center md:px-6 md:pt-[150px]">
      <div className="mx-auto max-w-[920px]">
        <Reveal y={24}>
          <SectionLabel>Blog</SectionLabel>
        </Reveal>
        <Reveal delay={0.06} y={28}>
          <h1 className="mt-4 text-[clamp(42px,8vw,66px)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
            Running, scaling, and systematising a firm.
          </h1>
        </Reveal>
        <Reveal delay={0.14} y={24} className="mx-auto mt-[26px] max-w-[640px] text-[20px] leading-[1.5] text-gray">
          Practical writing for firm owners on managing architecture projects efficiently and scaling a practice without losing control.
        </Reveal>
      </div>
    </section>
  );
}
