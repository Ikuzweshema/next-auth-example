import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import {
  DEFAULT_REDIRECT_URL,
  authRoutes,
  apiPrefix,
  publicRoutes,
} from "@/routes";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const isLoggedIn = !!session?.user;
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthRoute && !isPublicRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher:"/dashboard/:path",
};
