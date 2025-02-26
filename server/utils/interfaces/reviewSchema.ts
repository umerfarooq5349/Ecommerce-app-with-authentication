import mongoose, { Date } from "mongoose";

export interface ReviewTypes {
  userId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
  comment: string;
  createdAt?: Date;
  rating: number;
}
