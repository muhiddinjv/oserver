import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../categories/category.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemGlobal, ItemDocument } from './item_global.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ItemGlobal?.name)
    private itemsModel: Model<ItemDocument>,
    @InjectModel(Category?.name)
      
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const category = await this.categoriesModel
      .findById(createItemDto?.category_id)
      .exec();
    if (!category) {
      throw new BadRequestException('category not found.');
    }
    const createdItem = new this.itemsModel(createItemDto);
    // category?.items.push(createdItem);
    // await category.save();
    return createdItem.save();
  }

  async findAll(): Promise<ItemDocument[]> {
    return await this.itemsModel.aggregate([
      {
        $lookup: {
          from: 'variants',
          localField: 'variants',
          foreignField: '_id',
          as: 'variantsArr',
        },
      },
      // {
      //   $lookup: {
      //     from: 'components',
      //     localField: 'components',
      //     foreignField: '_id',
      //     as: 'componentsArr',
      //   },
      // },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: 'category_id',
          as: 'category_id',
        },
      },
    ]);
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
