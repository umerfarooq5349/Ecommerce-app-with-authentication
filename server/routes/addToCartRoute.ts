import Express from "express";
import {
  addToCartItem,
  cartTotalPrice,
  deleteCartItems,
  getCartItems,
  removeFromCartList,
} from "../controllers/client/addToCartController";
import { protectedRoute } from "../controllers/auth/authurization_controller";

const cartRouter = Express.Router();

cartRouter.route("/").get(protectedRoute, getCartItems).post(
  protectedRoute,
  //   addItem
  addToCartItem
);

cartRouter.route("/total").get(protectedRoute, cartTotalPrice);
cartRouter
  .route("/:itemId")
  .delete(protectedRoute, deleteCartItems)
  .post(protectedRoute, removeFromCartList);

export default cartRouter;
