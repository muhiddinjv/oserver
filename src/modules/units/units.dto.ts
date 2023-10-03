import { Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Products, Shop } from '../entities';
import { ShopDto } from '../shop/shop.dto';

export class UnitsDto {
  @ApiProperty()
  unit_name: string;

  @ApiProperty()
  short_name: string;

  @ApiProperty()
  base_unit: number;

  @ApiProperty()
  operator: string;

  @ApiProperty()
  operator_value: number;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  shop: string;
}
