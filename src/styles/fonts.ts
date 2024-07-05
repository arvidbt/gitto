import {
  Bricolage_Grotesque as FontBricolage,
  Inter as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontBricolage = FontBricolage({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-bricolage",
});
