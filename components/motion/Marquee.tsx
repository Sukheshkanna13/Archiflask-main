"use client";
import { motion } from "motion/react";
import { LOGOS } from "@/lib/content";
import { useCalm } from "@/lib/useReducedMotion";

export function Marquee() {
  const calm = useCalm();
  const items = [...LOGOS, ...LOGOS];
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,.08)",
        borderRadius: 18,
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
        maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
      }}
    >
      <motion.div
        style={{ display: "flex", width: "max-content" }}
        animate={calm ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {items.map((l, i) => (
          <div key={i} style={{ flex: "none", padding: "30px 56px", fontSize: 18, fontWeight: 700, color: "#c2c2c9" }}>
            {l}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
