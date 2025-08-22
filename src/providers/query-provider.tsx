"use client";

import { goldPrice } from "@/libs/data-layer/gold-price/use-gold-price";
import { getQueryClient } from "@/libs/get-query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  const preQueryClient = getQueryClient();

  void preQueryClient.prefetchQuery(goldPrice);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
