"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  phone: string;
  name: string;
}

const login = async (credentials: { phone: string; password: string }) => {
  const { data } = await api.post<{ user: UserData }>(
    "/auth/login",
    credentials,
    { withCredentials: true },
  );
  return data;
};

export const useLogin = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (signUpData: Parameters<typeof login>[0]) => {
      return login({
        phone: signUpData.phone,
        password: signUpData.password,
      });
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "خطا در ثبت‌نام");
      return errorMessage;
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};
