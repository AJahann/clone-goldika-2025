"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SignUpData {
  fullName: string;
  number: string;
  password: string;
}

interface UserData {
  id: string;
  phone: string;
  name: string;
}

const AuthService = {
  async signUp(signUpData: SignUpData) {
    await api.post("/auth/signup", {
      phone: signUpData.number,
      password: signUpData.password,
      name: signUpData.fullName,
    });
  },

  async login(credentials: { phone: string; password: string }) {
    const { data } = await api.post<{ user: UserData }>(
      "/auth/login",
      credentials,
      { withCredentials: true },
    );
    return data;
  },
};

export const useSignUp = () => {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (
      signUpData: Parameters<typeof AuthService.signUp>[0],
    ) => {
      await AuthService.signUp(signUpData);
      return AuthService.login({
        phone: signUpData.number,
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
    signUp: signUpMutation.mutate,
    isLoading: signUpMutation.isPending,
    isError: signUpMutation.isError,
    error: signUpMutation.error,
    isSuccess: signUpMutation.isSuccess,
  };
};
