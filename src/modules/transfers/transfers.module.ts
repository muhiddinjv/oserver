import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemGlobal,ItemGlobalSchema } from '../items_global/item_global.schema';
import { Shop, ShopSchema } from '../shops/shop.schema';
import { TransfersController } from './transfers.controller';
import { Transfer, TransferSchema } from './transfers.schema';
import { TransfersService } from './transfers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transfer.name, schema: TransferSchema }]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }])
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}