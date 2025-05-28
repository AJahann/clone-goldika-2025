"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useQuery } from "@tanstack/react-query";

export interface GoldPrice {
  buyPrice: number;
  sellPrice: number;
}

const fetchGoldPrice = async (): Promise<GoldPrice> => {
  try {
    const { data } = await api.get<GoldPrice>("/gold-price/latest");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در دریافت قیمت طلا"));
  }
};

export const useGoldPrice = () => {
  const query = useQuery({
    queryKey: ["goldPrice"],
    queryFn: fetchGoldPrice,
  });

  return {
    goldPrice: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
