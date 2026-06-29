import { Reveal } from "@/components/motion/Reveal";
import { CardDeck } from "@/components/motion/CardDeck";

export function Questions() {
  return (
    <section className="animate-on-scroll bg-surface px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1040px] text-center">
        <Reveal y={24} className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">
          The morning check
        </Reveal>
        <Reveal delay={0.08} y={30} className="mt-3.5">
          <h2 className="text-[clamp(34px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            The five things you need to know
            <br />
            before 9 a.m., on one screen.
          </h2>
        </Reveal>
        <div className="mt-[18px] text-[13px] font-semibold text-gray-3">Hover the deck to fan it out →</div>
        <CardDeck />
      </div>
    </section>
  );
}