import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewModel } from "../../model/reviws_model";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { itemId, rating, comment } = req.body;
  const userId = req.body.currentUser._id;
  //   const data={itemId,rating,comment}

  if (!itemId || !userId || !comment) {
    return sendResponse(res, 403, "Failure", "Invalid fields");
  }

  const review = await ReviewModel.create({ itemId, rating, comment, userId });

  return sendResponse(res, 200, "Success", review);
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.body.currentUser._id;

  //  const cartItems = await CartModel.find({ userId })
  //     .populate("itemId", "title thumbnail")
  //     .exec();

  const reviews = await ReviewModel.find({ userId, itemId });
  console.log(reviews);
  return sendResponse(res, 200, "Success", "reviews", reviews);
});

export { addReview, getReviews };
