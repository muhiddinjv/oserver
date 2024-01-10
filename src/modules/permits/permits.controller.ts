import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permitservice } from './permits.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

@ApiTags('Permits')
@Controller('permits')
export class PermitController {
  constructor(private readonly Permitservice: Permitservice) { }

  @Post()
  create(@Body() createPermitDto: CreatePermitDto) {
    return this.Permitservice.create(createPermitDto);
  }

  @Get()
  findAll() {
    return this.Permitservice.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.Permitservice.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermitDto: UpdatePermitDto,
  ) {
    return this.Permitservice.update(id, updatePermitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Permitservice.remove(id);
  }
}
