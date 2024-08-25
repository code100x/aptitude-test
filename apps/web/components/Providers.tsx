"use client";

import { RecoilRoot } from "recoil";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RecoilRoot>
        <div className="flex min-h-screen flex-col">
          <div className="mx-auto">{children}</div>
        </div>
      </RecoilRoot>
      <Toaster />
    </SessionProvider>
  );
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
