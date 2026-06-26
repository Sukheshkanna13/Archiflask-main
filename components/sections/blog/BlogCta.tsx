import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

export function BlogCta() {
  return (
    <section className="bg-white px-5 pb-[120px] pt-[30px] text-center md:px-6 md:pb-[200px]">
      <Reveal y={30} className="mx-auto max-w-[820px]">
        <div className="rounded-[28px] bg-[linear-gradient(160deg,#2c2c2e,#1c1c1e)] px-10 py-14 text-white shadow-[0_30px_70px_rgba(0,0,0,.2)]">
          <h2 className="text-[clamp(30px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            Less reading about systems. More running on one.
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[18px] leading-[1.55] text-white/70">
            Book a 20-minute demo and see ArchiFlask on your own projects.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Button id="af-demo-end" href="/book-demo" variant="white" className="px-8 py-3.5 text-[16px] font-semibold">
              Book a Demo
            </Button>
            <Button href={SIGNUP_URL} variant="darkOnDark" className="px-[30px] py-3.5 text-[16px]">
              Get Started
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
