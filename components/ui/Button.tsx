import Link from "next/link";
import { GRAD_DARK, INSET_HI } from "@/lib/tokens";

type Variant = "dark" | "light" | "ghost" | "darkOnDark" | "white";
type Props = {
  variant?: Variant;
  href?: string;
  id?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const styleFor = (v: Variant): React.CSSProperties => {
  switch (v) {
    case "dark":
      return { color: "#fff", background: GRAD_DARK, boxShadow: `0 2px 10px rgba(0,0,0,.22), ${INSET_HI}` };
    case "light":
      return { color: "#1d1d1f", background: "#fff", border: "1px solid rgba(0,0,0,.12)" };
    case "ghost":
      return { color: "#1d1d1f", background: "#f5f5f7", border: "1px solid rgba(0,0,0,.14)" };
    case "darkOnDark":
      return { color: "#fff", background: "transparent", border: "1px solid rgba(255,255,255,.3)" };
    case "white":
      return { color: "#1d1d1f", background: "#fff", border: 0 };
  }
};

export function Button({ variant = "dark", href, id, onClick, type = "button", className, style, children }: Props) {
  const base: React.CSSProperties = {
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    padding: "14px 30px",
    borderRadius: 980,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: 0,
    ...styleFor(variant),
    ...style,
  };
  const isInternal = href && href.startsWith("/");
  if (isInternal) {
    return (
      <Link id={id} href={href} style={base} className={className}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a id={id} href={href} style={base} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button id={id} type={type} onClick={onClick} style={base} className={className}>
      {children}
    </button>
  );
}
