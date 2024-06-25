import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(Logger) private logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    if (!header) throw new UnauthorizedException();

    const token = BigInt(header);

    const resolved = new Date(
      Math.floor(Number(token / BigInt(10000000))) - 30000000000,
    );

    if (token.toString() === 'NaN' || Number(resolved) < 0)
      throw new BadRequestException();

    if (resolved < new Date()) throw new UnauthorizedException();

    request.body.user = await this.prisma.findUserById(
      Number(token % BigInt(10000000)),
    );

    return true;
  }
}
