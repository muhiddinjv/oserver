import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemsDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';
import { Items, ItemsDocument } from './items.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items?.name)
    private itemsModel: Model<ItemsDocument>,
  ) {}

  async create(createItemsDto: CreateItemsDto): Promise<ItemsDocument> {
    const createdUser = new this.itemsModel(createItemsDto);
    return createdUser.save();
  }

  async findAll(): Promise<ItemsDocument[]> {
    return this.itemsModel.find().exec();
  }

  async findById(id: string): Promise<ItemsDocument> {
    return this.itemsModel.findById(id);
  }

  async update(
    id: string,
    updateItemsDto: UpdateItemsDto,
  ): Promise<ItemsDocument> {
    return this.itemsModel
      .findByIdAndUpdate(id, updateItemsDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ItemsDocument> {
    return this.itemsModel.findByIdAndDelete(id).exec();
  }
}
