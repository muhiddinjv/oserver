import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type ItemDocument = Item & Document;

@Schema({ collection: 'items' })
export class Item {
  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  cost: number;

  @Prop()
  count: number;

  @Prop({ required: true })
  shape: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  pricing_type: PricingType;

  @Prop({ type: [{ type: Types.ObjectId }] })
  variants: Variant[];

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: true })
  available_for_sale: boolean;

  @Prop({ default: null })
  optimal_stock: number;

  @Prop({ default: null })
  low_stock: number;

  @Prop({ default: false })
  sold_by_weight: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Components' }] })
  components: Component[];

  @Prop({ type: Types.ObjectId })
  user_id: { type: Types.ObjectId };

  @Prop({ default: () => uuidv4() })
  reference_id: string;

  @Prop({ type: Types.ObjectId })
  global_items_id: { type: Types.ObjectId };

  @Prop({ type: Types.ObjectId })
  shop_items_id: { type: Types.ObjectId };

  @Prop({ type: Types.ObjectId })
  category_id: { type: Types.ObjectId };

  @Prop({ type: Types.ObjectId })
  supplier_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  modifier_id: Types.ObjectId;

  @Prop({ required: true })
  option1_name: string;

  @Prop({ required: true })
  option2_name: string;

  @Prop({ required: true })
  option3_name: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const Itemschema = SchemaFactory.createForClass(Item).set(
  'versionKey',
  false,
);
