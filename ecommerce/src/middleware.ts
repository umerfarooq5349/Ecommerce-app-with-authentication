import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is not authenticated and trying to access a protected route
  if (!token) {
    // Allow access to login and signup pages for unauthenticated users
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access protected routes
    if (url.pathname.startsWith("/AddProduct")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If the user is authenticated, redirect them away from login/signup pages
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/AddProduct"],
};
