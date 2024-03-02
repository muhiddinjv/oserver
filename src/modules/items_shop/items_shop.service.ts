import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemShop, ItemDocument } from './item_shop.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ItemShop?.name)
    private itemsModel: Model<ItemDocument>
  ) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemsModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<ItemDocument[]> {
    return await this.itemsModel.find().populate('shop').populate('item_global')
  }

  async findById(id: string): Promise<ItemDocument> {
    try {
      return this.itemsModel
        .findById(id)
        .populate('variants')
        .populate('components');
    } catch (error) {
      new BadRequestException('Item not found.');
    }
  }

  async findByreferenceId(id: string): Promise<ItemDocument> {
    return this.itemsModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ItemDocument> {
    return this.itemsModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ItemDocument> {
    return this.itemsModel.findByIdAndDelete(id).exec();
  }
}
