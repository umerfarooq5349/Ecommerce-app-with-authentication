import { sendResponce } from "@/utils/api response/sendResponse";
import axios from "axios";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${getCookie("jwt")}`,
//   },
//   withCredentials: true,
// });

// get all cart items

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/client/cart/`,
      { headers: { Authorization: `Bearer ${token?._id}` } }
      // withCredentials: true,
    );
    return sendResponce(true, "Here is your cart", 200, response.data.data);
  } catch (error) {
    return sendResponce(false, "Can not find response", 400, "", { error });
  }
}

//add to cart
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const {
      _id,
      price,
      quantity = 1,
      discountPercentage,
    } = body.cartProduct || body.item || body;
    console.log(body.item, body);
    if (!_id || !price || discountPercentage === undefined) {
      return sendResponce(false, "Invalid data provided", 400, null);
    }

    // Retrieve the token for authentication
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    console.log(token);

    if (!token?._id) {
      return sendResponce(false, "Authentication failed", 401, null);
    }

    // Send data to external API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/api/client/cart/`,
      {
        itemId: _id,
        price,
        discount: discountPercentage,
        quantity,
        isAvailable: true,
      },
      {
        headers: { Authorization: `Bearer ${token._id}` },
      }
    );

    // Return the response from the external API
    return sendResponce(
      true,
      "Item added to cart successfully",
      200,
      response.data
    );
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
    return sendResponce(false, "Failed to add item to cart", 500, null, {
      error,
    });
  }
}
