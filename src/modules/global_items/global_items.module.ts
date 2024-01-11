import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { ItemsController } from './global_items.controller';
import { GlobalItem, GlobalItemSchema } from './global_item.schema';
import { ItemsService } from './global_items.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GlobalItem.name, schema: GlobalItemSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}