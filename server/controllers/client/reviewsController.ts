import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewModel } from "../../model/reviws_model";
import mongoose from "mongoose";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { itemId, rating, comment } = req.body;
  const { _id, name, photo } = req.body.currentUser;
  const userId = _id;

  if (!itemId || !userId || !comment) {
    return sendResponse(res, 403, "Failure", "Invalid fields");
  }

  const review = await ReviewModel.create({
    itemId,
    rating,
    comment,
    userId,
    name,
    photo,
  });

  return sendResponse(res, 200, "Success", review);
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.query;
  const userId = req.body.currentUser._id;

  // const reviews = await ReviewModel.find({ itemId });

  const reviews = await ReviewModel.aggregate([
    { $match: { itemId: new mongoose.Types.ObjectId(itemId?.toString()) } }, // Filter by itemId
    { $sort: { rating: -1 } }, // Sort by rating (highest first)
  ]);

  if (!reviews.length) {
    return sendResponse(res, 404, "Failure", "No reviews found");
  }
  // console.log(reviews);
  return sendResponse(res, 200, "Success", "reviews", reviews);
});

export { addReview, getReviews };
