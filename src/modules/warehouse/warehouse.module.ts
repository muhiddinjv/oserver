import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Warehouse} from "./entity/warehouse.entity";
import {WarehouseController} from "./warehouse.controller";
import {WarehouseService} from "./warehouse.service";

@Module({
    imports:[TypeOrmModule.forFeature([Warehouse])],
    controllers:[WarehouseController],
    providers:[WarehouseService],
    exports:[TypeOrmModule]
})
export class WarehouseModule {}
