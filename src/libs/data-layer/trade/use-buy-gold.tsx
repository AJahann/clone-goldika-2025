"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface BuyGoldRequest {
  amount: number;
}

export interface BuyGoldResponse {
  success: boolean;
  transactionId: string;
  grams: number;
  amount: number;
  totalCost: number;
  fee: number;
  newBalance: {
    gold: number;
    cash: number;
  };
}

const buyGold = async (buyData: BuyGoldRequest): Promise<BuyGoldResponse> => {
  try {
    const { data } = await api.post<BuyGoldResponse>("/trade/buy", buyData);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در انجام عملیات خرید"));
  }
};

export const useBuyGold = () => {
  const queryClient = useQueryClient();

  const buyMutation = useMutation({
    mutationFn: buyGold,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    buyGold: buyMutation.mutate,
    buyGoldAsync: buyMutation.mutateAsync,
    isBuying: buyMutation.isPending,
    buyError: buyMutation.error,
    isBuySuccess: buyMutation.isSuccess,
    buyData: buyMutation.data,
    resetBuy: buyMutation.reset,
  };
};
