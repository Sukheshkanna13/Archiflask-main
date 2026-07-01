import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { BLOG_FEATURED } from "@/lib/content";
import { BLOG_IMAGES } from "@/lib/images";

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function Featured() {
  const f = BLOG_FEATURED;
  return (
    <section className="animate-on-scroll bg-white px-5 pb-10 pt-[60px] md:px-6" suppressHydrationWarning>
      <div className="mx-auto max-w-[1140px]">
        <Reveal y={30}>
          <Link
            href={`/blog/${slugify(f.title)}`}
            className="af-card group grid grid-cols-1 overflow-hidden rounded-[26px] border border-black/[0.08] bg-white shadow-[0_24px_60px_rgba(0,0,0,.07)] md:grid-cols-[1.05fr_0.95fr]"
          >
            <ImageSlot src={BLOG_IMAGES[f.slotId]} alt="Featured article cover" className="h-[280px] md:h-full" />
            <div className="flex flex-col justify-center px-11 py-12">
              <div className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-gray-2">{f.category}</div>
              <h2 className="mt-4 text-[clamp(28px,4vw,38px)] font-semibold leading-[1.1] tracking-[-0.025em]">{f.title}</h2>
              <p className="mt-[18px] text-[17px] leading-[1.6] text-gray">{f.body}</p>
              <div className="mt-6 flex items-center gap-3.5 text-[14px] text-gray-3">
                <span>{f.meta[0]}</span>
                <span className="h-1 w-1 rounded-full bg-gray-4" />
                <span>{f.meta[1]}</span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}