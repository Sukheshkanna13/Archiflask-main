import Link from "next/link";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

const linkCls = "cursor-pointer text-white/75 transition-colors hover:text-white";
const colTitleCls = "text-[12px] font-bold uppercase tracking-[0.1em] text-white/40";

export function Footer() {
  return (
    <footer className="relative z-[2] bg-black px-6 pb-12 pt-16 text-white">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-[11px] mb-4">
            <img
              src="/wallzehn-logo-new.png"
              alt="Wallzehn Logo"
              className="h-30 w-auto object-contain rounded-md"
            />
          </div>
          <p className="mt-4 max-w-[300px] text-[14.5px] leading-[1.5] text-white/55">
            The operating platform for design, construction, and PMC firms. Pan-India.
          </p>
          <div className="mt-6 flex items-center gap-4.5 text-white/50">
            <a
              href="https://www.instagram.com/archiflask?igsh=MzYxYjNzZmg1eHFu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/17ik94cmM1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/archiflask/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@WALLZEHNSOCIAL/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="YouTube"
            >
              <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
              </svg>
            </a>
          </div>
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
