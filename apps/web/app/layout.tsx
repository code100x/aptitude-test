import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "../components/Providers";

import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        > */}
        <NextTopLoader color="#2E78C7" height={2} />
        <Providers>{children}</Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
