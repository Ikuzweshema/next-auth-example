import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { DEFAULT_REDIRECT_URL, authRoutes, apiPrefix } from "@/routes";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const isLoggedIn = !!session?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, request.url));
    }
    return NextResponse.next();
  }
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
