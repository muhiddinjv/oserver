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
    return req.user;
  }
}
