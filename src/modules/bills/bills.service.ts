import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BillsService {
  // constructor(@InjectModel(bill.name) private ticketModel: Model<Bill>) {}

  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  findAll() {
    return `This action returns all bills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(ticketData: number, updateBillDto: UpdateBillDto) {
    // return `This action updates a #${id} bill`;

    const billId = ticketData.id;
    const updatedItems = ticketData.items;

    // Retrieve the ticket from the database
    const ticket = await this.ticketModel.findById(billId);

    if (!ticket) {
        throw new Error('Ticket not found');
    }

    // Update the items in the ticket
    ticket.items = updatedItems;

    // Calculate the total price based on the updated items
    ticket.total = ticket.items.reduce((total, item) => total + item.price, 0);

    // Save the updated ticket back to the database
    const updatedTicket = await ticket.save();

    return updatedTicket;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
