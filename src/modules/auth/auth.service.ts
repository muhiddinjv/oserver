import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(user: any) {
    const dbUser = await this.usersService.findOne(user.phoneNumber);
    
    const isValidPass = await validate(
      user.password, dbUser.password  
    );
    
    if(!dbUser || !isValidPass) {
      throw new UnauthorizedException('Password is incorrect');
    }
    
    const payload = { sub: String(dbUser._id), phoneNumber: dbUser.phoneNumber };
    const accessToken = await this.jwtService.signAsync(payload);
    
    return { accessToken };  
  }
}