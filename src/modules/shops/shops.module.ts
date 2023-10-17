import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Variants, VariantsSchema } from '../variants/variants.schema';
import { ShopsController } from './shops.controller';
import { Shops, ShopsSchema } from './shops.schema';
import { ShopsService } from './shops.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shops.name, schema: ShopsSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
