import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientgroupService } from './clientgroup.service';
import { CreateClientgroupDto } from './dto/create-clientgroup.dto';
import { UpdateClientgroupDto } from './dto/update-clientgroup.dto';
import {ApiBody, ApiTags} from "@nestjs/swagger";

@ApiTags('clients')
@Controller('clientgroup')
export class ClientgroupController {
  constructor(private readonly clientgroupService: ClientgroupService) {}

  @ApiBody({ type: [CreateClientgroupDto] })
  @Post()
  create(@Body() createClientgroupDto: CreateClientgroupDto) {
    return this.clientgroupService.create(createClientgroupDto);
  }

  @Get()
  findAll() {
    return this.clientgroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientgroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientgroupDto: UpdateClientgroupDto) {
    return this.clientgroupService.update(+id, updateClientgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientgroupService.remove(+id);
  }
}
