import { CountUp } from "@/components/motion/CountUp";
import { MiniShape } from "@/components/three/MiniShape";
import type { Stat } from "@/lib/content";

const numberCls = "text-[52px] font-semibold tracking-[-0.03em]";

export function StatCard({ stat, index, delay }: { stat: Stat; index: number; delay: number }) {
  // Neutral grey hover shadow for every card (dark cards get a subtle white one).
  const hoverClass = stat.dark
    ? "hover:shadow-[0_20px_40px_rgba(255,255,255,0.06)] hover:border-white/20"
    : "hover:shadow-[0_20px_40px_rgba(29,29,31,0.08)] hover:border-black/15";

  return (
    <div
      style={{ transitionDelay: `${delay}s` }}
      className={`relative min-h-[172px] h-full flex flex-col justify-between overflow-hidden rounded-[20px] p-8 border border-black/[0.04] transition-all duration-700 ease-out hover:-translate-y-1.5 ${hoverClass} ${
        stat.dark
          ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.1)]"
          : "bg-surface text-ink"
        }`}
    >
      <div>
        {stat.to !== null ? (
          <CountUp to={stat.to} suffix={stat.suffix ?? ""} className={numberCls} />
        ) : (
          <div className={numberCls}>{stat.display}</div>
        )}
        <div
          className={`mt-2.5 max-w-[175px] text-[14px] leading-[1.45] ${stat.dark ? "text-white/65" : "text-gray-2"
            }`}
        >
          {stat.label}
        </div>
      </div>
      <MiniShape
        shape={stat.shape}
        light={stat.dark}
        index={index}
        className="absolute bottom-4 right-4 h-24 w-24"
      />
    </div>
  );
}
