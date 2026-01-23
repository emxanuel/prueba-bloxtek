import { UnauthorizedError } from "@/core/errors";
import { userRepository } from "../repositories/users.repository";
import { config } from "@/core/config";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { sessionsRepository } from "../repositories/sessions.repository";
import { LoginResponseDto } from "../dtos/login.dto";

async function loginService(email: string, password: string): Promise<LoginResponseDto> {

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const session = await sessionsRepository.createSession(user.id);

  return {
    user: {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    },
    token: await new jose.SignJWT({ user: user.uuid, session: session.uuid })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(config.jwtExpiration)
      .sign(new TextEncoder().encode(config.jwtSecret)),
  };
}

export default loginService;