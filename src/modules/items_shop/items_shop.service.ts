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
  ) { }

  async createItemFromGlobalItems(global_ids: string[], shop_ids: string[]) {
    try {
      const promises = global_ids.map(async (id) => {
        const response = await this.itemsGlobalModel.findById(id);
        const globalItems = response.toJSON();
        globalItems.shop_ids = shop_ids;
        console.log(1111,globalItems)
        const createdItem = new this.itemsShopModel(globalItems);
        return createdItem.save();
      });
      const createdItems = await Promise.all(promises);
      return createdItems;
    } catch (error) {
      throw new BadRequestException({error});
    }
  }

  async create(createItemDto: CreateItemDto, userId: string) {
    if (createItemDto.item_global_ids) {
      return this.createItemFromGlobalItems(createItemDto.item_global_ids, createItemDto.shop_ids);
    } else {
      const createdItem = new this.itemsShopModel(createItemDto);
      return createdItem.save();
    }
  }

  async findAll(): Promise<ItemShopDocument[]> {
    return await this.itemsShopModel.find().populate("shop_ids");
  }

  async findById(id: string): Promise<ItemShopDocument> {
    try {
      return this.itemsShopModel
        .findById(id)
        // .populate("variants")
        // .populate("components");
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
