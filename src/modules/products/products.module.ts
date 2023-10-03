import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ProductpriceModule } from './productprice/productprice.module';
import {ProductsService} from "./products.service";
import {ProductsController} from "./products.controller";
import {Products} from "./products.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Products]), ProductpriceModule],
    controllers:[ProductsController],
    providers:[ProductsService],
    exports:[TypeOrmModule]
})
export class ProductsModule {}
