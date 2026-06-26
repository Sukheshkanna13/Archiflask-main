import { Reveal } from "@/components/motion/Reveal";
import { PROBLEMS } from "@/lib/content";

function Icon({ kind }: { kind: "doc" | "rupee" | "ops" }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[image:var(--grad-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
      {kind === "doc" && <span className="h-[14px] w-[18px] rounded-[3px] border-2 border-white" />}
      {kind === "rupee" && <span className="text-[20px] font-bold text-white">₹</span>}
      {kind === "ops" && <span className="h-4 w-4 rounded-full border-2 border-white" />}
    </div>
  );
}

export function Problem() {
  return (
    <section className="bg-white px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1040px]">
        <Reveal y={30} className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[clamp(32px,5.2vw,52px)] font-semibold leading-[1.1] tracking-[-0.025em] text-balance">
            Most firms don&apos;t have a problem with talent.
            <br />
            <span className="text-gray-2">They have a problem with system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={24} className="mx-auto mt-6 max-w-[640px] text-center text-[19px] leading-[1.55] text-gray">
          As a firm grows, the cracks always show up in the same three places — documentation, profitability, and operations. ArchiFlask closes all three, so you can take on more projects without losing control of any of them.
        </Reveal>
        <div className="mt-[60px] grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} y={30} delay={i * 0.1} className="rounded-[22px] bg-surface p-[30px]">
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
