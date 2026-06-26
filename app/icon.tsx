import { ImageResponse } from "next/og";

// Generated favicon + brand mark. Also referenced as the Organization logo in
// JSON-LD (served at /icon). 256px so it doubles as a structured-data logo
// (Google wants >=112px) while browsers downscale it for the tab.
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#48484a,#1c1c1e)",
          borderRadius: 56,
          color: "#fff",
          fontSize: 150,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
