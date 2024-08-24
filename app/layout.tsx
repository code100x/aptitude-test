import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { cn } from "@/lib/utils";
import { Providers } from "./Provider";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "100xQuiz",
  description: "Take quiz and prove your aptitude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-exo2 antialiased", exo2.variable)}>
        <Providers>
          <div className="md:px-20 px-4">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
