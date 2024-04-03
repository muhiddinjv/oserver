import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';

import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { SignInDto } from '../auth/signin.dto';
import { SignInVeryfyDto } from '../auth/signin.verify.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('/sigin')
  @ApiOperation({ summary: 'sigin User' })
  async signIn(@Response() res, @Body() signInDto: SignInDto) {
    return this.userService
      .login(signInDto)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.code(401).send(error);
      }); 
  }

  @Post('/checkuser')
  @ApiOperation({ summary: 'Checking User' })
  async signInVeryfy(
    @Response() res,
    @Body() signInVeryfyDto: SignInVeryfyDto,
  ) {
    return this.userService
      .loginByEmailOrPhone(signInVeryfyDto)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.code(401).send(error);
      });
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async saveUser(@Body() userDto: UserDto) {
    return this.userService.insertSystemAdmin(userDto);
  }
}
