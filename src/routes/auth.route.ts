import { Router } from "express";
import {
  loginHandler,
  logOutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetEmailHandler,
  verifyEmailHandler,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/logout", logOutHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/email/verify/:code", verifyEmailHandler);
authRouter.post("/password/forgot", sendPasswordResetEmailHandler);
authRouter.post("/password/reset", resetPasswordHandler);

export default authRouter;
