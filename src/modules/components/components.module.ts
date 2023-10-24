import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from '../products/products.schema';
import { Variants, VariantsSchema } from '../variants/variant.schema';
import { ComponentsController } from './components.controller';
import { Components, ComponentSchema } from './component.schema';
import { ComponentsService } from './components.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Components.name, schema: ComponentSchema },
    ]),
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Variants.name, schema: VariantsSchema },
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
