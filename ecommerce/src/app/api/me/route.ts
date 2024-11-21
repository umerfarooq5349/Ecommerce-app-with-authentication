import { sendResponce } from "@/utils/api response/sendResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("authjs.session-token");
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
