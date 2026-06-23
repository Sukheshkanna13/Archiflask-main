import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CLIENT_APP_IMAGE } from "@/lib/images";

export function ForClients() {
  return (
    <section style={{ padding: "120px 24px", background: "linear-gradient(180deg,#1c1c1e,#000)", color: "#fff", overflow: "hidden", position: "relative" }}>
      <div
        data-parallax="0.04"
        style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(120,120,128,.22),transparent 65%)", pointerEvents: "none" }}
      />
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="af-grid-2">
        <Reveal y={30}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>For your clients</div>
          <h2 style={{ margin: "16px 0 16px", fontSize: 46, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em" }}>
            Your clients stop chasing.
            <br />
            You stop reporting.
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>
            ArchiFlask gives your client their own window into the project, progress, updates, and deliverables, on web and mobile. No more endless mail chains or &quot;any update?&quot; messages. Transparency becomes a feature you sell, not a chore you manage.
          </p>
        </Reveal>
        <Reveal y={30} delay={0.12} style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 240, borderRadius: 34, background: "#0a0a0a", border: "1px solid rgba(255,255,255,.12)", padding: 10, boxShadow: "0 40px 90px rgba(0,0,0,.5)" }}>
            <div style={{ borderRadius: 26, overflow: "hidden", background: "#f5f5f7" }}>
              <ImageSlot src={CLIENT_APP_IMAGE} alt="Client mobile app screen" style={{ height: 420 }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
