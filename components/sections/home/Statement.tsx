import { Reveal } from "@/components/motion/Reveal";

const TRACKED = [
  { unit: "Every hour", body: "Effort logged against the task it served." },
  { unit: "Every rupee", body: "Spend tied to the project it moved." },
  { unit: "Every revision", body: "Each drawing change, with the reason behind it." },
];

export function Statement() {
  return (
    <section style={{ padding: "120px 40px", background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <Reveal duration={1} y={30} style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 52, lineHeight: 1.18, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#1d1d1f" }}>Numbers don&apos;t lie.</span>{" "}
            <span style={{ color: "#aeaeb2" }}>
              So we track every hour, every rupee and every revision, then turn them into{" "}
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(120deg,#9a9aa0,#1d1d1f 70%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              calculated growth.
            </span>
          </h2>
        </Reveal>

        <div
          className="af-grid-3"
          style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
        >
          {TRACKED.map((t, i) => (
            <Reveal
              key={t.unit}
              y={24}
              delay={i * 0.08}
              style={{
                padding: "26px 24px",
                borderRadius: 18,
                background: "#fff",
                border: "1px solid rgba(0,0,0,.06)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{t.unit}</div>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.5, color: "#6e6e73" }}>{t.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
