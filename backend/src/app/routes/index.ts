import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import postRouter from "./post.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
export default router;
