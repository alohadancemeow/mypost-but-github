"use client";

import React from "react";
import { ClientProvider } from "@/utils/trpcClient";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "@primer/react";
import { ThemeProvider } from "@primer/react";
import deepmerge from "deepmerge";
import { BaseStyles } from "@primer/react";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./ModalProvider";

// # Custom theme
const theme = {
  colors: {
    canvas: {
      default: "#fff",
      primary: "#22272E",
      secondary: "#444C56",
      bg: "#373E47",
      border: "#444C56",
      subtext: "#ADBAC7",
      hightlight: "#006EED",
    },
  },
};

const customTheme = deepmerge(theme, {
  fonts: {
    // mono: "MonoLisa, monospace",
    normal: "'Inter', sans-serif",
  },
});

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ClientProvider>
      <SessionProvider>
        <SSRProvider>
          <ThemeProvider theme={customTheme}>
            <BaseStyles>
              {children}
              <Toaster />
              <ModalProvider />
            </BaseStyles>
          </ThemeProvider>
        </SSRProvider>
      </SessionProvider>
    </ClientProvider>
  );
};

export default Providers;
