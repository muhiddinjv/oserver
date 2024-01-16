import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemGlobal, ItemGlobalSchema } from '../items_global/item_global.schema';
import { Variant, VariantSchema } from '../variants/variant.schema';
import { ComponentsController } from './components.controller';
import { Component, ComponentSchema } from './component.schema';
import { ComponentsService } from './components.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
    ]),
    MongooseModule.forFeature([{ name: ItemGlobal.name, schema: ItemGlobalSchema }]),
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
