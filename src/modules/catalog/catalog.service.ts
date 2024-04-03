import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog, CatalogDocument } from './catalog.schema';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog?.name)
    private catalogsModel: Model<CatalogDocument>
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    const createdItem = new this.catalogsModel(createCatalogDto);
    return createdItem.save();
  }

  async findAll(): Promise<CatalogDocument[]> {
    return await this.catalogsModel.aggregate([
      {
        $lookup: {
          from: 'variants',
          localField: 'variants',
          foreignField: '_id',
          as: 'variantsArr',
        },
      },
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
          foreignField: 'category_id',
          as: 'category_id',
        },
      },
    ]);
  }

  async findById(id: string): Promise<CatalogDocument> {
    try {
      return this.catalogsModel
        .findById(id)
        // .populate('variants')
        // .populate('components');
    } catch (error) {
      new BadRequestException('Catalog not found.');
    }
  }

  async findByreferenceId(id: string): Promise<CatalogDocument> {
    return this.catalogsModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<CatalogDocument> {
    return this.catalogsModel
      .findByIdAndUpdate(id, updateCatalogDto, { new: true })
  }

  async remove(id: string): Promise<CatalogDocument> {
    return this.catalogsModel.findByIdAndDelete(id)
  }
}
