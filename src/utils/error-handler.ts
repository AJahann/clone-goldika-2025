import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    let message =
      error.response?.data?.message ?? error.message ?? defaultMessage;
    if (Array.isArray(message)) {
      message = message.join("\n");
    }
    return message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
