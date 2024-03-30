import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog,CatalogSchema } from '../catalogs/catalog.schema';
import { GoodsController } from './goods.controller';
import { Good, GoodSchema } from './good.schema';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Good.name, schema: GoodSchema }]),
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService],
})
export class GoodsModule {}