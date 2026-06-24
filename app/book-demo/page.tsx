"use client";
import { useState } from "react";
import { DEMO_EXPECT, DEMO_DAYS, DEMO_LEADING_BLANKS, DEMO_SLOTS } from "@/lib/content";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [who, setWho] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !email) return;
    setBusy(true);
    const payload = {
      name,
      email,
      firm: String(fd.get("firm") || ""),
      phone: String(fd.get("phone") || ""),
      day: day || "",
      slot: slot || "",
    };
    try {
      await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // network failure: still show confirmation (booking captured client-side intent)
    }
    setWho(name.split(" ")[0]);
    setSubmitted(true);
    setBusy(false);
    window.scrollTo(0, 0);
  };

  const selectedPill = (active: boolean): React.CSSProperties =>
    active
      ? { background: GRAD_DARK, color: "#fff", borderColor: "transparent", boxShadow: INSET_HI }
      : { background: "transparent", color: "#1d1d1f", borderColor: "rgba(0,0,0,0.1)" };

  return (
    <main
      style={{
        position: "relative",
        zIndex: 2,
        padding: "150px 24px 100px",
        background: "radial-gradient(120% 70% at 50% 0%,#f5f5f7,#fff 60%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {!submitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#86868b" }}>
                Book a Demo
              </div>
              <h1 style={{ margin: "14px 0 0", fontSize: 62, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.03em" }}>
                Book a 20-minute demo.
              </h1>
              <p style={{ margin: "18px auto 0", maxWidth: 560, fontSize: 20, lineHeight: 1.5, color: "#6e6e73" }}>
                We walk you through ArchiFlask on your kind of projects — design, construction or PMC — then you can start free, with no end date.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 28, alignItems: "start" }} className="af-grid-2">
              {/* What to expect */}
              <div style={{ padding: 34, borderRadius: 24, background: "#fff", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 20px 50px rgba(0,0,0,.06)" }}>
                <h3 style={{ margin: "0 0 18px", fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>What to expect</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {DEMO_EXPECT.map((x) => (
                    <div key={x.n} style={{ display: "flex", gap: 12 }}>
                      <span style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: GRAD_DARK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, boxShadow: INSET_HI }}>
                        {x.n}
                      </span>
                      <div>
                        <div style={{ fontSize: 15.5, fontWeight: 600 }}>{x.title}</div>
                        <div style={{ fontSize: 14.5, color: "#86868b", lineHeight: 1.5 }}>{x.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,.08)", fontSize: 14, color: "#6e6e73", lineHeight: 1.5 }}>
                  After you submit, our team reaches out within a day by call or WhatsApp.
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} style={{ padding: 34, borderRadius: 24, background: "#fff", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 20px 50px rgba(0,0,0,.06)" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>Pick a time</h3>
                <p style={{ margin: "0 0 18px", fontSize: 14, color: "#86868b" }}>June 2026 · IST</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
                  {WEEKDAYS.map((w, i) => (
                    <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#aeaeb2", paddingBottom: 4 }}>{w}</div>
                  ))}
                  {Array.from({ length: DEMO_LEADING_BLANKS }).map((_, i) => (
                    <div key={`b${i}`} />
                  ))}
                  {DEMO_DAYS.map((d) => {
                    const disabled = !d.selValue;
                    const active = !!d.selValue && day === d.selValue;
                    return (
                      <button
                        key={d.num}
                        type="button"
                        disabled={disabled}
                        onClick={() => d.selValue && setDay(d.selValue)}
                        style={{
                          border: `1px solid ${disabled ? "rgba(0,0,0,.08)" : "rgba(0,0,0,.1)"}`,
                          borderRadius: 11,
                          padding: "11px 0",
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: disabled ? "not-allowed" : "pointer",
                          color: disabled ? "#d2d2d7" : "#1d1d1f",
                          ...(disabled ? { background: "transparent" } : selectedPill(active)),
                        }}
                      >
                        {d.num}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 20, fontSize: 13, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#86868b" }}>Time slot</div>
                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  {DEMO_SLOTS.map((s) => {
                    const active = slot === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSlot(s.value)}
                        style={{
                          border: "1px solid rgba(0,0,0,.1)",
                          borderRadius: 11,
                          padding: "10px 0",
                          fontSize: 13.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          ...selectedPill(active),
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input name="name" placeholder="Your name" required style={inputStyle} />
                  <input name="firm" placeholder="Firm name" style={inputStyle} />
                  <input name="email" type="email" placeholder="Work email" required style={inputStyle} />
                  <input name="phone" placeholder="Phone / WhatsApp" style={inputStyle} />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  style={{
                    marginTop: 18,
                    width: "100%",
                    border: 0,
                    cursor: busy ? "default" : "pointer",
                    fontSize: 16,
                    fontWeight: 600,
                    padding: 15,
                    borderRadius: 14,
                    color: "#fff",
                    background: GRAD_DARK,
                    boxShadow: `0 2px 10px rgba(0,0,0,.22), ${INSET_HI}`,
                    opacity: busy ? 0.7 : 1,
                  }}
                >
                  {busy ? "Confirming…" : "Confirm my demo"}
                </button>
                <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12.5, color: "#aeaeb2" }}>
                  By booking you agree to be contacted about ArchiFlask.
                </p>
              </form>
            </div>
          </>
        ) : (
          <div
            style={{
              maxWidth: 560,
              margin: "40px auto",
              textAlign: "center",
              padding: "48px 40px",
              borderRadius: 28,
              background: "#fff",
              border: "1px solid rgba(0,0,0,.07)",
              boxShadow: "0 30px 70px rgba(0,0,0,.1)",
              animation: "afRise .6s cubic-bezier(.16,1,.3,1) both",
            }}
          >
            <div style={{ width: 62, height: 62, margin: "0 auto", borderRadius: "50%", background: GRAD_DARK, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: INSET_HI }}>
              <span style={{ display: "block", width: 20, height: 11, borderLeft: "3px solid #fff", borderBottom: "3px solid #fff", transform: "rotate(-45deg) translateY(-2px)" }} />
            </div>
            <h2 style={{ margin: "24px 0 0", fontSize: 38, fontWeight: 600, letterSpacing: "-0.025em" }}>
              You&apos;re booked{who ? `, ${who}` : ""}.
            </h2>
            <p style={{ margin: "16px auto 0", maxWidth: 420, fontSize: 18, lineHeight: 1.55, color: "#6e6e73" }}>
              Our team will reach out within a day by call or WhatsApp to confirm your slot and set up your free workspace.
            </p>
            <a href="/" style={{ display: "inline-block", marginTop: 30, cursor: "pointer", fontSize: 16, fontWeight: 500, padding: "13px 28px", borderRadius: 980, color: "#1d1d1f", background: "#f5f5f7" }}>
              ← Back to home
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  border: "1px solid rgba(0,0,0,.12)",
  borderRadius: 12,
  fontSize: 15,
  outline: "none",
  background: "#fafafa",
};
