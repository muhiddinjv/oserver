import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../products/products.schema';
import { Variants, VariantsDocument } from '../variants/variant.schema';
import { Components, ComponentDocument } from './component.schema';
import { CreateComponentsDto } from './dto/create-components.dto';
import { UpdateComponentsDto } from './dto/update-components.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel(Components?.name)
    private ComponentsModel: Model<ComponentDocument>,
    @InjectModel(Products?.name) private ProductsModel: Model<ProductsDocument>,
    @InjectModel(Variants?.name) private VariantsModel: Model<VariantsDocument>,
  ) {}

  async create(createComponentsDto: CreateComponentsDto) {
    const Variant = await this.VariantsModel.findById(
      createComponentsDto?.variants_id,
    ).exec();
    if (!Variant) {
      throw new BadRequestException('Variant not found.');
    }
    const Products = await this.ProductsModel.findById(Variant?.item_id).exec();
    if (!Products) {
      throw new BadRequestException('Products not found.');
    }
    console.log(Products?.components);

    const createdComponents = new this.ComponentsModel(createComponentsDto);

    Products?.components.push(createdComponents);
    createdComponents.save();
    Products.save();

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
    updateComponentsDto: UpdateComponentsDto,
  ): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndUpdate(id, updateComponentsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndDelete(id).exec();
  }
}
