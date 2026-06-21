"use client";
import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Reveal({ children, delay = 0, y = 28, duration = 0.9, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const calm = useCalm();
  useEffect(() => {
    if (calm) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(.16,1,.3,1) ${delay}s, transform ${duration}s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
