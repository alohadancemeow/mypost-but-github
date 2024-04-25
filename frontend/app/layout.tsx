import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/providers";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mypost but github",
  description: "A mini social media inspired by Github + Twitter",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "relative")}>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
