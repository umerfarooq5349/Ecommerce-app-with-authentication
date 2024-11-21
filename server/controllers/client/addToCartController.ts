import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../errors/appErrors";
import { CartModel } from "../../model/cart_model";
import { sendResponse } from "../../utils/sendResponse";

const addToCartItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId, quantity, price, addedAt, discount, isAvailable } = req.body;
  const userId = req.body.currentUser._id;
  // Validate inputs
  if (!itemId || quantity <= 0 || !price) {
    return sendResponse(res, 400, "Failure", "Invalid item details provided.");
  }

  // Check if item is already in the cart
  const alreadyInCartItem = await CartModel.findOneAndUpdate(
    { userId, itemId },
    { $inc: { quantity } },
    { new: true }
  );

  if (alreadyInCartItem) {
    return sendResponse(
      res,
      200,
      "Success",
      "Item quantity updated in cart.",
      alreadyInCartItem
    );
  }

  // Add a new item to the cart
  const newCartItem = await CartModel.create({
    userId,
    itemId,
    quantity,
    price,
    addedAt,
    discount,
    isAvailable,
  });

  return sendResponse(res, 200, "Success", "Item added to cart.", newCartItem);
});

const cartTotalPrice = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.currentUser._id;

  const totalPrice = await CartModel.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
  ]);

  if (totalPrice.length === 0) {
    return sendResponse(res, 200, "Success", "Your cart is empty.", {
      totalPrice: 0,
    });
  }

  return sendResponse(
    res,
    200,
    "Success",
    "Total price calculated.",
    totalPrice[0]
  );
});

const getCartItems = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.currentUser._id;

  const cartItems = await CartModel.find({ userId })
    .populate("itemId", "title thumbnail")
    .exec();

  if (cartItems.length === 0) {
    return sendResponse(res, 200, "Success", "Your cart is empty.", []);
  }

  return sendResponse(res, 200, "Success", "Here is your cart.", cartItems);
});

const modifyCartItem = catchAsync(async (req: Request, res: Response) => {
  const itemId = req.params.itemId;
  const userId = req.body.currentUser._id;
  const deleteWholeProduct = req.query.delete === "true"; // Use query parameter to check if deletion is requested
  console.log(itemId, deleteWholeProduct, userId, req.query.delete);
  if (!itemId) {
    return sendResponse(res, 400, "Failure", "Item ID is required.");
  }

  // Find the cart item
  const cartItem = await CartModel.findOne({ userId, itemId });

  if (!cartItem) {
    return sendResponse(res, 404, "Failure", "Item not found in your cart.");
  }

  // If the user requests to delete the whole product
  if (deleteWholeProduct) {
    await CartModel.findOneAndDelete({ userId, itemId });
    return sendResponse(res, 200, "Success", "Item removed from your cart.");
  }

  // If quantity is greater than 1, decrement the quantity
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    await cartItem.save();
    return sendResponse(
      res,
      200,
      "Success",
      "Item quantity decremented.",
      cartItem
    );
  }

  // If quantity is 1 or less, remove the item
  await CartModel.findOneAndDelete({ userId, itemId });
  return sendResponse(res, 200, "Success", "Item removed from your cart.");
});

export { addToCartItem, cartTotalPrice, getCartItems, modifyCartItem };
