import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Public } from '../auth/auth.metadata';
import { RolesGuard } from '../roles/roles.guard';
import { Roles, Role } from '../roles/roles.decorator';

@Controller('catalog')
@UseGuards(RolesGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.catalogService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id);
  }
}
