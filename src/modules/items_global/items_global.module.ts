import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { ItemsController } from './items_global.controller';
import { ItemGlobal, ItemGlobalSchema } from './item_global.schema';
import { ItemsService } from './items_global.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}