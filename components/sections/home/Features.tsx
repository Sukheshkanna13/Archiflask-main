import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FEATURES_SPLIT, FEATURES_CARDS } from "@/lib/content";
import { FEATURE_IMAGES } from "@/lib/images";

function SplitText({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-[13px] font-bold uppercase tracking-[0.1em] text-gray-2">{eyebrow}</div>
      <h3 className="mb-3 mt-3.5 text-[clamp(26px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em]">{title}</h3>
      <p className="text-[18px] leading-[1.55] text-gray">{body}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-white px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={30}>
          <h2 className="max-w-[680px] text-[clamp(34px,5vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            Everything a project needs, from enquiry to handover.
          </h2>
        </Reveal>

        {FEATURES_SPLIT.map((f, i) => {
          const text = (
            <Reveal key="t" y={30}>
              <SplitText eyebrow={f.eyebrow} title={f.title} body={f.body} />
            </Reveal>
          );
          const image = (
            <Reveal
              key="i"
              y={30}
              delay={0.1}
              className="group overflow-hidden rounded-[22px] border border-black/[0.07] bg-white shadow-[0_24px_60px_rgba(0,0,0,.08)]"
            >
              <ImageSlot src={FEATURE_IMAGES[f.slotId]} alt={f.placeholder} className="h-[360px]" />
            </Reveal>
          );
          return (
            <div
              key={f.slotId}
              className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 ${i === 0 ? "mt-16" : "mt-12"}`}
            >
              {f.reverse ? (
                <>
                  {image}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {image}
                </>
              )}
            </div>
          );
        })}

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES_CARDS.map((c, i) => (
            <Reveal key={c.num} y={30} delay={i * 0.1} className="rounded-[22px] bg-surface p-7">
              <div className="text-[13px] font-bold uppercase tracking-[0.1em] text-gray-2">{c.num}</div>
              <h3 className="mb-2 mt-3 text-[21px] font-semibold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[15.5px] leading-[1.5] text-gray">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
