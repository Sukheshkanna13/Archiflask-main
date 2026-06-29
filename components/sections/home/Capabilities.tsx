import { Reveal } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/lib/content";

export function Capabilities() {
  return (
    <section className="animate-on-scroll bg-surface px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={30}>
          <h2 className="text-center text-[clamp(34px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            Built for how design and construction
            <br />
            firms actually work.
          </h2>
        </Reveal>
        <div className="mt-[54px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.title}
              y={28}
              duration={0.8}
              delay={(i % 4) * 0.06}
              className={`af-card rounded-[18px] p-6 ${c.dark
                  ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
                  : "border border-black/[0.05] bg-white text-ink"
                }`}
            >
              <h4 className="mb-[7px] text-[17px] font-semibold">{c.title}</h4>
              <p className={`text-[14.5px] leading-[1.5] ${c.dark ? "text-white/[0.66]" : "text-gray-2"}`}>
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}