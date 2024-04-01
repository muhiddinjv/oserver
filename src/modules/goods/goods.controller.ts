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

import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Goods')
@Controller('goods')
export class GoodsController {
  constructor(
    private readonly goodsService: GoodsService
  ) { }

  @Post()
  create(@Body() createGoodDto: CreateGoodDto, @Req() req: Request) {
    return this.goodsService.create(createGoodDto, String(req['user']['sub']));
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.goodsService.findAll(String(req['user']['sub']));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.goodsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(id, updateGoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id);
  }
}
