"use client";
import { useEffect, useRef } from "react";
import { HeroSkeleton } from "@/components/three/HeroSkeleton";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const progressRef = useRef(0);
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const scrollable = Math.max(1, r.height - window.innerHeight);
      progressRef.current = Math.max(0, Math.min(1, -r.top / scrollable));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <section ref={secRef} id="af-hero" style={{ position: "relative", height: "215vh", background: "transparent" }}>
      <div id="af-hero-pin" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* blueprint grid backdrop (right) */}
        <div
          data-parallax="0.05"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "64%",
            height: "100%",
            zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.045) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            WebkitMaskImage: "radial-gradient(72% 70% at 72% 42%,#000,transparent)",
            maskImage: "radial-gradient(72% 70% at 72% 42%,#000,transparent)",
            pointerEvents: "none",
          }}
        />

        {/* live 3D skeletal structure (right) */}
        <div id="af-skel" style={{ position: "absolute", right: 0, top: 0, width: "58%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
          <HeroSkeleton progressRef={progressRef} />
        </div>

        {/* floating caption pinned bottom-right */}
        <div
          className="af-hero-caption"
          style={{
            position: "absolute",
            right: 40,
            bottom: 120,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: "11px 16px",
            borderRadius: 16,
            background: "rgba(255,255,255,.66)",
            backdropFilter: "saturate(180%) blur(14px)",
            WebkitBackdropFilter: "saturate(180%) blur(14px)",
            border: "1px solid rgba(0,0,0,.07)",
            boxShadow: "0 12px 34px rgba(0,0,0,.07)",
          }}
        >
          <span style={{ position: "relative", width: 9, height: 9, flex: "none" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#1d1d1f" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#1d1d1f", animation: "afPing 2s ease-out infinite" }} />
          </span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em" }}>One firm, fully modelled</div>
            <div style={{ fontSize: 11, color: "#86868b" }}>drawings · effort · site · clients · profit</div>
          </div>
        </div>

        {/* headline */}
        <div style={{ position: "relative", zIndex: 2, height: "100%", maxWidth: 1240, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 660 }}>
            <div style={{ animation: "afRise .7s cubic-bezier(.16,1,.3,1) both", fontSize: 13, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#86868b" }}>
              Architecture · Construction · Software
            </div>
            <h1 style={{ animation: "afRise .8s cubic-bezier(.16,1,.3,1) .06s both", margin: "18px 0 0", fontSize: 72, lineHeight: 1.0, fontWeight: 600, letterSpacing: "-0.038em" }}>
              Run your firm
              <br />
              on a system.
              <br />
              <span style={{ backgroundImage: "linear-gradient(120deg,#9a9aa0,#1d1d1f 65%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Not on memory.
              </span>
            </h1>
            <p style={{ animation: "afRise .8s cubic-bezier(.16,1,.3,1) .14s both", margin: "28px 0 0", maxWidth: 520, fontSize: 20, lineHeight: 1.5, color: "#6e6e73" }}>
              ArchiFlask is the operating platform for design, construction &amp; PMC firms — projects, drawings, teams, site activity, approvals and profitability, in one place.
            </p>
            <div style={{ animation: "afRise .8s cubic-bezier(.16,1,.3,1) .22s both", marginTop: 34, display: "flex", gap: 14, alignItems: "center" }}>
              <Button href="/book-demo" variant="dark">Book a Demo</Button>
              <Button href="/book-demo" variant="light">Get Started</Button>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#aeaeb2" }}>Scroll to explore</span>
          <span style={{ width: 22, height: 22, borderRight: "2px solid #c2c2c9", borderBottom: "2px solid #c2c2c9", transform: "rotate(45deg)", animation: "afHint 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
