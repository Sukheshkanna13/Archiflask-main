import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Get Started Free | ArchiFlask for Design Firms",
  description: "Start running your firm on a system. Book a demo and we set up a free project the same day, with drawings, tasks and effort in one place. Free plan, no end date.",
  alternates: { canonical: "/get-started" },
  openGraph: { url: "https://www.archiflask.com/get-started" },
};

const STEPS = [
  { n: "1", title: "Create your firm", body: "Set up your workspace and invite your first teammate." },
  { n: "2", title: "Add a project", body: "Start with one live project. Drawings, tasks and effort, in one place." },
  { n: "3", title: "Bring your team on", body: "Web and mobile access for the office, the site and your clients." },
];

export default function GetStartedPage() {
  return (
    <main className="relative z-[2]">
      <section className="bg-white px-5 pb-[72px] pt-[140px] md:px-10 md:pb-[120px] md:pt-[200px]">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-2">
            Get Started
          </div>
          <h1 className="mt-[18px] text-[clamp(42px,8vw,64px)] font-bold leading-[1.04] tracking-[-0.03em]">
            Start running your firm
            <br />
            <span className="af-gradient-text">on a system.</span>
          </h1>
          <p className="mx-auto mt-[26px] max-w-[540px] text-[19px] leading-[1.55] text-gray">
            ArchiFlask is the free architecture project management tool that gets your first project live the same day. Sign-up is opening soon. In the meantime, book a demo and we&apos;ll set your firm up with a free project right away.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/book-demo" variant="dark">Book a Demo</Button>
            <Button href="/" variant="light">Back to Home</Button>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-[960px] grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[20px] border border-black/[0.06] bg-surface px-[26px] py-[30px]">
              <div className="text-[13px] font-bold text-gray-2">STEP {s.n}</div>
              <div className="mt-3 text-[19px] font-bold tracking-[-0.01em]">{s.title}</div>
              <p className="mt-2 text-[15px] leading-[1.5] text-gray">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
