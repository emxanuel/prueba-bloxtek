import { apiClient } from "../client";
import { AxiosError } from "axios";
import { AuthResponse, AuthErrorResponse, LogoutResponse } from "@/features/auth/types/auth.types";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse | AuthErrorResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          error: error.response?.data.error || "An unknown error occurred",
        };
      }
      throw error;
    }
  },
  register: async (name: string, email: string, password: string): Promise<AuthResponse | AuthErrorResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          error: error.response?.data.error || "An unknown error occurred",
        };
      }
      throw error;
    }
  },
  logout: async (token: string): Promise<LogoutResponse | AuthErrorResponse> => {
    try {
      const response = await apiClient.post<LogoutResponse>("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          error: error.response?.data.error || "An unknown error occurred",
        };
      }
      throw error;
    }
  },
};