import Express from "express";
import itemRouter from "./routes/item_routes";
import cors from "cors";
import { errorHandlerMiddleware } from "./controllers/errors/errors";
import item_image_upload_router from "./routes/item_image_upload";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/addToCartRoute";
import reviewRouter from "./routes/review_routes";
const app = Express();

const corsOptions = {
  origin: true, // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(cors(corsOptions));
app.use(Express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  // console.log(`cookies: ${req.cookies}`);
  next();
});

app.use("/uploads", Express.static("uploads"));

app.use("/api/items", itemRouter);
app.use("/api/upload", item_image_upload_router);
app.use("/api", authRouter);
app.use("/api/client/cart", cartRouter);
app.use("/api/client/reviews", reviewRouter);
app.use(errorHandlerMiddleware);

export default app;
