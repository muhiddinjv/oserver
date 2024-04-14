import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(user: any) {
    try {
      const dbUser = await this.usersService.findOne(user.phoneNumber);
  
      const isValid = await validatePassword(
        user.password, 
        dbUser.password  
      );
  
      if(!dbUser || !isValid) {
        throw new UnauthorizedException('The provided phone number or password is incorrect. Please try again.');
      }
  
      const payload = { sub: String(dbUser._id), phoneNumber: dbUser.phoneNumber };
      const accessToken = await this.jwtService.signAsync(payload);
  
      return { accessToken };
  
    } catch (error) {
      throw new InternalServerErrorException(error.response); 
    }
  
  }
}