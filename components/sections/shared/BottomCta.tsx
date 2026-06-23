import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

export function BottomCta({ heading }: { heading: string }) {
  return (
    <section style={{ padding: "120px 24px 200px", background: "#fff", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal y={30}>
          <h2 style={{ margin: 0, fontSize: 56, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.03em" }}>{heading}</h2>
        </Reveal>
        <Reveal delay={0.12} y={24} style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button id="af-demo-end" href="/book-demo" variant="dark" style={{ fontSize: 17, padding: "15px 34px", boxShadow: "0 2px 12px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.22)" }}>
            Book a Demo
          </Button>
          <Button href={SIGNUP_URL} variant="light" style={{ fontSize: 17, padding: "15px 32px" }}>
            Get Started
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
