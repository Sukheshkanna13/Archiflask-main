import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

export function BottomCta({ heading }: { heading: string }) {
  return (
    <section className="bg-white px-5 py-[72px] text-center md:px-6 md:pb-[200px] md:pt-[120px]">
      <div className="mx-auto max-w-[720px]">
        <Reveal y={30}>
          <h2 className="text-[clamp(36px,5.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]">{heading}</h2>
        </Reveal>
        <Reveal delay={0.12} y={24} className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Button id="af-demo-end" href="/book-demo" variant="dark" className="px-[34px] py-[15px] text-[17px]">
            Book a Demo
          </Button>
          <Button href={SIGNUP_URL} variant="light" className="px-8 py-[15px] text-[17px]">
            Get Started
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
