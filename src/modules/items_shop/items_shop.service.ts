import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemShop, ItemShopDocument } from "./item_shop.schema";
import {
  ItemGlobal,
  ItemGlobalDocument,
} from "../items_global/item_global.schema";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ItemShop?.name)
    private itemsShopModel: Model<ItemShopDocument>,
    @InjectModel(ItemGlobal?.name)
    private itemsGlobalModel: Model<ItemGlobalDocument>
  ) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemsShopModel(createItemDto);
    return createdItem.save();
  }

  async addToShop(ids: string[]) {
    try {
      const x = ids.map(async (id) => await this.itemsGlobalModel.findById(id));
      console.log(x)
      
    } catch (error) {
      new BadRequestException("Item not found.");
    }
  }

  async findAll(): Promise<ItemShopDocument[]> {
    return await this.itemsShopModel.find().populate("shop");
    // .populate("item_global");
  }

  async findById(id: string): Promise<ItemShopDocument> {
    try {
      return this.itemsShopModel
        .findById(id)
        .populate("variants")
        .populate("components");
    } catch (error) {
      new BadRequestException("Item not found.");
    }
  }

  async findByreferenceId(id: string): Promise<ItemShopDocument> {
    return this.itemsShopModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto
  ): Promise<ItemShopDocument> {
    return this.itemsShopModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ItemShopDocument> {
    return this.itemsShopModel.findByIdAndDelete(id).exec();
  }
}
