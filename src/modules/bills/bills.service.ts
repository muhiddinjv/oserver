import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bill, BillDocument } from './bill.schema';
import { Model } from 'mongoose';
import { ItemShop, ItemShopDocument } from '../items_shop/item_shop.schema';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill?.name) private billModel: Model<BillDocument>,
    @InjectModel(ItemShop?.name) private itemsShopModel: Model<ItemShopDocument>,) { }

  async create(createBillDto: CreateBillDto, userId: string) {
    const bills = await Promise.all(createBillDto.lineItems.map(async item => {
      const { _id, name, price } = await this.itemsShopModel.findOne({ _id: item._id, user_id: userId });
      
      return {
        _id: String(_id),
        name, price, quantity: item.quantity,
        totalPrice: price * item.quantity
      };
    }));

    const createdBill = new this.billModel(createBillDto);
    createdBill.staffId = userId
    createdBill.lineItems = bills
    createdBill.totalPrices = bills.reduce((total, item) => total + item.totalPrice, 0);

    return createdBill.save();
  }

  async findAll(userId: string): Promise<BillDocument[]> {
    return this.billModel.find({ staffId: userId });
  }

  async findOne(id: string): Promise<BillDocument> {
    const bill = this.billModel.findById(id);
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    return bill
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const updatedBill = await this.billModel.findById(id);

    if (!updatedBill) {
      throw new NotFoundException('Bill not found');
    }

    // Update the items in the bill
    updatedBill.lineItems = updateBillDto.lineItems.map(item => {
      const {price} = updatedBill.lineItems.find(it => it._id === item._id);
      return {
        ...item,
        totalPrice: price * item.quantity
      }
    });

    // Calculate the total price based on the updated items
    updatedBill.totalPrices = updatedBill.lineItems.reduce((total, item) => total + item.totalPrice, 0);

    // Save the updated bill back to the database
    console.log(updatedBill)
    // return await updatedBill.save();
  }

  async remove(id: number) {
    return this.billModel.findByIdAndDelete(id);
  }
}


