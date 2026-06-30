import { Reveal } from "@/components/motion/Reveal";
import { PROBLEMS } from "@/lib/content";

function Icon({ kind }: { kind: "doc" | "rupee" | "ops" | "collab" | "client" | "site" }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[image:var(--grad-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
      {kind === "doc" && <span className="h-[14px] w-[18px] rounded-[3px] border-2 border-white" />}
      {kind === "rupee" && <span className="text-[20px] font-bold text-white">₹</span>}
      {kind === "ops" && <span className="h-4 w-4 rounded-full border-2 border-white" />}
      {kind === "collab" && (
        <div className="relative h-4 w-4">
          <span className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-white/20" />
          <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-white/20" />
        </div>
      )}
      {kind === "client" && (
        <div className="flex flex-col items-center">
          <span className="h-[12px] w-[18px] rounded-[2px] border-2 border-white" />
          <span className="h-[2px] w-[10px] bg-white mt-[1px]" />
        </div>
      )}
      {kind === "site" && (
        <div className="relative flex flex-col items-center justify-center">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white mt-0.5" />
        </div>
      )}
    </div>
  );
}

export function Problem() {
  return (
    <section className="animate-on-scroll bg-white px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1040px]">
        <Reveal y={30} className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[clamp(32px,5.2vw,52px)] font-semibold leading-[1.1] tracking-[-0.025em] text-balance">
            Most firms don&apos;t have a problem with talent.
            <br />
            <span className="text-gray-2">They have a problem with system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={24} className="mx-auto mt-6 max-w-[640px] text-center text-[19px] leading-[1.55] text-gray">
          As a firm grows, the cracks show up across key areas: documentation, profitability, operations, collaboration, client portal, and site visits. ArchiFlask closes them all, so you can scale without losing control.
        </Reveal>
        <div className="mt-[60px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const shadowType = i % 3 === 0 ? "green" : i % 3 === 1 ? "purple" : "black";
            let hoverClass = "";
            if (shadowType === "green") {
              hoverClass = "hover:shadow-[0_20px_40px_rgba(181,255,0,0.22)] hover:border-[#b5ff00]/40";
            } else if (shadowType === "purple") {
              hoverClass = "hover:shadow-[0_20px_40px_rgba(190,3,253,0.18)] hover:border-[#be03fd]/30";
            } else {
              hoverClass = "hover:shadow-[0_20px_40px_rgba(29,29,31,0.08)] hover:border-black/15";
            }

            return (
              <Reveal key={p.title} y={30} delay={i * 0.1} className="h-full">
                <div className={`h-full rounded-[22px] bg-surface p-[30px] border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-700 ease-out hover:-translate-y-1.5 ${hoverClass}`}>
                  <Icon kind={p.icon} />
                  <h3 className="mb-2 mt-5 text-[22px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                  <p className="text-[16px] leading-[1.55] text-gray">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}