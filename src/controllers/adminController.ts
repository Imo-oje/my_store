import { permission } from "process";
import { CREATED, INTERNAL_SERVER_ERROR } from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { createRoleSchema, stringSchema } from "../utils/vlidationSchema";

export const createPermissions = asyncHandler(async (req, res) => {
  const name = stringSchema.parse(req.body.name);
  const permissions = await prisma.permission.create({
    data: {
      name,
    },
  });
  appAssert(permissions, INTERNAL_SERVER_ERROR, "can't create permission");
  res.status(CREATED).json({ success: true });
});

export const createRoles = asyncHandler(async (req, res) => {
  const { name, permissions: permissionIds } = createRoleSchema.parse(req.body);
  const permissions = await prisma.permission.findMany({
    where: {
      id: { in: permissionIds },
    },
  });
  appAssert(
    permissions.length > 0,
    INTERNAL_SERVER_ERROR,
    "can't create permission"
  );

  const role = await prisma.role.create({
    data: {
      name,
      permissions: {
        connect: permissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
    include: {
      permissions: true,
    },
  });
  appAssert(role, INTERNAL_SERVER_ERROR, "can't create role");
  res.status(CREATED).json({ success: true, data: role });
});
