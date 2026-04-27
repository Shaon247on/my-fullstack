export type UserRole = "user" | "admin";

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
