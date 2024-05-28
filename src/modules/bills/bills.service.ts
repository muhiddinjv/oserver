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
    @InjectModel(Bill?.name) private billsModel: Model<BillDocument>,
    @InjectModel(Good?.name) private goodsModel: Model<GoodDocument>,) { }

  async create(createBillDto: CreateBillDto, userId: string) {
    const bills = await Promise.all(createBillDto.goods.map(async item => {
      const { _id, title, price } = await this.goodsModel.findOne({ _id: item._id });
      return {
        _id: String(_id),
        title, price, quantity: item.quantity,
        totalPrice: price * item.quantity
      };
    }));

    const createdBill = new this.billsModel(createBillDto);
    createdBill.buyer = createBillDto.buyer
    createdBill.staff = userId
    createdBill.goods = bills
    createdBill.grandTotal = bills.reduce((total, item) => total + item.totalPrice, 0);

    return createdBill.save();
  }

  async findAll(userId: string): Promise<BillDocument[]> {
    return this.billsModel.find({ staffId: userId });
  }

  async findOne(id: string): Promise<BillDocument> {
    const bill = await this.billsModel
      .findById(id)
      .populate('buyer')
      .populate('staff');

    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    return bill
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const billToUpdate = await this.billsModel.findById(id);

    if (!billToUpdate) {
      throw new NotFoundException([{field: 'bill', text: 'Bill not found'}]);
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
    billToUpdate.grandTotal = billToUpdate.goods.reduce((total, item) => total + item.totalPrice, 0);
    return await billToUpdate.save();
  }

  async remove(id: number) {
    return this.billsModel.findByIdAndDelete(id);
  }
}


