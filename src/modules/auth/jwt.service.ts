import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  import * as bcryptjs from 'bcryptjs';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { hashData } from 'src/helpers';
  
  @Injectable()
  export class JwtTokenService {
    constructor(
      private userService: UsersService,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
  
    async updateRefreshToken(userId: string, refresh_token: string) {
      const hashedRefreshToken = await hashData(refresh_token);
      await this.userService.update(userId, {
        refresh_token: hashedRefreshToken,
      });
    }
  
    async getTokens(userId: string, phone_number: string) {
      const [accessToken, refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: userId,
            phone_number,
          },
          {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            phone_number,
          },
          {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
          },
        ),
      ]);
      return {
        accessToken,
        refresh_token,
      };
    }
  
    async getTokenById(token: string) {
      const tokens = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
  
      return tokens;
    }
  
    async refresh_tokens(userId: string, refresh_token: string) {
      const user = await this.userService.findById(userId);
      if (!user || !user.refresh_token)
        throw new ForbiddenException('Access Denied');
      const refresh_tokenMatches = await bcryptjs.compare(
        user.refresh_token,
        refresh_token,
      );
      if (!refresh_tokenMatches) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user.id, user.phone_number);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }

  }
  