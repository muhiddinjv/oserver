import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {Users} from "../entities";
import {SignInDto} from "./signin.dto";
import {UserDto} from "../users/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService){
    }

    private async validate(userData:SignInDto):Promise<Users>{
            return this.userService.findByUser(userData);
    }

    public async login(user:SignInDto):Promise<any | { status:number }>{
        return this.validate(user).then((userData)=>{
            if (!userData){
                return {status:404};
            }

            let payload=`${userData.username}${userData.id}`;
       //     const accessToken=this.jwtService.signAsync(payload);
            return {
                expires_id:3600,
               // access_toke:accessToken,
                user:userData,
                status: 200
            }
        })
    }

    public async register(user: UserDto): Promise<any>{
        return this.userService.create(user)
    }




}
