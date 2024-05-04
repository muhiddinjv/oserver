import {
  Req,
  Get,
  Body,
  Post,
  UseGuards,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public, GetCurrentUserId, GetCurrentUser } from 'src/shared/decorators';
import { RtGuard } from '../../shared/guards';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    const tokens = await this.authService.signIn(signInDto);
    return tokens;
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserId() userId: string) {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetCurrentUserId() userId: string) {
    return await this.authService.getProfile(userId);
  }
}