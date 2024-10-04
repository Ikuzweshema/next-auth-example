import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { DEFAULT_REDIRECT_URL, authRoutes } from "@/routes";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const isLoggedIn = !!session?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
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
  if (isAuthRoute && isLoggedIn) {
    const callbackUrl = nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(
      new URL(callbackUrl || DEFAULT_REDIRECT_URL, nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
