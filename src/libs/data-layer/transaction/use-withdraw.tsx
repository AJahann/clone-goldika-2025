"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface WithdrawRequest {
  amount: number;
  cardId: string;
}

export interface WithdrawResponse {
  success: boolean;
  amount: number;
  newBalance: number;
  trackingCode: string;
  fee?: number;
}

const processWithdraw = async (
  withdrawData: WithdrawRequest,
): Promise<WithdrawResponse> => {
  try {
    const { data } = await api.post<WithdrawResponse>(
      "/wallet/withdraw",
      withdrawData,
    );
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در انجام عملیات برداشت"));
  }
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: processWithdraw,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    withdraw: withdrawMutation.mutate,
    withdrawAsync: withdrawMutation.mutateAsync,
    isWithdrawing: withdrawMutation.isPending,
    withdrawError: withdrawMutation.error,
    isWithdrawSuccess: withdrawMutation.isSuccess,
    withdrawData: withdrawMutation.data,
    resetWithdraw: withdrawMutation.reset,
  };
};
