import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@/lib/utils";
import { Providers, ThemeProvider } from "@/components/Providers";
import { inter, satoshi } from "@/styles/fonts";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "100xQuest",
  description: "Aptitude test to select 30individuals to be mentored by Harkirat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(satoshi.variable, inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>
            <NextTopLoader color="#e2d2" height={2} />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
