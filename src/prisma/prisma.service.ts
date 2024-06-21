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

  async createOtp(
    service: string,
    account: string,
    userId: number,
    secret: string,
  ) {
    await this.otp.create({
      data: {
        service,
        account,
        userId,
        secret,
      },
    });
  }

  async findOtpWithPage(userId: number, page: number) {
    return await this.otp.findMany({
      where: {
        userId,
      },
      skip: page * 10,
      take: 10,
    });
  }

  async findOtpByServiceAndAccount(service: string, account: string) {
    return await this.otp.findUnique({
      where: {
        service_account: {
          service,
          account,
        },
      },
    });
  }

  async findOtpById(id: number) {
    return await this.otp.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteOtpById(id: number) {
    await this.otp.delete({
      where: {
        id,
      },
    });
  }

  async updateOtpServiceAndAccount(
    id: number,
    service: string,
    account: string,
  ) {
    return await this.otp.update({
      where: {
        id,
      },
      data: {
        service,
        account,
      },
    });
  }
}
