import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {JwtModule} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {Users} from "../users/entities/users.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secretOrPrivateKey: 'secret12356789'
        })],
    providers: [UsersService]
})
export class AuthModule {

}
