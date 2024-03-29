import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Providers from "@/providers";
import StyledComponentsRegistry from "@/lib/registry";
import getCurrentUser from "@/actions/getCurrentUser";

import Nav from "@/app/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mypost but github",
  description: "A mini social media inspired by Github + Twitter",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <Providers>
            <Nav currentUser={currentUser} />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
