import prisma from "@/core/prisma";
import { Sessions } from "@/database/generated/prisma/client";

export class SessionsRepository {
  async createSession(userId: number): Promise<Sessions> {
    return prisma.sessions.create({ data: { userId } });
  }

  async findSessionByUuid(uuid: string): Promise<Sessions | null> {
    return prisma.sessions.findUnique({ where: { uuid, revokedAt: null } });
  }

  async revokeSession(id: number): Promise<Sessions> {
    return prisma.sessions.update({ where: { id }, data: { revokedAt: new Date() } });
  }
}

export const sessionsRepository = new SessionsRepository();