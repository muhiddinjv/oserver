import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/strategies/access-token/acess-token.guard';
import { AbilitiesGuard } from 'src/modules/auth/ability/ability.guard';
import { CheckAbilites, ReadUserAbility } from 'src/modules/auth/ability/ability.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    req.user['sub']
    return this.usersService.create(createUserDto)
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AbilitiesGuard)
  @UseGuards(AccessTokenGuard)
  // @CheckAbilites(new ReadUserAbility())
  findAll(@Req() req: Request) {
    return this.usersService.findAll();
  }


  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}