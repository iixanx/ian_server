import { user } from "@prisma/client";
import { IsString, Length } from "class-validator";

export class PatchRequestDto {
  user: user;

  @IsString()
  @Length(1)
  password: string;
}