import { Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BrandsDto {
  @ApiProperty()
  shop_id: number;
  @ApiProperty()
  brand_name: string;
  @ApiProperty()
  brand_image: string;
  @ApiProperty()
  brand_status: boolean;
}
