import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category?.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const createdCategory = new this.categoriesModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoriesModel.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'items',
          foreignField: '_id',
          as: 'itemsArr',
        },
      },
    ]);
  }

  async findById(id: string): Promise<CategoryDocument> {
    return this.categoriesModel.findById(id).populate('items');
  }

  async update(
    id: string,
    updateUserDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoriesModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CategoryDocument> {
    return this.categoriesModel.findByIdAndDelete(id).exec();
  }
}
