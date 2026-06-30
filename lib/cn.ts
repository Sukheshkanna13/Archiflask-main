import { twMerge } from "tailwind-merge";

// Join class strings and let later Tailwind utilities win over earlier ones,
// so callers can override a component's defaults via `className`.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return twMerge(parts.filter(Boolean).join(" "));
}
