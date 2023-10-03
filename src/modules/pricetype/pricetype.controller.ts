import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricetypeService } from './pricetype.service';
import { CreatePricetypeDto } from './dto/create-pricetype.dto';
import { UpdatePricetypeDto } from './dto/update-pricetype.dto';

@Controller('pricetype')
export class PricetypeController {
  constructor(private readonly pricetypeService: PricetypeService) {}

  @Post()
  create(@Body() createPricetypeDto: CreatePricetypeDto) {
    return this.pricetypeService.create(createPricetypeDto);
  }

  @Get()
  findAll() {
    return this.pricetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricetypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricetypeDto: UpdatePricetypeDto) {
    return this.pricetypeService.update(+id, updatePricetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricetypeService.remove(+id);
  }
}
