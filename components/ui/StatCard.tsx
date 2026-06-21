import { CountUp } from "@/components/motion/CountUp";
import { MiniShape } from "@/components/three/MiniShape";
import { GRAD_PANEL } from "@/lib/tokens";
import type { Stat } from "@/lib/content";

export function StatCard({ stat, index, delay }: { stat: Stat; index: number; delay: number }) {
  const numberStyle: React.CSSProperties = { fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em" };
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: 24,
        borderRadius: 20,
        minHeight: 172,
        background: stat.dark ? GRAD_PANEL : "#f5f5f7",
        color: stat.dark ? "#fff" : "#1d1d1f",
        boxShadow: stat.dark ? "inset 0 1px 0 rgba(255,255,255,.1)" : undefined,
        transitionDelay: `${delay}s`,
      }}
    >
      {stat.to !== null ? (
        <CountUp to={stat.to} suffix={stat.suffix ?? ""} style={numberStyle} />
      ) : (
        <div style={numberStyle}>{stat.display}</div>
      )}
      <div
        style={{
          marginTop: 6,
          maxWidth: 150,
          fontSize: 14,
          lineHeight: 1.4,
          color: stat.dark ? "rgba(255,255,255,.65)" : "#86868b",
        }}
      >
        {stat.label}
      </div>
      <MiniShape
        shape={stat.shape}
        light={stat.dark}
        index={index}
        style={{ position: "absolute", right: 8, bottom: 8, width: 96, height: 96 }}
      />
    </div>
  );
}
