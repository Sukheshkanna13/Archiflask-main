import Link from "next/link";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

const linkStyle: React.CSSProperties = { cursor: "pointer", color: "rgba(255,255,255,.75)" };
const colTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.4)",
};

export function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 2, padding: "64px 24px 48px", background: "#000", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ position: "relative", display: "inline-block", width: 26, height: 26 }}>
              <span style={{ position: "absolute", left: 0, top: 2, width: 18, height: 18, borderRadius: 6, border: "2px solid #fff" }} />
              <span style={{ position: "absolute", left: 7, top: 7, width: 18, height: 18, borderRadius: 6, background: "linear-gradient(135deg,#8e8e93,#48484a)" }} />
            </span>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>ArchiFlask</span>
          </div>
          <p style={{ margin: "16px 0 0", maxWidth: 300, fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,.55)" }}>
            The operating platform for design, construction, and PMC firms. Pan-India.
          </p>
        </div>
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
            <span style={colTitle}>Company</span>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/about" style={linkStyle}>About</Link>
            <Link href="/impact" style={linkStyle}>Impact</Link>
            <Link href="/blog" style={linkStyle}>Blog</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
            <span style={colTitle}>Get started</span>
            <Link href="/book-demo" style={linkStyle}>Book a Demo</Link>
            <a href={SIGNUP_URL} style={linkStyle}>Get Started</a>
            <Link href="/#af-pricing" style={linkStyle}>Pricing</Link>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "48px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "rgba(255,255,255,.45)" }}>
        <span>© 2026 ArchiFlask. All rights reserved.</span>
        <span>A product of Wallzehn Technologies Pvt. Ltd.</span>
      </div>
    </footer>
  );
}
