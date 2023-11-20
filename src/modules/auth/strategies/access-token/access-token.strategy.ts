import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../auth.service';

type JwtPayload = {
    sub: string;
    phoneNumber: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserById(payload.sub);
    return user;
    }
}