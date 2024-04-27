import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.metadata';
import { SignInDto } from './signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessTokenGuard } from 'src/shared/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/shared/guards/refreshToken.guard';
// import ability from 'src/modules/roles/defineAbility';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  
  @Public()
  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@Req() req: Request) {
    this.authService.signOut(req['user']['sub']);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req['user']['sub'];
    console.log(req['user']['sub']);
    const refreshToken = req['user']['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }



  @Get('profile')
  getProfile(@Request() req) {
    // console.log('can read Post', ability.can('read', 'Post'));
    // console.log('can read User', ability.can('read', 'User'));
    // console.log('can update User', ability.can('update', 'User'));
    // console.log('can delete User', ability.can('delete', 'User'));
    // console.log('cannot delete User', ability.cannot('delete', 'User'));
    return req.user;
  }
}
