"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/book-demo";

export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 18);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      id="af-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,.08)" : "rgba(0,0,0,0)"}`,
        background: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        transition: "background .35s ease, backdrop-filter .35s ease, border-color .35s ease",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span style={{ position: "relative", display: "inline-block", width: 26, height: 26 }}>
          <span style={{ position: "absolute", left: 0, top: 2, width: 18, height: 18, borderRadius: 6, border: "2px solid #1d1d1f" }} />
          <span style={{ position: "absolute", left: 7, top: 7, width: 18, height: 18, borderRadius: 6, background: GRAD_DARK, boxShadow: "inset 0 1px 0 rgba(255,255,255,.22)" }} />
        </span>
        <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>ArchiFlask</span>
      </Link>
      <div className="af-nav-links" style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 14.5, fontWeight: 500 }}>
        {NAV_LINKS.map((l) => {
          const on = path === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className="af-navlink"
              style={{
                padding: "8px 14px",
                borderRadius: 980,
                color: on ? "#1d1d1f" : "#6e6e73",
                background: on ? "#f5f5f7" : "transparent",
                fontWeight: on ? 600 : 500,
                transition: "color .2s ease, background .2s ease",
              }}
            >
              {l.label}
            </Link>
          );
        })}
        <Link
          href="/book-demo"
          className="af-nav-demo"
          style={{ marginLeft: 6, padding: "8px 16px", borderRadius: 980, color: "#1d1d1f", border: "1px solid rgba(0,0,0,.14)", background: "#fff" }}
        >
          Book a Demo
        </Link>
        <a
          href={SIGNUP_URL}
          className="af-nav-cta"
          style={{ marginLeft: 4, padding: "9px 20px", borderRadius: 980, color: "#fff", fontWeight: 500, background: GRAD_DARK, boxShadow: `0 1px 2px rgba(0,0,0,.28), ${INSET_HI}` }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
