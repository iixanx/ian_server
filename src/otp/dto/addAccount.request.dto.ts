import { user } from '@prisma/client';
import { IsString } from 'class-validator';

export class AddAccountRequestDto {
  @IsString()
  service: string;

  @IsString()
  account: string;

  user: user;
}
