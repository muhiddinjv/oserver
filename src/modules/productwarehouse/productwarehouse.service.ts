import { Injectable } from '@nestjs/common';
import { CreateProductwarehouseDto } from './dto/create-productwarehouse.dto';
import { UpdateProductwarehouseDto } from './dto/update-productwarehouse.dto';
import {Repository} from "typeorm";
import {ProductWarehouse} from "./entities/productwarehouse.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductwarehouseService {

    constructor(
        @InjectRepository(ProductWarehouse)
        private repository:Repository<ProductWarehouse>) {
    }
  create(createProductwarehouseDto: CreateProductwarehouseDto) {
    return this.repository.save(createProductwarehouseDto)
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where:{id:id}})
  }

  update(id: number, updateProductwarehouseDto: UpdateProductwarehouseDto) {
    return this.repository.update({id:id},updateProductwarehouseDto);
  }

  remove(id: number) {
    return this.repository.delete({id:id})
  }
}
