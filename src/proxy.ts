import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/unlock") {
    return NextResponse.next();
  }

  // Password lock temporarily disabled while content updates are in progress.
  // const secret = getSitePassword();
  // if (!secret) {
  //   const redirectUrl = new URL("/unlock", request.url);
  //   return NextResponse.redirect(redirectUrl);
  // }

  // const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  // const isAuthenticated = await verifyAccessToken(token, secret);
  // if (isAuthenticated) {
  //   return NextResponse.next();
  // }

  // const redirectUrl = new URL("/unlock", request.url);
  // return NextResponse.redirect(redirectUrl);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|unlock|.*\\..*).*)",
  ],
};
