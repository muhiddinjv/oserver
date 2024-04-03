import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill, Billschema } from './bill.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Good, GoodSchema } from '../goods/good.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: Billschema }]),
    MongooseModule.forFeature([{ name: Good.name, schema: GoodSchema }]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
