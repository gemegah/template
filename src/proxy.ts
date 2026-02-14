import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ACCESS_COOKIE_NAME, getSitePassword, verifyAccessToken } from "@/lib/site-access";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/unlock") {
    return NextResponse.next();
  }

  const secret = getSitePassword();
  if (!secret) {
    const redirectUrl = new URL("/unlock", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAccessToken(token, secret);
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const redirectUrl = new URL("/unlock", request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|unlock|.*\\..*).*)",
  ],
};
