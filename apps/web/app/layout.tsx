import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@repo/ui/utils"
import { Providers, ThemeProvider } from "../components/Providers";
import NextTopLoader from "nextjs-toploader";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aptitude Test",
  description: "Test your apti skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader color="#2E78C7" height={2} />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
