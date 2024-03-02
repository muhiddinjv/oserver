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

  async create(createItemDto: CreateItemDto) {
    if (createItemDto.item_global_ids) {
      try {
        const promises = createItemDto.item_global_ids.map(async (id) => {
          const response = await this.itemsGlobalModel.findById(id);
          const globalItems = response.toJSON();
          globalItems.shop = createItemDto.shop
          const createdItem = new this.itemsShopModel(globalItems);
          return createdItem.save();
        });

        const createdItems = await Promise.all(promises);
        console.log(111, createdItems)
        return createdItems;
      } catch (error) {
        throw new BadRequestException();
      }
    }

    const createdItem = new this.itemsShopModel(createItemDto);
    console.log(222, createdItem)
    return createdItem.save();
  }

  async findAll(): Promise<ItemShopDocument[]> {
    return await this.itemsShopModel.find().populate("shop");
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
