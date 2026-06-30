import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "dark" | "light" | "ghost" | "darkOnDark" | "white";
type Props = {
  variant?: Variant;
  href?: string;
  id?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
};

const VARIANT: Record<Variant, string> = {
  dark: "text-white bg-[image:var(--grad-dark)] shadow-[0_2px_10px_rgba(0,0,0,.22),inset_0_1px_0_rgba(255,255,255,.2)] hover:opacity-90",
  light: "text-ink bg-white border border-black/[0.12] hover:bg-surface",
  ghost: "text-ink bg-surface border border-black/[0.14] hover:bg-[#ececef]",
  darkOnDark: "text-white bg-transparent border border-white/30 hover:bg-white/10",
  white: "text-ink bg-white hover:opacity-90",
};

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill px-[30px] py-3.5 text-[16px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50";

export function Button({
  variant = "dark",
  href,
  id,
  onClick,
  type = "button",
  className,
  children,
}: Props) {
  const cls = cn(BASE, VARIANT[variant], className);
  if (href && href.startsWith("/")) {
    return (
      <Link id={id} href={href} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a id={id} href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button id={id} type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
