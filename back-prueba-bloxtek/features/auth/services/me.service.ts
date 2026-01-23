import * as jose from "jose";
import { config } from "@/core/config";
import { userRepository } from "../repositories/users.repository";
import { UnauthorizedError } from "@/core/errors";
import { sessionsRepository } from "../repositories/sessions.repository";
import { UserDto } from "../dtos/user.dto";

async function meService(token: string): Promise<UserDto> {
  const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(config.jwtSecret));

  const session = await sessionsRepository.findSessionByUuid(payload.session as string);

  if (!session) {
    throw new UnauthorizedError("Session not found");
  }

  const user = await userRepository.findUserByUuid(payload.user as string);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return {
    uuid: user.uuid,
    name: user.name,
    email: user.email
  };
}

export default meService;