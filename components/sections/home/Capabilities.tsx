import { Reveal } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/lib/content";

export function Capabilities() {
  return (
    <section className="animate-on-scroll bg-surface px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={30}>
          <h2 className="text-center text-[clamp(34px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            Revolutionary features that blend cutting-edge technology with seamless usability
          </h2>
        </Reveal>
        <div className="mt-[54px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => {
            const hoverClass = c.dark
              ? "hover:shadow-[0_20px_40px_rgba(255,255,255,0.06)] hover:border-white/20"
              : "hover:shadow-[0_20px_40px_rgba(29,29,31,0.06)] hover:border-black/15";

            return (
              <Reveal
                key={c.title}
                y={28}
                duration={0.8}
                delay={(i % 3) * 0.07}
                className="h-full"
              >
                <div
                  className={`h-full rounded-[18px] p-8 border border-black/[0.04] transition-all duration-700 ease-out hover:-translate-y-1.5 ${hoverClass} ${c.dark
                    ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
                    : "bg-white text-ink"
                  }`}
                >
                  <h4 className="mb-3 text-[18px] font-semibold tracking-[-0.01em]">{c.title}</h4>
                  <p className={`text-[14.5px] leading-[1.55] ${c.dark ? "text-white/[0.66]" : "text-gray-2"}`}>
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}