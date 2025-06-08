"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface BankCard {
  id: string;
  cardName: string;
  last4: string;
}

export interface AddCardRequest {
  cardNumber: string;
  cardName: string;
}

const addNewCard = async (cardData: AddCardRequest): Promise<BankCard> => {
  try {
    const { data } = await api.post<BankCard>("/account/cards", cardData);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در ثبت کارت جدید"));
  }
};

export const useBankCards = () => {
  const queryClient = useQueryClient();

  const addCardMutation = useMutation({
    mutationFn: addNewCard,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    addCard: addCardMutation.mutate,
    isAddingCard: addCardMutation.isPending,
    addCardError: addCardMutation.error,
    isAddCardSuccess: addCardMutation.isSuccess,
  };
};
