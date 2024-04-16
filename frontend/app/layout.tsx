import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/providers";
import StyledComponentsRegistry from "@/lib/registry";

import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism } from "@clerk/themes";

import Nav from "@/components/Nav";

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
      baseTheme: neobrutalism,
    }}
    >
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
    </ClerkProvider>
  );
};

export default RootLayout;
