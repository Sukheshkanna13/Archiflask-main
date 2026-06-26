"use client";
import { motion } from "motion/react";
import { LOGOS } from "@/lib/content";
import { useCalm } from "@/lib/useReducedMotion";

const MASK = "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)";

export function Marquee() {
  const calm = useCalm();
  const items = [...LOGOS, ...LOGOS];
  return (
    <div
      role="img"
      aria-label={`Firms running on ArchiFlask: ${LOGOS.join(", ")}`}
      className="overflow-hidden rounded-[18px] border border-black/[0.08] [-webkit-mask-image:var(--marquee-mask)] [mask-image:var(--marquee-mask)]"
      style={{ ["--marquee-mask" as string]: MASK }}
    >
      <motion.div
        aria-hidden="true"
        className="flex w-max"
        animate={calm ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {items.map((l, i) => (
          <div
            key={i}
            className="flex-none px-14 py-[30px] text-[18px] font-bold text-gray-4"
          >
            {l}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
