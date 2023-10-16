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

import { AccessTokenGuard } from 'src/common/guards/acessToken.guard';
import { VariantsService } from './variants.service';
import { CreateVariantsDto } from './dto/create-variants.dto';
import { UpdateVariantsDto } from './dto/update-variants.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly VariantsService: VariantsService) {}

  @Post()
  create(@Body() createVariantsDto: CreateVariantsDto) {
    return this.VariantsService.create(createVariantsDto);
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
    @Body() updateVariantsDto: UpdateVariantsDto,
  ) {
    return this.VariantsService.update(id, updateVariantsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.VariantsService.remove(id);
  }
}
