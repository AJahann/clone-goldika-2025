import type { NextRequest } from "next/server";

import { api } from "@/libs/axios-intance";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  if (
    accessToken &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken) {
    try {
      await api.get("/auth/verify");
      return NextResponse.next();
    } catch (_error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/sign-up"],
// };
