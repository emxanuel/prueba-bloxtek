import { userRepository } from "../repositories/users.repository";
import { config } from "@/core/config";
import { BadRequestError } from "@/core/errors";
import * as jose from "jose";
import bcrypt from "bcrypt";
import { sessionsRepository } from "../repositories/sessions.repository";
import { RegisterResponseDto } from "../dtos/register.dto";

async function registerService(name: string, email: string, password: string): Promise<RegisterResponseDto> {
  const user = await userRepository.findUserByEmail(email);

  if (user) {
    throw new BadRequestError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({ name, email, password: hashedPassword });

  const session = await sessionsRepository.createSession(newUser.id);

  return {
    user: {
      uuid: newUser.uuid,
      name: newUser.name,
      email: newUser.email
    },
    token: await new jose.SignJWT({ user: newUser.uuid, session: session.uuid })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(config.jwtExpiration)
      .sign(new TextEncoder().encode(config.jwtSecret)),
  };
}

export default registerService;