import { UserDto } from "./user.dto";

export interface RegisterResponseDto {
  user: UserDto;
  token: string;
}