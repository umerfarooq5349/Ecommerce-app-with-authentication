import Express from "express";

import { getFeaturedProducts } from "../controllers/client/featuredProductsController";

const featuredRouter = Express.Router();

featuredRouter.route("/").get(getFeaturedProducts);

export default featuredRouter;
