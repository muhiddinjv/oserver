import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.RoleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.RoleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.RoleService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.RoleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(id);
  }
}