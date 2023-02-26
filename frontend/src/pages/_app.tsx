import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

// import "../styles/globals.css";
import '../styles/myStyle.css'

import { SSRProvider } from "@primer/react";
import { ThemeProvider } from "@primer/react";
import deepmerge from "deepmerge";
import { BaseStyles } from "@primer/react";
import { Toaster } from "react-hot-toast";

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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <ThemeProvider theme={customTheme}>
          <BaseStyles>
            <Component {...pageProps} />
            <Toaster />
          </BaseStyles>
        </ThemeProvider>
      </SSRProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default api.withTRPC(MyApp);
