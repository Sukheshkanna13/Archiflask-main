import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  radius?: number;
  rounded?: "rect" | "rounded" | "circle" | "pill";
  style?: React.CSSProperties;
};

export function ImageSlot({ src, alt, className, radius = 0, rounded = "rect", style }: Props) {
  const br = rounded === "circle" || rounded === "pill" ? 9999 : radius;
  const wrap: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: br,
    overflow: "hidden",
    ...style,
  };
  if (src) {
    return (
      <div className={className} style={wrap}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width:760px) 100vw, 50vw" />
      </div>
    );
  }
  return (
    <div
      className={className}
      aria-label={alt}
      role="img"
      style={{
        ...wrap,
        background: "#f5f5f7",
        border: "1px dashed rgba(0,0,0,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-.01em", color: "#c2c2c9" }}>AF</span>
    </div>
  );
}
