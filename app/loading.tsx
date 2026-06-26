export default function Loading() {
  return (
    <main
      className="relative z-[2] grid min-h-[70vh] place-items-center px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <span
        className="block h-9 w-9 animate-[afSpin_0.9s_linear_infinite] rounded-full border-2 border-node-dim border-t-ink"
        aria-hidden="true"
      />
    </main>
  );
}
