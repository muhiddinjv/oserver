import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variants, VariantsDocument } from './variants.schema';
import { CreateVariantsDto } from './dto/create-variants.dto';
import { UpdateVariantsDto } from './dto/update-variants.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variants?.name)
    private VariantsModel: Model<VariantsDocument>,
  ) {}

  async create(
    createVariantsDto: CreateVariantsDto,
  ): Promise<VariantsDocument> {
    const createdVariants = new this.VariantsModel(createVariantsDto);
    return createdVariants.save();
  }

  async findAll(): Promise<VariantsDocument[]> {
    return this.VariantsModel.find().exec();
  }

  async findById(id: string): Promise<VariantsDocument> {
    return this.VariantsModel.findById(id);
  }

  async update(
    id: string,
    updateVariantsDto: UpdateVariantsDto,
  ): Promise<VariantsDocument> {
    return this.VariantsModel.findByIdAndUpdate(id, updateVariantsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<VariantsDocument> {
    return this.VariantsModel.findByIdAndDelete(id).exec();
  }
}
