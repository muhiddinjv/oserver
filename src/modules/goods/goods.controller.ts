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
import { GetCurrentUserId } from 'src/shared/decorators';

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
  findAll(@GetCurrentUserId() userId: string) {
    return this.goodsService.findAll(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.goodsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(id, updateGoodDto);
  }

  @Post('update-goods')
  updateGoods(@Body() goodDetails: any, @Body('quantity') quantity: number, @Body('source') source: string): Promise<any> {
    return this.goodsService.updateGoods(goodDetails, quantity, source);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id);
  }
}
