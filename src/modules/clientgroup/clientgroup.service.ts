import { Injectable } from '@nestjs/common';
import { CreateClientgroupDto } from './dto/create-clientgroup.dto';
import { UpdateClientgroupDto } from './dto/update-clientgroup.dto';
import {Repository} from "typeorm";
import {ClientsGroup} from "./entities/clientgroup.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ClientgroupService {

  constructor(
      @InjectRepository(ClientsGroup)
      private repository:Repository<ClientsGroup>) {
  }
  async create(createClientgroupDto: CreateClientgroupDto) {
    return await this.repository.save(createClientgroupDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where:{id:id}});
  }

  update(id: number, updateClientgroupDto: UpdateClientgroupDto) {
    return this.repository.update({id:id},updateClientgroupDto);
  }

  remove(id: number) {
    return this.repository.delete({id:id})
  }
}
