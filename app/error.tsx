"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for monitoring; replace with your error reporter when wired.
    console.error(error);
  }, [error]);

  return (
    <main className="relative z-[2] grid min-h-[70vh] place-items-center px-6 py-[120px] text-center">
      <div className="max-w-[520px]">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-gray-2">
          Something broke
        </p>
        <h1 className="mt-3.5 text-[clamp(40px,7vw,62px)] font-semibold leading-[1.05] tracking-[-0.03em]">
          That page hit a snag.
        </h1>
        <p className="mx-auto mt-4 max-w-[420px] text-[18px] leading-[1.55] text-gray">
          A part of the page failed to load. You can try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-pill bg-[image:var(--grad-dark)] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,.22),inset_0_1px_0_rgba(255,255,255,.2)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="cursor-pointer rounded-pill bg-surface px-7 py-3.5 text-[16px] font-medium text-ink"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
