import { Router } from "express";
import { createPermissions, createRoles } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post("/permission/create", createPermissions);
adminRouter.post("/role/create", createRoles);

export default adminRouter;
