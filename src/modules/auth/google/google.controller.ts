import { GoogleOAuthGuard } from './google.guard';
import { Controller, Get, HttpStatus, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { Response } from 'express';

@Controller('auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.googleService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }
}