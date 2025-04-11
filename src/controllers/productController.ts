import { Product } from "@prisma/client";
import {
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { getStoreProduct, getUserAndStore } from "../utils/prisma";
import {
  createProductSchema,
  updateProductsSchema,
} from "../utils/vlidationSchema";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, images, price, quantity } =
    createProductSchema.parse({ ...req.body });

  const { store } = await getUserAndStore(req.userId);

  const product = await prisma.product.create({
    data: { name, description, images, price, quantity, storeId: store.id },
  });
  appAssert(product, INTERNAL_SERVER_ERROR, "Could not create product");

  res.status(CREATED).json({ success: true, data: product });
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const product = await prisma.product.findUnique({ where: { id: productId } });
  appAssert(product, NOT_FOUND, "Product not found");
  res.status(OK).json({ success: true, date: product });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { store } = await getUserAndStore(req.userId);
  const products = await prisma.product.findMany({
    where: { storeId: store.id },
  });
  appAssert(products, NOT_FOUND, "No products found");
  res.status(OK).json({ success: true, data: products });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { description, images, name, price, quantity } =
    updateProductsSchema.parse({ ...req.body });

  const { store } = await getUserAndStore(req.userId);
  const product = (await getStoreProduct(store.id, productId)) as Product;

  // Update the product
  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(quantity !== undefined && { quantity }),
      ...(images && { images }),
    },
  });
  res.status(200).json({ success: true, data: updatedProduct });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const { store } = await getUserAndStore(req.userId);
  const product = (await getStoreProduct(store.id, productId)) as Product;

  const deleted = await prisma.product.update({
    where: { id: product.id },
    data: {
      isdeleted: true,
    },
  });
  appAssert(deleted, INTERNAL_SERVER_ERROR, "Could not tdelete product");
  res.status(OK).json({ success: true, data: [] });
});
