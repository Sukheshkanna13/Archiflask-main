export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const GRAD_DARK = "linear-gradient(135deg,#48484a,#1c1c1e)";
export const GRAD_PANEL = "linear-gradient(135deg,#2c2c2e,#1c1c1e)";
export const GRAD_TEXT = "linear-gradient(120deg,#9a9aa0,#1d1d1f 65%)";
export const INSET_HI = "inset 0 1px 0 rgba(255,255,255,.2)";

// 3D color constants (match design JS hexes exactly)
export const C = {
  ink: 0x1d1d1f,
  line: 0x9a9aa0,
  nodeDim: 0xcfcfd4,
  barrel: 0x48484a,
  lead: 0x111113,
  litLight: 0xb8b8bf,
  nodeLight: 0xf2f2f4,
} as const;
