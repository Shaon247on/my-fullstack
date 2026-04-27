import { ApiResponse } from "@/types/auth.type";
import { api } from "./axios";
import { CreatePostPayload, Post, UpdatePostPayload } from "@/types/post.type";

export const postApi = {
  getAllPosts: async () => {
    const res = await api.get<ApiResponse<Post[]>>("/posts");

    return res.data;
  },
  getMyPosts: async () => {
    const res = await api.get<ApiResponse<Post[]>>(`/posts/my-posts`);

    return res.data;
  },

  getSinglePost: async (id: string) => {
    const res = await api.get<ApiResponse<Post>>(`/posts/${id}`);

    return res.data;
  },

  createPost: async (payload: CreatePostPayload) => {
    const res = await api.post<ApiResponse<Post>>("/posts", payload);

    return res.data;
  },

  updatePost: async (payload: UpdatePostPayload, id: string) => {
    const res = await api.patch<ApiResponse<Post>>(`/posts/${id}`, payload);

    return res.data;
  },

  deletePost: async (id: string) => {
    const res = await api.delete<ApiResponse<null>>(`/posts/${id}`);

    return res.data;
  },
};
