import config from "@/config";
import { apiClient } from "../client";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post(`${config.apiUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post(`${config.apiUrl}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  },
};