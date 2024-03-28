import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill, Billschema } from './bill.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemShop, Itemschema } from '../items_shop/item_shop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: Billschema }]),
    MongooseModule.forFeature([{ name: ItemShop.name, schema: Itemschema }]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
