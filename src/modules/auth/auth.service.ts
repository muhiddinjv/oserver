import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.userService.findByPhoneNumber(
            createUserDto.phoneNumber,
        );
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser._id, newUser.phoneNumber);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return tokens;
    }

    async signIn(data: AuthDto) {
        // Check if user exists
        const user = await this.userService.findByPhoneNumber(data.phoneNumber);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await bcryptjs.verify(user.password, data.password);
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user._id, user.phoneNumber);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string) {
        return this.userService.update(userId, { refreshToken: null });
    }

    hashData(data: string) {
        return bcryptjs.hash(data);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: string, phoneNumber: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    phoneNumber,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    phoneNumber,
                },
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
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await bcryptjs.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.phoneNumber);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}