import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items/items.module';
import { Item, Itemschema } from '../items/item.schema';
import { VariantsController } from './variants.controller';
import { Variant, VariantSchema } from './variant.schema';
import { VariantsService } from './variants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
    ]),
    MongooseModule.forFeature([{ name: Item.name, schema: Itemschema }]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
