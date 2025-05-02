"use server";

import { cookies } from "next/headers";

const getToken = async () => {
  const token = (await cookies()).get("access_token")?.value;

  if (token) {
    return token;
  }
};

export default getToken;
