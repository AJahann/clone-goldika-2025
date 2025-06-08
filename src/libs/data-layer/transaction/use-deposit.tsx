"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DepositRequest {
  amount: number;
  cardId: string;
}

export interface DepositResponse {
  success: boolean;
  amount: number;
  newBalance: number;
  trackingCode: string;
}

const processDeposit = async (
  depositData: DepositRequest,
): Promise<DepositResponse> => {
  try {
    const { data } = await api.post<DepositResponse>(
      "/wallet/deposit",
      depositData,
    );
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در انجام عملیات واریز"));
  }
};

export const useDeposit = () => {
  const queryClient = useQueryClient();

  const depositMutation = useMutation({
    mutationFn: processDeposit,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    deposit: depositMutation.mutate,
    depositAsync: depositMutation.mutateAsync,
    isDepositing: depositMutation.isPending,
    depositError: depositMutation.error,
    isDepositSuccess: depositMutation.isSuccess,
    depositData: depositMutation.data,
    resetDeposit: depositMutation.reset,
  };
};
