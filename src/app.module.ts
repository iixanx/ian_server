import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, OtpModule, PrismaModule],
})
export class AppModule {}
