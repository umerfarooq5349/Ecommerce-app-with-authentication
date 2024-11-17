import Express from "express";
import {
  deleteItem,
  getItem,
  updateItem,
} from "../controllers/admin/item_controller";
import { getItems, addItem } from "../controllers/admin/item_controller";
import {
  protectedRoute,
  restrictTo,
} from "../controllers/auth/authurization_controller";

const itemRouter = Express.Router();

itemRouter.route("/").get(getItems).post(
  // protectedRoute,
  addItem
);
itemRouter
  .route("/:id")
  .put(
    // restrictTo("admin"),
    updateItem
  )
  .delete(deleteItem)
  .get(getItem);

export default itemRouter;
