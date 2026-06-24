import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Get Started Free — ArchiFlask for Design Firms",
  description: "Start running your firm on a system. Book a demo and we set up a free project the same day — drawings, tasks and effort in one place. Free plan, no end date.",
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
    <main style={{ position: "relative", zIndex: 2 }}>
      <section style={{ padding: "200px 40px 120px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#86868b" }}>
            Get Started
          </div>
          <h1 style={{ margin: "18px 0 0", fontSize: 64, lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Start running your firm
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(120deg,#9a9aa0,#1d1d1f 70%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              on a system.
            </span>
          </h1>
          <p style={{ margin: "26px auto 0", maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: "#6e6e73" }}>
            Sign-up is opening soon. In the meantime, book a demo and we&apos;ll set your firm up with a free project the same day.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }} className="af-cta-row">
            <Button href="/book-demo" variant="dark">Book a Demo</Button>
            <Button href="/" variant="light">Back to Home</Button>
          </div>
        </div>

        <div
          className="af-grid-3"
          style={{ maxWidth: 960, margin: "80px auto 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{ padding: "30px 26px", borderRadius: 20, background: "#f5f5f7", border: "1px solid rgba(0,0,0,.06)" }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#86868b" }}>STEP {s.n}</div>
              <div style={{ margin: "12px 0 0", fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>{s.title}</div>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.5, color: "#6e6e73" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
