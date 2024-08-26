import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import { fontSans, fontBricolage } from "@/styles/fonts";
import { Toaster } from "@/components/ui/sonner";
export const metadata = { ...siteConfig };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "boxes min-h-screen font-sans text-github-white antialiased",
          fontSans.variable,
          fontBricolage.variable,
        )}
      >
        <TRPCReactProvider>
          {/* <Header /> */}
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
