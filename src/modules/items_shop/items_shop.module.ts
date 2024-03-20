import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemGlobal,ItemGlobalSchema } from '../items_global/item_global.schema';
import { ItemsShopController } from './items_shop.controller';
import { ItemShop, Itemschema } from './item_shop.schema';
import { ItemsService } from './items_shop.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemShop.name, schema: Itemschema }]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
  ],
  controllers: [ItemsShopController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsShopModule {}