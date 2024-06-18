import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/signin.request.dto';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { UnsubscribeRequestDto } from './dto/unsubscribe.request.dto';
import { ModifyRequestDto } from './dto/modify.request.dto';
import { PatchRequestDto } from './dto/patch.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
  ){
    this.service = service
  }

  @Post('signup')
  async signup (@Body() request: SignUpRequestDto) {
    const data = await this.service.signup(request);

    return {
      data,
      statusCode: 201,
      statusMsg: ""
    }
  };
  
  @Post('signin')
  async signin(@Body() request: SignInRequestDto) {
    const data = await this.service.signin(request);

    return {
      data,
      statusCode: 200,
      statusMsg: ""
    }
  };


  @Delete('signout')
  @UseGuards()
  async unsubscribe(@Body() request: UnsubscribeRequestDto) {
    const data = await this.service.unsubscribe(request);

    return {
      data,
      statusCode: 204,
      statusMsg: ""
    }
  }

  @Patch('modify')
  @UseGuards()
  async modify(@Body() request: ModifyRequestDto) {
    const data = await this.service.modify(request);

    return {
      data,
      statusCode: 200,
      statusMsg: ""
    }
  }

  @Patch('patch')
  @UseGuards()
  async patch(@Body() request: PatchRequestDto) {
    const data = await this.service.patch(request);

    return {
      data,
      statusCode: 200,
      statusMsg: ""
    }
  }
}
