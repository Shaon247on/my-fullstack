import AppError from "../errors/AppError";
import { Post } from "../models/post.model";
import httpStatus from "http-status";

export type TCreatePostPayload = {
  title: string;
  content: string;
  isPublished?: boolean;
};

export type TUpdatePostPayload = Partial<TCreatePostPayload>;

const createPostIntoDB = async (
  payload: TCreatePostPayload,
  userId: string,
) => {
  const post = await Post.create({ ...payload, author: userId });

  return post;
};

const getAllPostsFromDB = async () => {
  const posts = Post.find({
    isDeleted: false,
  })
    .populate("author", "name email role")
    .sort({ createAt: -1 });

  return posts;
};

const getSinglePostFromDB = async (postId: string) => {
  const post = await Post.findById({
    _id: postId,
    isDeleted: false,
  }).populate("author", "name email role");

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  return post;
};

const getMyPostsFromDB = async (userId: string) => {
  const posts = await Post.find({
    author: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return posts;
};

const updatePostIntoDB = async (
  postId: string,
  payload: TUpdatePostPayload,
  userId: string,
) => {
  const post = await Post.findOne({
    _id: postId,
    isDeleted: false,
  });

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  if (post.author.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this post",
    );
  }

  const updatePost = await Post.findByIdAndUpdate(postId, payload, {
    new: true,
    runValidators: true,
  });

  return updatePost;
};

const deletePostFromDB = async (postId: string, userId: string) => {
  const post = await Post.findOne({
    _id: postId,
    isDeleted: false,
  });

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  if (post.author.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this post",
    );
  }

  await Post.findByIdAndUpdate(
    postId,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return null;
};

export const PostService = {
  createPostIntoDB,
  updatePostIntoDB,
  getAllPostsFromDB,
  getMyPostsFromDB,
  getSinglePostFromDB,
  deletePostFromDB,
};
