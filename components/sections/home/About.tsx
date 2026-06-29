import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { STATS, ORBIT_NODES } from "@/lib/content";

export function About() {
  return (
    <section id="af-about" className="animate-on-scroll border-t border-black/[0.06] bg-white px-5 py-[72px] md:px-10 md:py-[110px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[14px] font-semibold text-gray-2">02, About ArchiFlask</div>
            <h2 className="mt-3.5 text-[clamp(32px,6vw,60px)] font-semibold leading-[1.0] tracking-[-0.03em]">
              We give firms control.
            </h2>
          </div>
          <Button href="/book-demo" variant="ghost" className="px-[22px] py-3 text-[15px]">
            Become a Client <span className="text-[17px]">→</span>
          </Button>
        </Reveal>
        <div className="mt-[22px] h-px bg-black/10" />

        <div className="mt-[52px] grid grid-cols-1 items-start gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal className="m-0 max-w-[560px] text-[26px] font-medium leading-[1.35] tracking-[-0.01em]">
              <span className="text-ink">A solid system</span>{" "}
              <span className="text-gray-3">
                aligned with how design and construction firms actually work is what lets a practice scale, without losing
                control of a single project.
              </span>
            </Reveal>

            <Reveal delay={0.08} className="mb-4 mt-10 text-[13px] font-bold tracking-[0.06em] text-gray-2">
              SOME NUMBERS ABOUT US
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS.map((s, i) => (
                <Reveal key={i} y={28} duration={0.8} delay={i * 0.07}>
                  <StatCard stat={s} index={i} delay={0} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* orbit diagram */}
          <Reveal duration={1}>
            <div className="relative mx-auto aspect-square w-full max-w-[480px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_32%,#fafafa,#ececef_70%)] shadow-[inset_0_0_60px_rgba(0,0,0,.04)]" />
              <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_40%_34%,#ffffff,#e4e4e9)] shadow-[0_30px_60px_rgba(0,0,0,.06)]" />
              <div className="absolute inset-[6%] animate-[afSpin_60s_linear_infinite] rounded-full border border-dashed border-black/[0.12]" />
              <div className="absolute inset-[30%] animate-[afSpinR_45s_linear_infinite] rounded-full border border-dashed border-black/10" />
              {ORBIT_NODES.map((n) => (
                <div key={n.label} className="absolute flex items-center gap-2" style={{ left: n.left, top: n.top }}>
                  {n.labelFirst && <span className="text-[14px] font-semibold">{n.label}</span>}
                  <span className="h-[11px] w-[11px] rounded-full bg-ink shadow-[0_0_0_5px_rgba(29,29,31,.10)]" />
                  {!n.labelFirst && <span className="text-[14px] font-semibold">{n.label}</span>}
                </div>
              ))}
              <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-[13px] font-bold tracking-[0.04em] text-gray-2">ONE SYSTEM</div>
                <div className="text-[22px] font-semibold tracking-[-0.02em]">ArchiFlask</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal y={20} className="mt-[72px]">
          <Marquee />
        </Reveal>
      </div>
    </section>
  );
}