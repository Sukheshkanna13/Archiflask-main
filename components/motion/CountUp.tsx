"use client";
import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/lib/useReducedMotion";

export function CountUp({
  to,
  suffix = "",
  className,
  style,
}: {
  to: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const calm = useCalm();
  useEffect(() => {
    if (calm) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const start = performance.now();
          const dur = 1200;
          const step = (now: number) => {
            let p = Math.min(1, (now - start) / dur);
            p = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * p));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, calm]);
  return (
    <div ref={ref} className={className} style={style}>
      {val}
      {suffix}
    </div>
  );
}
