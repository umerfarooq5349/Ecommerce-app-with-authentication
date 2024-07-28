import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(request: NextRequest) {
  const BearerToken = request.headers.get("authorization") as string;

  if (!BearerToken) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Bearer token not defined",
      }),
      { status: 401 }
    );
  }

  const token = BearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "token not defined",
      }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};

// export { default } from "next-auth/middleware";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
//   pages: {
//     signIn: "/auth/signin",
//     signOut: "/auth/signout",
//     error: "/auth/error",
//     verifyRequest: "/auth/verify-request",
//   },
//   providers: [
//     {
//       id: "google",
//       name: "Google",
//       type: "oauth",
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   ],
//   matcher: ["/AddProduct"],
// };
