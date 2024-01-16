import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../global_items/global_items.module';
import { GlobalItem, GlobalItemSchema } from '../global_items/global_item.schema';
import { VariantsController } from './variants.controller';
import { Variant, VariantSchema } from './variant.schema';
import { VariantsService } from './variants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
    ]),
    MongooseModule.forFeature([{ name: GlobalItem.name, schema: GlobalItemSchema }]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
