import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { ItemGlobal,ItemGlobalSchema } from '../items_global/item_global.schema';
import { Shop, ShopSchema } from '../shops/shop.schema';
import { TransfersController } from './transfers';
import { Transfer, TransferSchema } from './transfers.schema';
import { TransfersService } from './transfers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transfer.name, schema: TransferSchema }]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}