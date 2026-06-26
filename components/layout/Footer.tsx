import Link from "next/link";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

const linkCls = "cursor-pointer text-white/75 transition-colors hover:text-white";
const colTitleCls = "text-[12px] font-bold uppercase tracking-[0.1em] text-white/40";

export function Footer() {
  return (
    <footer className="relative z-[2] bg-black px-6 pb-12 pt-16 text-white">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-[11px]">
            <span aria-hidden="true" className="relative inline-block h-[26px] w-[26px]">
              <span className="absolute left-0 top-0.5 h-[18px] w-[18px] rounded-md border-2 border-white" />
              <span className="absolute left-[7px] top-[7px] h-[18px] w-[18px] rounded-md bg-[linear-gradient(135deg,#8e8e93,#48484a)]" />
            </span>
            <span className="text-[20px] font-semibold tracking-[-0.02em]">ArchiFlask</span>
          </div>
          <p className="mt-4 max-w-[300px] text-[14.5px] leading-[1.5] text-white/55">
            The operating platform for design, construction, and PMC firms. Pan-India.
          </p>
        </div>
        <div className="flex flex-wrap gap-16">
          <nav aria-label="Company" className="flex flex-col gap-[11px] text-[14.5px]">
            <span className={colTitleCls}>Company</span>
            <Link href="/" className={linkCls}>Home</Link>
            <Link href="/about" className={linkCls}>About</Link>
            <Link href="/impact" className={linkCls}>Impact</Link>
            <Link href="/blog" className={linkCls}>Blog</Link>
          </nav>
          <nav aria-label="Get started" className="flex flex-col gap-[11px] text-[14.5px]">
            <span className={colTitleCls}>Get started</span>
            <Link href="/book-demo" className={linkCls}>Book a Demo</Link>
            <a href={SIGNUP_URL} className={linkCls}>Get Started</a>
            <Link href="/#af-pricing" className={linkCls}>Pricing</Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1100px] flex-wrap justify-between gap-3 border-t border-white/[0.12] pt-6 text-[13px] text-white/45">
        <span>© 2026 ArchiFlask. All rights reserved.</span>
        <span>A product of Wallzehn Technologies Pvt. Ltd.</span>
      </div>
    </footer>
  );
}
