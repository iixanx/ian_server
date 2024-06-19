import { user } from "@prisma/client";
import { IsNumber, IsPositive } from "class-validator";

export class DeleteAccountRequestDto {
  user: user;

  @IsNumber()
  @IsPositive()
  otpId: number;
}