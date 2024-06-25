import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { AddAccountRequestDto } from './dto/addAccount.request.dto';
import { DeleteAccountRequestDto } from './dto/deleteAccount.request.dto';
import { PatchAccountInformationDto } from './dto/patchAccountInformation.dto';
import { ValidateOtpNumberRequestDto } from './dto/validateOtpNumber.request.dto';
import { AuthGuard } from 'auth/auth.guard';
import { GetAccountListRequestDto } from './dto/getAccountList.request.dto';
import { GetOtpInformRequestDto } from './dto/getOtpInform.request.dto';

@Controller('otp')
@UseGuards(AuthGuard)
export class OtpController {
  constructor(private service: OtpService) {
    this.service = service;
  }

  @Post()
  async addAccount(@Body() request: AddAccountRequestDto) {
    const data = await this.service.addAccount(request);

    return {
      data,
      statusCode: 201,
      statusMsg: '',
    };
  }

  @Delete()
  async deleteAccount(@Body() request: DeleteAccountRequestDto) {
    const data = await this.service.deleteAccount(request);

    return {
      data,
      statusCode: 204,
      statusMsg: '',
    };
  }

  @Patch()
  async patchAccountInformation(@Body() request: PatchAccountInformationDto) {
    const data = await this.service.patchAccountInformation(request);

    return {
      data,
      statusCode: 200,
      statusMsg: '',
    };
  }

  @Get('validate')
  async validateOtpNumber(@Body() request: ValidateOtpNumberRequestDto) {
    const data = await this.service.validateOtpNumber(request);

    return {
      data,
      statusCode: 200,
      statusMsg: '',
    };
  }

  @Get('/inform/:id')
  async getOtpInformation(
    @Param('id') id: string,
    @Body() request: GetOtpInformRequestDto,
  ) {
    const data = await this.service.getOtpInform(id, request);

    return {
      data,
      statusCode: 200,
      statusMsg: '',
    };
  }

  @Get('')
  async getAccountList(@Body() request: GetAccountListRequestDto) {
    const data = await this.service.getAccountList(request);

    return {
      data,
      statusCode: 200,
      statusMsg: '',
    };
  }
}
