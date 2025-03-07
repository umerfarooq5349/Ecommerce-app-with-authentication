import mongoose, { Schema } from "mongoose";
import { ReviewTypes } from "../utils/interfaces/reviewSchema";

const ReviewSchema: Schema<ReviewTypes> = new Schema<ReviewTypes>({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  itemId: { type: mongoose.Schema.ObjectId, required: true, ref: "Item" },
  rating: {
    type: Number,
    default: 4.9,
    max: [4.9, "Rating can't be more then 4.9"],
    min: [1.0, "Rating can't be less then 1.0"],
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  photo: { type: String, required: true },
});

export const ReviewModel =
  mongoose.models.Reviews || mongoose.model("Review", ReviewSchema);
