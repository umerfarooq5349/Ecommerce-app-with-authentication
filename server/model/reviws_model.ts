import mongoose, { Schema } from "mongoose";
import { ReviewTypes } from "../utils/interfaces/reviewSchema";

const ReviewSchema: Schema<ReviewTypes> = new Schema<ReviewTypes>({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  itemId: { type: mongoose.Schema.ObjectId, required: true, ref: "Item" },
  rating: { type: Number, default: 4.9 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ReviewModel =
  mongoose.models.Reviews || mongoose.model("Review", ReviewSchema);
