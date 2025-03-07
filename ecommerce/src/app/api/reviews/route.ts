import { sendResponce } from "@/utils/api response/sendResponse";
import axios, { AxiosError } from "axios";

import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const itemId = req.nextUrl.searchParams.get("itemId");
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    // const item = 0;
    // console.log("im in");

    // console.log(req);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/client/reviews?itemId=${itemId}`,
      { headers: { Authorization: `Bearer ${token?._id}` } }
      // withCredentials: true,
    );
    // console.log(response.data.data);

    return sendResponce(true, "Here are the reviews", 200, response.data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error.response?.data);
      return sendResponce(
        false,
        "No reviews yet",
        400,
        undefined,
        error.response?.data
      );
    }
    return sendResponce(false, "No reviews yet", 400, undefined, {
      error,
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const itemId = req.nextUrl.searchParams.get("itemId");
    const { comment, itemId, rating } = await req.json();
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    // const item = 0;
    // console.log("im in");
    // console.log(token);

    const userId = token!._id;
    if (!userId || token?.role === "admin") {
      console.log(token?.role);

      return sendResponce(false, "Admin can not add a review", 403);
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/api/client/reviews`,
      { comment, itemId, userId, rating },
      { headers: { Authorization: `Bearer ${token?._id}` } }
      // withCredentials: true,
    );
    // console.log(response.data.data);

    return sendResponce(true, "Review posted", 200, response.data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return sendResponce(
        false,
        "Unable to post review",
        400,
        undefined,
        error.response?.data
      );
    }
    return sendResponce(false, "Unable to post review", 400, undefined, {
      error,
    });
  }
}
