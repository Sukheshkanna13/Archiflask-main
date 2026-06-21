import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/book-demo";

export function BlogCta() {
  return (
    <section style={{ padding: "30px 24px 200px", background: "#fff", textAlign: "center" }}>
      <Reveal y={30} style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ padding: "56px 40px", borderRadius: 28, background: "linear-gradient(160deg,#2c2c2e,#1c1c1e)", color: "#fff", boxShadow: "0 30px 70px rgba(0,0,0,.2)" }}>
          <h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em" }}>
            Less reading about systems. More running on one.
          </h2>
          <p style={{ margin: "18px auto 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,.7)" }}>
            Book a 20-minute demo and see ArchiFlask on your own projects.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button id="af-demo-end" href="/book-demo" variant="white" style={{ fontSize: 16, fontWeight: 600, padding: "14px 32px" }}>
              Book a Demo
            </Button>
            <Button href={SIGNUP_URL} variant="darkOnDark" style={{ fontSize: 16, padding: "14px 30px" }}>
              Get Started
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
