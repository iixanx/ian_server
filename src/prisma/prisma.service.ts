import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    configDotenv();

    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findUserById(id: number) {
    return await this.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    await this.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async deleteUser(id: number) {
    await this.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUserPassword(id: number, password: string) {
    await this.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
