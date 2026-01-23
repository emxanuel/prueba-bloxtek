import prisma from "@/core/prisma";
import { User } from "@/database/generated/prisma/client";

export class UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserByUuid(uuid: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { uuid } });
  }

  async createUser({ name, email, password }: { name: string, email: string, password: string }): Promise<User> {
    return prisma.user.create({ data: { name, email, password } });
  }
}

export const userRepository = new UserRepository();