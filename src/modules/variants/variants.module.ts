import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items_global/items_global.module';
import { ItemGlobal, ItemGlobalSchema } from '../items_global/item_global.schema';
import { VariantsController } from './variants.controller';
import { Variant, VariantSchema } from './variant.schema';
import { VariantsService } from './variants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
    ]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
