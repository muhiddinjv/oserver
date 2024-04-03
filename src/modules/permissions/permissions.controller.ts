import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { Permissions } from "../entities";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('users')
@Controller('permissions')
export class PermissionsController {

    constructor(private permissionService: PermissionsService) { }

    @Get()
    async findAll() {
        return this.permissionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Permissions> {
        const permission = await this.permissionService.findOne(id);
        if (!permission) {
            throw new Error('Permission not found');
        } else {
            return permission;
        }
    }

    @Post()
    async create(@Body() permissions: CreatePermissionDto): Promise<Permissions> {
        return await this.permissionService.create(permissions);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() permissions: UpdatePermissionDto): Promise<Permissions> {
        return this.permissionService.update(id, permissions);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const permission = await this.permissionService.findOne(id);
        if (!permission) {
            throw new Error('Permission not found');
        }
        return this.permissionService.delete(id);
    }
}
