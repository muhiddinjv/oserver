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
import { CreateShopsDto } from './dto/create-shops.dto';
import { UpdateShopsDto } from './dto/update-shops.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}

  @Post()
  async create(@Body() createShopsDto: CreateShopsDto) {
    return await this.ShopsService.create(createShopsDto);
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
  update(@Param('id') id: string, @Body() updateShopsDto: UpdateShopsDto) {
    return this.ShopsService.update(id, updateShopsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ShopsService.remove(id);
  }
}
