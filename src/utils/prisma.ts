import { User } from "@prisma/client";

export const omitPassword = ({ passwordHash, ...safeUser }: User) => safeUser;
