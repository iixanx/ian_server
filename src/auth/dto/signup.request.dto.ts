import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  @Length(1)
  name: string;

  @IsEmail()
  @Length(1)
  email: string;

  @IsString()
  @Length(5, 30)
  password: string;
}
