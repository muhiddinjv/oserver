import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.ShopsService.create(createShopDto);
  }

  @Get()
  findAll() {
    return this.ShopsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ShopsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.ShopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ShopsService.remove(id);
  }
}
