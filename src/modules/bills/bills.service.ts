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
    const itemsIds = createBillDto.items.map(item => item.id);

    // Fetch all items in one query using populate
    const items = await this.itemsShopModel.find({ _id: { $in: itemsIds }, user_id: userId });

    const newBills = items.map(item => {
      const { name, price } = item;
      const foundItem = createBillDto.items.find(i => i.id === item._id);
      const quantity = foundItem ? foundItem.quantity : 0; // Check if foundItem is not undefined
      return {
          name,
          price,
          quantity,
          total: price * quantity
      };
    });

    console.log(newBills);
    // Continue with the rest of the logic
    // const createdBill = new this.billModel(createBillDto);
    // createdBill.staff_id = userId;
    // return createdBill.save();
  }

  async findAll(userId: string): Promise<BillDocument[]> {
    return this.billModel.find({ staff_id: userId });
  }

  async findOne(id: string): Promise<BillDocument> {
    const bill = this.billModel.findById(id);
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    return bill
  }

  async update(id: string, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billModel.findById(id);

    if (!bill) {
      throw new NotFoundException('Bill not found');
    }

    // Update the items in the bill
    // bill.items = updateBillDto.items;

    // Calculate the total price based on the updated items
    bill.total_price = bill.items.reduce((total, item) => total + item.price, 0);

    // Save the updated bill back to the database
    return await bill.save();
  }

  async remove(id: number) {
    return this.billModel.findByIdAndDelete(id);
  }
}


