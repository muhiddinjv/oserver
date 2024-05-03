import {
  Req,
  Get,
  Body,
  Post,
  UseGuards,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public, GetCurrentUserId, GetCurrentUser } from 'src/shared/decorators';
import { RtGuard } from '../../shared/guards';
import { Tokens } from './types';
// import ability from 'src/modules/roles/defineAbility';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }
  
  @Get('signout')
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserId() userId: string) {
    this.authService.signOut(userId);
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

  // @Public()
  @Get('profile')
  getProfile(@Req() req) {
    // console.log('can read Post', ability.can('read', 'Post'));
    // console.log('can read User', ability.can('read', 'User'));
    // console.log('can update User', ability.can('update', 'User'));
    // console.log('can delete User', ability.can('delete', 'User'));
    // console.log('cannot delete User', ability.cannot('delete', 'User'));
    return req.user;
  }
}