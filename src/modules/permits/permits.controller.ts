import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Permitservice } from './permits.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

@ApiTags('Permits')
@Controller('permits')
export class PermitController {
  constructor(private readonly Permitservice: Permitservice) {}

  @ApiOperation({ summary: 'Method: Create New Permit' })
  @ApiOkResponse({
    description: 'The Permit was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createPermitDto: CreatePermitDto) {
    return this.Permitservice.create(createPermitDto);
  }

  @ApiOperation({ summary: 'Method: Get All  Permits' })
  @ApiOkResponse({
    description: 'The Permits was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.Permitservice.findAll();
  }

  @ApiOperation({ summary: 'Method: Get  Permit by Id' })
  @ApiOkResponse({
    description: 'The Permit was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.Permitservice.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update  Permit' })
  @ApiOkResponse({
    description: 'The Permit was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermitDto: UpdatePermitDto,
  ) {
    return this.Permitservice.update(id, updatePermitDto);
  }

  @ApiOperation({ summary: 'Method: Delete  Permit' })
  @ApiOkResponse({
    description: 'The Permit was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Permitservice.remove(id);
  }
}
