import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ShoptypeDto } from './shoptype.dto';

export class ShopDto {
  @ApiProperty()
  shoptype: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  shop_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  owner_name: string;

  @ApiProperty()
  shop_latitude: string;

  @ApiProperty()
  shop_longtitude: string;
}
