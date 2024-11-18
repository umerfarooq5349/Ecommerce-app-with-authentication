import mongoose, { Schema } from "mongoose";
import { CartTypes } from "../utils/interfaces/cartSchema";

const CartSchema: Schema<CartTypes> = new Schema<CartTypes>({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  itemId: { type: mongoose.Schema.ObjectId, required: true },
  addedAt: { type: Date, default: Date.now() },
  discount: { type: Number, default: 0 },
  isAvailable: { type: Boolean, defaultL: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

export const CartModel =
  mongoose.models.Carts || mongoose.model("Cart", CartSchema);
