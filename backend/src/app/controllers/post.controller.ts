import { getParams } from "../../utils/getParam";
import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../middlewares/asyncHandler";
import { PostService } from "../services/post.service";
import httpStatus from "http-status";

const createPost = asyncHandler(async (req, res) => {
  const result = await PostService.createPostIntoDB(req.body, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const result = await PostService.getAllPostsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts fetched successfully",
    data: result,
  });
});

const getMyPosts = asyncHandler(async (req, res) => {
  const result = await PostService.getMyPostsFromDB(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Posts fetched successfully",
    data: result,
  });
});

const getSinglePost = asyncHandler(async (req, res) => {
  const postId = getParams(req.params.id, "id");
  const result = await PostService.getSinglePostFromDB(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post fetched successfully",
    data: result,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const postId = getParams(req.params.id, "id");

  const result = PostService.updatePostIntoDB(
    postId,
    req.body,
    req.user!.userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = getParams(req.params.id, "id");

  await PostService.deletePostFromDB(postId, req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully",
    data: null,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
