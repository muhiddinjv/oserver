import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bill, BillDocument } from './bill.schema';
import { Model } from 'mongoose';
import { Good, GoodDocument } from '../goods/good.schema';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill?.name) private billModel: Model<BillDocument>,
    @InjectModel(Good?.name) private goodsModel: Model<GoodDocument>,) { }

  async create(createBillDto: CreateBillDto, userId: string) {
    const bills = await Promise.all(createBillDto.goods.map(async item => {
      const { _id, name, price } = await this.goodsModel.findOne({ _id: item._id, userId: userId });
      console.log(111);
      console.log(_id, name, price);
      
      return {
        _id: String(_id),
        name, price, quantity: item.quantity,
        totalPrice: price * item.quantity
      };
    }));

    const createdBill = new this.billModel(createBillDto);
    createdBill.staffId = userId
    createdBill.goods = bills
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
    const billToUpdate = await this.billModel.findById(id);

    if (!billToUpdate) {
      throw new NotFoundException('Bill not found');
    }

    const updatedBill = updateBillDto.goods.map((item,index) => {
      const {price} = billToUpdate.goods.find(it => it._id === item._id);
      return {
        ...billToUpdate.goods[index],
        quantity: item.quantity,
        totalPrice: price * item.quantity
      }
    });

    billToUpdate.goods = updatedBill
    billToUpdate.totalPrices = billToUpdate.goods.reduce((total, item) => total + item.totalPrice, 0);
    return await billToUpdate.save();
  }

  async remove(id: number) {
    return this.billModel.findByIdAndDelete(id);
  }
}


