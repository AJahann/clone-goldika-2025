"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface SellGoldRequest {
  grams: number;
}

export interface SellGoldResponse {
  success: boolean;
  transactionId: string;
  grams: number;
  unitPrice: number;
  totalAmount: number;
  fee: number;
  newBalance: {
    gold: number;
    cash: number;
  };
}

const sellGold = async (
  sellData: SellGoldRequest,
): Promise<SellGoldResponse> => {
  try {
    const { data } = await api.post<SellGoldResponse>("/trade/sell", sellData);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در انجام عملیات فروش"));
  }
};

export const useSellGold = () => {
  const queryClient = useQueryClient();

  const sellMutation = useMutation({
    mutationFn: sellGold,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    sellGold: sellMutation.mutate,
    sellGoldAsync: sellMutation.mutateAsync,
    isSelling: sellMutation.isPending,
    sellError: sellMutation.error,
    isSellSuccess: sellMutation.isSuccess,
    sellData: sellMutation.data,
    resetSell: sellMutation.reset,
  };
};
