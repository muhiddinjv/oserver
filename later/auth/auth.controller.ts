import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './strategies/access-token/acess-token.guard';
import { RefreshTokenGuard } from './strategies/refresh-token/refresh-token.guard';
import { SendSmsDto } from './dto/send-sms.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PassworgDto } from './dto/password.dto';
import { SingUpUserDto } from '../users/dto/singup-user.dto';
import { JwtTokenService } from './jwt.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtTokenService: JwtTokenService
  ) { }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('user')
  newUser(@Body() createUserDto: SingUpUserDto, @Req() req: Request) {
    return this.authService.createUser(createUserDto, req.user['sub']);
  }

  @Post('sendsms')
  async sendSMS(@Body() sendSmsDto: SendSmsDto) {
    return await this.authService.sendSmsNumber(sendSmsDto)
  }

  @Post('pwdforgot')
  async resetPassword(@Body() sendSmsDto: SendSmsDto) {
    return this.authService.ResetPassword(sendSmsDto.phone_number);
  }

  @Post('pwdreset')
  async newPassword(@Body() passwordDot: PassworgDto, @Query('token') token: string) {
    return await this.authService.NewPassword(token, passwordDot)
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@Req() req: Request) {
    this.authService.signOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refresh_tokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refresh_token = req.user['refresh_token'];
    return this.jwtTokenService.refresh_tokens(userId, refresh_token);
  }

  @Get('pincode')
  async newPinCode() {
    return await this.authService.sendPinCode()
  }
}
