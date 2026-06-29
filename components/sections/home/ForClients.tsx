import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CLIENT_APP_IMAGE } from "@/lib/images";

export function ForClients() {
  return (
    <section className="animate-on-scroll relative overflow-hidden bg-[linear-gradient(180deg,#1c1c1e,#000)] px-5 py-[72px] text-white md:px-6 md:py-[120px]">
      <div
        data-parallax="0.04"
        className="pointer-events-none absolute -right-20 -top-[120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(120,120,128,.22),transparent_65%)]"
      />
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-14 md:grid-cols-2">
        <Reveal y={30}>
          <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-white/50">For your clients</div>
          <h2 className="my-4 text-[clamp(32px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            Your clients stop chasing.
            <br />
            You stop reporting.
          </h2>
          <p className="text-[18px] leading-[1.6] text-white/70">
            ArchiFlask gives every client their own window into the project. They can track progress, updates, and deliverables on web and mobile. It&apos;s the client management app that ends endless mail chains and &quot;any update?&quot; messages. Transparency becomes a feature you sell, not a chore you manage.
          </p>
        </Reveal>
        <Reveal y={30} delay={0.12} className="flex justify-center">
          <div className="w-[240px] rounded-[34px] border border-white/[0.12] bg-[#0a0a0a] p-2.5 shadow-[0_40px_90px_rgba(0,0,0,.5)]">
            <div className="group overflow-hidden rounded-[26px] bg-surface">
              <ImageSlot src={CLIENT_APP_IMAGE} alt="ArchiFlask client app showing project progress on mobile" className="h-[420px]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}