import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './shop.schema';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(User?.name) private UserModel: Model<UserDocument>,
    @InjectModel(Shop?.name) private ShopsModel: Model<ShopDocument>,
) {}  
  async create(createShopDto: CreateShopDto, userId: string) {
    // const User = await this.UserModel.findOne({ _id: userId })
    const createdShops = new this.ShopsModel({...createShopDto, owner: userId});
    // User.shops.push(createdShops.id)
    // User.save()
    return createdShops.save();
  }

  async findAll(): Promise<ShopDocument[]> {
    return this.ShopsModel.find().populate('owner_id')
  }

  async findById(id: string): Promise<ShopDocument> {
    return this.ShopsModel.findById(id);
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<ShopDocument> {
    return this.ShopsModel.findByIdAndUpdate(id, updateShopDto, {new: true}).exec();
  }

  async remove(id: string): Promise<ShopDocument> {
    return this.ShopsModel.findByIdAndDelete(id).exec();
  }
}
