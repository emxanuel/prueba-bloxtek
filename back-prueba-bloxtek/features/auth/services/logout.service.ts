import * as jose from "jose";
import { config } from "@/core/config";
import { UnauthorizedError } from "@/core/errors";
import { sessionsRepository } from "../repositories/sessions.repository";

async function logoutService(token: string) {
  const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(config.jwtSecret));

  const session = await sessionsRepository.findSessionByUuid(payload.session as string);

  if (!session) {
    throw new UnauthorizedError("Session not found");
  }

  await sessionsRepository.revokeSession(session.id);

  return {
    message: "Logged out successfully",
  };
}

export default logoutService;