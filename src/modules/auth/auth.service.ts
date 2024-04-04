import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(user: any){
    const foundUser = await this.usersService.findOne(user.phoneNumber);

    // if (!foundUser || !bcryptjs.compareSync(password, foundUser.password)) {
    if (!foundUser || foundUser.password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: String(foundUser._id), phoneNumber: foundUser.phoneNumber };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}