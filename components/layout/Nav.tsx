"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/get-started";

export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 18);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [path]);

  const showChrome = scrolled || open;
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
        borderBottom: `1px solid ${showChrome ? "rgba(0,0,0,.08)" : "rgba(0,0,0,0)"}`,
        background: showChrome ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
        backdropFilter: showChrome ? "saturate(180%) blur(20px)" : "none",
        WebkitBackdropFilter: showChrome ? "saturate(180%) blur(20px)" : "none",
        transition: "background .35s ease, backdrop-filter .35s ease, border-color .35s ease",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span style={{ position: "relative", display: "inline-block", width: 26, height: 26 }}>
          <span style={{ position: "absolute", left: 0, top: 2, width: 18, height: 18, borderRadius: 6, border: "2px solid #1d1d1f" }} />
          <span style={{ position: "absolute", left: 7, top: 7, width: 18, height: 18, borderRadius: 6, background: GRAD_DARK, boxShadow: "inset 0 1px 0 rgba(255,255,255,.22)" }} />
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>ArchiFlask</span>
      </Link>

      {/* desktop links */}
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
                fontWeight: on ? 700 : 500,
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
          style={{ marginLeft: 4, padding: "9px 20px", borderRadius: 980, color: "#fff", fontWeight: 600, background: GRAD_DARK, boxShadow: `0 1px 2px rgba(0,0,0,.28), ${INSET_HI}` }}
        >
          Get Started
        </a>
      </div>

      {/* mobile burger */}
      <button
        type="button"
        className="af-burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "none",
          width: 42,
          height: 42,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,.12)",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 18,
            height: 2,
            borderRadius: 2,
            background: "#1d1d1f",
            transition: "transform .25s ease",
            transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
          }}
        />
        <span
          style={{
            width: 18,
            height: 2,
            borderRadius: 2,
            background: "#1d1d1f",
            transition: "transform .25s ease",
            transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* mobile dropdown panel */}
      {open && (
        <div
          className="af-mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            padding: "10px 16px 18px",
            gap: 4,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "saturate(180%) blur(24px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            borderBottom: "1px solid rgba(0,0,0,.08)",
          }}
        >
          {NAV_LINKS.map((l) => {
            const on = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "13px 14px",
                  borderRadius: 14,
                  fontSize: 17,
                  fontWeight: on ? 700 : 500,
                  color: on ? "#1d1d1f" : "#3a3a3c",
                  background: on ? "#f5f5f7" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/book-demo"
            style={{ marginTop: 8, padding: "14px", borderRadius: 14, textAlign: "center", fontSize: 16, fontWeight: 600, color: "#1d1d1f", border: "1px solid rgba(0,0,0,.14)", background: "#fff" }}
          >
            Book a Demo
          </Link>
          <a
            href={SIGNUP_URL}
            style={{ marginTop: 4, padding: "14px", borderRadius: 14, textAlign: "center", fontSize: 16, fontWeight: 600, color: "#fff", background: GRAD_DARK, boxShadow: INSET_HI }}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
