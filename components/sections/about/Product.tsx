import { Reveal } from "@/components/motion/Reveal";
import { ABOUT_PRODUCT } from "@/lib/content";

function Icon({ kind }: { kind: "circle" | "doc" | "rupee" }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[image:var(--grad-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
      {kind === "circle" && <span className="h-4 w-4 rounded-full border-2 border-white" />}
      {kind === "doc" && <span className="h-[14px] w-[18px] rounded-[3px] border-2 border-white" />}
      {kind === "rupee" && <span className="text-[20px] font-bold text-white">₹</span>}
    </div>
  );
}

export function Product() {
  return (
    <section className="bg-surface px-5 py-[72px] md:px-6 md:py-[114px]">
      <div className="mx-auto max-w-[1100px]">
        <Reveal y={28} className="mx-auto max-w-[760px] text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-2">The product</div>
          <h2 className="mt-3.5 text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.028em]">
            One platform for the whole firm.
          </h2>
          <p className="mt-[18px] text-[19px] leading-[1.55] text-gray">
            ArchiFlask is the architecture firm management software that brings projects, clients, teams, drawings, site activity, approvals and profitability into one place, ensuring a growing firm runs on a system instead of memory. It&apos;s the Standard Operating Procedure for design and construction practices.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ABOUT_PRODUCT.map((p, i) => (
            <Reveal key={p.title} y={30} delay={i * 0.1} className="rounded-[22px] border border-black/[0.05] bg-white p-8">
              <Icon kind={p.icon} />
              <h3 className="mb-2 mt-5 text-[22px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[16px] leading-[1.55] text-gray">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
