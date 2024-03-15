import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';

import { ItemsService } from './items_shop.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Items shop')
@Controller('items_shop')
export class ItemsShopController {
  constructor(
    private readonly itemsService: ItemsService
  ) { }

  @Post()
  create(@Body() createItemDto: CreateItemDto, @Req() req: Request) {
    return this.itemsService.create(createItemDto, String(req['user']['sub']));
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
