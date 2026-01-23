import * as jose from "jose";
import { config } from "@/core/config";
import { User } from "@/database/generated/prisma/client";
import { userRepository } from "../repositories/users.repository";
import { UnauthorizedError } from "@/core/errors";
import { sessionsRepository } from "../repositories/sessions.repository";

async function meService(token: string): Promise<User> {
  const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(config.jwtSecret));

  const session = await sessionsRepository.findSessionByUuid(payload.session as string);

  if (!session) {
    throw new UnauthorizedError("Session not found");
  }

  const user = await userRepository.findUserByUuid(payload.user as string);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
}

export default meService;