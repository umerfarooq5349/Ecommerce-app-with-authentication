import { sendResponce } from "@/utils/api response/sendResponse";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    // Retrieve the token for authentication
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });

    if (!token?._id) {
      return sendResponce(false, "Authentication failed", 401, null);
    }

    const url = new URL(req.url);
    const itemId = url.pathname.split("/").pop();
    const deleteItem = req.nextUrl.searchParams.get("delete");
    if (!itemId) {
      return sendResponce(false, "Item ID is required", 400);
    }

    console.log("Deleting item:", itemId);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER}/api/client/cart/${itemId}?delete=${deleteItem}`,

      {
        headers: { Authorization: `Bearer ${token._id}` },
      }
    );
    return sendResponce(
      true,
      response.data.message,
      response.status,
      response.data
    );
  } catch (error: any) {
    console.error("Error deleting item:", error.response.data);
    return sendResponce(
      false,
      error.response.data,
      error.response.status,
      null,
      error.response.data.message
    );
  }
}
