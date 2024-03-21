import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsGlobalController } from './items_global.controller';
import { ItemGlobal, ItemGlobalSchema } from './item_global.schema';
import { ItemsService } from './items_global.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }])
  ],
  controllers: [ItemsGlobalController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsGlobalModule {}