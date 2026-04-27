import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from "../validations/post.validation";

const router = Router();

router.get("/", PostController.getAllPosts);

router.get("/my-posts", auth("user", "admin"), PostController.getMyPosts);

router.get("/:id", PostController.getSinglePost);

router.post(
  "/",
  auth("admin", "user"),
  validateRequest(createPostValidationSchema),
  PostController.createPost,
);

router.patch(
  "/:id",
  auth("admin", "user"),
  validateRequest(updatePostValidationSchema),
  PostController.updatePost,
);

router.delete("/:id", auth("user", "admin"), PostController.deletePost);

export default router;
