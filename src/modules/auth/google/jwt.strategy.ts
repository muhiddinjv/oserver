import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities';

export type JwtPayload = {
    id: number;
    email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@InjectRepository(Users)
    private userRepo: Repository<Users>) {
        const extractJwtFromCookie = (req) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };

        super({
            ignoreExpiration: false,
            secretOrKey: process.env.GOOGLE_CLIENT_SECRET,
            jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userRepo.findOne({ where: { id: payload.id } });

        if (!user) throw new UnauthorizedException('Please log in to continue');

        return {
            id: payload.id,
            email: payload.email,
        };
    }
}