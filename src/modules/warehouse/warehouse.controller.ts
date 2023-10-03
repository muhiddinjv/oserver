import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WarehouseService} from "./warehouse.service";
import {CreateWarehouseDto} from "./dto/create-warehouse.dto";
import {UpdateWarehouseDto} from "./dto/update-warehouse.dto";

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {

    constructor(private wareshouseServ:WarehouseService) {
    }

    @Get()
    public getList(){
        return this.wareshouseServ.findAll()
    }

    @Post()
    public createWarehouse(@Body() createwarehouseDto:CreateWarehouseDto){
       return  this.wareshouseServ.create(createwarehouseDto)
    }

    @Patch(':id')
    public updateWarehouse(@Param('id',ParseIntPipe) id:number,@Body() updatewarehousedto:UpdateWarehouseDto){
        return this.wareshouseServ.update(id,updatewarehousedto);
    }

    @Delete(':id')
    public deleteWarehouse(@Param('id',ParseIntPipe) id:number){
        return this.wareshouseServ.remove(id);
    }
}
