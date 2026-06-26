import { Reveal } from "@/components/motion/Reveal";
import { DOMAINS } from "@/lib/content";

export function Domains() {
  return (
    <section className="border-t border-black/[0.06] bg-surface px-5 py-[72px] md:px-6 md:py-[90px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal y={24} className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">
          Works across every domain
        </Reveal>
        <Reveal delay={0.08} y={24} className="mt-6 flex flex-wrap justify-center gap-3.5">
          {DOMAINS.map((d) => (
            <span
              key={d}
              className="rounded-pill border border-black/[0.08] bg-white px-[26px] py-3 text-[18px] font-semibold tracking-[-0.01em]"
            >
              {d}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
