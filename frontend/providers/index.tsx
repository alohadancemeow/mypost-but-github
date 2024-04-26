"use client";

import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "./ModalProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: Infinity,
  //   },
  // },
});

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="bottom-left" />
      <ModalProvider />
    </QueryClientProvider>
  );
};

export default Providers;
