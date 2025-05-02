import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message ?? defaultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
