"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return <NextThemesProvider {...props}> {children}</NextThemesProvider>;
}
