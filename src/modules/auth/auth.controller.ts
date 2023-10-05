import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "./signin.dto";
import { UserDto } from "../users/dto/create-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: SignInDto): Promise<any> {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() user: UserDto): Promise<any> {
        return this.authService.register(user);
    }
}

