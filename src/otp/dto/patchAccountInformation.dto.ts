import { user } from "@prisma/client";
import { IsString } from "class-validator";

export class PatchAccountInformationDto {
  user: user;

  @IsString()
  service: string;

  @IsString()
  account: string;
}