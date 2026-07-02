import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { BLOG_POSTS } from "@/lib/content";
import { BLOG_IMAGES } from "@/lib/images";

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function Grid() {
  return (
    <section className="animate-on-scroll bg-white px-5 pb-[72px] pt-[30px] md:px-6 md:pb-[120px]">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.slotId} y={30} duration={0.8} delay={(i % 3) * 0.07} className="flex">
            <Link
              href={`/blog/${slugify(p.title)}`}
              className="af-card group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-black/[0.07] bg-white"
            >
              <ImageSlot src={BLOG_IMAGES[p.slotId]} alt={`${p.category} cover`} className="h-[200px]" />
              <div className="flex flex-1 flex-col px-6 pb-7 pt-[26px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-gray-2">{p.category}</div>
                <h3 className="mt-3 text-[21px] font-semibold leading-[1.25] tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-gray">{p.body}</p>
                <div className="mt-5 text-[13px] text-gray-3">{p.read}</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}