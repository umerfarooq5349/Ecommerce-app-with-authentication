import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt");
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthurized",
      },
      {
        status: 401,
      }
    );
  }
  return NextResponse.json(
    {
      message: "Authurized",
      token: token!.value,
    },
    {
      status: 201,
    }
  );
}
