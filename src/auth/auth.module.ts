import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
