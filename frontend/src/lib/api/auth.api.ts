import {
  ApiResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth.type";
import { api } from "./axios";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const res = await api.post<ApiResponse<AuthUser>>(
      "/auth/register",
      payload,
    );
    return res.data;
  },

  login: async (payload: LoginPayload) => {
    const res = await api.post<ApiResponse<AuthUser>>("/auth/login", payload);
    return res.data;
  },

  logout: async () => {
    const res = await api.post<ApiResponse<null>>("/auth/logout");
    return res.data;
  },

  me: async () => {
    const res = await api.get<ApiResponse<AuthUser>>("/auth/me");

    return res.data;
  },
};
