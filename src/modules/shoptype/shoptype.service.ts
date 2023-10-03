import { Injectable } from '@nestjs/common';
import { CreateShoptypeDto } from './dto/create-shoptype.dto';
import { UpdateShoptypeDto } from './dto/update-shoptype.dto';
import {Repository} from "typeorm";
import {Shoptype} from "./entities/shoptype.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ShoptypeService {

  constructor(
      @InjectRepository(Shoptype)
      private shoptypeRepo:Repository<Shoptype>) {
  }

  create(createShoptypeDto: CreateShoptypeDto) {
    return 'This action adds a new shoptype';
  }

  async findAll() {
    return await this.shoptypeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} shoptype`;
  }

  update(id: number, updateShoptypeDto: UpdateShoptypeDto) {
    return `This action updates a #${id} shoptype`;
  }

  remove(id: number) {
    return this.shoptypeRepo.delete({id})
  }



  public fillDefaultData=async()=>{
    if (this.shoptypeRepo.exist()) {
      return this.shoptypeRepo.save([
        {id: 1, name: "Savdo do`koni", status: 1},
        {id: 2, name: "Bozor", status: 1},
        {id: 3, name: "SuperMarket", status: 1},
        {id: 4, name: "MiniMarket", status: 1},
        {id: 5, name: "GiperMaker", status: 1}
      ]);
    }
  }
}
