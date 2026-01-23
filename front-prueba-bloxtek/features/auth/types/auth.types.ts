import { User } from "./user.types";

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthErrorResponse {
  error: string;
}

export interface LogoutResponse {
  message: string;
}