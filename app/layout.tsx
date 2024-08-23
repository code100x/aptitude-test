import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { cn } from "@/lib/utils";
import { Providers } from "./Provider";

const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });

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
      <body
        className={cn(
          "min-h-screen font-exo2 antialiased bg-[#bdb2ff] text-[#0d3b66] md:px-20 px-4",
          exo2.variable
        )}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
