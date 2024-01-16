import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly ComponentsService: ComponentsService) {}

  @Post()
  async create(@Body() createComponentsDto: CreateComponentDto) {
    return await this.ComponentsService.create(createComponentsDto);
  }

  @Get()
  findAll() {
    return this.ComponentsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ComponentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentsDto: UpdateComponentDto,
  ) {
    return this.ComponentsService.update(id, updateComponentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ComponentsService.remove(id);
  }
}
