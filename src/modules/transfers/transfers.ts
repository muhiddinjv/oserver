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

import { TransfersService } from './transfers.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('transfers')
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.transfersService.create(createItemDto);
  }
  @Get()
  findAll() {
    return this.transfersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transfersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.transfersService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transfersService.remove(id);
  }
}
