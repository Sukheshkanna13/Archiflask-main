"use client";
import { useMemo, useState } from "react";
import { DEMO_EXPECT, DEMO_SLOTS, buildDemoCalendar } from "@/lib/content";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const cardCls =
  "rounded-[24px] border border-black/[0.07] bg-white p-[34px] shadow-[0_20px_50px_rgba(0,0,0,.06)]";
const inputCls =
  "w-full rounded-[12px] border border-black/[0.12] bg-[#fafafa] px-[15px] py-[13px] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ink/50";
const pillBase =
  "rounded-[11px] border text-[13.5px] font-semibold transition focus-visible:ring-2 focus-visible:ring-ink/50";

export default function BookDemoPage() {
  const cal = useMemo(() => buildDemoCalendar(), []);
  const [submitted, setSubmitted] = useState(false);
  const [who, setWho] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !email) return;
    setBusy(true);
    setError(null);
    const payload = {
      name,
      email,
      firm: String(fd.get("firm") || ""),
      phone: String(fd.get("phone") || ""),
      company_website: String(fd.get("company_website") || ""), // honeypot
      day: day || "",
      slot: slot || "",
    };

    const res = await fetch("/api/book-demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    setBusy(false);

    // Only confirm if the server actually accepted the booking — the old code
    // showed "You're booked" even on a 404/500, silently losing leads.
    if (!res || !res.ok) {
      const msg = await res?.json().then((d) => d?.error).catch(() => null);
      setError(
        msg ||
          "We couldn't reach our booking service. Please try again, or email hello@archiflask.com.",
      );
      return;
    }

    setWho(name.split(" ")[0]);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const dayPill = (active: boolean, disabled: boolean) =>
    disabled
      ? "border-black/[0.08] bg-transparent text-[#d2d2d7]"
      : active
        ? "border-transparent bg-[image:var(--grad-dark)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"
        : "border-black/10 bg-transparent text-ink";

  const slotPill = (active: boolean) =>
    active
      ? "border-transparent bg-[image:var(--grad-dark)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"
      : "border-black/10 bg-transparent text-ink";

  return (
    <main className="relative z-[2] min-h-screen bg-[radial-gradient(120%_70%_at_50%_0%,#f5f5f7,#fff_60%)] px-6 pt-[150px] pb-[100px]">
      <div className="mx-auto max-w-[1080px]">
        {!submitted ? (
          <>
            <div className="mb-14 text-center">
              <div className="inline-block text-[13px] font-bold uppercase tracking-[0.12em] text-gray-2">
                Book a Demo
              </div>
              <h1 className="mt-3.5 text-[clamp(40px,7vw,62px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                Book a 20-minute demo.
              </h1>
              <p className="mx-auto mt-[18px] max-w-[560px] text-[20px] leading-[1.5] text-gray">
                We walk you through ArchiFlask on your kind of projects — design,
                construction or PMC — then you can start free, with no end date.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-[0.85fr_1.15fr]">
              {/* What to expect */}
              <div className={cardCls}>
                <h3 className="mb-[18px] text-[21px] font-semibold tracking-[-0.01em]">
                  What to expect
                </h3>
                <div className="flex flex-col gap-4">
                  {DEMO_EXPECT.map((x) => (
                    <div key={x.n} className="flex gap-3">
                      <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[image:var(--grad-dark)] text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
                        {x.n}
                      </span>
                      <div>
                        <div className="text-[15.5px] font-semibold">{x.title}</div>
                        <div className="text-[14.5px] leading-[1.5] text-gray-2">
                          {x.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-black/[0.08] pt-5 text-[14px] leading-[1.5] text-gray">
                  After you submit, our team reaches out within a day by call or
                  WhatsApp.
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className={cardCls} noValidate>
                <h3 className="mb-1.5 text-[21px] font-semibold tracking-[-0.01em]">
                  Pick a time
                </h3>
                <p className="mb-[18px] text-[14px] text-gray-2">
                  {cal.monthLabel} · IST
                </p>

                <div
                  className="grid grid-cols-7 gap-2"
                  role="group"
                  aria-label="Choose a demo date"
                >
                  {WEEKDAYS.map((w, i) => (
                    <div
                      key={i}
                      aria-hidden="true"
                      className="pb-1 text-center text-[11px] font-bold text-gray-3"
                    >
                      {w}
                    </div>
                  ))}
                  {Array.from({ length: cal.leadingBlanks }).map((_, i) => (
                    <div key={`b${i}`} />
                  ))}
                  {cal.days.map((d) => {
                    const disabled = !d.selValue;
                    const active = !!d.selValue && day === d.selValue;
                    return (
                      <button
                        key={d.num}
                        type="button"
                        disabled={disabled}
                        aria-pressed={active}
                        aria-label={`${cal.monthLabel} ${d.num}${
                          disabled ? " (unavailable)" : ""
                        }`}
                        onClick={() => d.selValue && setDay(d.selValue)}
                        className={`${pillBase} px-0 py-[11px] text-[14px] font-medium ${
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        } ${dayPill(active, disabled)}`}
                      >
                        {d.num}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 text-[13px] font-bold uppercase tracking-[0.04em] text-gray-2">
                  Time slot
                </div>
                <div
                  className="mt-2.5 grid grid-cols-4 gap-2"
                  role="group"
                  aria-label="Choose a time slot"
                >
                  {DEMO_SLOTS.map((s) => {
                    const active = slot === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        aria-pressed={active}
                        aria-label={s.value}
                        onClick={() => setSlot(s.value)}
                        className={`${pillBase} cursor-pointer px-0 py-2.5 ${slotPill(active)}`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-[22px] grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="contents">
                    <span className="sr-only">Your name</span>
                    <input name="name" placeholder="Your name" required aria-label="Your name" className={inputCls} />
                  </label>
                  <label className="contents">
                    <span className="sr-only">Firm name</span>
                    <input name="firm" placeholder="Firm name" aria-label="Firm name" className={inputCls} />
                  </label>
                  <label className="contents">
                    <span className="sr-only">Work email</span>
                    <input name="email" type="email" placeholder="Work email" required aria-label="Work email" className={inputCls} />
                  </label>
                  <label className="contents">
                    <span className="sr-only">Phone or WhatsApp</span>
                    <input name="phone" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" className={inputCls} />
                  </label>
                </div>

                {/* Honeypot — visually hidden, off-screen, not announced. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company website
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {error && (
                  <p role="alert" className="mt-3.5 text-[14px] font-medium text-[#c0392b]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-[18px] w-full cursor-pointer rounded-[14px] bg-[image:var(--grad-dark)] p-[15px] text-[16px] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,.22),inset_0_1px_0_rgba(255,255,255,.2)] transition disabled:cursor-default disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-ink/50"
                >
                  {busy ? "Confirming…" : "Confirm my demo"}
                </button>
                <p className="mt-3 text-center text-[12.5px] text-gray-3">
                  By booking you agree to be contacted about ArchiFlask.
                </p>
              </form>
            </div>
          </>
        ) : (
          <div className="mx-auto my-10 max-w-[560px] animate-[afRise_.6s_cubic-bezier(.16,1,.3,1)_both] rounded-[28px] border border-black/[0.07] bg-white px-10 py-12 text-center shadow-[0_30px_70px_rgba(0,0,0,.1)]">
            <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[image:var(--grad-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
              <span className="block h-[11px] w-5 -translate-y-[2px] rotate-[-45deg] border-b-[3px] border-l-[3px] border-white" />
            </div>
            <h2 className="mt-6 text-[38px] font-semibold tracking-[-0.025em]">
              You&apos;re booked{who ? `, ${who}` : ""}.
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[18px] leading-[1.55] text-gray">
              Our team will reach out within a day by call or WhatsApp to confirm
              your slot and set up your free workspace.
            </p>
            <a
              href="/"
              className="mt-[30px] inline-block cursor-pointer rounded-pill bg-surface px-7 py-3.5 text-[16px] font-medium text-ink"
            >
              ← Back to home
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
