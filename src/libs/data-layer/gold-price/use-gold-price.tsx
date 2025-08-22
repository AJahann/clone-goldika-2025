"use client";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export interface GoldPrice {
  buyPrice: number;
  sellPrice: number;
}

export const goldPrice = queryOptions<GoldPrice>({
  queryKey: ["goldPrice"],
  queryFn: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL!}/gold-price/latest`,
    );

    return response.json();
  },
});

export const useGoldPrice = () => {
  const query = useSuspenseQuery(goldPrice);

  return {
    goldPrice: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
