import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type ItemDocument = ShopItem & Document;

@Schema({ collection: 'shop_items' })
export class ShopItem {
  @Prop({ maxlength: 64, default: 0, required: true})
  price: number;

  @Prop({default: 0, required: true})
  cost: number;

  @Prop({default: 0, required: true})
  count: number;

  @Prop({ ref:'GlobalItem', type: Types.ObjectId, required: true })
  global_item_id: { type: Types.ObjectId };

  @Prop({ ref:'Shop', type: Types.ObjectId, required: true })
  shop_id: { type: Types.ObjectId };

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({type: Date, required: false})
  expire_date: Date

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const Itemschema = SchemaFactory.createForClass(ShopItem).set(
  'versionKey',
  false,
);
