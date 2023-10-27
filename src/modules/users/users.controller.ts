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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @ApiOperation({ summary: 'Method: Create New User' })
  @ApiOkResponse({
    description: 'The user was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Method: returns current user' })
  @ApiOkResponse({
    description: 'The user was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Method: returns one user' })
  @ApiOkResponse({
    description: 'The user was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update current user' })
  @ApiOkResponse({
    description: 'The user was Uodated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Method: Delete current user' })
  @ApiOkResponse({
    description: 'The user was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}