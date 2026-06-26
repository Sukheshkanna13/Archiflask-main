import { ImageResponse } from "next/og";

// Auto-detected by Next for both Open Graph and Twitter cards (replaces the
// missing /og/archiflask-og.png the audit flagged). Generated at build time.
export const alt = "ArchiFlask — the operating platform for design, construction & PMC firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(120% 80% at 50% 0%,#f5f5f7,#fff 60%)",
          color: "#1d1d1f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#48484a,#1c1c1e)",
              borderRadius: 16,
              color: "#fff",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            ArchiFlask
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 940,
          }}
        >
          Run your firm on a system.
          <span style={{ color: "#6e6e73" }}>Not on memory.</span>
        </div>
        <div style={{ fontSize: 26, color: "#6e6e73" }}>
          Projects · drawings · teams · site activity · approvals · profitability
        </div>
      </div>
    ),
    { ...size },
  );
}
