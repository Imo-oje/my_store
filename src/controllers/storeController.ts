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
import { createStoreSchema, updateStoreSchema } from "../utils/vlidationSchema";

export const createStore = asyncHandler(async (req, res) => {
  const { businessName, logo } = createStoreSchema.parse({
    ...req.body,
  });
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const store = await prisma.store.create({
    data: { businessName, ...(logo && { logo }), ownerId: user.id },
  });
  appAssert(store, INTERNAL_SERVER_ERROR, "Could not create store");

  res.status(CREATED).json({ message: "Store created" });
});

export const updateStore = asyncHandler(async (req, res) => {
  const {
    businessName,
    logo,
    address,
    contactEmail,
    contactPhone,
    description,
    location,
  } = updateStoreSchema.parse({ ...req.body });
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const store = await prisma.store.findFirst({ where: { ownerId: user.id } });
  appAssert(store, NOT_FOUND, "Store not found");

  const updatedStore = await prisma.store.update({
    where: { id: store.id },
    data: {
      ...(businessName && { businessName }),
      ...(logo && { logo }),
      ...(address && { address }),
      ...(contactEmail && { contactEmail }),
      ...(contactPhone && { contactPhone }),
      ...(description && { description }),
      ...(location && { location }),
    },
  });
  appAssert(
    updateStore,
    INTERNAL_SERVER_ERROR,
    "Could not update fields" /* TODO: Specify fields that failed */
  );

  res.status(OK).json({ message: "Store updated" });
});
