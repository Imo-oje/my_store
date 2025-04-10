import { Router } from "express";
import { createStore, updateStore } from "../controllers/storeController";

const storeRouter = Router();

storeRouter.post("/create", createStore);
storeRouter.patch("/update", updateStore);

export default storeRouter;
