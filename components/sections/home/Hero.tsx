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
    <section ref={secRef} id="af-hero" className="relative h-auto bg-transparent md:h-[215vh]">
      <div id="af-hero-pin" className="relative overflow-hidden md:sticky md:top-0 md:h-screen">
        {/* blueprint grid backdrop (right) */}
        <div
          data-parallax="0.05"
          className="af-blueprint-grid pointer-events-none absolute right-0 top-0 z-0 h-full w-full md:w-[64%]"
        />

        {/* live 3D skeletal structure (right) */}
        <div
          id="af-skel"
          className="pointer-events-none absolute right-0 top-[30px] z-[1] h-[calc(100%-30px)] w-full opacity-[0.24] md:w-[58%] md:opacity-100"
        >
          <HeroSkeleton progressRef={progressRef} />
        </div>

        {/* floating caption pinned bottom-right — hidden for now, may reuse later */}
        {/* <div className="absolute bottom-[120px] right-10 z-[2] hidden items-center gap-[11px] rounded-2xl border border-black/[0.07] bg-white/[0.66] px-4 py-[11px] shadow-[0_12px_34px_rgba(0,0,0,.07)] [backdrop-filter:saturate(180%)_blur(14px)] md:flex">
          <span className="relative h-[9px] w-[9px] flex-none">
            <span className="absolute inset-0 rounded-full bg-ink" />
            <span className="absolute inset-0 animate-[afPing_2s_ease-out_infinite] rounded-full bg-ink" />
          </span>
          <div>
            <div className="text-[12.5px] font-bold tracking-[-0.01em]">One firm, fully modelled</div>
            <div className="text-[11px] text-gray-2">drawings · effort · site · clients · profit</div>
          </div>
        </div> */}

        {/* headline */}
        <div className="relative z-[2] mx-auto flex h-auto max-w-[1240px] items-start px-5 pt-[138px] md:h-full md:items-start md:px-10 md:pt-[144px]">
          <div className="max-w-[660px]">
            <div className="animate-[afRise_.7s_cubic-bezier(.16,1,.3,1)_both] text-[13px] font-bold uppercase tracking-[0.16em] text-gray-2">
              Architecture · Construction · Software
            </div>
            <h1 className="mt-[18px] animate-[afRise_.8s_cubic-bezier(.16,1,.3,1)_.06s_both] text-[clamp(42px,9vw,72px)] font-semibold leading-[1.0] tracking-[-0.038em]">
              Run your firm
              <br />
              on a system.
              <br />
              <span className="af-gradient-text">Not on memory.</span>
            </h1>
            <p className="mt-7 max-w-[520px] animate-[afRise_.8s_cubic-bezier(.16,1,.3,1)_.14s_both] text-[20px] leading-[1.5] text-gray">
              ArchiFlask is the architecture project management software that brings projects, drawings, teams, site activity, approvals and profitability into one platform, allowing design, construction and PMC firms to run on a system instead of memory.
            </p>
            <div className="mt-[34px] flex animate-[afRise_.8s_cubic-bezier(.16,1,.3,1)_.22s_both] flex-wrap items-center gap-3.5">
              <Button href="/book-demo" variant="dark">Book a Demo</Button>
              <Button href="/get-started" variant="light">Get Started</Button>
            </div>
          </div>
        </div>

        {/* scroll hint — flows under the CTAs on mobile, pinned to viewport bottom on desktop */}
        <div className="relative z-[2] mx-auto mt-8 mb-11 flex w-fit flex-col items-center gap-[7px] md:absolute md:bottom-[30px] md:left-1/2 md:mx-0 md:mb-0 md:mt-0 md:-translate-x-1/2">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-3">Scroll to explore</span>
          <span className="h-[22px] w-[22px] rotate-45 animate-[afHint_1.8s_ease-in-out_infinite] border-b-2 border-r-2 border-gray-4" />
        </div>
      </div>
    </section>
  );
}
