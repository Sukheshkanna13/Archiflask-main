export function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`text-[13px] font-bold uppercase tracking-[0.14em] ${
        light ? "text-white/50" : "text-gray-2"
      }`}
    >
      {children}
    </div>
  );
}
