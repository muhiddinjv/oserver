import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoptypeService } from './shoptype.service';
import { CreateShoptypeDto } from './dto/create-shoptype.dto';
import { UpdateShoptypeDto } from './dto/update-shoptype.dto';
import {ApiTags} from "@nestjs/swagger";
@ApiTags('shop')
@Controller('types')
export class ShoptypeController {
  constructor(private readonly shoptypeService: ShoptypeService) {}

  @Post()
  create(@Body() createShoptypeDto: CreateShoptypeDto) {
    return this.shoptypeService.create(createShoptypeDto);
  }

  @Get()
  findAll() {
    return this.shoptypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoptypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoptypeDto: UpdateShoptypeDto) {
    return this.shoptypeService.update(+id, updateShoptypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoptypeService.remove(+id);
  }
}
