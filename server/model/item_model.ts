import mongoose from "mongoose";
import { ReviewTypes } from "../utils/interfaces/reviewSchema";
import { ReviewModel } from "./reviws_model";

const items = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "must be a number"],
  },

  description: {
    type: String,
    required: [true, "Must have a description"],
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    default: 10,
    required: [true, "must be in stock"],
  },
  brand: {
    type: String,
    required: [true, "Must be a specific brand"],
  },
  category: {
    type: String,
    required: [true, "Must be a specify category"],
  },
  thumbnail: {
    type: String,
    required: [true, "must be a String"],
  },
  isFeatured: { type: Boolean, default: false },
  reviews: [{ type: mongoose.Schema.ObjectId, required: true, ref: "Review" }],
});

const Item = mongoose.model("Item", items);

export default Item;
