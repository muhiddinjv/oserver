import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    password: string,
    phone_number: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(phone_number)

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, phone_number: user.phone_number };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}