import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { ItemGlobal,ItemGlobalSchema } from '../items_global/item_global.schema';
import { Shop, ShopSchema } from '../shops/shop.schema';
import { ItemsController } from './items_shop.controller';
import { ItemShop, Itemschema } from './item_shop.schema';
import { ItemsService } from './items_shop.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemShop.name, schema: Itemschema }]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsShopModule {}