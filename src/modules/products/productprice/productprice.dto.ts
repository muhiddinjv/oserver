import {Column, ManyToOne, OneToMany} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Products, Shop, PriceType} from "../../entities";

export class ProductpriceDto{
    @ApiProperty()
    priceType:PriceType;
    @ApiProperty()
    shop:Shop
    @ApiProperty()
    products:Products
    @ApiProperty()
    price_add_date:Date;
    @ApiProperty()
    currency:number;
    @ApiProperty()
    currency_symbol:string;
    @ApiProperty()
    buy_price:number;
    @ApiProperty()
    sell_price:number;
    @ApiProperty()
    price_is_active:boolean;
}
