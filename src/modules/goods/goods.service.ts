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
    private goodsModel: Model<Good>,
    @InjectModel(Catalog?.name)
    private catalogsModel: Model<Catalog>
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

  // async updateGoods(goodDetails: any, quantity: number): Promise<Good> {
  //   const { name, price } = goodDetails;
  //   const product = await this.goodsModel.findOneAndUpdate(
  //     { name }, // Find a document with that filter
  //     {
  //       $inc: { quantity: quantity }, // Increment the quantity
  //       $set: { price: price }, // Set the price
  //     },
  //     { new: true, upsert: true } // Options: return the new document and create if not found
  //   );
  //   return product;
  // }

  async updateGoods(goodDetails: any, quantity: number, source: string): Promise<Good> {
    const { name, price } = goodDetails;
    let good = await this.goodsModel.findOne({ name });

    if (!good) {
      // good not found, create a new entry with the provided price point
      good = new this.goodsModel({
        name,
        quantity,
        pricePoints: [{ price, source }],
      });
      await good.save();
    } else {
      // Check if the price point from the wholesaler already exists
      const pricePointIndex = good.pricePoints.findIndex(pp => pp.source === source);

      if (pricePointIndex !== -1) {
        // Update the quantity for the existing price point
        good.pricePoints[pricePointIndex].quantity += quantity;
      } else {
        // Add a new price point
        good.pricePoints.push({ price, source, quantity });
      }

      await good.save();
    }

    return good;
  }


  async remove(id: string): Promise<GoodDocument> {
    return this.goodsModel.findByIdAndDelete(id)
  }
}
