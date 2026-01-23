import axios from "axios";
import config from "@/config";

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});