import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant, VariantDocument } from './variant.schema';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { GlobalItem, ItemDocument } from '../global_items/global_item.schema';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variant?.name) private VariantsModel: Model<VariantDocument>,
    @InjectModel(GlobalItem?.name) private ItemsModel: Model<ItemDocument>,
  ) {}

  async create(
    createVariantDto: CreateVariantDto,
  ): Promise<VariantDocument> {
    const Item = await this.ItemsModel.findById(
      createVariantDto?.item_id,
    ).exec();
    if (!Item) {
      throw new BadRequestException('Item not found.');
    }
    const createdVariant = new this.VariantsModel(createVariantDto);
    Item?.variants.push(createdVariant);

    await createdVariant.save();
    await Item.save();
    return createdVariant;
  }

  async findAll(): Promise<VariantDocument[]> {
    return this.VariantsModel.find().exec();
  }

  async findById(id: string): Promise<VariantDocument> {
    return this.VariantsModel.findById(id);
  }

  async update(
    id: string,
    updateVariantDto: UpdateVariantDto,
  ): Promise<VariantDocument> {
    return this.VariantsModel.findByIdAndUpdate(id, updateVariantDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<VariantDocument> {
    return this.VariantsModel.findByIdAndDelete(id).exec();
  }
}
