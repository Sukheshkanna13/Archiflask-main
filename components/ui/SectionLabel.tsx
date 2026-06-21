export function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,.5)" : "#86868b",
      }}
    >
      {children}
    </div>
  );
}
