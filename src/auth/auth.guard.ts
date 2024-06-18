import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService
  ){}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.header;

    const token = Number(header['authorization']);
    if (Number.isNaN(token) || Math.floor(token / 10000000) < 30000000000)
      throw new BadRequestException();

    const resolved_1 = new Date(Math.floor(token / 10000000) - 30000000000);

    if (resolved_1 < new Date()) throw new UnauthorizedException();

    request.user = await this.prisma.findUserById(token % 10000000)

    return true;
  }
}
