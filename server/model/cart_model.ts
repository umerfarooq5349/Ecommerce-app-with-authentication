import mongoose, { Schema } from "mongoose";
import { CartTypes } from "../utils/interfaces/cartSchema";

const CartSchema: Schema<CartTypes> = new Schema<CartTypes>({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  itemId: { type: mongoose.Schema.ObjectId, required: true, ref: "Item" },
  addedAt: { type: Date, default: Date.now() },
  discount: { type: Number, default: 0, required: true },
  isAvailable: { type: Boolean, defaultL: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1, required: true },
});

export const CartModel =
  mongoose.models.Carts || mongoose.model("Cart", CartSchema);
