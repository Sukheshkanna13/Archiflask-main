"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { QUESTIONS } from "@/lib/content";
import { EASE_OUT, GRAD_PANEL, INSET_HI } from "@/lib/tokens";

export function CardDeck() {
  const [hovered, setHovered] = useState(-1);
  return (
    <div
      className="af-deck"
      onMouseLeave={() => setHovered(-1)}
      style={{ position: "relative", height: 330, maxWidth: 1000, margin: "30px auto 0" }}
    >
      {QUESTIONS.map((q, i) => {
        const rest = { x: (i - 2) * 132, y: Math.abs(i - 2) * 20, rotate: (i - 2) * 6, scale: 1 };
        const spread = {
          x: (i - 2) * 188,
          y: i === hovered ? -32 : 0,
          rotate: 0,
          scale: i === hovered ? 1.06 : 1,
        };
        const t = hovered < 0 ? rest : spread;
        const dark = i === QUESTIONS.length - 1;
        return (
          <motion.div
            key={i}
            className="af-card"
            onMouseEnter={() => setHovered(i)}
            animate={t}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            style={{
              position: "absolute",
              left: "50%",
              top: 46,
              marginLeft: -110,
              width: 220,
              height: 204,
              boxSizing: "border-box",
              zIndex: i === hovered ? 50 : hovered < 0 ? 10 - Math.abs(i - 2) : 10,
              cursor: "pointer",
              padding: 24,
              borderRadius: 20,
              background: dark ? GRAD_PANEL : "#fff",
              color: dark ? "#fff" : "#1d1d1f",
              boxShadow: dark ? `0 22px 50px rgba(0,0,0,.28), ${INSET_HI}` : "0 16px 40px rgba(0,0,0,.10)",
              border: dark ? "none" : "1px solid rgba(0,0,0,.05)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700 }}>{q.num}</div>
            <div style={{ marginTop: 14, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{q.title}</div>
            <div style={{ marginTop: 8, fontSize: 14, color: dark ? "rgba(255,255,255,.65)" : "#86868b" }}>{q.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
