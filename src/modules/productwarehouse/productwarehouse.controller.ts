import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ProductwarehouseService } from './productwarehouse.service';
import { CreateProductwarehouseDto } from './dto/create-productwarehouse.dto';
import { UpdateProductwarehouseDto } from './dto/update-productwarehouse.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('warehouses')
@Controller('productwarehouses')
export class ProductwarehouseController {
  constructor(private readonly productwarehouseService: ProductwarehouseService) {}

  @Post()
  create(@Body() createProductwarehouseDto: CreateProductwarehouseDto) {
    return this.productwarehouseService.create(createProductwarehouseDto);
  }

  @Get()
  findAll() {
    return this.productwarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productwarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateProductwarehouseDto: UpdateProductwarehouseDto) {
    return this.productwarehouseService.update(+id, updateProductwarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productwarehouseService.remove(id);
  }
}
