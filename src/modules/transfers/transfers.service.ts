import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../categories/category.schema';
import { Variant, VariantDocument } from '../variants/variant.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Transfer, TransferDocument } from './transfers.schema';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer?.name)
    private itemsModel: Model<TransferDocument>,
    @InjectModel(Category?.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // console.log(Item?.name, 'name')
    const createdItem = new this.itemsModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<TransferDocument[]> {
    return await this.itemsModel.find().populate('shop_id').populate('global_item_id')
  }

  async findById(id: string): Promise<TransferDocument> {
    try {
      return this.itemsModel
        .findById(id)
        .populate('variants')
        .populate('components');
    } catch (error) {
      new BadRequestException('Item not found.');
    }
  }

  async findByreferenceId(id: string): Promise<TransferDocument> {
    return this.itemsModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<TransferDocument> {
    return this.itemsModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<TransferDocument> {
    return this.itemsModel.findByIdAndDelete(id).exec();
  }
}
