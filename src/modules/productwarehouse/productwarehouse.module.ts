import { Module } from '@nestjs/common';
import { ProductwarehouseService } from './productwarehouse.service';
import { ProductwarehouseController } from './productwarehouse.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductWarehouse} from "./entities/productwarehouse.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ProductWarehouse])],
  controllers: [ProductwarehouseController],
  providers: [ProductwarehouseService],
  exports:[TypeOrmModule]
})
export class ProductwarehouseModule {}
