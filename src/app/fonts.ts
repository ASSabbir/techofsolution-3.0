import { Bricolage_Grotesque, Manrope } from "next/font/google";

// ─────────────────────────────────────────────────────────────────────────
// TYPE SYSTEM — change your typefaces here and they propagate everywhere
// via the CSS variables consumed in globals.css (--font-display / --font-sans).
// ─────────────────────────────────────────────────────────────────────────

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
