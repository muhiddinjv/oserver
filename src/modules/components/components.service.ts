import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../items/item.schema';
import { Variant, VariantDocument } from '../variants/variant.schema';
import { Component, ComponentDocument } from './component.schema';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel(Component?.name)
    private ComponentsModel: Model<ComponentDocument>,
    @InjectModel(Item?.name) private ItemsModel: Model<ItemDocument>,
    @InjectModel(Variant?.name) private VariantsModel: Model<VariantDocument>,
  ) {}

  async create(createComponentDto: CreateComponentDto) {
    const Variant = await this.VariantsModel.findById(
      createComponentDto?.variant_id,
    ).exec();
    if (!Variant) {
      throw new BadRequestException('Variant not found.');
    }
    const Items = await this.ItemsModel.findById(Variant?.item_id).exec();
    if (!Items) {
      throw new BadRequestException('Items not found.');
    }
    console.log(Items?.components);

    const createdComponents = new this.ComponentsModel(createComponentDto);

    Items?.components.push(createdComponents);
    createdComponents.save();
    Items.save();

    return createdComponents;
  }

  async findAll(): Promise<ComponentDocument[]> {
    return this.ComponentsModel.find().exec();
  }

  async findById(id: string): Promise<ComponentDocument> {
    return this.ComponentsModel.findById(id);
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
  ): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndUpdate(id, updateComponentDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndDelete(id).exec();
  }
}
