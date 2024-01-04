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

import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';


@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Method: Create New Items' })
  @ApiOkResponse({
    description: 'The Items was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOperation({ summary: 'Method: Get All  Itemss' })
  @ApiOkResponse({
    description: 'The Itemss was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOperation({ summary: 'Method: Get Items by Id' })
  @ApiOkResponse({
    description: 'The Items was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update  Items' })
  @ApiOkResponse({
    description: 'The Items was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  
  @ApiOperation({ summary: 'Method: Delete  Items' })
  @ApiOkResponse({
    description: 'The Items was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
