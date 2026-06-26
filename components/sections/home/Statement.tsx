import { Reveal } from "@/components/motion/Reveal";

const TRACKED = [
  { unit: "Every hour", body: "Effort logged against the task it served." },
  { unit: "Every rupee", body: "Spend tied to the project it moved." },
  { unit: "Every revision", body: "Each drawing change, with the reason behind it." },
];

export function Statement() {
  return (
    <section className="bg-surface px-5 py-[72px] md:px-10 md:py-[120px]">
      <div className="mx-auto max-w-[1020px]">
        <Reveal duration={1} y={30} className="text-center">
          <h2 className="text-[clamp(32px,5.2vw,52px)] font-bold leading-[1.18] tracking-[-0.02em]">
            <span className="text-ink">Numbers don&apos;t lie.</span>{" "}
            <span className="text-gray-3">
              So we track every hour, every rupee and every revision, then turn them into{" "}
            </span>
            <span className="af-gradient-text">calculated growth.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TRACKED.map((t, i) => (
            <Reveal
              key={t.unit}
              y={24}
              delay={i * 0.08}
              className="rounded-[18px] border border-black/[0.06] bg-white px-6 py-[26px]"
            >
              <div className="text-[18px] font-bold tracking-[-0.01em]">{t.unit}</div>
              <p className="mt-2 text-[15px] leading-[1.5] text-gray">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
