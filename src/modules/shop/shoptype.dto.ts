import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class ShoptypeDto {
  @ApiProperty()
  name: string;
}
