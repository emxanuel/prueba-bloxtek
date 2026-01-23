import { UserDto } from "./user.dto";

export interface LoginResponseDto {
  user: UserDto;
  token: string;
}