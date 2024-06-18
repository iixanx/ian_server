import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 30)
  password: string;
}
