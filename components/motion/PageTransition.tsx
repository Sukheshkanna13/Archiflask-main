"use client";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// App Router note: we deliberately do NOT wrap children in
// `AnimatePresence mode="wait"`. Doing so keeps the exiting RSC subtree mounted
// until the exit animation finishes, which stalls the incoming route's
// streaming/hydration and can cause hydration mismatches. A keyed enter-only
// animation gives the same feel without fighting the framework.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    // Only reset scroll on an actual route (path) change — not hash jumps like
    // /#af-pricing, which should scroll to their anchor instead.
    if (prev.current !== pathname) {
      prev.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <motion.div
      id="main"
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
