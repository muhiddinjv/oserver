import { Column, ManyToOne, Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Model, Shop, Categories, Brands, ProductGroup, ProductPrice, Units} from "../entities";

export class ProductsDto {
  @ApiProperty()
  product_sku: number;
  @ApiProperty()
  product_qrcode_id: number;
  @ApiProperty()
  product_type: number;
  @ApiProperty()
  categories_id: number;
  @ApiProperty()
  productgroup_id: number;
  @ApiProperty()
  brand_id:number ;
  @ApiProperty()
  shop_id: number;
  @ApiProperty()
  productprice_id: number;
  @ApiProperty()
  unit_id:number ;
  @ApiProperty()
  product_name: string;
  @ApiProperty()
  product_image: string;
  @ApiProperty()
  product_cost: number;
  @ApiProperty()
  product_price: number;
  @ApiProperty()
  product_qty: number;
  @ApiProperty()
  product_qty_pack: number;

  @ApiProperty()
  product_low_limit: number;
  @ApiProperty()
  product_enable_stock: boolean;
  @ApiProperty()
  product_status: number;
}
