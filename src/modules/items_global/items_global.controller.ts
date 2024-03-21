import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ItemsService } from './items_global.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {ApiTags} from '@nestjs/swagger';
import { Public } from '../auth/auth.metadata';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from 'src/modules/roles/roles.enum';

@ApiTags('Items global')
@Controller('items_global')
@UseGuards(RolesGuard)
export class ItemsGlobalController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  // @Roles(Role.Admin)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
