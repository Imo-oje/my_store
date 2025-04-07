import "dotenv/config";
import express from "express";
import { PORT } from "./constants/env";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.set("trust proxy", true);

//Routes
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER]: Running on port ${PORT}`);
});
