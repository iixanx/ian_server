import { Logger, Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaService, Logger],
})
export class OtpModule {}
