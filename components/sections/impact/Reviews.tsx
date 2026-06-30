import { Reveal } from "@/components/motion/Reveal";
import { REVIEWS } from "@/lib/content";

export function Reviews() {
  return (
    <section className="animate-on-scroll bg-white px-5 py-[72px] md:px-6 md:py-[114px]">
      <div className="mx-auto max-w-[1140px]">
        <Reveal y={28} className="mx-auto max-w-[680px] text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">Reviews</div>
          <h2 className="mt-3.5 text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.028em]">
            What firm owners say.
          </h2>
        </Reveal>
        <div className="mt-[52px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={i}
              y={30}
              duration={0.8}
              delay={(i % 3) * 0.07}
              className={`af-card rounded-[22px] p-[30px] ${r.dark
                  ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.1)]"
                  : "border border-black/[0.05] bg-surface text-ink"
                }`}
            >
              <p className="text-[17.5px] font-medium leading-[1.55] tracking-[-0.01em]">&quot;{r.quote}&quot;</p>
              <div className={`mt-5 text-[14px] ${r.dark ? "text-white/60" : "text-gray-2"}`}>{r.who}</div>
            </Reveal>
          ))}
        </div>
        <Reveal y={18} delay={0.12} className="mt-6 text-center text-[13px] text-gray-3">
          Representative of feedback from firms using ArchiFlask. Named case studies coming soon.
        </Reveal>
      </div>
    </section>
  );
}