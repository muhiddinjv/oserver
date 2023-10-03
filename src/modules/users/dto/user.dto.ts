import { isInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Regions } from '../../entities';

export class UserDto {
  @IsString()
  @ApiProperty()
  businessname: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  role: string;

  @ApiProperty()
  region: Regions[];
}
