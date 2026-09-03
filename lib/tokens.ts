/**
 * SPEAR Design Tokens — TypeScript constants
 * Mirror of CSS custom properties in globals.css for use in JS (Framer Motion, GSAP, inline styles).
 */

export const colors = {
  // Accent
  brass: "#C79A45",
  brassLight: "#D4AE6A",
  brassDark: "#A07C30",
  wine: "#8B3A3A",
  wineLight: "#A84F4F",

  // Mode A — Espresso / Dark
  ink: "#1E1712",
  inkLighter: "#2C2118",
  inkCard: "#261E19",
  ivory: "#F3ECE0",
  ivoryMuted: "#B5A99A",
  ivoryDim: "#7A6F63",

  // Mode B — Parchment / Light
  parchment: "#F7F1E6",
  parchmentDark: "#EDE5D4",
  charcoal: "#221B16",
  charcoalMuted: "#5C4F44",
} as const;

export const fonts = {
  serif: "'Fraunces', Georgia, serif",
  sans: "'Manrope', system-ui, sans-serif",
} as const;

export const timing = {
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.45, 0, 0.55, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 260, damping: 20 },
} as const;
