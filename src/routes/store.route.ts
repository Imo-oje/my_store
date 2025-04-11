import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  createStore,
  updateStore,
  getCatalog,
} from "../controllers/storeController";

const storeRouter = Router();

storeRouter.post("/create", createStore);
storeRouter.patch("/update", updateStore);
storeRouter.get("/:storeId/products", getCatalog);

//product actions performed by store owners

storeRouter.post("/product", createProduct);
storeRouter.get("/products", getAllProducts); // Fetch all products of the current user’s store
storeRouter.get("/product/:productId", getSingleProduct);
storeRouter.patch("/product/:productId", updateProduct);
storeRouter.delete("/product/productId", deleteProduct);

export default storeRouter;
