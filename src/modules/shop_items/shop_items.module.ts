import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { GlobalItem,GlobalItemSchema } from '../global_items/global_item.schema';
import { Shop, ShopSchema } from '../shops/shop.schema';
import { ItemsController } from './shop_items.controller';
import { ShopItem, Itemschema } from './shop_item.schema';
import { ItemsService } from './shop_items.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShopItem.name, schema: Itemschema }]),
    MongooseModule.forFeature([{ name: GlobalItem.name, schema: GlobalItemSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ShopItemsModule {}