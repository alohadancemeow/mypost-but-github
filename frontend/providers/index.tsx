"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@primer/react";
import deepmerge from "deepmerge";
import { BaseStyles } from "@primer/react";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./ModalProvider";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// # Custom theme
const theme = {
  colors: {
    canvas: {
      default: "#fff",
      primary: "#22272E",
      secondary: "#444C56",
      bg: "#373e47",
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

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: Infinity,
  //   },
  // },
})

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <BaseStyles>
          {children}
          <Toaster />
          <ModalProvider />
        </BaseStyles>
      </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
