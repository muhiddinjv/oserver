import { Controller, Get, Post, Delete, Put, Param, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Roles } from '../entities'
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@ApiTags('users')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) { }

  @Get()
  async findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Roles> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    } else {
      return role;
    }
  }

  @Post()
  async create(@Body() roles: CreateRoleDto): Promise<Roles> {
    return await this.roleService.create(roles);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() roles: UpdateRoleDto): Promise<Roles> {
    return this.roleService.update(id, roles);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    }
    return this.roleService.delete(id);
  }
}
