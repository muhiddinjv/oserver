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

import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) { }

  @ApiBearerAuth()
  @Post()
  async create(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    return await this.ShopsService.create(createShopDto, String(req['user']['sub']));
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
