import { CountUp } from "@/components/motion/CountUp";
import { MiniShape } from "@/components/three/MiniShape";
import type { Stat } from "@/lib/content";

const numberCls = "text-[52px] font-semibold tracking-[-0.03em]";

export function StatCard({ stat, index, delay }: { stat: Stat; index: number; delay: number }) {
  return (
    <div
      style={{ transitionDelay: `${delay}s` }}
      className={`relative min-h-[172px] overflow-hidden rounded-[20px] p-6 ${
        stat.dark
          ? "bg-[image:var(--grad-panel)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.1)]"
          : "bg-surface text-ink"
      }`}
    >
      {stat.to !== null ? (
        <CountUp to={stat.to} suffix={stat.suffix ?? ""} className={numberCls} />
      ) : (
        <div className={numberCls}>{stat.display}</div>
      )}
      <div
        className={`mt-1.5 max-w-[150px] text-[14px] leading-[1.4] ${
          stat.dark ? "text-white/65" : "text-gray-2"
        }`}
      >
        {stat.label}
      </div>
      <MiniShape
        shape={stat.shape}
        light={stat.dark}
        index={index}
        className="absolute bottom-2 right-2 h-24 w-24"
      />
    </div>
  );
}
