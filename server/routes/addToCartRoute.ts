import Express from "express";
import {
  addToCartItem,
  cartTotalPrice,
  getCartItems,
  modifyCartItem,
} from "../controllers/client/addToCartController";
import { protectedRoute } from "../controllers/auth/authurization_controller";

const cartRouter = Express.Router();

cartRouter.route("/").get(protectedRoute, getCartItems).post(
  protectedRoute,
  //   addItem
  addToCartItem
);

cartRouter.route("/total").get(protectedRoute, cartTotalPrice);
cartRouter.route("/:itemId").delete(protectedRoute, modifyCartItem);

export default cartRouter;
