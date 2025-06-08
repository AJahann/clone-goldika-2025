"use client";

import { api } from "@/libs/axios-intance";
import { getErrorMessage } from "@/utils/error-handler";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  imgData: string;
  imgMimeType: string;
  wages: string;
  brand: string;
  type: string;
  gram: number;
  createdAt: Date;
  updatedAt: Date;
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "خطا در دریافت لیست محصولات"));
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 5 * 60 * 10000,
  });
};
