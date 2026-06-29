import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ABOUT_STORY_IMAGE } from "@/lib/images";

export function Origin() {
  return (
    <section className="bg-white px-5 py-[72px] md:px-6 md:py-[104px]">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 md:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <Reveal y={28}>
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">Our story</div>
          <h2 className="mb-[22px] mt-3.5 text-[clamp(32px,4.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.028em]">
            A friendship that goes back to childhood.
          </h2>
          <p className="mb-[18px] text-[18px] leading-[1.6] text-ink-2">
            One of us built software; the other designed and delivered residential villas. After collaborating on several projects, including our own homes and family developments, we ran straight into the same wall over and over: managing communication, approvals, site updates, documents, and coordination.
          </p>
          <p className="mb-[18px] text-[18px] leading-[1.6] text-ink-2">
            The turning point was realising these frustrations weren&apos;t ours alone. They were everywhere in architecture and construction. So we set out to solve them with technology.
          </p>
          <p className="text-[18px] font-medium leading-[1.6] text-ink">
            That conviction became ArchiFlask, a platform built to bring clarity, collaboration, and control to every project.
          </p>
        </Reveal>
        <Reveal
          y={28}
          duration={1}
          delay={0.1}
          className="group overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_24px_60px_rgba(0,0,0,.08)]"
        >
          <ImageSlot src={ABOUT_STORY_IMAGE} alt="Founders / studio / early project photo" className="h-[440px]" />
        </Reveal>
      </div>
    </section>
  );
}
