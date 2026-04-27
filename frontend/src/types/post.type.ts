import { AuthUser } from "./auth.type";

export type Post = {
  _id: string;
  title: string;
  content: string;
  author: AuthUser | string;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostPayload = {
  title: string;
  content: string;
  isPublished?: boolean;
};

export type UpdatePostPayload = Partial<CreatePostPayload>;