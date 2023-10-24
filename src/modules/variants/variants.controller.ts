import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly VariantsService: VariantsService) {}

  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.VariantsService.create(createVariantDto);
  }

  @Get()
  findAll() {
    return this.VariantsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.VariantsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.VariantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.VariantsService.remove(id);
  }
}
