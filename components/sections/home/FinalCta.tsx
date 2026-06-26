import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="bg-white px-5 py-[72px] text-center md:px-6 md:pb-[200px] md:pt-[130px]">
      <div className="mx-auto max-w-[760px]">
        <Reveal y={30}>
          <h2 className="text-[clamp(40px,6.5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            See it on your own projects.
          </h2>
        </Reveal>
        <Reveal delay={0.1} y={24} className="mx-auto mt-[22px] max-w-[520px] text-[20px] leading-[1.5] text-gray">
          Book a 20-minute demo, our team walks you through it, then you can get started free.
        </Reveal>
        <Reveal delay={0.18} y={24} className="mt-[34px] flex flex-wrap justify-center gap-3.5">
          <div className="relative inline-flex">
            <span className="pointer-events-none absolute -inset-3.5 rounded-pill border-[1.5px] border-dashed border-black/[0.18]" />
            <Button id="af-demo-end" href="/book-demo" variant="dark" className="relative px-[34px] py-[15px] text-[17px]">
              Book a Demo
            </Button>
          </div>
          <Button href="/book-demo" variant="light" className="px-8 py-[15px] text-[17px]">
            Get Started
          </Button>
        </Reveal>
        <div className="mt-[38px] flex flex-col items-center gap-[7px] opacity-55">
          <span className="h-[9px] w-[9px] rounded-full bg-ink" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-3">End of the line</span>
        </div>
      </div>
    </section>
  );
}
