import prisma from "@/core/prisma";
import { Sessions } from "@/database/generated/prisma/client";

export class SessionsRepository {
  async createSession(userId: number): Promise<Sessions> {
    return prisma.sessions.create({ data: { userId } });
  }
}

export const sessionsRepository = new SessionsRepository();