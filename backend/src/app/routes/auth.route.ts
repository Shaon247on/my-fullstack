import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../validations/auth.validation";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateRequest(registerValidationSchema),
  AuthController.register,
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.login,
);

router.post("/logout", AuthController.logout);

router.get("/me", auth("user", "admin"), AuthController.me);

export default router;
