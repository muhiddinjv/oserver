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

  async createItemFromGlobalItems(global_ids: string[], user_id: string) {
    try {
      const createdItems = await Promise.all(global_ids.map(async (id) => {
        const globalItem = await this.itemsGlobalModel.findById(id);

        const newItemData = {
          ...globalItem.toJSON(),
          user_id,
          _id: undefined // generates new _id
        };

        const existingItem = await this.itemsShopModel.findOne({ name: newItemData.name, user_id });
        if (existingItem) {
          throw new Error(`This user already has: ${newItemData.name}`);
        }

        return this.itemsShopModel.create(newItemData);
      }));

      return createdItems;
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  async create(createItemDto: CreateItemDto, user_id: string) {
    if (createItemDto.item_global_ids) {
      return this.createItemFromGlobalItems(createItemDto.item_global_ids, user_id);
    } else {
      const createdItem = new this.itemsShopModel(createItemDto);
      createdItem.user_id = user_id;
      return createdItem.save();
    }
  }

  async findAll(userId: string): Promise<ItemShopDocument[]> {
    return await this.itemsShopModel.find({ user_id: userId });
    // return await this.itemsShopModel.find().populate("shop_ids");
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
  }

  async remove(id: string): Promise<ItemShopDocument> {
    return this.itemsShopModel.findByIdAndDelete(id)
  }
}
