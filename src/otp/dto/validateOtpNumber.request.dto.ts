import { user } from "@prisma/client";
import { IsNumber, IsPositive, Max } from "class-validator";

export class ValidateOtpNumberRequestDto {
  user: user;

  @IsNumber()
  @IsPositive()
  otpId: number;

  @IsNumber()
  @IsPositive()
  @Max(999999)
  otpNumber: number;
}