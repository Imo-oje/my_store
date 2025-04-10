import "dotenv/config";
import express from "express";
import { PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { authenticate } from "./middleware/authenticate";
import storeRouter from "./routes/store.route";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1 /* number of proxies between user and server */);

//Routes
app.use("/auth", authRouter);
app.use("/user", authenticate, userRouter);
app.use("/store", authenticate, storeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER]: Running on port ${PORT}`);
});
