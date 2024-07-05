import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { siteConfig } from "@/config/siteConfig";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { fontSans, fontBricolage } from "@/styles/fonts";
import { Toaster } from "@/components/ui/toaster";

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
          "min-h-screen  bg-background font-sans antialiased",
          fontSans.variable,
          fontBricolage.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
