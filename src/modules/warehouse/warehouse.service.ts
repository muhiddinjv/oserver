import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Warehouse} from "./entity/warehouse.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateWarehouseDto} from "./dto/create-warehouse.dto";
import {UpdateWarehouseDto} from "./dto/update-warehouse.dto";


@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private repository:Repository<Warehouse>) {
    }

    public async findAll(){
        return await this.repository.find({relations:['shop']});
    }

    async create(createwreahouseDto: CreateWarehouseDto) {
        return await this.repository.save(createwreahouseDto)
    }

    async update(id:number,updatewarehousedto:UpdateWarehouseDto){
        return await this.repository.update({id:id},updatewarehousedto)
    }

    async remove(id:number){
        return await this.repository.delete({id:id})
    }
}
