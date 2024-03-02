import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Transfer, TransferDocument } from "./transfers.schema";

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer?.name)
    private transfersModel: Model<TransferDocument>
  ) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = new this.transfersModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<TransferDocument[]> {
    return await this.transfersModel
      .find()
      .populate("sender_id")
      .populate("receiver_id")
      .populate("items.items_global_id")
      .populate("items.items_shop_id");
  }

  async findById(id: string): Promise<TransferDocument> {
    try {
      return this.transfersModel
        .findById(id)
        // .populate("variants")
        // .populate("components");
    } catch (error) {
      new BadRequestException("Item not found.");
    }
  }

  async findByreferenceId(id: string): Promise<TransferDocument> {
    return this.transfersModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto
  ): Promise<TransferDocument> {
    return this.transfersModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<TransferDocument> {
    return this.transfersModel.findByIdAndDelete(id).exec();
  }
}
