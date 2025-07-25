"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const confirmOrder = async (): Promise<void> => {
  try {
    const { data } = await api.post("/orders");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در نهایی سازی سفارش"));
  }
};

export const useOrderConfirm = () => {
  const queryClient = useQueryClient();

  const confirmMutation = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    isLoading: confirmMutation.isPending,
    confirmError: confirmMutation.error,
    isConfirmSuccess: confirmMutation.isSuccess,
    confirmMutate: confirmMutation.mutate,
    resetConfirm: confirmMutation.reset,
  };
};
