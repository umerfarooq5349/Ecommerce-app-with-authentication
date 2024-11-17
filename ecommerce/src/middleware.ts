import { NextRequest, NextResponse } from "next/server";
// import { getsession } from "next-auth/jwt";
import { auth } from "./auth";
// import { alert } from "./utils/alerts/alert";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl;

  // If the user is not authenticated and trying to access a protected route
  if (!session) {
    console.log(session);
    // Allow access to login and signup pages for unauthenticated users
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.next();
    }

    if (url.pathname.startsWith("/addproduct")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Redirect unauthenticated users trying to access protected routes
    if (url.pathname.startsWith("/total-items")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If the user is authenticated, redirect them away from login/signup pages
    console.log("session");
    console.log(session);
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      url.pathname.startsWith("/addproduct") &&
      session.user.role != "admin"
    ) {
      console.log(`you are not authurize to access this page`);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/addproduct", "/total-items/:path*"],
};
