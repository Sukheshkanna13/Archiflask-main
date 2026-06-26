import { Reveal } from "@/components/motion/Reveal";

export function Vision() {
  return (
    <section className="bg-[linear-gradient(180deg,#1c1c1e,#000)] px-5 py-[72px] text-center text-white md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[900px]">
        <Reveal y={24} className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/50">
          Our vision
        </Reveal>
        <Reveal delay={0.08} y={30} className="mt-[22px]">
          <h2 className="text-[clamp(32px,4.4vw,44px)] font-semibold leading-[1.18] tracking-[-0.025em] text-balance">
            ArchiFlask becomes the daily operating standard, the SOP, for design, construction, and PMC firms, in India and globally.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
