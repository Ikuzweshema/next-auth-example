import {NextResponse } from "next/server";
import { auth } from "@/app/auth";

export default auth((request) => {
  const session = request.auth;
  const { nextUrl } = request;
  const isLoggedIn = !!session?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");
  if (isOnDashboard && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.searchParams) {
      callbackUrl += nextUrl.searchParams;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  if (isOnAuthRoute && isLoggedIn) {
    const callbackUrl = nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/dashboard", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
