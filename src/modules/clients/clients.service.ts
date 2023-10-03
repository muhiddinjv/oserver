import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {Repository} from "typeorm";
import {Clients} from "./entities/clients.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Shop} from "../shop/shop.entity";

import {ClientsGroup} from "../clientgroup/entities/clientgroup.entity";
import {Address} from "../common/address.entity";

@Injectable()
export class ClientsService {

  constructor(
      @InjectRepository(Clients)
      private repository:Repository<Clients>) {
  }
  async create(createClientDto: CreateClientDto) {
    const shop=await this.repository.manager.getRepository(Shop).createQueryBuilder("shop")
        .where("id=:id",{id:createClientDto.shop_id}).getOne();

    const address=await this.repository.manager.getRepository(Address)
                                                     .createQueryBuilder('address')
                                                     .where('id:id',{id:createClientDto.address_id})
                                                     .getOne();

    const clientgroup_id=await this.repository.manager
                                  .getRepository(ClientsGroup)
                                  .createQueryBuilder('clientgroup')
                                  .where('id=:id',{id:createClientDto.clientgroup_id})
                                  .getOne();
    console.log(address);
    // return this.repository.save([{}]);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({where:{id:id}});
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.repository.update({id:id},updateClientDto);
  }

  remove(id: number) {
    return this.repository.delete({id:id})
  }
}
