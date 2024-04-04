import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGoodDto } from "./dto/create-good.dto";
import { UpdateGoodDto } from "./dto/update-good.dto";
import { Good, GoodDocument } from "./good.schema";
import {
  Catalog,
  CatalogDocument,
} from "../catalog/catalog.schema";

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Good?.name)
    private goodsModel: Model<GoodDocument>,
    @InjectModel(Catalog?.name)
    private catalogsModel: Model<CatalogDocument>
  ) { }

  async copyItemFromCatalog(catalogIds: string[], userId: string) {
    try {
      const createdItems = await Promise.all(catalogIds.map(async (id) => {
        const catalogItem = await this.catalogsModel.findById(id);

        const newItemData = {
          ...catalogItem.toJSON(),
          userId,
          _id: undefined // generates new _id
        };
        console.log(newItemData)

        const existingItem = await this.goodsModel.findOne({ name: newItemData.name, userId });

        if (existingItem) {
          throw new Error(`This user already has [${newItemData.name}]`);
        }

        return this.goodsModel.create(newItemData);
      }));

      return createdItems;
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  async create(createGoodDto: CreateGoodDto, userId: string) {
    if (createGoodDto.catalogIds) {
      return this.copyItemFromCatalog(createGoodDto.catalogIds, userId);
    } else {
      const createdItem = new this.goodsModel(createGoodDto);
      createdItem.userId = userId;
      return createdItem.save();
    }
  }

  async findAll(userId: string): Promise<GoodDocument[]> {
    return await this.goodsModel.find({ userId });
    // return await this.goodsModel.find().populate("shopIds");
  }

  async findById(id: string): Promise<GoodDocument> {
    try {
      return this.goodsModel
        .findById(id)
      // .populate("variants")
      // .populate("components");
    } catch (error) {
      new BadRequestException("Good not found.");
    }
  }

  async update(
    id: string,
    updateGoodDto: UpdateGoodDto
  ): Promise<GoodDocument> {
    return this.goodsModel
      .findByIdAndUpdate(id, updateGoodDto, { new: true })
  }

  async remove(id: string): Promise<GoodDocument> {
    return this.goodsModel.findByIdAndDelete(id)
  }
}
