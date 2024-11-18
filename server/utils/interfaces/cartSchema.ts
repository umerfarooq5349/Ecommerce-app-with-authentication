import mongoose from "mongoose";

export interface CartTypes {
  userId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  addedAt: Date;
  discount: number;
  isAvailable: boolean;
}
