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
import { RolesGuard } from '../roles/roles.guard';
import { Roles,Role } from '../roles/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll(@Req() req: Request) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}