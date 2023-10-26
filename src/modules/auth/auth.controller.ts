import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/guards/acessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Method: Signup' })
  @ApiOkResponse({
    description: 'The user was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Method: signin' })
  @ApiOkResponse({
    description: 'New access, refresh tokens have been saved.',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @ApiOperation({ summary: 'Method: logout' })
  @ApiOkResponse({
    description: 'The user was logged out successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
