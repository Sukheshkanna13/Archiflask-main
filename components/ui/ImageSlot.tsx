import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  rounded?: "rect" | "rounded" | "circle" | "pill";
};

const ROUND: Record<NonNullable<Props["rounded"]>, string> = {
  rect: "",
  rounded: "rounded-[18px]",
  circle: "rounded-full",
  pill: "rounded-full",
};

export function ImageSlot({ src, alt, className, rounded = "rect" }: Props) {
  // Defaults fill the parent; callers override size/radius via `className`.
  const wrap = cn("relative h-full w-full overflow-hidden", ROUND[rounded], className);
  if (src) {
    return (
      <div className={wrap}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:760px) 100vw, 50vw" />
      </div>
    );
  }
  return (
    <div
      className={cn(wrap, "flex items-center justify-center border border-dashed border-black/[0.12] bg-surface")}
      aria-label={alt}
      role="img"
    >
      <span className="text-[13px] font-bold tracking-[-0.01em] text-gray-4">AF</span>
    </div>
  );
}
