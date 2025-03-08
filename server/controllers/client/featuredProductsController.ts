import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewModel } from "../../model/reviws_model";
import mongoose from "mongoose";
import { sendResponse } from "../../utils/sendResponse";

const getFeaturedProducts = catchAsync(async (req: Request, res: Response) => {
  const featuredProducts = await ReviewModel.aggregate([
    {
      $group: {
        _id: "$itemId",
        ratings: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
    { $sort: { rating: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        _id: "$productDetails._id",
        title: "$productDetails.title",
        thumbnail: "$productDetails.thumbnail",
        ratings: 1,
        totalReviews: 1,
      },
    },
  ]);

  if (!featuredProducts.length) {
    return sendResponse(
      res,
      404,
      "Failure",
      "No featured product available yet!"
    );
  }
  // console.log(reviews);
  return sendResponse(
    res,
    200,
    "Success",
    "Featured Products",
    featuredProducts
  );
});

export { getFeaturedProducts };
