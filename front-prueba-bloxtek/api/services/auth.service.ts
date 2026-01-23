import { apiClient } from "../client";
import { AxiosError } from "axios";

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", {
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
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/register", {
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
  logout: async (token: string) => {
    try {
      const response = await apiClient.post("/auth/logout", {}, {
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