import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/providers";
import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mypost but github",
  description: "A mini social media inspired by Github + Twitter",
};

type Props = {
  children: React.ReactNode;
};

async function getCurrentYear() {
  'use cache'
  return new Date().getFullYear()
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "relative")} suppressHydrationWarning>
        <ClerkProvider
          appearance={{ baseTheme: dark }}
        >
          <Providers>
            <div className="max-w-4xl mx-auto">
              <Nav />
              {children}
              <Footer getCurrentYear={await getCurrentYear()} />
            </div>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
