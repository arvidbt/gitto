import { type Metadata } from "next";

export const siteConfig = {
  title: "Gitto",
  description: "Share your private repositories by link, not by invite.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["Git", "Share", "Github"],
} satisfies Metadata;
