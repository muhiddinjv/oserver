import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductPrice} from "./productprice.entity";
import {ProductpriceController} from "./productprice.controller";
import {ProductpriceService} from "./productprice.service";


@Module({
    imports:[TypeOrmModule.forFeature([ProductPrice])],
    controllers:[ProductpriceController],
    providers:[ProductpriceService],
    exports:[TypeOrmModule]
})
export class ProductpriceModule {}
