import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../roles/role.schema';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

import { Permit, PermitDocument } from './permit.schema';



@Injectable()
export class Permitservice {
  constructor(
    @InjectModel(Permit?.name)
    private PermitModel: Model<PermitDocument>,
    @InjectModel(Role?.name)
    private RoleModel: Model<RoleDocument>
  ) {}

    async create(createPermitDto: CreatePermitDto) {
 
    const createdPermit = new this.PermitModel(createPermitDto);
    const role = await this.RoleModel.findById(createPermitDto.role_id)
    role.permit.push(createdPermit)

    role.save()
    return createdPermit.save();
  }

  async findAll(): Promise<PermitDocument[]> {
    return await this.PermitModel.find()
  }

  async findById(id: string): Promise<PermitDocument> {
    try {
      return this.PermitModel
        .findById(id)
        
    } catch (error) {
      new BadRequestException('Permit not found.');
    }
  }

 
  async update(
    id: string,
    updatePermitDto: UpdatePermitDto,
  ): Promise<PermitDocument> {
    return this.PermitModel
      .findByIdAndUpdate(id, updatePermitDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PermitDocument> {
    return this.PermitModel.findByIdAndDelete(id).exec();
  }
}
