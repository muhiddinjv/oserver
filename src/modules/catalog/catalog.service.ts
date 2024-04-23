import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog, CatalogDocument } from './catalog.schema';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog?.name)
    private catalogModel: Model<CatalogDocument>
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    const itemExists = await this.catalogModel.exists({ name: createCatalogDto.name });
    if (itemExists) {
      throw new ConflictException([{field: 'item', text: 'Item with that name already exists'}]);
    }
    const createdItem = new this.catalogModel(createCatalogDto);
    return createdItem.save();
  }

  async findAll(): Promise<CatalogDocument[]> {
    await this.catalogModel.aggregate([
      {
        $lookup: {
          from: 'components',
          localField: 'components',
          foreignField: '_id',
          as: 'componentsArr',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: 'categoryId',
          as: 'categoryId',
        },
      },
    ]);
    return await this.catalogModel.find();
  }

  async findById(id: string): Promise<CatalogDocument> {
    try {
      return this.catalogModel
        .findById(id)
        // .populate('variants')
        // .populate('components');
    } catch (error) {
      new BadRequestException('Catalog not found.');
    }
  }

  async update(
    id: string,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<CatalogDocument> {
    return this.catalogModel
      .findByIdAndUpdate(id, updateCatalogDto, { new: true })
  }

  async remove(id: string): Promise<CatalogDocument> {
    return this.catalogModel.findByIdAndDelete(id)
  }
}
