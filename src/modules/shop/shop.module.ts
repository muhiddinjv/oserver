import { Module } from '@nestjs/common';

import {TypeOrmModule} from "@nestjs/typeorm";

import {Shop} from "./shop.entity";
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import {Shoptype} from "../shoptype/entities/shoptype.entity";
import {ShoptypeService} from "../shoptype/shoptype.service";


@Module({
    imports:[TypeOrmModule.forFeature([Shop,Shoptype])],
    controllers:[ShopController],
    providers:[ShopService,ShoptypeService],
    exports:[TypeOrmModule]
})
export class ShopModule {}
