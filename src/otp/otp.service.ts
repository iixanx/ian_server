import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOtpService } from './otp.service.interface';
import { AddAccountRequestDto } from './dto/addAccount.request.dto';
import { DeleteAccountRequestDto } from './dto/deleteAccount.request.dto';
import { ValidateOtpNumberRequestDto } from './dto/validateOtpNumber.request.dto';
import { PatchAccountInformationDto } from './dto/patchAccountInformation.dto';
import { GetAccountListRequestDto } from './dto/getAccountList.request.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OtpService implements IOtpService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async addAccount(request: AddAccountRequestDto) {
    const { service, account, user } = request;

    await this.prisma.createOtp(service, account, user.id);
    return await this.prisma.findOtpByServiceAndAccount(
      service,
      account,
    );
  }

  async deleteAccount(request: DeleteAccountRequestDto) {
    const { otpId, user } = request;

    const thisOtp = await this.prisma.findOtpById(otpId);
    if (!thisOtp) throw new NotFoundException();
    if (thisOtp.userId != user.id) throw new NotFoundException();

    await this.prisma.deleteOtpById(otpId);
    return;
  }

  async validateOtpNumber(request: ValidateOtpNumberRequestDto) {}

  async patchAccountInformation(request: PatchAccountInformationDto) {
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
    const numPage = Number(page ?? '0');
    const { user } = request;

    return await this.prisma.findOtpWithPage(user.id, numPage);
  }
}
