import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { IOtpService } from './otp.service.interface';
import { AddAccountRequestDto } from './dto/addAccount.request.dto';
import { DeleteAccountRequestDto } from './dto/deleteAccount.request.dto';
import { ValidateOtpNumberRequestDto } from './dto/validateOtpNumber.request.dto';
import { PatchAccountInformationDto } from './dto/patchAccountInformation.dto';
import { GetAccountListRequestDto } from './dto/getAccountList.request.dto';
import { PrismaService } from 'prisma/prisma.service';
import { authenticator } from 'otplib';
import { GetOtpInformRequestDto } from './dto/getOtpInform.request.dto';

@Injectable()
export class OtpService implements IOtpService {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(Logger) private logger: LoggerService,
  ) {}

  async addAccount(request: AddAccountRequestDto) {
    this.logger.log('try add account');
    const { service, account, user } = request;

    const secret = authenticator.generateSecret();

    await this.prisma.createOtp(service, account, user.id, secret);
    return await this.prisma.findOtpByServiceAndAccount(service, account);
  }

  async deleteAccount(request: DeleteAccountRequestDto) {
    this.logger.log('try to delete account');
    const { otpId, user } = request;

    const thisOtp = await this.prisma.findOtpById(otpId);
    if (!thisOtp) throw new NotFoundException();
    if (thisOtp.userId != user.id) throw new NotFoundException();

    await this.prisma.deleteOtpById(otpId);
    return;
  }

  async validateOtpNumber(request: ValidateOtpNumberRequestDto) {
    this.logger.log(
      'try to validate with' +
        request.otpNumber +
        'with user' +
        request.user.id,
    );
    const { otpId, otpNumber, user } = request;
    const thisOtp = await this.prisma.findOtpById(otpId);

    if (!thisOtp) throw new NotFoundException();
    if (thisOtp.userId !== user.id) throw new NotFoundException();

    return authenticator.check(String(otpNumber), thisOtp.secret);
  }

  async patchAccountInformation(request: PatchAccountInformationDto) {
    this.logger.log('try to patch Account information');
    const { service, account, user } = request;

    const thisOtp = await this.prisma.findOtpByServiceAndAccount(
      service,
      account,
    );
    if (!thisOtp) throw new NotFoundException();
    if (thisOtp.userId != user.id) throw new NotFoundException();

    return await this.prisma.updateOtpServiceAndAccount(
      thisOtp.id,
      service,
      account,
    );
  }

  async getAccountList(page: string, request: GetAccountListRequestDto) {
    this.logger.log('try to getAccountList');
    const numPage = Number(page ?? '0');
    const { user } = request;

    return await this.prisma.findOtpWithPage(user.id, numPage);
  }

  async getOtpInform(otpId: string, request: GetOtpInformRequestDto) {
    const { user } = request;
    const id = Number(otpId);

    if (Number.isNaN(id)) throw new BadRequestException();

    const thisOtp = await this.prisma.findOtpById(id);
    if (thisOtp.userId !== user.id) throw new NotFoundException();

    return thisOtp;
  }
}
