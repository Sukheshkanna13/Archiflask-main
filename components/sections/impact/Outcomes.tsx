import { Reveal } from "@/components/motion/Reveal";
import { IMPACT_OUTCOMES } from "@/lib/content";

export function Outcomes() {
  return (
    <section className="bg-white px-5 py-[72px] md:px-6 md:py-[104px]">
      <div className="mx-auto max-w-[1140px]">
        <Reveal y={28}>
          <h2 className="mb-12 max-w-[560px] text-[clamp(30px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            What firms get back, in the first weeks.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {IMPACT_OUTCOMES.map((o, i) => (
            <Reveal
              key={o.num}
              y={30}
              duration={0.8}
              delay={i * 0.07}
              className={`rounded-[20px] p-[26px] ${
                o.dark
                  ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.1)]"
                  : "bg-surface text-ink"
              }`}
            >
              <div className={`text-[13px] font-bold ${o.dark ? "text-white/55" : "text-gray-2"}`}>{o.num}</div>
              <p className="mt-3.5 text-[16px] font-medium leading-[1.45]">{o.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
