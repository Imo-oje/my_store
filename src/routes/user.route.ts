import { Router } from "express";
import { resendVerificationEmail } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/email/verify/send", resendVerificationEmail);

export default userRouter;
