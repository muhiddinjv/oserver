import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shops, ShopsDocument } from './shops.schema';
import { CreateShopsDto } from './dto/create-shops.dto';
import { UpdateShopsDto } from './dto/update-shops.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shops?.name)
    private ShopsModel: Model<ShopsDocument>,
  ) {}

  async create(createShopsDto: CreateShopsDto) {
    const createdShops = new this.ShopsModel(createShopsDto);
    return createdShops.save();
  }

  async findAll(): Promise<ShopsDocument[]> {
    return this.ShopsModel.find().exec();
  }

  async findById(id: string): Promise<ShopsDocument> {
    return this.ShopsModel.findById(id);
  }

  async update(
    id: string,
    updateShopsDto: UpdateShopsDto,
  ): Promise<ShopsDocument> {
    return this.ShopsModel.findByIdAndUpdate(id, updateShopsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ShopsDocument> {
    return this.ShopsModel.findByIdAndDelete(id).exec();
  }
}
