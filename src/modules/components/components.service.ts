import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Components, ComponentsDocument } from './components.schema';
import { CreateComponentsDto } from './dto/create-components.dto';
import { UpdateComponentsDto } from './dto/update-components.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel(Components?.name)
    private ComponentsModel: Model<ComponentsDocument>,
  ) {}

  async create(
    createComponentsDto: CreateComponentsDto,
  ): Promise<ComponentsDocument> {
    const createdComponents = new this.ComponentsModel(createComponentsDto);
    return createdComponents.save();
  }

  async findAll(): Promise<ComponentsDocument[]> {
    return this.ComponentsModel.find().exec();
  }

  async findById(id: string): Promise<ComponentsDocument> {
    return this.ComponentsModel.findById(id);
  }

  async update(
    id: string,
    updateComponentsDto: UpdateComponentsDto,
  ): Promise<ComponentsDocument> {
    return this.ComponentsModel.findByIdAndUpdate(id, updateComponentsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ComponentsDocument> {
    return this.ComponentsModel.findByIdAndDelete(id).exec();
  }
}
