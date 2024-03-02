import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.metadata';
import { ApiTags } from '@nestjs/swagger';
// import ability from 'src/modules/roles/defineAbility';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() user: Record<string, any>) {
    return this.authService.signIn(user.id, user.password);
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
