import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Components, ComponentsSchema } from '../components/components.schema';
import { Variants, VariantsSchema } from '../variants/variants.schema';
import { ItemsController } from './items.controller';
import { Items, ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
