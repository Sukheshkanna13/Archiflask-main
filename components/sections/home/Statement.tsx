import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";

const pill: React.CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  width: 96,
  height: 50,
  margin: "0 6px",
};

export function Statement() {
  return (
    <section style={{ padding: "120px 40px", background: "#f5f5f7" }}>
      <Reveal duration={1} y={30} style={{ maxWidth: 1020, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 56, lineHeight: 1.18, fontWeight: 600, letterSpacing: "-0.03em" }}>
          Numbers don&apos;t lie — so we track every
          <ImageSlot alt="hour" rounded="pill" style={pill} /> hour, every
          <ImageSlot alt="rupee" rounded="pill" style={pill} /> rupee, and every
          <ImageSlot alt="revision" rounded="pill" style={pill} /> revision — and turn them into{" "}
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
    </section>
  );
}
