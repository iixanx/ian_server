import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { SignInRequestDto } from './dto/signin.request.dto';
import { UnsubscribeRequestDto } from './dto/unsubscribe.request.dto';
import { ModifyRequestDto } from './dto/modify.request.dto';
import { PatchRequestDto } from './dto/patch.request.dto';
import { PrismaService } from 'prisma/prisma.service';
import { compare, hash } from 'bcrypt';
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async signup(request: SignUpRequestDto) {
    const { name, email, password } = request;

    if (await this.prisma.findUserByEmail(email)) throw new ConflictException();

    const hashedPassword = await hash(password, 10);

    await this.prisma.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const thisUser = await this.prisma.findUserByEmail(email);
    if (!thisUser) throw new InternalServerErrorException();

    return {
      id: thisUser.id,
      email: thisUser.email,
    };
  }

  async signin(request: SignInRequestDto) {
    const { email, password } = request;

    const thisUser = await this.prisma.findUserByEmail(email);

    if (!thisUser) throw new NotFoundException();
    if (!(await compare(password, thisUser.password))){
      throw new BadRequestException("Password is not correct");
    }

    return {
      accessToken:
        String(new Date().valueOf() + 1000 * 60 * 60 * 3 + 30000000000) +
        String(thisUser.id).padStart(8, '0'),
    };
  }

  async unsubscribe(request: UnsubscribeRequestDto) {
    const { user } = request;

    await this.prisma.deleteUser(user.id);

    return;
  }

  async modify(request: ModifyRequestDto) {
    const { email, password } = request;

    const thisUser = await this.prisma.findUserByEmail(email);
    if (!thisUser) throw new NotFoundException();

    await this.prisma.updateUserPassword(thisUser.id, password);

    return thisUser.id;
  }

  async patch(request: PatchRequestDto) {
    const { user, password } = request;

    await this.prisma.updateUserPassword(user.id, password);

    return user.id;
  }
}
