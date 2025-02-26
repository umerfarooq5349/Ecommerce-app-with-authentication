import Express from "express";
import { protectedRoute } from "../controllers/auth/authurization_controller";
import { addReview, getReviews } from "../controllers/client/reviewsController";

const reviewRouter = Express.Router();

reviewRouter
  .route("/")
  .get(protectedRoute, getReviews)
  .post(protectedRoute, addReview);

export default reviewRouter;
