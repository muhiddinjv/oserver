import {
  Body,
  Controller,
  Post,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.metadata';
import { SignInDto } from './signin.dto';
// import ability from 'src/modules/roles/defineAbility';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
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
