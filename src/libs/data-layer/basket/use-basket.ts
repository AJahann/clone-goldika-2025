"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface BasketItem {
  id: string;
  name: string;
  wages: string;
  gram: number;
  count: number;
}

const addToBasket = async (productId: string): Promise<BasketItem> => {
  try {
    const { data } = await api.post<BasketItem>("/basket/add", { productId });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در افزودن به سبد خرید"));
  }
};

const removeFromBasket = async (productId: string): Promise<BasketItem> => {
  try {
    const { data } = await api.delete<BasketItem>(
      `/basket/remove/${productId}`,
    );
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در حذف از سبد خرید"));
  }
};

const clearBasket = async (): Promise<void> => {
  try {
    await api.delete("/basket/clear");
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در پاک کردن سبد خرید"));
  }
};

export const useBasket = () => {
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: addToBasket,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: removeFromBasket,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  const clearBasketMutation = useMutation({
    mutationFn: clearBasket,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    // Add item functions
    addItem: addItemMutation.mutate,
    addItemAsync: addItemMutation.mutateAsync,
    isAddItemSuccess: addItemMutation.isSuccess,
    addItemError: addItemMutation.error,
    isAddingItem: addItemMutation.isPending,

    // Remove item functions
    removeItem: removeItemMutation.mutate,
    removeItemAsync: removeItemMutation.mutateAsync,
    isRemoveItemSuccess: removeItemMutation.isSuccess,
    removeItemError: removeItemMutation.error,
    isRemovingItem: removeItemMutation.isPending,

    // Clear basket functions
    clearBasket: clearBasketMutation.mutate,
    clearBasketAsync: clearBasketMutation.mutateAsync,
    isClearBasketSuccess: clearBasketMutation.isSuccess,
    clearBasketError: clearBasketMutation.error,
    isClearingBasket: clearBasketMutation.isPending,
  };
};
