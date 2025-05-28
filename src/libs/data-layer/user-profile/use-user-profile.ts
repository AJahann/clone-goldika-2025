"use client";

import { api } from "@/libs/axios-intance";
import getToken from "@/libs/get-token";
import { getErrorMessage } from "@/utils/error-handler";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  wallet: {
    goldAmount: number;
    cashBalance: number;
  };
  cards: {
    id: string;
    cardNumber: string;
    cardName: string;
  }[];
  basket: {
    id: string;
    name: string;
    price: number;
  }[];
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const { data } = await api.get<UserProfile>("/auth/me");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در دریافت اطلاعات کاربر"));
  }
};

export const useUserProfile = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = await getToken();
      setHasToken(!!token);
    }

    void checkToken();
  }, []);

  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: hasToken,
    retry: 3,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
