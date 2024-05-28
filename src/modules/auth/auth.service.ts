import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async signIn(user: any) {
    const dbUser = await this.usersService.findOne(user.phoneNumber);

    if (!dbUser) {
      throw new NotFoundException([{field: 'phoneNumber', text: `User with ${user.phoneNumber} not found`}]);
    }
    const passwordMatches = await argon.verify(dbUser.password, user.password);
    
    if(!passwordMatches) {
      console.log(passwordMatches);
      throw new UnauthorizedException([{field: 'password', text: 'Password is incorrect'}]);
    }
    
    const tokens = await this.getTokens(dbUser._id.toString(), dbUser.phoneNumber);
    await this.updateRtHash(dbUser._id, tokens.refreshToken);
    
    return tokens;  
  }

  async signOut(userId: string) {
    this.usersService.update(userId, { refreshToken: null });
    return [{field: 'auth', text: 'user signed out'}]
  }

  async signUp(createUserDto: CreateUserDto){
    const userExists = await this.usersService.findOne(
      createUserDto.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.usersService.create(createUserDto);

    const tokens = await this.getTokens(newUser._id, newUser.phoneNumber);
    await this.updateRtHash(newUser._id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userId: string, phoneNumber: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, phoneNumber },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, phoneNumber },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    
    return {
      accessToken,
      refreshToken,
    }; 
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon.verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id, user.phoneNumber);
    await this.updateRtHash(user._id, tokens.refreshToken);

    return tokens;
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }  

  async getProfile(id: string) {
    const user = await this.usersService.findById(id);

    user.password = null;
    user.refreshToken = null;

    return user;
  }
}