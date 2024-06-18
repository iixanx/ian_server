import { Injectable } from '@nestjs/common';
import { IOtpService } from './otp.service.interface';

@Injectable()
export class OtpService implements IOtpService {
  constructor() {}

  addAccount: any;
  deleteAccount: any;
  getOtpNumber: any;
  patchAccountInformation: any;
}
